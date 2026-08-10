"use client";

import { useEffect, useRef } from "react";

/**
 * Loop de video mudo para las cards de proyecto. Autoplay nativo no respeta
 * `prefers-reduced-motion` por sí solo, así que se controla a mano: quien
 * pidió menos movimiento ve el poster quieto, no el clip reproduciéndose.
 */
export function VideoLoop({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduceMotion) {
      video.play().catch(() => {
        // Autoplay puede fallar por política del navegador; el poster
        // se sigue viendo, así que no hay nada roto que mostrar.
      });
    }
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
