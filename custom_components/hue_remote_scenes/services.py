"""Actions. Recalling is just scene.turn_on on the scene entities."""

from __future__ import annotations

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN
from .logic import SceneError

STORE_SCHEMA = vol.Schema(
    {
        vol.Required("group_id"): vol.Coerce(int),
        # name: new scene. scene_id: overwrite it, or create it there if name is given too.
        vol.Optional("name"): cv.string,
        vol.Optional("scene_id"): vol.All(vol.Coerce(int), vol.Range(0, 255)),
    }
)
GROUP_SCHEMA = vol.Schema({vol.Required("group_id"): vol.Coerce(int)})


@callback
def async_register(hass: HomeAssistant) -> None:
    def _manager():
        entries = hass.config_entries.async_loaded_entries(DOMAIN)
        if not entries:
            raise ServiceValidationError("Hue Remote Scenes isn't set up")
        return entries[0].runtime_data

    async def store_scene(call: ServiceCall):
        if "name" not in call.data and "scene_id" not in call.data:
            raise ServiceValidationError("Give a name for a new scene, or the scene_id to overwrite")
        try:
            return await _manager().async_store(
                call.data["group_id"], call.data.get("name"), call.data.get("scene_id")
            )
        except SceneError as err:
            raise ServiceValidationError(str(err)) from err

    async def import_scenes(call: ServiceCall):
        return await _manager().async_import(call.data["group_id"])

    hass.services.async_register(
        DOMAIN, "store_scene", store_scene, STORE_SCHEMA, supports_response=SupportsResponse.OPTIONAL
    )
    hass.services.async_register(
        DOMAIN, "import_scenes", import_scenes, GROUP_SCHEMA, supports_response=SupportsResponse.OPTIONAL
    )
