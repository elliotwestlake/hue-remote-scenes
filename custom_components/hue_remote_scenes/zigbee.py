"""Talking to ZHA's groups and devices through zigpy.

Store / remove / get-membership go to each light separately: Zigbee devices
don't answer group-addressed scene commands, and we want to tell the user which
lights didn't take it. Recall goes to the group (one multicast), so the lights
change together, the same way a bound remote does it.
"""

from __future__ import annotations

import asyncio
import logging
from collections.abc import Callable
from typing import Any

from zigpy.exceptions import ZigbeeException
from zigpy.types import EUI64
from zigpy.zcl.foundation import Status
from zigpy.zdo import types as zdo_t

from homeassistant.components.zha.helpers import get_zha_gateway
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_call_later

from .const import CLUSTER_ON_OFF, CLUSTER_SCENES, REFRESH_ATTRS, REFRESH_DELAY, REMOTE_CLUSTERS
from .logic import member_key, parse_member_key, plain, remote_endpoints

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


async def async_copy(hass: HomeAssistant, group_id: int, from_id: int, to_id: int) -> dict[str, str]:
    """Each light copies its stored scene from_id to to_id (ZCL Copy Scene), without changing."""
    replies = await _each(
        _group(hass, group_id),
        lambda c: c.copy(
            mode=0,
            group_id_from=group_id,
            scene_id_from=from_id,
            group_id_to=group_id,
            scene_id_to=to_id,
        ),
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
            _async_refresh(group), f"hue_remote_scenes refresh {group_id}"
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
                    "last_seen": _timestamp(getattr(device, "last_seen", None)),
                    "endpoints": [{"id": ep, "clusters": c} for ep, c in found.items()],
                }
            )
    return sorted(out, key=lambda r: r["name"].lower())


def _timestamp(value: Any) -> float | None:
    """Unix time ZHA last heard from a device; it may hand us a float or a datetime."""
    if isinstance(value, (int, float)):
        return float(value)
    if hasattr(value, "timestamp"):
        return value.timestamp()
    return None


def device_model(hass: HomeAssistant, ieee: str) -> str | None:
    """ZHA's model string for a device, or None if ZHA doesn't know it."""
    try:
        device = _gateway(hass).devices.get(EUI64.convert(ieee))
    except (HomeAssistantError, ValueError):
        return None
    return device.model if device is not None else None


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
                    **(
                        {"ieee": str(dst.ieee), "dst_endpoint": int(dst.endpoint)}
                        if dst.addrmode == 3
                        else {}
                    ),
                }
            )
        index += len(table)
        if not table or index >= total:
            return entries


def coordinator_ieee(hass: HomeAssistant) -> str:
    return str(_gateway(hass).coordinator_zha_device.ieee)


