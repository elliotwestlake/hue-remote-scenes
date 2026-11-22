import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { Brightness, Switch } from "./LightControls";
import { isOn, lightCss } from "./model";
import type { Group, Hass, Result } from "./types";

type LightState = { state: string; attributes: Record<string, any> } | undefined;

/** A preset: a white (colour temperature) or a colour (hue/saturation). */
export interface Preset {
  label: string;
  css: string;
  kelvin?: number;
  hs?: [number, number];
}

export const WHITES: Preset[] = [
  { label: "Candle", kelvin: 2200, css: "#ffb46b" },
  { label: "Warm", kelvin: 2700, css: "#ffc98f" },
  { label: "Neutral", kelvin: 4000, css: "#ffe4c4" },
  { label: "Daylight", kelvin: 5500, css: "#fff4ea" },
  { label: "Cool", kelvin: 6500, css: "#e8eeff" },
];

export const COLOURS: Preset[] = [
  { label: "Red", hs: [0, 100], css: "#ff2a1a" },
  { label: "Orange", hs: [25, 100], css: "#ff7a00" },
  { label: "Yellow", hs: [50, 100], css: "#ffd400" },
  { label: "Green", hs: [120, 100], css: "#22d33a" },
  { label: "Cyan", hs: [180, 100], css: "#00d5e0" },
  { label: "Blue", hs: [230, 100], css: "#2f4bff" },
  { label: "Purple", hs: [275, 100], css: "#9a3cff" },
  { label: "Pink", hs: [320, 80], css: "#ff4fb8" },
];

const COLOUR_MODES = ["hs", "xy", "rgb", "rgbw", "rgbww"];

/** What a light can do, from HA's supported_color_modes. */
export function capabilities(st: LightState): { colour: boolean; temp: boolean } {
  const modes: string[] = st?.attributes.supported_color_modes ?? [];
  return { colour: modes.some((m) => COLOUR_MODES.includes(m)), temp: modes.includes("color_temp") };
}

/** The whites a light can show (all of them for colour lights, which mix whites themselves). */
function whitesFor(st: LightState): Preset[] {
  const { colour, temp } = capabilities(st);
  if (!temp) return colour ? WHITES : [];
  const min = st?.attributes.min_color_temp_kelvin ?? 0;
  const max = st?.attributes.max_color_temp_kelvin ?? 100000;
  return WHITES.filter((w) => colour || (w.kelvin! >= min && w.kelvin! <= max));
}

const hexToRgb = (hex: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];

interface Props {
  getHass: () => Hass;
  group: Group;
  title: string;
  name?: string; // prefilled (editing a scene, or a button slot's)
  saveLabel: string;
  busy: string | false; // waiting text
  result?: Result;
  onSave: (name: string) => void;
  onCancel: () => void;
}

/**
 * Set up a scene: changes go to the lights straight away (Zigbee lights store their
 * current state as the scene), then Save stores it in them.
 */
