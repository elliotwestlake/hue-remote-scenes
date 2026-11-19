import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { dialProgress, isOn, NO_AREA, sceneButtons } from "./model";
import { RemoteIcon } from "./RemoteIcon";
import { AddTile, SceneTile } from "./Tiles";
import { clearedText, dots, hex, plural, type BindResult, type Group, type Hass, type Light, type Remote, type StoreResult } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  onChanged: () => void;
  onClose: () => void;
}

const STEPS = [{ title: "Find group" }, { title: "Lights" }, { title: "Bind" }, { title: "Scenes" }];

/**
 * Remotes whose buttons recall fixed scenes on their own built-in group, straight from the lights
 * (Hue Tap Dial: 1, 0, 5, 4; gen 2 Hue dimmer's Hue button: 0, 1). Find that group, create it in
 * ZHA with the lights, bind, then save a scene per button.
 */
export function DialSetup({ getHass, remote, groups, onChanged, onClose }: Props) {
  const { busy, result, act, clear } = useAction();
  const progress = dialProgress(remote, groups);
  const [step, setStep] = useState(Math.min(progress.done, 3));
  const dial = remote.dial;
  const group = progress.group;

  // Move on as steps complete (the data reloads after each one).
  useEffect(() => {
    setStep((s) => Math.max(s, Math.min(progress.done, 3)));
  }, [progress.done]);

  const go = (i: number) => {
    clear();
    setStep(i);
  };

  return (
    <section className="card remote">
      <div className="card-head">
        <div className="title">
          <RemoteIcon remote={remote} className="title-icon" />
          <div>
            <h2>Set up {remote.name}</h2>
            <div className="muted small">Scene buttons that work even when Home Assistant is down</div>
          </div>
        </div>
        <button className="ghost" onClick={onClose} disabled={!!busy}>
          <Icon name="close" /> Close
        </button>
      </div>

      <div className="segmented full steps" role="tablist">
        {STEPS.map((s, i) => {
          const done = [progress.found, !!group, progress.bound, progress.saved][i];
          return (
            <button key={s.title} role="tab" aria-selected={i === step} className={`${i === step ? "on" : ""} ${done ? "done" : ""}`} onClick={() => go(i)} disabled={!!busy}>
              {done && <Icon name="check" />}
              {s.title}
            </button>
          );
        })}
      </div>

      {step === 0 && <FindStep getHass={getHass} remote={remote} busy={!!busy} act={act} onChanged={onChanged} />}
      {step === 1 && (dial ? <LightsStep getHass={getHass} remote={remote} group={group} busy={!!busy} act={act} onChanged={onChanged} /> : <NeedEarlier />)}
      {step === 2 &&
        (dial && group ? (
          <BindStep getHass={getHass} remote={remote} group={group} bound={progress.bound} busy={!!busy} act={act} onChanged={onChanged} />
        ) : (
          <NeedEarlier />
        ))}
      {step === 3 && (dial && group ? <ScenesStep getHass={getHass} remote={remote} group={group} busy={!!busy} act={act} onChanged={onChanged} /> : <NeedEarlier />)}

      {busy && <div className="status busy">{busy}</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}

      <div className="card-actions">
        {step > 0 && <button className="ghost" disabled={!!busy} onClick={() => go(step - 1)}><Icon name="chevron-left" /> Back</button>}
        <span className="spacer" />
        {step < 3 ? (
          <button className="primary" disabled={!!busy || progress.done <= step} onClick={() => go(step + 1)}>Next <Icon name="chevron-right" /></button>
        ) : (
          <button className="primary" disabled={!!busy} onClick={onClose}>Done</button>
        )}
      </div>
    </section>
  );
}

interface StepProps {
  getHass: () => Hass;
  remote: Remote;
  busy: boolean;
  act: (fn: () => Promise<string | void>, waiting?: string) => Promise<void>;
  onChanged: () => void;
}

