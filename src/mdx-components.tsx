import type { MDXComponents } from "mdx/types";

/**
 * Estilos de la prosa de las notas.
 *
 * Van acá y no con clases sueltas en cada archivo MDX porque el punto del
 * blog es que agregar un artículo sea escribir markdown y nada más: quien
 * escribe no debería tener que acordarse de ninguna clase.
 */
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 border-b border-line pb-2 text-2xl font-semibold tracking-[-0.02em]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 max-w-prose leading-relaxed text-ink-2">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 grid max-w-prose gap-2 border-l border-line pl-5 text-ink-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 grid max-w-prose list-decimal gap-2 pl-5 text-ink-2 marker:font-mono marker:text-ink-3">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
      className="text-accent underline underline-offset-4 hover:no-underline"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.88em] text-ink">
      {children}
    </code>
  ),
  /*
    El bloque de código scrollea dentro de su propio contenedor: sin esto,
    una línea larga hace que scrollee la página entera de costado.
  */
  pre: ({ children }) => (
    <pre className="mb-5 overflow-x-auto rounded-lg border border-line bg-surface/60 p-4 font-mono text-sm leading-relaxed text-ink-2">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-5 max-w-prose border-l-2 border-accent/50 pl-5 text-ink-2 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
