"use client";

import { uxLaws } from "@/lib/data";
import { highlight } from "@/lib/theme";
import { ArrowUpRight } from "./Icons";

export function UxLaws() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {uxLaws.map((law, i) => (
        <li key={law.name}>
          <button
            type="button"
            onClick={() => highlight(law.target, law.fallback)}
            className="group flex h-full w-full flex-col rounded-3xl border border-line bg-surface p-6 text-left transition-colors hover:border-accent/60"
          >
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-3 text-lg font-semibold tracking-tight text-fg">{law.name}</span>
            <span className="mt-1 text-sm text-muted">{law.rule}</span>
            <span className="mt-4 border-t border-line pt-4 text-sm text-fg/90">{law.applied}</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent">
              Mostrar no site
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
