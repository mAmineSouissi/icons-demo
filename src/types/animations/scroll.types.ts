import type { RefObject } from "react";
import type ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Shared shape for hooks that can either create their own scope ref or
 * accept an external one (so a single section element can be the scope
 * for multiple animation hooks).
 */
export interface ScopableOptions<T extends HTMLElement = HTMLElement> {
  /**
   * Optional external scope. When provided, the hook uses this ref as its
   * `useGSAP` scope and does NOT create an internal ref. When omitted, the
   * hook creates and returns its own ref.
   */
  scope?: RefObject<T | null>;
}

/**
 * Subset of GSAP ScrollTrigger vars that callers commonly override.
 * We don't re-expose the whole interface — that keeps callsites focused on
 * the knobs that actually matter for our motion system and prevents drift
 * from the shared defaults in `src/lib/motion.ts`.
 */
export interface ScrollTriggerOverrides {
  /** Where in the viewport the trigger should fire. Defaults to `top 85%`. */
  start?: ScrollTrigger.Vars["start"];
  /** End position; required for `scrub`-driven animations. */
  end?: ScrollTrigger.Vars["end"];
  /** Set true (or a number = lag seconds) for scroll-bound animation. */
  scrub?: ScrollTrigger.Vars["scrub"];
  /** `play none none reverse` etc. Defaults to the shared `scrollDefaults`. */
  toggleActions?: ScrollTrigger.Vars["toggleActions"];
  /** Pin the trigger element while the animation runs. */
  pin?: ScrollTrigger.Vars["pin"];
  /** Re-fire the entrance every time it enters the viewport. */
  once?: boolean;
  /** Surface ScrollTrigger markers (debug). */
  markers?: boolean;
}

/**
 * Common easing/duration knobs — every hook accepts these because every
 * animation in the system maps to a motion token.
 */
export interface MotionTimingOverrides {
  /** Tween duration in seconds. Falls back to `dur.slow` per hook. */
  duration?: number;
  /** GSAP ease string. Falls back to the hook's pattern-appropriate ease. */
  ease?: string;
  /** Extra delay (s) before the tween starts. */
  delay?: number;
}