async def async_unbind_entries(
    hass: HomeAssistant, ieee: str, entries: list[dict[str, Any]]
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    """Unbind binding table entries (from async_binding_table). Returns (removed, failed)."""
    device = _zigpy_device(hass, ieee)
    removed: list[dict[str, Any]] = []
    failed: list[dict[str, Any]] = []
    for entry in entries:
        if entry["addrmode"] == 1:
            destination = zdo_t.MultiAddress(addrmode=1, nwk=entry["group_id"])
        else:
            destination = zdo_t.MultiAddress(
                addrmode=3, ieee=EUI64.convert(entry["ieee"]), endpoint=entry["dst_endpoint"]
            )
        try:
            reply = await device.zdo.request(
                zdo_t.ZDOCmd.Unbind_req,
                device.ieee,
                entry["endpoint"],
                entry["cluster"],
                destination,
            )
        except ERRORS:
            failed.append(entry)
            continue
        status = reply[0] if reply else None
        # NO_ENTRY: it's gone already, which is what we wanted.
        if status in (zdo_t.Status.SUCCESS, zdo_t.Status.NO_ENTRY):
            removed.append(entry)
        else:
            failed.append(entry)
    return removed, failed


SCENES_RECALL = 0x05
BIND_RETRY = 2.0  # seconds between bind attempts while a remote sleeps


def lights(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Every endpoint that can switch and store scenes, so it can join a scenes group."""
    out = []
    for device in _gateway(hass).devices.values():
        if device.is_coordinator:
            continue
        for ep_id, ep in device.device.endpoints.items():
            if ep_id and {CLUSTER_ON_OFF, CLUSTER_SCENES} <= set(ep.in_clusters):
                out.append(
                    {
                        "key": member_key(str(device.ieee), int(ep_id)),
                        "ieee": str(device.ieee),
                        "name": device.name,
                    }
                )
    return sorted(out, key=lambda light: light["name"].lower())


async def async_find_dial_group(hass: HomeAssistant, ieee: str, timeout: float) -> dict[str, int]:
    """Wait for the remote to recall a scene; return the group and scene it used.

    A Hue Tap Dial (and a gen 2 Hue dimmer's Hue button) always recalls scenes on its
    own built-in group. To see the press, bind its Scenes cluster to the coordinator first. It's asleep until a
    button is pressed, so keep retrying the bind until the press comes through.
    """
    gateway = _gateway(hass)
    device = _zigpy_device(hass, ieee)
    endpoint = next(
        (ep for ep_id, ep in device.endpoints.items() if ep_id and CLUSTER_SCENES in ep.out_clusters),
        None,
    )
    if endpoint is None:
        raise HomeAssistantError("This remote doesn't send scene commands")
    cluster = endpoint.out_clusters[CLUSTER_SCENES]
    found: asyncio.Future[dict[str, int]] = hass.loop.create_future()

    class _Listener:
        def cluster_command(self, tsn: int, command_id: int, args: Any) -> None:
            if command_id == SCENES_RECALL and not found.done():
                found.set_result({"group_id": int(args.group_id), "scene_id": int(args.scene_id)})

    async def _bind_to_coordinator() -> None:
        destination = zdo_t.MultiAddress(
            addrmode=3, ieee=gateway.coordinator_zha_device.ieee, endpoint=1
        )
        while not found.done():
            try:
                reply = await device.zdo.request(
                    zdo_t.ZDOCmd.Bind_req, device.ieee, endpoint.endpoint_id, CLUSTER_SCENES, destination
                )
                if reply and reply[0] == zdo_t.Status.SUCCESS:
                    return
            except ERRORS:
                pass
            await asyncio.sleep(BIND_RETRY)

    listener = _Listener()
    cluster.add_listener(listener)
    binder = hass.async_create_background_task(_bind_to_coordinator(), f"hue_remote_scenes bind {ieee}")
    try:
        return await asyncio.wait_for(found, timeout)
    except TimeoutError as err:
        raise HomeAssistantError(
            "Didn't see a button press. Press one of the scene buttons on the remote a few "
            "times, a couple of seconds apart, while this is waiting."
        ) from err
    finally:
        binder.cancel()
        cluster.remove_listener(listener)


async def async_create_group(
    hass: HomeAssistant, group_id: int, name: str, member_keys: list[str]
) -> None:
    """Create a ZHA group with this exact id (a dial's), or add lights to it if it exists."""
    from zha.zigbee.group import GroupMemberReference

    gateway = _gateway(hass)
    refs = {}
    for key in member_keys:
        ieee, endpoint_id = parse_member_key(key)
        refs[key] = GroupMemberReference(ieee=EUI64.convert(ieee), endpoint_id=endpoint_id)
    group = gateway.groups.get(group_id)
    if group is None:
        if any(g.name == name for g in gateway.groups.values()):
            raise HomeAssistantError(f"ZHA already has a group called {name}")
        group = await gateway.async_create_zigpy_group(name, list(refs.values()), group_id)
        if group is None:
            raise HomeAssistantError("ZHA didn't create the group")
        return
    existing = {member_key(str(m.device.ieee), int(m.endpoint_id)) for m in group.members}
    if missing := [ref for key, ref in refs.items() if key not in existing]:
        await group.async_add_members(missing)


# --- Diagnostics ---


def _cluster_list(clusters: dict[int, Any]) -> list[dict[str, Any]]:
    return [
        {"id": int(cid), "name": getattr(c, "name", None) or getattr(c, "ep_attribute", None)}
        for cid, c in sorted(clusters.items())
    ]


def remote_info(hass: HomeAssistant, ieee: str) -> dict[str, Any]:
    """Everything ZHA and zigpy know about a device, for the diagnostics card."""
    gateway = _gateway(hass)
    device = gateway.devices.get(EUI64.convert(ieee))
    if device is None:
        raise HomeAssistantError(f"ZHA has no device {ieee}")
    zdev = device.device

    def attr(obj: Any, name: str) -> Any:
        try:
            value = getattr(obj, name, None)
        except Exception:  # noqa: BLE001 - diagnostics must not fail on one odd property
            return None
        if value is None or isinstance(value, (bool, int, float, str)):
            return value
        return str(value)

    return {
        "ieee": str(device.ieee),
        "name": device.name,
        "model": device.model,
        "manufacturer": device.manufacturer,
        "nwk": f"0x{int(zdev.nwk):04X}" if getattr(zdev, "nwk", None) is not None else None,
        "quirk": attr(device, "quirk_class") or f"{type(zdev).__module__}.{type(zdev).__name__}",
        "quirk_applied": attr(device, "quirk_applied"),
        "firmware": attr(device, "firmware_version") or attr(device, "sw_version"),
        "power_source": attr(device, "power_source"),
        "available": attr(device, "available"),
        "lqi": attr(device, "lqi"),
        "rssi": attr(device, "rssi"),
        "last_seen": _timestamp(getattr(device, "last_seen", None)),
        "endpoints": [
            {
                "id": int(ep_id),
                "profile": f"0x{int(ep.profile_id):04X}" if getattr(ep, "profile_id", None) is not None else None,
                "device_type": f"0x{int(ep.device_type):04X}" if getattr(ep, "device_type", None) is not None else None,
                "in": _cluster_list(ep.in_clusters),
                "out": _cluster_list(ep.out_clusters),
            }
            for ep_id, ep in sorted(zdev.endpoints.items())
            if ep_id != 0
        ],
    }


def listen_remote(hass: HomeAssistant, ieee: str, record) -> Callable[[], None]:
    """Call record(**entry) for every ZCL command and attribute report from this device.

    This is below ZHA: it shows frames that reach the coordinator even when ZHA doesn't
    turn them into a zha_event. Returns a function that stops listening.
    """
    device = _zigpy_device(hass, ieee)
    attached: list[tuple[Any, Any]] = []

    class _Listener:
        def __init__(self, endpoint_id: int, cluster: Any, outgoing: bool) -> None:
            self.endpoint_id = endpoint_id
            self.cluster = cluster
            self.outgoing = outgoing

        def _base(self) -> dict[str, Any]:
            return {"endpoint": self.endpoint_id, "cluster": int(self.cluster.cluster_id)}

        def cluster_command(self, tsn: int, command_id: int, args: Any) -> None:
            # What a remote sends from its out (client) clusters are server commands.
            defs = self.cluster.server_commands if self.outgoing else self.cluster.client_commands
            definition = defs.get(command_id)
            record(
                **self._base(),
                command=definition.name if definition else f"0x{command_id:02X}",
                args=plain(args),
            )

        def attribute_updated(self, attrid: int, value: Any, *_args: Any) -> None:
            definition = self.cluster.attributes.get(attrid)
            record(
                **self._base(),
                command=f"report {definition.name if definition else f'0x{attrid:04X}'}",
                args=plain(value),
            )

    for ep_id, endpoint in device.endpoints.items():
        if ep_id == 0:
            continue
        for clusters, outgoing in ((endpoint.in_clusters, False), (endpoint.out_clusters, True)):
            for cluster in clusters.values():
                listener = _Listener(int(ep_id), cluster, outgoing)
                cluster.add_listener(listener)
                attached.append((cluster, listener))

    def _stop() -> None:
        for cluster, listener in attached:
            try:
                cluster.remove_listener(listener)
            except (KeyError, ValueError):
                pass

    return _stop
