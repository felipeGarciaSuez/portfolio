import type { Architecture } from "./projects";
import type { Localized, LocalizedList } from "@/lib/i18n";

/**
 * Sección de infraestructura.
 *
 * REGLA INNEGOCIABLE: este archivo se escribe desde cero para la web. No se
 * copian fragmentos del repo `infra`, porque ese repo contiene datos que no
 * pueden publicarse: IP y hostname del servidor, machine ID, fingerprints de
 * claves SSH, el contenido de authorized_keys, la existencia de una ruta de
 * admin oculta, y el camino de acceso de emergencia. Nada de eso entra acá.
 *
 * Lo que sí va: la arquitectura, las decisiones y su porqué. Que es,
 * justamente, la parte interesante.
 */

export const infraIntro: Localized = {
  es: "Alquilé un VPS, lo aseguré y ahí corren mis aplicaciones. No es un detalle de implementación: es la diferencia entre escribir código y sostener un producto. Abajo está cómo está armado y por qué cada pieza está donde está.",
  en: "I rent a VPS, I hardened it, and that's where my applications run. It isn't an implementation detail: it's the difference between writing code and keeping a product alive. Below is how it's put together and why each piece is where it is.",
};

/** Descripción genérica del servidor: sin proveedor, sin plan, sin identificadores. */
export const serverSpec: Localized = {
  es: "Un VPS de 2 vCPU y 8 GB de RAM, con Ubuntu Server LTS. Sin panel de control.",
  en: "A 2 vCPU, 8 GB RAM VPS running Ubuntu Server LTS. No control panel.",
};

export const topology: Architecture = {
  summary: {
    es: "Dos aplicaciones distintas, con dominios distintos, compartiendo un solo servidor. El único proceso que escucha en internet es el reverse proxy; todo lo demás se habla por redes internas de Docker que no salen a ningún lado.",
    en: "Two separate applications, on separate domains, sharing a single server. The only process listening on the internet is the reverse proxy; everything else talks over internal Docker networks that go nowhere else.",
  },
  tiers: [
    {
      id: "edge",
      label: { es: "Borde — expuesto a internet", en: "Edge — exposed to the internet" },
      nodes: [
        {
          name: "Caddy",
          note: {
            es: "Los únicos puertos abiertos del servidor son 80, 443 y SSH. Emite y renueva los certificados TLS de los dos dominios sin intervención.",
            en: "The server's only open ports are 80, 443 and SSH. It issues and renews TLS certificates for both domains with no intervention.",
          },
        },
      ],
    },
    {
      id: "apps",
      label: { es: "Aplicaciones — red compartida", en: "Applications — shared network" },
      nodes: [
        {
          name: "caudal-web",
          note: {
            es: "gunicorn + Django. Sin puertos publicados: Caddy lo alcanza por el nombre del servicio.",
            en: "gunicorn + Django. No published ports: Caddy reaches it by service name.",
          },
        },
        {
          name: "cuadrosjaci-web",
          note: {
            es: "API de Django REST Framework. El frontend son archivos estáticos que sirve el proxy.",
            en: "Django REST Framework API. The frontend is static files served by the proxy.",
          },
        },
      ],
    },
    {
      id: "data",
      label: { es: "Datos — redes aisladas, una por app", en: "Data — isolated networks, one per app" },
      nodes: [
        {
          name: "caudal-db",
          note: {
            es: "PostgreSQL. Verificado que no responde desde la red del proxy: solo lo alcanza su propia aplicación.",
            en: "PostgreSQL. Verified it doesn't answer from the proxy's network: only its own application can reach it.",
          },
        },
        {
          name: "cuadrosjaci-db",
          note: {
            es: "PostgreSQL, en su propia red. Una app comprometida no llega a la base de la otra.",
            en: "PostgreSQL, on its own network. A compromised app can't reach the other one's database.",
          },
        },
      ],
    },
  ],
};

export type InfraPillar = {
  id: string;
  title: Localized;
  /** Una frase que entiende cualquiera. */
  summary: Localized;
  /** El detalle, para quien quiera el fondo. */
  points: LocalizedList;
};

