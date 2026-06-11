import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { UseMarqueeOptions } from "@/types/animations";
import { prefersReducedMotion, registerAnimationPlugins } from "./registerPlugins";

registerAnimationPlugins();

/**
 * useMarquee — infinite horizontal scroll for a duplicated track.
 *
 * The hook returns a ref you attach to the inner *track* (not the wrapper).
 * The track must contain two copies of the marquee content side by side so
 * the `-50%` translation looks seamless.
 *
 * @example
 * const trackRef = useMarquee<HTMLDivElement>({ duration: 36 });
 * return (
 *   <div className="overflow-hidden">
 *     <div ref={trackRef} className="flex gap-5">{[...items, ...items].map(...)}</div>
 *   </div>
 * );
 */
export function useMarquee<T extends HTMLElement>(
  options: UseMarqueeOptions = {},
) {
  const internalRef = useRef<T>(null);
  const ref = (options.scope as typeof internalRef | undefined) ?? internalRef;

  const {
    duration = 36,
    direction = "left",
    respectReducedMotion = true,
  } = options;

  useGSAP(
    () => {
      if (respectReducedMotion && prefersReducedMotion()) return;
      if (!ref.current) return;

      const xPercent = direction === "left" ? -50 : 50;

      gsap.fromTo(
        ref.current,
        { xPercent: direction === "left" ? 0 : -50 },
        {
          xPercent,
          ease: "none",
          duration,
          repeat: -1,
        },
      );
    },
    { scope: ref, dependencies: [duration, direction] },
  );

  return ref;
}
