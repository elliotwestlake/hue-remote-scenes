import { useState } from "react";
import { CycleSection } from "./CycleSection";
import { DialSetup } from "./DialSetup";
import { Icon } from "./Icon";
import { RemoteIcon } from "./RemoteIcon";
import { ago, dialProgress, isTapDial, modelName, remoteStatus, sceneButtons } from "./model";
import { swatch } from "./model";
import { CLUSTER_LABEL, clearedText, dots, hex, plural, type BindResult, type Binding, type Group, type Hass, type Remote, type StoreResult } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  onBack: () => void;
  onChanged: () => void;
}

/** One remote: what each of its buttons does, and setting that up. */
export function RemotePage({ getHass, remote, groups, onBack, onChanged }: Props) {
  const { busy, result, act } = useAction();
  const [setup, setSetup] = useState(false);
  const hass = getHass();
  const status = remoteStatus(remote, groups);
  const progress = dialProgress(remote, groups);
  const dialDone = remote.dial_supported && progress.done === 4;
  const battery = remote.battery_entity ? hass.states[remote.battery_entity]?.state : undefined;
  const sub = [
    modelName(remote),
    battery != null && battery !== "unavailable" && battery !== "unknown" ? `${Math.round(+battery)}% battery` : null,
    remote.bound.length ? "bound" : "not bound",
  ].filter(Boolean).join(" · ");

  return (
    <main className="narrow">
      <nav className="crumbs">
        <button className="link" onClick={onBack}>Remotes</button>
        <Icon name="chevron-right" />
        <span>{remote.name}</span>
      </nav>
      <div className="dev-head">
        <RemoteIcon remote={remote} className="dev-icon" />
        <div className="grow">
          <h2 className="dev-name">{remote.name}</h2>
          <div className="muted">{sub}</div>
        </div>
        {dialDone ? (
          <span className="chip ok"><Icon name="check" /> Works without Home Assistant</span>
        ) : (
          <span className={`chip ${status.state === "ok" ? "ok" : status.state === "attention" ? "warn" : ""}`}>{status.label}</span>
        )}
      </div>

      {remote.dial_supported && (!dialDone || setup) ? (
        <DialSetup
          getHass={getHass}
          remote={remote}
          groups={groups}
          onChanged={onChanged}
          onClose={() => (dialDone ? setSetup(false) : onBack())}
        />
      ) : dialDone && progress.group && remote.dial ? (
        <SceneButtons getHass={getHass} remote={remote} group={progress.group} busy={!!busy} act={act} onChanged={onChanged} onChangeLights={() => setSetup(true)} />
      ) : null}

      {!remote.dial_supported && <Bindings getHass={getHass} remote={remote} groups={groups} busy={!!busy} act={act} onChanged={onChanged} />}

      {remote.cycle_trigger && (
        <section className="card">
          <CycleSection getHass={getHass} remote={remote} groups={groups} busy={!!busy} act={act} onChanged={onChanged} />
        </section>
      )}

      {busy && <div className="status busy">{busy}</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}

      <p className="muted small">
        {remote.checked ? `Bindings last checked ${ago(remote.checked)}.` : remote.last_seen ? `Last seen ${ago(remote.last_seen)}.` : ""} Battery remotes
        sleep: press a button on it just before changing anything here.
      </p>
    </main>
  );
}

interface PartProps {
  getHass: () => Hass;
  remote: Remote;
  busy: boolean;
  act: (fn: () => Promise<string | void>, waiting?: string) => Promise<void>;
  onChanged: () => void;
}

const SAVE_CURRENT = -1;
const CLEAR = -2;

