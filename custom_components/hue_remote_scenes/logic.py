"""Pure helpers (no Home Assistant or zigpy imports, so they're unit-testable).

Zigbee scenes live on the lights: each light keeps a table of (group id, scene id)
-> its own state. A scene "in a group" is just every member having an entry for
that pair. Names are ours; we keep them in HA storage.

Stored format (HA storage):

    {"groups": {"<group id>": {"<scene id>": {"name": "Relax", "members": ["<ieee>/<ep>", ...]}}},
     "remotes": {"<ieee>": {"groups": {"<group id>": [<cluster>, ...]}, "checked": "<iso time>"|None,
                            "dial": {"group_id": <id>, "buttons": [[label, scene id], ...]}?,
                            "cycle": {"group_id": <id>, "scene_ids": [<id>, ...]}?}}}

A remote's binding table lives on the remote, which is usually asleep, so we remember
what we last bound or read ("checked" is set only when the table was actually read).
"""

from __future__ import annotations

from typing import Any

SCENE_ID_MIN = 1  # 0 is often used by remotes/bridges as a "default" scene
SCENE_ID_MAX = 255


class SceneError(ValueError):
    """Raised for invalid requests (shown to the user)."""


def member_key(ieee: str, endpoint_id: int) -> str:
    return f"{ieee}/{endpoint_id}"


def parse_member_key(key: str) -> tuple[str, int]:
    try:
        ieee, endpoint = key.rsplit("/", 1)
        return ieee, int(endpoint)
    except ValueError as err:
        raise SceneError(f"Bad light '{key}'") from err


# Remotes that recall fixed scene ids on their own built-in group once their Scenes
# cluster is bound to it (no HA involved). (label, scene id) per button.
# - Hue Tap Dial: the four buttons recall scenes 1, 0, 5 and 4 (Zigbee2MQTT's RDM002 docs).
# - Hue dimmer switch gen 2: the Hue button alternates between scenes 0 and 1
#   (Zigbee2MQTT's 929002398602 docs and its recall_0/recall_1 actions). Which of the
#   two comes first is unverified, so the labels don't claim an order.
DIAL_BUTTONS: dict[str, list[tuple[str, int]]] = {
    "RDM002": [("1 dot", 1), ("2 dots", 0), ("3 dots", 5), ("4 dots", 4)],
    "RWL022": [("Hue button A", 0), ("Hue button B", 1)],
}

# Remotes whose buttons can't recall scenes themselves, but whose presses reach Home
# Assistant as ZHA events (Hue's 0xFC00 cluster, which ZHA binds to the coordinator).
# Home Assistant then recalls the next scene in a list: (zha_event command, label).
# Their buttons stay bound to the group for on/off and dimming, which works without HA.
# - Hue dimmer switch gen 1: the On button only sends On when bound, so a press turns
#   the lights on directly and HA then recalls the next scene.
# - Hue smart button: a press alternates On/Off, so cycling uses a double press.
CYCLE_TRIGGERS: dict[str, tuple[str, str]] = {
    "RWL020": ("on_press", "On button"),
    "RWL021": ("on_press", "On button"),
    "ROM001": ("on_double_press", "Double press"),
    "RDM003": ("on_double_press", "Double press"),
}
CYCLE_MAX = 10  # scenes in one remote's cycle
CYCLE_RESET = 10.0  # seconds: a press after a longer pause starts from the first scene


def dial_buttons(model: str | None) -> list[tuple[str, int]] | None:
    return DIAL_BUTTONS.get((model or "").upper())


def cycle_trigger(model: str | None) -> tuple[str, str] | None:
    return CYCLE_TRIGGERS.get((model or "").upper())


def clean_cycle(scene_ids: Any, stored: set[int]) -> list[int]:
    """Validate a cycle's scenes: saved in the group, no repeats, at most CYCLE_MAX."""
    if not isinstance(scene_ids, list) or not scene_ids:
        raise SceneError("Pick at least one scene")
    out: list[int] = []
    for scene_id in scene_ids:
        scene_id = int(scene_id)
        if scene_id not in stored:
            raise SceneError(f"This group has no saved scene {scene_id}")
        if scene_id not in out:
            out.append(scene_id)
    if len(out) > CYCLE_MAX:
        raise SceneError(f"A remote can cycle through at most {CYCLE_MAX} scenes")
    return out


def cycle_next(
    count: int,
    last_index: int | None,
    last_press: float | None,
    now: float,
    reset: float = CYCLE_RESET,
) -> int:
    """Index of the scene to recall: the next one, or the first after a pause."""
    if count <= 0:
        raise SceneError("Nothing to cycle through")
    if last_index is None or last_press is None or now - last_press > reset:
        return 0
    return (last_index + 1) % count


def next_scene_id(used: set[int], reserved: set[int] | frozenset[int] = frozenset()) -> int:
    """Lowest free scene id, skipping ones a dial's buttons recall."""
    for scene_id in range(SCENE_ID_MIN, SCENE_ID_MAX + 1):
        if scene_id not in used and scene_id not in reserved:
            return scene_id
    raise SceneError("This group already has 255 scenes")


