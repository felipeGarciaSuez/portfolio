import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { getDictionary } from "@/content/dictionaries";
import {
  formatNoteDate,
  getNote,
  getNoteContent,
  notes,
} from "@/content/notes";
import { ogImageUrl, site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    notes.map((note) => ({ lang, slug: note.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/notas/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const note = getNote(slug);
  if (!note) return {};

  const dict = getDictionary(lang);
  const image = ogImageUrl(dict.notes.title, note.title[lang]);

  return {
    title: note.title[lang],
    description: note.summary[lang],
    alternates: {
      canonical: `/${lang}/notas/${slug}`,
      languages: {
        es: `/es/notas/${slug}`,
        en: `/en/notas/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      publishedTime: note.date,
      tags: note.tags,
      title: note.title[lang],
      description: note.summary[lang],
      url: `${site.url}/${lang}/notas/${slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: note.title[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title[lang],
      description: note.summary[lang],
      images: [image],
    },
  };
}

export default async function NotePage({
  params,
}: PageProps<"/[lang]/notas/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const note = getNote(slug);
  if (!note) notFound();

  const Content = await getNoteContent(slug, locale);
  if (!Content) notFound();

  const dict = getDictionary(locale);

  return (
    <article className="mx-auto max-w-3xl px-5 pb-(--spacing-section) pt-28 sm:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: note.title[locale],
          description: note.summary[locale],
          datePublished: note.date,
          dateModified: note.date,
          keywords: note.tags.join(", "),
          url: `${site.url}/${locale}/notas/${slug}`,
          author: {
            "@type": "Person",
            name: site.name,
            url: site.url,
          },
        }}
      />

      <Link
        href={`/${locale}/notas`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-3 transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span>
        {dict.notes.title}
      </Link>

      <header className="mt-8 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-3">
          <time dateTime={note.date}>{formatNoteDate(note.date, locale)}</time>
          <span aria-hidden>·</span>
          <span>
            {note.minutes} {dict.notes.readingTime}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
          {note.title[locale]}
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-2">
          {note.summary[locale]}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-line px-2 py-0.5 font-mono text-2xs text-ink-3"
            >
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-10">
        <Content />
      </div>

      <nav className="mt-16 border-t border-line pt-8">
        <Link
          href={`/${locale}/notas`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          {dict.notes.title}
          <ArrowRightIcon />
        </Link>
      </nav>
    </article>
  );
}
