import { useState } from "react";
import { Icon } from "./Icon";
import { CLUSTER_LABEL, dots, errorText, type DialButton, type Group, type Hass, type Result, type Scene, type StoreResult } from "./types";

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
  // Scenes a dial's buttons recall live in the button slots, not the list.
  const buttons: DialButton[] = group.dials[0]?.buttons ?? [];
  const slotIds = new Set(group.dials.flatMap((d) => d.buttons.map((b) => b.scene_id)));
  const listed = group.scenes.filter((s) => !slotIds.has(s.id));

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
    run({ type: "hue_remote_scenes/store", name: newName }, storeText("Saved")).then(() => setNewName(""));
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
            {(group.areas.length > 0 || group.remotes.length > 0) && (
              <div className="chips meta">
                {group.areas.map((a) => (
                  <span key={a} className="chip" title="Area">
                    <Icon name="home-outline" /> {a}
                  </span>
                ))}
                {group.remotes.map((r) => (
                  <span key={r.ieee} className="chip on" title={`Bound remote: ${r.clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")}`}>
                    <Icon name="remote" /> {r.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          className="ghost"
          disabled={busy || !capable.length}
          title="Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT"
          onClick={() =>
            run({ type: "hue_remote_scenes/import" }, (r) =>
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
          {buttons.length > 0 && (
            <div className="dial-buttons">
              <h3>
                {group.dials.map((d) => d.name).join(", ")} buttons
              </h3>
              {buttons.map((b) => (
                <ButtonSlot
                  key={b.scene_id}
                  button={b}
                  scene={group.scenes.find((s) => s.id === b.scene_id)}
                  busy={busy}
                  onSave={(name) =>
                    run({ type: "hue_remote_scenes/store", scene_id: b.scene_id, ...(name ? { name } : {}) }, storeText("Saved"))
                  }
                  onRecall={() => run({ type: "hue_remote_scenes/recall", scene_id: b.scene_id }, () => "Recalled")}
                />
              ))}
              <p className="muted small">Hold any button to turn the lights off. Turn the dial to dim.</p>
            </div>
          )}

          <div className="scenes">
            {buttons.length > 0 && <h3>Other scenes</h3>}
            {listed.map((s) => (
              <SceneRow
                key={s.id}
                scene={s}
                total={capable.length}
                busy={busy}
                missing={describe(capable.map((m) => m.key).filter((k) => !s.members.includes(k)))}
                onRecall={() => run({ type: "hue_remote_scenes/recall", scene_id: s.id }, () => `Recalled ${s.name}`)}
                onUpdate={() => {
                  if (confirm(`Overwrite "${s.name}" with how the lights are now?`))
                    run({ type: "hue_remote_scenes/store", scene_id: s.id }, storeText("Updated"));
                }}
                onRename={(name) => run({ type: "hue_remote_scenes/rename", scene_id: s.id, name }, () => "Renamed")}
                onDelete={() => {
                  if (confirm(`Delete "${s.name}" from the lights?`))
                    run({ type: "hue_remote_scenes/delete", scene_id: s.id }, (r) =>
                      Object.keys(r.failed).length
                        ? `Deleted, but some lights didn't answer and may still have it: ${describe(Object.keys(r.failed))}`
                        : `Deleted ${s.name}`,
                    );
                }}
              />
            ))}
            {!listed.length && <p className="muted">No {buttons.length ? "other " : ""}scenes yet.</p>}
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

interface SlotProps {
  button: DialButton;
  scene: Scene | undefined;
  busy: boolean;
  onSave: (name: string | null) => void;
  onRecall: () => void;
}

/** One dial button: the scene it recalls, saved at the button's fixed scene id. */
function ButtonSlot({ button, scene, busy, onSave, onRecall }: SlotProps) {
  const [name, setName] = useState("");
  return (
    <div className="scene-row">
      <span className="dots" title={button.label}>{dots(button.label)}</span>
      {scene ? (
        <>
          <button className="recall" disabled={busy} onClick={onRecall} title="Recall">
            <Icon name="play" />
          </button>
          <div className="scene-main">
            <div className="scene-name">{scene.name}</div>
            <div className="muted small">{button.label} · scene {button.scene_id}</div>
          </div>
          <button
            className="ghost round"
            disabled={busy}
            title="Overwrite with the current state"
            onClick={() => confirm(`Overwrite "${scene.name}" with how the lights are now?`) && onSave(null)}
          >
            <Icon name="content-save-edit-outline" />
          </button>
        </>
      ) : (
        <form
          className="inline-row scene-main"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) onSave(name);
          }}
        >
          <input type="text" placeholder={`Scene for ${button.label}`} value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
          <button type="submit" disabled={busy || !name.trim()}>
            <Icon name="content-save-outline" /> Save current state
          </button>
        </form>
      )}
    </div>
  );
}
