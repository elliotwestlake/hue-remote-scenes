/** The bits of HA's `hass` object we use. */
export interface Hass {
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: {
    subscribeMessage<T>(callback: (msg: T) => void, msg: Record<string, unknown>): Promise<() => Promise<void>>;
  };
  states: Record<string, { state: string; attributes: Record<string, any> } | undefined>;
}

export interface Member {
  key: string; // "<ieee>/<endpoint>"
  ieee: string;
  name: string;
  scenes: boolean; // false: the device can't store scenes (e.g. a plug)
  entity_id: string | null; // its HA light entity, for live on/off
}

/** [r, g, b, brightness] per member when the scene was saved; null: that light was off. */
export type SceneColor = [number, number, number, number] | null;

export interface Scene {
  id: number;
  name: string;
  members: string[]; // member keys that have this scene stored
  colors: SceneColor[]; // empty for imported scenes
}

export interface Group {
  id: number;
  name: string;
  areas: string[]; // the group entity's area, else its lights' areas
  members: Member[];
  scenes: Scene[];
  remotes: { ieee: string; name: string; clusters: number[] }[]; // remembered bindings
  dials: { ieee: string; name: string; buttons: DialButton[] }[]; // dials whose built-in group this is
  cycles?: { ieee: string; name: string; scene_ids: number[] }[]; // remotes HA cycles these scenes for
}

export interface DialButton {
  label: string; // "1 dot"
  scene_id: number;
}

export interface Light {
  key: string;
  ieee: string;
  name: string;
  area: string | null;
  entity_id: string | null;
}

export interface Remote {
  ieee: string;
  name: string;
  model: string | null;
  manufacturer: string | null;
  battery: boolean;
  battery_entity: string | null;
  last_seen: number | null; // unix seconds
  area: string | null;
  endpoints: { id: number; clusters: number[] }[];
  bound: { group_id: number; clusters: number[] }[]; // remembered, see `checked`
  checked: string | null; // when the binding table was last read from the remote
  dial_supported: boolean; // its buttons recall fixed scenes on a built-in group (Hue Tap Dial)
  dial: { group_id: number; buttons: [string, number][] } | null;
  // Presses HA can turn into scene recalls (needs HA running): gen 1 Hue dimmers, smart button.
  cycle_trigger: { command: string; label: string } | null;
  cycle: { group_id: number; scene_ids: number[] } | null;
}

export interface Binding {
  endpoint: number;
  cluster: number;
  group_id: number;
}

/** A binding table entry: to a group (group_id) or straight to a device (ieee). */
export interface TableEntry {
  endpoint: number;
  cluster: number;
  group_id: number | null;
  ieee?: string;
}

export interface BindResult {
  results: Record<string, string>;
  // With exclusive: the remote's other bindings that were removed, or couldn't be.
  removed?: TableEntry[];
  remove_failed?: TableEntry[];
  table_error?: string | null;
}

/** What a bind with exclusive cleared, as a sentence to append ("" if nothing). */
export function clearedText(r: BindResult, groupName: (id: number) => string): string {
  if (r.table_error) return " Couldn't read its other bindings to clear them; press a button and Bind again.";
  const where = (list: TableEntry[]) =>
    [...new Set(list.map((e) => (e.group_id != null ? groupName(e.group_id) : "a device directly")))].join(", ");
  let out = "";
  if (r.removed?.length) out += ` Removed ${plural(r.removed.length, "old binding")} (${where(r.removed)}).`;
  if (r.remove_failed?.length) out += ` Couldn't remove ${plural(r.remove_failed.length, "binding")} (${where(r.remove_failed)}); Bind again.`;
  return out;
}

export interface StoreResult {
  scene_id: number;
  ok: string[];
  failed: Record<string, string>;
}

export type AreaIcons = Record<string, string | null>;

export const CLUSTER_LABEL: Record<number, string> = { 6: "On/off", 8: "Dimming", 5: "Scenes" };

export const errorText = (e: any) => String(e?.message ?? e);

export type Result = { kind: "ok" | "error"; text: string } | null;

export const hex = (id: number) => `0x${id.toString(16).padStart(4, "0").toUpperCase()}`;

/** A button's badge: "●●" for a Tap Dial's "2 dots", "A" for a dimmer's "Hue button A". */
export const dots = (label: string) => (/^\d/.test(label) ? "●".repeat(parseInt(label, 10)) : label.split(" ").pop()!);

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
