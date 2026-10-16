import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { education, experiences, profile, projects, stack } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Hero */}
        <section id="inicio" className="flex min-h-[78vh] flex-col justify-center py-20">
          <p className="font-mono text-sm text-accent">Olá, eu sou</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-fg sm:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl text-muted sm:text-2xl">{profile.role}</p>
          <p className="mt-6 max-w-xl text-lg text-fg/90">
            {profile.tagline}{" "}
            <span className="text-muted">
              Interfaces rápidas, acessíveis e pensadas para quem usa.
            </span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              Ver projetos
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          </div>

          <p className="mt-10 font-mono text-xs text-muted">📍 {profile.location}, Brasil</p>
        </section>

        <Section id="sobre" eyebrow="01. sobre" title="Design e código no mesmo lugar">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <p className="text-lg leading-relaxed text-fg/90">{profile.about}</p>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-sm text-muted">Formação</p>
              <p className="mt-1 font-semibold text-fg">{education.course}</p>
              <p className="text-sm text-muted">
                {education.school} · {education.period}
              </p>
            </div>
          </div>
        </Section>

        <Section id="experiencia" eyebrow="02. experiência" title="Onde já atuei">
          <ol className="space-y-6">
            {experiences.map((exp) => (
              <li key={exp.company} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="text-lg font-semibold text-fg">
                  {exp.role} <span className="text-accent">· {exp.company}</span>
                </h3>
                <p className="text-sm text-muted">{exp.context}</p>
                <ul className="mt-4 grid gap-2 text-sm text-fg/90 sm:grid-cols-2">
                  {exp.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="text-accent">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projetos" eyebrow="03. projetos" title="O que eu construí">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Section>

        <Section id="stack" eyebrow="04. stack" title="Ferramentas do dia a dia">
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-semibold text-fg">{group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contato" eyebrow="05. contato" title="Vamos conversar?">
          <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
            <p className="max-w-xl text-lg text-fg/90">
              Estou aberto a oportunidades como desenvolvedor front-end. Me chame no LinkedIn
              ou dê uma olhada no meu GitHub.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
              >
                Falar no LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
              >
                github.com/talles1x
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-center font-mono text-xs text-muted">
        Feito com Next.js, TypeScript e Tailwind CSS · {profile.name}
      </footer>
    </>
  );
}
