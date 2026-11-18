import { createRoot, Root } from "react-dom/client";
import { App } from "./App";
import { styles } from "./styles";
import type { Hass } from "./types";

/**
 * HA mounts this element for the sidebar panel and sets `hass`, `narrow`,
 * `route` and `panel` as properties. `hass` is reassigned on every state
 * change, so we keep it in a getter and re-render at most once a second
 * (for live on/off and battery).
 */
class HueRemoteScenesPanel extends HTMLElement {
  private _hass?: Hass;
  private _narrow = false;
  private _root?: Root;
  private _pending?: number;

  set hass(hass: Hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first) this._render();
    else this._pending ??= window.setTimeout(() => {
      this._pending = undefined;
      this._render();
    }, 1000);
  }

  set narrow(narrow: boolean) {
    if (narrow !== this._narrow) {
      this._narrow = narrow;
      this._render();
    }
  }

  connectedCallback() {
    if (!this._root) {
      const shadow = this.shadowRoot ?? this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = styles;
      const mount = document.createElement("div");
      shadow.append(style, mount);
      this._root = createRoot(mount);
    }
    this._render();
  }

  disconnectedCallback() {
    window.clearTimeout(this._pending);
    this._pending = undefined;
    this._root?.unmount();
    this._root = undefined;
    this.shadowRoot?.replaceChildren();
  }

  private _render() {
    if (!this._root || !this._hass) return;
    this._root.render(
      <App
        getHass={() => this._hass!}
        narrow={this._narrow}
        onToggleMenu={() =>
          this.dispatchEvent(
            new Event("hass-toggle-menu", { bubbles: true, composed: true }),
          )
        }
      />,
    );
  }
}

if (!customElements.get("hue-remote-scenes-panel")) {
  customElements.define("hue-remote-scenes-panel", HueRemoteScenesPanel);
}
