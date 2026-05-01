import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger as staggerTokens, scrollDefaults } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  delay?: number;
}

/**
 * useScrollReveal — attach to a container ref, targets selector inside it.
 * All GSAP cleanup is automatic via useGSAP scope.
 *
 * @example
 * const ref = useScrollReveal<HTMLDivElement>(".card", { y: 80, stagger: 0.12 });
 * <div ref={ref}> <div className="card" /> </div>
 */
export function useScrollReveal<T extends HTMLElement>(
  selector: string,
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);

  const {
    y        = 60,
    x        = 0,
    scale    = 0.97,
    rotation = 0,
    stagger  = staggerTokens.normal,
    duration = dur.slow,
    start    = scrollDefaults.start,
    once     = false,
    delay    = 0,
  } = options;

  useGSAP(
    () => {
      gsap.from(selector, {
        y,
        x,
        scale,
        rotation,
        opacity: 0,
        duration,
        ease:    ease.out,
        stagger,
        delay,
        scrollTrigger: {
          trigger:       ref.current,
          start,
          toggleActions: once
            ? "play none none none"
            : scrollDefaults.toggleActions,
        },
      });
    },
    { scope: ref },
  );

  return ref;
}

/**
 * useWordReveal — splits a text into per-word overflow-hidden masks,
 * returns the words array and a ref for the container.
 * Animate .word-inner inside each .word-mask with y: "100%"
 */
export function splitWords(text: string): string[] {
  return text.split(" ");
}
