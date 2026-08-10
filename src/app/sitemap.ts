import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, type Locale } from "@/lib/i18n";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";

/** Idioma → el otro idioma, para las etiquetas hreflang de cada URL. */
function languagesFor(path: string): Record<Locale, string> {
  return {
    es: `${site.url}/es${path}`,
    en: `${site.url}/en${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const staticPaths: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/infraestructura", priority: 0.8, changeFrequency: "monthly" },
    { path: "/notas", priority: 0.7, changeFrequency: "weekly" },
  ];

  for (const { path, priority, changeFrequency } of staticPaths) {
    for (const lang of locales) {
      entries.push({
        url: `${site.url}/${lang}${path}`,
        changeFrequency,
        priority,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  for (const project of projects) {
    const path = `/proyectos/${project.slug}`;
    for (const lang of locales) {
      entries.push({
        url: `${site.url}/${lang}${path}`,
        changeFrequency: "monthly",
        priority: project.status === "production" ? 0.9 : 0.6,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  for (const note of notes) {
    const path = `/notas/${note.slug}`;
    for (const lang of locales) {
      entries.push({
        url: `${site.url}/${lang}${path}`,
        lastModified: note.date,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  return entries;
}
