/** The bits of HA's `hass` object we use. */
export interface Hass {
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: {
    subscribeMessage<T>(callback: (msg: T) => void, msg: Record<string, unknown>): Promise<() => Promise<void>>;
  };
}

export interface Member {
  key: string; // "<ieee>/<endpoint>"
  name: string;
  scenes: boolean; // false: the device can't store scenes (e.g. a plug)
}

export interface Scene {
  id: number;
  name: string;
  members: string[]; // member keys that have this scene stored
}

export interface Group {
  id: number;
  name: string;
  members: Member[];
  scenes: Scene[];
}

export interface Remote {
  ieee: string;
  name: string;
  model: string | null;
  manufacturer: string | null;
  battery: boolean;
  endpoints: { id: number; clusters: number[] }[];
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

export const CLUSTER_LABEL: Record<number, string> = { 6: "On/off", 8: "Dimming", 5: "Scenes" };

export const errorText = (e: any) => String(e?.message ?? e);

export type Result = { kind: "ok" | "error"; text: string } | null;
