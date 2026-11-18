"""Talking to ZHA's groups and devices through zigpy.

Store / remove / get-membership go to each light separately: Zigbee devices
don't answer group-addressed scene commands, and we want to tell the user which
lights didn't take it. Recall goes to the group (one multicast), so the lights
change together, the same way a bound remote does it.
"""

from __future__ import annotations

import asyncio
import logging
from typing import Any

from zigpy.exceptions import ZigbeeException
from zigpy.types import EUI64
from zigpy.zcl.foundation import Status
from zigpy.zdo import types as zdo_t

from homeassistant.components.zha.helpers import get_zha_gateway
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_call_later

from .const import CLUSTER_SCENES, REFRESH_ATTRS, REFRESH_DELAY, REMOTE_CLUSTERS
from .logic import member_key, remote_endpoints

_LOGGER = logging.getLogger(__name__)

ERRORS = (TimeoutError, ZigbeeException)


def _gateway(hass: HomeAssistant) -> Any:
    try:
        return get_zha_gateway(hass)
    except ValueError as err:
        raise HomeAssistantError("ZHA isn't running") from err


def _group(hass: HomeAssistant, group_id: int) -> Any:
    group = _gateway(hass).groups.get(group_id)
    if group is None:
        raise HomeAssistantError(f"ZHA has no group {group_id}")
    return group


def _status_text(status: Any) -> str:
    try:
        return Status(status).name.lower().replace("_", " ")
    except ValueError:
        return f"status {status}"


def _scene_members(group: Any) -> dict[str, tuple[Any, Any]]:
    """{member key: (zha member, zigpy Scenes cluster)} for members that have scenes."""
    out = {}
    for member in group.members:
        endpoint = member.endpoint
        if endpoint is not None and CLUSTER_SCENES in endpoint.in_clusters:
            out[member_key(str(member.device.ieee), int(member.endpoint_id))] = (
                member,
                endpoint.in_clusters[CLUSTER_SCENES],
            )
    return out


def groups(hass: HomeAssistant) -> list[dict[str, Any]]:
    out = []
    for group in _gateway(hass).groups.values():
        out.append(
            {
                # zigpy's t.Group is an int that str()s as "0x0005"; keep plain ints.
                "id": int(group.group_id),
                "name": group.name,
                "members": [
                    {
                        "key": member_key(str(m.device.ieee), int(m.endpoint_id)),
                        "ieee": str(m.device.ieee),
                        "name": m.device.name,
                        "scenes": m.endpoint is not None
                        and CLUSTER_SCENES in m.endpoint.in_clusters,
                    }
                    for m in group.members
                ],
            }
        )
    return sorted(out, key=lambda g: g["name"].lower())


def group_name(hass: HomeAssistant, group_id: int) -> str | None:
    try:
        group = _gateway(hass).groups.get(group_id)
    except HomeAssistantError:
        return None
    return group.name if group else None


async def _each(group: Any, call) -> dict[str, Any]:
    """Run call(cluster) for every scene-capable member; {member: response | exception}."""
    members = _scene_members(group)
    if not members:
        raise HomeAssistantError("None of this group's devices support scenes")
    replies = await asyncio.gather(
        *(call(cluster) for _member, cluster in members.values()), return_exceptions=True
    )
    return dict(zip(members, replies))


def _result(reply: Any) -> str:
    if isinstance(reply, ERRORS):
        return "no answer"
    if isinstance(reply, BaseException):
        return str(reply) or type(reply).__name__
    status = getattr(reply, "status", Status.SUCCESS)
    return "ok" if status == Status.SUCCESS else _status_text(status)


async def async_store(hass: HomeAssistant, group_id: int, scene_id: int) -> dict[str, str]:
    """Each light saves its current state as (group, scene)."""
    replies = await _each(
        _group(hass, group_id), lambda c: c.store(group_id=group_id, scene_id=scene_id)
    )
    return {member: _result(reply) for member, reply in replies.items()}


async def async_remove(hass: HomeAssistant, group_id: int, scene_id: int) -> dict[str, str]:
    replies = await _each(
        _group(hass, group_id), lambda c: c.remove(group_id=group_id, scene_id=scene_id)
    )
    return {member: _result(reply) for member, reply in replies.items()}


async def async_membership(hass: HomeAssistant, group_id: int) -> dict[str, list[int] | None]:
    """Which scene ids each light has for this group (None if it didn't answer)."""
    replies = await _each(
        _group(hass, group_id), lambda c: c.get_scene_membership(group_id=group_id)
    )
    out: dict[str, list[int] | None] = {}
    for member, reply in replies.items():
        if _result(reply) == "ok":
            out[member] = [int(s) for s in (getattr(reply, "scenes", None) or [])]
        else:
            out[member] = None
    return out