def clean_name(name: Any, max_len: int) -> str:
    if not isinstance(name, str) or not name.strip():
        raise SceneError("Scene needs a name")
    name = " ".join(name.split())
    if len(name) > max_len:
        raise SceneError(f"Scene names can be at most {max_len} characters")
    return name


def merge_membership(replies: dict[str, list[int] | None]) -> dict[int, list[str]]:
    """{member: scene ids it reports (None = no answer)} -> {scene id: members that have it}."""
    scenes: dict[int, list[str]] = {}
    for member, scene_ids in replies.items():
        for scene_id in scene_ids or []:
            scenes.setdefault(int(scene_id), []).append(member)
    return {scene_id: sorted(members) for scene_id, members in sorted(scenes.items())}


def import_scenes(
    stored: dict[str, dict[str, Any]], found: dict[int, list[str]]
) -> tuple[dict[str, dict[str, Any]], list[int]]:
    """Merge scenes found on the lights into a group's stored scenes.

    Known scenes get their member list refreshed; unknown ones are added as
    "Scene <id>". Returns (new stored scenes, ids that were added).
    """
    out = {sid: dict(scene) for sid, scene in stored.items()}
    added = []
    for scene_id, members in found.items():
        key = str(scene_id)
        if key in out:
            out[key]["members"] = members
        else:
            out[key] = {"name": f"Scene {scene_id}", "members": members}
            added.append(scene_id)
    return out, added


def results_summary(results: dict[str, str]) -> tuple[list[str], dict[str, str]]:
    """Split per-member results into (members that succeeded, {member: error})."""
    ok = sorted(m for m, r in results.items() if r == "ok")
    failed = {m: r for m, r in sorted(results.items()) if r != "ok"}
    return ok, failed


def remote_endpoints(
    endpoints: dict[int, tuple[set[int], set[int]]], remote_clusters: tuple[int, ...]
) -> dict[int, list[int]]:
    """{endpoint id: (in clusters, out clusters)} -> {endpoint id: bindable remote clusters}.

    A remote endpoint *sends* on/off, level or scene commands (out clusters) and
    isn't itself a light (no on/off server cluster on the same endpoint).
    """
    found = {}
    for ep_id, (in_clusters, out_clusters) in sorted(endpoints.items()):
        if ep_id == 0:
            continue
        clusters = [c for c in remote_clusters if c in out_clusters]
        if clusters and remote_clusters[0] not in in_clusters:
            found[ep_id] = clusters
    return found


def group_bindings(entries: list[dict[str, Any]]) -> list[dict[str, int]]:
    """Binding table entries -> the group bindings, as {"endpoint", "cluster", "group_id"}.

    Entries are {"endpoint", "cluster", "addrmode", "group_id"?}; addrmode 1 is a group.
    """
    return sorted(
        (
            {"endpoint": e["endpoint"], "cluster": e["cluster"], "group_id": e["group_id"]}
            for e in entries
            if e.get("addrmode") == 1
        ),
        key=lambda b: (b["group_id"], b["endpoint"], b["cluster"]),
    )


def bindings_by_group(bindings: list[dict[str, int]]) -> dict[str, list[int]]:
    """group_bindings() output -> {"<group id>": [clusters]}."""
    out: dict[str, list[int]] = {}
    for b in bindings:
        out.setdefault(str(int(b["group_id"])), []).append(b["cluster"])
    return {gid: sorted(set(clusters)) for gid, clusters in sorted(out.items())}


def apply_bind_results(
    known: dict[str, list[int]], group_id: int, results: dict[int, str], *, unbind: bool
) -> dict[str, list[int]]:
    """Update a remote's remembered {"<group id>": [clusters]} with bind/unbind results."""
    out = {gid: list(clusters) for gid, clusters in known.items()}
    done = {cluster for cluster, result in results.items() if result == "ok"}
    key = str(int(group_id))  # zigpy's t.Group str()s as hex
    current = set(out.get(key, []))
    current = current - done if unbind else current | done
    if current:
        out[key] = sorted(current)
    else:
        out.pop(key, None)
    return out


def stale_bindings(
    entries: list[dict[str, Any]], keep_groups: set[int], coordinator: str
) -> list[dict[str, Any]]:
    """Binding table entries to remove once a remote is bound to a group.

    keep_groups: that group, plus the remote's own scene group if it has been through
    the dial set-up (its scene buttons only ever recall on that group).

    Everything except bindings to those groups and to the coordinator (ZHA binds a
    remote's clusters there so its presses reach HA, and the dial set-up binds
    Scenes there): other groups (left over from Z2M or an earlier binding) and
    direct bindings to other devices (e.g. straight to a bulb).
    """
    keep = {int(g) for g in keep_groups}
    coordinator = coordinator.lower()
    out = []
    for e in entries:
        if e.get("addrmode") == 1:
            if int(e["group_id"]) not in keep:
                out.append(e)
        elif e.get("addrmode") == 3:
            if str(e.get("ieee", "")).lower() != coordinator:
                out.append(e)
    return out


