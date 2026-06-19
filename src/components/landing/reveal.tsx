"use client";

import { useRef, type ComponentPropsWithoutRef, type ElementType } from "react";
import { ensureGsap, useIsomorphicLayoutEffect, EASE_OUT } from "@/lib/motion";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Vertical travel of the entrance, in px. */
  y?: number;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** If set, animate the element's direct children with this per-item stagger. */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Scroll-reveal wrapper. Content is rendered fully visible by default; the
 * hidden "from" state is applied *only* when the user has no motion preference
 * (via `gsap.matchMedia`). So reduced-motion users and headless renderers always
 * get the content, never a blank section gated on an animation that never fires.
 */
export default function Reveal<T extends ElementType = "div">({
  as,
  y = 24,
  delay = 0,
  stagger,
  start = "top 82%",
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const gsap = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hidden tab → rAF is frozen and GSAP can't play; leave content visible.
      if (document.hidden) return;
      const targets = stagger != null ? Array.from(el.children) : el;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.7,
        ease: EASE_OUT,
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start, once: true },
      });
    });

    return () => mm.revert();
  }, [y, delay, stagger, start]);

  return (
    <Tag ref={ref} className={`zd-reveal ${className ?? ""}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
