import { Icon } from "./Icon";
import { modelName, remoteStatus, type RemoteState } from "./model";
import { remoteIcon } from "./RemotePage";
import type { Group, Hass, Remote } from "./types";

interface Props {
  getHass: () => Hass;
  remotes: Remote[];
  groups: Group[];
  onOpen: (ieee: string) => void;
}

const RANK: Record<RemoteState, number> = { attention: 0, ok: 1, idle: 2 };

/** Every remote, those needing set-up first; open one to see its buttons. */
export function RemotesTab({ getHass, remotes, groups, onOpen }: Props) {
  const hass = getHass();
  if (!remotes.length)
    return (
      <div className="empty-state">
        <Icon name="remote-off" />
        <p>No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first.</p>
      </div>
    );

  const rows = remotes
    .map((r) => ({ r, s: remoteStatus(r, groups) }))
    .sort((a, b) => RANK[a.s.state] - RANK[b.s.state] || a.r.name.localeCompare(b.r.name));

  return (
    <div className="list">
      {rows.map(({ r, s }) => {
        const battery = r.battery_entity ? hass.states[r.battery_entity]?.state : undefined;
        const sub = [r.area, modelName(r), battery != null && battery !== "unavailable" && battery !== "unknown" ? `${Math.round(+battery)}%` : null]
          .filter(Boolean)
          .join(" · ");
        return (
          <button key={r.ieee} className="list-row" onClick={() => onOpen(r.ieee)}>
            <Icon name={remoteIcon(r)} className="row-icon big" />
            <span className="grow">
              <strong>{r.name}</strong>
              <span className="muted small row-detail">{sub}</span>
            </span>
            <span className={`chip ${s.state === "ok" ? "ok" : s.state === "attention" ? "warn" : ""}`}>{s.label}</span>
            <Icon name="chevron-right" />
          </button>
        );
      })}
    </div>
  );
}
