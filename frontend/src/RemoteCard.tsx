import { useState } from "react";
import { Icon } from "./Icon";
import { ago, dialProgress, isTapDial, modelName, remoteStatus, sceneButtons } from "./model";
import { CycleSection } from "./CycleSection";
import { Swatch } from "./SceneCard";
import { CLUSTER_LABEL, clearedText, dots, hex, type BindResult, type Binding, type Group, type Hass, type Remote } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  compact?: boolean; // inside an area: no battery footer
  onSetup: () => void; // open the Tap Dial set-up dialog
  onChanged: () => void;
}

const STEP_NAMES = ["Find its group", "Choose lights", "Bind", "Save button scenes"];

export const remoteIcon = (r: Remote) =>
  isTapDial(r) ? "mdi:knob" : r.endpoints.some((e) => e.clusters.includes(8)) ? "mdi:remote" : "mdi:gesture-tap-button";

export function RemoteCard({ getHass, remote, groups, compact, onSetup, onChanged }: Props) {
  const { busy, result, act } = useAction();
  const [binding, setBinding] = useState(false);
  const [endpoint, setEndpoint] = useState(remote.endpoints[0].id);
  const [groupId, setGroupId] = useState(groups[0]?.id ?? 0);

  const hass = getHass();
  const status = remoteStatus(remote, groups);
  const progress = dialProgress(remote, groups);
  const dialDone = remote.dial_supported && progress.done === 4;
  const ep = remote.endpoints.find((e) => e.id === endpoint) ?? remote.endpoints[0];
  const group = (id: number) => groups.find((g) => g.id === id);
  const groupName = (id: number) => group(id)?.name ?? `Group ${hex(id)}`;
  const battery = remote.battery_entity ? hass.states[remote.battery_entity]?.state : undefined;
  const autoBind = status.state === "idle" && !remote.dial_supported; // nothing else to show
  const controls = remote.bound.filter((b) => !(dialDone && b.group_id === remote.dial?.group_id));

  const readBindings = () =>
    act(async () => {
      const r = await getHass().callWS<{ bindings: Binding[] }>({ type: "hue_remote_scenes/bindings", ieee: remote.ieee });
      onChanged();
      const n = new Set(r.bindings.map((b) => b.group_id)).size;
      return n ? `Bound to ${n === 1 ? "1 group" : `${n} groups`}` : "Not bound to any group";
    }, "Waiting for the remote… press one of its buttons.");

  const bind = (unbind: boolean) =>
    act(async () => {
      const r = await getHass().callWS<BindResult>({
        type: "hue_remote_scenes/bind",
        ieee: remote.ieee,
        endpoint: ep.id,
        group_id: groupId,
        clusters: ep.clusters,
        unbind,
        exclusive: !unbind, // clear leftovers (other groups, direct device bindings)
      });
      onChanged();
      const failed = Object.entries(r.results).filter(([, v]) => v !== "ok");
      const verb = unbind ? "Unbound from" : "Bound to";
      if (failed.length === Object.keys(r.results).length)
        return "The remote didn't answer. Press a button on it and try again.";
      if (failed.length)
        return `${verb} ${groupName(groupId)}, but these didn't take: ${failed.map(([c, v]) => `${CLUSTER_LABEL[+c] ?? c} (${v})`).join(", ")}.${clearedText(r, groupName)}`;
      setBinding(false);
      return `${verb} ${groupName(groupId)}.${clearedText(r, groupName)}`;
    }, "Waiting for the remote… press one of its buttons.");

  const recall = (gid: number, sid: number, name: string) =>
    act(async () => {
      await getHass().callWS({ type: "hue_remote_scenes/recall", group_id: gid, scene_id: sid });
      return `Recalled ${name}`;
    });

  const dialGroup = progress.group;

  return (
    <section className={`card remote ${status.state === "attention" ? "attn" : ""} ${status.state === "idle" ? "idle" : ""}`}>
      <div className="card-head">
        <span className="ricon"><ha-icon icon={remoteIcon(remote)} /></span>
        <div className="grow">
          <h3 className="title">{remote.name}</h3>
          <div className="muted small">
            {[compact ? null : remote.area ?? "No area", modelName(remote)].filter(Boolean).join(" · ")}
          </div>
        </div>
        <span className={`chip ${status.state === "ok" ? "ok" : status.state === "attention" ? "warn" : ""}`}>{status.label}</span>
      </div>

      {remote.dial_supported && !dialDone && (status.state === "attention" || compact) && (
        <div className="progress-block">
          <div className="row-between small">
            <strong>Scene buttons: step {Math.min(progress.done + 1, 4)} of 4</strong>
            <span className="muted">{STEP_NAMES[Math.min(progress.done, 3)]}</span>
          </div>
          <div className="prog"><span style={{ width: `${Math.max(6, (progress.done / 4) * 100)}%` }} /></div>
        </div>
      )}

      {dialDone && dialGroup && remote.dial && (
        <>
          <p className="label">Buttons</p>
          <div className="sws">
            {remote.dial.buttons.map(([label, sid]) => {
              const scene = dialGroup.scenes.find((s) => s.id === sid)!;
              return <Swatch key={sid} scene={scene} badge={dots(label)} disabled={!!busy} onRecall={() => recall(dialGroup.id, sid, scene.name)} />;
            })}
          </div>
          <div className="ctl small">
            <Icon name={isTapDial(remote) ? "rotate-right" : "brightness-6"} />
            <span className="grow">{sceneButtons(remote).rest}</span>
            <span className="muted">{dialGroup.name}</span>
          </div>
        </>
      )}

      {controls.length > 0 && (
        <>
          <p className="label">{dialDone ? "Also controls" : "Controls"}</p>
          <div className="stack-sm">
            {controls.map((b) => (
              <div key={b.group_id} className="ctl small">
                <Icon name="lightbulb-group-outline" />
                <span className="grow">
                  <strong>{groupName(b.group_id)}</strong>
                  {group(b.group_id)?.areas[0] && <span className="muted"> {group(b.group_id)!.areas[0]}</span>}
                </span>
                <span className="muted">{b.clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(" · ")}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {remote.cycle_trigger && (
        <CycleSection getHass={getHass} remote={remote} groups={groups} busy={!!busy} act={act} onChanged={onChanged} />
      )}

      {status.state === "idle" && !compact && !remote.cycle_trigger && <p className="muted small tight">Not controlling anything yet.</p>}

      {(binding || autoBind) && (
        <div className="bind-row">
          {remote.endpoints.length > 1 && (
            <select value={ep.id} onChange={(e) => setEndpoint(+e.target.value)} aria-label="Button set">
              {remote.endpoints.map((e) => (
                <option key={e.id} value={e.id}>Endpoint {e.id}</option>
              ))}
            </select>
          )}
          <select value={groupId} disabled={!groups.length} onChange={(e) => setGroupId(+e.target.value)} aria-label="Group">
            {groups.map((g) => (
              <option key={g.id} value={g.id}>{g.name}{g.areas[0] ? ` (${g.areas[0]})` : ""}</option>
            ))}
          </select>
          <button className="primary" disabled={!!busy || !groups.length} onClick={() => bind(false)}>Bind</button>
          <button disabled={!!busy || !groups.length} onClick={() => bind(true)}>Unbind</button>
          <span className="muted small">Sends {ep.clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")}. Bind clears its other bindings.</span>
        </div>
      )}

      <div className="foot">
        {!compact && battery != null && battery !== "unavailable" && battery !== "unknown" && (
          <span className="chip"><Icon name="battery-outline" />{Math.round(+battery)}%</span>
        )}
        <span className="muted small grow">
          {remote.checked ? `Checked ${ago(remote.checked)}` : compact ? "" : remote.last_seen ? `Seen ${ago(remote.last_seen)}` : "Not checked yet"}
        </span>
        {!(remote.dial_supported && !dialDone) && (
          <button className="ghost" disabled={!!busy} onClick={readBindings}>Check bindings</button>
        )}
        {!autoBind && (
          <button className="ghost" disabled={!!busy} onClick={() => setBinding(!binding)}>{binding ? "Close" : "Bind to…"}</button>
        )}
        {remote.dial_supported && !dialDone && (
          <button className="primary" disabled={!!busy} onClick={onSetup}>
            {progress.done ? "Continue set-up" : "Set up scene buttons"}
          </button>
        )}
      </div>

      {busy && <div className="status busy">{busy}</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}
