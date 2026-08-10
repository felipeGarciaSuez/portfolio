import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-font";
import { site } from "@/content/site";

export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Generador único de imágenes Open Graph, parametrizado por query string
 * (`?eyebrow=...&title=...`) en vez de un archivo `opengraph-image.tsx`
 * por ruta. Una sola plantilla para el hero, las fichas de proyecto, la
 * infraestructura y cada nota — todas comparten el mismo lenguaje visual
 * del sitio sin duplicar el layout cinco veces.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eyebrow = (searchParams.get("eyebrow") ?? site.name).slice(0, 60);
  const title = (searchParams.get("title") ?? site.role.es).slice(0, 90);
  const domain = site.url.replace("https://", "");

  /*
    Mayusculizado en JS, no con `text-transform: uppercase` en CSS: si se
    pidiera la fuente con el texto original y recién después se
    transformara al dibujar, los glifos en mayúscula que esa transformación
    genera no estarían en el subconjunto pedido a Google Fonts, y Satori
    caería a una fuente de reserva más chica — exactamente lo que pasaba
    antes de este cambio. Pidiendo ya el texto final, lo que se pide es
    lo que se dibuja.
  */
  const nameUpper = site.name.toUpperCase();
  const eyebrowUpper = eyebrow.toUpperCase();

  const fontData = await loadGoogleFont(
    `${nameUpper}${eyebrowUpper}${title}${domain}`,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0f14",
          backgroundImage:
            "radial-gradient(circle at 12% 8%, rgba(79,195,214,0.16) 0%, rgba(11,15,20,0) 55%)",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: 2,
            color: "#738794",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#4fc3d6",
            }}
          />
          {nameUpper}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 3,
              color: "#4fc3d6",
            }}
          >
            {eyebrowUpper}
          </div>
          <div
            style={{
              fontSize: 60,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              color: "#e8eef4",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#738794",
            letterSpacing: 1,
          }}
        >
          {domain}
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [{ name: "Inter", data: fontData, weight: 700, style: "normal" }],
      // El contenido es determinístico por URL: cachear evita pedirle a
      // Google la fuente y volver a renderizar en cada scrapeo de un link.
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    },
  );
}
