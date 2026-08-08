import type { Localized, LocalizedList } from "@/lib/i18n";

export type Role = {
  id: string;
  /** Localizado porque "Independiente" sí se traduce; los nombres propios no. */
  company: Localized;
  /** Contexto de la empresa, cuando el nombre solo no dice nada. */
  companyNote?: Localized;
  title: Localized;
  location: Localized;
  start: string;
  end: string | null;
  startLabel: Localized;
  endLabel: Localized;
  /**
   * El logro que más pesa, mostrado siempre.
   * El resto queda plegado: el recruiter lee cuatro líneas,
   * el tech lead abre la que le interesa.
   */
  headline: Localized;
  details: LocalizedList;
  stack: string[];
};

export const roles: Role[] = [
  {
    id: "adhoc",
    company: { es: "Adhoc S.A.", en: "Adhoc S.A." },
    companyNote: {
      es: "Partner oficial de Odoo",
      en: "Official Odoo Partner",
    },
    title: {
      es: "Desarrollador Python · Odoo",
      en: "Python Developer · Odoo",
    },
    location: { es: "Rosario, Argentina", en: "Rosario, Argentina" },
    start: "2024-05",
    end: null,
    startLabel: { es: "may 2024", en: "May 2024" },
    endLabel: { es: "presente", en: "present" },
    headline: {
      es: "Traduzco requerimientos contables y fiscales complejos —incluida la localización fiscal argentina— en soluciones técnicas que escalan.",
      en: "I translate complex accounting and tax requirements — including Argentine fiscal localisation — into technical solutions that scale.",
    },
    details: {
      es: [
        "Desarrollo backend en Python sobre una plataforma web de gran escala: programación, personalización y mantenimiento de módulos adaptados al negocio.",
        "Modelado de datos y consultas sobre PostgreSQL a través del ORM del framework, asegurando integridad y consistencia en flujos financieros críticos.",
        "Depuración directa del código fuente nativo del framework, no solo de los módulos propios: identifico la causa raíz en lugar de aplicar parches superficiales.",
        "Refactorización y optimización de sistemas en producción, automatizando flujos y reduciendo tiempos de procesamiento.",
      ],
      en: [
        "Backend Python development on a large-scale web platform: building, customising and maintaining modules adapted to business needs.",
        "Data modelling and queries over PostgreSQL through the framework's ORM, ensuring integrity and consistency across critical financial flows.",
        "Debugging the framework's own source, not just our modules: I find the root cause instead of applying surface patches.",
        "Refactoring and optimising production systems, automating flows and cutting processing times.",
      ],
    },
    stack: ["Python", "Odoo", "PostgreSQL", "ORM", "Linux"],
  },
  {
    id: "globalbitz",
    company: { es: "Globalbitz", en: "Globalbitz" },
    companyNote: { es: "España · remoto", en: "Spain · remote" },
    title: {
      es: "Desarrollador Full Stack (freelance)",
      en: "Full Stack Developer (freelance)",
    },
    location: { es: "Remoto", en: "Remote" },
    start: "2025-07",
    end: "2025-11",
    startLabel: { es: "jul 2025", en: "Jul 2025" },
    endLabel: { es: "nov 2025", en: "Nov 2025" },
    headline: {
      es: "Entregué aplicaciones web de punta a punta con un equipo internacional, trabajando en inglés y con ejecución autónoma.",
      en: "Delivered web applications end to end with an international team, working in English with autonomous execution.",
    },
    details: {
      es: [
        "React y TypeScript en el frontend, Node.js en el backend, desde el diseño de componentes hasta la puesta en producción.",
        "APIs REST, lógica de negocio del lado del servidor y manejo de estado y datos entre cliente y servidor.",
        "Tipado estático como herramienta de mantenibilidad: menos errores en tiempo de ejecución a medida que el proyecto crecía.",
        "Docker para contenerización, desarrollo local y despliegues consistentes entre entornos.",
      ],
      en: [
        "React and TypeScript on the frontend, Node.js on the backend, from component design through to production.",
        "REST APIs, server-side business logic, and state and data handling between client and server.",
        "Static typing as a maintainability tool: fewer runtime errors as the project grew.",
        "Docker for containerisation, local development and consistent deploys across environments.",
      ],
    },
    stack: ["TypeScript", "React", "Node.js", "Express", "Docker"],
  },
  {
    id: "solvo",
    company: { es: "Solvo", en: "Solvo" },
    title: {
      es: "Desarrollador Python",
      en: "Python Developer",
    },
    location: { es: "Rosario, Argentina", en: "Rosario, Argentina" },
    start: "2023-03",
    end: "2024-04",
    startLabel: { es: "mar 2023", en: "Mar 2023" },
    endLabel: { es: "abr 2024", en: "Apr 2024" },
    headline: {
      es: "Fui el puente entre el negocio y la parte técnica: traducía requerimientos en software funcional y explicaba resultados a gente no técnica.",
      en: "I bridged business and engineering: turning requirements into working software and explaining outcomes to non-technical stakeholders.",
    },
    details: {
      es: [
        "Módulos personalizados en Python y soluciones orientadas al cliente, con foco en POO y código reutilizable.",
        "Entornos containerizados con Docker para desarrollo y despliegue.",
      ],
      en: [
        "Custom Python modules and client-facing solutions, focused on OOP and reusable code.",
        "Containerised environments with Docker for development and deployment.",
      ],
    },
    stack: ["Python", "POO", "Docker"],
  },
  {
    id: "freelance",
    company: { es: "Independiente", en: "Independent" },
    title: {
      es: "Desarrollador Web Full Stack (freelance)",
      en: "Full Stack Web Developer (freelance)",
    },
    location: { es: "Argentina", en: "Argentina" },
    start: "2022-10",
    end: "2023-02",
    startLabel: { es: "oct 2022", en: "Oct 2022" },
    endLabel: { es: "feb 2023", en: "Feb 2023" },
    headline: {
      es: "Me hice cargo del ciclo completo con el cliente: relevamiento, desarrollo, despliegue y soporte.",
      en: "I owned the full cycle with the client: discovery, development, deployment and support.",
    },
    details: {
      es: [
        "Proyectos web de principio a fin, desde sitios informativos hasta e-commerce, con React en el frontend y Express en el backend.",
        "Incorporé TypeScript desde esta primera etapa freelance, adoptando el tipado estático como estándar propio.",
      ],
      en: [
        "Web projects end to end, from informational sites to e-commerce, with React on the frontend and Express on the backend.",
        "Adopted TypeScript from this first freelance stage, making static typing my own standard.",
      ],
    },
    stack: ["React", "Express", "TypeScript", "JavaScript"],
  },
];

export const education = {
  institution: "Universidad Tecnológica Nacional (UTN)",
  location: { es: "Rosario, Argentina", en: "Rosario, Argentina" },
  degree: {
    es: "Tecnicatura Universitaria en Programación",
    en: "University Technical Degree in Programming",
  } satisfies Localized,
  startLabel: { es: "feb 2023", en: "Feb 2023" } satisfies Localized,
  endLabel: { es: "may 2026", en: "May 2026" } satisfies Localized,
  detail: {
    es: "POO, estructuras de datos, bases de datos, redes y arquitectura de sistemas.",
    en: "OOP, data structures, databases, networking and systems architecture.",
  } satisfies Localized,
};

/**
 * Años de experiencia profesional desde el primer trabajo (oct 2022).
 * Se redondea, igual que en el CV: a 3 años y 10 meses ya se le dice "4 años",
 * y el número tiene que coincidir con el que lee el recruiter en el PDF.
 */
export function yearsOfExperience(from = "2022-10"): number {
  const [y, m] = from.split("-").map(Number);
  const start = new Date(y, m - 1);
  const now = new Date();
  return Math.round(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );
}
