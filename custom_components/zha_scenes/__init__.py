"""ZHA Scenes: Zigbee scenes stored on your lights, and remote-to-group bindings, for ZHA."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryNotReady, HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from . import services, websocket, zigbee
from .const import DOMAIN, PANEL_COMPONENT, PANEL_URL, STATIC_URL
from .data import ScenesConfigEntry
from .manager import SceneManager
from .store import SceneStore

FRONTEND_DIR = Path(__file__).parent / "frontend"
BUNDLE = "zha-scenes-panel.js"
PLATFORMS = [Platform.SCENE]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    await hass.http.async_register_static_paths(
        [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=False)]
    )
    websocket.async_register(hass)
    services.async_register(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ScenesConfigEntry) -> bool:
    try:
        zigbee.groups(hass)
    except HomeAssistantError as err:
        raise ConfigEntryNotReady(str(err)) from err

    store = SceneStore(hass)
    await store.async_load()
    entry.runtime_data = SceneManager(hass, store)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    if PANEL_URL not in hass.data.get(frontend.DATA_PANELS, {}):
        await panel_custom.async_register_panel(
            hass,
            webcomponent_name=PANEL_COMPONENT,
            frontend_url_path=PANEL_URL,
            sidebar_title="Zigbee scenes",
            sidebar_icon="mdi:palette-outline",
            # Query string busts the browser cache when the bundle changes.
            module_url=f"{STATIC_URL}/{BUNDLE}?v={_bundle_mtime()}",
            embed_iframe=False,
            require_admin=True,
        )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ScenesConfigEntry) -> bool:
    if not await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        return False
    frontend.async_remove_panel(hass, PANEL_URL)
    return True


def _bundle_mtime() -> int:
    try:
        return int((FRONTEND_DIR / BUNDLE).stat().st_mtime)
    except OSError:
        return 0
