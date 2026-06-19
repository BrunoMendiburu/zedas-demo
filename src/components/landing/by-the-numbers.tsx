"use client";

import { useRef } from "react";
import { ensureGsap, useIsomorphicLayoutEffect, EASE_OUT } from "@/lib/motion";
import { Container, Eyebrow } from "./primitives";

// "By the Numbers" — figures reconciled against the live product per brief §5.1:
//   • "Core Variables" corrected 12 → 7   (matches the 7 real indicators in zedas-data.ts)
//   • "Assessment Dimensions" corrected 5 → 6 (matches the six-dimension methodology)
// Flagged here for stakeholder review. "4 Continents" / "16 Pilot Countries" kept as-is.
const STATS = [
  { value: 16, suffix: "", label: "Pilot Countries" },
  { value: 4, suffix: "", label: "Continents" },
  { value: 100, suffix: "+", label: "Experts & Institutions" },
  { value: 7, suffix: "", label: "Core Variables" },
  { value: 6, suffix: "", label: "Assessment Dimensions" },
  { value: 1, suffix: "", label: "Global Methodology" },
];

export default function ByTheNumbers() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hidden tab → rAF is frozen; don't zero the figures (they'd stay 0).
      if (document.hidden) return;
      const nums = el.querySelectorAll<HTMLElement>("[data-count]");
      nums.forEach((node) => {
        const target = Number(node.dataset.count);
        const suffix = node.dataset.suffix ?? "";
        const counter = { v: 0 };
        node.textContent = `0${suffix}`; // pre-paint, so no flash of the final value
        gsap.to(counter, {
          v: target,
          duration: 1.4,
          ease: EASE_OUT,
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
          onUpdate: () => {
            node.textContent = `${Math.round(counter.v)}${suffix}`;
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="numbers-title"
      className="scroll-mt-20 border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Eyebrow>By the Numbers</Eyebrow>
        <h2
          id="numbers-title"
          className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          The pilot, at a glance
        </h2>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1.5 bg-surface p-6">
              <dd
                className="tnum text-4xl font-bold leading-none tracking-tight text-foreground sm:text-5xl"
                data-count={s.value}
                data-suffix={s.suffix}
              >
                {s.value}
                {s.suffix}
              </dd>
              <dt className="text-[13px] leading-tight text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
