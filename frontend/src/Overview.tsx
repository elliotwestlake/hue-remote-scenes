import { Icon } from "./Icon";
import { lightCount, lightsOn, remoteStatus, type Area } from "./model";
import { remoteIcon } from "./RemoteCard";
import { SceneChip } from "./Scenes";
import { dots, plural, type Group, type Hass } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  areas: Area[];
  groups: Group[];
  onOpen: (area: string) => void;
  onSetup: (ieee: string) => void;
}

/** A card per HA area: its remotes, and each group's scenes to recall with a tap. */
export function Overview({ getHass, areas, groups, onOpen, onSetup }: Props) {
  return (
    <div className="grid">
      {areas.map((a) => (
        <AreaCard key={a.name} getHass={getHass} area={a} groups={groups} onOpen={() => onOpen(a.name)} onSetup={onSetup} />
      ))}
    </div>
  );
}

interface CardProps {
  getHass: () => Hass;
  area: Area;
  groups: Group[];
  onOpen: () => void;
  onSetup: (ieee: string) => void;
}

function AreaCard({ getHass, area, groups, onOpen, onSetup }: CardProps) {
  const { busy, result, act } = useAction();
  const hass = getHass();
  const lights = lightCount(area.groups);
  const on = lightsOn(hass, area.groups);

  const recall = (g: Group, sid: number, name: string) =>
    act(async () => {
      await getHass().callWS({ type: "hue_remote_scenes/recall", group_id: g.id, scene_id: sid });
      return `Recalled ${name}`;
    });

  return (
    <section className="card">
      <div className="card-head">
        <div className="title">
          <Icon name={area.icon} className="title-icon" />
          <div>
            <h2>{area.name}</h2>
            <div className="muted small">
              {[area.groups.length ? plural(area.groups.length, "group") : null, lights ? plural(lights, "light") : null, area.remotes.length ? null : "no remote"]
                .filter(Boolean)
                .join(" · ")}
            </div>
          </div>
        </div>
        {lights > 0 && (
          <span className={`chip ${on ? "on" : ""}`}>
            <Icon name={on ? "lightbulb-on-outline" : "lightbulb-off-outline"} />
            {on ? `${on} on` : "Off"}
          </span>
        )}
      </div>

      {area.attention.map((r) => (
        <div key={r.ieee} className="status warn row">
          <Icon name="alert-outline" />
          <span className="grow">{r.name} needs setting up</span>
          <button className="primary" onClick={() => onSetup(r.ieee)}>Set up</button>
        </div>
      ))}

      {area.remotes
        .filter((r) => !area.attention.includes(r))
        .map((r) => {
          const s = remoteStatus(r, groups);
          return (
            <div key={r.ieee} className="remote-line">
              <Icon name={remoteIcon(r)} />
              <strong className="grow">{r.name}</strong>
              <span className={`chip ${s.state === "ok" ? "ok" : ""}`}>{s.label}</span>
            </div>
          );
        })}

      {area.groups.map((g) => {
        const slots = new Map(g.dials.flatMap((d) => d.buttons.map((b) => [b.scene_id, dots(b.label)] as const)));
        // A remote's button scenes first, in button order, then the rest.
        const order = (id: number) => (slots.has(id) ? [...slots.keys()].indexOf(id) : 100 + id);
        const scenes = [...g.scenes].sort((a, b) => order(a.id) - order(b.id));
        return (
          <div key={g.id} className="stack-sm">
            <h3>{g.name}</h3>
            {scenes.length ? (
              <div className="chips">
                {scenes.map((s) => (
                  <SceneChip key={s.id} scene={s} badge={slots.get(s.id)} disabled={!!busy} onRecall={() => recall(g, s.id, s.name)} />
                ))}
              </div>
            ) : (
              <span className="muted small">No scenes yet.</span>
            )}
          </div>
        );
      })}

      <div className="card-actions">
        <span className="spacer" />
        <button className="ghost" onClick={onOpen}>
          {area.groups.length ? "Scenes" : "More"} <Icon name="chevron-right" />
        </button>
      </div>

      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}
