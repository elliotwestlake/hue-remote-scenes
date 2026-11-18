"""Config flow: nothing to configure, just needs ZHA."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN


class ZhaScenesConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if "zha" not in self.hass.config.components:
            return self.async_abort(reason="no_zha")
        if user_input is not None:
            return self.async_create_entry(title="ZHA Scenes", data={})
        return self.async_show_form(step_id="user")
