"""End-to-end ZHA Scenes test: real zigpy devices/groups, fake radio, fake ZHA gateway.

The radio decodes every frame and behaves like real devices:
- bulbs keep a scene table {(group, scene): state} and answer store/remove/
  get_scene_membership; a groupcast recall applies the scene to every member bulb
- one bulb can be "unreachable" (DeliveryError)
- the remote answers ZDO Bind/Unbind and Mgmt_Bind (binding table)
"""

from __future__ import annotations

import asyncio
import contextvars
from collections import defaultdict
from datetime import timedelta
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest
import zigpy.device
import zigpy.exceptions
import zigpy.group
import zigpy.types as t
from zigpy.zcl import foundation
from zigpy.zcl.clusters.general import Scenes
from zigpy.zdo import types as zdo_t

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_time_changed,
)

DOMAIN = "zha_scenes"
GROUP = 5
S2C = foundation.Direction.Server_to_Client


class FakeApp:
    def __init__(self) -> None:
        self._req_listeners = defaultdict(list)
        self._packet_priority_var = contextvars.ContextVar("p", default=t.PacketPriority.NORMAL)
        self._seq = 0
        self.devices: dict[t.EUI64, zigpy.device.Device] = {}
        self.unreachable: set[t.EUI64] = set()
        self.sent: list[tuple[str, object, object]] = []  # (target, hdr, cmd)
        # Bulb state and scene tables.
        self.state: dict[t.EUI64, dict[str, object]] = {}
        self.scenes: dict[t.EUI64, dict[tuple[int, int], dict]] = defaultdict(dict)
        self.bindings: dict[t.EUI64, list[zdo_t.Binding]] = defaultdict(list)

    def __getattr__(self, name):
        mock = MagicMock(name=name)
        setattr(self, name, mock)
        return mock

    def get_sequence(self) -> int:
        self._seq = (self._seq + 1) % 256
        return self._seq

    def get_endpoint_id(self, cluster_id, is_server_cluster=False) -> int:
        return 1

    # --- unicast ---------------------------------------------------------
    async def request(self, device, profile, cluster, src_ep, dst_ep, sequence, data, **kw):
        if device.ieee in self.unreachable:
            raise zigpy.exceptions.DeliveryError("unreachable")
        loop = asyncio.get_running_loop()
        if dst_ep == 0:
            hdr, args = device.zdo.deserialize(cluster, data)
            self.sent.append((f"zdo:{device.ieee}", cluster, args))
            loop.call_soon(self._zdo, device, cluster, hdr.tsn, args)
            return
        cl = device.endpoints[dst_ep].in_clusters[cluster]
        hdr, rest = foundation.ZCLHeader.deserialize(data)
        if hdr.frame_control.is_cluster:
            cmd, _ = cl.server_commands[hdr.command_id].schema.deserialize(rest)
        else:
            cmd, _ = foundation.GENERAL_COMMANDS[hdr.command_id].schema.deserialize(rest)
        self.sent.append((f"{device.ieee}/{dst_ep}", hdr, cmd))
        loop.call_soon(self._zcl, device, dst_ep, cluster, hdr, cmd)

    # --- multicast -------------------------------------------------------
    async def send_packet(self, packet: t.ZigbeePacket) -> None:
        assert packet.dst.addr_mode == t.AddrMode.Group
        group_id = packet.dst.address
        hdr, rest = foundation.ZCLHeader.deserialize(packet.data.serialize())
        cmd, _ = Scenes.ServerCommandDefs.recall.schema.deserialize(rest)
        self.sent.append((f"group:{group_id}", hdr, cmd))
        assert packet.cluster_id == Scenes.cluster_id and hdr.command_id == 0x05
        for ieee, table in self.scenes.items():
            if (cmd.group_id, cmd.scene_id) in table:
                self.state[ieee] = dict(table[(cmd.group_id, cmd.scene_id)])

    # --- replies -----------------------------------------------------------
    def _deliver(self, device, src_ep, profile, cluster, data: bytes) -> None:
        device.packet_received(t.ZigbeePacket(
            src=t.AddrModeAddress(addr_mode=t.AddrMode.NWK, address=device.nwk), src_ep=src_ep,
            dst=t.AddrModeAddress(addr_mode=t.AddrMode.NWK, address=0), dst_ep=1 if src_ep else 0,
            tsn=data[0] if not src_ep else 0, profile_id=profile, cluster_id=cluster,
            data=t.SerializableBytes(data)))

    def _zcl_reply(self, device, ep, cluster, hdr, cmd_id, payload: bytes, general=False):
        rhdr = (foundation.ZCLHeader.general if general else foundation.ZCLHeader.cluster)(
            hdr.tsn, cmd_id, direction=S2C)
        self._deliver(device, ep, 260, cluster, rhdr.serialize() + payload)

    def _zcl(self, device, ep, cluster, hdr, cmd) -> None:
        ieee = device.ieee
        if cluster == Scenes.cluster_id and hdr.frame_control.is_cluster:
            C = Scenes.ClientCommandDefs
            table = self.scenes[ieee]
            key = (cmd.group_id, getattr(cmd, "scene_id", None))
            if hdr.command_id == 0x04:  # store
                table[key] = dict(self.state[ieee])
                rsp = C.store_scene_response.schema(status=0, group_id=cmd.group_id, scene_id=cmd.scene_id)
            elif hdr.command_id == 0x02:  # remove
                status = 0 if table.pop(key, None) is not None else foundation.Status.NOT_FOUND
                rsp = C.remove_scene_response.schema(status=status, group_id=cmd.group_id, scene_id=cmd.scene_id)
            elif hdr.command_id == 0x06:  # get_scene_membership
                ids = sorted(s for g, s in table if g == cmd.group_id)
                rsp = C.get_scene_membership_response.schema(
                    status=0, capacity=16 - len(table), group_id=cmd.group_id, scenes=ids)
            else:
                raise AssertionError(hdr)
            self._zcl_reply(device, ep, cluster, hdr, hdr.command_id, rsp.serialize())
        elif hdr.command_id == foundation.GeneralCommand.Read_Attributes:
            cl = device.endpoints[ep].in_clusters[cluster]
            records = []
            for attrid in cmd.attribute_ids:
                adef = cl.attributes[attrid]
                value = self.state.get(ieee, {}).get(adef.name, 0)
                records.append(foundation.ReadAttributeRecord(
                    attrid=attrid, status=foundation.Status.SUCCESS,
                    value=foundation.TypeValue(type=foundation.DataType.from_python_type(adef.type).type_id,
                                               value=adef.type(value))))
            schema = foundation.GENERAL_COMMANDS[foundation.GeneralCommand.Read_Attributes_rsp].schema
            self._zcl_reply(device, ep, cluster, hdr, foundation.GeneralCommand.Read_Attributes_rsp,
                            schema(status_records=records).serialize(), general=True)

    def _zdo(self, device, cluster, tsn, args) -> None:
        ieee = device.ieee
        if cluster in (zdo_t.ZDOCmd.Bind_req, zdo_t.ZDOCmd.Unbind_req):
            src, src_ep, cluster_id, dst = args
            binding = zdo_t.Binding(SrcAddress=src, SrcEndpoint=src_ep, ClusterId=cluster_id, DstAddress=dst)
            if cluster == zdo_t.ZDOCmd.Bind_req:
                self.bindings[ieee].append(binding)
            else:
                self.bindings[ieee] = [b for b in self.bindings[ieee] if b.serialize() != binding.serialize()]
            payload = zdo_t.Status.SUCCESS.serialize()
        elif cluster == zdo_t.ZDOCmd.Mgmt_Bind_req:
            (start,) = args
            table = self.bindings[ieee]
            page = table[start:start + 2]  # small pages, to exercise paging
            payload = (zdo_t.Status.SUCCESS.serialize() + t.uint8_t(len(table)).serialize()
                       + t.uint8_t(start).serialize()
                       + t.LVList[zdo_t.Binding, t.uint8_t](page).serialize())
        else:
            raise AssertionError(cluster)
        self._deliver(device, 0, 0, cluster | 0x8000, t.uint8_t(tsn).serialize() + payload)

    def press(self, dial, scene_id: int, group_id: int) -> None:
        """A Tap Dial scene button: wakes it, and recalls (group_id, scene_id) wherever its
        Scenes cluster is bound: to the coordinator (HA sees it), or to the group (lights change)."""
        self.unreachable.discard(dial.ieee)
        hdr = foundation.ZCLHeader.cluster(self.get_sequence(), 0x05, direction=foundation.Direction.Client_to_Server)
        payload = Scenes.ServerCommandDefs.recall.schema(group_id=group_id, scene_id=scene_id).serialize()
        for b in self.bindings[dial.ieee]:
            if b.ClusterId != Scenes.cluster_id:
                continue
            if b.DstAddress.addrmode == 3:
                self._deliver(dial, 1, 260, Scenes.cluster_id, hdr.serialize() + payload)
            elif b.DstAddress.nwk == group_id:
                for ieee, table in self.scenes.items():
                    if (group_id, scene_id) in table:
                        self.state[ieee] = dict(table[(group_id, scene_id)])

    def frames(self, prefix: str):
        return [(h, c) for target, h, c in self.sent if target.startswith(prefix)]


