import type { RefObject } from "react";
import type ScrollTriggerLib from "gsap/ScrollTrigger";

/**
 * Refs passed into `useHorizontalPin`:
 *  - `pin`   → the outer container whose height becomes the scroll length
 *  - `stage` → the fixed viewport-sized element that gets pinned
 *  - `track` → the inner flex track that translates horizontally
 */
export interface HorizontalPinRefs<
  P extends HTMLElement = HTMLDivElement,
  S extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLDivElement,
> {
  pin: RefObject<P | null>;
  stage: RefObject<S | null>;
  track: RefObject<T | null>;
}

/**
 * Progress callback fires on every scroll update with normalized progress
 * (0–1) plus the underlying ScrollTrigger instance for advanced use.
 */
export type HorizontalPinProgress = (
  progress: number,
  trigger: ScrollTriggerLib,
) => void;

export interface UseHorizontalPinOptions {
  /** Scrub lag in seconds, or `true` for unsmoothed. Defaults to 1.5. */
  scrub?: number | boolean;
  /**
   * Pin spacing: when true, the page reserves height for the pinned section.
   * Defaults to true.
   */
  pinSpacing?: boolean;
  /**
   * Optional callback for scroll progress — wire this to active-step
   * indicators (dots, scroll hints, etc.).
   */
  onProgress?: HorizontalPinProgress;
  /**
   * Recompute the scroll distance on window resize. Defaults to true.
   */
  invalidateOnRefresh?: boolean;
}
