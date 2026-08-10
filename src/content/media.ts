import type { StaticImageData } from "next/image";
import caudalHormigas from "@/assets/caudal-hormigas.webp";

/**
 * Capturas y clips por proyecto.
 *
 * Las imágenes se importan estáticamente para que Next conozca las
 * dimensiones en el build y reserve el espacio: sin eso el contenido salta
 * al cargar, justo en la sección más importante del sitio.
 *
 * Los videos van en /public porque next/image no los procesa; por eso
 * llevan su propio poster (para no mostrar un cuadro en blanco antes de
 * que carguen y como respaldo si el navegador no reproduce el archivo).
 */
export type ImageMedia = {
  kind: "image";
  poster: StaticImageData;
  alt: { es: string; en: string };
  frame: "phone" | "browser";
};

export type VideoMedia = {
  kind: "video";
  src: string;
  poster: string;
  alt: { es: string; en: string };
  frame: "phone" | "browser";
};

export type ProjectMedia = ImageMedia | VideoMedia;

export const projectMedia: Record<string, ProjectMedia> = {
  caudal: {
    kind: "image",
    poster: caudalHormigas,
    alt: {
      es: "Caudal abierto en el celular en caudalwallet.com, mostrando el panel de gastos hormiga con las categorías Viaje, Hogar, Salud y Supermercado, y un aumento del 46% respecto del mes pasado. Los importes están desenfocados.",
      en: "Caudal open on a phone at caudalwallet.com, showing the small-expenses panel with the categories Viaje, Hogar, Salud and Supermercado, and a 46% increase over last month. Amounts are blurred.",
    },
    frame: "phone",
  },
  cuadrosjaci: {
    kind: "video",
    src: "/media/cuadrosjaci-demo.mp4",
    poster: "/media/cuadrosjaci-poster.webp",
    alt: {
      es: "Recorrido por jacintalynch.art: la grilla del catálogo y el detalle de la obra Doberrman, con su descripción y estado de disponibilidad.",
      en: "A walkthrough of jacintalynch.art: the catalogue grid and the detail view for the piece Doberrman, with its description and availability.",
    },
    frame: "browser",
  },
};
