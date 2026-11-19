import { useState } from "react";
import { Icon } from "./Icon";
import { ago, dialProgress, isTapDial, modelName, remoteStatus, sceneButtons } from "./model";
import { CycleSection } from "./CycleSection";
import { SceneChip } from "./Scenes";
import { CLUSTER_LABEL, dots, hex, type Binding, type Group, type Hass, type Remote } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  compact?: boolean; // inside an area: the area goes without saying
  onSetup: () => void; // open the scene-button set-up
  onChanged: () => void;
}

const STEP_NAMES = ["Find its group", "Choose lights", "Bind", "Save button scenes"];

export const remoteIcon = (r: Remote) =>
  isTapDial(r) ? "knob" : r.endpoints.some((e) => e.clusters.includes(8)) ? "remote" : "gesture-tap-button";

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
      const r = await getHass().callWS<{ results: Record<string, string> }>({
        type: "hue_remote_scenes/bind",
        ieee: remote.ieee,
        endpoint: ep.id,
        group_id: groupId,
        clusters: ep.clusters,
        unbind,
      });
      onChanged();
      const failed = Object.entries(r.results).filter(([, v]) => v !== "ok");
      const verb = unbind ? "Unbound from" : "Bound to";
      if (failed.length === Object.keys(r.results).length)
        return "The remote didn't answer. Press a button on it and try again.";
      if (failed.length)
        return `${verb} ${groupName(groupId)}, but these didn't take: ${failed.map(([c, v]) => `${CLUSTER_LABEL[+c] ?? c} (${v})`).join(", ")}`;
      setBinding(false);
      return `${verb} ${groupName(groupId)}`;
    }, "Waiting for the remote… press one of its buttons.");

  const recall = (gid: number, sid: number, name: string) =>
    act(async () => {
      await getHass().callWS({ type: "hue_remote_scenes/recall", group_id: gid, scene_id: sid });
      return `Recalled ${name}`;
    });

  const dialGroup = progress.group;
  const seen = remote.checked ? `Bindings checked ${ago(remote.checked)}` : remote.last_seen ? `Seen ${ago(remote.last_seen)}` : null;
  const batteryText = battery != null && battery !== "unavailable" && battery !== "unknown" ? `${Math.round(+battery)}% battery` : null;

  return (
    <section className="card remote">
      <div className="card-head">
        <div className="title">
          <Icon name={remoteIcon(remote)} className="title-icon" />
          <div>
            <h2>{remote.name}</h2>
            <div className="muted small">
              {[compact ? null : remote.area ?? "No area", modelName(remote), batteryText].filter(Boolean).join(" · ")}
            </div>
          </div>
        </div>
        <span className={`chip ${status.state === "ok" ? "ok" : status.state === "attention" ? "warn" : ""}`}>{status.label}</span>
      </div>

      {remote.dial_supported && !dialDone && (
        <div className="stack-sm">
          <h3>Scene buttons</h3>
          <div className="prog"><span style={{ width: `${Math.max(4, (progress.done / 4) * 100)}%` }} /></div>
          <span className="muted small">
            {progress.done ? `Step ${progress.done + 1} of 4: ${STEP_NAMES[progress.done].toLowerCase()}` : "Its buttons can recall scenes stored in the lights, even when Home Assistant is down."}
          </span>
        </div>
      )}

      {dialDone && dialGroup && remote.dial && (
        <div className="stack-sm">
          <h3>Buttons</h3>
          <div className="chips">
            {remote.dial.buttons.map(([label, sid]) => {
              const scene = dialGroup.scenes.find((s) => s.id === sid)!;
              return <SceneChip key={sid} scene={scene} badge={dots(label)} disabled={!!busy} onRecall={() => recall(dialGroup.id, sid, scene.name)} />;
            })}
          </div>
          <div className="ctl muted small">
            <Icon name={isTapDial(remote) ? "rotate-right" : "brightness-6"} />
            <span className="grow">{sceneButtons(remote).rest} · {dialGroup.name}</span>
          </div>
        </div>
      )}

      {controls.length > 0 && (
        <div className="stack-sm">
          <h3>{dialDone ? "Also controls" : "Controls"}</h3>
          {controls.map((b) => (
            <div key={b.group_id} className="ctl">
              <Icon name="lightbulb-group-outline" />
              <span className="grow">
                {groupName(b.group_id)}
                {group(b.group_id)?.areas[0] && <span className="muted small"> · {group(b.group_id)!.areas[0]}</span>}
              </span>
              <span className="muted small">{b.clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")}</span>
            </div>
          ))}
        </div>
      )}

      {remote.cycle_trigger && (
        <CycleSection getHass={getHass} remote={remote} groups={groups} busy={!!busy} act={act} onChanged={onChanged} />
      )}

      {status.state === "idle" && !remote.cycle_trigger && !remote.dial_supported && <p className="muted">Not bound to a group yet.</p>}

      {binding && (
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
          <span className="muted small">Sends {ep.clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")}</span>
        </div>
      )}

      <div className="card-actions">
        {remote.dial_supported && !dialDone ? (
          <button className="soft-btn" disabled={!!busy} onClick={onSetup}>
            <Icon name="cog-outline" /> {progress.done ? "Continue set-up" : "Set up scene buttons"}
          </button>
        ) : (
          <button className="soft-btn" disabled={!!busy} onClick={() => setBinding(!binding)}>
            <Icon name={binding ? "close" : "link-variant-plus"} /> {binding ? "Close" : "Bind to a group"}
          </button>
        )}
        <button className="ghost" disabled={!!busy} onClick={readBindings}>
          Check bindings
        </button>
      </div>
      {seen && !compact && <div className="muted small">{seen}</div>}

      {busy && <div className="status busy">{busy}</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}
