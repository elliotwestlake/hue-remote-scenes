import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { CLUSTER_LABEL, dots, errorText, hex, type Binding, type Group, type Hass, type Light, type Remote, type Result } from "./types";

interface Props {
  getHass: () => Hass;
  groups: Group[];
}

export function Remotes({ getHass, groups }: Props) {
  const [remotes, setRemotes] = useState<Remote[] | null>(null);
  const [error, setError] = useState("");

  const reload = () =>
    getHass()
      .callWS<{ remotes: Remote[] }>({ type: "hue_remote_scenes/remotes" })
      .then((r) => setRemotes(r.remotes))
      .catch((e) => setError(errorText(e)));

  useEffect(() => {
    reload();
  }, [getHass]);

  if (error) return <div className="status error">{error}</div>;
  if (!remotes) return null;
  if (!remotes.length)
    return (
      <div className="empty-state">
        <Icon name="remote-off" />
        <p>No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first.</p>
      </div>
    );

  return (
    <div className="stack">
      <p className="muted intro">
        Binding a remote to a group makes it control the lights directly over Zigbee, without Home Assistant. Battery
        remotes are asleep most of the time: <strong>press a button on the remote just before</strong> each step.
      </p>
      {remotes.map((r) => (
        <RemoteCard key={r.ieee} getHass={getHass} remote={r} groups={groups} onChanged={reload} />
      ))}
    </div>
  );
}

interface CardProps {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  onChanged: () => void;
}

