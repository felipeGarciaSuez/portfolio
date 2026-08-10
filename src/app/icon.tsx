import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Monograma FG, mismo lenguaje visual que el resto del sitio:
 * fondo oscuro con sesgo azul, acento cian, tipografía monoespaciada.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f14",
          borderRadius: 6,
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 17,
          color: "#4fc3d6",
        }}
      >
        FG
      </div>
    ),
    { ...size },
  );
}
