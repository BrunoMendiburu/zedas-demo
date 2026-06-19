"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ensureGsap, useIsomorphicLayoutEffect, EASE_OUT } from "@/lib/motion";
import ContourField from "./contour-field";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // If the tab is hidden, requestAnimationFrame never ticks and GSAP would
      // freeze the entrance at opacity 0 — leaving the hero blank. Skip the
      // hide-then-reveal so content stays at its visible CSS default.
      if (document.hidden) return;
      const items = el.querySelectorAll("[data-hero-item]");
      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
      tl.from(items, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.09,
        delay: 0.05,
      }).from(
        "[data-hero-cue]",
        { opacity: 0, duration: 0.6 },
        "-=0.2",
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8"
    >
      {/* Signature: cartographic contour field + depth gradient seating the text */}
      <ContourField
        drift
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-accent opacity-[0.18] dark:opacity-[0.22]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_8%,transparent_38%,var(--background)_92%)]"
      />

      <div className="mx-auto w-full max-w-3xl text-center">
        <h1
          id="hero-title"
          data-hero-item
          className="text-[clamp(2.75rem,8vw,5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-foreground"
        >
          ZEDAS Project
        </h1>

        <h2
          data-hero-item
          className="mx-auto mt-4 max-w-2xl text-[clamp(1.25rem,3.4vw,2rem)] font-medium leading-tight tracking-[-0.01em] text-foreground/80"
        >
          Mapping the Future of Water-Based Production
        </h2>

        <p
          data-hero-item
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-[17px]"
        >
          Water is becoming one of the world&rsquo;s most strategic natural
          resources. As climate change, population growth, and industrial
          expansion increase pressure on freshwater, the ZEDAS Project is
          building the world&rsquo;s first global platform to identify
          territories where water availability, quality, resilience, and
          governance can support long-term economic development.
        </p>

        <div
          data-hero-item
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/map"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-semibold text-accent-foreground shadow-sm transition-[transform,background-color] duration-200 ease-[var(--ease-out-quart)] hover:bg-accent/90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
          >
            Explore the Global Map
            <ArrowRight
              className="size-[18px] transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <a
            href="#join"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-border bg-surface/70 px-6 text-[15px] font-semibold text-foreground backdrop-blur-sm transition-colors duration-200 hover:bg-surface-2 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
          >
            Join the Network
          </a>
        </div>

        {/* The through-line — used deliberately as the brand's emotional spine */}
        <p
          data-hero-item
          className="mx-auto mt-14 max-w-xl text-[clamp(1.5rem,4.2vw,2.4rem)] font-semibold tracking-[-0.02em] text-foreground"
        >
          Production follows{" "}
          <span className="text-accent underline decoration-accent/30 decoration-[3px] underline-offset-[6px]">
            water
          </span>
          .
        </p>
      </div>

      <a
        href="#about"
        data-hero-cue
        aria-label="Scroll to learn more"
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit items-center justify-center rounded-full p-2 text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <ChevronDown className="size-5 motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
