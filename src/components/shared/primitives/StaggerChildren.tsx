"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger as staggerTokens } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StaggerChildrenProps = {
  children: ReactNode;
  /** CSS selector for child elements to stagger (relative to wrapper) */
  selector?: string;
  /** Time between each child's entrance — tight=0.05, normal=0.07, wide=0.12, cards=0.15 */
  stagger?: keyof typeof staggerTokens | number;
  /** Initial Y offset in px */
  y?: number;
  /** Duration of each child's entrance */
  duration?: number;
  /** GSAP easing string */
  easing?: string;
  /** Start delay before first child */
  delay?: number;
  /** Trigger on scroll into view */
  onScroll?: boolean;
  /** ScrollTrigger start point */
  start?: string;
  as?: ElementType;
  className?: string;
};

/**
 * StaggerChildren — animates direct children with a staggered entrance.
 * Replaces ad-hoc patterns like:
 *
 *   gsap.from(".some-item", { y: 24, opacity: 0, stagger: 0.07, ... });
 *
 * Children are matched via `selector` (defaults to direct `> *`).
 *
 * Usage:
 *   <StaggerChildren>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </StaggerChildren>
 *
 *   <StaggerChildren selector=".thread" stagger="cards" onScroll>
 *     {threads.map(...)}
 *   </StaggerChildren>
 */
export const StaggerChildren = ({
  children,
  selector = "> *",
  stagger = "normal",
  y = 24,
  duration = dur.base,
  easing = ease.out,
  delay = 0,
  onScroll = false,
  start = "top 85%",
  as: Component = "div",
  className,
}: StaggerChildrenProps) => {
  const ref = useRef<HTMLElement>(null);
  const staggerValue = typeof stagger === "number" ? stagger : staggerTokens[stagger];

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll(`:scope ${selector}`);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: easing,
          stagger: staggerValue,
          ...(onScroll && {
            scrollTrigger: {
              trigger: ref.current,
              start,
              toggleActions: "play none none none",
              once: true,
            },
          }),
        },
      );
    },
    { scope: ref, dependencies: [selector, staggerValue, y, duration, easing, delay, onScroll] },
  );

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
};
