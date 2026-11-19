"""Websocket API used by the sidebar panel.

hue_remote_scenes/groups                                    -> ZHA groups: members, areas, scenes, bound remotes; area icons
hue_remote_scenes/subscribe                                 -> pushes {} whenever stored scenes change
hue_remote_scenes/store   {group_id, name? , scene_id?}     -> new scene (name) or re-save (scene_id)
hue_remote_scenes/recall  {group_id, scene_id, transition?}
hue_remote_scenes/copy    {group_id, from_scene_id, scene_id}   -> a saved scene copied to scene_id in the lights
hue_remote_scenes/rename  {group_id, scene_id, name}
hue_remote_scenes/delete  {group_id, scene_id}
hue_remote_scenes/import  {group_id}                         -> scenes the lights already have
hue_remote_scenes/remotes                                   -> remotes, their area, battery and remembered bindings
hue_remote_scenes/bindings {ieee}                            -> the remote's group bindings (must be awake)
hue_remote_scenes/bind    {ieee, endpoint, group_id, clusters?, unbind?, exclusive?}
hue_remote_scenes/find_dial_group {ieee}                     -> the group a dial recalls scenes on (needs a button press)
hue_remote_scenes/lights                                    -> lights that can join a group, with their area
hue_remote_scenes/create_group {group_id, name, members}     -> ZHA group with that exact id (or add members)
hue_remote_scenes/set_cycle {ieee, group_id?, scene_ids?}    -> HA recalls the next scene on a button press
                                                               (no group_id: stop)
"""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from functools import wraps
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.util import dt as dt_util

from . import zigbee
from .areas import area_icons, device_area, group_areas
from .const import DOMAIN, REMOTE_CLUSTERS, SIGNAL_SCENES
from .entities import battery_entity, group_light_entity, light_entity
from .logic import (
    SceneError,
    apply_bind_results,
    bindings_by_group,
    cycle_trigger,
    dial_buttons,
    group_bindings,
    remove_entries,
    stale_bindings,
)
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
        ws_copy,
        ws_rename,
        ws_delete,
        ws_import,
        ws_remotes,
        ws_bindings,
        ws_bind,
        ws_find_dial_group,
        ws_lights,
        ws_create_group,
        ws_set_cycle,
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
            connection.send_error(msg["id"], "not_loaded", "Hue Remote Scenes isn't set up")
            return
        try:
            result = await func(hass, connection, msg, manager)
        except SceneError as err:
            connection.send_error(msg["id"], "invalid", str(err))
            return
        connection.send_result(msg["id"], result)

    return wrapper


@websocket_api.websocket_command({vol.Required("type"): "hue_remote_scenes/groups"})
@websocket_api.async_response
@_handler
async def ws_groups(hass, connection, msg, manager: SceneManager):
    remote_names = {r["ieee"]: r["name"] for r in zigbee.remotes(hass)}
    out = []
    for group in zigbee.groups(hass):
        group["areas"] = group_areas(hass, group["id"], [m["ieee"] for m in group["members"]])
        group["entity_id"] = group_light_entity(hass, group["id"])
        for member in group["members"]:
            member["entity_id"] = light_entity(hass, member["ieee"])
        group["remotes"] = [
            {"ieee": ieee, "name": name, "clusters": clusters}
            for ieee, name in remote_names.items()
            if (clusters := manager.store.remote_groups(ieee).get(str(int(group["id"]))))
        ]
        # Dials whose built-in group this is: their buttons recall these scene ids.
        group["dials"] = [
            {
                "ieee": ieee,
                "name": remote_names.get(ieee, ieee),
                "buttons": [{"label": label, "scene_id": sid} for label, sid in dial["buttons"]],
            }
            for ieee, dial in manager.store.dials_on(group["id"]).items()
        ]
        # Remotes whose presses make HA cycle through these scene ids (needs HA running).
        group["cycles"] = [
            {"ieee": ieee, "name": remote_names.get(ieee, ieee), "scene_ids": cycle["scene_ids"]}
            for ieee, cycle in manager.store.cycles_on(group["id"]).items()
        ]
        stored = manager.store.scenes(group["id"])
        group["scenes"] = sorted(
            (
                {
                    "id": int(sid),
                    "name": s["name"],
                    "members": s.get("members", []),
                    "colors": s.get("colors", []),
                }
                for sid, s in stored.items()
            ),
            key=lambda s: s["id"],
        )
        out.append(group)
    return {"groups": out, "area_icons": area_icons(hass)}


