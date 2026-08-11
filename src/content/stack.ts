import type { Localized } from "@/lib/i18n";

/**
 * Nada de barras de porcentaje ni estrellas: la autoevaluación no se puede
 * verificar y le resta credibilidad a quien la publica. Cada tecnología
 * declara DÓNDE se usó. Eso sí es comprobable.
 */
export type Tech = {
  name: string;
  /** Dónde se usó realmente: trabajos y proyectos, en texto corto. */
  evidence: Localized;
  /** Marca las que son el núcleo del perfil. */
  core?: boolean;
};

export type TechGroup = {
  id: string;
  title: Localized;
  items: Tech[];
};

export const stack: TechGroup[] = [
  {
    id: "backend",
    title: { es: "Backend", en: "Backend" },
    items: [
      {
        name: "Python",
        core: true,
        evidence: { es: "Adhoc, Solvo, Caudal, Gardenia, Globalbitz", en: "Adhoc, Solvo, Caudal, Gardenia, Globalbitz" },
      },
      {
        name: "Allplan · PythonParts",
        evidence: { es: "Globalbitz · geometría 3D paramétrica", en: "Globalbitz · parametric 3D geometry" },
      },
      {
        name: "Django",
        core: true,
        evidence: { es: "Caudal, CuadrosJaci, Gardenia", en: "Caudal, CuadrosJaci, Gardenia" },
      },
      {
        name: "Django REST Framework",
        evidence: { es: "CuadrosJaci", en: "CuadrosJaci" },
      },
      {
        name: "Odoo",
        core: true,
        evidence: { es: "Adhoc · localización fiscal argentina", en: "Adhoc · Argentine fiscal localisation" },
      },
      {
        name: "Node.js · Express",
        evidence: { es: "Freelance", en: "Freelance" },
      },
      {
        name: "APIs REST",
        evidence: { es: "CuadrosJaci", en: "CuadrosJaci" },
      },
      {
        name: "gunicorn",
        evidence: { es: "Caudal y CuadrosJaci en producción", en: "Caudal and CuadrosJaci in production" },
      },
    ],
  },
  {
    id: "data",
    title: { es: "Datos", en: "Data" },
    items: [
      {
        name: "PostgreSQL",
        core: true,
        evidence: { es: "Adhoc, Caudal, CuadrosJaci, Gardenia", en: "Adhoc, Caudal, CuadrosJaci, Gardenia" },
      },
      {
        name: "SQL",
        evidence: { es: "Consultas y modelado en todos los proyectos", en: "Queries and modelling across every project" },
      },
      {
        name: "Migraciones y respaldos",
        evidence: { es: "Migración completa de base entre proveedores, con verificación", en: "Full cross-provider database migration, verified" },
      },
      {
        name: "SQLite",
        evidence: { es: "Caudal en desarrollo local", en: "Caudal in local development" },
      },
    ],
  },
  {
    id: "infra",
    title: { es: "Infraestructura", en: "Infrastructure" },
    items: [
      {
        name: "Docker",
        core: true,
        evidence: { es: "Solvo y las tres apps propias", en: "Solvo and all three of my own apps" },
      },
      {
        name: "Linux",
        core: true,
        evidence: { es: "Ubuntu Server · administración y hardening", en: "Ubuntu Server · administration and hardening" },
      },
      {
        name: "Caddy",
        evidence: { es: "Reverse proxy y TLS de mis dos dominios", en: "Reverse proxy and TLS for both my domains" },
      },
      {
        name: "systemd",
        evidence: { es: "Timers de backup y mantenimiento programado", en: "Backup timers and scheduled maintenance" },
      },
      {
        name: "ufw · SSH",
        evidence: { es: "Firewall, claves ed25519, acceso sin contraseña", en: "Firewall, ed25519 keys, password-less access" },
      },
    ],
  },
  {
    id: "frontend",
    title: { es: "Frontend", en: "Frontend" },
    items: [
      {
        name: "TypeScript",
        core: true,
        evidence: { es: "CoProduce, este sitio", en: "CoProduce, this site" },
      },
      {
        name: "React",
        core: true,
        evidence: { es: "CuadrosJaci, freelance", en: "CuadrosJaci, freelance" },
      },
      {
        name: "Next.js",
        evidence: { es: "Este sitio", en: "This site" },
      },
      {
        name: "HTMX · Alpine",
        evidence: { es: "Caudal · carga en dos toques sin SPA", en: "Caudal · two-tap entry without a SPA" },
      },
      {
        name: "HTML · CSS",
        evidence: { es: "Todos los proyectos con interfaz propia", en: "Every project with its own interface" },
      },
    ],
  },
  {
    id: "tools",
    title: { es: "Herramientas y práctica", en: "Tooling and practice" },
    items: [
      {
        name: "Git",
        core: true,
        evidence: { es: "Versionado con ramas y tags por release", en: "Versioning with per-release branches and tags" },
      },
      {
        name: "pytest",
        evidence: { es: "Caudal, CuadrosJaci, Gardenia", en: "Caudal, CuadrosJaci, Gardenia" },
      },
      {
        name: "ruff · uv",
        evidence: { es: "Caudal", en: "Caudal" },
      },
      {
        name: "POO y patrones de diseño",
        evidence: { es: "Base de la formación en UTN, aplicada en Python y JavaScript", en: "Core of my UTN training, applied in Python and JavaScript" },
      },
      {
        name: "Agile · Scrum",
        evidence: { es: "Adhoc", en: "Adhoc" },
      },
    ],
  },
];

/** Se muestra aparte: no es una tecnología, pero pesa en una búsqueda remota. */
export const languages = [
  {
    name: { es: "Español", en: "Spanish" } satisfies Localized,
    level: { es: "Nativo", en: "Native" } satisfies Localized,
  },
  {
    name: { es: "Inglés", en: "English" } satisfies Localized,
    level: {
      es: "Profesional · código, documentación y equipo a diario",
      en: "Professional · daily code, documentation and teamwork",
    } satisfies Localized,
  },
];
