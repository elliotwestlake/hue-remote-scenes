import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { CLUSTER_LABEL, errorText, type Binding, type Group, type Hass, type Remote, type Result } from "./types";

interface Props {
  getHass: () => Hass;
  groups: Group[];
}

export function Remotes({ getHass, groups }: Props) {
  const [remotes, setRemotes] = useState<Remote[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getHass()
      .callWS<{ remotes: Remote[] }>({ type: "zha_scenes/remotes" })
      .then((r) => setRemotes(r.remotes))
      .catch((e) => setError(errorText(e)));
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
        <RemoteCard key={r.ieee} getHass={getHass} remote={r} groups={groups} />
      ))}
    </div>
  );
}

function RemoteCard({ getHass, remote, groups }: { getHass: () => Hass; remote: Remote; groups: Group[] }) {
  const [endpoint, setEndpoint] = useState(remote.endpoints[0].id);
  const [groupId, setGroupId] = useState(groups[0].id);
  const [bindings, setBindings] = useState<Binding[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result>(null);

  const ep = remote.endpoints.find((e) => e.id === endpoint) ?? remote.endpoints[0];
  const groupName = (id: number) => groups.find((g) => g.id === id)?.name ?? `Group ${id}`;

  const readBindings = async () => {
    const r = await getHass().callWS<{ bindings: Binding[] }>({ type: "zha_scenes/bindings", ieee: remote.ieee });
    setBindings(r.bindings);
  };

  const act = async (fn: () => Promise<string | void>) => {
    setBusy(true);
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

  const bind = (unbind: boolean) =>
    act(async () => {
      const r = await getHass().callWS<{ results: Record<string, string> }>({
        type: "zha_scenes/bind",
        ieee: remote.ieee,
        endpoint: ep.id,
        group_id: groupId,
        clusters: ep.clusters,
        unbind,
      });
      const failed = Object.entries(r.results).filter(([, v]) => v !== "ok");
      const verb = unbind ? "Unbound from" : "Bound to";
      if (failed.length === Object.keys(r.results).length)
        return `The remote didn't answer. Press a button on it and try again.`;
      if (failed.length)
        return `${verb} ${groupName(groupId)}, but these didn't take: ${failed.map(([c, v]) => `${CLUSTER_LABEL[+c] ?? c} (${v})`).join(", ")}`;
      try {
        await readBindings();
      } catch {
        /* the remote went back to sleep; the bind still worked */
      }
      return `${verb} ${groupName(groupId)}`;
    });

  // Bound groups, with the clusters bound to each.
  const bound = new Map<number, number[]>();
  for (const b of bindings ?? []) bound.set(b.group_id, [...(bound.get(b.group_id) ?? []), b.cluster]);

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
              {[remote.manufacturer, remote.model].filter(Boolean).join(" ")}
              {remote.battery && " · battery"}
            </div>
          </div>
        </div>
        <button className="ghost" disabled={busy} onClick={() => act(async () => { await readBindings(); })}>
          <Icon name="link-variant" /> Check bindings
        </button>
      </div>

      {bindings && (
        <div className="chips">
          {bound.size ? (
            [...bound].map(([gid, clusters]) => (
              <span key={gid} className="chip on" title={clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")}>
                <Icon name="link-variant" /> {groupName(gid)}
              </span>
            ))
          ) : (
            <span className="muted">Not bound to any group.</span>
          )}
        </div>
      )}

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
        <select value={groupId} onChange={(e) => setGroupId(+e.target.value)} aria-label="Group">
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <button className="primary" disabled={busy} onClick={() => bind(false)}>
          <Icon name="link-variant-plus" /> Bind
        </button>
        <button disabled={busy} onClick={() => bind(true)}>
          <Icon name="link-variant-off" /> Unbind
        </button>
      </div>
      <div className="muted small">Sends: {ep.clusters.map((c) => CLUSTER_LABEL[c] ?? c).join(", ")}</div>

      {busy && <div className="status busy">Waiting for the remote…</div>}
      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}
