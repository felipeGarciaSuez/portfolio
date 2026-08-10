import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { projectMedia } from "@/content/media";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { ArrowRightIcon, ExternalIcon } from "./icons";
import { StatusPill } from "./status-pill";
import { VideoLoop } from "./video-loop";

/**
 * Que un proyecto esté en producción se nota en la estructura, no solo en
 * una etiqueta: la card de producción ocupa el ancho completo y muestra el
 * dominio real; la de desarrollo va en grilla y es más contenida.
 */
export function ProductionCard({
  project,
  lang,
  dict,
}: {
  project: Project;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-line bg-surface/50 transition-colors hover:border-line-strong">
      <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
        <div className="order-2 p-6 sm:p-8 lg:order-1">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status="production" dict={dict} />
            {project.domain && (
              <a
                href={`https://${project.domain}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
              >
                {project.domain}
                <ExternalIcon className="size-3" />
              </a>
            )}
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="mt-1.5 text-ink-2">{project.tagline[lang]}</p>

          <div className="mt-6">
            <p className="label mb-2">{dict.projects.problemLabel}</p>
            <p className="max-w-prose text-sm leading-relaxed text-ink-2">
              {project.problem[lang]}
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((tech) => (
              <li
                key={tech}
                className="rounded border border-line px-2 py-0.5 font-mono text-2xs text-ink-3"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={`/${lang}/proyectos/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              {dict.projects.viewCase}
              <ArrowRightIcon />
            </Link>
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-accent"
              >
                {link.label[lang]}
                <ExternalIcon className="size-3" />
              </a>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <MediaSlot project={project} lang={lang} />
        </div>
      </div>
    </article>
  );
}

export function DevelopmentCard({
  project,
  lang,
  dict,
}: {
  project: Project;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-surface/30 p-6 transition-colors hover:border-line-strong">
      <StatusPill status={project.status} dict={dict} />
      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        {project.name}
      </h3>
      <p className="mt-1.5 text-sm text-ink-2">{project.tagline[lang]}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <li
            key={tech}
            className="rounded border border-line px-2 py-0.5 font-mono text-2xs text-ink-3"
          >
            {tech}
          </li>
        ))}
      </ul>
      <Link
        href={`/${lang}/proyectos/${project.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
      >
        {dict.projects.viewCase}
        <ArrowRightIcon />
      </Link>
    </article>
  );
}

/**
 * Captura del proyecto. Si todavía no existe, muestra un marcador honesto
 * en vez de una imagen rota o un mockup inventado.
 */
function MediaSlot({ project, lang }: { project: Project; lang: Locale }) {
  const media = projectMedia[project.slug];
  const isPhone = (media?.frame ?? project.media?.frame) === "phone";

  return (
    <div className="flex h-full min-h-56 items-center justify-center border-b border-line bg-bg/60 p-6 lg:border-b-0 lg:border-l">
      {media?.kind === "image" ? (
        <div
          className={
            isPhone
              ? "w-40 overflow-hidden rounded-[1.4rem] border border-line-strong shadow-2xl shadow-black/50 sm:w-48"
              : "w-full max-w-sm overflow-hidden rounded-lg border border-line-strong"
          }
        >
          <Image
            src={media.poster}
            alt={media.alt[lang]}
            sizes="(min-width: 640px) 12rem, 10rem"
            placeholder="blur"
            className="h-auto w-full"
          />
        </div>
      ) : media?.kind === "video" ? (
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-line-strong shadow-xl shadow-black/40">
          <VideoLoop
            src={media.src}
            poster={media.poster}
            className="h-auto w-full"
          />
          <span className="sr-only">{media.alt[lang]}</span>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center rounded-lg border border-dashed border-line-strong ${
            isPhone ? "aspect-[9/16] w-32" : "aspect-video w-full max-w-sm"
          }`}
        >
          <span className="label text-center text-2xs">
            {isPhone ? "mobile" : "desktop"}
          </span>
        </div>
      )}
    </div>
  );
}
