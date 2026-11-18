"""Scene names and members, kept in HA storage (the lights only know ids)."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store

from .const import SIGNAL_SCENES, STORAGE_KEY, STORAGE_VERSION


def _key(value: int) -> str:
    """Storage key for a group/scene id. int() first: zigpy's t.Group str()s as hex."""
    return str(int(value))


class SceneStore:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.groups: dict[str, dict[str, dict[str, Any]]] = {}
        self.remotes: dict[str, dict[str, Any]] = {}

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.groups = data.get("groups", {})
        self.remotes = data.get("remotes", {})

    def scenes(self, group_id: int) -> dict[str, dict[str, Any]]:
        return self.groups.get(_key(group_id), {})

    def scene(self, group_id: int, scene_id: int) -> dict[str, Any] | None:
        return self.scenes(group_id).get(_key(scene_id))

    def all(self) -> list[tuple[int, int, dict[str, Any]]]:
        return [
            (int(gid), int(sid), scene)
            for gid, scenes in self.groups.items()
            for sid, scene in scenes.items()
        ]

    async def async_set_group(self, group_id: int, scenes: dict[str, dict[str, Any]]) -> None:
        if scenes:
            self.groups[_key(group_id)] = scenes
        else:
            self.groups.pop(_key(group_id), None)
        await self._async_save()

    async def async_set(self, group_id: int, scene_id: int, scene: dict[str, Any]) -> None:
        self.groups.setdefault(_key(group_id), {})[_key(scene_id)] = scene
        await self._async_save()

    async def async_delete(self, group_id: int, scene_id: int) -> None:
        scenes = self.groups.get(_key(group_id), {})
        scenes.pop(_key(scene_id), None)
        if not scenes:
            self.groups.pop(_key(group_id), None)
        await self._async_save()

    def remote_groups(self, ieee: str) -> dict[str, list[int]]:
        return self.remotes.get(ieee, {}).get("groups", {})

    async def async_set_remote(
        self, ieee: str, groups: dict[str, list[int]], *, checked: str | None = None
    ) -> None:
        """Remember a remote's group bindings; checked is set when the table was read."""
        entry = self.remotes.setdefault(ieee, {"groups": {}, "checked": None})
        entry["groups"] = groups
        if checked:
            entry["checked"] = checked
        await self._async_save()

    async def _async_save(self) -> None:
        await self._store.async_save({"groups": self.groups, "remotes": self.remotes})
        async_dispatcher_send(self.hass, SIGNAL_SCENES)
