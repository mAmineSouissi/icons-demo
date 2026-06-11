import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  dur,
  ease,
  scrollDefaults,
  stagger as staggerTokens,
} from "@/lib/motion";
import type { UseEntranceOptions } from "@/types/animations";
import { prefersReducedMotion, registerAnimationPlugins } from "./registerPlugins";

registerAnimationPlugins();

/**
 * useEntrance — scroll-triggered (or immediate) reveal for one or more
 * targets inside a scope ref.
 *
 * Replaces the ad-hoc `gsap.from(..., { scrollTrigger: ... })` blocks used
 * across the home sections. All durations/eases/staggers come from
 * `src/lib/motion.ts`, ScrollTrigger defaults from there too.
 *
 * @example
 * const ref = useEntrance<HTMLElement>({
 *   selector: ".bsp-logo",
 *   y: 16,
 *   stagger: stagger.normal,
 *   scrollTrigger: { once: true },
 * });
 */
export function useEntrance<T extends HTMLElement>(
  options: UseEntranceOptions,
) {
  const internalRef = useRef<T>(null);
  const ref = (options.scope as typeof internalRef | undefined) ?? internalRef;

  const {
    selector,
    y = 0,
    x = 0,
    scale = 1,
    rotate = 0,
    opacity = 0,
    clipPath,
    stagger,
    duration = dur.slow,
    ease: easing = ease.out,
    delay = 0,
    scrollTrigger,
    scroll = true,
    clearProps = true,
  } = options;

  useGSAP(
    () => {
      const targets = Array.isArray(selector) ? selector.join(",") : selector;
      if (!targets) return;

      // Reduced motion → snap straight to the end state, skip the tween.
      if (prefersReducedMotion()) {
        gsap.set(targets, {
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          clipPath: clipPath ? "inset(0 0 0 0)" : undefined,
        });
        return;
      }

      const fromVars: gsap.TweenVars = {
        y,
        x,
        scale,
        rotate,
        opacity,
      };
      if (clipPath !== undefined) fromVars.clipPath = clipPath;

      const toVars: gsap.TweenVars = {
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration,
        ease: easing,
        delay,
        stagger: stagger ?? (Array.isArray(selector) ? staggerTokens.normal : 0),
        overwrite: "auto",
      };
      if (clipPath !== undefined) toVars.clipPath = "inset(0 0 0 0)";
      if (clearProps) toVars.clearProps = "transform,opacity,clipPath";

      if (scroll) {
        toVars.scrollTrigger = {
          trigger: ref.current,
          start: scrollTrigger?.start ?? scrollDefaults.start,
          end: scrollTrigger?.end,
          scrub: scrollTrigger?.scrub,
          pin: scrollTrigger?.pin,
          markers: scrollTrigger?.markers,
          toggleActions: scrollTrigger?.once
            ? "play none none none"
            : (scrollTrigger?.toggleActions ?? scrollDefaults.toggleActions),
          once: scrollTrigger?.once,
        };
      }

      gsap.fromTo(targets, fromVars, toVars);
    },
    { scope: ref },
  );

  return ref;
}
