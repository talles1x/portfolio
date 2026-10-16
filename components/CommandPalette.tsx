"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { toggleTheme } from "@/lib/theme";
import { ArrowUpRight, Check, Github, Hash, Link, Linkedin, Moon, Search } from "./Icons";
import { nav } from "./Header";

type Action = {
  id: string;
  label: string;
  group: "Navegar" | "Links" | "Ações";
  icon: React.ReactNode;
  keywords?: string;
  run: () => void | "keep-open";
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const actions = useMemo<Action[]>(
    () => [
      { id: "inicio", label: "Início", group: "Navegar", icon: <Hash />, run: () => go("inicio") },
      ...nav.map((n) => ({
        id: n.id,
        label: n.label,
        group: "Navegar" as const,
        icon: <Hash />,
        run: () => go(n.id),
      })),
      { id: "stack", label: "Stack", group: "Navegar", icon: <Hash />, run: () => go("stack") },
      {
        id: "github",
        label: "Abrir GitHub",
        group: "Links",
        icon: <Github />,
        keywords: "código repositórios",
        run: () => void window.open(profile.links.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "Abrir LinkedIn",
        group: "Links",
        icon: <Linkedin />,
        keywords: "contato vaga",
        run: () => void window.open(profile.links.linkedin, "_blank", "noopener"),
      },
      {
        id: "theme",
        label: "Alternar tema claro/escuro",
        group: "Ações",
        icon: <Moon />,
        keywords: "dark light modo cor",
        run: () => toggleTheme(),
      },
      {
        id: "copy",
        label: "Copiar link deste portfólio",
        group: "Ações",
        icon: <Link />,
        keywords: "compartilhar url",
        run: () => {
          navigator.clipboard?.writeText(window.location.origin).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          });
          return "keep-open";
        },
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.keywords ?? ""}`.toLowerCase().includes(q));
  }, [actions, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
    lastFocus.current?.focus();
  }, []);

  const runAction = (action: Action) => {
    if (action.run() !== "keep-open") close();
  };

  useEffect(() => {
    const show = () => {
      lastFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", show);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter" && filtered[index]) {
      e.preventDefault();
      runAction(filtered[index]);
    } else if (e.key === "Tab") {
      e.preventDefault(); // mantém o foco dentro do diálogo
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-label="Fechar"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Paleta de comandos"
        className="rise relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Para onde você quer ir?"
            aria-label="Buscar seção ou ação"
            aria-controls="palette-list"
            aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
            className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-muted focus-visible:outline-none"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted">
            Esc
          </kbd>
        </div>

        <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted">Nada encontrado para “{query}”.</li>
          )}
          {filtered.map((action, i) => {
            const showGroup = action.group !== lastGroup;
            lastGroup = action.group;
            const selected = i === index;
            const isCopied = action.id === "copy" && copied;
            return (
              <li key={action.id} role="presentation">
                {showGroup && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                    {action.group}
                  </p>
                )}
                <div
                  id={`cmd-${action.id}`}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => runAction(action)}
                  className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm ${
                    selected ? "bg-accent-soft text-fg" : "text-muted"
                  }`}
                >
                  <span className={selected ? "text-accent" : ""}>{isCopied ? <Check /> : action.icon}</span>
                  <span className="flex-1">{isCopied ? "Link copiado!" : action.label}</span>
                  {action.group === "Links" && <ArrowUpRight className="opacity-60" />}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[11px] text-muted">
          <span>↑↓ navegar</span>
          <span>↵ abrir</span>
          <span className="ml-auto">esc fechar</span>
        </div>
      </div>
    </div>
  );
}

function go(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}