export const pillars: InfraPillar[] = [
  {
    id: "hardening",
    title: { es: "Acceso", en: "Access" },
    summary: {
      es: "La única forma de entrar al servidor por red es una clave criptográfica. No hay contraseña que adivinar.",
      en: "The only way into the server over the network is a cryptographic key. There's no password to guess.",
    },
    points: {
      es: [
        "El login de root por SSH está cerrado, y la autenticación por contraseña también.",
        "El usuario de trabajo se creó directamente sin contraseña: no existe una que se pueda filtrar.",
        "Firewall en denegar-todo por defecto. Los únicos puertos abiertos a internet son SSH, 80 y 443, y los tres tienen dueño conocido.",
        "Actualizaciones de seguridad desatendidas, activas y verificadas.",
      ],
      en: [
        "Root SSH login is closed, and so is password authentication.",
        "The working account was created with no password at all: there isn't one that could leak.",
        "Firewall defaults to deny-all. The only ports open to the internet are SSH, 80 and 443, and all three have a known owner.",
        "Unattended security upgrades, enabled and verified.",
      ],
    },
  },
  {
    id: "backups",
    title: { es: "Respaldos", en: "Backups" },
    summary: {
      es: "Respaldo diario automático, y la restauración se prueba de verdad en vez de asumirse.",
      en: "Automatic daily backup, and the restore is actually tested instead of assumed.",
    },
    points: {
      es: [
        "Un timer de systemd, no cron: si el servidor estaba apagado a la hora prevista, el timer corre la tarea al arrancar. Cron simplemente la saltea.",
        "Retención escalonada: diarios, semanales y mensuales. Responde a una amenaza distinta del disco muerto — un import que duplica todo se descubre semanas después, y ahí lo que salva es la profundidad del historial.",
        "El verificador restaura el dump en una base descartable y compara las filas contra el origen. Un dump que 'no falló' y un respaldo que sirve no son lo mismo.",
        "El verificador ignora a propósito las tablas volátiles, como las de sesión. Un verificador que grita lobo todos los días se termina ignorando, y ese es el peor resultado posible.",
      ],
      en: [
        "A systemd timer, not cron: if the server was off at the scheduled time, the timer runs the task at boot. Cron simply skips it.",
        "Tiered retention: daily, weekly and monthly. It answers a different threat than a dead disk — an import that duplicates everything gets noticed weeks later, and there what saves you is the depth of the history.",
        "The verifier restores the dump into a throwaway database and compares row counts against the source. A dump that 'didn't fail' and a backup that works are not the same thing.",
        "The verifier deliberately ignores volatile tables, like session storage. A verifier that cries wolf every day ends up ignored, and that's the worst possible outcome.",
      ],
    },
  },
  {
    id: "conventions",
    title: { es: "Convenciones", en: "Conventions" },
    summary: {
      es: "Los nombres de contenedores y volúmenes son obligatorios, porque el mantenimiento del servidor descubre qué hacer a partir de ellos.",
      en: "Container and volume names are mandatory, because the server's maintenance discovers what to do from them.",
    },
    points: {
      es: [
        "Una aplicación que respeta la convención queda respaldada y mantenida sola. Una que no la respeta queda sin backup en silencio: no hay error, simplemente no aparece. Es la peor clase de falla, y por eso la convención no es opcional.",
        "Ningún contenedor de aplicación o base publica puertos al host. La razón no es estética: Docker escribe reglas de iptables por debajo del firewall, así que publicar un puerto deja la base expuesta a internet aunque el firewall diga lo contrario.",
        "Límites de memoria y CPU por servicio. No es por ahorrar —sobra RAM— sino para que una aplicación con problemas no deje sin recursos a las demás.",
        "Rotación de logs en cada servicio. Sin eso los logs de Docker crecen sin techo y llenan el disco en silencio.",
      ],
      en: [
        "An application that follows the convention gets backed up and maintained automatically. One that doesn't goes unbacked-up silently: there's no error, it just never shows up. That's the worst kind of failure, which is why the convention isn't optional.",
        "No application or database container publishes ports to the host. The reason isn't aesthetic: Docker writes iptables rules beneath the firewall, so publishing a port leaves the database exposed to the internet even when the firewall says otherwise.",
        "Per-service memory and CPU limits. Not to save resources — there's RAM to spare — but so a misbehaving application can't starve the others.",
        "Log rotation on every service. Without it Docker's logs grow unbounded and silently fill the disk.",
      ],
    },
  },
];

