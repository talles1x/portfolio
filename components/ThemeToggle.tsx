"use client";

import { useSyncExternalStore } from "react";
import { getTheme, toggleTheme, type Theme } from "@/lib/theme";
import { Moon, Sun } from "./Icons";

const subscribe = (onChange: () => void) => {
  window.addEventListener("themechange", onChange);
  return () => window.removeEventListener("themechange", onChange);
};

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "dark");
  const next = theme === "dark" ? "claro" : "escuro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Mudar para tema ${next}`}
      title={`Tema ${next}`}
      className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-fg"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
