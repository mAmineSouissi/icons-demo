import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { UseIdleLoopOptions } from "@/types/animations";
import { prefersReducedMotion, registerAnimationPlugins } from "./registerPlugins";

registerAnimationPlugins();

/**
 * useIdleLoop — applies a continuous yoyo (or linear) loop to a set of
 * elements inside the scope ref. The "ambient motion" that runs after
 * the entrance settles: floater bob, sparkle drift, badge wiggle, card
 * breathing, star spin.
 *
 * Honors `prefers-reduced-motion` (skips the loop entirely).
 *
 * @example
 * const ref = useIdleLoop<HTMLElement>({
 *   selector: ".hero-floater",
 *   y: "+=14",
 *   rotate: "+=6",
 *   duration: 2.4,
 *   stagger: { each: 0.3, from: "random" },
 * });
 */
export function useIdleLoop<T extends HTMLElement>(
  options: UseIdleLoopOptions,
) {
  const internalRef = useRef<T>(null);
  const ref = (options.scope as typeof internalRef | undefined) ?? internalRef;
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const {
    selector,
    mode = "yoyo",
    y,
    x,
    scale,
    rotate,
    opacity,
    duration = 2.4,
    ease = "sine.inOut",
    delay = 0,
    stagger,
    enabled = true,
  } = options;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !enabled) return;

      const targets = Array.isArray(selector) ? selector.join(",") : selector;
      if (!targets) return;

      const vars: gsap.TweenVars = {
        duration,
        ease: mode === "linear" ? "none" : ease,
        delay,
        repeat: -1,
        yoyo: mode === "yoyo",
      };
      if (y !== undefined) vars.y = y;
      if (x !== undefined) vars.x = x;
      if (scale !== undefined) vars.scale = scale;
      if (rotate !== undefined) vars.rotate = rotate;
      if (opacity !== undefined) vars.opacity = opacity;
      if (stagger !== undefined) vars.stagger = stagger;

      tweenRef.current = gsap.to(targets, vars);
    },
    { scope: ref, dependencies: [enabled] },
  );

  // Allow callers to flip `enabled` at runtime — pause/resume the tween.
  useEffect(() => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (enabled) tween.play();
    else tween.pause();
  }, [enabled]);

  return ref;
}
