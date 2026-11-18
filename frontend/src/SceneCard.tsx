import { useState } from "react";
import { Icon } from "./Icon";
import { swatch } from "./model";
import type { Scene } from "./types";

/** A small swatch that recalls a scene: used in area tiles and remote cards. */
export function Swatch({ scene, badge, disabled, onRecall }: { scene: Scene; badge?: string; disabled?: boolean; onRecall: () => void }) {
  return (
    <button className="sw" disabled={disabled} onClick={onRecall} title={`Recall ${scene.name}`}>
      <span className="swc" style={{ background: swatch(scene.colors) }}>
        {badge && <span className="badge">{badge}</span>}
      </span>
      <span className="swn">{scene.name}</span>
    </button>
  );
}

interface CardProps {
  scene: Scene;
  badge?: string; // a dial button's dots
  total: number; // lights in the group that can store scenes
  missing: string; // names of the lights that don't have it
  busy: boolean;
  onRecall: () => void;
  onOverwrite: () => void;
  onRename?: (name: string) => void;
  onDelete?: () => void;
}

/** A large scene card: tap the swatch to recall, ⋮ to overwrite, rename or delete. */
export function SceneCard({ scene, badge, total, missing, busy, onRecall, onOverwrite, onRename, onDelete }: CardProps) {
  const [menu, setMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(scene.name);
  const have = scene.members.length;

  return (
    <div className="scard">
      <button className="scard-sw" style={{ background: swatch(scene.colors) }} disabled={busy} onClick={onRecall} title={`Recall ${scene.name}`}>
        {badge && <span className="badge">{badge}</span>}
        <span className="play"><Icon name="play" /></span>
      </button>
      {editing ? (
        <form
          className="scard-foot"
          onSubmit={(e) => {
            e.preventDefault();
            setEditing(false);
            if (name.trim() && name !== scene.name) onRename?.(name);
          }}
        >
          <input type="text" value={name} maxLength={40} autoFocus onChange={(e) => setName(e.target.value)} aria-label="Scene name" />
          <button type="submit" className="icon-btn" aria-label="Save name"><Icon name="check" /></button>
        </form>
      ) : (
        <div className="scard-foot">
          <span className="sname" title={scene.name}>{scene.name}</span>
          {have < total && (
            <span className="chip warn" title={`Missing on: ${missing}`}>{have} of {total}</span>
          )}
          <button className="icon-btn" disabled={busy} onClick={() => setMenu(!menu)} aria-label={`More for ${scene.name}`}>
              <Icon name="dots-vertical" />
            </button>
            {menu && (
              <>
                <div className="menu-backdrop" onClick={() => setMenu(false)} />
                <div className="menu" role="menu">
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
                  <div className="menu-note">Scene {scene.id}</div>
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

/** A dashed card that saves the lights' current state: a new scene, or a dial button's empty slot. */
export function NewSceneCard({ badge, placeholder, busy, onSave }: { badge?: string; placeholder: string; busy: boolean; onSave: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  if (!open)
    return (
      <button className="newcard" disabled={busy} onClick={() => setOpen(true)}>
        {badge ? <span className="newcard-dots">{badge}</span> : <Icon name="plus" />}
        <strong>Save current state</strong>
        <span className="muted small">{badge ? "for this button" : "as a new scene"}</span>
      </button>
    );
  return (
    <form
      className="newcard open"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave(name);
        setName("");
        setOpen(false);
      }}
    >
      {badge && <span className="newcard-dots">{badge}</span>}
      <input type="text" placeholder={placeholder} value={name} maxLength={40} autoFocus onChange={(e) => setName(e.target.value)} aria-label="Scene name" />
      <div className="row-end">
        <button type="button" className="ghost" onClick={() => setOpen(false)}>Cancel</button>
        <button type="submit" className="primary" disabled={busy || !name.trim()}>Save</button>
      </div>
    </form>
  );
}
