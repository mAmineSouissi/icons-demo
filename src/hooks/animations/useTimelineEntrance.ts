import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type {
  TimelineBuilder,
  UseTimelineEntranceOptions,
} from "@/types/animations";
import { prefersReducedMotion, registerAnimationPlugins } from "./registerPlugins";

registerAnimationPlugins();

/**
 * useTimelineEntrance — build a paused master timeline and play it when
 * the `ready` flag flips true (typically post-preloader).
 *
 * The build callback receives the timeline + scope ref so callers can
 * `tl.fromTo(...)` and chain like they would inside a raw `useGSAP`.
 *
 * @example
 * const ref = useTimelineEntrance<HTMLElement>(({ tl }) => {
 *   tl.fromTo(".hero-card", { y: 40, opacity: 0 },
 *                          { y: 0, opacity: 1, duration: dur.slow });
 *   tl.fromTo(".hero-letter", { y: 30, opacity: 0 },
 *                            { y: 0, opacity: 1, stagger: stagger.tight }, "-=0.5");
 * }, { ready });
 */
export function useTimelineEntrance<T extends HTMLElement>(
  build: TimelineBuilder<T>,
  options: UseTimelineEntranceOptions = {},
) {
  const internalRef = useRef<T>(null);
  const ref = (options.scope as typeof internalRef | undefined) ?? internalRef;
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const {
    ready = true,
    delay = 0.15,
    restartOnReady = false,
    dependencies = [],
  } = options;

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true, delay });
      tlRef.current = tl;

      // Reduced motion → still build the timeline (callers might attach
      // post-entrance idle loops) but jump straight to the end state.
      if (prefersReducedMotion()) {
        build({ tl, ref });
        tl.progress(1).pause();
        return;
      }

      build({ tl, ref });

      if (ready) tl.play();
    },
    { scope: ref, dependencies },
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || !ready) return;
    if (tl.paused()) tl.play();
    else if (restartOnReady) tl.restart();
  }, [ready, restartOnReady]);

  return { ref, timeline: tlRef };
}
