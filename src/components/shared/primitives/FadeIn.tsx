"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Direction = "up" | "down" | "left" | "right" | "none";

const DIRECTION_OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
  none: { x: 0, y: 0 },
};

type FadeInProps = {
  children: ReactNode;
  /** Slide-from direction; "none" = pure fade */
  from?: Direction;
  /** Slide distance multiplier (default 1 = 24px) */
  distance?: number;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Animation duration in seconds; defaults to motion token dur.base */
  duration?: number;
  /** GSAP easing string; defaults to motion token ease.out */
  easing?: string;
  /** Trigger on scroll into view, vs. immediately on mount */
  onScroll?: boolean;
  /** ScrollTrigger start point (only when onScroll=true) */
  start?: string;
  /** Disable cleanup re-animation when scrolled out */
  once?: boolean;
  /** Override the rendered element (default div) */
  as?: ElementType;
  className?: string;
};

/**
 * FadeIn — drop-in wrapper for entrance animations. Replaces ~50 ad-hoc
 * GSAP timelines with a single declarative component using motion tokens.
 *
 * Defaults to a 24px slide-up over `dur.base` with `ease.out`. Set
 * `onScroll` to defer until the element enters the viewport.
 *
 * Usage:
 *   <FadeIn>Slides up on mount</FadeIn>
 *   <FadeIn from="left" delay={0.2}>Slides in from left after 200ms</FadeIn>
 *   <FadeIn onScroll>Animates when scrolled into view</FadeIn>
 *   <FadeIn from="none" duration={0.4}>Pure fade</FadeIn>
 */
export const FadeIn = ({
  children,
  from = "up",
  distance = 1,
  delay = 0,
  duration = dur.base,
  easing = ease.out,
  onScroll = false,
  start = "top 90%",
  once = true,
  as: Component = "div",
  className,
}: FadeInProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const offset = DIRECTION_OFFSETS[from];

      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          x: offset.x * distance,
          y: offset.y * distance,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: easing,
          ...(onScroll && {
            scrollTrigger: {
              trigger: ref.current,
              start,
              toggleActions: once ? "play none none none" : "play none none reverse",
              once,
            },
          }),
        },
      );
    },
    { dependencies: [from, delay, duration, easing, onScroll] },
  );

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
};
