"""HA areas for ZHA groups and devices."""

from __future__ import annotations

from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er

ZHA = "zha"
# ZHA's group entities (owned by the coordinator), e.g. light_zha_group_0x0005.
GROUP_ENTITY_DOMAINS = ("light", "switch", "fan")


def _area_name(hass: HomeAssistant, area_id: str | None) -> str | None:
    area = ar.async_get(hass).async_get_area(area_id) if area_id else None
    return area.name if area else None


def area_icons(hass: HomeAssistant) -> dict[str, str | None]:
    """{area name: its icon, e.g. "mdi:sofa"}, for the panel's area tiles."""
    return {area.name: area.icon for area in ar.async_get(hass).async_list_areas()}


def device_area(hass: HomeAssistant, ieee: str) -> str | None:
    device = dr.async_get(hass).async_get_device(identifiers={(ZHA, ieee)})
    return _area_name(hass, device.area_id) if device else None


def group_areas(hass: HomeAssistant, group_id: int, member_ieees: list[str]) -> list[str]:
    """The area set on the group's entity, else the distinct areas of its members."""
    entities = er.async_get(hass)
    for domain in GROUP_ENTITY_DOMAINS:
        entity_id = entities.async_get_entity_id(
            domain, ZHA, f"{domain}_zha_group_0x{group_id:04x}"
        )
        if entity_id and (entry := entities.async_get(entity_id)) and entry.area_id:
            if name := _area_name(hass, entry.area_id):
                return [name]
    names = {name for ieee in member_ieees if (name := device_area(hass, ieee))}
    return sorted(names)
