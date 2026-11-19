import { Icon } from "./Icon";
import { Brightness, Switch } from "./LightControls";
import { lightCss, lightsOn, remoteStatus, roomBackground, roomBrightness, roomEntities, isOn, type Area } from "./model";
import { RemoteIcon } from "./RemoteIcon";
import { AddTile, SceneTile } from "./Tiles";
import { dots, plural, type Group, type Hass, type StoreResult } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  area: Area;
  groups: Group[];
  onBack: () => void;
  onOpenRemote: (ieee: string) => void;
  onChanged: () => void;
}

/** One room: a header in its lights' colours, its scenes as tiles, its lights, its remotes. */
export function RoomPage({ getHass, area, groups, onBack, onOpenRemote, onChanged }: Props) {
  const hass = getHass();
  const bg = roomBackground(hass, area.groups);
  const on = lightsOn(hass, area.groups);
  const entities = roomEntities(area.groups);

  return (
    <>
      <div className={`hero ${bg ? "lit" : ""}`} style={bg ? { background: bg } : undefined}>
        <div className="hero-in">
          <nav className="crumbs">
            <button className="link" onClick={onBack}>Rooms</button>
            <Icon name="chevron-right" />
            <span>{area.name}</span>
          </nav>
          <div className="hero-row">
            <h1>{area.name}</h1>
            {entities.length > 0 && <Switch getHass={getHass} entities={entities} on={on > 0} label={`Turn ${area.name} ${on ? "off" : "on"}`} />}
          </div>
          {entities.length > 0 && <Brightness getHass={getHass} entities={entities} value={roomBrightness(hass, area.groups)} label={`${area.name} brightness`} />}
        </div>
      </div>

      <main>
        {area.groups.map((g) => (
          <GroupScenes key={g.id} getHass={getHass} group={g} titled={area.groups.length > 1 && g.name !== area.name} onChanged={onChanged} />
        ))}
        {!area.groups.length && (
          <div className="empty-state">
            <Icon name="lightbulb-group-outline" />
            <p>
              No ZHA groups in {area.name}. Create one under Settings → Devices & services → Zigbee Home Automation →
              Configure → Groups and put its lights in this area, or set up a Tap Dial here.
            </p>
          </div>
        )}

        {area.remotes.length > 0 && (
          <>
            <h3>Remotes</h3>
            <div className="list">
              {area.remotes.map((r) => {
                const s = remoteStatus(r, groups);
                return (
                  <button key={r.ieee} className="list-row" onClick={() => onOpenRemote(r.ieee)}>
                    <RemoteIcon remote={r} className="row-icon" />
                    <span className="grow">{r.name}</span>
                    <span className={`chip ${s.state === "ok" ? "ok" : s.state === "attention" ? "warn" : ""}`}>{s.label}</span>
                    <Icon name="chevron-right" />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}

/** A group's remote-button scenes, its other scenes and its lights. */
function GroupScenes({ getHass, group, titled, onChanged }: { getHass: () => Hass; group: Group; titled: boolean; onChanged: () => void }) {
  const { busy, result, act } = useAction();
  const hass = getHass();
  const names = Object.fromEntries(group.members.map((m) => [m.key, m.name]));
  const capable = group.members.filter((m) => m.scenes);
  const describe = (keys: string[]) => keys.map((k) => names[k] ?? k).join(", ");
  const warn = (members: string[]) => (members.length < capable.length ? `on ${members.length} of ${capable.length} lights` : undefined);
  const dial = group.dials[0];
  const slotIds = new Set(group.dials.flatMap((d) => d.buttons.map((b) => b.scene_id)));
  const others = group.scenes.filter((s) => !slotIds.has(s.id));

  const run = (msg: Record<string, unknown>, done: (r: any) => string) =>
    act(async () => {
      const r = await getHass().callWS<any>({ group_id: group.id, ...msg });
      onChanged();
      return done(r);
    });
  const storeText = (verb: string) => (r: StoreResult) => {
    const failed = Object.keys(r.failed);
    return failed.length
      ? `${verb} on ${r.ok.length} of ${r.ok.length + failed.length} lights. These didn't answer: ${describe(failed)}`
      : `${verb} on ${plural(r.ok.length, "light")}`;
  };
  const recall = (id: number, name: string) => run({ type: "hue_remote_scenes/recall", scene_id: id }, () => `Recalled ${name}`);
  const overwrite = (id: number, name: string) =>
    confirm(`Save how the lights are now as "${name}"?`) && run({ type: "hue_remote_scenes/store", scene_id: id }, storeText("Saved"));
  const rename = (id: number, name: string) => run({ type: "hue_remote_scenes/rename", scene_id: id, name }, () => "Renamed");
  const remove = (id: number, name: string) =>
    confirm(`Delete "${name}" from the lights?`) &&
    run({ type: "hue_remote_scenes/delete", scene_id: id }, (r) =>
      Object.keys(r.failed).length ? `Deleted, but some lights didn't answer and may still have it: ${describe(Object.keys(r.failed))}` : `Deleted ${name}`,
    );

  return (
    <section className="group">
      {titled && <h2 className="group-title">{group.name}</h2>}

      {capable.length > 0 && dial && (
        <>
          <h3>{group.dials.map((d) => d.name).join(", ")} buttons <span className="hint">tap to try · ⋮ to save the lights' current state there</span></h3>
          <div className="tiles">
            {dial.buttons.map((b) => {
              const scene = group.scenes.find((s) => s.id === b.scene_id);
              return scene ? (
                <SceneTile
                  key={b.scene_id}
                  scene={scene}
                  badge={dots(b.label)}
                  warn={warn(scene.members)}
                  busy={!!busy}
                  onRecall={() => recall(scene.id, scene.name)}
                  onOverwrite={() => overwrite(scene.id, scene.name)}
                  onRename={(name) => rename(scene.id, name)}
                />
              ) : (
                <AddTile
                  key={b.scene_id}
                  badge={dots(b.label)}
                  label="Save current state"
                  busy={!!busy}
                  onSave={(name) => run({ type: "hue_remote_scenes/store", scene_id: b.scene_id, name }, storeText("Saved"))}
                />
              );
            })}
          </div>
        </>
      )}

      {capable.length > 0 && (
        <>
          <h3>{dial ? "Other scenes" : "Scenes"}</h3>
          <div className="tiles">
            {others.map((s) => (
              <SceneTile
                key={s.id}
                scene={s}
                warn={warn(s.members)}
                busy={!!busy}
                onRecall={() => recall(s.id, s.name)}
                onOverwrite={() => overwrite(s.id, s.name)}
                onRename={(name) => rename(s.id, name)}
                onDelete={() => remove(s.id, s.name)}
              />
            ))}
            <AddTile label="Save current state" busy={!!busy} onSave={(name) => run({ type: "hue_remote_scenes/store", name }, storeText("Saved"))} />
          </div>
        </>
      )}

      {busy && <div className="status busy">{busy}</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}

      <h3>Lights <span className="hint">{group.members.filter((m) => isOn(hass, m.entity_id)).length ? `${group.members.filter((m) => isOn(hass, m.entity_id)).length} on` : "all off"}</span></h3>
      <div className="list">
        {group.members.map((m) => {
          const st = m.entity_id ? hass.states[m.entity_id] : undefined;
          const colour = lightCss(st);
          return (
            <div key={m.key} className="list-row static">
              <span className="light-dot" style={colour ? { background: colour } : undefined} />
              <span className="grow">
                {m.name}
                {!m.scenes && <span className="muted small"> · can't store scenes</span>}
              </span>
              {m.entity_id && (
                <>
                  <Brightness getHass={getHass} entities={[m.entity_id]} value={isOn(hass, m.entity_id) ? Math.round((st?.attributes.brightness ?? 255) / 2.55) : 0} label={`${m.name} brightness`} fill={colour ?? undefined} />
                  <Switch getHass={getHass} entities={[m.entity_id]} on={isOn(hass, m.entity_id)} label={`Turn ${m.name} on or off`} />
                </>
              )}
            </div>
          );
        })}
      </div>
      {capable.length > 0 && (
        <div>
          <button
            className="ghost"
            disabled={!!busy}
            title="Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT"
            onClick={() =>
              run({ type: "hue_remote_scenes/import" }, (r) =>
                r.added.length
                  ? `Found ${plural(r.added.length, "new scene")}. Rename them from their ⋮ menu.`
                  : r.found.length
                    ? "No new scenes: the ones on the lights are all here."
                    : "The lights have no scenes for this group yet.",
              )
            }
          >
            <Icon name="database-import-outline" /> Import scenes from the lights
          </button>
        </div>
      )}
    </section>
  );
}
