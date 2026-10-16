"use client";

import { useRef, useState } from "react";
import { Check } from "./Icons";

const tabs = [
  { id: "design", label: "Design", hint: "Figma" },
  { id: "code", label: "Código", hint: "TSX" },
  { id: "live", label: "Protótipo", hint: "clique" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function DesignCode() {
  const [tab, setTab] = useState<TabId>("design");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div id="design-code" className="rounded-3xl border border-line bg-surface p-3 shadow-[0_30px_80px_-40px_rgb(124_58_237/0.45)]">
      <div role="tablist" aria-label="Do Figma ao código" className="grid grid-cols-3 gap-1 rounded-2xl bg-surface-2 p-1">
        {tabs.map((t, i) => {
          const selected = tab === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex min-h-11 flex-col items-center justify-center rounded-xl text-sm font-medium transition-colors sm:flex-row sm:gap-2 ${
                selected ? "bg-bg text-fg shadow-sm" : "text-muted hover:text-fg"
              }`}
            >
              {t.label}
              <span className={`font-mono text-[10px] ${selected ? "text-accent" : "text-muted"}`}>{t.hint}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="relative mt-3 grid h-[330px] place-items-center overflow-hidden rounded-2xl border border-line bg-bg"
      >
        <div aria-hidden className="canvas-grid absolute inset-0" />
        <div key={tab} className="rise relative w-full px-4">
          {tab === "design" && <DesignView />}
          {tab === "code" && <CodeView />}
          {tab === "live" && <LiveView />}
        </div>
      </div>
    </div>
  );
}

/* ---------- Card base (o mesmo componente nas três abas) ---------- */

function TicketCard({ seats, children }: { seats: number; children?: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-line bg-surface p-5 text-left">
      <div className="flex items-center justify-between font-mono text-[11px] text-muted">
        <span>Hoje · 07:30</span>
        <span>{seats} vagas</span>
      </div>
      <p className="mt-3 text-lg font-semibold tracking-tight text-fg">Monteiro → Campina Grande</p>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted">a partir de</p>
          <p className="text-2xl font-semibold text-fg">R$ 45</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function DesignView() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      {/* rótulo do frame, como no Figma */}
      <p className="absolute -top-6 left-0 font-mono text-[11px] text-accent">TicketCard</p>
      <div className="relative outline outline-1 outline-accent">
        <TicketCard seats={12}>
          <span className="rounded-full bg-accent-solid px-4 py-2.5 text-sm font-semibold text-on-accent">Reservar</span>
        </TicketCard>
        {/* alças de seleção */}
        {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
          <span key={pos} className={`absolute ${pos} size-2 border border-accent bg-bg`} />
        ))}
        {/* medida do padding superior, no espaço vazio entre horário e vagas */}
        <span className="absolute left-1/2 top-0 h-5 w-px bg-accent" />
        <span className="absolute left-[calc(50%+4px)] top-[3px] rounded bg-accent-solid px-1 font-mono text-[10px] leading-[14px] text-on-accent">20</span>
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted">
        <span className="rounded bg-accent-solid px-1.5 text-on-accent">300 × Hug</span>
        <span className="flex items-center gap-1.5">
          <i className="size-3 rounded-sm bg-accent-solid" />
          <i className="size-3 rounded-sm border border-line bg-surface" />
          <i className="size-3 rounded-sm bg-fg" />
          Geist 600
        </span>
      </div>
    </div>
  );
}

function CodeView() {
  const k = "text-accent";
  const s = "text-emerald-500 dark:text-emerald-400";
  const c = "text-muted";
  return (
    <pre className="mx-auto max-w-[340px] overflow-x-auto text-left font-mono text-[11.5px] leading-relaxed text-fg">
      <code>
        <span className={c}>{"// TicketCard.tsx"}</span>
        {"\n"}
        <span className={k}>export function</span> TicketCard({"{ "}trip{" }"}) {"{"}
        {"\n  "}
        <span className={k}>return</span> (
        {"\n    "}&lt;<span className={k}>Card</span> padding=<span className={s}>&quot;20&quot;</span>&gt;
        {"\n      "}&lt;<span className={k}>Meta</span> trip={"{"}trip{"}"} /&gt;
        {"\n      "}&lt;<span className={k}>Route</span> de={"{"}trip.origem{"}"} /&gt;
        {"\n      "}&lt;<span className={k}>Price</span> value={"{"}trip.preco{"}"} /&gt;
        {"\n      "}&lt;<span className={k}>Button</span> onClick={"{"}reservar{"}"}&gt;
        {"\n        "}Reservar
        {"\n      "}&lt;/<span className={k}>Button</span>&gt;
        {"\n    "}&lt;/<span className={k}>Card</span>&gt;
        {"\n  "});
        {"\n"}
        {"}"}
      </code>
    </pre>
  );
}

function LiveView() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const seats = state === "done" ? 11 : 12;

  const reserve = () => {
    setState("loading");
    window.setTimeout(() => setState("done"), 350);
  };

  return (
    <div>
      <TicketCard seats={seats}>
        {state === "done" ? (
          <span className="flex min-h-11 items-center gap-1.5 rounded-full bg-emerald-500/15 px-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <Check /> Reservado
          </span>
        ) : (
          <button
            type="button"
            onClick={reserve}
            disabled={state === "loading"}
            className="min-h-11 rounded-full bg-accent-solid px-5 text-sm font-semibold text-on-accent transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-70"
          >
            {state === "loading" ? "Reservando…" : "Reservar"}
          </button>
        )}
      </TicketCard>
      <p className="mt-4 text-center text-xs text-muted" aria-live="polite">
        {state === "done" ? (
          <>
            Vaga garantida.{" "}
            <button type="button" onClick={() => setState("idle")} className="font-medium text-accent underline-offset-4 hover:underline">
              Desfazer
            </button>
          </>
        ) : (
          "Pode clicar, é um componente de verdade."
        )}
      </p>
    </div>
  );
}