@websocket_api.websocket_command({vol.Required("type"): "hue_remote_scenes/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    @callback
    def _send() -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {}))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_SCENES, _send)
    connection.send_result(msg["id"])


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hue_remote_scenes/store",
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
        vol.Required("type"): "hue_remote_scenes/recall",
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
    {
        vol.Required("type"): "hue_remote_scenes/copy",
        vol.Required("from_scene_id"): vol.All(vol.Coerce(int), vol.Range(0, 255)),
    }
    | SCENE
)
@websocket_api.async_response
@_handler
async def ws_copy(hass, connection, msg, manager: SceneManager):
    return await manager.async_copy(msg["group_id"], msg["from_scene_id"], msg["scene_id"])


@websocket_api.websocket_command(
    {vol.Required("type"): "hue_remote_scenes/rename", vol.Required("name"): str} | SCENE
)
@websocket_api.async_response
@_handler
async def ws_rename(hass, connection, msg, manager: SceneManager):
    await manager.async_rename(msg["group_id"], msg["scene_id"], msg["name"])
    return {"ok": True}


@websocket_api.websocket_command({vol.Required("type"): "hue_remote_scenes/delete"} | SCENE)
@websocket_api.async_response
@_handler
async def ws_delete(hass, connection, msg, manager: SceneManager):
    return await manager.async_delete(msg["group_id"], msg["scene_id"])


@websocket_api.websocket_command({vol.Required("type"): "hue_remote_scenes/import"} | GROUP)
@websocket_api.async_response
@_handler
async def ws_import(hass, connection, msg, manager: SceneManager):
    return await manager.async_import(msg["group_id"])


@websocket_api.websocket_command({vol.Required("type"): "hue_remote_scenes/remotes"})
@websocket_api.async_response
@_handler
async def ws_remotes(hass, connection, msg, manager: SceneManager):
    remotes = zigbee.remotes(hass)
    for remote in remotes:
        remote["area"] = device_area(hass, remote["ieee"])
        remote["bound"] = [
            {"group_id": int(gid), "clusters": clusters}
            for gid, clusters in manager.store.remote_groups(remote["ieee"]).items()
        ]
        remote["checked"] = manager.store.remotes.get(remote["ieee"], {}).get("checked")
        remote["dial_supported"] = dial_buttons(remote["model"]) is not None
        remote["dial"] = manager.store.dial(remote["ieee"])
        remote["battery_entity"] = battery_entity(hass, remote["ieee"])
        # Presses HA can turn into scene recalls (needs HA running), and the cycle set up.
        trigger = cycle_trigger(remote["model"])
        remote["cycle_trigger"] = {"command": trigger[0], "label": trigger[1]} if trigger else None
        remote["cycle"] = manager.store.cycle(remote["ieee"])
    return {"remotes": remotes, "area_icons": area_icons(hass)}


@websocket_api.websocket_command(
    {vol.Required("type"): "hue_remote_scenes/bindings", vol.Required("ieee"): str}
)
@websocket_api.async_response
@_handler
async def ws_bindings(hass, connection, msg, manager: SceneManager):
    bindings = group_bindings(await zigbee.async_binding_table(hass, msg["ieee"]))
    await manager.store.async_set_remote(
        msg["ieee"], bindings_by_group(bindings), checked=dt_util.utcnow().isoformat()
    )
    return {"bindings": bindings}


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hue_remote_scenes/bind",
        vol.Required("ieee"): str,
        vol.Required("endpoint"): vol.Coerce(int),
        vol.Optional("clusters", default=list(REMOTE_CLUSTERS)): [vol.In(REMOTE_CLUSTERS)],
        vol.Optional("unbind", default=False): bool,
        # After binding, remove the remote's other bindings (other groups, other devices).
        vol.Optional("exclusive", default=False): bool,
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
    known = manager.store.remote_groups(msg["ieee"])
    await manager.store.async_set_remote(
        msg["ieee"],
        apply_bind_results(known, msg["group_id"], results, unbind=msg["unbind"]),
    )
    out: dict[str, Any] = {"results": {str(c): r for c, r in results.items()}}
    if msg["exclusive"] and not msg["unbind"] and "ok" in results.values():
        out |= await _remove_other_bindings(hass, manager, msg["ieee"], msg["group_id"])
    return out


