import type { Localized } from "@/lib/i18n";

/**
 * Datos de identidad y contacto. Todo lo que aparece más de una vez
 * en el sitio se define acá una sola vez.
 */
export const site = {
  name: "Felipe Garcia Suez",
  role: {
    es: "Backend Python Developer",
    en: "Backend Python Developer",
  } satisfies Localized,

  location: {
    es: "Rosario, Santa Fe, Argentina",
    en: "Rosario, Santa Fe, Argentina",
  } satisfies Localized,

  /**
   * Sin lenguaje de búsqueda activa: transmite necesidad y baja el poder de
   * negociación. Quien contrata escribe igual, y la conversación arranca
   * desde otro lugar.
   */
  contactLede: {
    es: "Si querés hablar de un proyecto, de una posición o de algo técnico, escribime.",
    en: "If you'd like to talk about a project, a role, or anything technical, get in touch.",
  } satisfies Localized,

  /** La frase del hero — opción C, elegida por Felipe. */
  tagline: {
    es: "Lo que construyo está corriendo ahora mismo, en un servidor que administro yo.",
    en: "What I build is running right now, on a server I administer myself.",
  } satisfies Localized,

  email: "garciasuezfelipe@gmail.com",
  github: "https://github.com/felipeGarciaSuez",
  githubUser: "felipeGarciaSuez",
  linkedin: "https://www.linkedin.com/in/felipegarciasuez/",
  cvPath: "/cv-felipe-garcia-suez.pdf",

  /** Se completa cuando el dominio esté comprado y apuntado. */
  url: "https://felipegarciasuez.dev",
} as const;

/** Dominios propios que el hero consulta en vivo. */
export const liveSites = [
  { host: "caudalwallet.com", project: "caudal" },
  { host: "jacintalynch.art", project: "cuadrosjaci" },
] as const;
