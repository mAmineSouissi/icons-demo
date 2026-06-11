import type {
  MotionTimingOverrides,
  ScopableOptions,
  ScrollTriggerOverrides,
} from "./scroll.types";

/**
 * Per-target transform offsets for an entrance reveal.
 * The element animates *from* these values *to* their final on-screen state
 * (translate 0, scale 1, rotate 0, opacity 1).
 */
export interface EntranceFromState {
  /** Y offset in px the element animates up from. */
  y?: number;
  /** X offset in px. */
  x?: number;
  /** Starting scale (1 = no zoom). */
  scale?: number;
  /** Starting rotation in degrees. Pass a function for randomized per-target. */
  rotate?: number | (() => number);
  /** Starting opacity (default 0). */
  opacity?: number;
  /**
   * Clip-path string to start from (e.g. `"inset(0 0 100% 0)"`).
   * Animates to `inset(0 0 0 0)`.
   */
  clipPath?: string;
}

export interface UseEntranceOptions
  extends EntranceFromState,
    MotionTimingOverrides,
    ScopableOptions {
  /**
   * CSS selector(s) inside the scope ref that should animate.
   * Single selector or array — array reveals share one tween.
   */
  selector: string | string[];
  /** Stagger (s) between siblings. Falls back to `stagger.normal` if omitted. */
  stagger?: number | gsap.StaggerVars;
  /** Override the ScrollTrigger config for this entrance. */
  scrollTrigger?: ScrollTriggerOverrides;
  /**
   * If true (default), the entrance is gated by ScrollTrigger.
   * If false, plays immediately on mount (useful for above-the-fold reveals).
   */
  scroll?: boolean;
  /**
   * Clear inline transform/opacity after the tween finishes so the element
   * is fully under CSS control again. Defaults to true for one-shot reveals.
   */
  clearProps?: boolean;
}
