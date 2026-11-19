import { Icon } from "./Icon";
import { Brightness, Switch } from "./LightControls";
import { lightCount, lightsOn, remoteStatus, roomBackground, roomBrightness, roomEntities, type Area } from "./model";
import { plural, type Group, type Hass } from "./types";

interface Props {
  getHass: () => Hass;
  areas: Area[];
  groups: Group[];
  onOpen: (area: string) => void;
  onOpenRemote: (ieee: string) => void;
}

/** A card per HA area, tinted with its lights' colours, with a switch and a brightness bar. */
export function Rooms({ getHass, areas, groups, onOpen, onOpenRemote }: Props) {
  const attention = areas.flatMap((a) => a.attention);
  return (
    <>
      {attention.map((r) => (
        <div key={r.ieee} className="banner">
          <Icon name="alert-outline" />
          <span className="grow">{r.name} isn't set up yet: its buttons don't do anything.</span>
          <button className="primary" onClick={() => onOpenRemote(r.ieee)}>Set up</button>
        </div>
      ))}
      <div className="rooms">
        {areas.map((a) => (
          <RoomCard key={a.name} getHass={getHass} area={a} groups={groups} onOpen={() => onOpen(a.name)} />
        ))}
      </div>
    </>
  );
}

function RoomCard({ getHass, area, groups, onOpen }: { getHass: () => Hass; area: Area; groups: Group[]; onOpen: () => void }) {
  const hass = getHass();
  const bg = roomBackground(hass, area.groups);
  const on = lightsOn(hass, area.groups);
  const lights = lightCount(area.groups);
  const entities = roomEntities(area.groups);
  const remotes = area.remotes.map((r) => `${r.name}${remoteStatus(r, groups).state === "attention" ? " · not set up" : ""}`);

  return (
    <div
      className={`room ${bg ? "lit" : ""}`}
      style={bg ? { background: bg } : undefined}
      role="link"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
    >
      <div className="room-top">
        <div className="grow">
          <h2>{area.name}</h2>
          <div className="room-sub">
            {lights ? (on ? `${plural(on, "light")} on` : `Off · ${plural(lights, "light")}`) : "No lights in a group yet"}
          </div>
        </div>
        {entities.length > 0 && <Switch getHass={getHass} entities={entities} on={on > 0} label={`Turn ${area.name} ${on ? "off" : "on"}`} />}
      </div>
      <div className="room-sub">{remotes.length ? remotes.join(" · ") : "No remote"}</div>
      {entities.length > 0 && <Brightness getHass={getHass} entities={entities} value={roomBrightness(hass, area.groups)} label={`${area.name} brightness`} />}
    </div>
  );
}
