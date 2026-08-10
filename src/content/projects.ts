import type { Localized, LocalizedList } from "@/lib/i18n";

export type ProjectStatus = "production" | "development" | "discontinued";

/**
 * Diagrama de arquitectura, como datos en vez de una imagen.
 * Se dibuja con HTML: escala bien en mobile, se lee con lector de pantalla
 * y no hay que reexportar un PNG cada vez que cambia una pieza.
 */
export type Architecture = {
  summary: Localized;
  tiers: {
    id: string;
    label: Localized;
    nodes: { name: string; note?: Localized }[];
  }[];
  notes?: LocalizedList;
};

export type ProjectLink = {
  kind: "demo" | "repo" | "case";
  href: string;
  label: Localized;
};

export type DecisionRecord = {
  /** Qué se eligió. */
  choice: Localized;
  /** Contra qué alternativa. */
  instead: Localized;
  /** Por qué. Es la parte que importa. */
  because: Localized;
};

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  /** Dominio propio, si está desplegado. */
  domain?: string;
  /** Orden de aparición; menor primero. */
  order: number;
  tagline: Localized;
  problem: Localized;
  what: Localized;
  stack: string[];
  /** Lo difícil de verdad, no "aprendí a usar Docker". */
  challenge: {
    title: Localized;
    body: Localized;
  };
  decisions: DecisionRecord[];
  architecture?: Architecture;
  learned: Localized;
  next: Localized;
  /** Solo para proyectos dados de baja: por qué se frenó. */
  discontinuedReason?: {
    title: Localized;
    body: Localized;
  };
  highlights: LocalizedList;
  links: ProjectLink[];
  /** Capturas: se completan cuando existan los archivos. */
  media?: {
    poster?: string;
    video?: string;
    /** Caudal es mobile-first: se muestra en marco de teléfono. */
    frame?: "phone" | "browser";
  };
};