async def _remove_other_bindings(
    hass: HomeAssistant, manager: SceneManager, ieee: str, group_id: int
) -> dict[str, Any]:
    """Unbind everything but group_id, the remote's dial group and the coordinator.
    The remote is awake: it just answered the bind."""
    try:
        table = await zigbee.async_binding_table(hass, ieee)
    except HomeAssistantError as err:
        return {"removed": [], "remove_failed": [], "table_error": str(err)}
    keep = {int(group_id)}
    if dial := manager.store.dial(ieee):
        keep.add(int(dial["group_id"]))  # its scene buttons need their own group
    stale = stale_bindings(table, keep, zigbee.coordinator_ieee(hass))
    removed, failed = await zigbee.async_unbind_entries(hass, ieee, stale)
    # We've just seen the whole table, so remember it as checked.
    await manager.store.async_set_remote(
        ieee,
        bindings_by_group(group_bindings(remove_entries(table, removed))),
        checked=dt_util.utcnow().isoformat(),
    )
    return {"removed": removed, "remove_failed": failed, "table_error": None}


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hue_remote_scenes/find_dial_group",
        vol.Required("ieee"): str,
        vol.Optional("timeout", default=90): vol.All(vol.Coerce(float), vol.Range(5, 300)),
    }
)
@websocket_api.async_response
@_handler
async def ws_find_dial_group(hass, connection, msg, manager: SceneManager):
    found = await zigbee.async_find_dial_group(hass, msg["ieee"], msg["timeout"])
    model = next((r["model"] for r in zigbee.remotes(hass) if r["ieee"] == msg["ieee"]), None)
    await manager.store.async_set_dial(msg["ieee"], found["group_id"], dial_buttons(model) or [])
    exists = any(g["id"] == found["group_id"] for g in zigbee.groups(hass))
    return found | {"exists": exists}


@websocket_api.websocket_command({vol.Required("type"): "hue_remote_scenes/lights"})
@websocket_api.async_response
@_handler
async def ws_lights(hass, connection, msg, manager: SceneManager):
    lights = zigbee.lights(hass)
    for light in lights:
        light["area"] = device_area(hass, light["ieee"])
        light["entity_id"] = light_entity(hass, light["ieee"])
    return {"lights": lights}


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hue_remote_scenes/create_group",
        vol.Required("name"): vol.All(str, vol.Length(min=1, max=40)),
        vol.Required("members"): vol.All([str], vol.Length(min=1)),
    }
    | GROUP
)
@websocket_api.async_response
@_handler
async def ws_create_group(hass, connection, msg, manager: SceneManager):
    await zigbee.async_create_group(hass, msg["group_id"], msg["name"].strip(), msg["members"])
    async_dispatcher_send(hass, SIGNAL_SCENES)
    return {"ok": True}


@websocket_api.websocket_command(
    {
        vol.Required("type"): "hue_remote_scenes/set_cycle",
        vol.Required("ieee"): str,
        # Leave out group_id (or send null) to stop cycling.
        vol.Optional("group_id"): vol.Any(None, vol.Coerce(int)),
        vol.Optional("scene_ids", default=list): [vol.All(vol.Coerce(int), vol.Range(0, 255))],
    }
)
@websocket_api.async_response
@_handler
async def ws_set_cycle(hass, connection, msg, manager: SceneManager):
    cycle = await manager.async_set_cycle(msg["ieee"], msg.get("group_id"), msg["scene_ids"])
    return {"cycle": cycle}
