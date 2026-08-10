/**
 * Datos estructurados para buscadores. `JSON.stringify` no escapa `</script>`,
 * así que si ese substring apareciera dentro del contenido cerraría el tag
 * antes de tiempo; el reemplazo de acá lo neutraliza aunque los datos de
 * este sitio son propios y no vienen de un usuario.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