const NeedEarlier = () => <p className="muted">Finish the earlier steps first.</p>;

function FindStep({ getHass, remote, busy, act, onChanged }: StepProps) {
  const find = () =>
    act(async () => {
      const r = await getHass().callWS<{ group_id: number; exists: boolean }>({ type: "hue_remote_scenes/find_dial_group", ieee: remote.ieee });
      onChanged();
      return `Its scene buttons use group ${hex(r.group_id)}${r.exists ? ", which ZHA already has" : ""}.`;
    }, `Press ${sceneButtons(remote).press} now, then again every few seconds until this finishes…`);
  return (
    <div className="stack-sm">
      <h2>Find the remote's group</h2>
      <p className="muted">
        This remote recalls its scenes on its own built-in group. Press <strong>Find its group</strong>, then press{" "}
        {sceneButtons(remote).press} a few times so it wakes up and shows which group it uses.
      </p>
      <div className="inline-row">
        <button className={remote.dial ? "" : "primary"} disabled={busy} onClick={find}><Icon name="magnify" /> {remote.dial ? "Find again" : "Find its group"}</button>
        {remote.dial && <span className="chip ok"><Icon name="check" /> Uses group {hex(remote.dial.group_id)}</span>}
      </div>
    </div>
  );
}

function LightsStep({ getHass, remote, group, busy, act, onChanged }: StepProps & { group: Group | undefined }) {
  const [lights, setLights] = useState<Light[] | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [name, setName] = useState(remote.name);
  const hass = getHass();
  const members = new Set(group?.members.map((m) => m.key) ?? []);

  useEffect(() => {
    getHass()
      .callWS<{ lights: Light[] }>({ type: "hue_remote_scenes/lights" })
      .then((r) => setLights(r.lights))
      .catch(() => setLights([]));
  }, [getHass]);

  const toggle = (key: string) =>
    setPicked((p) => {
      const next = new Set(p);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const create = () =>
    act(async () => {
      await getHass().callWS({ type: "hue_remote_scenes/create_group", group_id: remote.dial!.group_id, name: group?.name ?? name, members: [...picked] });
      setPicked(new Set());
      onChanged();
      return group ? `Added ${plural(picked.size, "light")} to ${group.name}.` : `Created ${name}. Next, bind the remote to it.`;
    }, "Adding the lights to the group…");

  // By area, the remote's own area first.
  const byArea = new Map<string, Light[]>();
  for (const l of lights ?? []) {
    const a = l.area ?? NO_AREA;
    byArea.set(a, [...(byArea.get(a) ?? []), l]);
  }
  const areas = [...byArea.keys()].sort(
    (a, b) => Number(b === remote.area) - Number(a === remote.area) || Number(a === NO_AREA) - Number(b === NO_AREA) || a.localeCompare(b),
  );

  return (
    <div className="stack-sm">
      <h2>{group ? `Lights in ${group.name}` : "Which lights should it control?"}</h2>
      <p className="muted">
        {group
          ? `${plural(group.members.length, "light")} are in the remote's group. Tick more to add them.`
          : "They'll go in a new ZHA group with the remote's ID. Only lights that can store scenes are listed."}
      </p>
      {!lights && <p className="muted">Loading lights…</p>}
      {lights && !lights.length && <p className="muted">No lights that can store scenes found.</p>}
      {areas.map((a) => (
        <div key={a} className="stack-sm">
          <h3>{a}</h3>
          <div className="picks">
            {byArea.get(a)!.map((l) => {
              const inGroup = members.has(l.key);
              const on = inGroup || picked.has(l.key);
              return (
                <label key={l.key} className={`pick ${on ? "on" : ""}`}>
                  <input type="checkbox" checked={on} disabled={inGroup || busy} onChange={() => toggle(l.key)} />
                  <span className={`bulb ${isOn(hass, l.entity_id) ? "lit" : ""}`} />
                  <span>{l.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
      {!group && (
        <label className="inline-row">
          <span className="muted">Group name</span>
          <input type="text" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
        </label>
      )}
      <div className="inline-row">
        <span className="muted small spacer">{picked.size ? `${plural(picked.size, "light")} selected` : ""}</span>
        <button className="primary" disabled={busy || !picked.size || (!group && !name.trim())} onClick={create}>
          <Icon name="plus" /> {group ? "Add lights" : "Create group"}
        </button>
      </div>
    </div>
  );
}

function BindStep({ getHass, remote, group, bound, busy, act, onChanged }: StepProps & { group: Group; bound: boolean }) {
  const ep = remote.endpoints.find((e) => e.clusters.includes(5)) ?? remote.endpoints[0];
  const bind = () =>
    act(async () => {
      const r = await getHass().callWS<BindResult>({
        type: "hue_remote_scenes/bind",
        ieee: remote.ieee,
        endpoint: ep.id,
        group_id: group.id,
        clusters: ep.clusters,
        unbind: false,
        exclusive: true, // clear leftovers (other groups, direct device bindings)
      });
      onChanged();
      const failed = Object.entries(r.results).filter(([, v]) => v !== "ok");
      if (failed.length === Object.keys(r.results).length) return "The remote didn't answer. Press one of its buttons and try again.";
      const cleared = clearedText(r, (id) => (id === group.id ? group.name : `Group ${hex(id)}`));
      if (failed.length) return `Bound, but some parts didn't take (${failed.map(([c, v]) => `${c}: ${v}`).join(", ")}). Try again.${cleared}`;
      return `Bound to ${group.name}.${cleared}`;
    }, "Waiting for the remote… press one of its buttons.");
  return (
    <div className="stack-sm">
      <h2>Bind {remote.name} to {group.name}</h2>
      <p className="muted">
        Binding makes the remote talk to the lights directly over Zigbee, and clears any other bindings it has (left over from Z2M, say). It's asleep most of the time:{" "}
        <strong>press one of its buttons</strong>, then press Bind.
      </p>
      <div className="inline-row">
        <button className="primary" disabled={busy} onClick={bind}><Icon name="link-variant-plus" /> {bound ? "Bind again" : "Bind"}</button>
        {bound && <span className="chip ok">Bound</span>}
      </div>
    </div>
  );
}

function ScenesStep({ getHass, remote, group, busy, act, onChanged }: StepProps & { group: Group }) {
  const save = (sceneId: number, name?: string) =>
    act(async () => {
      const r = await getHass().callWS<StoreResult>({ type: "hue_remote_scenes/store", group_id: group.id, scene_id: sceneId, ...(name ? { name } : {}) });
      onChanged();
      const failed = Object.keys(r.failed).length;
      return failed ? `Saved on ${r.ok.length} of ${r.ok.length + failed} lights; some didn't answer.` : `Saved on ${plural(r.ok.length, "light")}`;
    });
  return (
    <div className="stack-sm">
      <h2>Save a scene for each button</h2>
      <p className="muted">
        Set the {group.name} lights how you want them for a button, then save. Do this for each one. You can change them
        later from the area.
      </p>
      <div className="tiles">
        {remote.dial!.buttons.map(([label, sid]) => {
          const scene = group.scenes.find((s) => s.id === sid);
          return scene ? (
            <SceneTile
              key={sid}
              scene={scene}
              badge={dots(label)}
              busy={busy}
              onRecall={() => act(async () => {
                await getHass().callWS({ type: "hue_remote_scenes/recall", group_id: group.id, scene_id: sid });
                return `Recalled ${scene.name}`;
              })}
              onOverwrite={() => confirm(`Save how the lights are now as "${scene.name}"?`) && save(sid)}
            />
          ) : (
            <AddTile key={sid} badge={dots(label)} label="Save current state" busy={busy} onSave={(name) => save(sid, name)} />
          );
        })}
      </div>
    </div>
  );
}
