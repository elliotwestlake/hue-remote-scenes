"""Constants for ZHA Scenes."""

DOMAIN = "zha_scenes"

PANEL_URL = "zha-scenes"
PANEL_COMPONENT = "zha-scenes-panel"
STATIC_URL = "/zha_scenes_static"

STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1

# Fired (no args) whenever the stored scenes change, so scene entities can be
# added/removed and open panels can refresh.
SIGNAL_SCENES = f"{DOMAIN}_scenes"

# Zigbee cluster ids.
CLUSTER_ON_OFF = 0x0006
CLUSTER_LEVEL = 0x0008
CLUSTER_SCENES = 0x0005
CLUSTER_COLOR = 0x0300

# What a remote (e.g. a Hue Tap Dial) sends to a group once it's bound to it.
REMOTE_CLUSTERS: tuple[int, ...] = (CLUSTER_ON_OFF, CLUSTER_LEVEL, CLUSTER_SCENES)

# After a recall, re-read the lights so HA's entities show the scene's state.
REFRESH_DELAY = 2.0
REFRESH_ATTRS: dict[int, tuple[str, ...]] = {
    CLUSTER_ON_OFF: ("on_off",),
    CLUSTER_LEVEL: ("current_level",),
    CLUSTER_COLOR: ("color_mode", "current_x", "current_y", "color_temperature"),
}

SCENE_NAME_MAX = 40
