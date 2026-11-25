import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { ago } from "./model";
import { errorText, hex, type ActivityEntry, type Diagnostics, type FullTableEntry, type Group, type Hass, type Remote } from "./types";

interface Props {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  busy: boolean;
  act: (fn: () => Promise<string | void>, waiting?: string) => Promise<void>;
  onChanged: () => void;
}

const SOURCE: Record<ActivityEntry["source"], { label: string; title: string }> = {
  zha_event: { label: "ZHA event", title: "A zha_event: what automations and the scene cycle see" },
  zigbee: { label: "Zigbee", title: "A raw Zigbee frame from the remote, below ZHA (only while this is open)" },
  ha: { label: "Home Assistant", title: "What this integration did about it" },
};

const CHECK_ICON = { ok: "check-circle-outline", warn: "alert-outline", info: "information-outline" } as const;

const time = (t: number) => new Date(t * 1000).toLocaleTimeString();

const short = (v: unknown) => {
  if (v == null) return "";
  const s = JSON.stringify(v);
  return s === "[]" || s === "{}" ? "" : s;
};

/**
 * Everything about a remote we can see from Home Assistant: what ZHA knows about it, what's
 * set up and what looks wrong, its binding table, and every press and frame, live.
 */
export function DiagnosticsSection({ getHass, remote, groups, busy, act, onChanged }: Props) {
  const [diag, setDiag] = useState<Diagnostics | null>(null);
  const [log, setLog] = useState<ActivityEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(true);
  const refresh = useRef<number | undefined>();

  const load = async () => {
    try {
      const d = await getHass().callWS<Diagnostics>({ type: "hue_remote_scenes/diagnostics", ieee: remote.ieee });
      setDiag(d);
      setError(null);
      return d;
    } catch (e) {
      setError(errorText(e));
      return null;
    }
  };

  useEffect(() => {
    let unsub: (() => Promise<void>) | undefined;
    let gone = false;
    (async () => {
      const d = await load();
      if (gone) return;
      setLog(d ? [...d.activity].reverse() : []);
      unsub = await getHass().connection.subscribeMessage<{ entry: ActivityEntry }>(
        ({ entry }) => {
          setLog((l) => [entry, ...l].slice(0, 200));
          // Checks depend on the presses seen; re-read them shortly after one.
          if (entry.source !== "zigbee") {
            window.clearTimeout(refresh.current);
            refresh.current = window.setTimeout(load, 800);
          }
        },
        { type: "hue_remote_scenes/subscribe_activity", ieee: remote.ieee },
      );
      if (gone) unsub();
    })();
    return () => {
      gone = true;
      window.clearTimeout(refresh.current);
      unsub?.();
    };
  }, [remote.ieee]);

  const groupName = (id: number) => groups.find((g) => g.id === id)?.name ?? `Group ${hex(id)}`;
  const clusterName = (ep: number | null | undefined, id: number | null | undefined) => {
    if (id == null) return "";
    const e = diag?.info.endpoints.find((x) => x.id === ep);
    const c = e && [...e.in, ...e.out].find((x) => x.id === id);
    return `${hex(id)}${c?.name ? ` ${c.name}` : ""}`;
  };
  const destination = (e: FullTableEntry) => {
    if (e.addrmode === 1 && e.group_id != null) return `Group ${groupName(e.group_id)} (${hex(e.group_id)})`;
    if (e.ieee && diag && e.ieee.toLowerCase() === diag.coordinator.toLowerCase()) return `Home Assistant (coordinator, ep ${e.dst_endpoint})`;
    return `Device ${e.ieee} ep ${e.dst_endpoint}`;
  };

  const readTable = () =>
    act(async () => {
      const r = await getHass().callWS<{ table: FullTableEntry[] }>({ type: "hue_remote_scenes/bindings", ieee: remote.ieee });
      onChanged();
      await load();
      return `Read the binding table: ${r.table.length} entr${r.table.length === 1 ? "y" : "ies"}.`;
    }, "Waiting for the remote… press one of its buttons.");

  const testCycle = () =>
    act(async () => {
      const r = await getHass().callWS<{ scene_id: number | null }>({ type: "hue_remote_scenes/cycle_now", ieee: remote.ieee });
      return r.scene_id == null ? "The cycle didn't recall anything; see Activity." : `Recalled scene ${r.scene_id}, as a press would.`;
    }, "Recalling the next scene…");

  const copy = async () => {
    const text = JSON.stringify({ remote, diagnostics: diag, activity: log, at: new Date().toISOString() }, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      alert("Diagnostics copied to the clipboard.");
    } catch {
      // No clipboard over plain http: download it instead.
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      a.download = `hue-remote-diagnostics-${remote.ieee.replace(/:/g, "")}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };

  const info = diag?.info;
  const shown = showRaw ? log : log.filter((e) => e.source !== "zigbee");

  return (
    <div className="stack-sm diag">
      <div className="inline-row">
        <h3 className="grow">Diagnostics</h3>
        <button className="ghost" disabled={busy} onClick={load}><Icon name="refresh" /> Refresh</button>
        <button className="ghost" disabled={!diag} onClick={copy}><Icon name="content-copy" /> Copy all</button>
      </div>
      {error && <div className="status error">{error}</div>}

      {diag && (
        <div className="list">
          {diag.checks.map((c, i) => (
            <div key={i} className={`list-row static check ${c.level}`}>
              <Icon name={CHECK_ICON[c.level]} className="row-icon" />
              <span className="grow small">{c.text}</span>
            </div>
          ))}
        </div>
      )}

      <div className="inline-row">
        <h3 className="grow">Activity</h3>
        <label className="small muted check-label">
          <input type="checkbox" checked={showRaw} onChange={(e) => setShowRaw(e.target.checked)} /> Raw Zigbee frames
        </label>
        {remote.cycle && <button disabled={busy} onClick={testCycle}><Icon name="sync" /> Test cycle</button>}
        <button className="ghost" disabled={!log.length} onClick={() => setLog([])}>Clear</button>
      </div>
      <div className="list log">
        {!shown.length && (
          <div className="list-row static muted small">
            Nothing yet. Press each button on the remote: every press ZHA reports shows up here as it happens.
          </div>
        )}
        {shown.map((e, i) => (
          <div key={`${e.time}-${i}`} className={`list-row static log-row ${e.source}`}>
            <span className="log-time small muted">{time(e.time)}</span>
            <span className={`chip ${e.source === "zha_event" ? "on" : e.source === "ha" ? "ok" : ""}`} title={SOURCE[e.source].title}>
              {SOURCE[e.source].label}
            </span>
            <span className="grow log-body">
              {e.command && <strong>{e.command}</strong>}
              {e.cluster != null && <span className="muted small"> · ep {e.endpoint} · {clusterName(e.endpoint, e.cluster)}</span>}
              {short(e.args) && <code className="log-args">{short(e.args)}</code>}
              {e.note && <span className="small log-note">{e.source === "ha" ? e.note : `→ ${e.note}`}</span>}
            </span>
          </div>
        ))}
      </div>

      <div className="inline-row">
        <h3 className="grow">Binding table</h3>
        <button className="ghost" disabled={busy} onClick={readTable}>Read binding table</button>
      </div>
      <div className="list">
        {diag?.table == null ? (
          <div className="list-row static muted small">Not read since Home Assistant started. Press a button on the remote, then Read binding table.</div>
        ) : !diag.table.length ? (
          <div className="list-row static muted small">Empty: the remote sends nothing anywhere.</div>
        ) : (
          diag.table.map((e, i) => (
            <div key={i} className="list-row static small">
              <span className="grow">
                ep {e.endpoint} · <strong>{clusterName(e.endpoint, e.cluster)}</strong> → {destination(e)}
              </span>
            </div>
          ))
        )}
      </div>

      {info && (
        <>
          <h3>Device</h3>
          <div className="list">
            <dl className="list-row static kv small">
              {(
                [
                  ["Model", [info.manufacturer, info.model].filter(Boolean).join(" ")],
                  ["IEEE / NWK", `${info.ieee} / ${info.nwk ?? "?"}`],
                  ["Quirk", `${info.quirk ?? "none"}${info.quirk_applied === false ? " (not applied)" : ""}`],
                  ["Firmware", info.firmware ?? "unknown"],
                  ["Power", info.power_source ?? "unknown"],
                  ["Signal", `LQI ${info.lqi ?? "?"} · RSSI ${info.rssi ?? "?"}`],
                  ["Available", info.available == null ? "unknown" : info.available ? "yes" : "no"],
                  ["Last seen", info.last_seen ? ago(info.last_seen) : "unknown"],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="kv-row"><dt className="muted">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            {info.endpoints.map((ep) => (
              <div key={ep.id} className="list-row static small ep">
                <span className="grow">
                  <strong>Endpoint {ep.id}</strong> <span className="muted">profile {ep.profile ?? "?"} · type {ep.device_type ?? "?"}</span>
                  <span className="row-detail">In: {ep.in.map((c) => `${hex(c.id)}${c.name ? ` ${c.name}` : ""}`).join(", ") || "none"}</span>
                  <span className="row-detail">Out: {ep.out.map((c) => `${hex(c.id)}${c.name ? ` ${c.name}` : ""}`).join(", ") || "none"}</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
