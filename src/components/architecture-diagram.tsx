import type { Architecture } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

/**
 * Diagrama en HTML, no en imagen: se lee con lector de pantalla, reflowea
 * en mobile y no hay que reexportar un PNG cuando cambia una pieza.
 *
 * Las capas van de arriba (internet) hacia abajo (datos), que es la
 * dirección en que viaja una petición.
 */
export function ArchitectureDiagram({
  architecture,
  lang,
}: {
  architecture: Architecture;
  lang: Locale;
}) {
  return (
    <div>
      <p className="mb-6 max-w-prose leading-relaxed text-ink-2">
        {architecture.summary[lang]}
      </p>

      <ol className="grid gap-0">
        {architecture.tiers.map((tier, index) => (
          <li key={tier.id}>
            <div className="rounded-lg border border-line bg-surface/50 p-4 sm:p-5">
              <p className="label mb-3">{tier.label[lang]}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {tier.nodes.map((node) => (
                  <div
                    key={node.name}
                    className="rounded border border-line-strong bg-bg/60 px-3 py-2.5"
                  >
                    <p className="font-mono text-sm text-accent">{node.name}</p>
                    {node.note && (
                      <p className="mt-1 text-xs leading-relaxed text-ink-3">
                        {node.note[lang]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Conector: la petición baja de una capa a la siguiente. */}
            {index < architecture.tiers.length - 1 && (
              <div className="flex justify-center py-2" aria-hidden>
                <svg
                  viewBox="0 0 12 24"
                  className="h-6 w-3 text-line-strong"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 0v18M2 14l4 4 4-4" />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>

      {architecture.notes && (
        <ul className="mt-7 grid gap-3 border-l-2 border-accent/40 pl-5">
          {architecture.notes[lang].map((note) => (
            <li key={note} className="max-w-prose text-sm leading-relaxed text-ink-2">
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
