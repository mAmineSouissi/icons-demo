"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger as staggerTokens } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  /** Type of reveal animation */
  variant?: "slide-up" | "mask-up" | "split-words" | "scale-pop";
  /** Trigger on scroll vs immediate */
  onScroll?: boolean;
  /** Start position for ScrollTrigger */
  start?: string;
  /** Animation duration */
  duration?: number;
  /** Stagger between split words (split-words variant only) */
  wordStagger?: keyof typeof staggerTokens | number;
  className?: string;
};

/**
 * Reveal — high-level entrance animation with stylistic presets matching
 * the existing brand language (mask-up text, scale-pop stickers, etc.).
 *
 * Replaces the ~10 places that hand-roll these patterns.
 *
 * Variants:
 *   slide-up    — element slides up with fade (most common)
 *   mask-up     — text rises from below a clip mask (cinematic)
 *   split-words — splits text content by word and staggers each
 *   scale-pop   — bouncy scale + fade (sticker / CTA energy)
 *
 * Usage:
 *   <Reveal variant="split-words" onScroll>
 *     Real briefs. Real rates.
 *   </Reveal>
 *
 *   <Reveal variant="scale-pop" duration={0.4}>
 *     <StickerCard>...</StickerCard>
 *   </Reveal>
 */
export const Reveal = ({
  children,
  variant = "slide-up",
  onScroll = true,
  start = "top 85%",
  duration = dur.base,
  wordStagger = "tight",
  className,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const staggerValue =
    typeof wordStagger === "number" ? wordStagger : staggerTokens[wordStagger];

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;

      const triggerConfig = onScroll
        ? {
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none" as const,
              once: true,
            },
          }
        : {};

      switch (variant) {
        case "slide-up": {
          gsap.fromTo(
            el,
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration, ease: ease.out, ...triggerConfig },
          );
          break;
        }

        case "mask-up": {
          gsap.set(el, { overflow: "hidden" });
          gsap.fromTo(
            el.children,
            { yPercent: 110, rotation: 4 },
            {
              yPercent: 0,
              rotation: 0,
              duration: dur.epic,
              ease: ease.cinematic,
              transformOrigin: "bottom center",
              ...triggerConfig,
            },
          );
          break;
        }

        case "split-words": {
          // Split text content by word and wrap each in a span
          const text = el.textContent ?? "";
          el.innerHTML = text
            .split(/(\s+)/)
            .map((part) =>
              part.trim()
                ? `<span class="rv-word inline-block" style="overflow:hidden"><span class="rv-word-inner inline-block">${part}</span></span>`
                : part,
            )
            .join("");
          gsap.fromTo(
            el.querySelectorAll(".rv-word-inner"),
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: dur.epic,
              ease: ease.cinematic,
              stagger: staggerValue,
              ...triggerConfig,
            },
          );
          break;
        }

        case "scale-pop": {
          gsap.fromTo(
            el,
            { scale: 0.92, opacity: 0, y: 16 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: dur.base,
              ease: ease.bounce,
              ...triggerConfig,
            },
          );
          break;
        }
      }
    },
    { dependencies: [variant, onScroll, duration, staggerValue] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
