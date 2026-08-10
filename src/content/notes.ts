import type { ComponentType } from "react";
import type { Locale, Localized } from "@/lib/i18n";

/**
 * Notas técnicas.
 *
 * La metadata vive acá en TypeScript y no como front-matter dentro del MDX,
 * a propósito: así está tipada y una nota a la que le falte la traducción,
 * la fecha o el resumen rompe el build en vez de renderizar `undefined` en
 * producción. El MDX se queda solo con la prosa, que es lo que se escribe
 * a mano.
 *
 * Para agregar una nota: crear la carpeta con `es.mdx` y `en.mdx`, y sumar
 * la entrada acá. Nada más.
 */
export type Note = {
  slug: string;
  /** ISO. Se usa para ordenar y para la fecha visible. */
  date: string;
  tags: string[];
  title: Localized;
  summary: Localized;
  /** Minutos de lectura, estimados a mano. */
  minutes: number;
};

export const notes: Note[] = [
  {
    slug: "django-axes-detras-de-un-proxy",
    date: "2026-08-06",
    tags: ["Django", "Seguridad", "Reverse proxy"],
    minutes: 6,
    title: {
      es: "django-axes no me estaba protegiendo de nada",
      en: "django-axes wasn't protecting me from anything",
    },
    summary: {
      es: "La librería que bloquea los intentos de login por fuerza bruta estaba instalada, configurada y activa. También estaba registrando la IP equivocada, lo que la volvía inútil y además peligrosa.",
      en: "The library that blocks brute-force login attempts was installed, configured and running. It was also recording the wrong IP, which made it useless and, on top of that, dangerous.",
    },
  },
  {
    slug: "docker-escribe-iptables-por-debajo-de-ufw",
    date: "2026-08-05",
    tags: ["Docker", "Firewall", "Linux"],
    minutes: 4,
    title: {
      es: "Tu firewall miente: Docker escribe iptables por debajo",
      en: "Your firewall is lying: Docker writes iptables underneath",
    },
    summary: {
      es: "Podés tener ufw activo, en denegar-todo, y una base de datos expuesta a internet al mismo tiempo. El firewall te va a decir que está todo cerrado, y va a ser cierto desde su punto de vista.",
      en: "You can have ufw enabled, set to deny-all, and a database exposed to the internet at the same time. The firewall will tell you everything is closed, and from its point of view that's true.",
    },
  },
  {
    slug: "un-backup-sin-restauracion-probada",
    date: "2026-08-07",
    tags: ["PostgreSQL", "Backups", "systemd"],
    minutes: 5,
    title: {
      es: "Un backup sin restauración probada no es un backup",
      en: "A backup with no tested restore isn't a backup",
    },
    summary: {
      es: "El dump corre todos los días y no falla nunca. Eso no dice nada sobre si sirve. Cómo armé una verificación que sí lo dice, y por qué ignora algunas tablas a propósito.",
      en: "The dump runs every day and never fails. That says nothing about whether it works. How I built a check that does say it, and why it deliberately ignores some tables.",
    },
  },
];

/**
 * Registro explícito de imports. Un import dinámico con plantilla
 * (`import(\`./notas/${slug}/${lang}.mdx\`)`) obligaría al bundler a adivinar
 * qué archivos existen; así queda todo estático y verificable.
 */
type MDXModule = { default: ComponentType };

const content: Record<string, Record<Locale, () => Promise<MDXModule>>> = {
  "django-axes-detras-de-un-proxy": {
    es: () => import("./notas/django-axes-detras-de-un-proxy/es.mdx"),
    en: () => import("./notas/django-axes-detras-de-un-proxy/en.mdx"),
  },
  "docker-escribe-iptables-por-debajo-de-ufw": {
    es: () => import("./notas/docker-escribe-iptables-por-debajo-de-ufw/es.mdx"),
    en: () => import("./notas/docker-escribe-iptables-por-debajo-de-ufw/en.mdx"),
  },
  "un-backup-sin-restauracion-probada": {
    es: () => import("./notas/un-backup-sin-restauracion-probada/es.mdx"),
    en: () => import("./notas/un-backup-sin-restauracion-probada/en.mdx"),
  },
};

export const sortedNotes = [...notes].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}

export async function getNoteContent(slug: string, lang: Locale) {
  const loader = content[slug]?.[lang];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function formatNoteDate(date: string, lang: Locale): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(
    lang === "es" ? "es-AR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
  );
}
