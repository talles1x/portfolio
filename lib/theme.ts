export type Theme = "dark" | "light";

const KEY = "theme";

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // armazenamento indisponível (aba anônima, por exemplo): o tema vale só nesta visita
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

/** Roda antes da página pintar, para não piscar o tema errado. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${KEY}");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export const openPalette = () => window.dispatchEvent(new Event("open-palette"));

/** Rola até um elemento e o destaca por alguns segundos. */
export function highlight(id: string, fallbackId?: string) {
  let el = document.getElementById(id);
  // no celular a navegação do topo fica escondida: destaca o botão de menu no lugar
  if ((!el || el.getClientRects().length === 0) && fallbackId) el = document.getElementById(fallbackId);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  el.classList.remove("ux-highlight");
  void el.offsetWidth; // reinicia a animação se clicar de novo
  el.classList.add("ux-highlight");
  window.setTimeout(() => el.classList.remove("ux-highlight"), 2800);
}
