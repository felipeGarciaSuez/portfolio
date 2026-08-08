import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { LiveStatus } from "./live-status";
import { GithubIcon, LinkedinIcon, ArrowDownIcon, DownloadIcon } from "./icons";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden px-5 py-24 sm:px-8">
      {/* Halo muy tenue detrás del título. Decorativo y barato: un solo gradiente. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 65%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <p className="label mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-ok" aria-hidden />
              {site.availability[lang]}
            </span>
          </p>

          <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.035em]">
            {site.name}
          </h1>

          <p className="mt-3 font-mono text-lg tracking-tight text-accent sm:text-xl">
            {site.role[lang]}
          </p>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            {site.tagline[lang]}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={`/${lang}#proyectos`}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-ink"
            >
              {dict.hero.ctaProjects}
              <ArrowDownIcon />
            </Link>

            <a
              href={site.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <DownloadIcon />
              {dict.hero.ctaCV}
            </a>

            <div className="flex items-center gap-1">
              <IconLink href={site.github} label="GitHub">
                <GithubIcon />
              </IconLink>
              <IconLink href={site.linkedin} label="LinkedIn">
                <LinkedinIcon />
              </IconLink>
            </div>
          </div>
        </div>

        <LiveStatus dict={dict} />
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-surface hover:text-accent"
    >
      {children}
    </a>
  );
}
