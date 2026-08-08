"use client";

import { useEffect, useState } from "react";
import type { SiteStatus } from "@/app/api/status/route";
import type { Dictionary } from "@/content/dictionaries";
import { liveSites } from "@/content/site";

type State = "loading" | "done" | "failed";

/**
 * El elemento más expuesto del sitio: muestra en vivo si mis dominios responden.
 * Si algo se cae, acá se ve en rojo — que es exactamente el punto. Un semáforo
 * que no puede ponerse en rojo no significa nada.
 *
 * Reserva su altura desde el primer render para no provocar saltos de layout.
 */
export function LiveStatus({ dict }: { dict: Dictionary }) {
  const [state, setState] = useState<State>("loading");
  const [sites, setSites] = useState<SiteStatus[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/status")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data: { sites: SiteStatus[] }) => {
        if (cancelled) return;
        setSites(data.sites);
        setState("done");
      })
      .catch(() => {
        if (!cancelled) setState("failed");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="rounded-lg border border-line bg-surface/60 p-4 sm:p-5"
      aria-live="polite"
    >
      <p className="label mb-3">{dict.hero.statusTitle}</p>

      <ul className="grid gap-2.5 sm:grid-cols-2">
        {liveSites.map((site) => {
          const result = sites.find((s) => s.host === site.host);
          return (
            <li
              key={site.host}
              className="flex items-center gap-2.5 font-mono text-sm"
            >
              <Dot state={state} ok={result?.ok} />
              <span className="text-ink">{site.host}</span>
              <span className="ml-auto tabular-nums text-ink-3">
                {state === "loading" && dict.hero.statusChecking}
                {state === "failed" && "—"}
                {state === "done" &&
                  (result?.ok ? result.status : dict.hero.statusUnreachable)}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-2xs text-ink-3">{dict.hero.statusHint}</p>
    </div>
  );
}

function Dot({ state, ok }: { state: State; ok?: boolean }) {
  if (state === "loading") {
    return (
      <span
        className="size-2 shrink-0 rounded-full bg-ink-3 motion-safe:animate-pulse"
        aria-hidden
      />
    );
  }
  const good = state === "done" && ok;
  return (
    <span className="relative flex size-2 shrink-0" aria-hidden>
      {good && (
        <span className="absolute inline-flex size-full rounded-full bg-ok opacity-60 motion-safe:animate-ping" />
      )}
      <span
        className={`relative inline-flex size-2 rounded-full ${
          good ? "bg-ok" : "bg-crit"
        }`}
      />
    </span>
  );
}
