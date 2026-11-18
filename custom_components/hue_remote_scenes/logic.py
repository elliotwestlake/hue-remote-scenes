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
