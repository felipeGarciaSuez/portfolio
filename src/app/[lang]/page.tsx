import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { DevelopmentCard, ProductionCard } from "@/components/project-card";
import { getDictionary } from "@/content/dictionaries";
import { otherProjects, productionProjects } from "@/content/projects";
import { site } from "@/content/site";
import { roles, education, yearsOfExperience } from "@/content/experience";
import { stack, languages } from "@/content/stack";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero lang={locale} dict={dict} />

      {/* ---------------- Sobre mí ---------------- */}
      <Section id="sobre-mi" title={dict.about.title}>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4 text-lg leading-relaxed text-ink-2">
            <p>
              {locale === "es"
                ? "Trabajo en Python hace más de cuatro años, casi siempre del lado del backend: modelos de datos, PostgreSQL, integraciones y sistemas contables que no pueden fallar."
                : "I've worked in Python for over four years, mostly on the backend: data models, PostgreSQL, integrations and accounting systems that can't afford to fail."}
            </p>
            <p>
              {locale === "es"
                ? "Fuera del trabajo construyo productos propios y los llevo hasta el final — que para mí significa hasta el servidor. Compré un VPS, lo aseguré y ahí corren mis aplicaciones, con backups que probé restaurando."
                : "Outside work I build my own products and take them all the way — which for me means all the way to the server. I bought a VPS, hardened it, and that's where my applications run, with backups I've tested by restoring them."}
            </p>
            <p>
              {locale === "es"
                ? "Cuando algo se rompe, prefiero entender la causa antes que tapar el síntoma. Suele tardar más y suele ser la única forma de que no vuelva."
                : "When something breaks I'd rather understand the cause than patch the symptom. It usually takes longer, and it's usually the only way it doesn't come back."}
            </p>
          </div>

          <dl className="grid content-start gap-px overflow-hidden rounded-lg border border-line bg-line">
            <Stat value={`${yearsOfExperience()}+`} label={dict.about.yearsLabel} />
            <Stat value="2" label={dict.about.appsLabel} />
            <Stat value="1" label={dict.about.serverLabel} />
            <div className="bg-surface/50 p-5">
              <dt className="label mb-2">{dict.about.languagesLabel}</dt>
              <dd className="space-y-1.5">
                {languages.map((l) => (
                  <p key={l.name.es} className="text-sm text-ink-2">
                    <span className="text-ink">{l.name[locale]}</span>
                    {" — "}
                    {l.level[locale]}
                  </p>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* ---------------- Proyectos ---------------- */}
      <Section id="proyectos" title={dict.projects.title}>
        <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-ok">
            {dict.projects.productionTitle}
          </h3>
          <p className="text-sm text-ink-3">{dict.projects.productionNote}</p>
        </div>

        <div className="grid gap-6">
          {productionProjects.map((project) => (
            <ProductionCard
              key={project.slug}
              project={project}
              lang={locale}
              dict={dict}
            />
          ))}
        </div>

        <h3 className="mb-6 mt-14 font-mono text-sm uppercase tracking-[0.14em] text-ink-3">
          {dict.projects.otherTitle}
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {otherProjects.map((project) => (
            <DevelopmentCard
              key={project.slug}
              project={project}
              lang={locale}
              dict={dict}
            />
          ))}
        </div>
      </Section>

      {/* ---------------- Experiencia ---------------- */}
      <Section id="experiencia" title={dict.experience.title}>
        <ol className="relative grid gap-8 border-l border-line pl-6 sm:pl-8">
          {roles.map((role) => (
            <li key={role.id} className="relative">
              <span
                className="absolute -left-[1.6875rem] top-2 size-2 rounded-full bg-line-strong sm:-left-[2.1875rem]"
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {role.company[locale]}
                </h3>
                {role.companyNote && (
                  <span className="font-mono text-xs text-ink-3">
                    {role.companyNote[locale]}
                  </span>
                )}
                <span className="ml-auto font-mono text-xs tabular-nums text-ink-3">
                  {role.startLabel[locale]} — {role.endLabel[locale]}
                </span>
              </div>

              <p className="mt-1 font-mono text-sm text-accent">
                {role.title[locale]}
              </p>

              <p className="mt-3 max-w-prose leading-relaxed text-ink-2">
                {role.headline[locale]}
              </p>

              <details className="group mt-3">
                <summary className="cursor-pointer list-none font-mono text-xs uppercase tracking-widest text-ink-3 transition-colors hover:text-accent">
                  <span className="group-open:hidden">
                    {dict.experience.expand} +
                  </span>
                  <span className="hidden group-open:inline">
                    {dict.experience.collapse} −
                  </span>
                </summary>
                <ul className="mt-3 grid gap-2 border-l border-line pl-4 text-sm leading-relaxed text-ink-2">
                  {role.details[locale].map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </details>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {role.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-line px-2 py-0.5 font-mono text-2xs text-ink-3"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-lg border border-line bg-surface/40 p-6">
          <p className="label mb-3">{dict.experience.educationTitle}</p>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="font-semibold">{education.institution}</h3>
            <span className="ml-auto font-mono text-xs tabular-nums text-ink-3">
              {education.startLabel[locale]} — {education.endLabel[locale]}
            </span>
          </div>
          <p className="mt-1 font-mono text-sm text-accent">
            {education.degree[locale]}
          </p>
          <p className="mt-2 text-sm text-ink-2">{education.detail[locale]}</p>
        </div>
      </Section>

      {/* ---------------- Stack ---------------- */}
      <Section id="stack" title={dict.stack.title} lede={dict.stack.lede}>
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {stack.map((group) => (
            <div key={group.id} className="bg-bg p-6">
              <h3 className="label mb-4">{group.title[locale]}</h3>
              <ul className="grid gap-3">
                {group.items.map((tech) => (
                  <li key={tech.name} className="grid gap-0.5">
                    <span
                      className={`font-mono text-sm ${
                        tech.core ? "text-accent" : "text-ink"
                      }`}
                    >
                      {tech.name}
                    </span>
                    <span className="text-xs leading-relaxed text-ink-3">
                      {tech.evidence[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- Contacto ---------------- */}
      <Section id="contacto" title={dict.contact.title}>
        <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
          {site.contactLede[locale]}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ContactLink href={`mailto:${site.email}`} label={dict.contact.emailLabel} value={site.email} />
          <ContactLink href={site.linkedin} label={dict.contact.linkedinLabel} value="/felipegarciasuez" external />
          <ContactLink href={site.github} label={dict.contact.githubLabel} value={`@${site.githubUser}`} external />
          <ContactLink href={site.cvPath} label={dict.contact.cvLabel} value="PDF" download />
        </div>
      </Section>
    </>
  );
}

/* ---------------- primitivas de layout ---------------- */

function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-(--spacing-section) sm:px-8"
    >
      <div className="mb-10 border-b border-line pb-5">
        <h2 className="text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
        {lede && <p className="mt-2 max-w-2xl text-ink-2">{lede}</p>}
      </div>
      {children}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface/50 p-5">
      <dd className="font-mono text-3xl font-semibold tabular-nums text-accent">
        {value}
      </dd>
      <dt className="mt-1 text-sm leading-snug text-ink-3">{label}</dt>
    </div>
  );
}

function ContactLink({
  href,
  label,
  value,
  external,
  download,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...(download ? { download: true } : {})}
      className="group flex flex-col gap-1 rounded-lg border border-line bg-surface/40 p-5 transition-colors hover:border-accent"
    >
      <span className="label transition-colors group-hover:text-accent">
        {label}
      </span>
      <span className="truncate font-mono text-sm text-ink">{value}</span>
    </a>
  );
}