export function SceneEditor({ getHass, group, title, name: initialName = "", saveLabel, busy, result, onSave, onCancel }: Props) {
  const [name, setName] = useState(initialName);
  const hass = getHass();
  const lights = group.members.filter((m) => m.entity_id && m.scenes);
  const all = lights.map((m) => m.entity_id!);
  const states = Object.fromEntries(all.map((e) => [e, hass.states[e] as LightState]));
  const onCount = all.filter((e) => isOn(hass, e)).length;
  const avgBri = onCount ? Math.round(all.filter((e) => isOn(hass, e)).reduce((n, e) => n + (states[e]?.attributes.brightness ?? 255), 0) / onCount / 2.55) : 0;

  /** Send a preset (or a custom colour) to the lights that can show it. */
  const apply = (entities: string[], p: Preset | { rgb: [number, number, number] }) => {
    const byEntity = entities.map((e) => ({ e, caps: capabilities(states[e]) }));
    if ("rgb" in p) {
      const targets = byEntity.filter((x) => x.caps.colour).map((x) => x.e);
      if (targets.length) getHass().callService("light", "turn_on", { entity_id: targets, rgb_color: p.rgb });
    } else if (p.hs) {
      const targets = byEntity.filter((x) => x.caps.colour).map((x) => x.e);
      if (targets.length) getHass().callService("light", "turn_on", { entity_id: targets, hs_color: p.hs });
    } else if (p.kelvin) {
      const targets = byEntity.filter((x) => x.caps.colour || x.caps.temp).map((x) => x.e);
      if (targets.length) getHass().callService("light", "turn_on", { entity_id: targets, color_temp_kelvin: p.kelvin });
    }
  };

  const anyColour = all.some((e) => capabilities(states[e]).colour);
  const anyWhite = all.some((e) => whitesFor(states[e]).length);

  return (
    <div className="sheet-backdrop" onClick={(e) => e.target === e.currentTarget && !busy && onCancel()}>
      <form
        className="sheet"
        role="dialog"
        aria-label={title}
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onSave(name);
        }}
      >
        <div className="sheet-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" onClick={onCancel} disabled={!!busy} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <input type="text" placeholder="Scene name" value={name} maxLength={40} autoFocus={!initialName} onChange={(e) => setName(e.target.value)} aria-label="Scene name" />
        <p className="muted small">Changes show on the lights straight away. Save stores how they look in the lights, for remotes to recall.</p>

        {!lights.length && <div className="status warn">None of this group's lights can store scenes.</div>}

        {lights.length > 1 && (
          <div className="edit-light all">
            <div className="edit-row">
              <strong className="grow">All lights</strong>
              <Switch getHass={getHass} entities={all} on={onCount > 0} label="All lights on or off" />
            </div>
            <Brightness getHass={getHass} entities={all} value={avgBri} label="All lights brightness" />
            <Palette whites={anyWhite ? WHITES : []} colours={anyColour ? COLOURS : []} custom={anyColour} name="all lights" onPick={(p) => apply(all, p)} />
          </div>
        )}

        {lights.map((m) => {
          const e = m.entity_id!;
          const st = states[e];
          const on = isOn(hass, e);
          const caps = capabilities(st);
          return (
            <div key={m.key} className={`edit-light ${on ? "" : "off"}`}>
              <div className="edit-row">
                <span className="light-dot" style={lightCss(st) ? { background: lightCss(st)! } : undefined} />
                <span className="grow">{m.name}</span>
                <Switch getHass={getHass} entities={[e]} on={on} label={`${m.name} on or off`} />
              </div>
              <Brightness getHass={getHass} entities={[e]} value={on ? Math.round((st?.attributes.brightness ?? 255) / 2.55) : 0} label={`${m.name} brightness`} fill={lightCss(st) ?? undefined} />
              <Palette whites={whitesFor(st)} colours={caps.colour ? COLOURS : []} custom={caps.colour} name={m.name} onPick={(p) => apply([e], p)} />
            </div>
          );
        })}

        {busy && <div className="status busy">{busy}</div>}
        {!busy && result?.kind === "error" && <div className="status error">{result.text}</div>}

        <div className="sheet-actions">
          <button type="button" className="ghost" onClick={onCancel} disabled={!!busy}>Cancel</button>
          <button type="submit" className="primary" disabled={!!busy || !name.trim() || !lights.length}>{saveLabel}</button>
        </div>
      </form>
    </div>
  );
}

function Palette({ whites, colours, custom, name, onPick }: { whites: Preset[]; colours: Preset[]; custom: boolean; name: string; onPick: (p: Preset | { rgb: [number, number, number] }) => void }) {
  // The colour picker fires while you drag: send at most a few changes a second.
  const pending = useRef<[number, number, number] | null>(null);
  const timer = useRef<number | null>(null);
  const pickCustom = (hex: string) => {
    pending.current = hexToRgb(hex);
    if (timer.current != null) return;
    timer.current = window.setTimeout(() => {
      timer.current = null;
      if (pending.current) onPick({ rgb: pending.current });
    }, 300);
  };
  if (!whites.length && !colours.length) return null;
  return (
    <div className="palette">
      {[...whites, ...colours].map((p) => (
        <button key={p.label} type="button" className="swatch-btn" style={{ background: p.css }} title={p.label} aria-label={`${p.label} for ${name}`} onClick={() => onPick(p)} />
      ))}
      {custom && (
        <label className="swatch-btn custom" title="Pick a colour" aria-label={`Pick a colour for ${name}`}>
          <Icon name="palette-outline" />
          <input type="color" defaultValue="#ff8800" onChange={(e) => pickCustom(e.target.value)} />
        </label>
      )}
    </div>
  );
}
