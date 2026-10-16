import { profile } from "@/lib/data";

const nav = [
  { label: "Sobre", href: "#sobre" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="font-mono text-sm font-semibold text-fg">
          {"<"}
          <span className="text-accent">talles</span>
          {" />"}
        </a>
        <nav aria-label="Seções" className="hidden gap-6 text-sm text-muted md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-4 py-1.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
        >
          LinkedIn
        </a>
      </div>
    </header>
  );
}
