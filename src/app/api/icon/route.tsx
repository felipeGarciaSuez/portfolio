import { ImageResponse } from "next/og";

/** Íconos para el manifest (192 y 512), mismo monograma que el favicon. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = Number(searchParams.get("size")) || 512;

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
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: size * 0.46,
          color: "#4fc3d6",
        }}
      >
        FG
      </div>
    ),
    { width: size, height: size },
  );
}
