import { useState } from "react";
import { Icon } from "./Icon";
import { remoteStatus, type RemoteState } from "./model";
import { RemoteCard } from "./RemoteCard";
import type { Group, Hass, Remote } from "./types";

interface Props {
  getHass: () => Hass;
  remotes: Remote[];
  groups: Group[];
  onSetup: (ieee: string) => void;
  onChanged: () => void;
}

type Filter = "all" | RemoteState;

const RANK: Record<RemoteState, number> = { attention: 0, ok: 1, idle: 2 };

export function RemotesTab({ getHass, remotes, groups, onSetup, onChanged }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  if (!remotes.length)
    return (
      <div className="empty-state">
        <Icon name="remote-off" />
        <p>No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first.</p>
      </div>
    );

  const withState = remotes.map((r) => ({ r, s: remoteStatus(r, groups).state }));
  const count = (f: RemoteState) => withState.filter((x) => x.s === f).length;
  const shown = withState
    .filter((x) => filter === "all" || x.s === filter)
    .sort((a, b) => RANK[a.s] - RANK[b.s] || a.r.name.localeCompare(b.r.name));
  const filters: [Filter, string, number][] = [
    ["all", "All", remotes.length],
    ["attention", "Needs set-up", count("attention")],
    ["idle", "Not set up", count("idle")],
  ];

  return (
    <>
      <div className="inline-row">
        <div className="segmented" role="radiogroup" aria-label="Show">
          {filters.map(([f, label, n]) =>
            f === "all" || n ? (
              <button key={f} role="radio" aria-checked={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
                {label} · {n}
              </button>
            ) : null,
          )}
        </div>
        <span className="spacer" />
        <span className="muted small">Battery remotes sleep: press a button on one just before changing it.</span>
      </div>
      <div className="grid">
        {shown.map(({ r }) => (
          <RemoteCard key={r.ieee} getHass={getHass} remote={r} groups={groups} onSetup={() => onSetup(r.ieee)} onChanged={onChanged} />
        ))}
      </div>
    </>
  );
}
