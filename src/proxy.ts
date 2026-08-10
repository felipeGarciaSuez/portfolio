import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

/**
 * En Next.js 16 `middleware` pasó a llamarse `proxy`.
 *
 * Redirige cualquier ruta sin prefijo de idioma al idioma que prefiera el
 * navegador, cayendo en español. El objetivo es que `/proyectos/caudal`
 * funcione igual que `/es/proyectos/caudal` y que nadie llegue a un 404
 * por escribir la URL sin el prefijo.
 */
function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  // "en-US,en;q=0.9,es;q=0.8" -> [{ tag: "en-us", q: 1 }, ...]
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        q: q ? Number.parseFloat(q.split("=")[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
      Todo menos: internos de Next, la API, cualquier archivo con extensión
      (el CV, imágenes, videos, robots.txt, sitemap.xml…) y las rutas de
      ícono generadas por código. Estas últimas no tienen extensión en su
      path — `/icon`, no `/icon.png` — así que sin la exclusión explícita
      caían en el redirect de idioma y terminaban en un 404 en `/es/icon`.
    */
    "/((?!_next|api|icon|apple-icon|.*\\..*).*)",
  ],
};
