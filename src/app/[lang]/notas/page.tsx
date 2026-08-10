import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "@/components/icons";
import { getDictionary } from "@/content/dictionaries";
import { formatNoteDate, sortedNotes } from "@/content/notes";
import { ogImageUrl, site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/notas">) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  const title = `${dict.notes.title} — ${site.name}`;
  const image = ogImageUrl(site.name, dict.notes.title);

  return {
    title: dict.notes.title,
    description: dict.notes.lede,
    alternates: {
      canonical: `/${lang}/notas`,
      languages: { es: "/es/notas", en: "/en/notas" },
    },
    openGraph: {
      title,
      description: dict.notes.lede,
      url: `${site.url}/${lang}/notas`,
      images: [{ url: image, width: 1200, height: 630, alt: dict.notes.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.notes.lede,
      images: [image],
    },
  };
}

export default async function NotesIndex({ params }: PageProps<"/[lang]/notas">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-5 pb-(--spacing-section) pt-28 sm:px-8">
      <header className="border-b border-line pb-8">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          {dict.notes.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">{dict.notes.lede}</p>
      </header>

      {sortedNotes.length === 0 ? (
        <p className="mt-10 text-ink-3">{dict.notes.empty}</p>
      ) : (
        <ul className="mt-10 grid gap-4">
          {sortedNotes.map((note) => (
            <li key={note.slug}>
              <Link
                href={`/${locale}/notas/${note.slug}`}
                className="group block rounded-lg border border-line bg-surface/40 p-6 transition-colors hover:border-accent"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-3">
                  <time dateTime={note.date}>
                    {formatNoteDate(note.date, locale)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>
                    {note.minutes} {dict.notes.readingTime}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {note.title[locale]}
                </h2>
                <p className="mt-2 max-w-prose leading-relaxed text-ink-2">
                  {note.summary[locale]}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {note.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-line px-2 py-0.5 font-mono text-2xs text-ink-3"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <nav className="mt-14 border-t border-line pt-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          {locale === "es" ? "Volver al inicio" : "Back to home"}
          <ArrowRightIcon />
        </Link>
      </nav>
    </div>
  );
}