export const projects: Project[] = [
  {
    slug: "caudal",
    name: "Caudal",
    status: "production",
    domain: "caudalwallet.com",
    order: 1,
    tagline: {
      es: "Gestor de finanzas personales, self-hosted y open source.",
      en: "Self-hosted, open source personal finance manager.",
    },
    problem: {
      es: "Los gastos chicos y repetidos —el café, el delivery, la suscripción que nadie cancela— no aparecen como problema en ningún resumen bancario. Están diluidos entre cientos de líneas sin categoría. A fin de mes falta plata y no hay forma de señalar dónde se fue.",
      en: "Small recurring expenses — coffee, delivery, the subscription nobody cancels — never show up as a problem on a bank statement. They're diluted across hundreds of uncategorized lines. At the end of the month the money is gone and there's no way to point at where.",
    },
    what: {
      es: "Caudal separa el sueldo de lo que queda, y hace visible el gasto hormiga como categoría propia. Está pensado para el celular: cargar un gasto son dos toques, porque un gestor que tarda no se usa.",
      en: "Caudal separates your salary from what's left, and surfaces small recurring spending as its own category. It's built for the phone: logging an expense takes two taps, because a tracker that's slow doesn't get used.",
    },
    stack: [
      "Python 3.12",
      "Django 5.2",
      "PostgreSQL 17",
      "HTMX",
      "Alpine.js",
      "gunicorn",
      "WhiteNoise",
      "Docker",
      "uv",
      "pytest",
      "ruff",
    ],
    challenge: {
      title: {
        es: "Importar extractos bancarios que no se parecen entre sí",
        en: "Importing bank statements that look nothing alike",
      },
      body: {
        es: "Cada banco y billetera exporta el CSV a su manera: distinto delimitador, distinto encoding, distintos nombres de columna y dos convenciones incompatibles para los montos (1.234,56 en Argentina, 1234.56 en Estados Unidos). El importador detecta todo eso solo, por alias de columna y por análisis del contenido, y deduplica por el identificador de la fuente —o por un hash de fecha, monto y descripción cuando la fuente no da identificador— para que reimportar el mismo archivo no duplique nada. Encima corre un motor de reglas editable que autocategoriza por palabra clave; lo que no matchea queda marcado para revisar, en vez de caer en una categoría equivocada en silencio.",
        en: "Every bank and wallet exports CSV its own way: different delimiter, different encoding, different column names, and two incompatible amount conventions (1.234,56 in Argentina, 1234.56 in the US). The importer detects all of it on its own, by column aliases and content analysis, and deduplicates by the source's identifier — or by a hash of date, amount and description when the source gives none — so re-importing the same file duplicates nothing. On top of that an editable rule engine auto-categorizes by keyword; whatever doesn't match is flagged for review instead of silently landing in the wrong category.",
      },
    },
    decisions: [
      {
        choice: { es: "HTMX y Alpine", en: "HTMX and Alpine" },
        instead: { es: "una SPA con React", en: "a React SPA" },
        because: {
          es: "La app es formularios y listas. Una SPA habría sumado un toolchain de Node, un bundle al cliente y un estado duplicado, para resolver algo que el servidor ya resuelve. Con HTMX la carga en dos toques es un fragmento de HTML.",
          en: "The app is forms and lists. A SPA would have added a Node toolchain, a client bundle and duplicated state to solve something the server already solves. With HTMX, two-tap entry is an HTML fragment.",
        },
      },
      {
        choice: { es: "Postgres en mi propio VPS", en: "Postgres on my own VPS" },
        instead: { es: "seguir en un Postgres gestionado", en: "staying on managed Postgres" },
        because: {
          es: "Bajaba la latencia y sacaba una dependencia externa, pero volvía bloqueante tener backups reales. Fue un intercambio consciente: la base propia no vale nada sin restauración probada.",
          en: "It cut latency and removed an external dependency, but made real backups a blocking requirement. A deliberate trade: your own database is worthless without a tested restore.",
        },
      },
      {
        choice: { es: "Importación por CSV", en: "CSV import" },
        instead: { es: "integración en vivo con Mercado Pago", en: "a live Mercado Pago integration" },
        because: {
          es: "Evalué la API y no sirve para esto: está orientada a comercios y expone los cobros, no los gastos propios del usuario que paga. Descartarla temprano evitó construir sobre una expectativa falsa.",
          en: "I evaluated the API and it doesn't fit: it's merchant-oriented and exposes what you charge, not what you spend as the payer. Discarding it early avoided building on a false premise.",
        },
      },
    ],
    architecture: {
      summary: {
        es: "Todo corre en mi VPS, en contenedores. El único proceso que escucha en internet es el reverse proxy; la aplicación y la base se hablan por una red interna de Docker que no sale a ningún lado.",
        en: "Everything runs on my VPS, in containers. The only process listening on the internet is the reverse proxy; the app and the database talk over an internal Docker network that goes nowhere else.",
      },
      tiers: [
        {
          id: "edge",
          label: { es: "Borde", en: "Edge" },
          nodes: [
            {
              name: "Caddy",
              note: {
                es: "Único puerto expuesto (443). Emite y renueva el TLS solo.",
                en: "The only exposed port (443). Issues and renews TLS on its own.",
              },
            },
          ],
        },
        {
          id: "app",
          label: { es: "Aplicación", en: "Application" },
          nodes: [
            {
              name: "gunicorn + Django",
              note: {
                es: "Sin puertos publicados al host: Caddy lo alcanza por el nombre del servicio.",
                en: "No ports published to the host: Caddy reaches it by service name.",
              },
            },
          ],
        },
        {
          id: "data",
          label: { es: "Datos", en: "Data" },
          nodes: [
            {
              name: "PostgreSQL 17",
              note: {
                es: "En una red interna aparte. Verificado que no responde desde la red del proxy.",
                en: "On a separate internal network. Verified it doesn't answer from the proxy's network.",
              },
            },
          ],
        },
      ],
      notes: {
        es: [
          "Ningún contenedor de aplicación o base publica puertos: Docker escribe reglas de iptables por debajo del firewall, así que un puerto publicado deja Postgres expuesto aunque ufw diga lo contrario.",
          "Límites de memoria y CPU por contenedor, para que una aplicación con problemas no deje sin recursos a las demás del servidor.",
          "Respaldo diario con un timer de systemd, y la restauración se prueba de verdad: se restaura en una base descartable y se comparan las filas contra el origen.",
        ],
        en: [
          "No application or database container publishes ports: Docker writes iptables rules beneath the firewall, so a published port leaves Postgres exposed even when ufw says otherwise.",
          "Per-container memory and CPU limits, so a misbehaving app can't starve the others on the server.",
          "Daily backup on a systemd timer, and the restore is actually tested: it's restored into a throwaway database and row counts are compared against the source.",
        ],
      },
    },
    learned: {
      es: "Que migrar datos no termina cuando el restore corre sin errores. Terminé comparando el conteo de filas de las 18 tablas contra el origen y corriendo el chequeo de migraciones pendientes, porque un restore que 'no falló' y una base correcta no son lo mismo.",
      en: "That migrating data isn't done when the restore exits cleanly. I ended up comparing row counts across all 18 tables against the source and checking for pending migrations, because a restore that 'didn't fail' and a correct database are not the same thing.",
    },
    next: {
      es: "Gastos fijos recurrentes autogenerados y proyección del resto del sueldo a fin de mes.",
      en: "Auto-generated recurring fixed expenses and an end-of-month projection of what's left.",
    },
    highlights: {
      es: [
        "Open source con licencia MIT",
        "Cada versión congelada en su rama y tag",
        "Tests con pytest y linting con ruff",
        "CHANGELOG mantenido a mano",
      ],
      en: [
        "Open source, MIT licensed",
        "Every release frozen on its own branch and tag",
        "Tested with pytest, linted with ruff",
        "Hand-maintained CHANGELOG",
      ],
    },
    links: [
      {
        kind: "demo",
        href: "https://caudalwallet.com",
        label: { es: "Ver en vivo", en: "View live" },
      },
      {
        kind: "repo",
        href: "https://github.com/felipeGarciaSuez/caudal",
        label: { es: "Código fuente", en: "Source code" },
      },
    ],
    media: { frame: "phone" },
  },

  {
    slug: "cuadrosjaci",
    name: "CuadrosJaci",
    status: "production",
    domain: "jacintalynch.art",
    order: 2,
    tagline: {
      es: "Catálogo web para una artista, con su propio dominio.",
      en: "Web catalogue for an artist, on its own domain.",
    },
    problem: {
      es: "Una artista que muestra su obra en redes sociales depende del algoritmo y no tiene forma de presentar el catálogo ordenado: por estilo, por técnica, por tamaño. Un cliente que pregunta por un cuadro específico termina revisando publicaciones viejas.",
      en: "An artist showing work on social media depends on the algorithm and has no way to present an organised catalogue: by style, by medium, by size. Someone asking about a specific piece ends up scrolling through old posts.",
    },
    what: {
      es: "Un catálogo filtrable con dominio propio. El backend es una API de solo lectura, deliberadamente simple, y el peso está en el frontend y en que el sitio esté siempre disponible.",
      en: "A filterable catalogue on its own domain. The backend is a deliberately simple read-only API; the weight is on the frontend and on the site being reliably available.",
    },
    stack: [
      "Python 3.12",
      "Django 5",
      "Django REST Framework",
      "PostgreSQL 16",
      "React",
      "Vite",
      "Docker",
      "pytest",
    ],
    challenge: {
      title: {
        es: "Meter una segunda aplicación en un servidor que ya servía otra",
        en: "Adding a second application to a server already serving one",
      },
      body: {
        es: "El desafío real de este proyecto no fue el backend, que es simple a propósito. Fue que el servidor pasara de una aplicación a dos sin que la segunda pudiera romper a la primera: límites de memoria y CPU por contenedor para que una app con problemas no deje sin recursos a la otra, rotación de logs para que no llenen el disco en silencio, y una convención de nombres que hace que la app nueva quede incluida en el backup automáticamente. Una app que no respeta la convención queda sin respaldo sin que nadie se entere, que es la peor clase de falla.",
        en: "The real challenge here wasn't the backend, which is simple on purpose. It was taking the server from one application to two without the second being able to break the first: per-container memory and CPU limits so a misbehaving app can't starve the other, log rotation so logs don't silently fill the disk, and a naming convention that makes a new app get picked up by backups automatically. An app that ignores the convention goes unbacked-up without anyone noticing — the worst kind of failure.",
      },
    },
    decisions: [
      {
        choice: { es: "Build estático del frontend servido por el proxy", en: "Static frontend build served by the proxy" },
        instead: { es: "servir con el dev server de Vite", en: "serving it with Vite's dev server" },
        because: {
          es: "El dev server no está hecho para producción: sin compresión, sin cacheo y con la superficie de ataque de una herramienta de desarrollo. El proxy sirve archivos estáticos y hace lo que sabe hacer.",
          en: "A dev server isn't built for production: no compression, no caching, and the attack surface of a development tool. The proxy serves static files and does what it's good at.",
        },
      },
      {
        choice: { es: "UUID como clave primaria", en: "UUIDs as primary keys" },
        instead: { es: "enteros autoincrementales", en: "auto-incrementing integers" },
        because: {
          es: "Los IDs secuenciales en una API pública filtran cuántas obras hay y permiten recorrerlas enumerando. No es crítico en un catálogo, pero el costo de evitarlo era cero.",
          en: "Sequential IDs on a public API leak how many pieces exist and let anyone enumerate them. Not critical for a catalogue, but the cost of avoiding it was zero.",
        },
      },
    ],
    architecture: {
      summary: {
        es: "Segunda aplicación en el mismo servidor que Caudal, compartiendo el reverse proxy pero con su base aislada. El frontend no se sirve con Node: se compila a archivos estáticos que entrega el proxy directamente.",
        en: "A second application on the same server as Caudal, sharing the reverse proxy but with its own isolated database. The frontend isn't served by Node: it's built to static files the proxy delivers directly.",
      },
      tiers: [
        {
          id: "edge",
          label: { es: "Borde", en: "Edge" },
          nodes: [
            {
              name: "Caddy",
              note: {
                es: "El mismo que sirve Caudal, con otro dominio y su propio certificado.",
                en: "The same one serving Caudal, on a different domain with its own certificate.",
              },
            },
          ],
        },
        {
          id: "app",
          label: { es: "Aplicación", en: "Application" },
          nodes: [
            {
              name: "React + Vite (build estático)",
              note: {
                es: "Archivos ya compilados. No hay proceso de Node corriendo en producción.",
                en: "Pre-built files. There's no Node process running in production.",
              },
            },
            {
              name: "Django REST Framework",
              note: {
                es: "API de solo lectura, sin autenticación. UUID como clave primaria.",
                en: "Read-only API, no authentication. UUIDs as primary keys.",
              },
            },
          ],
        },
        {
          id: "data",
          label: { es: "Datos", en: "Data" },
          nodes: [{ name: "PostgreSQL 16" }],
        },
      ],
      notes: {
        es: [
          "Los nombres de contenedores y volúmenes siguen una convención obligatoria: el respaldo del servidor descubre qué hacer a partir de ellos, y una aplicación que no la respeta queda sin backup en silencio.",
          "Se despliega desde un clon de git con una clave de despliegue de solo lectura, así el servidor no tiene permisos de escritura sobre el repositorio.",
        ],
        en: [
          "Container and volume names follow a mandatory convention: the server's backup discovers what to do from them, and an app that ignores it silently goes unbacked-up.",
          "Deployed from a git clone with a read-only deploy key, so the server has no write access to the repository.",
        ],
      },
    },
    learned: {
      es: "Que la segunda aplicación en un servidor es la que revela si el trabajo de infraestructura estaba bien hecho. Con una sola app, muchas decisiones parecen opcionales; con dos, cada una que faltaba se nota.",
      en: "That the second application on a server is what reveals whether the infrastructure work was done properly. With one app many decisions look optional; with two, every missing one shows.",
    },
    next: {
      es: "Servir las imágenes subidas directamente desde el proxy, y ampliar los filtros del catálogo.",
      en: "Serving uploaded images straight from the proxy, and expanding catalogue filters.",
    },
    highlights: {
      es: [
        "Sitio de cliente, en producción",
        "API REST de solo lectura, sin autenticación",
        "Desplegado desde un clon de git con deploy key de solo lectura",
      ],
      en: [
        "Client site, in production",
        "Read-only REST API, no authentication",
        "Deployed from a git clone with a read-only deploy key",
      ],
    },
    links: [
      {
        kind: "demo",
        href: "https://jacintalynch.art",
        label: { es: "Ver en vivo", en: "View live" },
      },
    ],
    media: { frame: "browser" },
  },

  {
    slug: "coproduce",
    name: "CoProduce",
    status: "discontinued",
    order: 3,
    tagline: {
      es: "Co-producción musical remota sobre Ableton Live.",
      en: "Remote music co-production over Ableton Live.",
    },
    problem: {
      es: "Dos productores que trabajan a distancia hoy usan Zoom: uno comparte pantalla, el otro mira y describe con palabras lo que quiere cambiar. El audio de la videollamada está procesado para voz —cancelación de eco, supresión de ruido, control de ganancia— así que la música llega irreconocible.",
      en: "Two producers working remotely today use Zoom: one shares a screen, the other watches and describes changes out loud. The call's audio is processed for speech — echo cancellation, noise suppression, gain control — so the music arrives unrecognisable.",
    },
    what: {
      es: "Una aplicación de escritorio que conecta las dos máquinas con un código de sala: uno ve, escucha y opera la sesión de Ableton del otro como si el proyecto estuviera abierto en su propia computadora.",
      en: "A desktop app that connects both machines with a room code: one person sees, hears and operates the other's Ableton session as if the project were open on their own computer.",
    },
    stack: ["TypeScript", "Electron", "WebRTC", "Node.js", "pnpm workspaces"],
    challenge: {
      title: {
        es: "Transmitir música, no voz",
        en: "Streaming music, not speech",
      },
      body: {
        es: "Todo el stack de audio en tiempo real de la web está afinado para llamadas: asume que lo que viaja es una persona hablando y aplica procesamiento que destruye una mezcla. Hay que desactivar explícitamente el control automático de ganancia, la cancelación de eco y la supresión de ruido, y forzar el códec a modo música con bitrate alto. Del otro lado, capturar la salida de Ableton en macOS necesita un driver de audio virtual que el sistema no trae, así que la app tiene que detectar si falta y guiar la instalación en vez de fallar sin explicación.",
        en: "The entire real-time web audio stack is tuned for calls: it assumes a person talking and applies processing that destroys a mix. Automatic gain control, echo cancellation and noise suppression all have to be explicitly disabled, and the codec forced into music mode at high bitrate. On the other end, capturing Ableton's output on macOS needs a virtual audio driver the system doesn't ship, so the app has to detect its absence and walk the user through installing it rather than failing without explanation.",
      },
    },
    decisions: [
      {
        choice: { es: "Conexión directa entre pares, con relay de reserva", en: "Direct peer-to-peer, with relay fallback" },
        instead: { es: "pasar siempre por un servidor", en: "always routing through a server" },
        because: {
          es: "La latencia es el único requisito que importa acá. Un salto extra por un servidor intermedio agrega retardo justo donde se nota. El relay existe solo para cuando la conexión directa no se puede establecer.",
          en: "Latency is the only requirement that matters here. An extra hop through an intermediate server adds delay exactly where it's noticeable. The relay exists only for when a direct connection can't be established.",
        },
      },
    ],
    discontinuedReason: {
      title: {
        es: "Lo di de baja funcionando, y ese fue el punto",
        en: "I shut it down while it worked, and that was the point",
      },
      body: {
        es: "Llegué a tener un instalador funcionando: control remoto de la máquina del otro y audio en tiempo real con calidad de música, las dos cosas resueltas. Investigando el mercado encontré Muse, que hace exactamente esto y lleva años de desarrollo. Seguir habría sido construir una versión peor de algo que ya existe, para un problema que ya estaba resuelto. Frené ahí. La parte difícil —entender por qué el audio de las videollamadas destruye una mezcla, y cómo evitarlo— la aprendí igual, y me la llevo.",
        en: "I got as far as a working installer: remote control of the other machine and real-time music-quality audio, both solved. While researching the market I found Muse, which does exactly this and has years of development behind it. Continuing would have meant building a worse version of something that already exists, for a problem that was already solved. I stopped there. The hard part — understanding why video-call audio destroys a mix, and how to avoid it — I learned anyway, and that stays with me.",
      },
    },
    learned: {
      es: "Dos cosas. La técnica: que los valores por defecto de una plataforma codifican un caso de uso, y salirse de ese caso implica desactivar a mano cada cosa que fue pensada para ayudar. La otra, más incómoda y más útil: que investigar el mercado antes de escribir código habría ahorrado semanas, y que reconocerlo tarde igual es mejor que no reconocerlo.",
      en: "Two things. The technical one: a platform's defaults encode a use case, and stepping outside it means manually disabling everything designed to help. The other, less comfortable and more useful: researching the market before writing code would have saved weeks, and realising it late still beats not realising it.",
    },
    next: {
      es: "Nada. Está cerrado a propósito.",
      en: "Nothing. It's closed on purpose.",
    },
    highlights: {
      es: [
        "Llegó a instalador funcionando en Windows y macOS",
        "Control remoto y audio en tiempo real, ambos resueltos",
        "Dado de baja por decisión de producto, no por problemas técnicos",
      ],
      en: [
        "Reached a working installer on Windows and macOS",
        "Remote control and real-time audio, both solved",
        "Shut down as a product decision, not for technical reasons",
      ],
    },
    links: [],
  },

  {
    slug: "gardenia-aromas",
    name: "Gardenia Aromas",
    status: "development",
    order: 4,
    tagline: {
      es: "E-commerce de velas y aromas.",
      en: "Candles and home fragrance e-commerce.",
    },
    problem: {
      es: "Un emprendimiento que vende por mensajes directos pierde ventas fuera de horario y gasta el día respondiendo el mismo precio y stock. Sin catálogo propio no hay carrito, no hay pago y no hay historial.",
      en: "A business selling through direct messages loses after-hours sales and spends the day repeating the same price and stock answers. With no catalogue of its own there's no cart, no payment and no history.",
    },
    what: {
      es: "Tienda con catálogo, carrito, cuentas de cliente, pagos y un panel de administración para gestionar productos y pedidos.",
      en: "A store with catalogue, cart, customer accounts, payments and an admin dashboard to manage products and orders.",
    },
    stack: ["Python", "Django", "PostgreSQL", "Docker"],
    challenge: {
      title: {
        es: "El catálogo pesa más que el código",
        en: "The catalogue weighs more than the code",
      },
      body: {
        es: "Un e-commerce de producto físico vive de las fotos, y las fotos cambian la ecuación de infraestructura: el respaldo deja de ser un archivo de treinta kilobytes y pasa a ser gigabytes que se repiten en cada copia. Es el motivo por el que este proyecto todavía no está desplegado — la estrategia de backup que sirve para las otras dos aplicaciones no escala a esta, y desplegarlo antes de resolver eso sería crear un problema en producción a propósito.",
        en: "A physical-product store lives on photos, and photos change the infrastructure equation: a backup stops being a thirty-kilobyte file and becomes gigabytes repeated across every copy. That's why this project isn't deployed yet — the backup strategy that works for the other two applications doesn't scale to this one, and deploying before solving that would be knowingly creating a production problem.",
      },
    },
    decisions: [
      {
        choice: { es: "Postergar el despliegue", en: "Postponing the deployment" },
        instead: { es: "publicarlo y resolver los backups después", en: "shipping it and solving backups later" },
        because: {
          es: "Publicar una tienda con pedidos reales y sin una estrategia de respaldo que soporte su volumen es aceptar una pérdida de datos futura. La fecha de lanzamiento es negociable; eso no.",
          en: "Shipping a store with real orders and no backup strategy that handles its volume is accepting a future data loss. The launch date is negotiable; that isn't.",
        },
      },
    ],
    learned: {
      es: "Que la decisión de infraestructura correcta a veces es no desplegar todavía.",
      en: "That sometimes the right infrastructure decision is not to deploy yet.",
    },
    next: {
      es: "Resolver el respaldo incremental de imágenes antes de subirlo al servidor.",
      en: "Solving incremental image backup before putting it on the server.",
    },
    highlights: {
      es: ["Catálogo, carrito, cuentas, pagos y panel"],
      en: ["Catalogue, cart, accounts, payments and dashboard"],
    },
    links: [],
  },
];

export const productionProjects = projects
  .filter((p) => p.status === "production")
  .sort((a, b) => a.order - b.order);

/**
 * Los discontinuados van acá junto a los que siguen en curso: separarlos en
 * su propia sección les daría un peso que no tienen, y esconderlos sería
 * perder la historia de por qué se frenaron, que es la parte interesante.
 */
export const otherProjects = projects
  .filter((p) => p.status !== "production")
  .sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
