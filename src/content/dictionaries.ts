import type { Locale } from "@/lib/i18n";

/**
 * Textos de la interfaz. El contenido con sustancia (proyectos, experiencia)
 * vive en sus propios archivos con los dos idiomas juntos, para que una
 * traducción no pueda quedar huérfana de su original.
 *
 * El español define la forma del diccionario y el inglés está obligado a
 * cumplirla: si se agrega una clave acá y se olvida allá, el build falla.
 * Por eso no lleva `as const` — congelaría los textos como tipos literales
 * y ninguna traducción podría satisfacerlos.
 */
const es = {
  nav: {
    projects: "Proyectos",
    infra: "Infraestructura",
    experience: "Experiencia",
    stack: "Stack",
    notes: "Notas",
    contact: "Contacto",
    skipToContent: "Saltar al contenido",
  },
  hero: {
    availableLabel: "Disponibilidad",
    statusTitle: "Mis sitios, ahora mismo",
    statusChecking: "Consultando…",
    statusUnreachable: "Sin respuesta",
    statusHint: "Estado consultado en vivo al cargar esta página.",
    ctaProjects: "Ver proyectos",
    ctaCV: "Descargar CV",
  },
  about: {
    title: "Sobre mí",
    yearsLabel: "años de experiencia profesional",
    appsLabel: "aplicaciones propias en producción",
    serverLabel: "servidor propio, administrado por mí",
    languagesLabel: "Idiomas",
  },
  projects: {
    title: "Proyectos",
    productionTitle: "En producción",
    productionNote: "Desplegados en mi servidor y funcionando ahora.",
    developmentTitle: "En desarrollo",
    problemLabel: "El problema",
    whatLabel: "Qué hace",
    stackLabel: "Stack",
    challengeLabel: "El desafío",
    decisionsLabel: "Decisiones técnicas",
    decisionInstead: "en vez de",
    decisionBecause: "Porque",
    learnedLabel: "Qué aprendí",
    nextLabel: "Qué sigue",
    viewCase: "Ver el caso completo",
    backToProjects: "Volver a proyectos",
    statusProduction: "En producción",
    statusDevelopment: "En desarrollo",
    statusDiscontinued: "Discontinuado",
    otherTitle: "Otros proyectos",
    architectureLabel: "Arquitectura",
    architectureNotes: "Decisiones de infraestructura",
    discontinuedLabel: "Por qué lo di de baja",
    highlightsLabel: "En resumen",
  },
  infra: {
    title: "Infraestructura",
    lede: "No dependo de una plataforma para que mi código exista. Alquilé un servidor, lo aseguré, lo documenté y ahí corren mis aplicaciones.",
    readMore: "Ver cómo está armado",
    serverLabel: "El servidor",
    topologyTitle: "Cómo está armado",
    pillarsTitle: "Lo que sostiene el servidor",
    decisionsTitle: "Decisiones, y por qué",
    decisionInstead: "En vez de",
    limitationsTitle: "Lo que todavía no está resuelto",
    limitationsLede: "Publico esto a propósito. Un servidor sin puntos débiles conocidos es un servidor que no se auditó.",
    revisitLabel: "Cuándo lo resuelvo",
  },
  experience: {
    title: "Experiencia",
    educationTitle: "Formación",
    expand: "Ver detalle",
    collapse: "Ocultar detalle",
    present: "presente",
  },
  stack: {
    title: "Stack",
    lede: "Sin barras de porcentaje: cada tecnología dice dónde la usé.",
    whereLabel: "Dónde",
  },
  notes: {
    title: "Notas técnicas",
    lede: "Cosas que encontré resolviendo problemas reales.",
    readingTime: "min de lectura",
    empty: "Todavía no hay notas publicadas.",
  },
  contact: {
    title: "Contacto",
    emailLabel: "Email",
    emailCopy: "Copiar dirección",
    emailCopied: "Copiado",
    cvLabel: "CV en PDF",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },
  footer: {
    builtWith: "Construido con Next.js y desplegado en mi propio VPS.",
    source: "Código de este sitio",
    rights: "Todos los derechos reservados.",
  },
  langSwitch: {
    label: "Cambiar idioma",
    toEnglish: "English",
    toSpanish: "Español",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  nav: {
    projects: "Projects",
    infra: "Infrastructure",
    experience: "Experience",
    stack: "Stack",
    notes: "Notes",
    contact: "Contact",
    skipToContent: "Skip to content",
  },
  hero: {
    availableLabel: "Availability",
    statusTitle: "My sites, right now",
    statusChecking: "Checking…",
    statusUnreachable: "No response",
    statusHint: "Status checked live when this page loaded.",
    ctaProjects: "View projects",
    ctaCV: "Download CV",
  },
  about: {
    title: "About",
    yearsLabel: "years of professional experience",
    appsLabel: "of my own applications in production",
    serverLabel: "server of my own, administered by me",
    languagesLabel: "Languages",
  },
  projects: {
    title: "Projects",
    productionTitle: "In production",
    productionNote: "Deployed on my server and running right now.",
    developmentTitle: "In development",
    problemLabel: "The problem",
    whatLabel: "What it does",
    stackLabel: "Stack",
    challengeLabel: "The hard part",
    decisionsLabel: "Technical decisions",
    decisionInstead: "instead of",
    decisionBecause: "Because",
    learnedLabel: "What I learned",
    nextLabel: "What's next",
    viewCase: "Read the full case",
    backToProjects: "Back to projects",
    statusProduction: "In production",
    statusDevelopment: "In development",
    statusDiscontinued: "Discontinued",
    otherTitle: "Other projects",
    architectureLabel: "Architecture",
    architectureNotes: "Infrastructure decisions",
    discontinuedLabel: "Why I shut it down",
    highlightsLabel: "In short",
  },
  infra: {
    title: "Infrastructure",
    lede: "I don't depend on a platform for my code to exist. I rent a server, hardened it, documented it, and that's where my applications run.",
    readMore: "See how it's put together",
    serverLabel: "The server",
    topologyTitle: "How it's put together",
    pillarsTitle: "What holds the server up",
    decisionsTitle: "Decisions, and why",
    decisionInstead: "Instead of",
    limitationsTitle: "What isn't solved yet",
    limitationsLede: "I publish this on purpose. A server with no known weak points is a server nobody audited.",
    revisitLabel: "When I'll fix it",
  },
  experience: {
    title: "Experience",
    educationTitle: "Education",
    expand: "Show detail",
    collapse: "Hide detail",
    present: "present",
  },
  stack: {
    title: "Stack",
    lede: "No percentage bars: every technology says where I used it.",
    whereLabel: "Where",
  },
  notes: {
    title: "Technical notes",
    lede: "Things I found while solving real problems.",
    readingTime: "min read",
    empty: "No notes published yet.",
  },
  contact: {
    title: "Contact",
    emailLabel: "Email",
    emailCopy: "Copy address",
    emailCopied: "Copied",
    cvLabel: "CV as PDF",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },
  footer: {
    builtWith: "Built with Next.js and deployed on my own VPS.",
    source: "Source of this site",
    rights: "All rights reserved.",
  },
  langSwitch: {
    label: "Change language",
    toEnglish: "English",
    toSpanish: "Español",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
