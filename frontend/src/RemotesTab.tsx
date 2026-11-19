import { Icon } from "./Icon";
import { dialProgress, isTapDial, lightCount, lightsOn, modelName, remoteStatus, roomBackground, swatch, type Area } from "./model";
import { RemoteIcon } from "./RemoteIcon";
import { plural, type Group, type Hass, type Remote, type Scene } from "./types";

interface Props {
  getHass: () => Hass;
  areas: Area[];
  groups: Group[];
  onOpen: (ieee: string) => void;
}

/** Every remote, by room: what it does, its button scenes' colours, and whether it's set up. */
export function RemotesTab({ getHass, areas, groups, onOpen }: Props) {
  const hass = getHass();
  const rooms = areas.filter((a) => a.remotes.length);
  if (!rooms.length)
    return (
      <div className="empty-state">
        <Icon name="remote-off" />
        <p>No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first.</p>
      </div>
    );

  return (
    <>
      {rooms.map((a) => {
        const lights = lightCount(a.groups);
        const on = lightsOn(hass, a.groups);
        return (
          <section key={a.name} className="remote-room">
            <div className="remote-room-head">
              <span className="strip" style={{ background: roomBackground(hass, a.groups) ?? undefined }} />
              <h2 className="grow">{a.name}</h2>
              {lights > 0 && <span className="muted small">{on ? `${on} on` : "off"}</span>}
            </div>
            <div className="list">
              {a.remotes.map((r) => (
                <RemoteRow key={r.ieee} remote={r} groups={groups} onOpen={() => onOpen(r.ieee)} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

/** What a remote does, in a few words, and the scenes its buttons recall (in button order). */
function describe(remote: Remote, groups: Group[]): { text: string; scenes: Scene[] } {
  const model = modelName(remote);
  if (remote.dial_supported) {
    const p = dialProgress(remote, groups);
    if (p.done === 4 && p.group && remote.dial) {
      const scenes = remote.dial.buttons.map(([, sid]) => p.group!.scenes.find((s) => s.id === sid)!).filter(Boolean);
      const what = isTapDial(remote) ? "buttons recall" : "Hue button recalls";
      return { text: `${model} · ${what} ${plural(scenes.length, "scene")}`, scenes };
    }
    if (!remote.dial && !remote.bound.length) return { text: `${model} · not doing anything yet`, scenes: [] };
    return { text: `${model} · set-up step ${Math.min(p.done + 1, 4)} of 4`, scenes: [] };
  }
  if (remote.cycle) {
    const g = groups.find((x) => x.id === remote.cycle!.group_id);
    const scenes = remote.cycle.scene_ids.map((sid) => g?.scenes.find((s) => s.id === sid)).filter((s): s is Scene => !!s);
    return { text: `${model} · ${remote.cycle_trigger?.label ?? "a button"} cycles ${plural(scenes.length, "scene")} in Home Assistant`, scenes };
  }
  return { text: `${model} · ${remote.bound.length ? "on/off and dimming" : "not bound yet"}`, scenes: [] };
}

function RemoteRow({ remote, groups, onOpen }: { remote: Remote; groups: Group[]; onOpen: () => void }) {
  const status = remoteStatus(remote, groups);
  const standalone = remote.dial_supported && status.state === "ok";
  const { text, scenes } = describe(remote, groups);
  return (
    <button className="list-row" onClick={onOpen}>
      <RemoteIcon remote={remote} className="row-icon big" />
      <span className="grow">
        <strong>{remote.name}</strong>
        <span className="muted small row-detail">{text}</span>
        {scenes.length > 0 && (
          <span className="mini-swatches">
            {scenes.map((s) => (
              <span key={s.id} className="mini-swatch" style={{ background: swatch(s.colors) }} title={s.name} />
            ))}
          </span>
        )}
      </span>
      <span className={`chip ${status.state === "ok" ? "ok" : status.state === "attention" ? "warn" : ""}`}>
        {standalone ? "Works without HA" : status.label}
      </span>
      <Icon name="chevron-right" />
    </button>
  );
}
