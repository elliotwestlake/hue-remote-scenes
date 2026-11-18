import { Icon } from "./Icon";
import { lightCount, lightsOn, type Area } from "./model";
import { GroupSection } from "./GroupSection";
import { RemoteCard } from "./RemoteCard";
import { plural, type Group, type Hass } from "./types";

interface Props {
  getHass: () => Hass;
  area: Area;
  groups: Group[];
  onBack: () => void;
  onSetup: (ieee: string) => void;
  onChanged: () => void;
}

/** One area opened: its groups' scenes on the left, the remotes in it on the right. */
export function AreaView({ getHass, area, groups, onBack, onSetup, onChanged }: Props) {
  const hass = getHass();
  const on = lightsOn(hass, area.groups);
  const lights = lightCount(area.groups);

  return (
    <div className="stack">
      <div className="area-head">
        <nav className="crumbs small">
          <button className="link" onClick={onBack}>Areas</button>
          <Icon name="chevron-right" />
          <span>{area.name}</span>
        </nav>
        <div className="row-start">
          <span className="aicon big"><ha-icon icon={area.icon} /></span>
          <h2 className="area-title">{area.name}</h2>
          <span className="chip">{[plural(area.groups.length, "group"), plural(lights, "light")].join(" · ")}</span>
          {lights > 0 && <span className={`chip ${on ? "ok" : ""}`}>{on ? `${on} on` : "All off"}</span>}
        </div>
      </div>

      <div className="split">
        <div className="split-main stack">
          {area.groups.map((g) => (
            <GroupSection key={g.id} getHass={getHass} group={g} onChanged={onChanged} />
          ))}
          {!area.groups.length && (
            <div className="card empty-state">
              <Icon name="lightbulb-group-outline" />
              <p>
                No ZHA groups in {area.name}. Create one under Settings → Devices & services → Zigbee Home Automation →
                Configure → Groups and put its lights in this area, or set up a Tap Dial here.
              </p>
            </div>
          )}
        </div>
        <aside className="split-side stack">
          <p className="label">Remotes here</p>
          {area.remotes.map((r) => (
            <RemoteCard key={r.ieee} getHass={getHass} remote={r} groups={groups} compact onSetup={() => onSetup(r.ieee)} onChanged={onChanged} />
          ))}
          {!area.remotes.length && (
            <p className="muted small">
              No remotes in {area.name}. Set a remote's area in its device page, or bind one from the All remotes tab.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