export type InfraDecision = {
  id: string;
  title: Localized;
  /** Qué se descartó. */
  instead: Localized;
  why: Localized;
};

export const decisions: InfraDecision[] = [
  {
    id: "no-panel",
    title: { es: "Ubuntu pelado, sin panel de control", en: "Bare Ubuntu, no control panel" },
    instead: { es: "cPanel, Plesk, o un panel Docker-native", en: "cPanel, Plesk, or a Docker-native panel" },
    why: {
      es: "Los paneles tradicionales están pensados para hosting compartido de PHP: gestionan vhosts, cuentas FTP y bases por usuario, nada de lo cual aplica a un stack de contenedores. Además compiten por los puertos 80 y 443 y tocan la configuración de red del sistema, lo que rompe el bridge de Docker. Los paneles Docker-native sí eran opción real, pero agregan una abstracción más que hay que depurar además de la aplicación.",
      en: "Traditional panels are built for shared PHP hosting: they manage vhosts, FTP accounts and per-user databases, none of which applies to a container stack. They also compete for ports 80 and 443 and touch the system's network configuration, which breaks Docker's bridge. Docker-native panels were a real option, but they add one more abstraction to debug on top of the application.",
    },
  },
  {
    id: "two-phase",
    title: { es: "Cerrar el acceso viejo recién después de probar el nuevo", en: "Close the old access only after testing the new one" },
    instead: { es: "aplicar todo el hardening de una vez", en: "applying all the hardening in one pass" },
    why: {
      es: "Si el usuario nuevo no puede entrar o no tiene permisos, y ya cerraste el login de root, quedaste afuera del servidor. Verificar en el medio convierte un error irreversible en uno trivial.",
      en: "If the new account can't log in or lacks permissions, and you already closed root login, you're locked out of the server. Verifying in between turns an irreversible mistake into a trivial one.",
    },
  },
  {
    id: "rollback-timer",
    title: { es: "Un temporizador que revierte solo los cambios de SSH", en: "A timer that rolls back SSH changes on its own" },
    instead: { es: "confiar en la sesión abierta como red de seguridad", en: "trusting the open session as a safety net" },
    why: {
      es: "Validar la sintaxis de la configuración no comprueba que vos sigas pudiendo entrar: una regla mal escrita o un permiso raro pasan la validación y te dejan afuera igual. Antes de aplicar el cambio dejo programada su reversión automática a los 15 minutos, y la cancelo recién después de verificar el acceso en una sesión nueva. La sesión abierta sirve solo mientras no se cierre; el temporizador no depende de eso.",
      en: "Validating the config's syntax doesn't prove you can still get in: a badly written rule or an odd permission passes validation and locks you out anyway. Before applying the change I schedule its automatic rollback fifteen minutes out, and cancel it only after verifying access in a fresh session. The open session only helps while it stays open; the timer doesn't depend on that.",
    },
  },
  {
    id: "no-fail2ban",
    title: { es: "Sin fail2ban", en: "No fail2ban" },
    instead: { es: "instalarlo por costumbre", en: "installing it out of habit" },
    why: {
      es: "Con la autenticación por contraseña deshabilitada, la fuerza bruta no tiene contra qué acertar: su aporte queda reducido a limpiar ruido de los logs. Es una herramienta buena resolviendo un problema que acá no existe. Queda anotada la condición para revisarlo: si algún día expongo un servicio con login por contraseña, la decisión cambia.",
      en: "With password authentication disabled, brute force has nothing to hit: its contribution is reduced to cleaning log noise. It's a good tool solving a problem that doesn't exist here. The condition to revisit is written down: the day I expose a service with password login, the decision changes.",
    },
  },
  {
    id: "self-hosted-db",
    title: { es: "Mover la base de datos a mi propio servidor", en: "Moving the database to my own server" },
    instead: { es: "seguir en un Postgres gestionado con backups incluidos", en: "staying on managed Postgres with backups included" },
    why: {
      es: "Gané control sobre el dato más sensible del proyecto y latencia mínima: la aplicación y la base quedan en la misma red interna, sin salir a internet en cada consulta. El intercambio fue explícito y no gratuito: el proveedor gestionado venía cubriendo los respaldos, y desde la mudanza no los cubre nadie. Por eso los backups dejaron de ser una tarea pendiente y pasaron a ser bloqueantes.",
      en: "I gained control over the project's most sensitive data and minimal latency: the app and the database sit on the same internal network, without going out to the internet on every query. The trade was explicit and not free: the managed provider had been covering backups, and since the move nobody does. That's why backups stopped being a pending task and became blocking.",
    },
  },
  {
    id: "no-cloudflare",
    title: { es: "Sin Cloudflare adelante, por ahora", en: "No Cloudflare in front, for now" },
    instead: { es: "proxear el tráfico y ganar caché y protección DDoS gratis", en: "proxying traffic for free caching and DDoS protection" },
    why: {
      es: "Meter un segundo proxy delante choca con el bloqueo por IP de la aplicación, y hay que acertar tres cosas a la vez: el conteo de proxies de la librería de bloqueo, los rangos de confianza del reverse proxy, y el método de emisión del certificado. Si el conteo queda mal, el sistema bloquea la IP del proxy en vez de la del atacante — o directamente deja afuera a los usuarios legítimos. Tres cosas que hay que acertar juntas, en una app que todavía no había llegado a producción. A la escala actual, lo que se gana es marginal.",
      en: "Putting a second proxy in front collides with the app's IP-based blocking, and three things have to be right at once: the blocking library's proxy count, the reverse proxy's trusted ranges, and how the certificate gets issued. If the count is wrong, the system blocks the proxy's IP instead of the attacker's — or locks out legitimate users entirely. Three things to get right simultaneously, on an app that hadn't reached production yet. At the current scale, the gain is marginal.",
    },
  },
];

