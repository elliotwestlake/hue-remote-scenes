import type { AreaIcons, Group, Hass, Remote, SceneColor } from "./types";

export const NO_AREA = "No area";

const MODEL_NAMES: Record<string, string> = {
  RDM002: "Hue Tap Dial",
  RWL020: "Hue Dimmer switch",
  RWL021: "Hue Dimmer switch",
  RWL022: "Hue Dimmer switch",
  ROM001: "Hue Smart button",
};

export const isTapDial = (r: Remote) => r.model === "RDM002";

/** What pressing finds a remote's built-in group, and what its other buttons do once bound. */
export const sceneButtons = (r: Remote) =>
  isTapDial(r)
    ? { press: "one of the dial's four buttons", rest: "Turn to dim · hold a button for off" }
    : { press: "the Hue button", rest: "Power button turns on/off · up/down dim" };

/** "Hue Tap Dial" for models we know, else "<manufacturer> <model>". */
export const modelName = (r: Remote) =>
  (r.model && MODEL_NAMES[r.model]) || [r.manufacturer, r.model].filter(Boolean).join(" ");

export interface DialProgress {
  found: boolean; // we know the dial's built-in group id
  group: Group | undefined; // ZHA has that group
  bound: boolean; // the dial is bound to it
  saved: boolean; // every button has a scene
  done: number; // steps done, 0–4
}

export function dialProgress(remote: Remote, groups: Group[]): DialProgress {
  const dial = remote.dial;
  const group = dial ? groups.find((g) => g.id === dial.group_id) : undefined;
  const bound = !!dial && remote.bound.some((b) => b.group_id === dial.group_id);
  const saved = !!dial && !!group && dial.buttons.every(([, sid]) => group.scenes.some((s) => s.id === sid));
  return { found: !!dial, group, bound, saved, done: [!!dial, !!group, bound, saved].filter(Boolean).length };
}

export type RemoteState = "ok" | "attention" | "idle";

export function remoteStatus(remote: Remote, groups: Group[]): { state: RemoteState; label: string } {
  if (remote.dial_supported) {
    const p = dialProgress(remote, groups);
    if (p.done === 4) return { state: "ok", label: "Set up" };
    if (!remote.dial && !remote.bound.length) return { state: "idle", label: "Not set up" };
    return { state: "attention", label: "Needs set-up" };
  }
  const n = remote.bound.length;
  if (!n) return { state: "idle", label: "Not bound" };
  return { state: "ok", label: n > 1 ? `Bound to ${n}` : "Bound" };
}

export interface Area {
  name: string;
  icon: string;
  groups: Group[];
  remotes: Remote[];
  attention: Remote[]; // remotes here that need finishing
}

/** Groups and remotes by HA area: areas needing attention first, "No area" last. */
export function buildAreas(groups: Group[], remotes: Remote[], icons: AreaIcons): Area[] {
  const areas = new Map<string, Area>();
  const area = (name: string) => {
    let a = areas.get(name);
    if (!a) {
      a = { name, icon: icons[name] || "mdi:home-outline", groups: [], remotes: [], attention: [] };
      areas.set(name, a);
    }
    return a;
  };
  for (const g of groups) area(g.areas[0] ?? NO_AREA).groups.push(g);
  for (const r of remotes) {
    const a = area(r.area ?? NO_AREA);
    a.remotes.push(r);
    if (remoteStatus(r, groups).state === "attention") a.attention.push(r);
  }
  return [...areas.values()].sort(
    (a, b) =>
      Number(b.attention.length > 0) - Number(a.attention.length > 0) ||
      Number(a.name === NO_AREA) - Number(b.name === NO_AREA) ||
      a.name.localeCompare(b.name),
  );
}

export const isOn = (hass: Hass, entityId: string | null) => !!entityId && hass.states[entityId]?.state === "on";

export const lightsOn = (hass: Hass, groups: Group[]) =>
  groups.reduce((n, g) => n + g.members.filter((m) => isOn(hass, m.entity_id)).length, 0);

export const lightCount = (groups: Group[]) => groups.reduce((n, g) => n + g.members.length, 0);

