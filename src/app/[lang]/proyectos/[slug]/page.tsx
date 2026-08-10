import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ArrowRightIcon, ExternalIcon } from "@/components/icons";
import { StatusPill } from "@/components/status-pill";
import { VideoLoop } from "@/components/video-loop";
import { getDictionary } from "@/content/dictionaries";
import { projectMedia } from "@/content/media";
import { getProject, projects } from "@/content/projects";
import { ogImageUrl, site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";

/** Las 8 combinaciones (2 idiomas x 4 proyectos) se generan en el build. */
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((project) => ({ lang, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/proyectos/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.tagline[lang]}`;
  const description = project.problem[lang].slice(0, 200);
  const image = ogImageUrl(project.name, project.tagline[lang]);

  return {
    title: project.name,
    description: project.tagline[lang],
    alternates: {
      canonical: `/${lang}/proyectos/${slug}`,
      languages: {
        es: `/es/proyectos/${slug}`,
        en: `/en/proyectos/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${site.url}/${lang}/proyectos/${slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[lang]/proyectos/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const media = projectMedia[project.slug];

  return (
    <article className="mx-auto max-w-4xl px-5 pb-(--spacing-section) pt-28 sm:px-8">
      <Link
        href={`/${locale}#proyectos`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-3 transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span>
        {dict.projects.backToProjects}
      </Link>

      {/* ---------- encabezado ---------- */}
      <header className="mt-8 border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={project.status} dict={dict} />
          {project.domain && (
            <a
              href={`https://${project.domain}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:underline"
            >
              {project.domain}
              <ExternalIcon className="size-3" />
            </a>
          )}
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-2 sm:text-xl">
          {project.tagline[locale]}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-line px-2 py-0.5 font-mono text-2xs text-ink-3"
            >
              {tech}
            </li>
          ))}
        </ul>

        {project.links.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {link.label[locale]}
                <ExternalIcon className="size-3" />
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ---------- media ---------- */}
      {media && (
        <figure className="mt-12">
          {media.kind === "image" ? (
            <div className="mx-auto w-52 overflow-hidden rounded-[1.6rem] border border-line-strong shadow-2xl shadow-black/50 sm:w-64">
              <Image
                src={media.poster}
                alt={media.alt[locale]}
                sizes="(min-width: 640px) 16rem, 13rem"
                placeholder="blur"
                className="h-auto w-full"
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-line-strong shadow-2xl shadow-black/40">
              <VideoLoop
                src={media.src}
                poster={media.poster}
                className="h-auto w-full"
              />
            </div>
          )}
          <figcaption className="mt-3 text-center text-xs text-ink-3">
            {media.alt[locale]}
          </figcaption>
        </figure>
      )}

      {/* ---------- el problema ---------- */}
      <Section title={dict.projects.problemLabel}>
        <p className="max-w-prose text-lg leading-relaxed text-ink-2">
          {project.problem[locale]}
        </p>
      </Section>

      <Section title={dict.projects.whatLabel}>
        <p className="max-w-prose text-lg leading-relaxed text-ink-2">
          {project.what[locale]}
        </p>
      </Section>

      {/* ---------- arquitectura ---------- */}
      {project.architecture && (
        <Section title={dict.projects.architectureLabel}>
          <ArchitectureDiagram
            architecture={project.architecture}
            lang={locale}
          />
        </Section>
      )}

      {/* ---------- el desafío ---------- */}
      <Section title={dict.projects.challengeLabel}>
        <h3 className="mb-3 text-xl font-semibold tracking-tight">
          {project.challenge.title[locale]}
        </h3>
        <p className="max-w-prose leading-relaxed text-ink-2">
          {project.challenge.body[locale]}
        </p>
      </Section>

      {/* ---------- decisiones ---------- */}
      {project.decisions.length > 0 && (
        <Section title={dict.projects.decisionsLabel}>
          <ul className="grid gap-4">
            {project.decisions.map((decision) => (
              <li
                key={decision.choice.es}
                className="rounded-lg border border-line bg-surface/40 p-5"
              >
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-medium text-ink">
                    {decision.choice[locale]}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-3">
                    {dict.projects.decisionInstead}
                  </span>
                  <span className="text-ink-3 line-through decoration-ink-3/40">
                    {decision.instead[locale]}
                  </span>
                </p>
                <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">
                    {dict.projects.decisionBecause}
                  </span>{" "}
                  {decision.because[locale]}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ---------- por qué se dio de baja ---------- */}
      {project.discontinuedReason && (
        <Section title={dict.projects.discontinuedLabel}>
          <div className="rounded-lg border-l-2 border-warn border-y border-r border-y-line border-r-line bg-surface/40 p-5">
            <h3 className="mb-3 text-xl font-semibold tracking-tight">
              {project.discontinuedReason.title[locale]}
            </h3>
            <p className="max-w-prose leading-relaxed text-ink-2">
              {project.discontinuedReason.body[locale]}
            </p>
          </div>
        </Section>
      )}

      {/* ---------- aprendizajes ---------- */}
      <Section title={dict.projects.learnedLabel}>
        <p className="max-w-prose text-lg leading-relaxed text-ink-2">
          {project.learned[locale]}
        </p>
      </Section>

      <Section title={dict.projects.nextLabel}>
        <p className="max-w-prose leading-relaxed text-ink-2">
          {project.next[locale]}
        </p>
      </Section>

      {/* ---------- resumen ---------- */}
      <Section title={dict.projects.highlightsLabel}>
        <ul className="grid gap-2">
          {project.highlights[locale].map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-ink-2"
            >
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
              {highlight}
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- navegación al siguiente ---------- */}
      <nav className="mt-16 border-t border-line pt-8">
        <Link
          href={`/${locale}#proyectos`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          {dict.projects.backToProjects}
          <ArrowRightIcon />
        </Link>
      </nav>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="label mb-4 border-b border-line pb-2">{title}</h2>
      {children}
    </section>
  );
}
