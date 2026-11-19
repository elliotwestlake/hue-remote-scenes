import { useEffect, useState } from "react";
import type { Hass } from "./types";

/** An on/off switch for some light entities (a room, or one light). */
export function Switch({ getHass, entities, on, label }: { getHass: () => Hass; entities: string[]; on: boolean; label: string }) {
  return (
    <button
      className={`switch ${on ? "on" : ""}`}
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={!entities.length}
      onClick={(e) => {
        e.stopPropagation();
        getHass().callService("light", on ? "turn_off" : "turn_on", { entity_id: entities });
      }}
    />
  );
}

/** A brightness bar for some light entities; sets the brightness when you let go. */
export function Brightness({ getHass, entities, value, label }: { getHass: () => Hass; entities: string[]; value: number; label: string }) {
  const [v, setV] = useState(value);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    if (!dragging) setV(value);
  }, [value, dragging]);

  const commit = () => {
    setDragging(false);
    if (!entities.length) return;
    if (v <= 0) getHass().callService("light", "turn_off", { entity_id: entities });
    else getHass().callService("light", "turn_on", { entity_id: entities, brightness_pct: v });
  };

  return (
    <input
      className="bri"
      type="range"
      min={0}
      max={100}
      value={v}
      aria-label={label}
      disabled={!entities.length}
      style={{ "--v": `${v}%` } as React.CSSProperties}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={() => setDragging(true)}
      onChange={(e) => setV(+e.target.value)}
      onPointerUp={commit}
      onKeyUp={commit}
    />
  );
}
