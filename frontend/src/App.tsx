import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Remotes } from "./Remotes";
import { Scenes } from "./Scenes";
import { errorText, type Group, type Hass } from "./types";

interface Props {
  getHass: () => Hass;
  narrow: boolean;
  onToggleMenu: () => void;
}

type Tab = "scenes" | "remotes";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "scenes", label: "Scenes", icon: "palette-outline" },
  { id: "remotes", label: "Remotes", icon: "remote" },
];

export function App({ getHass, narrow, onToggleMenu }: Props) {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [tab, setTab] = useState<Tab>("scenes");
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    getHass()
      .callWS<{ groups: Group[] }>({ type: "zha_scenes/groups" })
      .then((r) => {
        setGroups(r.groups);
        setError("");
      })
      .catch((e) => setError(errorText(e)));
  }, [getHass]);

  useEffect(() => {
    reload();
    const unsub = getHass().connection.subscribeMessage(reload, { type: "zha_scenes/subscribe" });
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass, reload]);

  return (
    <div className="panel">
      <header>
        <div className="toolbar-row">
          {narrow && (
            <button className="menu" onClick={onToggleMenu} aria-label="Menu">
              <Icon name="menu" />
            </button>
          )}
          <Icon name="palette-outline" className="brand" />
          <h1>Zigbee scenes</h1>
        </div>
        <nav className="tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={t.id === tab} className={t.id === tab ? "on" : ""} onClick={() => setTab(t.id)}>
              <Icon name={t.icon} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main>
        {error && <div className="status error">{error}</div>}
        {groups && !groups.length && (
          <div className="empty-state">
            <Icon name="lightbulb-group-outline" />
            <p>
              No ZHA groups yet. Create one under Settings → Devices & services → Zigbee Home Automation →
              Configure → Groups, and add your lights to it.
            </p>
          </div>
        )}
        {groups && !!groups.length && tab === "scenes" && <Scenes getHass={getHass} groups={groups} onChanged={reload} />}
        {groups && !!groups.length && tab === "remotes" && <Remotes getHass={getHass} groups={groups} />}
      </main>
    </div>
  );
}
