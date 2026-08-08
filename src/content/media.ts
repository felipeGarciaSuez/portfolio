import type { StaticImageData } from "next/image";
import caudalHormigas from "@/assets/caudal-hormigas.webp";

/**
 * Capturas por proyecto. Se importan estáticamente para que Next conozca
 * las dimensiones en el build y reserve el espacio: sin eso, la imagen
 * empuja el contenido al cargar y arruina el CLS justo en la sección
 * más importante del sitio.
 *
 * Los montos de Caudal están desenfocados a propósito: son finanzas reales.
 */
export type ProjectMedia = {
  poster: StaticImageData;
  /** Texto alternativo, en los dos idiomas. */
  alt: { es: string; en: string };
  frame: "phone" | "browser";
};

export const projectMedia: Record<string, ProjectMedia> = {
  caudal: {
    poster: caudalHormigas,
    alt: {
      es: "Caudal abierto en el celular en caudalwallet.com, mostrando el panel de gastos hormiga con las categorías Viaje, Hogar, Salud y Supermercado, y un aumento del 46% respecto del mes pasado. Los importes están desenfocados.",
      en: "Caudal open on a phone at caudalwallet.com, showing the small-expenses panel with the categories Viaje, Hogar, Salud and Supermercado, and a 46% increase over last month. Amounts are blurred.",
    },
    frame: "phone",
  },
};