def remove_entries(
    entries: list[dict[str, Any]], removed: list[dict[str, Any]]
) -> list[dict[str, Any]]:
    """entries without the ones in removed (compared by value)."""
    return [e for e in entries if e not in removed]


# --- Diagnostics: what a remote reports and sends, and what looks wrong ---

CLUSTER_HUE_BUTTONS = 0xFC00  # Hue remotes' button notifications (ZHA's Hue quirks)
ACTIVITY_MAX = 40  # recent events kept per remote (runtime only)


def remote_checks(
    *,
    model: str | None,
    quirk_applied: bool | None,
    endpoints: list[dict[str, Any]],
    bound: dict[str, list[int]],
    table: list[dict[str, Any]] | None,
    coordinator: str,
    dial: dict[str, Any] | None,
    cycle: dict[str, Any] | None,
    commands_seen: list[str],
) -> list[dict[str, str]]:
    """What's set up and what's missing, as [{"level": "ok"|"warn"|"info", "text"}].

    endpoints: [{"id", "in": [cluster ids], "out": [cluster ids]}] (every endpoint).
    table: the remote's whole binding table, if it has been read since HA started.
    commands_seen: zha_event commands from this remote since HA started, oldest first.
    """
    out: list[dict[str, str]] = []

    def add(level: str, text: str) -> None:
        out.append({"level": level, "text": text})

    buttons = dial_buttons(model)
    trigger = cycle_trigger(model)
    if buttons:
        add("ok", f"ZHA reports model {model}: its scene buttons recall scenes on their own group.")
    elif trigger:
        add("ok", f"ZHA reports model {model}: Home Assistant can cycle scenes on '{trigger[0]}' presses.")
    else:
        add("warn", f"ZHA reports model {model or 'unknown'}, which this integration doesn't know, "
                    "so it can only bind it to a group.")

    has_hue_cluster = any(CLUSTER_HUE_BUTTONS in ep.get("in", []) for ep in endpoints)
    if trigger:
        if has_hue_cluster and quirk_applied is not False:
            add("ok", "ZHA's Hue quirk is applied, so it turns the button cluster (0xFC00) into events.")
        else:
            add("warn", "ZHA's Hue quirk isn't applied"
                        + ("" if has_hue_cluster else " (no 0xFC00 button cluster)")
                        + ", so presses won't reach Home Assistant as events. "
                        "Remove the remote from ZHA and pair it again.")
            has_hue_cluster = False

    if bound:
        add("ok", f"Bound to {len(bound)} group{'s' if len(bound) != 1 else ''} (as last bound or read).")
    else:
        add("info", "Not bound to a group, as far as we know: its buttons won't switch lights by themselves.")

    if table is None:
        add("info", "Binding table not read yet: press a button on the remote, then Read binding table.")
    else:
        coord = coordinator.lower()
        to_ha = {
            e["cluster"] for e in table
            if e.get("addrmode") == 3 and str(e.get("ieee", "")).lower() == coord
        }
        if trigger and has_hue_cluster:
            if CLUSTER_HUE_BUTTONS in to_ha:
                add("ok", "The binding table sends Hue button presses (0xFC00) to Home Assistant.")
            else:
                add("warn", "The binding table doesn't send Hue button presses (0xFC00) to Home Assistant. "
                            "In ZHA, open the remote and choose Reconfigure (press a button first to wake it).")
        groups_in_table = {e["group_id"] for e in table if e.get("addrmode") == 1}
        if not groups_in_table:
            add("warn", "The binding table has no group: Bind it to a group.")

    if commands_seen:
        distinct = list(dict.fromkeys(commands_seen))
        add("ok", f"Presses reach Home Assistant ({len(commands_seen)} since it started): "
                  + ", ".join(distinct[-8:]) + ".")
        if trigger and trigger[0] not in commands_seen:
            add("warn", f"None of them was '{trigger[0]}', the press that cycles scenes.")
    else:
        add("info", "No presses seen since Home Assistant started. Press a button and watch Activity.")

    if trigger:
        if cycle:
            add("ok", f"Scene cycle set up: {len(cycle.get('scene_ids', []))} scene(s) in group "
                      f"{cycle.get('group_id')}.")
        else:
            add("info", "No scene cycle set up yet.")
    if buttons:
        if dial:
            add("ok", f"Its own group is {dial.get('group_id')}.")
        else:
            add("info", "Its own group isn't known yet: run the set-up.")
    return out


def plain(value: Any) -> Any:
    """A zigpy command's args (schema objects, enums, lists) as JSON-friendly values."""
    if hasattr(value, "as_dict"):
        return {k: plain(v) for k, v in value.as_dict().items()}
    if isinstance(value, dict):
        return {str(k): plain(v) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [plain(v) for v in value]
    if isinstance(value, bool) or value is None:
        return value
    if isinstance(value, int):
        name = getattr(value, "name", None)
        return name if isinstance(name, str) else int(value)
    if isinstance(value, (float, str)):
        return value
    return str(value)
