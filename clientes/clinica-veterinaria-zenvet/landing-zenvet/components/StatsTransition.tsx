"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  target: number;
  /** how many decimals to display while running (final state always snaps cleanly) */
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 8, decimals: 1, suffix: " anos", label: "dedicada a felinos" },
  { target: 1200, decimals: 0, prefix: "+", label: "gatos atendidos" },
  { target: 4.9, decimals: 1, suffix: " ★", label: "avaliação dos tutores" },
];

const DURATION_MS = 2400;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(value: number, target: number, stat: Stat, done: boolean) {
  if (done) {
    if (stat.target === 8) return `${stat.prefix ?? ""}8${stat.suffix ?? ""}`;
    if (stat.target === 1200)
      return `${stat.prefix ?? ""}${(1200).toLocaleString("pt-BR")}${stat.suffix ?? ""}`;
    return `${stat.prefix ?? ""}${stat.target
      .toFixed(stat.decimals)
      .replace(".", ",")}${stat.suffix ?? ""}`;
  }
  if (stat.decimals === 0) {
    return `${stat.prefix ?? ""}${Math.floor(value).toLocaleString("pt-BR")}${
      stat.suffix ?? ""
    }`;
  }
  return `${stat.prefix ?? ""}${value
    .toFixed(stat.decimals)
    .replace(".", ",")}${stat.suffix ?? ""}`;
}

export default function StatsTransition() {
  const ref = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState<number[]>(STATS.map(() => 0));
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION_MS);
      const eased = easeOutCubic(p);
      setValues(STATS.map((s) => eased * s.target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  return (
    <section
      id="stats"
      ref={ref}
      className="relative bg-purple-deep text-cream overflow-hidden"
      aria-label="Indicadores de confiança"
    >
      <div className="container-content section py-16 md:py-20 px-6">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-5xl mx-auto text-center">
          {STATS.map((s, i) => (
            <li key={i} className="flex flex-col items-center gap-3">
              <span
                className="font-serif font-medium leading-none tracking-tight text-cream tabular-nums whitespace-nowrap"
                style={{ fontSize: "clamp(1.625rem, 3.5vw, 2.875rem)" }}
              >
                {formatValue(values[i] ?? 0, s.target, s, done)}
              </span>
              <span className="text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-cream/70">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-magenta/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-turquoise/15 blur-3xl pointer-events-none" />
    </section>
  );
}
