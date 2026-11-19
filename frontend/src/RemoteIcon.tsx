import { Icon } from "./Icon";
import { isTapDial } from "./model";
import type { Remote } from "./types";

/** Outline drawings (24×24, like MDI's outline icons) for the remotes we know. */
const SHAPES: Record<string, JSX.Element> = {
  // A ring you turn, with four buttons inside it.
  dial: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="10" cy="10" r=".9" fill="currentColor" stroke="none" />
      <circle cx="14" cy="10" r=".9" fill="currentColor" stroke="none" />
      <circle cx="10" cy="14" r=".9" fill="currentColor" stroke="none" />
      <circle cx="14" cy="14" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  // A tall plate: on, brighter, dimmer, off.
  dimmer: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="3" />
      <path d="M9.5 6.5h5M10.5 10.5h3M10.5 13.5h3M9.5 17.5h5" />
    </>
  ),
  // One round button on a square plate.
  button: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
};

const shape = (r: Remote) => {
  if (isTapDial(r)) return "dial";
  const model = r.model?.toUpperCase() ?? "";
  if (model.startsWith("RWL")) return "dimmer";
  if (model.startsWith("ROM") || model.startsWith("RDM003")) return "button";
  return null;
};

/** A remote's icon: our drawing for Hue remotes we know, else MDI's generic remote. */
export function RemoteIcon({ remote, className }: { remote: Remote; className?: string }) {
  const s = shape(remote);
  if (!s) return <Icon name={remote.endpoints.some((e) => e.clusters.includes(8)) ? "remote" : "gesture-tap-button"} className={className} />;
  return (
    <span className={`icon-wrap ${className ?? ""}`} aria-hidden="true">
      <svg className="remote-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {SHAPES[s]}
      </svg>
    </span>
  );
}
