/**
 * Fuente para las imágenes Open Graph generadas.
 *
 * Primer intento: bajar un .ttf estático de Geist Bold de un mirror en
 * GitHub. Se descartó — esa fuente no trae los glifos latinos extendidos,
 * así que "está" salía como "est□" y la raya "—" como un cuadro vacío.
 * Casi todo el texto de este sitio es español con acentos, así que no era
 * un detalle menor.
 *
 * La solución es pedirle a la API de Google Fonts el subconjunto exacto de
 * caracteres que aparecen en cada imagen (parámetro `text`), forzando un
 * User-Agent viejo para evitar que la respuesta sea una fuente variable.
 * Es el mismo truco que usan los ejemplos oficiales de Vercel.
 */
export async function loadGoogleFont(
  text: string,
  weight: 400 | 700 = 700,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await fetch(url, {
    headers: {
      // User-Agent de IE11: es lo que hace que Google sirva TTF en vez de woff2.
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
    },
  }).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\) format\('(\w+)'\)/);
  if (!match) {
    throw new Error("No se pudo resolver la URL de la fuente OG desde Google Fonts");
  }

  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) {
    throw new Error(`No se pudo descargar la fuente OG: ${fontRes.status}`);
  }
  return fontRes.arrayBuffer();
}
