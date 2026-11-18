"""Scene operations, shared by the websocket API, the actions and the scene entities."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError

from . import zigbee
from .const import SCENE_NAME_MAX
from .entities import scene_colors
from .logic import (
    SceneError,
    clean_name,
    import_scenes,
    merge_membership,
    next_scene_id,
    results_summary,
)
from .store import SceneStore


class SceneManager:
    def __init__(self, hass: HomeAssistant, store: SceneStore) -> None:
        self.hass = hass
        self.store = store

    def _require(self, group_id: int, scene_id: int) -> dict[str, Any]:
        scene = self.store.scene(group_id, scene_id)
        if scene is None:
            raise SceneError(f"Group {group_id} has no scene {scene_id}")
        return scene

    async def async_store(
        self, group_id: int, name: str | None = None, scene_id: int | None = None
    ) -> dict[str, Any]:
        """Save the lights' current state: a new scene (name), or at scene_id (overwriting,
        or creating it there with name, e.g. for a dial button)."""
        if scene_id is None:
            name = clean_name(name, SCENE_NAME_MAX)
            used = {int(s) for s in self.store.scenes(group_id)}
            # Leave the ids a dial's buttons recall for those buttons.
            scene_id = next_scene_id(used, self.store.dial_scene_ids(group_id))
            scene: dict[str, Any] = {"name": name, "members": []}
        elif (existing := self.store.scene(group_id, scene_id)) is None:
            # A specific id that isn't saved yet, e.g. a dial button's slot.
            scene = {"name": clean_name(name, SCENE_NAME_MAX), "members": []}
        else:
            scene = dict(existing)
            if name is not None:
                scene["name"] = clean_name(name, SCENE_NAME_MAX)

        results = await zigbee.async_store(self.hass, group_id, scene_id)
        ok, failed = results_summary(results)
        if not ok:
            raise HomeAssistantError(
                "No light saved the scene: "
                + ", ".join(f"{m} ({e})" for m, e in failed.items())
            )
        scene["members"] = ok
        scene["colors"] = scene_colors(self.hass, ok)
        await self.store.async_set(group_id, scene_id, scene)
        return {"scene_id": scene_id, "ok": ok, "failed": failed}

    async def async_recall(
        self, group_id: int, scene_id: int, transition: float | None = None
    ) -> None:
        self._require(group_id, scene_id)
        await zigbee.async_recall(self.hass, group_id, scene_id, transition)

    async def async_rename(self, group_id: int, scene_id: int, name: str) -> None:
        scene = dict(self._require(group_id, scene_id))
        scene["name"] = clean_name(name, SCENE_NAME_MAX)
        await self.store.async_set(group_id, scene_id, scene)

    async def async_delete(self, group_id: int, scene_id: int) -> dict[str, Any]:
        """Remove from the lights, then forget it. Lights that didn't answer keep their copy."""
        self._require(group_id, scene_id)
        results = await zigbee.async_remove(self.hass, group_id, scene_id)
        ok, failed = results_summary(results)
        # "not found" just means that light never had it.
        failed = {m: e for m, e in failed.items() if e != "not found"}
        await self.store.async_delete(group_id, scene_id)
        return {"ok": ok, "failed": failed}

    async def async_import(self, group_id: int) -> dict[str, Any]:
        """Ask the lights which scenes they have for this group, and add any we don't know."""
        replies = await zigbee.async_membership(self.hass, group_id)
        found = merge_membership(replies)
        scenes, added = import_scenes(self.store.scenes(group_id), found)
        await self.store.async_set_group(group_id, scenes)
        return {
            "added": added,
            "found": sorted(found),
            "no_answer": sorted(m for m, r in replies.items() if r is None),
        }
