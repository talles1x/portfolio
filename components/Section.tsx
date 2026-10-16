type SectionProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

export function Section({ id, index, label, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-20 sm:py-28">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-12">
        <p className="font-mono text-sm text-muted">
          <span className="text-accent">{index}</span> / {label}
        </p>
        <div>
          <h2 id={`${id}-title`} className="max-w-2xl text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
          <div className="mt-12">{children}</div>
        </div>
      </div>
    </section>
  );
}
