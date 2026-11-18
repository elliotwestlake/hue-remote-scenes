# ZHA Scenes

Zigbee scenes and remote bindings for Home Assistant's **ZHA**, the two things people usually move to Zigbee2MQTT for.

- **Scenes stored on the lights.** Set a ZHA group's lights how you want them, then save. Every light stores its own state, so a remote bound to the group can recall the scene over Zigbee, even when Home Assistant is down. Each scene also becomes a `scene.` entity for dashboards and automations.
- **Import.** Scenes already stored on your lights (for example, ones made in Zigbee2MQTT before moving to ZHA) can be read back from the lights, then named.
- **Remote → group binding.** Bind a remote such as a Hue Tap Dial to a ZHA group, so it controls those lights directly, and check what a remote is currently bound to.

> ⚠️ Early and experimental. Tested against simulated devices only so far. Please report what works with your lights and remotes.

## Install

**Marketplace** (HA 2026.11+, formerly HACS): **Settings → Marketplace** → ⋮ → Custom repositories → add this repo as an *Integration* → install → restart HA. On older HA, use the same steps in HACS.

**Manual:** copy `custom_components/zha_scenes` into your HA `config/custom_components/`, then restart.

Then go to **Settings → Devices & services → Add integration → ZHA Scenes**. A **Zigbee scenes** panel appears in the sidebar (admins only).

You need ZHA groups first: **Settings → Devices & services → Zigbee Home Automation → Configure → Groups**.

## Scenes

1. Set the group's lights to the look you want (from HA or the remotes).
2. In the panel, type a name and press **Save current state**.
3. Recall it with ▶, with `scene.turn_on` on its entity (which supports `transition`), or from a bound remote.

The panel says which lights saved it. A light that was off the network when you saved gets flagged "on 2 of 3 lights"; use the overwrite button to save it again. Delete removes the scene from the lights too.

Recall is sent to the whole group in one Zigbee message, so the lights change together. Afterwards the lights are re-read so ZHA's light entities show the new state.

### Actions

```yaml
action: zha_scenes.store_scene    # new scene from the current state
data:
  group_id: 5
  name: Relax

action: zha_scenes.store_scene    # overwrite an existing one
data:
  group_id: 5
  scene_id: 1

action: zha_scenes.import_scenes  # read back scenes the lights already have
data:
  group_id: 5
```

Both return a response with the result (which lights saved it, or which scenes were found).

## Remotes

The **Remotes** tab lists devices that send on/off, dimming or scene commands. Pick a group and press **Bind**. Battery remotes sleep, so **press a button on the remote just before** binding or checking bindings.

## Moving from Zigbee2MQTT

ZHA can take over an existing Zigbee network from Zigbee2MQTT's `coordinator_backup.json` (ZHA setup → *Upload a manual backup*), which may save re-pairing. Scenes and bindings live on the devices, so they come along. Recreate your groups in ZHA **with the same group IDs** as in Zigbee2MQTT, then use **Import from lights**. Keep Zigbee2MQTT's data folder so you can go back.

## Development

```bash
cd frontend && npm install && npm run build   # writes custom_components/zha_scenes/frontend/zha-scenes-panel.js
pytest -q tests                                # pure logic tests (no HA needed)
# End-to-end tests (real zigpy devices, fake radio); need pytest-homeassistant-custom-component:
pytest -q -c tests_ha/pytest.ini --rootdir=tests_ha tests_ha
```

The built bundle is committed so Marketplace users don't need a build step.

ZHA Scenes is an independent community project, not affiliated with Home Assistant, Signify (Philips Hue) or any device maker.
