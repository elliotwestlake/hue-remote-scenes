"""Scene operations, shared by the websocket API, the actions and the scene entities."""

from __future__ import annotations

import logging
from time import monotonic
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError

from . import zigbee
from .const import SCENE_NAME_MAX
from .entities import scene_colors
from .logic import (
    SceneError,
    clean_cycle,
    clean_name,
    cycle_next,
    cycle_trigger,
    import_scenes,
    merge_membership,
    next_scene_id,
    results_summary,
)
from .store import SceneStore

_LOGGER = logging.getLogger(__name__)


class SceneManager:
    def __init__(self, hass: HomeAssistant, store: SceneStore) -> None:
        self.hass = hass
        self.store = store
        # ieee -> (index of the scene last recalled, monotonic time of that press).
        self._cycle_pos: dict[str, tuple[int, float]] = {}

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

    # --- Scene cycling: HA recalls the next scene when a remote's button is pressed ---

    async def async_set_cycle(
        self, ieee: str, group_id: int | None, scene_ids: list[int] | None = None
    ) -> dict[str, Any] | None:
        """Make this remote's trigger press cycle through scene_ids in group_id (None: stop)."""
        if group_id is None:
            await self.store.async_set_cycle(ieee, None)
            self._cycle_pos.pop(ieee, None)
            return None
        if cycle_trigger(zigbee.device_model(self.hass, ieee)) is None:
            raise SceneError("This remote's button presses can't cycle scenes")
        if zigbee.group_name(self.hass, group_id) is None:
            raise SceneError(f"ZHA has no group {group_id}")
        ids = clean_cycle(scene_ids, {int(s) for s in self.store.scenes(group_id)})
        await self.store.async_set_cycle(ieee, group_id, ids)
        self._cycle_pos.pop(ieee, None)
        return self.store.cycle(ieee)

    @callback
    def async_handle_zha_event(self, event: Event) -> None:
        """zha_event listener: a remote with a cycle sent its trigger press."""
        ieee = str(event.data.get("device_ieee"))
        if self.store.cycle(ieee) is None:
            return
        trigger = cycle_trigger(zigbee.device_model(self.hass, ieee))
        if trigger is None or event.data.get("command") != trigger[0]:
            return
        self.hass.async_create_task(self.async_cycle(ieee), f"hue_remote_scenes cycle {ieee}")

    async def async_cycle(self, ieee: str) -> int | None:
        """Recall the remote's next scene (the first, after a pause). Returns its id."""
        cycle = self.store.cycle(ieee)
        if cycle is None:
            return None
        group_id = cycle["group_id"]
        # Scenes deleted since the cycle was set are skipped.
        scene_ids = [s for s in cycle["scene_ids"] if self.store.scene(group_id, s) is not None]
        if not scene_ids:
            return None
        now = monotonic()
        last_index, last_press = self._cycle_pos.get(ieee, (None, None))
        index = cycle_next(len(scene_ids), last_index, last_press, now)
        self._cycle_pos[ieee] = (index, now)
        try:
            await zigbee.async_recall(self.hass, group_id, scene_ids[index])
        except HomeAssistantError as err:
            _LOGGER.warning("Couldn't recall scene %s for remote %s: %s", scene_ids[index], ieee, err)
            return None
        return scene_ids[index]
