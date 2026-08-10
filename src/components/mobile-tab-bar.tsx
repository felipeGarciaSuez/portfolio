import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";

/**
 * En mobile la lista completa de enlaces del header no entra (y no hay
 * espacio para un menú hamburguesa que valga la pena mantener), así que
 * las dos rutas que más importan quedan fijas abajo, donde el pulgar
 * llega sin esfuerzo. El resto de las secciones se alcanza scrolleando.
 */
export function MobileTabBar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <nav
      aria-label={dict.nav.projects + " / " + dict.nav.contact}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-bg/95 backdrop-blur md:hidden"
    >
      <Link
        href={`/${lang}#proyectos`}
        className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-ink-2 transition-colors active:text-accent"
      >
        <GridIcon />
        {dict.nav.projects}
      </Link>
      <Link
        href={`/${lang}#contacto`}
        className="flex items-center justify-center gap-2 border-l border-line py-3 text-sm font-medium text-ink-2 transition-colors active:text-accent"
      >
        <MailIcon />
        {dict.nav.contact}
      </Link>
    </nav>
  );
}

function GridIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="size-4 shrink-0"
      aria-hidden
    >
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden
    >
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="M2 4.5 8 9l6-4.5" />
    </svg>
  );
}