export type InfraLimitation = {
  id: string;
  title: Localized;
  body: Localized;
  /** Cuándo deja de ser aceptable. */
  revisitWhen: Localized;
};

/**
 * Las limitaciones conocidas van publicadas a propósito. Un ingeniero que
 * dice "sé que esto es un punto único de falla y esta es la condición para
 * resolverlo" transmite más criterio que uno que muestra solo lo resuelto.
 */
export const limitations: InfraLimitation[] = [
  {
    id: "offsite",
    title: {
      es: "Los respaldos todavía son solo locales",
      en: "Backups are still local only",
    },
    body: {
      es: "Los backups viven en el mismo disco que los datos. Eso cubre los errores lógicos —un import que duplica todo, un borrado accidental— que es la falla más frecuente. No cubre perder el servidor: si muere el disco, se van los datos y los respaldos juntos. Mientras tanto, el proveedor gestionado del que migré sigue encendido a propósito: al no haber copia fuera del servidor, esa base pasó a ser parte del diseño de respaldo y no un resto de la migración.",
      en: "The backups live on the same disk as the data. That covers logical errors — an import that duplicates everything, an accidental deletion — which is the most frequent failure. It does not cover losing the server: if the disk dies, data and backups go together. In the meantime, the managed provider I migrated from stays switched on deliberately: with no copy outside the server, that database became part of the backup design rather than a leftover of the migration.",
    },
    revisitWhen: {
      es: "Antes de apagar el proveedor anterior. Ese es el momento exacto en que la falta de copia externa pasa de aceptable a peligrosa.",
      en: "Before switching off the previous provider. That's the exact point where the missing off-site copy goes from acceptable to dangerous.",
    },
  },
];
