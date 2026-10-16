import { CommandPalette } from "@/components/CommandPalette";
import { DesignCode } from "@/components/DesignCode";
import { Header } from "@/components/Header";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "@/components/Icons";
import { Projects } from "@/components/Projects";
import { Section } from "@/components/Section";
import { UxLaws } from "@/components/UxLaws";
import { education, experiences, profile, stack } from "@/lib/data";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <CommandPalette />

      <main id="conteudo" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* ---------- Hero ---------- */}
        <section id="inicio" className="relative grid items-center gap-14 py-16 sm:py-24 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.1fr_1fr]">
          <div className="rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Aberto a vagas de front-end
            </p>

            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-6xl lg:text-7xl">
              Do Figma ao{" "}
              <span id="hero-highlight" className="text-accent">
                código
              </span>{" "}
              em produção.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Sou <strong className="font-semibold text-fg">{profile.name}</strong>, desenvolvedor front-end e
              designer UI/UX. Desenho a interface, testo com quem usa e entrego em React,
              Next.js e TypeScript.
            </p>

            <div className="mt-10 grid grid-cols-[1fr_auto] gap-3 sm:flex sm:flex-wrap sm:items-center">
              <a
                id="hero-cta"
                href="#projetos"
                className="col-span-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent-solid px-7 text-base font-semibold text-on-accent transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Ver projetos
                <ArrowDown className="size-5" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-line px-6 font-medium text-fg transition-colors hover:border-accent"
              >
                <Linkedin /> LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-14 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent"
              >
                <Github />
              </a>
            </div>

            <p className="mt-10 font-mono text-xs text-muted">{profile.location}</p>
          </div>

          <div className="rise [animation-delay:120ms]">
            <DesignCode />
            <p className="mt-3 text-center font-mono text-xs text-muted">
              ← → para trocar de aba
            </p>
          </div>
        </section>

        {/* ---------- Sobre ---------- */}
        <Section id="sobre" index="01" label="sobre" title="Design e código no mesmo lugar.">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
            <div className="space-y-5 text-lg leading-relaxed text-fg/90">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="divide-y divide-line rounded-3xl border border-line bg-surface">
              <div className="p-6">
                <dt className="font-mono text-xs text-muted">Formação</dt>
                <dd className="mt-1.5 font-semibold text-fg">{education.course}</dd>
                <dd className="text-sm text-muted">
                  {education.school} · {education.period}
                </dd>
              </div>
              <div className="p-6">
                <dt className="font-mono text-xs text-muted">Foco</dt>
                <dd className="mt-1.5 font-semibold text-fg">Interfaces web e mobile</dd>
                <dd className="text-sm text-muted">React, Next.js, React Native e Figma</dd>
              </div>
            </dl>
          </div>
        </Section>

        {/* ---------- Experiência ---------- */}
        <Section id="experiencia" index="02" label="experiência" title="Onde já atuei.">
          <ol className="relative space-y-10 border-l border-line pl-8">
            {experiences.map((exp) => (
              <li key={exp.company} className="relative">
                <span aria-hidden className="absolute -left-[37px] top-1.5 size-3 rounded-full border-2 border-bg bg-accent-solid ring-1 ring-accent" />
                <h3 className="text-xl font-semibold tracking-tight text-fg">
                  {exp.role} <span className="text-accent">· {exp.company}</span>
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">{exp.context}</p>
                <ul className="mt-4 grid gap-2 text-fg/90 sm:grid-cols-2">
                  {exp.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        {/* ---------- Projetos ---------- */}
        <Section
          id="projetos"
          index="03"
          label="projetos"
          title="O que eu construí."
          intro="Projetos próprios, de clientes e da faculdade. Filtre pelo tipo que mais te interessa."
        >
          <Projects />
        </Section>

        {/* ---------- Leis de UX ---------- */}
        <Section
          id="ux"
          index="04"
          label="leis de ux"
          title="As Leis de UX deste site."
          intro="Cada decisão aqui tem um motivo. Clique numa lei para ver onde ela foi aplicada."
        >
          <UxLaws />
        </Section>

        {/* ---------- Stack ---------- */}
        <Section id="stack" index="05" label="stack" title="Ferramentas do dia a dia.">
          <div id="stack-grid" className="grid gap-4 sm:grid-cols-2">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group} className="rounded-3xl border border-line bg-surface p-6">
                <h3 className="font-semibold text-fg">{group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item} className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- Contato ---------- */}
        <section id="contato" aria-labelledby="contato-title" className="border-t border-line py-20 sm:py-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-accent-solid px-6 py-14 text-on-accent sm:px-14 sm:py-20">
            <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-white/10" />
            <p className="font-mono text-sm text-white/70">06 / contato</p>
            <h2 id="contato-title" className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Bora construir algo juntos?
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Estou aberto a oportunidades como desenvolvedor front-end. A forma mais rápida de falar comigo é
              pelo LinkedIn.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-7 font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Falar no LinkedIn <ArrowUpRight />
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center gap-2 rounded-full border border-white/30 px-7 font-semibold transition-colors hover:border-white"
              >
                <Github /> github.com/talles1x
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {profile.name}</span>
          <span>Feito com Next.js, TypeScript e Tailwind · Ctrl K para navegar</span>
        </div>
      </footer>
    </>
  );
}
