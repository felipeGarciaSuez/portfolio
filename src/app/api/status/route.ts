import { NextResponse } from "next/server";
import { liveSites } from "@/content/site";

export const dynamic = "force-dynamic";

const TIMEOUT_MS = 6000;

export type SiteStatus = {
  host: string;
  project: string;
  /** null significa que no hubo respuesta dentro del tiempo límite. */
  status: number | null;
  ms: number | null;
  ok: boolean;
};

async function check(host: string, project: string): Promise<SiteStatus> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    /*
      HEAD y no GET: alcanza para saber que el sitio responde y evita
      descargar la página entera de mis propios servidores en cada visita.
    */
    const res = await fetch(`https://${host}`, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
    });
    return {
      host,
      project,
      status: res.status,
      ms: Date.now() - started,
      ok: res.ok,
    };
  } catch {
    return { host, project, status: null, ms: null, ok: false };
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  const results = await Promise.all(
    liveSites.map((s) => check(s.host, s.project)),
  );

  return NextResponse.json(
    { checkedAt: new Date().toISOString(), sites: results },
    {
      headers: {
        // Una consulta cada 2 minutos alcanza; el resto se sirve de caché.
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    },
  );
}
