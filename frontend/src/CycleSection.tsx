import { useState } from "react";
import { Icon } from "./Icon";
import { Swatch } from "./SceneCard";
import { plural, type Group, type Hass, type Remote } from "./types";

interface Props {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  busy: boolean;
  act: (fn: () => Promise<string | void>, waiting?: string) => Promise<void>;
  onChanged: () => void;
}

/**
 * Remotes that can't recall scenes themselves (gen 1 Hue dimmer, smart button): while HA runs,
 * their trigger press recalls the next scene in a list. Bound on/off and dimming still work without HA.
 */
export function CycleSection({ getHass, remote, groups, busy, act, onChanged }: Props) {
  const cycle = remote.cycle;
  const trigger = remote.cycle_trigger!;
  const [editing, setEditing] = useState(false);
  const [groupId, setGroupId] = useState(cycle?.group_id ?? groups.find((g) => g.scenes.length)?.id ?? groups[0]?.id ?? 0);
  const [picked, setPicked] = useState<number[]>(cycle?.scene_ids ?? []);
  const group = groups.find((g) => g.id === groupId);
  const cycleGroup = cycle ? groups.find((g) => g.id === cycle.group_id) : undefined;

  const toggle = (id: number) => setPicked((p) => (p.includes(id) ? p.filter((s) => s !== id) : [...p, id]));
  const save = (stop: boolean) =>
    act(async () => {
      await getHass().callWS(
        stop
          ? { type: "hue_remote_scenes/set_cycle", ieee: remote.ieee }
          : { type: "hue_remote_scenes/set_cycle", ieee: remote.ieee, group_id: groupId, scene_ids: picked },
      );
      setEditing(false);
      onChanged();
      return stop ? "Stopped cycling scenes." : `${trigger.label} now cycles ${plural(picked.length, "scene")}.`;
    }, "Saving…");

  const recall = (gid: number, sid: number, name: string) =>
    act(async () => {
      await getHass().callWS({ type: "hue_remote_scenes/recall", group_id: gid, scene_id: sid });
      return `Recalled ${name}`;
    });

  return (
    <div className="stack-sm">
      <div className="row-between">
        <p className="label">Scene cycle</p>
        <span className="chip" title="The cycle runs in Home Assistant. Bound on/off and dimming work without it.">Needs Home Assistant</span>
      </div>

      {!editing && cycle && cycleGroup && (
        <>
          <div className="sws">
            {cycle.scene_ids.map((sid, i) => {
              const scene = cycleGroup.scenes.find((s) => s.id === sid);
              return scene ? (
                <Swatch key={sid} scene={scene} badge={String(i + 1)} disabled={busy} onRecall={() => recall(cycleGroup.id, sid, scene.name)} />
              ) : null;
            })}
          </div>
          <div className="ctl small">
            <Icon name="sync" />
            <span className="grow">{trigger.label} recalls the next scene; after a pause it starts again</span>
            <span className="muted">{cycleGroup.name}</span>
          </div>
          <div className="row-start">
            <button className="ghost" disabled={busy} onClick={() => setEditing(true)}>Change</button>
            <button className="ghost" disabled={busy} onClick={() => save(true)}>Stop</button>
          </div>
        </>
      )}

      {!editing && !cycle && (
        <div className="row-start">
          <p className="muted small grow tight0">
            It can't recall scenes itself, but while Home Assistant runs, <strong>{trigger.label.toLowerCase()}</strong> can
            step through scenes you pick.
          </p>
          <button disabled={busy || !groups.length} onClick={() => setEditing(true)}>Choose scenes</button>
        </div>
      )}

      {editing && (
        <>
          <select
            value={groupId}
            disabled={!groups.length}
            onChange={(e) => {
              setGroupId(+e.target.value);
              setPicked([]);
            }}
            aria-label="Group to cycle"
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>{g.name}{g.areas[0] ? ` (${g.areas[0]})` : ""}</option>
            ))}
          </select>
          <div className="row-start wrap">
            {(group?.scenes ?? []).map((s) => (
              <button key={s.id} className={`fchip ${picked.includes(s.id) ? "on" : ""}`} onClick={() => toggle(s.id)}>
                {picked.includes(s.id) && <span>{picked.indexOf(s.id) + 1}</span>} {s.name}
              </button>
            ))}
            {group && !group.scenes.length && <span className="muted small">Save some scenes in this group first.</span>}
          </div>
          <div className="row-end">
            <button className="ghost" disabled={busy} onClick={() => setEditing(false)}>Cancel</button>
            <button className="primary" disabled={busy || !picked.length} onClick={() => save(false)}>Save cycle</button>
          </div>
        </>
      )}
    </div>
  );
}
