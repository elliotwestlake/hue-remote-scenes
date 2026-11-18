/** HA's own <ha-icon> (always registered in the HA frontend), so we get MDI icons for free. */
export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`icon-wrap ${className ?? ""}`} aria-hidden="true">
      <ha-icon icon={`mdi:${name}`} />
    </span>
  );
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "ha-icon": { icon: string };
    }
  }
}
