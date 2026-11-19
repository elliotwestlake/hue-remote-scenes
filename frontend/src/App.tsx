import { useCallback, useEffect, useState } from "react";
import { AreaView } from "./AreaView";
import { DialSetup } from "./DialSetup";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { buildAreas } from "./model";
import { Overview } from "./Overview";
import { RemotesTab } from "./RemotesTab";
import { errorText, type AreaIcons, type Group, type Hass, type Remote } from "./types";

interface Props {
  getHass: () => Hass;
  narrow: boolean;
  onToggleMenu: () => void;
}

type Tab = "areas" | "remotes";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "areas", label: "Areas", icon: "home-outline" },
  { id: "remotes", label: "All remotes", icon: "remote" },
];

export function App({ getHass, narrow, onToggleMenu }: Props) {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [remotes, setRemotes] = useState<Remote[] | null>(null);
  const [icons, setIcons] = useState<AreaIcons>({});
  const [tab, setTab] = useState<Tab>("areas");
  const [openArea, setOpenArea] = useState<string | null>(null);
  const [setup, setSetup] = useState<string | null>(null); // ieee of the remote whose scene buttons are being set up
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    const hass = getHass();
    Promise.all([
      hass.callWS<{ groups: Group[]; area_icons: AreaIcons }>({ type: "hue_remote_scenes/groups" }),
      hass.callWS<{ remotes: Remote[]; area_icons: AreaIcons }>({ type: "hue_remote_scenes/remotes" }),
    ])
      .then(([g, r]) => {
        setGroups(g.groups);
        setRemotes(r.remotes);
        setIcons({ ...g.area_icons, ...r.area_icons });
        setError("");
      })
      .catch((e) => setError(errorText(e)));
  }, [getHass]);

  useEffect(() => {
    reload();
    const unsub = getHass().connection.subscribeMessage(reload, { type: "hue_remote_scenes/subscribe" });
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass, reload]);

  const areas = groups && remotes ? buildAreas(groups, remotes, icons) : null;
  const area = areas?.find((a) => a.name === openArea);
  const dial = remotes?.find((r) => r.ieee === setup);

  const pick = (t: Tab) => {
    setTab(t);
    setOpenArea(null);
  };

  return (
    <div className="panel">
      <header>
        <div className="toolbar-row">
          {narrow && (
            <button className="menu-btn" onClick={onToggleMenu} aria-label="Menu">
              <Icon name="menu" />
            </button>
          )}
          <Logo />
          <h1>Hue remote scenes</h1>
        </div>
        <nav className="tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={t.id === tab} className={t.id === tab ? "on" : ""} onClick={() => pick(t.id)}>
              <Icon name={t.icon} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main>
        {error && <div className="status error">{error}</div>}
        {areas && groups && remotes && tab === "areas" && !area && (
          areas.length ? (
            <Overview getHass={getHass} areas={areas} groups={groups} remotes={remotes} onOpen={setOpenArea} onSetup={setSetup} />
          ) : (
            <div className="empty-state">
              <Icon name="lightbulb-group-outline" />
              <p>
                No ZHA groups or remotes yet. Create a group under Settings → Devices & services → Zigbee Home Automation →
                Configure → Groups. For a Hue Tap Dial, pair it and use the All remotes tab: it creates the group the dial
                needs.
              </p>
            </div>
          )
        )}
        {area && groups && tab === "areas" && (
          <AreaView getHass={getHass} area={area} groups={groups} onBack={() => setOpenArea(null)} onSetup={setSetup} onChanged={reload} />
        )}
        {groups && remotes && tab === "remotes" && (
          <RemotesTab getHass={getHass} remotes={remotes} groups={groups} onSetup={setSetup} onChanged={reload} />
        )}
      </main>

      {dial && groups && (
        <DialSetup getHass={getHass} remote={dial} groups={groups} onChanged={reload} onClose={() => setSetup(null)} />
      )}
    </div>
  );
}