def _device(app, ieee, nwk, endpoints):
    dev = zigpy.device.Device(app, t.EUI64.convert(ieee), nwk)
    for ep_id, (ins, outs) in endpoints.items():
        ep = dev.add_endpoint(ep_id)
        ep.profile_id = 260
        for c in ins:
            ep.add_input_cluster(c)
        for c in outs:
            ep.add_output_cluster(c)
    app.devices[dev.ieee] = dev
    return dev


@pytest.fixture
def zigbee():
    import custom_components.zha_scenes.zigbee  # noqa: F401
    app = FakeApp()
    bulb_eps = {11: ([0x0000, 0x0004, 0x0005, 0x0006, 0x0008, 0x0300], [0x0019])}
    bulb1 = _device(app, "00:17:88:01:00:00:00:01", 0x1001, bulb_eps)
    bulb2 = _device(app, "00:17:88:01:00:00:00:02", 0x1002, bulb_eps)
    plug = _device(app, "00:17:88:01:00:00:00:03", 0x1003, {1: ([0x0000, 0x0006], [])})
    dial = _device(app, "00:17:88:01:00:00:00:04", 0x1004,
                   {1: ([0x0000, 0x0001, 0x0003, 0xFC00], [0x0003, 0x0004, 0x0005, 0x0006, 0x0008, 0x0019])})
    app.state[bulb1.ieee] = {"on_off": 1, "current_level": 200, "color_temperature": 300}
    app.state[bulb2.ieee] = {"on_off": 1, "current_level": 120, "color_temperature": 250}

    groups = zigpy.group.Groups(app)
    zgroup = groups.add_group(GROUP, "Living room")
    names = {bulb1.ieee: "Lamp 1", bulb2.ieee: "Lamp 2", plug.ieee: "Plug", dial.ieee: "Tap dial"}
    zha_devices = {
        d.ieee: SimpleNamespace(ieee=d.ieee, name=names[d.ieee], model="RDM002" if d is dial else "LCA001",
                                manufacturer="Signify", is_coordinator=False,
                                is_mains_powered=d is not dial, device=d)
        for d in (bulb1, bulb2, plug, dial)
    }
    zha_devices[t.EUI64.convert("00:00:00:00:00:00:00:00")] = SimpleNamespace(
        ieee="coord", name="Coordinator", is_coordinator=True, device=None)
    members = []
    for d, ep_id in ((bulb1, 11), (bulb2, 11), (plug, 1)):
        zgroup.add_member(d.endpoints[ep_id])
        members.append(SimpleNamespace(device=zha_devices[d.ieee], endpoint_id=t.uint8_t(ep_id), endpoint=d.endpoints[ep_id]))
    # zgroup.group_id is zigpy's t.Group (str()s as "0x0005"), exactly what ZHA hands out.
    zha_group = SimpleNamespace(group_id=zgroup.group_id, name="Living room", members=members, endpoint=zgroup.endpoint)
    gateway = SimpleNamespace(groups={zgroup.group_id: zha_group}, devices=zha_devices,
                              coordinator_zha_device=SimpleNamespace(ieee=t.EUI64.convert("00:00:00:00:00:00:00:00")))

    def _member(ref):
        dev = app.devices[ref.ieee]
        return SimpleNamespace(device=zha_devices[ref.ieee], endpoint_id=t.uint8_t(ref.endpoint_id),
                               endpoint=dev.endpoints[ref.endpoint_id])

    async def create_group(name, members, group_id=None):
        zg = groups.add_group(group_id, name)
        group = SimpleNamespace(group_id=zg.group_id, name=name, members=[], endpoint=zg.endpoint)

        async def add_members(refs):
            for ref in refs:
                zg.add_member(app.devices[ref.ieee].endpoints[ref.endpoint_id])
                group.members.append(_member(ref))
        group.async_add_members = add_members
        await add_members(members or [])
        gateway.groups[zg.group_id] = group
        return group
    gateway.async_create_zigpy_group = create_group
    app.bulb1, app.bulb2, app.dial = bulb1, bulb2, dial
    with patch("custom_components.zha_scenes.zigbee.get_zha_gateway", return_value=gateway), \
         patch("homeassistant.components.panel_custom.async_register_panel"), \
         patch("homeassistant.components.frontend.async_remove_panel"):
        yield app


