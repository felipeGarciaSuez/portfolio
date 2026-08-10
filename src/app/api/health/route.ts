import { NextResponse } from "next/server";

/**
 * Healthcheck del contenedor. Deliberadamente no llama a nada externo:
 * `/api/status` sale a internet a consultar los dominios propios, y eso
 * mide la salud de esos sitios, no la de este contenedor. Docker necesita
 * la segunda pregunta, no la primera.
 */
export function GET() {
  return NextResponse.json({ ok: true });
}
