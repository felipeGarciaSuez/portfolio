import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Las dos versiones del sitio se generan estáticas en el build. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const description =
    lang === "es"
      ? `${site.role.es} con más de 4 años de experiencia. Construyo productos completos y los sostengo en producción, en un servidor propio.`
      : `${site.role.en} with 4+ years of experience. I build complete products and keep them running in production, on a server of my own.`;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.role[lang]}`,
      template: `%s — ${site.name}`,
    },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_AR" : "en_US",
      url: `${site.url}/${lang}`,
      siteName: site.name,
      title: `${site.name} — ${site.role[lang]}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.role[lang]}`,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bg text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-bg focus:font-medium"
        >
          {dict.nav.skipToContent}
        </a>
        <SiteHeader lang={locale} dict={dict} />
        <main id="main">{children}</main>
        <SiteFooter dict={dict} />
      </body>
    </html>
  );
}