@pytest.fixture(autouse=True)
async def auto_enable(hass, enable_custom_integrations):
    from homeassistant.setup import async_setup_component
    for dep in ("http", "websocket_api"):
        assert await async_setup_component(hass, dep, {})
    hass.config.components.update({"frontend", "panel_custom", "zha"})
    yield


async def _setup(hass) -> MockConfigEntry:
    entry = MockConfigEntry(domain=DOMAIN, title="ZHA Scenes", data={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


def _m(dev, ep=11):
    return f"{dev.ieee}/{ep}"


async def test_config_flow(hass: HomeAssistant, zigbee) -> None:
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "single_instance_allowed"


async def test_config_flow_no_zha(hass: HomeAssistant, zigbee) -> None:
    components = type(hass.config.components)
    with patch.object(components, "__contains__", lambda self, v: v != "zha" and set.__contains__(self, v)):
        result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "no_zha"


async def test_scenes(hass: HomeAssistant, zigbee, hass_ws_client) -> None:
    app = zigbee
    await _setup(hass)
    client = await hass_ws_client(hass)

    async def ws(msg_id, **msg):
        await client.send_json({"id": msg_id, **msg})
        return await client.receive_json()

    r = await ws(1, type="zha_scenes/groups")
    assert r["success"], r
    (group,) = r["result"]["groups"]
    assert group["id"] == GROUP and group["name"] == "Living room" and group["scenes"] == []
    assert [(m["name"], m["scenes"]) for m in group["members"]] == [("Lamp 1", True), ("Lamp 2", True), ("Plug", False)]

    # Store: unicast to each bulb (not the plug), entity appears.
    r = await ws(2, type="zha_scenes/store", group_id=GROUP, name="Relax")
    assert r["success"], r
    assert r["result"] == {"scene_id": 1, "ok": sorted([_m(app.bulb1), _m(app.bulb2)]), "failed": {}}
    stores = app.frames(str(app.bulb1.ieee)) + app.frames(str(app.bulb2.ieee))
    assert [(h.command_id, c.group_id, c.scene_id) for h, c in stores] == [(4, GROUP, 1), (4, GROUP, 1)]
    assert not app.frames(str(app.dial.ieee)) and not app.frames("00:17:88:01:00:00:00:03")
    await hass.async_block_till_done()
    state = hass.states.get("scene.living_room_relax")
    assert state is not None and state.attributes["scene_id"] == 1 and state.attributes["group_id"] == GROUP

    # Change the lights, store a second scene with one bulb unreachable: partial success is reported.
    app.state[app.bulb1.ieee] = {"on_off": 1, "current_level": 30, "color_temperature": 450}
    app.unreachable.add(app.bulb2.ieee)
    r = await ws(3, type="zha_scenes/store", group_id=GROUP, name="Night")
    assert r["result"]["scene_id"] == 2 and r["result"]["failed"] == {_m(app.bulb2): "no answer"}
    app.unreachable.clear()

    # Recall via the scene entity: one groupcast, with transition in tenths of a second.
    app.sent.clear()
    await hass.services.async_call("scene", "turn_on", {"entity_id": "scene.living_room_relax", "transition": 1.5}, blocking=True)
    ((hdr, cmd),) = app.frames("group:")
    assert (cmd.group_id, cmd.scene_id, cmd.transition_time) == (GROUP, 1, 15)
    assert app.state[app.bulb1.ieee]["current_level"] == 200  # scene 1 restored
    assert not app.frames("00:17")  # nothing unicast for the recall itself
    # ...then the lights are re-read so ZHA's entities catch up.
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=5))
    await hass.async_block_till_done(wait_background_tasks=True)
    reads = [h for h, _ in app.frames(str(app.bulb1.ieee)) if not h.frame_control.is_cluster]
    assert len(reads) == 3  # on/off, level, color

    # Rename, then re-save over scene 1.
    r = await ws(4, type="zha_scenes/rename", group_id=GROUP, scene_id=1, name="Evening")
    assert r["success"]
    await hass.async_block_till_done()
    assert hass.states.get("scene.living_room_relax").name == "Living room Evening"
    r = await ws(5, type="zha_scenes/store", group_id=GROUP, scene_id=1)
    assert r["result"]["scene_id"] == 1 and len(r["result"]["ok"]) == 2

    # Delete scene 2: bulb2 never had it ("not found" isn't a failure). Entity goes away.
    r = await ws(6, type="zha_scenes/delete", group_id=GROUP, scene_id=2)
    assert r["success"] and r["result"]["failed"] == {}
    await hass.async_block_till_done()
    assert hass.states.get("scene.living_room_night") is None
    assert (GROUP, 2) not in app.scenes[app.bulb1.ieee]

    # Errors.
    r = await ws(7, type="zha_scenes/recall", group_id=GROUP, scene_id=99)
    assert not r["success"] and r["error"]["code"] == "invalid"
    r = await ws(8, type="zha_scenes/store", group_id=GROUP, name="  ")
    assert r["error"]["code"] == "invalid"
    app.unreachable |= {app.bulb1.ieee, app.bulb2.ieee}
    r = await ws(9, type="zha_scenes/store", group_id=GROUP, name="Nope")
    assert not r["success"] and "No light saved the scene" in r["error"]["message"]
    app.unreachable.clear()
    r = await ws(10, type="zha_scenes/groups")
    assert [s["id"] for s in r["result"]["groups"][0]["scenes"]] == [1]


