/**
 * Typed GSAP animation hooks for the Icons home page (and beyond).
 *
 * Coverage at a glance:
 *   useEntrance         → scroll-triggered fade/slide/scale/clip-path reveal
 *   useWordReveal       → per-word headline reveal (mask or rotate mode)
 *   useTimelineEntrance → paused master timeline gated by a `ready` flag
 *   useIdleLoop         → continuous yoyo / linear ambient loop
 *   useMarquee          → infinite horizontal marquee
 *   useHorizontalPin    → pinned horizontal scrub with progress callback
 *
 * Every hook:
 *   - imports tokens from `@/lib/motion` (no hardcoded durations/eases)
 *   - registers GSAP plugins once via `registerAnimationPlugins`
 *   - honors `prefers-reduced-motion`
 *   - uses `useGSAP({ scope: ref })` for automatic cleanup
 */

export { useEntrance } from "./useEntrance";
export { useWordReveal } from "./useWordReveal";
export { useTimelineEntrance } from "./useTimelineEntrance";
export { useIdleLoop } from "./useIdleLoop";
export { useMarquee } from "./useMarquee";
export { useHorizontalPin } from "./useHorizontalPin";
export {
  prefersReducedMotion,
  registerAnimationPlugins,
} from "./registerPlugins";

export type * from "@/types/animations";
