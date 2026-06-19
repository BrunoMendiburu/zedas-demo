"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// useLayoutEffect warns during SSR; swap to useEffect on the server. Motion is
// set up client-side only, so the server branch is never actually exercised.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

let registered = false;

/** Register ScrollTrigger exactly once, lazily, on the client. */
export function ensureGsap(): typeof gsap {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

// Mirrors the CSS `--ease-out-quart` token (cubic-bezier(0.23, 1, 0.32, 1)).
// Strong ease-out: starts fast, feels responsive — never `power*.in` for entrances.
export const EASE_OUT = "power3.out";
export const EASE_OUT_SOFT = "power2.out";
