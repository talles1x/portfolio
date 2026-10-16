"use client";

import type { Project } from "@/lib/data";
import { ArrowUpRight } from "./Icons";

export function ProjectCard({ project, tagsId }: { project: Project; tagsId?: string }) {
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onPointerMove={onPointerMove}
      className="spotlight group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/50 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-fg">{project.title}</h3>
        <span className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
          {project.team}
        </span>
      </div>

      <p className="mt-2 text-muted">{project.summary}</p>

      <ul className="mt-5 space-y-2 text-sm text-fg/90">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>

      <ul id={tagsId} className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologias">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
          >
            {link.label}
            <ArrowUpRight className="size-4" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        ))}
        {project.note && <span className="text-sm text-muted">{project.note}</span>}
      </div>
    </article>
  );
}