/** A set-up Tap Dial or gen 2 dimmer: the room it controls, then a scene per button. */
function SceneButtons({ getHass, remote, group, busy, act, onChanged, onChangeLights }: PartProps & { group: Group; onChangeLights: () => void }) {
  const buttons = remote.dial!.buttons;
  const slotIds = new Set(buttons.map(([, sid]) => sid));

  const storeText = (r: StoreResult) => {
    const failed = Object.keys(r.failed).length;
    return failed ? `Saved on ${r.ok.length} of ${r.ok.length + failed} lights; some didn't answer.` : `Saved on ${plural(r.ok.length, "light")}.`;
  };

  const choose = (label: string, sid: number, value: number) => {
    const current = group.scenes.find((s) => s.id === sid);
    if (value === CLEAR) {
      if (!current || !confirm(`Clear ${label}? This deletes "${current.name}" from the lights.`)) return;
      act(async () => {
        const r = await getHass().callWS<{ failed: Record<string, string> }>({ type: "hue_remote_scenes/delete", group_id: group.id, scene_id: sid });
        onChanged();
        return Object.keys(r.failed).length ? `Cleared ${label}, but some lights didn't answer and may still have it.` : `Cleared ${label}.`;
      });
      return;
    }
    if (value === SAVE_CURRENT) {
      const name = prompt(`Name for ${label}'s scene`, current?.name ?? "");
      if (!name?.trim()) return;
      act(async () => {
        const r = await getHass().callWS<StoreResult>({ type: "hue_remote_scenes/store", group_id: group.id, scene_id: sid, name });
        onChanged();
        return storeText(r);
      });
      return;
    }
    const from = group.scenes.find((s) => s.id === value)!;
    act(async () => {
      const r = await getHass().callWS<StoreResult>({ type: "hue_remote_scenes/copy", group_id: group.id, from_scene_id: value, scene_id: sid });
      onChanged();
      const failed = Object.keys(r.failed).length;
      return failed
        ? `${label} now recalls ${from.name} on ${r.ok.length} of ${r.ok.length + failed} lights; some didn't answer.`
        : `${label} now recalls ${from.name}.`;
    }, "Copying the scene in the lights…");
  };

  return (
    <>
      <h3>Controls</h3>
      <div className="list">
        <div className="list-row static">
          <span className="btn-icon"><Icon name="home-outline" /></span>
          <span className="grow">
            <strong>{group.name}</strong>
            <span className="muted small row-detail">{group.members.map((m) => m.name).join(", ")}</span>
          </span>
          <button className="ghost" disabled={busy} onClick={onChangeLights}>Change lights <Icon name="chevron-right" /></button>
        </div>
      </div>

      <h3>Buttons</h3>
      <div className="list">
        {buttons.map(([label, sid]) => {
          const scene = group.scenes.find((s) => s.id === sid);
          return (
            <div key={sid} className="list-row static">
              <span className="btn-icon">{dots(label)}</span>
              <span className="grow">
                <strong>{/^\d/.test(label) ? `Button ${parseInt(label, 10)}` : label}</strong>
                <span className="muted small row-detail">{scene ? "Recalls this scene" : "Not set yet"}</span>
              </span>
              <label className="picker">
                <span className="picker-swatch" style={{ background: scene ? swatch(scene.colors) : "var(--hl-off-fill)" }} />
                <span className="picker-name">{scene?.name ?? "Choose…"}</span>
                <span className="picker-chev">▾</span>
                <select
                  value={scene ? sid : ""}
                  disabled={busy}
                  onChange={(e) => e.target.value !== "" && choose(label, sid, +e.target.value)}
                  aria-label={`Scene for ${label}`}
                >
                  {!scene && <option value="">Choose…</option>}
                  {scene && <option value={sid}>{scene.name}</option>}
                  {group.scenes
                    .filter((s) => !slotIds.has(s.id))
                    .map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  <option value={SAVE_CURRENT}>Save the lights' current state…</option>
                  {scene && <option value={CLEAR}>Clear this button</option>}
                </select>
              </label>
            </div>
          );
        })}
        <div className="list-row static">
          <span className="btn-icon"><Icon name={isTapDial(remote) ? "rotate-right" : "brightness-6"} /></span>
          <span className="grow">
            <strong>{isTapDial(remote) ? "Dial" : "Other buttons"}</strong>
            <span className="muted small row-detail">
              {isTapDial(remote) ? `Dims ${group.name}. Hold any button to turn it off.` : `${sceneButtons(remote).rest} · ${group.name}`}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

/** Remotes that only switch and dim: the groups they're bound to, and binding. */
function Bindings({ getHass, remote, groups, busy, act, onChanged }: PartProps & { groups: Group[] }) {
  const [endpoint, setEndpoint] = useState(remote.endpoints[0].id);
  const [groupId, setGroupId] = useState(remote.bound[0]?.group_id ?? groups[0]?.id ?? 0);
  const ep = remote.endpoints.find((e) => e.id === endpoint) ?? remote.endpoints[0];
  const groupName = (id: number) => groups.find((g) => g.id === id)?.name ?? `Group ${hex(id)}`;

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
      if (failed.length === Object.keys(r.results).length) return "The remote didn't answer. Press a button on it and try again.";
      if (failed.length)
        return `${verb} ${groupName(groupId)}, but these didn't take: ${failed.map(([c, v]) => `${CLUSTER_LABEL[+c] ?? c} (${v})`).join(", ")}.${clearedText(r, groupName)}`;
      return `${verb} ${groupName(groupId)}.${clearedText(r, groupName)}`;
    }, "Waiting for the remote… press one of its buttons.");

  return (
    <>
      <h3>Controls</h3>
      <div className="list">
        {remote.bound.map((b) => (
          <div key={b.group_id} className="list-row static">
            <Icon name="lightbulb-group-outline" className="row-icon" />
            <span className="grow">
              <strong>{groupName(b.group_id)}</strong>
              <span className="muted small row-detail">{b.clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")} · works without Home Assistant</span>
            </span>
          </div>
        ))}
        {!remote.bound.length && <div className="list-row static muted">Not bound to a group yet.</div>}
      </div>
      <div className="inline-row">
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
        <button className="primary" disabled={busy || !groups.length} onClick={() => bind(false)}>Bind</button>
        <button disabled={busy || !groups.length} onClick={() => bind(true)}>Unbind</button>
        <span className="spacer" />
        <button className="ghost" disabled={busy} onClick={readBindings}>Check bindings</button>
      </div>
    </>
  );
}
