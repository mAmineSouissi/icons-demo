import type { ScopableOptions } from "./scroll.types";

/**
 * Direction of the marquee scroll.
 *  - `"left"`  → translateX from 0 to -50% (track must be duplicated content)
 *  - `"right"` → translateX from -50% to 0
 */
export type MarqueeDirection = "left" | "right";

export interface UseMarqueeOptions extends ScopableOptions {
  /**
   * Total seconds per full loop. Larger = slower. Defaults to 36.
   * Keep in mind the marquee assumes the track contains two copies of the
   * content, so a `-50%` translate looks seamless.
   */
  duration?: number;
  /** Scroll direction. Defaults to `"left"`. */
  direction?: MarqueeDirection;
  /**
   * Pause the marquee when the user prefers reduced motion.
   * Defaults to true — set false to keep marquees running regardless.
   */
  respectReducedMotion?: boolean;
}
