import { useState } from "react";
import { Icon } from "./Icon";
import { isPale, swatch } from "./model";
import type { Scene } from "./types";

/** A pill that recalls a scene, with a dot in its saved colours (scene cycles). */
export function SceneChip({ scene, badge, disabled, onRecall }: { scene: Scene; badge?: string; disabled?: boolean; onRecall: () => void }) {
  return (
    <button className="chip-btn scene-chip" disabled={disabled} onClick={onRecall} title={`Recall ${scene.name}`}>
      <span className="dot" style={{ background: swatch(scene.colors) }} />
      {scene.name}
      {badge && <span className="badge">{badge}</span>}
    </button>
  );
}

interface TileProps {
  scene: Scene;
  badge?: string; // a remote button's dots
  warn?: string; // e.g. "on 2 of 3 lights"
  busy: boolean;
  onRecall: () => void;
  onOverwrite: () => void;
  onEdit?: () => void;
  onRename?: (name: string) => void;
  onDelete?: () => void;
}

/** A big tile in the scene's colours: tap to recall, ⋮ to edit, save over, rename or delete. */
export function SceneTile({ scene, badge, warn, busy, onRecall, onOverwrite, onEdit, onRename, onDelete }: TileProps) {
  const [menu, setMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(scene.name);

  if (editing)
    return (
      <form
        className="tile tile-form"
        onSubmit={(e) => {
          e.preventDefault();
          setEditing(false);
          if (name.trim() && name !== scene.name) onRename?.(name);
        }}
      >
        <input type="text" value={name} maxLength={40} autoFocus onChange={(e) => setName(e.target.value)} aria-label="Scene name" />
        <div className="tile-form-actions">
          <button type="button" className="ghost" onClick={() => setEditing(false)}>Cancel</button>
          <button type="submit" className="primary">Save</button>
        </div>
      </form>
    );

  return (
    <div className={`tile-wrap ${isPale(scene.colors) ? "pale" : ""}`}>
      <button className="tile" style={{ background: swatch(scene.colors) }} disabled={busy} onClick={onRecall} title={`Recall ${scene.name}`}>
        {badge && <span className="badge">{badge}</span>}
        <span className="tile-name">{scene.name}</span>
        {warn && <span className="tile-warn">{warn}</span>}
      </button>
      <button className="tile-more" disabled={busy} onClick={() => setMenu(!menu)} aria-label={`More for ${scene.name}`}>
        <Icon name="dots-vertical" />
      </button>
      {menu && (
        <>
          <div className="menu-backdrop" onClick={() => setMenu(false)} />
          <div className="menu" role="menu">
            {onEdit && (
              <button role="menuitem" onClick={() => { setMenu(false); onEdit(); }}>
                <Icon name="palette-outline" /> Edit colours
              </button>
            )}
            <button role="menuitem" onClick={() => { setMenu(false); onOverwrite(); }}>
              <Icon name="content-save-edit-outline" /> Save current state here
            </button>
            {onRename && (
              <button role="menuitem" onClick={() => { setMenu(false); setName(scene.name); setEditing(true); }}>
                <Icon name="pencil-outline" /> Rename
              </button>
            )}
            {onDelete && (
              <button role="menuitem" className="danger" onClick={() => { setMenu(false); onDelete(); }}>
                <Icon name="delete-outline" /> Delete
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/** A dashed tile for a new scene or a remote button's empty slot: opens onOpen (the scene
 * editor) if given, else asks for a name and saves the lights' current state. */
export function AddTile({ badge, label, busy, onSave, onOpen }: { badge?: string; label: string; busy: boolean; onSave?: (name: string) => void; onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  if (!open)
    return (
      <button className="tile add" disabled={busy} onClick={() => (onOpen ? onOpen() : setOpen(true))}>
        {badge ? <span className="add-dots">{badge}</span> : <Icon name="plus" />}
        <span>{label}</span>
      </button>
    );
  return (
    <form
      className="tile tile-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave?.(name);
        setName("");
        setOpen(false);
      }}
    >
      <input type="text" placeholder="Scene name" value={name} maxLength={40} autoFocus onChange={(e) => setName(e.target.value)} aria-label="Scene name" />
      <div className="tile-form-actions">
        <button type="button" className="ghost" onClick={() => setOpen(false)}>Cancel</button>
        <button type="submit" className="primary" disabled={busy || !name.trim()}>Save</button>
      </div>
    </form>
  );
}