async def test_import_scenes_made_elsewhere(hass: HomeAssistant, zigbee, hass_ws_client) -> None:
    app = zigbee
    # Scenes stored on the bulbs earlier (e.g. by Zigbee2MQTT), unknown to us.
    app.scenes[app.bulb1.ieee] = {(GROUP, 3): {"on_off": 1}, (GROUP, 9): {"on_off": 0}, (7, 1): {}}
    app.scenes[app.bulb2.ieee] = {(GROUP, 3): {"on_off": 1}}
    app.unreachable.add(app.bulb2.ieee)
    await _setup(hass)
    resp = await hass.services.async_call(DOMAIN, "import_scenes", {"group_id": GROUP}, blocking=True, return_response=True)
    assert resp == {"added": [3, 9], "found": [3, 9], "no_answer": [_m(app.bulb2)]}
    await hass.async_block_till_done()
    assert hass.states.get("scene.living_room_scene_3").attributes["members"] == [_m(app.bulb1)]
    # Import again with both answering: members refresh, names are kept.
    app.unreachable.clear()
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "zha_scenes/rename", "group_id": GROUP, "scene_id": 3, "name": "Bright"})
    await client.receive_json()
    await client.send_json({"id": 2, "type": "zha_scenes/import", "group_id": GROUP})
    r = await client.receive_json()
    assert r["result"]["added"] == []
    await client.send_json({"id": 3, "type": "zha_scenes/groups"})
    r = await client.receive_json()
    scenes = {s["id"]: s for s in r["result"]["groups"][0]["scenes"]}
    assert scenes[3]["name"] == "Bright" and scenes[3]["members"] == sorted([_m(app.bulb1), _m(app.bulb2)])

    # store_scene action works too, and returns the result.
    resp = await hass.services.async_call(DOMAIN, "store_scene", {"group_id": GROUP, "name": "Film"}, blocking=True, return_response=True)
    assert resp["scene_id"] == 1  # lowest free id