function RemoteCard({ getHass, remote, groups, onChanged }: CardProps) {
  const [endpoint, setEndpoint] = useState(remote.endpoints[0].id);
  const [groupId, setGroupId] = useState(groups[0]?.id ?? 0);
  // Start from what we remember; reading the table (remote awake) replaces it.
  const [bindings, setBindings] = useState<Binding[]>(() =>
    remote.bound.flatMap((b) => b.clusters.map((cluster) => ({ endpoint: 0, cluster, group_id: b.group_id }))),
  );
  const [checked, setChecked] = useState<string | null>(remote.checked);
  const [busy, setBusy] = useState<string | false>(false);
  const [result, setResult] = useState<Result>(null);

  const ep = remote.endpoints.find((e) => e.id === endpoint) ?? remote.endpoints[0];
  const groupName = (id: number) => groups.find((g) => g.id === id)?.name ?? `Group ${id}`;

  const readBindings = async () => {
    const r = await getHass().callWS<{ bindings: Binding[] }>({ type: "hue_remote_scenes/bindings", ieee: remote.ieee });
    setBindings(r.bindings);
    setChecked(new Date().toISOString());
  };

  const act = async (fn: () => Promise<string | void>, waiting = "Waiting for the remote…") => {
    setBusy(waiting);
    setResult(null);
    try {
      const text = await fn();
      if (text) setResult({ kind: text.includes("didn't") ? "error" : "ok", text });
    } catch (e) {
      setResult({ kind: "error", text: errorText(e) });
    } finally {
      setBusy(false);
    }
  };

  const bind = (unbind: boolean, gid = groupId) =>
    act(async () => {
      const r = await getHass().callWS<{ results: Record<string, string> }>({
        type: "hue_remote_scenes/bind",
        ieee: remote.ieee,
        endpoint: ep.id,
        group_id: gid,
        clusters: ep.clusters,
        unbind,
      });
      const failed = Object.entries(r.results).filter(([, v]) => v !== "ok");
      const verb = unbind ? "Unbound from" : "Bound to";
      if (failed.length === Object.keys(r.results).length)
        return `The remote didn't answer. Press a button on it and try again.`;
      if (failed.length)
        return `${verb} ${groupName(gid)}, but these didn't take: ${failed.map(([c, v]) => `${CLUSTER_LABEL[+c] ?? c} (${v})`).join(", ")}`;
      try {
        await readBindings();
      } catch {
        // The remote went back to sleep; the bind still worked, so update what we show.
        const done = Object.entries(r.results).filter(([, v]) => v === "ok").map(([c]) => +c);
        setBindings((prev) =>
          unbind
            ? prev.filter((b) => !(b.group_id === gid && done.includes(b.cluster)))
            : [...prev, ...done.map((cluster) => ({ endpoint: ep.id, cluster, group_id: gid }))],
        );
      }
      return `${verb} ${groupName(gid)}`;
    });

  // Bound groups, with the clusters bound to each.
  const bound = new Map<number, number[]>();
  for (const b of bindings) bound.set(b.group_id, [...(bound.get(b.group_id) ?? []), b.cluster]);

  return (
    <section className="card">
      <div className="card-head">
        <div className="title">
          <span className="icon-wrap title-icon">
            <ha-icon icon="mdi:remote" />
          </span>
          <div>
            <h2>{remote.name}</h2>
            <div className="muted small">
              {[remote.area, [remote.manufacturer, remote.model].filter(Boolean).join(" ")].filter(Boolean).join(" · ")}
              {remote.battery && " · battery"}
            </div>
          </div>
        </div>
        <button className="ghost" disabled={!!busy} onClick={() => act(async () => { await readBindings(); })}>
          <Icon name="link-variant" /> Check bindings
        </button>
      </div>

      <div className="chips">
        {bound.size ? (
          [...bound].map(([gid, clusters]) => (
            <span key={gid} className="chip on" title={clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")}>
              <Icon name="link-variant" /> {groupName(gid)}
            </span>
          ))
        ) : (
          <span className="muted small">No group bindings known.</span>
        )}
        <span className="muted small">
          {checked ? `Checked ${new Date(checked).toLocaleString()}` : "Not checked on the remote yet"}
        </span>
      </div>

      <div className="inline-row">
        {remote.endpoints.length > 1 && (
          <select value={ep.id} onChange={(e) => setEndpoint(+e.target.value)} aria-label="Button set">
            {remote.endpoints.map((e) => (
              <option key={e.id} value={e.id}>
                Endpoint {e.id}
              </option>
            ))}
          </select>
        )}
        <select value={groupId} disabled={!groups.length} onChange={(e) => setGroupId(+e.target.value)} aria-label="Group">
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <button className="primary" disabled={!!busy || !groups.length} onClick={() => bind(false)}>
          <Icon name="link-variant-plus" /> Bind
        </button>
        <button disabled={!!busy || !groups.length} onClick={() => bind(true)}>
          <Icon name="link-variant-off" /> Unbind
        </button>
      </div>
      <div className="muted small">Sends: {ep.clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")}</div>

      {(remote.dial_supported || remote.dial) && (
        <DialSetup
          getHass={getHass}
          remote={remote}
          groups={groups}
          busy={!!busy}
          bound={remote.dial ? bound.has(remote.dial.group_id) : false}
          act={act}
          onBind={(gid) => bind(false, gid)}
          onChanged={onChanged}
        />
      )}

      {remote.cycle_trigger && (
        <CycleSetup getHass={getHass} remote={remote} groups={groups} busy={!!busy} act={act} onChanged={onChanged} />
      )}

      {busy && <div className="status busy">{busy}</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}

interface CycleProps {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  busy: boolean;
  act: (fn: () => Promise<string | void>, waiting?: string) => Promise<void>;
  onChanged: () => void;
}

/**
 * Remotes that can't recall scenes themselves (gen 1 Hue dimmer, Hue smart button):
 * Home Assistant recalls the next scene in a list when the trigger press arrives.
 */
function CycleSetup({ getHass, remote, groups, busy, act, onChanged }: CycleProps) {
  const cycle = remote.cycle;
  const [groupId, setGroupId] = useState(cycle?.group_id ?? groups.find((g) => g.scenes.length)?.id ?? groups[0]?.id ?? 0);
  const [picked, setPicked] = useState<number[]>(cycle?.scene_ids ?? []);
  const group = groups.find((g) => g.id === groupId);

  const toggle = (id: number) => setPicked((p) => (p.includes(id) ? p.filter((s) => s !== id) : [...p, id]));
  const save = (stop: boolean) =>
    act(async () => {
      await getHass().callWS(
        stop
          ? { type: "hue_remote_scenes/set_cycle", ieee: remote.ieee }
          : { type: "hue_remote_scenes/set_cycle", ieee: remote.ieee, group_id: groupId, scene_ids: picked },
      );
      onChanged();
      return stop ? "Stopped cycling scenes." : `${remote.cycle_trigger!.label} now cycles ${picked.length} scene${picked.length === 1 ? "" : "s"}.`;
    }, "Saving…");

  return (
    <div className="dial-setup">
      <h3>Scene cycle (needs Home Assistant)</h3>
      <p className="muted small">
        This remote can't recall scenes by itself. Keep it bound to the group for on/off and dimming (that works without
        Home Assistant); while Home Assistant is running, <strong>{remote.cycle_trigger!.label.toLowerCase()}</strong> recalls
        the next scene below, in order. After a pause it starts from the first again.
      </p>
      <div className="inline-row">
        <select
          value={groupId}
          disabled={!groups.length}
          onChange={(e) => {
            setGroupId(+e.target.value);
            setPicked([]);
          }}
          aria-label="Group to cycle"
        >
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <div className="light-picks">
        {(group?.scenes ?? []).map((s) => (
          <label key={s.id} className="pick">
            <input type="checkbox" checked={picked.includes(s.id)} onChange={() => toggle(s.id)} /> {s.name}
            {picked.includes(s.id) && <span className="muted small"> #{picked.indexOf(s.id) + 1}</span>}
          </label>
        ))}
        {group && !group.scenes.length && <span className="muted small">Save some scenes in this group first.</span>}
      </div>
      <div className="inline-row">
        <button className="primary" disabled={busy || !picked.length} onClick={() => save(false)}>
          <Icon name="check" /> Save cycle
        </button>
        {cycle && (
          <button disabled={busy} onClick={() => save(true)}>
            <Icon name="close" /> Stop
          </button>
        )}
      </div>
    </div>
  );
}

interface DialProps {
  getHass: () => Hass;
  remote: Remote;
  groups: Group[];
  busy: boolean;
  bound: boolean;
  act: (fn: () => Promise<string | void>, waiting?: string) => Promise<void>;
  onBind: (groupId: number) => void;
  onChanged: () => void;
}

/**
 * Hue Tap Dial: its buttons recall scenes 1, 0, 5 and 4 on its own built-in group,
 * straight from the lights. Find that group, create it in ZHA with the lights, bind.
 */
function DialSetup({ getHass, remote, groups, busy, bound, act, onBind, onChanged }: DialProps) {
  const dial = remote.dial;
  const group = dial ? groups.find((g) => g.id === dial.group_id) : undefined;
  const [lights, setLights] = useState<Light[] | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [name, setName] = useState(remote.name);

  useEffect(() => {
    if (dial && !group && !lights)
      getHass()
        .callWS<{ lights: Light[] }>({ type: "hue_remote_scenes/lights" })
        .then((r) => setLights(r.lights))
        .catch(() => setLights([]));
  }, [dial, group, lights, getHass]);

  const find = () =>
    act(async () => {
      const r = await getHass().callWS<{ group_id: number; exists: boolean }>({
        type: "hue_remote_scenes/find_dial_group",
        ieee: remote.ieee,
      });
      onChanged();
      return `Its scene buttons use group ${hex(r.group_id)}${r.exists ? ", which ZHA already has" : ""}.`;
    }, "Press a scene button now (the Hue button on a dimmer), then again every few seconds until this finishes…");

  const create = () =>
    act(async () => {
      await getHass().callWS({ type: "hue_remote_scenes/create_group", group_id: dial!.group_id, name, members: [...picked] });
      return `Created ${name}. Now bind the dial to it.`;
    }, "Adding the lights to the group…");

  const toggle = (key: string) =>
    setPicked((p) => {
      const next = new Set(p);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <div className="dial-setup">
      <h3>Scene buttons</h3>
      {!dial ? (
        <>
          <p className="muted small">
            This remote's scene buttons (a dimmer's Hue button) can recall scenes stored in the lights directly, even
            when Home Assistant is down. First, find the group it uses (it's fixed in each remote).
          </p>
          <div className="inline-row">
            <button className="primary" disabled={busy} onClick={find}>
              <Icon name="magnify" /> Find its group
            </button>
          </div>
        </>
      ) : (
        <>
          <ol className="steps">
            <li className="done">
              Its buttons use group <code>{hex(dial.group_id)}</code>{" "}
              <button className="ghost small-btn" disabled={busy} onClick={find}>Find again</button>
            </li>
            <li className={group ? "done" : ""}>
              {group ? (
                <>Group <strong>{group.name}</strong> has {group.members.length} light{group.members.length === 1 ? "" : "s"}.</>
              ) : (
                <>
                  Create the group with the lights this dial should control:
                  <div className="light-picks">
                    {(lights ?? []).map((l) => (
                      <label key={l.key} className="pick">
                        <input type="checkbox" checked={picked.has(l.key)} onChange={() => toggle(l.key)} /> {l.name}
                      </label>
                    ))}
                    {lights && !lights.length && <span className="muted small">No lights that can store scenes found.</span>}
                  </div>
                  <div className="inline-row">
                    <input type="text" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} aria-label="Group name" />
                    <button className="primary" disabled={busy || !picked.size || !name.trim()} onClick={create}>
                      <Icon name="plus" /> Create group
                    </button>
                  </div>
                </>
              )}
            </li>
            <li className={bound ? "done" : ""}>
              {bound ? (
                <>Bound to {group?.name ?? hex(dial.group_id)}.</>
              ) : (
                <>
                  Bind the dial to it (press a dial button first):{" "}
                  <button disabled={busy || !group} onClick={() => onBind(dial.group_id)}>
                    <Icon name="link-variant-plus" /> Bind
                  </button>
                </>
              )}
            </li>
            <li>
              Save a scene for each button ({dial.buttons.map(([label]) => (/^\d/.test(label) ? dots(label) : label)).join(", ")}) on the{" "}
              <strong>Scenes</strong> tab, in {group ? <strong>{group.name}</strong> : "the group"}.
            </li>
          </ol>
        </>
      )}
    </div>
  );
}
