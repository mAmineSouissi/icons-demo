import type { RefObject } from "react";
import type { ScopableOptions } from "./scroll.types";

/**
 * Build callback receives the paused timeline + scope ref so callers can
 * append tweens and read DOM nodes for selector queries.
 *
 * @example
 * const heroRef = useTimelineEntrance(({ tl }) => {
 *   tl.fromTo(".hero-card", { opacity: 0 }, { opacity: 1, duration: dur.slow });
 * }, { ready });
 */
export interface TimelineBuildContext<T extends HTMLElement> {
  tl: gsap.core.Timeline;
  ref: RefObject<T | null>;
}

export type TimelineBuilder<T extends HTMLElement> = (
  ctx: TimelineBuildContext<T>,
) => void;

export interface UseTimelineEntranceOptions extends ScopableOptions {
  /**
   * If false, the timeline is built but not played. When this flips to true,
   * it plays from the start. Useful for preloader hand-off.
   */
  ready?: boolean;
  /** Delay (s) before the first tween. Defaults to 0.15. */
  delay?: number;
  /**
   * Restart the timeline whenever `ready` flips back to true after going
   * false (i.e. a re-entry pattern). Defaults to false.
   */
  restartOnReady?: boolean;
  /**
   * React deps that should rebuild the timeline. Empty array means
   * "build once" (the recommended default for landing pages).
   */
  dependencies?: unknown[];
}