async def test_scenes_survive_restart(hass: HomeAssistant, zigbee, hass_storage) -> None:
    hass_storage[DOMAIN] = {"version": 1, "minor_version": 1, "key": DOMAIN,
                            "data": {"groups": {str(GROUP): {"4": {"name": "Reading", "members": []}}}}}
    await _setup(hass)
    assert hass.states.get("scene.living_room_reading") is not None


async def test_remotes_and_binding(hass: HomeAssistant, zigbee, hass_ws_client) -> None:
    app = zigbee
    await _setup(hass)
    client = await hass_ws_client(hass)

    async def ws(msg_id, **msg):
        await client.send_json({"id": msg_id, **msg})
        return await client.receive_json()

    r = await ws(1, type="zha_scenes/remotes")
    assert r["result"]["remotes"] == [{
        "ieee": str(app.dial.ieee), "name": "Tap dial", "model": "RDM002", "manufacturer": "Signify",
        "battery": True, "endpoints": [{"id": 1, "clusters": [6, 8, 5]}],
        "area": None, "bound": [], "checked": None, "dial_supported": True, "dial": None}]

    r = await ws(2, type="zha_scenes/bind", ieee=str(app.dial.ieee), endpoint=1, group_id=GROUP)
    assert r["success"], r
    assert r["result"]["results"] == {"6": "ok", "8": "ok", "5": "ok"}
    binds = app.frames(f"zdo:{app.dial.ieee}")
    assert [(c, a[1], a[2], a[3].addrmode, a[3].nwk) for c, a in binds] == [
        (zdo_t.ZDOCmd.Bind_req, 1, cl, 1, GROUP) for cl in (6, 8, 5)]

    # Binding table read pages through (2 per page here).
    r = await ws(3, type="zha_scenes/bindings", ieee=str(app.dial.ieee))
    assert r["result"]["bindings"] == [{"endpoint": 1, "cluster": c, "group_id": GROUP} for c in (5, 6, 8)]

    r = await ws(4, type="zha_scenes/bind", ieee=str(app.dial.ieee), endpoint=1, group_id=GROUP, clusters=[8], unbind=True)
    assert r["result"]["results"] == {"8": "ok"}
    r = await ws(5, type="zha_scenes/bindings", ieee=str(app.dial.ieee))
    assert [b["cluster"] for b in r["result"]["bindings"]] == [5, 6]

    # Asleep remote.
    app.unreachable.add(app.dial.ieee)
    r = await ws(6, type="zha_scenes/bind", ieee=str(app.dial.ieee), endpoint=1, group_id=GROUP, clusters=[6])
    assert r["result"]["results"] == {"6": "no answer"}
    r = await ws(7, type="zha_scenes/bindings", ieee=str(app.dial.ieee))
    assert not r["success"] and "Press a button" in r["error"]["message"]


