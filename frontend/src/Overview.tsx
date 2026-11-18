import { Icon } from "./Icon";
import { lightCount, lightsOn, remoteStatus, type Area } from "./model";
import { remoteIcon } from "./RemoteCard";
import { Swatch } from "./SceneCard";
import { dots, plural, type Group, type Hass, type Remote } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  areas: Area[];
  groups: Group[];
  remotes: Remote[];
  onOpen: (area: string) => void;
  onSetup: (ieee: string) => void;
}

const MAX_SWATCHES = 8;

export function Overview({ getHass, areas, groups, remotes, onOpen, onSetup }: Props) {
  const attention = areas.reduce((n, a) => n + a.attention.length, 0);
  const scenes = groups.reduce((n, g) => n + g.scenes.length, 0);

  return (
    <div className="stack">
      <div className="stats">
        <div className="stat"><b>{areas.length}</b><span>{areas.length === 1 ? "area" : "areas"}</span></div>
        <div className="stat"><b>{groups.length}</b><span>{groups.length === 1 ? "group" : "groups"}</span></div>
        <div className="stat"><b>{scenes}</b><span>{scenes === 1 ? "scene" : "scenes"}</span></div>
        <div className="stat"><b>{remotes.length}</b><span>{remotes.length === 1 ? "remote" : "remotes"}</span></div>
        <span className="grow" />
        {attention > 0 && (
          <div className="alert">
            <Icon name="alert-outline" />
            <span><strong>{plural(attention, "remote")}</strong> {attention === 1 ? "needs" : "need"} set-up</span>
          </div>
        )}
      </div>
      <div className="tiles">
        {areas.map((a) => (
          <AreaTile key={a.name} getHass={getHass} area={a} groups={groups} onOpen={() => onOpen(a.name)} onSetup={onSetup} />
        ))}
      </div>
    </div>
  );
}

function AreaTile({ getHass, area, groups, onOpen, onSetup }: { getHass: () => Hass; area: Area; groups: Group[]; onOpen: () => void; onSetup: (ieee: string) => void }) {
  const { busy, result, act } = useAction();
  const hass = getHass();
  const lights = lightCount(area.groups);
  const on = lightsOn(hass, area.groups);
  const sub = [
    area.groups.length ? plural(area.groups.length, "group") : null,
    lights ? plural(lights, "light") : null,
    lights ? (on ? `${on} on` : "off") : null,
    area.remotes.length ? null : "no remote",
  ].filter(Boolean).join(" · ");

  const recall = (g: Group, sid: number, name: string) =>
    act(async () => {
      await getHass().callWS({ type: "hue_remote_scenes/recall", group_id: g.id, scene_id: sid });
      return `Recalled ${name}`;
    });

  return (
    <section className="tile">
      <div className="card-head">
        <span className="aicon"><ha-icon icon={area.icon} /></span>
        <div className="grow">
          <h2>{area.name}</h2>
          <div className="muted small">{sub}</div>
        </div>
        <button className="ghost open" onClick={onOpen} aria-label={`Open ${area.name}`}>
          Open <Icon name="chevron-right" />
        </button>
      </div>

      {area.attention.map((r) => (
        <div key={r.ieee} className="alert">
          <ha-icon icon={remoteIcon(r)} />
          <span className="grow">{r.name} needs set-up</span>
          <button className="alert-btn" onClick={() => onSetup(r.ieee)}>Set up</button>
        </div>
      ))}
      {area.remotes
        .filter((r) => !area.attention.includes(r))
        .map((r) => {
          const s = remoteStatus(r, groups);
          return (
            <div key={r.ieee} className="remote-line small">
              <ha-icon icon={remoteIcon(r)} />
              <strong className="grow">{r.name}</strong>
              <span className={`chip ${s.state === "ok" ? "ok" : ""}`}>{s.label}</span>
            </div>
          );
        })}

      {area.groups.map((g) => {
        const slots = new Map(g.dials.flatMap((d) => d.buttons.map((b) => [b.scene_id, dots(b.label)] as const)));
        // Dial buttons first, in button order, then the rest.
        const order = (id: number) => (slots.has(id) ? [...slots.keys()].indexOf(id) : 100 + id);
        const scenes = [...g.scenes].sort((a, b) => order(a.id) - order(b.id));
        return (
          <div key={g.id} className="tile-group">
            <div className="gname">{g.name}<span>{plural(g.members.length, "light")}</span></div>
            {scenes.length ? (
              <div className="sws">
                {scenes.slice(0, MAX_SWATCHES).map((s) => (
                  <Swatch key={s.id} scene={s} badge={slots.get(s.id)} disabled={!!busy} onRecall={() => recall(g, s.id, s.name)} />
                ))}
                {scenes.length > MAX_SWATCHES && (
                  <button className="sw more-sw" onClick={onOpen}>
                    <span className="swc">+{scenes.length - MAX_SWATCHES}</span>
                    <span className="swn">More</span>
                  </button>
                )}
              </div>
            ) : (
              <button className="ghost empty-group" onClick={onOpen}>No scenes yet. Open to save one.</button>
            )}
          </div>
        );
      })}

      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}
