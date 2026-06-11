import type { MotionTimingOverrides, ScopableOptions } from "./scroll.types";

/**
 * Idle loops are the continuous ambient motion that runs after the entrance
 * sequence settles — floater bob, card breath, star spin, sparkle drift.
 *
 * Two flavors:
 *   - `"yoyo"`   → tweens back and forth between baseline and the target.
 *   - `"linear"` → no yoyo, no easing change. Used for spin/orbit loops.
 */
export type IdleLoopMode = "yoyo" | "linear";

/**
 * Per-property target value. Can be a number (absolute), a string
 * (e.g. `"+=14"` for relative, `"random(-5,5)"`), or omitted.
 */
export type IdleLoopValue = number | string;

export interface IdleLoopProps {
  y?: IdleLoopValue;
  x?: IdleLoopValue;
  scale?: IdleLoopValue;
  rotate?: IdleLoopValue;
  opacity?: IdleLoopValue;
}

export interface UseIdleLoopOptions
  extends IdleLoopProps,
    MotionTimingOverrides,
    ScopableOptions {
  /** CSS selector(s) inside the scope ref. */
  selector: string | string[];
  /** Loop mode. Defaults to `"yoyo"`. */
  mode?: IdleLoopMode;
  /**
   * Stagger between siblings. Number = uniform stagger,
   * object = GSAP-style stagger (e.g. `{ each: 0.3, from: "random" }`).
   */
  stagger?: number | gsap.StaggerVars;
  /**
   * Gate the loop on a boolean (typically the `ready` flag that also gates
   * the entrance timeline). When false, the loop is paused; when true, it
   * plays. Defaults to true (start immediately).
   */
  enabled?: boolean;
}
