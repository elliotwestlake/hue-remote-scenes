"""Websocket API used by the sidebar panel.

zha_scenes/groups                                    -> ZHA groups, their members and stored scenes
zha_scenes/subscribe                                 -> pushes {} whenever stored scenes change
zha_scenes/store   {group_id, name? , scene_id?}     -> new scene (name) or re-save (scene_id)
zha_scenes/recall  {group_id, scene_id, transition?}
zha_scenes/rename  {group_id, scene_id, name}
zha_scenes/delete  {group_id, scene_id}
zha_scenes/import  {group_id}                         -> scenes the lights already have
zha_scenes/remotes                                   -> devices that can be bound to a group
zha_scenes/bindings {ieee}                            -> the remote's group bindings (must be awake)
zha_scenes/bind    {ieee, endpoint, group_id, clusters?, unbind?}
"""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from functools import wraps
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from . import zigbee
from .const import DOMAIN, REMOTE_CLUSTERS, SIGNAL_SCENES
from .logic import SceneError, group_bindings
from .manager import SceneManager

GROUP = {vol.Required("group_id"): vol.Coerce(int)}
SCENE = GROUP | {vol.Required("scene_id"): vol.All(vol.Coerce(int), vol.Range(0, 255))}


@callback
def async_register(hass: HomeAssistant) -> None:
    for command in (
        ws_groups,
        ws_subscribe,
        ws_store,
        ws_recall,
        ws_rename,
        ws_delete,
        ws_import,
        ws_remotes,
        ws_bindings,
        ws_bind,
    ):
        websocket_api.async_register_command(hass, command)


def _manager(hass: HomeAssistant) -> SceneManager | None:
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    return entries[0].runtime_data if entries else None


def _handler(
    func: Callable[[HomeAssistant, Any, dict[str, Any], SceneManager], Awaitable[Any]],
):
    """Find the manager, send func's return value as the result, SceneError -> "invalid"."""

    @wraps(func)
    async def wrapper(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
        manager = _manager(hass)
        if manager is None:
            connection.send_error(msg["id"], "not_loaded", "ZHA Scenes isn't set up")
            return
        try:
            result = await func(hass, connection, msg, manager)
        except SceneError as err:
            connection.send_error(msg["id"], "invalid", str(err))
            return
        connection.send_result(msg["id"], result)

    return wrapper


@websocket_api.websocket_command({vol.Required("type"): "zha_scenes/groups"})
@websocket_api.async_response
@_handler
async def ws_groups(hass, connection, msg, manager: SceneManager):
    out = []
    for group in zigbee.groups(hass):
        stored = manager.store.scenes(group["id"])
        group["scenes"] = sorted(
            (
                {"id": int(sid), "name": s["name"], "members": s.get("members", [])}
                for sid, s in stored.items()
            ),
            key=lambda s: s["id"],
        )
        out.append(group)
    return {"groups": out}


@websocket_api.websocket_command({vol.Required("type"): "zha_scenes/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    @callback
    def _send() -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {}))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_SCENES, _send)
    connection.send_result(msg["id"])


@websocket_api.websocket_command(
    {
        vol.Required("type"): "zha_scenes/store",
        vol.Optional("name"): str,
        vol.Optional("scene_id"): vol.All(vol.Coerce(int), vol.Range(0, 255)),
    }
    | GROUP
)
@websocket_api.async_response
@_handler
async def ws_store(hass, connection, msg, manager: SceneManager):
    return await manager.async_store(msg["group_id"], msg.get("name"), msg.get("scene_id"))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "zha_scenes/recall",
        vol.Optional("transition"): vol.All(vol.Coerce(float), vol.Range(0, 6000)),
    }
    | SCENE
)
@websocket_api.async_response
@_handler
async def ws_recall(hass, connection, msg, manager: SceneManager):
    await manager.async_recall(msg["group_id"], msg["scene_id"], msg.get("transition"))
    return {"ok": True}


@websocket_api.websocket_command(
    {vol.Required("type"): "zha_scenes/rename", vol.Required("name"): str} | SCENE
)
@websocket_api.async_response
@_handler
async def ws_rename(hass, connection, msg, manager: SceneManager):
    await manager.async_rename(msg["group_id"], msg["scene_id"], msg["name"])
    return {"ok": True}


@websocket_api.websocket_command({vol.Required("type"): "zha_scenes/delete"} | SCENE)
@websocket_api.async_response
@_handler
async def ws_delete(hass, connection, msg, manager: SceneManager):
    return await manager.async_delete(msg["group_id"], msg["scene_id"])


@websocket_api.websocket_command({vol.Required("type"): "zha_scenes/import"} | GROUP)
@websocket_api.async_response
@_handler
async def ws_import(hass, connection, msg, manager: SceneManager):
    return await manager.async_import(msg["group_id"])


@websocket_api.websocket_command({vol.Required("type"): "zha_scenes/remotes"})
@websocket_api.async_response
@_handler
async def ws_remotes(hass, connection, msg, manager: SceneManager):
    return {"remotes": zigbee.remotes(hass)}


@websocket_api.websocket_command(
    {vol.Required("type"): "zha_scenes/bindings", vol.Required("ieee"): str}
)
@websocket_api.async_response
@_handler
async def ws_bindings(hass, connection, msg, manager: SceneManager):
    entries = await zigbee.async_binding_table(hass, msg["ieee"])
    return {"bindings": group_bindings(entries)}


@websocket_api.websocket_command(
    {
        vol.Required("type"): "zha_scenes/bind",
        vol.Required("ieee"): str,
        vol.Required("endpoint"): vol.Coerce(int),
        vol.Optional("clusters", default=list(REMOTE_CLUSTERS)): [vol.In(REMOTE_CLUSTERS)],
        vol.Optional("unbind", default=False): bool,
    }
    | GROUP
)
@websocket_api.async_response
@_handler
async def ws_bind(hass, connection, msg, manager: SceneManager):
    results = await zigbee.async_bind(
        hass,
        msg["ieee"],
        msg["endpoint"],
        msg["group_id"],
        msg["clusters"],
        unbind=msg["unbind"],
    )
    return {"results": {str(c): r for c, r in results.items()}}
