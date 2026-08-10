import type { StaticImageData } from "next/image";

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
    kind: "video",
    src: "/media/caudal-demo.mp4",
    poster: "/media/caudal-poster.webp",
    alt: {
      es: "Carga de un gasto en Caudal en dos toques: se ingresa el monto y se elige una categoría entre chips como Ahorro, Apps, Café, Delivery o Supermercado, sin salir de la pantalla.",
      en: "Logging an expense in Caudal in two taps: enter the amount and pick a category from chips like Ahorro, Apps, Café, Delivery or Supermercado, without leaving the screen.",
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
