import { useState } from "react";
import { Icon } from "./Icon";
import { errorText, type Group, type Hass, type Result, type Scene, type StoreResult } from "./types";

interface Props {
  getHass: () => Hass;
  groups: Group[];
  onChanged: () => void;
}

export function Scenes({ getHass, groups, onChanged }: Props) {
  return (
    <div className="stack">
      <p className="muted intro">
        Scenes are saved on the lights themselves, so a bound remote can recall them even when Home Assistant is down.
        Set the lights how you want them, then save. Each scene also becomes a <code>scene.</code> entity.
      </p>
      {groups.map((g) => (
        <GroupCard key={g.id} getHass={getHass} group={g} onChanged={onChanged} />
      ))}
    </div>
  );
}

function GroupCard({ getHass, group, onChanged }: { getHass: () => Hass; group: Group; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [newName, setNewName] = useState("");

  const names = Object.fromEntries(group.members.map((m) => [m.key, m.name]));
  const capable = group.members.filter((m) => m.scenes);
  const describe = (keys: string[]) => keys.map((k) => names[k] ?? k).join(", ");

  const run = async (msg: Record<string, unknown>, done: (r: any) => string) => {
    setBusy(true);
    setResult(null);
    try {
      const r = await getHass().callWS<any>({ group_id: group.id, ...msg });
      setResult({ kind: r?.failed && Object.keys(r.failed).length ? "error" : "ok", text: done(r) });
      onChanged();
    } catch (e) {
      setResult({ kind: "error", text: errorText(e) });
    } finally {
      setBusy(false);
    }
  };

  const storeText = (verb: string) => (r: StoreResult) => {
    const failed = Object.keys(r.failed);
    return failed.length
      ? `${verb} on ${r.ok.length} of ${r.ok.length + failed.length} lights. Didn't answer: ${describe(failed)}`
      : `${verb} on ${r.ok.length} light${r.ok.length === 1 ? "" : "s"}`;
  };

  const save = () => {
    if (!newName.trim()) return;
    run({ type: "zha_scenes/store", name: newName }, storeText("Saved")).then(() => setNewName(""));
  };

  return (
    <section className="card">
      <div className="card-head">
        <div className="title">
          <span className="icon-wrap title-icon">
            <ha-icon icon="mdi:lightbulb-group-outline" />
          </span>
          <div>
            <h2>{group.name}</h2>
            <div className="muted small">
              Group {group.id} · {capable.length} light{capable.length === 1 ? "" : "s"}
              {group.members.length > capable.length && ` (+${group.members.length - capable.length} without scenes)`}
            </div>
          </div>
        </div>
        <button
          className="ghost"
          disabled={busy || !capable.length}
          title="Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT"
          onClick={() =>
            run({ type: "zha_scenes/import" }, (r) =>
              r.added.length
                ? `Found ${r.added.length} new scene${r.added.length === 1 ? "" : "s"}. Give them names below.`
                : r.found.length
                  ? "No new scenes. The ones on the lights are all listed here."
                  : "The lights have no scenes for this group yet.",
            )
          }
        >
          <Icon name="database-import-outline" /> Import from lights
        </button>
      </div>

      {!capable.length ? (
        <p className="muted">None of this group's devices can store scenes.</p>
      ) : (
        <>
          <div className="scenes">
            {group.scenes.map((s) => (
              <SceneRow
                key={s.id}
                scene={s}
                total={capable.length}
                busy={busy}
                missing={describe(capable.map((m) => m.key).filter((k) => !s.members.includes(k)))}
                onRecall={() => run({ type: "zha_scenes/recall", scene_id: s.id }, () => `Recalled ${s.name}`)}
                onUpdate={() => {
                  if (confirm(`Overwrite "${s.name}" with how the lights are now?`))
                    run({ type: "zha_scenes/store", scene_id: s.id }, storeText("Updated"));
                }}
                onRename={(name) => run({ type: "zha_scenes/rename", scene_id: s.id, name }, () => "Renamed")}
                onDelete={() => {
                  if (confirm(`Delete "${s.name}" from the lights?`))
                    run({ type: "zha_scenes/delete", scene_id: s.id }, (r) =>
                      Object.keys(r.failed).length
                        ? `Deleted, but some lights didn't answer and may still have it: ${describe(Object.keys(r.failed))}`
                        : `Deleted ${s.name}`,
                    );
                }}
              />
            ))}
            {!group.scenes.length && <p className="muted">No scenes yet.</p>}
          </div>

          <form
            className="inline-row new-scene"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <input
              type="text"
              placeholder="New scene name"
              value={newName}
              maxLength={40}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button className="primary" type="submit" disabled={busy || !newName.trim()}>
              <Icon name="content-save-outline" /> Save current state
            </button>
          </form>
        </>
      )}

      {busy && <div className="status busy">Talking to the lights…</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}

interface RowProps {
  scene: Scene;
  total: number;
  busy: boolean;
  missing: string;
  onRecall: () => void;
  onUpdate: () => void;
  onRename: (name: string) => void;
  onDelete: () => void;
}

function SceneRow({ scene, total, busy, missing, onRecall, onUpdate, onRename, onDelete }: RowProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(scene.name);
  const have = scene.members.length;

  return (
    <div className="scene-row">
      <button className="recall" disabled={busy} onClick={onRecall} title="Recall">
        <Icon name="play" />
      </button>
      <div className="scene-main">
        {editing ? (
          <form
            className="inline-row"
            onSubmit={(e) => {
              e.preventDefault();
              setEditing(false);
              if (name.trim() && name !== scene.name) onRename(name);
            }}
          >
            <input type="text" value={name} maxLength={40} autoFocus onChange={(e) => setName(e.target.value)} />
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            <div className="scene-name">{scene.name}</div>
            <div className="muted small">
              Scene {scene.id}
              {have < total && (
                <span className="chip warn" title={`Missing on: ${missing}`}>
                  on {have} of {total} lights
                </span>
              )}
            </div>
          </>
        )}
      </div>
      {!editing && (
        <div className="actions">
          <button className="ghost round" disabled={busy} onClick={() => { setName(scene.name); setEditing(true); }} title="Rename">
            <Icon name="pencil-outline" />
          </button>
          <button className="ghost round" disabled={busy} onClick={onUpdate} title="Overwrite with the current state">
            <Icon name="content-save-edit-outline" />
          </button>
          <button className="danger round" disabled={busy} onClick={onDelete} title="Delete">
            <Icon name="delete-outline" />
          </button>
        </div>
      )}
    </div>
  );
}
