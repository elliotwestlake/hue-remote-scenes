import { useState } from "react";
import { errorText, type Result } from "./types";

/**
 * One action at a time per card: `busy` holds the waiting text while it runs, and the
 * text it returns (or its error) becomes `result`. Text containing "didn't" shows as an error.
 */
export function useAction() {
  const [busy, setBusy] = useState<string | false>(false);
  const [result, setResult] = useState<Result>(null);

  const act = async (fn: () => Promise<string | void>, waiting = "Talking to the lights…") => {
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

  return { busy, result, act, clear: () => setResult(null) };
}
