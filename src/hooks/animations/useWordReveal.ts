import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  dur,
  ease,
  scrollDefaults,
  stagger as staggerTokens,
} from "@/lib/motion";
import type { UseWordRevealOptions } from "@/types/animations";
import { prefersReducedMotion, registerAnimationPlugins } from "./registerPlugins";

registerAnimationPlugins();

const WORD_CLASS_DEFAULT = "word";

/**
 * Split a string into per-word HTML wrappers.
 *  - "mask" mode wraps each word in an overflow-hidden span; inner span starts
 *    pushed below the mask (yPercent: 110) and rises into view.
 *  - "rotate" mode is a single span per word; we animate y + rotate.
 */
function splitHeadlineInto(
  el: HTMLElement,
  mode: "mask" | "rotate",
  wordClass: string,
): void {
  const text = el.textContent ?? "";
  if (!text.trim()) return;

  const words = text.split(/\s+/).filter(Boolean);
  if (mode === "mask") {
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="${wordClass} inline-block overflow-hidden align-bottom mr-[0.2em] last:mr-0"><span class="${wordClass}-inner inline-block">${w}</span></span>`,
      )
      .join("");
  } else {
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="${wordClass} inline-block align-bottom"><span class="${wordClass}-inner inline-block">${w}&nbsp;</span></span>`,
      )
      .join("");
  }
}

/**
 * useWordReveal — split a headline into words and reveal them on scroll.
 *
 * Two modes:
 *   - "mask"   (default) — cinematic curtain reveal from below a clip mask.
 *   - "rotate"           — softer y + rotate, no overflow mask required.
 *
 * The hook returns a ref you attach to the *section* (not the headline);
 * pass the selector for the headline inside that scope.
 *
 * @example
 * const ref = useWordReveal<HTMLElement>({ selector: ".section-title" });
 * return <section ref={ref}><h2 className="section-title">Big copy</h2></section>;
 */
export function useWordReveal<T extends HTMLElement>(
  options: UseWordRevealOptions,
) {
  const internalRef = useRef<T>(null);
  const ref = (options.scope as typeof internalRef | undefined) ?? internalRef;

  const {
    selector,
    mode = "mask",
    stagger = staggerTokens.normal,
    y = 48,
    rotate = 6,
    duration = dur.slow,
    ease: easing = ease.out,
    delay = 0,
    scrollTrigger,
    preSplit = false,
    splitClass = WORD_CLASS_DEFAULT,
  } = options;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const headline = root.querySelector<HTMLElement>(selector);
      if (!headline) return;

      if (!preSplit) {
        splitHeadlineInto(headline, mode, splitClass);
      }

      const inners = headline.querySelectorAll(`.${splitClass}-inner`);
      if (!inners.length) return;

      if (prefersReducedMotion()) {
        gsap.set(inners, { y: 0, yPercent: 0, rotate: 0, opacity: 1 });
        return;
      }

      const from: gsap.TweenVars =
        mode === "mask"
          ? { yPercent: 110, opacity: 0 }
          : { y, rotate, opacity: 0 };

      gsap.fromTo(inners, from, {
        yPercent: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        duration,
        ease: easing,
        delay,
        stagger,
        overwrite: "auto",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: root,
          start: scrollTrigger?.start ?? scrollDefaults.start,
          end: scrollTrigger?.end,
          toggleActions: scrollTrigger?.once
            ? "play none none none"
            : (scrollTrigger?.toggleActions ?? scrollDefaults.toggleActions),
          once: scrollTrigger?.once,
          markers: scrollTrigger?.markers,
        },
      });
    },
    { scope: ref, dependencies: [selector, mode] },
  );

  return ref;
}
