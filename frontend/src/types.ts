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
}

export interface Binding {
  endpoint: number;
  cluster: number;
  group_id: number;
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

export const dots = (label: string) => "●".repeat(parseInt(label, 10) || 1);

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
