import { useState } from "react";
import { Icon } from "./Icon";
import { isOn } from "./model";
import { EmptySlotRow, SceneRow } from "./Scenes";
import { dots, hex, plural, type DialButton, type Group, type Hass, type StoreResult } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  group: Group;
  onChanged: () => void;
}

/** One group in an opened area: its remote-button scenes, its other scenes, and saving new ones. */
export function GroupSection({ getHass, group, onChanged }: Props) {
  const { busy, result, act } = useAction();
  const [newName, setNewName] = useState("");
  const hass = getHass();

  const names = Object.fromEntries(group.members.map((m) => [m.key, m.name]));
  const capable = group.members.filter((m) => m.scenes);
  const describe = (keys: string[]) => keys.map((k) => names[k] ?? k).join(", ");
  const missing = (keys: string[]) => describe(capable.map((m) => m.key).filter((k) => !keys.includes(k)));
  const on = group.members.filter((m) => isOn(hass, m.entity_id)).length;
  // Scenes a remote's buttons recall are listed with their button, not with the others.
  const buttons: DialButton[] = group.dials[0]?.buttons ?? [];
  const slotIds = new Set(group.dials.flatMap((d) => d.buttons.map((b) => b.scene_id)));
  const others = group.scenes.filter((s) => !slotIds.has(s.id));

  const run = (msg: Record<string, unknown>, done: (r: any) => string) =>
    act(async () => {
      const r = await getHass().callWS<any>({ group_id: group.id, ...msg });
      onChanged();
      return done(r);
    });

  const storeText = (verb: string) => (r: StoreResult) => {
    const failed = Object.keys(r.failed);
    return failed.length
      ? `${verb} on ${r.ok.length} of ${r.ok.length + failed.length} lights. These didn't answer: ${describe(failed)}`
      : `${verb} on ${plural(r.ok.length, "light")}`;
  };

  const recall = (id: number, name: string) => run({ type: "hue_remote_scenes/recall", scene_id: id }, () => `Recalled ${name}`);
  const overwrite = (id: number, name: string) =>
    confirm(`Save how the lights are now as "${name}"?`) && run({ type: "hue_remote_scenes/store", scene_id: id }, storeText("Saved"));
  const rename = (id: number, name: string) => run({ type: "hue_remote_scenes/rename", scene_id: id, name }, () => "Renamed");
  const remove = (id: number, name: string) =>
    confirm(`Delete "${name}" from the lights?`) &&
    run({ type: "hue_remote_scenes/delete", scene_id: id }, (r) =>
      Object.keys(r.failed).length
        ? `Deleted, but some lights didn't answer and may still have it: ${describe(Object.keys(r.failed))}`
        : `Deleted ${name}`,
    );
  const save = () => {
    if (!newName.trim()) return;
    run({ type: "hue_remote_scenes/store", name: newName }, storeText("Saved")).then(() => setNewName(""));
  };

  return (
    <section className="card">
      <div className="card-head">
        <div className="title">
          <Icon name="lightbulb-group-outline" className="title-icon" />
          <div>
            <h2>{group.name}</h2>
            <div className="muted small">
              Group {hex(group.id)} · {capable.length ? capable.map((m) => m.name).join(", ") : "no lights that can store scenes"}
              {group.members.length > capable.length && ` (+${group.members.length - capable.length} without scenes)`}
            </div>
          </div>
        </div>
        <span className={`chip ${on ? "on" : ""}`}>
          <Icon name={on ? "lightbulb-on-outline" : "lightbulb-off-outline"} />
          {on ? `${on} on` : "Off"}
        </span>
      </div>

      {capable.length > 0 && (
        <>
          {buttons.length > 0 && (
            <>
              <h3>{group.dials.map((d) => d.name).join(", ")} buttons</h3>
              <div className="rows">
                {buttons.map((b) => {
                  const scene = group.scenes.find((s) => s.id === b.scene_id);
                  return scene ? (
                    <SceneRow
                      key={b.scene_id}
                      scene={scene}
                      dots={dots(b.label)}
                      total={capable.length}
                      missing={missing(scene.members)}
                      busy={!!busy}
                      onRecall={() => recall(scene.id, scene.name)}
                      onOverwrite={() => overwrite(scene.id, scene.name)}
                      onRename={(name) => rename(scene.id, name)}
                    />
                  ) : (
                    <EmptySlotRow
                      key={b.scene_id}
                      dots={dots(b.label)}
                      label={b.label}
                      busy={!!busy}
                      onSave={(name) => run({ type: "hue_remote_scenes/store", scene_id: b.scene_id, name }, storeText("Saved"))}
                    />
                  );
                })}
              </div>
              {buttons.some((b) => /^\d/.test(b.label)) && (
                <p className="muted small">Hold any button to turn the lights off. Turn the dial to dim.</p>
              )}
            </>
          )}

          <h3>{buttons.length ? "Other scenes" : "Scenes"}</h3>
          <div className="rows">
            {others.map((s) => (
              <SceneRow
                key={s.id}
                scene={s}
                total={capable.length}
                missing={missing(s.members)}
                busy={!!busy}
                onRecall={() => recall(s.id, s.name)}
                onOverwrite={() => overwrite(s.id, s.name)}
                onRename={(name) => rename(s.id, name)}
                onDelete={() => remove(s.id, s.name)}
              />
            ))}
            {!others.length && <p className="muted">No {buttons.length ? "other " : ""}scenes yet.</p>}
          </div>

          <form
            className="inline-row"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <input type="text" placeholder="New scene name" value={newName} maxLength={40} onChange={(e) => setNewName(e.target.value)} aria-label="New scene name" />
            <button className="primary" type="submit" disabled={!!busy || !newName.trim()}>
              <Icon name="content-save-outline" /> Save current state
            </button>
          </form>
        </>
      )}

      <div className="card-actions">
        <button
          className="ghost"
          disabled={!!busy || !capable.length}
          title="Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT"
          onClick={() =>
            run({ type: "hue_remote_scenes/import" }, (r) =>
              r.added.length
                ? `Found ${plural(r.added.length, "new scene")}. Rename them above.`
                : r.found.length
                  ? "No new scenes: the ones on the lights are all here."
                  : "The lights have no scenes for this group yet.",
            )
          }
        >
          <Icon name="database-import-outline" /> Import from lights
        </button>
      </div>

      {busy && <div className="status busy">{busy}</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}
