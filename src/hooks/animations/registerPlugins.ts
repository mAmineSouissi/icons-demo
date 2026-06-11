import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single source of truth for GSAP plugin registration.
 *
 * `SmoothScroll` registers ScrollTrigger globally at boot, but every
 * animation hook calls this defensively so that a hook used outside the
 * SmoothScroll tree (Storybook, an isolated test page, a route that skips
 * the global Layout) still works.
 *
 * `gsap.registerPlugin` is idempotent — repeated calls are cheap.
 */
let registered = false;

export function registerAnimationPlugins(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

/**
 * Centralized check for `prefers-reduced-motion`. Hooks call this so the
 * preference is read identically everywhere.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
