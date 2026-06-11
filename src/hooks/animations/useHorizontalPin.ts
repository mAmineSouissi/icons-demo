import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type {
  HorizontalPinRefs,
  UseHorizontalPinOptions,
} from "@/types/animations";
import { prefersReducedMotion, registerAnimationPlugins } from "./registerPlugins";

registerAnimationPlugins();

/**
 * useHorizontalPin — pinned horizontal scrub. The user scrolls vertically;
 * the page pins the stage and translates the inner track left until the
 * last card is visible.
 *
 * Returns three refs you attach to:
 *   - `pin`   → outer wrapper whose height becomes the scroll length
 *   - `stage` → fixed viewport-sized container that gets pinned
 *   - `track` → flex row that translates horizontally
 *
 * @example
 * const { pin, stage, track } = useHorizontalPin<HTMLDivElement>({
 *   onProgress: (p) => setActiveStep(Math.round(p * (steps.length - 1))),
 * });
 * return (
 *   <div ref={pin}>
 *     <div ref={stage} className="h-screen overflow-hidden">
 *       <div ref={track} className="flex gap-5 h-full">{cards}</div>
 *     </div>
 *   </div>
 * );
 */
export function useHorizontalPin<
  P extends HTMLElement = HTMLDivElement,
  S extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLDivElement,
>(options: UseHorizontalPinOptions = {}): HorizontalPinRefs<P, S, T> {
  const pin = useRef<P>(null);
  const stage = useRef<S>(null);
  const track = useRef<T>(null);

  const {
    scrub = 1.5,
    pinSpacing = true,
    onProgress,
    invalidateOnRefresh = true,
  } = options;

  useGSAP(
    () => {
      const pinEl = pin.current;
      const stageEl = stage.current;
      const trackEl = track.current;
      if (!pinEl || !stageEl || !trackEl) return;

      // Reduced motion: drop the pin entirely. The cards become a normal
      // horizontally-scrollable row (user can swipe / shift+wheel).
      if (prefersReducedMotion()) {
        stageEl.style.overflowX = "auto";
        return;
      }

      const getScrollAmount = () =>
        -(trackEl.scrollWidth - window.innerWidth);

      gsap.to(trackEl, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: stageEl,
          pinSpacing,
          scrub,
          invalidateOnRefresh,
          onUpdate: onProgress
            ? (self) => onProgress(self.progress, self)
            : undefined,
        },
      });
    },
    { scope: pin, dependencies: [scrub, pinSpacing, invalidateOnRefresh] },
  );

  return { pin, stage, track };
}
