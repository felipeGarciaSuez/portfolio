"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries";
import { switchLocalePath, type Locale } from "@/lib/i18n";

/**
 * Visible desde el primer scroll, no oculto hasta pasar el hero: en mobile
 * era además la única vía a la navegación, así que ocultarla dejaba al
 * usuario sin forma de llegar a Proyectos salvo el CTA del hero.
 */
export function SiteHeader({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}#proyectos`, label: dict.nav.projects },
    { href: `/${lang}#infraestructura`, label: dict.nav.infra },
    { href: `/${lang}#experiencia`, label: dict.nav.experience },
    { href: `/${lang}#stack`, label: dict.nav.stack },
    { href: `/${lang}/notas`, label: dict.nav.notes },
    { href: `/${lang}#contacto`, label: dict.nav.contact },
  ];

  const other: Locale = lang === "es" ? "en" : "es";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3 sm:px-8">
        <Link
          href={`/${lang}`}
          className="font-mono text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          FGS
        </Link>

        <ul className="ml-auto hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={switchLocalePath(pathname, other)}
          className="ml-auto rounded border border-line px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-ink-2 transition-colors hover:border-accent hover:text-accent md:ml-0"
          aria-label={dict.langSwitch.label}
          hrefLang={other}
        >
          {other}
        </Link>
      </nav>
    </header>
  );
}
