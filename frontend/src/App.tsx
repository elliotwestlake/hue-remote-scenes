import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { buildAreas } from "./model";
import { RemotePage } from "./RemotePage";
import { RemotesTab } from "./RemotesTab";
import { RoomPage } from "./RoomPage";
import { Rooms } from "./Rooms";
import { errorText, type AreaIcons, type Group, type Hass, type Remote } from "./types";

interface Props {
  getHass: () => Hass;
  narrow: boolean;
  onToggleMenu: () => void;
}

type Tab = "rooms" | "remotes";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "rooms", label: "Rooms", icon: "home-outline" },
  { id: "remotes", label: "Remotes", icon: "remote" },
];

export function App({ getHass, narrow, onToggleMenu }: Props) {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [remotes, setRemotes] = useState<Remote[] | null>(null);
  const [icons, setIcons] = useState<AreaIcons>({});
  const [tab, setTab] = useState<Tab>("rooms");
  const [room, setRoom] = useState<string | null>(null); // area name of the open room
  const [remoteId, setRemoteId] = useState<string | null>(null); // ieee of the open remote
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
  const area = tab === "rooms" ? areas?.find((a) => a.name === room) : undefined;
  const remote = remotes?.find((r) => r.ieee === remoteId);

  const pick = (t: Tab) => {
    setTab(t);
    setRoom(null);
    setRemoteId(null);
  };
  const openRemote = (ieee: string) => {
    setTab("remotes");
    setRoom(null);
    setRemoteId(ieee);
  };

  let content;
  if (!groups || !remotes || !areas) content = <main>{error && <div className="status error">{error}</div>}</main>;
  else if (remote) content = <RemotePage getHass={getHass} remote={remote} groups={groups} onBack={() => setRemoteId(null)} onChanged={reload} />;
  else if (area) content = <RoomPage getHass={getHass} area={area} groups={groups} onBack={() => setRoom(null)} onOpenRemote={openRemote} onChanged={reload} />;
  else
    content = (
      <main className={tab === "remotes" ? "remotes" : undefined}>
        {error && <div className="status error">{error}</div>}
        {tab === "remotes" ? (
          <RemotesTab getHass={getHass} areas={areas} groups={groups} onOpen={setRemoteId} />
        ) : areas.length ? (
          <Rooms getHass={getHass} areas={areas} groups={groups} onOpen={setRoom} onOpenRemote={openRemote} />
        ) : (
          <div className="empty-state">
            <Icon name="lightbulb-group-outline" />
            <p>
              No ZHA groups or remotes yet. Create a group under Settings → Devices & services → Zigbee Home Automation →
              Configure → Groups. For a Hue Tap Dial, pair it and use the Remotes tab: it creates the group the dial needs.
            </p>
          </div>
        )}
      </main>
    );

  return (
    <div className="panel">
      <header>
        <div className="toolbar-row">
          {narrow && (
            <button className="menu-btn" onClick={onToggleMenu} aria-label="Menu">
              <Icon name="menu" />
            </button>
          )}
          <div className="brand">
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
        </div>
      </header>
      {content}
    </div>
  );
}
