import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/60">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-fg">{project.title}</h3>
        <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
          {project.team}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted">{project.summary}</p>

      <ul className="mt-4 space-y-1.5 text-sm text-fg/90">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="text-accent">▹</span>
            {item}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent hover:underline"
          >
            {link.label} ↗
          </a>
        ))}
        {project.note && <span className="text-muted">{project.note}</span>}
      </div>
    </article>
  );
}
