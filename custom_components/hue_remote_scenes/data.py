"""Config entry type."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry

from .manager import SceneManager

type ScenesConfigEntry = ConfigEntry[SceneManager]