async def test_areas_and_remembered_bindings(hass: HomeAssistant, zigbee, hass_ws_client) -> None:
    from homeassistant.helpers import area_registry as ar, device_registry as dr, entity_registry as er
    app = zigbee
    zha_entry = MockConfigEntry(domain="zha")
    zha_entry.add_to_hass(hass)
    areas, devices = ar.async_get(hass), dr.async_get(hass)
    lounge, hall = areas.async_create("Lounge"), areas.async_create("Hall")
    for dev, area in ((app.bulb1, lounge), (app.bulb2, lounge), (app.dial, hall)):
        d = devices.async_get_or_create(config_entry_id=zha_entry.entry_id, identifiers={("zha", str(dev.ieee))})
        devices.async_update_device(d.id, area_id=area.id)
    await _setup(hass)
    client = await hass_ws_client(hass)

    async def ws(msg_id, **msg):
        await client.send_json({"id": msg_id, **msg})
        return await client.receive_json()

    # Area from the members; no remotes known yet.
    (group,) = (await ws(1, type="zha_scenes/groups"))["result"]["groups"]
    assert group["areas"] == ["Lounge"] and group["remotes"] == []
    (remote,) = (await ws(2, type="zha_scenes/remotes"))["result"]["remotes"]
    assert remote["area"] == "Hall" and remote["bound"] == [] and remote["checked"] is None

    # Binding is remembered without reading the table.
    await ws(3, type="zha_scenes/bind", ieee=str(app.dial.ieee), endpoint=1, group_id=GROUP, clusters=[6, 8])
    (group,) = (await ws(4, type="zha_scenes/groups"))["result"]["groups"]
    assert group["remotes"] == [{"ieee": str(app.dial.ieee), "name": "Tap dial", "clusters": [6, 8]}]
    (remote,) = (await ws(5, type="zha_scenes/remotes"))["result"]["remotes"]
    assert remote["bound"] == [{"group_id": GROUP, "clusters": [6, 8]}] and remote["checked"] is None

    # Reading the table replaces what we remember (here: something else added scenes) and sets checked.
    app.bindings[app.dial.ieee].append(zdo_t.Binding(
        SrcAddress=app.dial.ieee, SrcEndpoint=1, ClusterId=5, DstAddress=zdo_t.MultiAddress(addrmode=1, nwk=GROUP)))
    await ws(6, type="zha_scenes/bindings", ieee=str(app.dial.ieee))
    (remote,) = (await ws(7, type="zha_scenes/remotes"))["result"]["remotes"]
    assert remote["bound"] == [{"group_id": GROUP, "clusters": [5, 6, 8]}] and remote["checked"]

    # Unbinding everything drops the group.
    await ws(8, type="zha_scenes/bind", ieee=str(app.dial.ieee), endpoint=1, group_id=GROUP, unbind=True)
    (group,) = (await ws(9, type="zha_scenes/groups"))["result"]["groups"]
    assert group["remotes"] == []

    # An area set on ZHA's group entity wins over the members' areas.
    entities = er.async_get(hass)
    ent = entities.async_get_or_create("light", "zha", f"light_zha_group_0x{GROUP:04x}", config_entry=zha_entry)
    entities.async_update_entity(ent.entity_id, area_id=hall.id)
    (group,) = (await ws(10, type="zha_scenes/groups"))["result"]["groups"]
    assert group["areas"] == ["Hall"]


