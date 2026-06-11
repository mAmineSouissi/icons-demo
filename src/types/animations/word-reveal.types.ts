import type {
  MotionTimingOverrides,
  ScopableOptions,
  ScrollTriggerOverrides,
} from "./scroll.types";

/**
 * "rotate" — words slide up & untilt (no mask, simpler markup).
 * "mask"   — each word wrapped in an overflow-hidden span; inner span animates
 *            from `yPercent: 110` to 0 for a cinematic curtain reveal.
 */
export type WordRevealMode = "rotate" | "mask";

export interface UseWordRevealOptions
  extends MotionTimingOverrides,
    ScopableOptions {
  /**
   * CSS selector for the headline element inside the scope ref.
   * The hook will split its text into per-word spans on mount.
   */
  selector: string;
  /** Visual style of the reveal. Defaults to `"mask"`. */
  mode?: WordRevealMode;
  /** Stagger (s) between words. Defaults to `stagger.normal`. */
  stagger?: number;
  /** Initial Y offset (rotate mode only). Defaults to 48px. */
  y?: number;
  /** Initial rotation (rotate mode only, degrees). Defaults to 6deg. */
  rotate?: number;
  /** ScrollTrigger overrides. */
  scrollTrigger?: ScrollTriggerOverrides;
  /**
   * Skip splitting if the headline is already pre-split in JSX
   * (i.e. each word is already wrapped in the class given by `splitClass`).
   */
  preSplit?: boolean;
  /** Class applied to each word wrapper. Defaults to `"word"`. */
  splitClass?: string;
}
