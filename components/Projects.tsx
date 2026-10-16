"use client";

import { useState } from "react";
import { categories, projects, type Category } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

type Filter = "Todos" | Category;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const visible = filter === "Todos" ? projects : projects.filter((p) => p.categories.includes(filter));
  const options: Filter[] = ["Todos", ...categories];

  return (
    <>
      <div id="project-filters" role="group" aria-label="Filtrar projetos" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = filter === option;
          const count =
            option === "Todos" ? projects.length : projects.filter((p) => p.categories.includes(option)).length;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                active
                  ? "border-accent-solid bg-accent-solid text-on-accent"
                  : "border-line text-muted hover:border-accent hover:text-fg"
              }`}
            >
              {option}
              <span className={`font-mono text-[11px] ${active ? "text-on-accent/80" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} projetos exibidos
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {visible.map((project, i) => (
          <div key={project.title} className="rise" style={{ animationDelay: `${i * 50}ms` }}>
            <ProjectCard project={project} tagsId={i === 0 ? "project-tags" : undefined} />
          </div>
        ))}
      </div>
    </>
  );
}