DIAL_GROUP = 0x9C21  # a Tap Dial's built-in group


async def test_dial_setup(hass: HomeAssistant, zigbee, hass_ws_client) -> None:
    app = zigbee
    app.unreachable.add(app.dial.ieee)  # asleep
    await _setup(hass)
    client = await hass_ws_client(hass)

    async def ws(msg_id, **msg):
        await client.send_json({"id": msg_id, **msg})
        return await client.receive_json()

    # 1. Find the dial's group: wait for a press. The first press only wakes it (its
    #    Scenes cluster isn't bound to the coordinator yet), the next one is seen.
    with patch("custom_components.zha_scenes.zigbee.BIND_RETRY", 0):
        await client.send_json({"id": 1, "type": "zha_scenes/find_dial_group", "ieee": str(app.dial.ieee)})
        scenes_out = app.dial.endpoints[1].out_clusters[Scenes.cluster_id]

        async def until(check):
            for _ in range(200):
                if check():
                    return
                await asyncio.sleep(0.01)
            raise AssertionError("timed out")

        await until(lambda: scenes_out._listeners)  # listening; binds failing while asleep
        app.press(app.dial, 1, DIAL_GROUP)  # wakes it; nothing reaches HA yet
        await until(lambda: any(b.DstAddress.addrmode == 3 for b in app.bindings[app.dial.ieee]))
        app.press(app.dial, 1, DIAL_GROUP)  # now bound to the coordinator: HA sees it
        r = await client.receive_json()
    assert r["success"], r
    assert r["result"] == {"group_id": DIAL_GROUP, "scene_id": 1, "exists": False}
    coordinator_binds = [b for b in app.bindings[app.dial.ieee] if b.DstAddress.addrmode == 3]
    assert [(b.ClusterId, b.DstAddress.endpoint) for b in coordinator_binds] == [(5, 1)]

    (remote,) = (await ws(2, type="zha_scenes/remotes"))["result"]["remotes"]
    assert remote["dial"] == {"group_id": DIAL_GROUP, "buttons": [["1 dot", 1], ["2 dots", 0], ["3 dots", 5], ["4 dots", 4]]}

    # 2. Create a ZHA group with exactly that id, with both bulbs.
    lights = (await ws(3, type="zha_scenes/lights"))["result"]["lights"]
    assert [l["name"] for l in lights] == ["Lamp 1", "Lamp 2"]  # not the plug (no scenes), dial or coordinator
    r = await ws(4, type="zha_scenes/create_group", group_id=DIAL_GROUP, name="Lounge dial",
                 members=[l["key"] for l in lights])
    assert r["success"], r
    groups = {g["id"]: g for g in (await ws(5, type="zha_scenes/groups"))["result"]["groups"]}
    dial_group = groups[DIAL_GROUP]
    assert dial_group["name"] == "Lounge dial" and len(dial_group["members"]) == 2
    assert dial_group["dials"] == [{"ieee": str(app.dial.ieee), "name": "Tap dial", "buttons": [
        {"label": "1 dot", "scene_id": 1}, {"label": "2 dots", "scene_id": 0},
        {"label": "3 dots", "scene_id": 5}, {"label": "4 dots", "scene_id": 4}]}]
    # Running it again just adds missing members.
    assert (await ws(6, type="zha_scenes/create_group", group_id=DIAL_GROUP, name="Lounge dial", members=[lights[0]["key"]]))["success"]

    # 3. Save button scenes at the button's ids (2 dots = scene 0).
    app.state[app.bulb1.ieee] = {"on_off": 1, "current_level": 254}
    r = await ws(7, type="zha_scenes/store", group_id=DIAL_GROUP, scene_id=0, name="Bright")
    assert r["success"] and r["result"]["scene_id"] == 0
    app.state[app.bulb1.ieee] = {"on_off": 1, "current_level": 20}
    await ws(8, type="zha_scenes/store", group_id=DIAL_GROUP, scene_id=1, name="Dim")
    # A plain new scene in a dial's group skips the button ids.
    r = await ws(9, type="zha_scenes/store", group_id=DIAL_GROUP, name="Extra")
    assert r["result"]["scene_id"] == 2

    # 4. Bind the dial to its group; then the button recalls the scene on the lights, no HA involved.
    r = await ws(10, type="zha_scenes/bind", ieee=str(app.dial.ieee), endpoint=1, group_id=DIAL_GROUP)
    assert r["result"]["results"] == {"6": "ok", "8": "ok", "5": "ok"}
    app.press(app.dial, 0, DIAL_GROUP)  # 2 dots
    assert app.state[app.bulb1.ieee]["current_level"] == 254
    app.press(app.dial, 1, DIAL_GROUP)  # 1 dot
    assert app.state[app.bulb1.ieee]["current_level"] == 20


async def test_find_dial_group_times_out(hass: HomeAssistant, zigbee, hass_ws_client) -> None:
    await _setup(hass)
    client = await hass_ws_client(hass)
    with patch("custom_components.zha_scenes.zigbee.BIND_RETRY", 0):
        await client.send_json({"id": 1, "type": "zha_scenes/find_dial_group", "ieee": str(zigbee.dial.ieee), "timeout": 5})
        r = await client.receive_json()
    assert not r["success"] and "Didn't see a button press" in r["error"]["message"]
