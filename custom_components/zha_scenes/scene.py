"""One HA scene entity per stored Zigbee scene; activating it recalls it on the group."""

from __future__ import annotations

from typing import Any

from homeassistant.components.scene import Scene
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import zigbee
from .const import DOMAIN, SIGNAL_SCENES
from .data import ScenesConfigEntry


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ScenesConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    manager = entry.runtime_data
    entities: dict[tuple[int, int], ZigbeeScene] = {}

    @callback
    def _sync() -> None:
        wanted = {(gid, sid) for gid, sid, _scene in manager.store.all()}
        new = [ZigbeeScene(entry, gid, sid) for gid, sid in wanted - set(entities)]
        for entity in new:
            entities[(entity.group_id, entity.scene_id)] = entity
        if new:
            async_add_entities(new)
        registry = er.async_get(hass)
        for key in set(entities) - wanted:
            entity = entities.pop(key)
            if entity.entity_id and registry.async_get(entity.entity_id):
                registry.async_remove(entity.entity_id)
            else:
                hass.async_create_task(entity.async_remove())
        for entity in entities.values():
            if entity.hass:
                entity.async_write_ha_state()

    _sync()
    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_SCENES, _sync))


class ZigbeeScene(Scene):
    _attr_should_poll = False
    _attr_icon = "mdi:palette-outline"

    def __init__(self, entry: ScenesConfigEntry, group_id: int, scene_id: int) -> None:
        self._manager = entry.runtime_data
        self.group_id = group_id
        self.scene_id = scene_id
        self._attr_unique_id = f"{group_id}_{scene_id}"

    @property
    def _scene(self) -> dict[str, Any]:
        return self._manager.store.scene(self.group_id, self.scene_id) or {}

    @property
    def name(self) -> str:
        group = zigbee.group_name(self.hass, self.group_id) if self.hass else None
        return f"{group or f'Group {self.group_id}'} {self._scene.get('name', '')}".strip()

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {
            "group_id": self.group_id,
            "scene_id": self.scene_id,
            "members": self._scene.get("members", []),
            "integration": DOMAIN,
        }

    async def async_activate(self, **kwargs: Any) -> None:
        await self._manager.async_recall(self.group_id, self.scene_id, kwargs.get("transition"))
