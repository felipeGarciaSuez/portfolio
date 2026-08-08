/**
 * Español es el idioma principal y vive en la raíz conceptual del sitio,
 * pero igual lleva prefijo (`/es`) para que ninguna ruta quede ambigua y
 * el conmutador de idioma sea una sustitución de segmento, no un caso especial.
 */
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Texto que existe en los dos idiomas. */
export type Localized = Record<Locale, string>;

/** Lista de textos que existe en los dos idiomas. */
export type LocalizedList = Record<Locale, string[]>;

export function t(value: Localized, lang: Locale): string {
  return value[lang];
}

export function tList(value: LocalizedList, lang: Locale): string[] {
  return value[lang];
}

/**
 * Devuelve la misma ruta en el otro idioma, preservando el resto del path.
 * `/es/proyectos/caudal` -> `/en/proyectos/caudal`
 */
export function switchLocalePath(pathname: string, next: Locale): string {
  const segments = pathname.split("/");
  // segments[0] siempre es "" porque el path arranca con "/"
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = next;
    return segments.join("/");
  }
  return `/${next}${pathname}`;
}

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};
