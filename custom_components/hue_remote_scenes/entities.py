"""HA entities of ZHA devices: the light a group member drives, a remote's battery sensor."""

from __future__ import annotations

from homeassistant.const import STATE_ON
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er

ZHA = "zha"
# A light that's on but reports no colour (e.g. dimmable white only): show warm white.
WARM_WHITE = (255, 214, 170)


def _entries(hass: HomeAssistant, ieee: str) -> list[er.RegistryEntry]:
    device = dr.async_get(hass).async_get_device(identifiers={(ZHA, ieee)})
    if device is None:
        return []
    return er.async_entries_for_device(er.async_get(hass), device.id)


def light_entity(hass: HomeAssistant, ieee: str) -> str | None:
    return next(
        (e.entity_id for e in _entries(hass, ieee) if e.domain == "light" and e.platform == ZHA),
        None,
    )


def group_light_entity(hass: HomeAssistant, group_id: int) -> str | None:
    """ZHA's light entity for a group (light_zha_group_0x<id>), for the room switch and brightness."""
    return er.async_get(hass).async_get_entity_id("light", ZHA, f"light_zha_group_0x{int(group_id):04x}")


def battery_entity(hass: HomeAssistant, ieee: str) -> str | None:
    return next(
        (
            e.entity_id
            for e in _entries(hass, ieee)
            if e.domain == "sensor" and (e.device_class or e.original_device_class) == "battery"
        ),
        None,
    )


def scene_colors(hass: HomeAssistant, member_keys: list[str]) -> list[list[int] | None]:
    """[r, g, b, brightness] per member as HA shows it now (None: off or unknown), so the
    panel can draw what a saved scene looks like. Members are "<ieee>/<endpoint>"."""
    out: list[list[int] | None] = []
    for key in member_keys:
        entity_id = light_entity(hass, key.split("/")[0])
        state = hass.states.get(entity_id) if entity_id else None
        if state is None or state.state != STATE_ON:
            out.append(None)
            continue
        rgb = state.attributes.get("rgb_color") or WARM_WHITE
        out.append([*(int(c) for c in rgb), int(state.attributes.get("brightness") or 255)])
    return out
