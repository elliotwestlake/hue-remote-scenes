# ZHA Scenes — project notes

A Home Assistant Marketplace (formerly HACS) custom integration, domain `zha_scenes`, adding what ZHA lacks compared with Zigbee2MQTT: **Zigbee scenes stored on the lights** (store / recall / rename / delete / import) and a friendlier **remote → group binding** UI. Built for Elliot's Hue lights and Hue Tap Dials, as part of moving from Z2M to ZHA. Sibling project: `hive-local` (same structure and conventions).

## Layout

- `custom_components/zha_scenes/`
  - `__init__.py`: `async_setup` registers the static path, websocket commands and actions. `async_setup_entry` checks ZHA is running (else `ConfigEntryNotReady`), loads the store, sets `entry.runtime_data = SceneManager`, forwards the `scene` platform, registers the admin-only panel.
  - `config_flow.py`: one step, aborts if ZHA isn't loaded. `single_config_entry` in the manifest.
  - `zigbee.py`: all ZHA/zigpy access, via `homeassistant.components.zha.helpers.get_zha_gateway(hass)` → `.groups` (id → ZHA Group: `.name`, `.members` with `.device`/`.endpoint_id`/`.endpoint`, `.endpoint` = zigpy group endpoint) and `.devices` (EUI64 → ZHA Device: `.device` is zigpy).
  - `manager.py`: `SceneManager`, the operations shared by websocket, actions and entities.
  - `store.py`: scene names and member lists, plus each remote's remembered group bindings, in HA storage (`.storage/zha_scenes`). Fires `SIGNAL_SCENES` on change.
  - `areas.py`: HA areas. A group's area is the area set on ZHA's group entity (`light_zha_group_0x<id>`, platform `zha`, owned by the coordinator), otherwise its members' device areas. Devices are looked up by identifier `("zha", str(ieee))`.
  - `scene.py`: one `scene` entity per stored scene, added and removed as the store changes. Unique id `<group>_<scene>`.
  - `websocket.py`: `zha_scenes/groups|subscribe|store|recall|rename|delete|import|remotes|bindings|bind`.
  - `services.py`: `store_scene`, `import_scenes` (both return a response). Recall is `scene.turn_on`.
  - `logic.py`: pure helpers (no HA or zigpy imports), unit-tested in `tests/`.
  - `frontend/zha-scenes-panel.js`: **built artifact**. Don't edit it. Run `npm run build` in `/frontend`.
- `frontend/src/`: React 18 panel copied from hive-local's shell (`main.tsx`, `Icon.tsx`, base styles). `Scenes.tsx` (a card per group) and `Remotes.tsx`.
- `tests_ha/`: end-to-end tests with `pytest-homeassistant-custom-component` (HA 2026.2.3, zha 0.0.90). Real zigpy `Device`s and a zigpy `Groups`, a fake radio that decodes every frame and answers like real bulbs/remotes, and a fake ZHA gateway. Not run in CI (CI only installs `pytest`).

## Key facts (zigpy 0.92 / zha 0.0.90)

- zigpy Scenes commands are `store`, `recall`, `remove`, `get_scene_membership` (not `store_scene` etc.). Responses carry `status`; `get_scene_membership_response.scenes` is the id list.
- **Store / remove / membership are unicast to each member** with a Scenes server cluster: devices don't answer group-addressed scene commands, and we want per-light results. **Recall is one groupcast** (`group.endpoint[0x0005].recall(...)`; Scenes is in zigpy's group-cluster registry), so the lights change together, like a bound remote.
- `transition_time` is in tenths of a second. After a recall we re-read on/off, level and colour attributes (`REFRESH_DELAY` + transition) so ZHA's light entities update. ZHA's cluster handlers listen for `attribute_read` events.
- Store requires the light to already be a member of the group, which ZHA's group management does.
- Remove returning `NOT_FOUND` just means that light never had the scene; it isn't treated as a failure.
- Bindings: we send ZDO `Bind_req`/`Unbind_req` ourselves (`MultiAddress(addrmode=1, nwk=group_id)`), one cluster at a time, because ZHA's `async_bind_to_group` only logs failures. The binding table is read with `Mgmt_Bind_req`, paged by `StartIndex`.
- **Remembered bindings:** the binding table lives on the (usually asleep) remote, so we keep `{ieee: {groups: {gid: [clusters]}, checked}}`. Bind/unbind results update it (`logic.apply_bind_results`), and a table read replaces it and sets `checked`. Group cards show the remotes bound to them from this, without waking anything. Bindings made elsewhere only show up after **Check bindings**.
- Remote detection: a non-ZDO endpoint with on/off, level or scenes **client** (out) clusters and no on/off server cluster.
- Scene ids are allocated from 1 (0 is often a remote's default). Names are ours; the lights only store ids.
- Community report (HA forum, Hue Tap Dial + ZHA): someone failed to store scenes on Hue bulbs via `zha.issue_zigbee_cluster_command` and ZHA Toolkit. Possibly a usage problem, but **unverified on real Hue bulbs**.

## Status

- [x] Backend, scene entities, actions, panel. 9 pure tests, 7 end-to-end tests pass.
- [ ] On real hardware: store and recall a scene on a group of Hue bulbs, then press the bound Tap Dial.
- [ ] Bind a Tap Dial to a group from the Remotes tab; check the binding table read. Check what the dial's buttons and rotation do once bound.
- [ ] After migrating from Z2M: **Import from lights** on groups recreated with the same ids.
- [x] Brand icons (`brand/icon.png`, `icon@2x.png`: three overlapping light circles, drawn with Pillow) and repo topics, for the Marketplace checks.
- [ ] If ZHA reloads, the gateway object changes. We look it up on every call, so this should be fine, but it's untested.

## Conventions

- Python: HA style, type hints, `from __future__ import annotations`. Keep `logic.py` free of HA and zigpy imports.
- Run `pytest -q tests`, the `tests_ha` suite and `cd frontend && npm run build` before committing, and commit the rebuilt bundle.
