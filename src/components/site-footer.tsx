import type { Dictionary } from "@/content/dictionaries";
import { site } from "@/content/site";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <p className="font-mono text-xs text-ink-3">
          © {year} {site.name}
        </p>
        <p className="text-xs text-ink-3 sm:ml-auto">{dict.footer.builtWith}</p>
      </div>
    </footer>
  );
}