/** A CSS background showing a scene: its lights' saved colours, dimmed by brightness. */
export function swatch(colors: SceneColor[] | undefined): string {
  if (!colors?.length) return "var(--hrs-swatch-unknown)";
  const lit = colors.filter((c): c is [number, number, number, number] => !!c);
  if (!lit.length) return "linear-gradient(135deg, #2b2f3a, #12141a)";
  const css = ([r, g, b, bri]: number[]) => {
    const f = 0.35 + 0.65 * (bri / 255);
    return `rgb(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)})`;
  };
  // Distinct colours only, at most four, so a uniform scene is one smooth colour.
  const stops = [...new Set(lit.map(css))].slice(0, 4);
  if (stops.length === 1) return `linear-gradient(135deg, color-mix(in srgb, ${stops[0]} 70%, white), ${stops[0]})`;
  return `linear-gradient(135deg, ${stops.join(", ")})`;
}

/** "5 min ago", "yesterday", from unix seconds or an ISO string. */
export function ago(when: number | string | null): string | null {
  if (when == null) return null;
  const t = typeof when === "number" ? when * 1000 : Date.parse(when);
  if (Number.isNaN(t)) return null;
  const s = Math.max(0, (Date.now() - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  if (s < 172800) return "yesterday";
  return `${Math.round(s / 86400)} days ago`;
}

type LightState = { state: string; attributes: Record<string, any> } | undefined;

/** A light's colour as CSS, dimmed by brightness (null when off). */
export function lightCss(st: LightState): string | null {
  if (st?.state !== "on") return null;
  const [r, g, b] = st.attributes.rgb_color ?? [255, 214, 170];
  const f = 0.45 + 0.55 * ((st.attributes.brightness ?? 255) / 255);
  return `rgb(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)})`;
}

/** Light entities to switch for these groups: ZHA's group entities, else their members'. */
export const roomEntities = (groups: Group[]) =>
  groups.flatMap((g) => (g.entity_id ? [g.entity_id] : g.members.filter((m) => m.entity_id).map((m) => m.entity_id!)));

/** Relative lightness (0–1) of some [r, g, b, brightness] colours, as they're drawn. */
function lightness(colours: number[][]): number {
  const l = colours.map(([r, g, b, bri]) => ((0.299 * r + 0.587 * g + 0.114 * b) / 255) * (0.35 + 0.65 * (bri / 255)));
  return l.reduce((a, b) => a + b, 0) / l.length;
}

/** Whether a scene's swatch is pale enough to need dark text (unknown colours are pale grey). */
export const isPale = (colors: SceneColor[] | undefined) => {
  const lit = (colors ?? []).filter((c): c is [number, number, number, number] => !!c);
  if (!colors?.length) return true;
  return !!lit.length && lightness(lit) > 0.62;
};

/** The colours of the lights that are on, as a background (null when all are off). Light colours
 * get a darker veil so white text stays readable. */
export function roomBackground(hass: Hass, groups: Group[]): string | null {
  const rgb: number[][] = [];
  for (const g of groups)
    for (const m of g.members) {
      const st = m.entity_id ? hass.states[m.entity_id] : undefined;
      if (st?.state === "on") rgb.push([...(st.attributes.rgb_color ?? [255, 214, 170]), st.attributes.brightness ?? 255]);
    }
  if (!rgb.length) return null;
  const colours = [...new Set(rgb.map((c) => lightCss({ state: "on", attributes: { rgb_color: c.slice(0, 3), brightness: c[3] } })!))].slice(0, 3);
  const stops = colours.length === 1 ? [colours[0], `color-mix(in srgb, ${colours[0]} 70%, black)`] : colours;
  const veil = Math.min(0.5, Math.max(0.15, (lightness(rgb) - 0.35) * 0.9));
  return `linear-gradient(rgba(0,0,0,${veil.toFixed(2)}), rgba(0,0,0,${veil.toFixed(2)})), linear-gradient(120deg, ${stops.join(", ")})`;
}

/** Average brightness of the lights that are on, 0–100. */
export function roomBrightness(hass: Hass, groups: Group[]): number {
  const on = groups.flatMap((g) => g.members.map((m) => (m.entity_id ? hass.states[m.entity_id] : undefined))).filter((s) => s?.state === "on");
  if (!on.length) return 0;
  return Math.round(on.reduce((n, s) => n + (s!.attributes.brightness ?? 255), 0) / on.length / 2.55);
}
