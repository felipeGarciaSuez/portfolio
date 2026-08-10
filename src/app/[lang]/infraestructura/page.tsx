import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ArrowRightIcon } from "@/components/icons";
import { getDictionary } from "@/content/dictionaries";
import {
  decisions,
  infraIntro,
  limitations,
  pillars,
  serverSpec,
  topology,
} from "@/content/infra";
import { ogImageUrl, site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/infraestructura">) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const pageTitle = lang === "es" ? "Infraestructura" : "Infrastructure";
  const description =
    lang === "es"
      ? "Cómo está armado el servidor donde corren mis aplicaciones: arquitectura, decisiones de seguridad y respaldos, con su porqué."
      : "How the server running my applications is put together: architecture, security and backup decisions, and the reasoning behind them.";
  const title = `${pageTitle} — ${site.name}`;
  const image = ogImageUrl(site.name, pageTitle);

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `/${lang}/infraestructura`,
      languages: {
        es: "/es/infraestructura",
        en: "/en/infraestructura",
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${site.url}/${lang}/infraestructura`,
      images: [{ url: image, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function InfraPage({
  params,
}: PageProps<"/[lang]/infraestructura">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <article className="mx-auto max-w-4xl px-5 pb-(--spacing-section) pt-28 sm:px-8">
      <Link
        href={`/${locale}#infraestructura`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-3 transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span>
        {locale === "es" ? "Volver al inicio" : "Back to home"}
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          {dict.infra.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
          {infraIntro[locale]}
        </p>
        <p className="mt-6 inline-block rounded border border-line bg-surface/50 px-3 py-2 font-mono text-xs text-ink-3">
          {serverSpec[locale]}
        </p>
      </header>

      {/* ---------- topología ---------- */}
      <Section title={dict.infra.topologyTitle}>
        <ArchitectureDiagram architecture={topology} lang={locale} />
      </Section>

      {/* ---------- pilares ---------- */}
      <Section title={dict.infra.pillarsTitle}>
        <div className="grid gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-lg border border-line bg-surface/40 p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {pillar.title[locale]}
              </h3>
              <p className="mt-2 max-w-prose leading-relaxed text-ink-2">
                {pillar.summary[locale]}
              </p>
              <ul className="mt-4 grid gap-2.5 border-l border-line pl-4">
                {pillar.points[locale].map((point) => (
                  <li
                    key={point}
                    className="max-w-prose text-sm leading-relaxed text-ink-3"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- decisiones ---------- */}
      <Section title={dict.infra.decisionsTitle}>
        <ul className="grid gap-4">
          {decisions.map((decision) => (
            <li
              key={decision.id}
              className="rounded-lg border border-line bg-surface/40 p-5"
            >
              <h3 className="font-medium text-ink">{decision.title[locale]}</h3>
              <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-3">
                  {dict.infra.decisionInstead}
                </span>
                <span className="text-ink-3 line-through decoration-ink-3/40">
                  {decision.instead[locale]}
                </span>
              </p>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-2">
                {decision.why[locale]}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- limitaciones conocidas ---------- */}
      <Section title={dict.infra.limitationsTitle}>
        <p className="mb-5 max-w-prose text-ink-2">
          {dict.infra.limitationsLede}
        </p>
        <ul className="grid gap-4">
          {limitations.map((limitation) => (
            <li
              key={limitation.id}
              className="rounded-lg border border-line border-l-2 border-l-warn bg-surface/40 p-5"
            >
              <h3 className="font-medium text-ink">
                {limitation.title[locale]}
              </h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-2">
                {limitation.body[locale]}
              </p>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-3">
                <span className="font-mono text-xs uppercase tracking-widest text-warn">
                  {dict.infra.revisitLabel}
                </span>{" "}
                {limitation.revisitWhen[locale]}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <nav className="mt-16 border-t border-line pt-8">
        <Link
          href={`/${locale}#proyectos`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          {dict.projects.title}
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