async def async_recall(
    hass: HomeAssistant, group_id: int, scene_id: int, transition: float | None = None
) -> None:
    group = _group(hass, group_id)
    kwargs: dict[str, Any] = {"group_id": group_id, "scene_id": scene_id}
    if transition is not None:
        kwargs["transition_time"] = max(0, min(0xFFFE, round(transition * 10)))
    try:
        await group.endpoint[CLUSTER_SCENES].recall(**kwargs)
    except ERRORS as err:
        raise HomeAssistantError(f"Couldn't send the recall: {err}") from err

    @callback
    def _refresh(_now) -> None:
        hass.async_create_background_task(
            _async_refresh(group), f"zha_scenes refresh {group_id}"
        )

    async_call_later(hass, REFRESH_DELAY + (transition or 0), _refresh)


async def _async_refresh(group: Any) -> None:
    """Re-read the lights; ZHA's entities update from the read results."""
    for member in group.members:
        endpoint = member.endpoint
        if endpoint is None:
            continue
        for cluster_id, attrs in REFRESH_ATTRS.items():
            if cluster_id not in endpoint.in_clusters:
                continue
            try:
                await endpoint.in_clusters[cluster_id].read_attributes(
                    list(attrs), allow_cache=False
                )
            except ERRORS as err:
                _LOGGER.debug("Refreshing %s failed: %s", member.device.name, err)


def remotes(hass: HomeAssistant) -> list[dict[str, Any]]:
    out = []
    for device in _gateway(hass).devices.values():
        if device.is_coordinator:
            continue
        endpoints = {
            ep_id: (set(ep.in_clusters), set(ep.out_clusters))
            for ep_id, ep in device.device.endpoints.items()
            if ep_id != 0
        }
        if found := remote_endpoints(endpoints, REMOTE_CLUSTERS):
            out.append(
                {
                    "ieee": str(device.ieee),
                    "name": device.name,
                    "model": device.model,
                    "manufacturer": device.manufacturer,
                    "battery": device.is_mains_powered is False,
                    "endpoints": [{"id": ep, "clusters": c} for ep, c in found.items()],
                }
            )
    return sorted(out, key=lambda r: r["name"].lower())


def _zigpy_device(hass: HomeAssistant, ieee: str) -> Any:
    device = _gateway(hass).devices.get(EUI64.convert(ieee))
    if device is None:
        raise HomeAssistantError(f"ZHA has no device {ieee}")
    return device.device


async def async_bind(
    hass: HomeAssistant,
    ieee: str,
    endpoint_id: int,
    group_id: int,
    clusters: list[int],
    *,
    unbind: bool = False,
) -> dict[int, str]:
    """Bind (or unbind) a remote's clusters to a group. {cluster: "ok" | error}."""
    device = _zigpy_device(hass, ieee)
    _group(hass, group_id)
    command = zdo_t.ZDOCmd.Unbind_req if unbind else zdo_t.ZDOCmd.Bind_req
    destination = zdo_t.MultiAddress(addrmode=1, nwk=group_id)
    out: dict[int, str] = {}
    # One at a time: remotes are sleepy and small, and some drop concurrent requests.
    for cluster in clusters:
        try:
            reply = await device.zdo.request(
                command, device.ieee, endpoint_id, cluster, destination
            )
        except ERRORS:
            out[cluster] = "no answer"
            continue
        status = reply[0] if reply else None
        out[cluster] = (
            "ok" if status == zdo_t.Status.SUCCESS else f"{getattr(status, 'name', status)}"
        )
    return out


async def async_binding_table(hass: HomeAssistant, ieee: str) -> list[dict[str, Any]]:
    """Read the remote's binding table (it has to be awake)."""
    device = _zigpy_device(hass, ieee)
    entries: list[dict[str, Any]] = []
    index = 0
    while True:
        try:
            status, total, _start, table = await device.zdo.request(
                zdo_t.ZDOCmd.Mgmt_Bind_req, index
            )
        except ERRORS as err:
            raise HomeAssistantError(
                "The remote didn't answer. Press a button on it to wake it, then try again."
            ) from err
        if status != zdo_t.Status.SUCCESS:
            raise HomeAssistantError(f"The remote refused: {getattr(status, 'name', status)}")
        for binding in table:
            dst = binding.DstAddress
            entries.append(
                {
                    "endpoint": int(binding.SrcEndpoint),
                    "cluster": int(binding.ClusterId),
                    "addrmode": int(dst.addrmode),
                    "group_id": int(dst.nwk) if dst.addrmode == 1 else None,
                }
            )
        index += len(table)
        if not table or index >= total:
            return entries
