import type { Dictionary } from "@/content/dictionaries";
import type { ProjectStatus } from "@/content/projects";

/**
 * El verde solo aparece en "en producción": es el mismo verde del semáforo
 * del hero y significa lo mismo, que hay algo corriendo de verdad.
 * Discontinuado va en ámbar, que señala sin alarmar.
 */
export function StatusPill({
  status,
  dict,
}: {
  status: ProjectStatus;
  dict: Dictionary;
}) {
  const styles: Record<ProjectStatus, string> = {
    production: "border-ok/40 bg-ok/10 text-ok",
    development: "border-line text-ink-3",
    discontinued: "border-warn/40 bg-warn/10 text-warn",
  };

  const labels: Record<ProjectStatus, string> = {
    production: dict.projects.statusProduction,
    development: dict.projects.statusDevelopment,
    discontinued: dict.projects.statusDiscontinued,
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-2xs uppercase tracking-widest ${styles[status]}`}
    >
      {status === "production" && (
        <span className="size-1.5 rounded-full bg-ok" aria-hidden />
      )}
      {labels[status]}
    </span>
  );
}
