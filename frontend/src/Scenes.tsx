import { useState } from "react";
import { Icon } from "./Icon";
import { swatch } from "./model";
import type { Scene } from "./types";

/** A pill that recalls a scene, with a dot in its saved colours: area cards and remote cards. */
export function SceneChip({ scene, badge, disabled, onRecall }: { scene: Scene; badge?: string; disabled?: boolean; onRecall: () => void }) {
  return (
    <button className="chip-btn scene-chip" disabled={disabled} onClick={onRecall} title={`Recall ${scene.name}`}>
      <span className="dot" style={{ background: swatch(scene.colors) }} />
      {scene.name}
      {badge && <span className="badge">{badge}</span>}
    </button>
  );
}

interface RowProps {
  scene: Scene;
  dots?: string; // a remote button's dots, for button slots
  total: number; // lights in the group that can store scenes
  missing: string; // names of the lights that don't have it
  busy: boolean;
  onRecall: () => void;
  onOverwrite: () => void;
  onRename?: (name: string) => void;
  onDelete?: () => void;
}

/** One scene in an opened area: its colours, recall, and rename / overwrite / delete. */
export function SceneRow({ scene, dots, total, missing, busy, onRecall, onOverwrite, onRename, onDelete }: RowProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(scene.name);
  const have = scene.members.length;

  return (
    <div className="srow">
      {dots && <span className="dots">{dots}</span>}
      <span className="swatch" style={{ background: swatch(scene.colors) }} />
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEditing(false);
            if (name.trim() && name !== scene.name) onRename?.(name);
          }}
        >
          <input type="text" value={name} maxLength={40} autoFocus onChange={(e) => setName(e.target.value)} aria-label="Scene name" />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <div className="grow">
            <div className="name">{scene.name}</div>
            <div className="meta muted small">
              Scene {scene.id}
              {have < total && (
                <span className="chip warn" title={`Missing on: ${missing}`}>on {have} of {total} lights</span>
              )}
            </div>
          </div>
          <button className="round recall" disabled={busy} onClick={onRecall} title="Recall" aria-label={`Recall ${scene.name}`}>
            <Icon name="play" />
          </button>
          {onRename && (
            <button className="ghost round" disabled={busy} onClick={() => { setName(scene.name); setEditing(true); }} title="Rename" aria-label="Rename">
              <Icon name="pencil-outline" />
            </button>
          )}
          <button className="ghost round" disabled={busy} onClick={onOverwrite} title="Save the current state here" aria-label="Save the current state here">
            <Icon name="content-save-edit-outline" />
          </button>
          {onDelete && (
            <button className="danger round" disabled={busy} onClick={onDelete} title="Delete" aria-label="Delete">
              <Icon name="delete-outline" />
            </button>
          )}
        </>
      )}
    </div>
  );
}

/** A remote button with no scene yet: name it and save the lights' current state. */
export function EmptySlotRow({ dots, label, busy, onSave }: { dots: string; label: string; busy: boolean; onSave: (name: string) => void }) {
  const [name, setName] = useState("");
  return (
    <div className="srow">
      <span className="dots">{dots}</span>
      <span className="swatch" style={{ background: "var(--hl-off-fill)" }} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onSave(name);
        }}
      >
        <input type="text" placeholder={`Scene for ${label}`} value={name} maxLength={40} onChange={(e) => setName(e.target.value)} aria-label={`Scene for ${label}`} />
        <button type="submit" className="primary" disabled={busy || !name.trim()}>
          <Icon name="content-save-outline" /> Save current state
        </button>
      </form>
    </div>
  );
}
