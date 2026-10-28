"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CarSceneHandle } from "./CarScene";

// O 3D só é baixado quando a seção chega perto da tela: não pesa no carregamento inicial
const CarScene = dynamic(() => import("./CarScene").then((m) => m.CarScene), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

const paints = [
  { name: "Roxo", value: "#6d28d9" },
  { name: "Azul", value: "#1d4ed8" },
  { name: "Grafite", value: "#3f3f46" },
  { name: "Branco", value: "#e7e7ea" },
  { name: "Vermelho", value: "#b91c1c" },
];

const noop = () => () => {};

function SceneSkeleton() {
  return (
    <div className="grid size-full place-items-center bg-[#0b0b0f]">
      <span className="font-mono text-xs text-white/50">Carregando 3D…</span>
    </div>
  );
}

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Garage() {
  const wrap = useRef<HTMLDivElement>(null);
  const scene = useRef<CarSceneHandle>(null);
  const [near, setNear] = useState(false);
  const [paint, setPaint] = useState(paints[0]);
  const [lights, setLights] = useState(true);
  const reducedMotion = useReducedMotion();
  const [spin, setSpin] = useState<boolean | null>(null);
  const autoRotate = spin ?? !reducedMotion;
  const webgl = useSyncExternalStore(noop, hasWebGL, () => true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div
        ref={wrap}
        id="garagem-canvas"
        className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-[#0b0b0f] sm:aspect-[16/10]"
      >
        <div
          role="img"
          aria-label={`Modelo 3D de um coupé esportivo na cor ${paint.name.toLowerCase()}, faróis ${lights ? "acesos" : "apagados"}. Use os botões ao lado para girar.`}
          className="size-full"
        >
          {!webgl ? (
            <div className="grid size-full place-items-center p-6 text-center text-sm text-white/60">
              Seu navegador não suporta WebGL, então o modelo 3D não pode ser exibido.
            </div>
          ) : near ? (
            <CarScene
              ref={scene}
              paint={paint.value}
              lights={lights}
              autoRotate={autoRotate}
              reducedMotion={reducedMotion}
              onUserRotate={() => setSpin(false)}
            />
          ) : (
            <SceneSkeleton />
          )}
        </div>
        <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 font-mono text-xs text-white/80 backdrop-blur">
          Arraste para girar
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6">
        <fieldset>
          <legend className="font-mono text-xs text-muted">Cor da pintura</legend>
          <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" aria-label="Cor da pintura">
            {paints.map((p) => {
              const active = p.value === paint.value;
              return (
                <button
                  key={p.name}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={p.name}
                  title={p.name}
                  onClick={() => setPaint(p)}
                  className={`grid size-12 place-items-center rounded-full border-2 transition-transform hover:scale-105 ${
                    active ? "border-accent" : "border-line"
                  }`}
                >
                  <span className="size-8 rounded-full ring-1 ring-black/20" style={{ background: p.value }} />
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-fg" aria-live="polite">
            {paint.name}
          </p>
        </fieldset>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            aria-pressed={lights}
            onClick={() => setLights((v) => !v)}
            className={`min-h-12 rounded-2xl border px-4 text-sm font-semibold transition-colors ${
              lights ? "border-accent bg-accent-soft text-fg" : "border-line text-muted hover:border-accent/60"
            }`}
          >
            Faróis {lights ? "ligados" : "desligados"}
          </button>
          <button
            type="button"
            aria-pressed={autoRotate}
            onClick={() => setSpin(!autoRotate)}
            className={`min-h-12 rounded-2xl border px-4 text-sm font-semibold transition-colors ${
              autoRotate ? "border-accent bg-accent-soft text-fg" : "border-line text-muted hover:border-accent/60"
            }`}
          >
            {autoRotate ? "Girando" : "Parado"}
          </button>
        </div>

        <div>
          <p className="font-mono text-xs text-muted">Câmera</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <button
              type="button"
              aria-label="Girar para a esquerda"
              onClick={() => {
                setSpin(false);
                scene.current?.rotate(-1);
              }}
              className="min-h-12 rounded-2xl border border-line text-lg text-fg transition-colors hover:border-accent/60"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                setSpin(false);
                scene.current?.reset();
              }}
              className="min-h-12 rounded-2xl border border-line text-sm font-semibold text-fg transition-colors hover:border-accent/60"
            >
              Centralizar
            </button>
            <button
              type="button"
              aria-label="Girar para a direita"
              onClick={() => {
                setSpin(false);
                scene.current?.rotate(1);
              }}
              className="min-h-12 rounded-2xl border border-line text-lg text-fg transition-colors hover:border-accent/60"
            >
              →
            </button>
          </div>
        </div>

        <p className="mt-auto border-t border-line pt-5 text-sm text-muted">
          Modelado do zero com Three.js e React Three Fiber, sem arquivos 3D externos. O modelo só carrega quando você
          chega aqui.
        </p>
      </div>
    </div>
  );
}
