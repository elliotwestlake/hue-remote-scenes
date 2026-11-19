import { Icon } from "./Icon";
import type { Area } from "./model";
import { GroupSection } from "./GroupSection";
import { RemoteCard } from "./RemoteCard";
import type { Group, Hass } from "./types";

interface Props {
  getHass: () => Hass;
  area: Area;
  groups: Group[];
  onBack: () => void;
  onSetup: (ieee: string) => void;
  onChanged: () => void;
}

/** One area opened: its groups' scenes, and the remotes in it alongside. */
export function AreaView({ getHass, area, groups, onBack, onSetup, onChanged }: Props) {
  return (
    <>
      <nav className="crumbs">
        <button className="link" onClick={onBack}>Areas</button>
        <Icon name="chevron-right" />
        <span>{area.name}</span>
      </nav>
      <div className="split">
        <div className="stack">
          {area.groups.map((g) => (
            <GroupSection key={g.id} getHass={getHass} group={g} onChanged={onChanged} />
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
        </div>
        <div className="stack">
          {area.remotes.map((r) => (
            <RemoteCard key={r.ieee} getHass={getHass} remote={r} groups={groups} compact onSetup={() => onSetup(r.ieee)} onChanged={onChanged} />
          ))}
          {!area.remotes.length && (
            <p className="muted small">
              No remotes in {area.name}. Give a remote this area on its device page, or bind one from the Remotes tab.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
