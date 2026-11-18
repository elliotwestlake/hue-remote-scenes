"""Pure helpers (no Home Assistant or zigpy imports, so they're unit-testable).

Zigbee scenes live on the lights: each light keeps a table of (group id, scene id)
-> its own state. A scene "in a group" is just every member having an entry for
that pair. Names are ours; we keep them in HA storage.

Stored format (HA storage):

    {"groups": {"<group id>": {"<scene id>": {"name": "Relax", "members": ["<ieee>/<ep>", ...]}}}}
"""

from __future__ import annotations

from typing import Any

SCENE_ID_MIN = 1  # 0 is often used by remotes/bridges as a "default" scene
SCENE_ID_MAX = 255


class SceneError(ValueError):
    """Raised for invalid requests (shown to the user)."""


def member_key(ieee: str, endpoint_id: int) -> str:
    return f"{ieee}/{endpoint_id}"


def next_scene_id(used: set[int]) -> int:
    for scene_id in range(SCENE_ID_MIN, SCENE_ID_MAX + 1):
        if scene_id not in used:
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
