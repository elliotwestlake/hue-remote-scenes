import { Icon } from "./Icon";
import { lightCount, lightsOn, remoteStatus, type Area } from "./model";
import { SceneChip } from "./Scenes";
import { dots, type Group, type Hass } from "./types";
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
  const several = area.groups.length > 1; // then label each group's scenes

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
          <h2>{area.name}</h2>
        </div>
        {lights > 0 && (
          <span className={`chip ${on ? "on" : ""}`}>
            <Icon name={on ? "lightbulb-on-outline" : "lightbulb-off-outline"} />
            {on ? `${on} on` : "Off"}
          </span>
        )}
      </div>

      {area.groups.some((g) => g.scenes.length) ? (
        <div className="chips">
          {area.groups.map((g) => {
            const slots = new Map(g.dials.flatMap((d) => d.buttons.map((b) => [b.scene_id, dots(b.label)] as const)));
            // A remote's button scenes first, in button order, then the rest.
            const order = (id: number) => (slots.has(id) ? [...slots.keys()].indexOf(id) : 100 + id);
            const scenes = [...g.scenes].sort((a, b) => order(a.id) - order(b.id));
            return [
              several && scenes.length && g.name !== area.name ? <span key={`${g.id}-label`} className="chips-label muted small">{g.name}</span> : null,
              ...scenes.map((s) => (
                <SceneChip key={`${g.id}-${s.id}`} scene={s} badge={slots.get(s.id)} disabled={!!busy} onRecall={() => recall(g, s.id, s.name)} />
              )),
            ];
          })}
        </div>
      ) : (
        <span className="muted small">{area.groups.length ? "No scenes yet." : "No groups here yet."}</span>
      )}

      <div className="card-actions">
        <span className="grow remote-summary small">
          {area.remotes.length
            ? area.remotes.map((r, i) => {
                const s = remoteStatus(r, groups);
                const text = `${r.name} · ${s.state === "attention" ? "needs setting up" : s.label.toLowerCase()}`;
                return (
                  <span key={r.ieee}>
                    {i > 0 && ", "}
                    {s.state === "attention" ? (
                      <button className="link warn-link" onClick={() => onSetup(r.ieee)}>{text}</button>
                    ) : (
                      <span className="muted">{text}</span>
                    )}
                  </span>
                );
              })
            : <span className="muted">No remote</span>}
        </span>
        <button className="ghost" onClick={onOpen}>
          Manage <Icon name="chevron-right" />
        </button>
      </div>

      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}
