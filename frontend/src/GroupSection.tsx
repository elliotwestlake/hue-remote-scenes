import { Icon } from "./Icon";
import { isOn } from "./model";
import { NewSceneCard, SceneCard } from "./SceneCard";
import { dots, hex, plural, type DialButton, type Group, type Hass, type StoreResult } from "./types";
import { useAction } from "./useAction";

interface Props {
  getHass: () => Hass;
  group: Group;
  onChanged: () => void;
}

/** One group in an opened area: its dial buttons, its other scenes, and saving new ones. */
export function GroupSection({ getHass, group, onChanged }: Props) {
  const { busy, result, act } = useAction();
  const hass = getHass();

  const names = Object.fromEntries(group.members.map((m) => [m.key, m.name]));
  const capable = group.members.filter((m) => m.scenes);
  const describe = (keys: string[]) => keys.map((k) => names[k] ?? k).join(", ");
  const missing = (keys: string[]) => describe(capable.map((m) => m.key).filter((k) => !keys.includes(k)));
  const on = group.members.filter((m) => isOn(hass, m.entity_id)).length;
  // Scenes a dial's buttons recall live in the button row, not the list.
  const dial = group.dials[0];
  const buttons: DialButton[] = dial?.buttons ?? [];
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

  return (
    <section className="card">
      <div className="card-head">
        <div className="grow">
          <h3 className="title">{group.name}</h3>
          <div className="muted small">
            Group {hex(group.id)} · {capable.length ? capable.map((m) => m.name).join(", ") : "no lights that can store scenes"}
            {group.members.length > capable.length && ` (+${group.members.length - capable.length} without scenes)`}
            {on > 0 && ` · ${on} on`}
          </div>
        </div>
        <button
          className="ghost"
          disabled={!!busy || !capable.length}
          title="Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT"
          onClick={() =>
            run({ type: "hue_remote_scenes/import" }, (r) =>
              r.added.length
                ? `Found ${plural(r.added.length, "new scene")}. Rename them from their ⋮ menu.`
                : r.found.length
                  ? "No new scenes: the ones on the lights are all here."
                  : "The lights have no scenes for this group yet.",
            )
          }
        >
          <Icon name="database-import-outline" /> Import from lights
        </button>
      </div>

      {capable.length > 0 && (
        <>
          {buttons.length > 0 && (
            <>
              <p className="label">{group.dials.map((d) => d.name).join(", ")} buttons</p>
              <div className="cards4">
                {buttons.map((b) => {
                  const scene = group.scenes.find((s) => s.id === b.scene_id);
                  return scene ? (
                    <SceneCard
                      key={b.scene_id}
                      scene={scene}
                      badge={dots(b.label)}
                      total={capable.length}
                      missing={missing(scene.members)}
                      busy={!!busy}
                      onRecall={() => recall(scene.id, scene.name)}
                      onOverwrite={() => overwrite(scene.id, scene.name)}
                      onRename={(name) => rename(scene.id, name)}
                    />
                  ) : (
                    <NewSceneCard
                      key={b.scene_id}
                      badge={dots(b.label)}
                      placeholder={`Scene for ${b.label}`}
                      busy={!!busy}
                      onSave={(name) => run({ type: "hue_remote_scenes/store", scene_id: b.scene_id, name }, storeText("Saved"))}
                    />
                  );
                })}
              </div>
              {buttons.some((b) => /^\d/.test(b.label)) && (
                <p className="muted small tight">Hold any button to turn the lights off. Turn the dial to dim.</p>
              )}
              <p className="label">Other scenes</p>
            </>
          )}
          <div className="cards4">
            {others.map((s) => (
              <SceneCard
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
            <NewSceneCard
              placeholder="New scene name"
              busy={!!busy}
              onSave={(name) => run({ type: "hue_remote_scenes/store", name }, storeText("Saved"))}
            />
          </div>
        </>
      )}

      {busy && <div className="status busy">{busy}</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}
