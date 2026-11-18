// HA theme variables pierce the shadow root, so the panel follows light/dark themes.
export const styles = /* css */ `
:host {
  --hrs-radius: 20px;
  --hrs-soft: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);
  --hrs-soft-2: color-mix(in srgb, var(--primary-text-color, #000) 10%, transparent);
  --hrs-ok: var(--success-color, #43a047);
  --hrs-ok-bg: color-mix(in srgb, var(--hrs-ok) 15%, transparent);
  --hrs-ok-text: color-mix(in srgb, var(--hrs-ok) 70%, var(--primary-text-color));
  --hrs-warn: var(--warning-color, #ffa600);
  --hrs-warn-bg: color-mix(in srgb, var(--hrs-warn) 16%, transparent);
  --hrs-warn-text: color-mix(in srgb, var(--hrs-warn) 50%, var(--primary-text-color));
  --hrs-swatch-unknown: linear-gradient(135deg, var(--hrs-soft-2), var(--hrs-soft));
  display: block; height: 100%;
  background: var(--primary-background-color);
  color: var(--primary-text-color);
  font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, sans-serif));
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
* { box-sizing: border-box; }
.panel { min-height: 100%; background: var(--primary-background-color); }
.icon-wrap { display: inline-flex; align-items: center; justify-content: center; line-height: 0; --mdc-icon-size: 20px; }
.grow { flex: 1; min-width: 0; }
.muted { color: var(--secondary-text-color); }
.small { font-size: 12px; }
.tight { margin: -6px 0 0; }
strong { font-weight: 500; }
h2 { font-size: 18px; font-weight: 500; margin: 0; }
h3.title { font-size: 17px; font-weight: 500; margin: 0; }
.label { font-size: 12px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; color: var(--secondary-text-color); margin: 0; }
code { font-size: 13px; padding: 1px 5px; border-radius: 6px; background: var(--hrs-soft); }

/* Header: toolbar + tabs, like HA's own panels */
header { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }
.toolbar-row { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 16px; }
.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; }
.logo { position: relative; width: 28px; height: 28px; flex: none; }
.logo svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.logo-ring { position: absolute; inset: 1px; border-radius: 50%; background: conic-gradient(#ffb020, #ff6a3d, #ff4f8b, #b65cff, #5b6bff, #2f9bff, #19c3c0, #7fd36b, #ffb020); -webkit-mask: radial-gradient(circle, transparent 9.6px, #000 10.2px); mask: radial-gradient(circle, transparent 9.6px, #000 10.2px); }
.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; border-radius: 50%; }
.tabs { display: flex; gap: 2px; padding: 0 8px; overflow-x: auto; scrollbar-width: none; }
.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 0; background: transparent; color: inherit; opacity: .72; padding: 12px 14px 10px; border-bottom: 2px solid transparent; font-weight: 500; }
.tabs button:hover { opacity: .95; background: rgba(127,127,127,.08); }
.tabs button.on { opacity: 1; border-bottom-color: currentColor; }
.tabs .icon-wrap { --mdc-icon-size: 18px; }

main { max-width: 1320px; margin: 0 auto; padding: 24px 20px 40px; display: flex; flex-direction: column; gap: 16px; }
.stack { display: flex; flex-direction: column; gap: 16px; }
.stack-sm { display: flex; flex-direction: column; gap: 8px; }
.row-start { display: flex; align-items: center; gap: 10px; }
.row-start.wrap { flex-wrap: wrap; }
.row-end { display: flex; align-items: center; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }
.row-between { display: flex; justify-content: space-between; gap: 10px; }

/* Controls */
button { font: inherit; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; transition: background .15s, border-color .15s, opacity .15s, transform .1s, box-shadow .15s; }
button:hover:not(:disabled) { background: var(--hrs-soft); }
button:active:not(:disabled) { transform: scale(.98); }
button:disabled { opacity: .45; cursor: default; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
button.primary { background: var(--primary-text-color); border-color: transparent; color: var(--card-background-color, #fff); }
button.primary:hover:not(:disabled) { background: var(--primary-text-color); opacity: .88; }
button.ghost { border-color: transparent; background: transparent; color: var(--secondary-text-color); padding: 6px 10px; }
button.ghost:hover:not(:disabled) { color: var(--primary-text-color); }
button.link { border: 0; background: none; padding: 0; color: var(--primary-color); font-weight: 500; }
button.danger, .menu button.danger { color: var(--error-color); }
.icon-btn { width: 34px; height: 34px; padding: 0; border: 0; border-radius: 9px; background: transparent; color: var(--secondary-text-color); flex: none; }
select, input[type=text] { font: inherit; font-size: 14px; padding: 9px 11px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; min-width: 0; }

.chip { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 500; padding: 3px 9px; border-radius: 999px; background: var(--hrs-soft); color: var(--secondary-text-color); white-space: nowrap; }
.chip .icon-wrap { --mdc-icon-size: 14px; }
.chip.ok { background: var(--hrs-ok-bg); color: var(--hrs-ok-text); }
.chip.warn { background: var(--hrs-warn-bg); color: var(--hrs-warn-text); }
.fchip { border-radius: 999px; padding: 7px 14px; font-size: 13px; }
.fchip span { opacity: .65; }
.fchip.on { background: var(--primary-text-color); border-color: var(--primary-text-color); color: var(--card-background-color); }
.fchip.on:hover:not(:disabled) { background: var(--primary-text-color); }

.status { padding: 10px 14px; border-radius: 12px; font-size: 13px; background: var(--hrs-soft); }
.status.ok { background: var(--hrs-ok-bg); }
.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }
.status.busy { opacity: .85; }
.alert { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 12px; background: var(--hrs-warn-bg); color: var(--hrs-warn-text); --mdc-icon-size: 18px; }
.alert-btn { padding: 6px 12px; font-size: 13px; background: var(--card-background-color); border-color: color-mix(in srgb, var(--hrs-warn) 45%, transparent); color: inherit; }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }
.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }
.empty-state p { max-width: 560px; line-height: 1.5; margin: 0; }

/* Cards and tiles */
.card, .tile { background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: var(--hrs-radius); box-shadow: var(--ha-card-box-shadow, none); padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.card.attn { border-color: color-mix(in srgb, var(--hrs-warn) 55%, var(--divider-color)); }
.card.idle { background: color-mix(in srgb, var(--card-background-color) 70%, var(--primary-background-color)); }
.card-head { display: flex; align-items: center; gap: 12px; }
.aicon, .ricon { width: 40px; height: 40px; border-radius: 12px; background: var(--hrs-soft); color: var(--primary-text-color); display: inline-flex; align-items: center; justify-content: center; flex: none; --mdc-icon-size: 22px; }
.aicon.big { width: 44px; height: 44px; border-radius: 14px; }
.open { gap: 2px; }
.tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr)); gap: 16px; align-items: start; }

/* Overview */
.stats { display: flex; align-items: center; flex-wrap: wrap; row-gap: 12px; }
.stat { display: flex; flex-direction: column; padding: 0 20px; border-left: 1px solid var(--divider-color); }
.stat:first-child { border-left: 0; padding-left: 2px; }
.stat b { font-size: 22px; font-weight: 500; }
.stat span { font-size: 12px; color: var(--secondary-text-color); }
.remote-line { display: flex; align-items: center; gap: 8px; --mdc-icon-size: 18px; color: var(--secondary-text-color); }
.remote-line strong { color: var(--primary-text-color); }
.tile-group { display: flex; flex-direction: column; gap: 8px; }
.gname { font-size: 12px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; color: var(--secondary-text-color); display: flex; gap: 8px; align-items: baseline; }
.gname span { text-transform: none; letter-spacing: 0; font-weight: 400; }
.empty-group { justify-content: flex-start; padding: 6px 0; font-weight: 400; }

/* Swatches: tap to recall */
.sws { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.sw { display: flex; flex-direction: column; align-items: stretch; gap: 6px; padding: 0; border: 0; background: none; text-align: left; min-width: 0; }
.sw:hover:not(:disabled) { background: none; }
.sw:hover:not(:disabled) .swc { transform: translateY(-1px); box-shadow: inset 0 0 0 1px rgba(0,0,0,.08), 0 4px 12px -4px rgba(0,0,0,.3); }
.swc { position: relative; height: 46px; border-radius: 12px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); transition: transform .15s, box-shadow .15s; display: flex; align-items: center; justify-content: center; font-weight: 500; color: var(--secondary-text-color); }
.swn { font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.more-sw .swc { background: var(--hrs-soft); }
.badge { position: absolute; left: 6px; top: 6px; font-size: 8px; line-height: 1; letter-spacing: 1px; padding: 3px 5px; border-radius: 999px; background: rgba(255,255,255,.92); color: #1d2433; }

/* An opened area */
.area-head { display: flex; flex-direction: column; gap: 8px; }
.crumbs { display: flex; align-items: center; gap: 4px; --mdc-icon-size: 16px; color: var(--secondary-text-color); }
.area-title { font-size: 26px; }
.split { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; }
.split-main { flex: 999 1 600px; min-width: 0; }
.split-side { flex: 1 1 300px; max-width: 420px; }
.cards4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.cards2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.scard { position: relative; display: flex; flex-direction: column; border-radius: 16px; border: 1px solid var(--divider-color); background: var(--card-background-color); overflow: visible; min-width: 0; }
.scard-sw { position: relative; height: 84px; border: 0; border-radius: 15px 15px 0 0; padding: 0; box-shadow: inset 0 -1px 0 rgba(0,0,0,.06); }
.scard-sw:hover:not(:disabled) { filter: brightness(1.04); }
.scard-sw .badge { left: 10px; top: 10px; font-size: 10px; letter-spacing: 1.5px; padding: 3px 7px; }
.play { position: absolute; right: 10px; bottom: 10px; width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,.92); color: #1d2433; display: inline-flex; align-items: center; justify-content: center; --mdc-icon-size: 18px; }
.scard-foot { display: flex; align-items: center; gap: 4px; padding: 6px 4px 6px 12px; min-height: 46px; }
.scard-foot input { flex: 1; padding: 6px 8px; }
.sname { flex: 1; min-width: 0; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.newcard { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 132px; border-radius: 16px; border: 1.5px dashed var(--divider-color); background: transparent; color: var(--primary-text-color); padding: 12px; font-weight: 400; }
.newcard.open { align-items: stretch; justify-content: flex-start; gap: 8px; }
.newcard .icon-wrap { --mdc-icon-size: 22px; }
.newcard-dots { letter-spacing: 2px; font-size: 11px; color: var(--secondary-text-color); align-self: center; }
.newcard .row-end button { padding: 6px 12px; }

/* ⋮ menus */
.menu-backdrop { position: fixed; inset: 0; z-index: 5; }
.menu { position: absolute; left: 0; top: calc(100% - 4px); z-index: 6; min-width: 100%; width: max-content; padding: 6px; border-radius: 14px; background: var(--card-background-color); border: 1px solid var(--divider-color); box-shadow: 0 12px 32px -8px rgba(0,0,0,.35); display: flex; flex-direction: column; }
.menu button { justify-content: flex-start; border: 0; background: transparent; font-weight: 400; padding: 9px 10px; border-radius: 9px; --mdc-icon-size: 18px; }
.menu-note { font-size: 12px; color: var(--secondary-text-color); padding: 6px 10px 4px; border-top: 1px solid var(--divider-color); margin-top: 4px; }

/* Remotes */
.ctl { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 12px; background: var(--hrs-soft); --mdc-icon-size: 16px; }
.foot { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; border-top: 1px solid var(--divider-color); padding-top: 12px; }
.foot > .grow { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 90px; }
.bind-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.progress-block { display: flex; flex-direction: column; gap: 8px; }
.prog { height: 6px; border-radius: 999px; background: var(--hrs-soft-2); overflow: hidden; }
.prog span { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #ffb020, #ff4f8b); }

/* Tap Dial set-up dialog */
.dialog-scrim { position: fixed; inset: 0; z-index: 10; background: rgba(15, 18, 26, .5); display: flex; align-items: flex-start; justify-content: center; padding: 6vh 16px; overflow-y: auto; }
.dialog { width: 100%; max-width: 860px; background: var(--card-background-color); color: var(--primary-text-color); border-radius: 24px; box-shadow: 0 30px 80px -20px rgba(0,0,0,.5); display: flex; flex-direction: column; overflow: hidden; }
.dialog-head { display: flex; align-items: center; gap: 14px; padding: 18px 18px 16px 24px; border-bottom: 1px solid var(--divider-color); }
.dialog-body { display: flex; flex-wrap: wrap; }
.stepper { list-style: none; margin: 0; padding: 16px 12px; flex: 1 1 220px; max-width: 260px; background: color-mix(in srgb, var(--primary-background-color) 70%, var(--card-background-color)); display: flex; flex-direction: column; gap: 2px; }
.step { width: 100%; display: flex; align-items: flex-start; gap: 12px; text-align: left; border: 0; background: transparent; padding: 10px 12px; border-radius: 12px; font-weight: 400; }
.step > span:last-child { display: flex; flex-direction: column; gap: 2px; }
.step.cur { background: var(--card-background-color); box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.num { width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; flex: none; border: 1.5px solid var(--divider-color); color: var(--secondary-text-color); --mdc-icon-size: 15px; }
.step.done .num { background: var(--hrs-ok); border-color: var(--hrs-ok); color: #fff; }
.step.cur .num { background: var(--primary-text-color); border-color: var(--primary-text-color); color: var(--card-background-color); }
.dialog-main { flex: 999 1 420px; min-width: 0; padding: 22px 26px; display: flex; flex-direction: column; gap: 16px; }
.step-body { display: flex; flex-direction: column; gap: 14px; }
.step-body p { margin: 0; line-height: 1.5; }
.dialog-foot { display: flex; align-items: center; gap: 10px; padding: 14px 24px; border-top: 1px solid var(--divider-color); }
.picks { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 8px; }
.pick { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 12px; border: 1px solid var(--divider-color); cursor: pointer; }
.pick.on { border-color: var(--primary-text-color); background: var(--hrs-soft); }
.pick input { width: 18px; height: 18px; margin: 0; accent-color: var(--primary-text-color); }
.bulb { width: 22px; height: 22px; border-radius: 50%; flex: none; background: radial-gradient(circle at 35% 35%, var(--hrs-soft), var(--hrs-soft-2)); box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); }
.bulb.lit { background: radial-gradient(circle at 35% 35%, #fff7e0, #ffc65c); }

@media (max-width: 600px) {
  main { padding: 14px 10px 28px; gap: 12px; }
  .card, .tile { padding: 14px; border-radius: 18px; }
  .tabs { padding: 0 4px; }
  .tabs button { padding: 12px 10px 10px; font-size: 13px; }
  .stat { padding: 0 12px; }
  .stat b { font-size: 18px; }
  .cards2 { grid-template-columns: 1fr 1fr; }
  .cards4 { grid-template-columns: 1fr 1fr; }
  .stepper { max-width: none; flex-direction: row; overflow-x: auto; }
  .step > span:last-child .small { display: none; }
  .dialog-scrim { padding: 0; }
  .dialog { border-radius: 0; min-height: 100%; }
}
`;
