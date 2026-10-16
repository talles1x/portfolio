"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { openPalette } from "@/lib/theme";
import { Search } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

export const nav = [
  { label: "Sobre", id: "sobre" },
  { label: "Experiência", id: "experiencia" },
  { label: "Projetos", id: "projetos" },
  { label: "Leis de UX", id: "ux" },
  { label: "Contato", id: "contato" },
];

const noop = () => () => {};

export function Header() {
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const isMac = useSyncExternalStore(
    noop,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );

  useEffect(() => {
    // Marca no menu a seção que está na tela (scroll-spy)
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent-solid"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2 font-semibold tracking-tight text-fg">
          <span className="grid size-8 place-items-center rounded-lg bg-accent-solid font-mono text-sm text-on-accent">
            T
          </span>
          <span>Talles Oliveira</span>
        </a>

        <nav id="site-nav" aria-label="Seções" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-3.5 py-2 transition-colors ${
                      isActive ? "bg-accent-soft text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <button
            id="menu-button"
            type="button"
            onClick={openPalette}
            className="flex h-11 items-center gap-2 rounded-full border border-line px-3.5 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
          >
            <Search />
            <span className="lg:hidden">Menu</span>
            <span className="hidden lg:inline">Buscar</span>
            <kbd className="hidden rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] sm:inline">
              {isMac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
