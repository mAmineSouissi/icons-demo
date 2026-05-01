"use client";

import React, { useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Child wrapper ────────────────────────────────────────────── */
export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card absolute inset-0 origin-top ${itemClassName}`.trim()}
    style={{ willChange: "transform, filter" }}
  >
    {children}
  </div>
);

/* ── Props ────────────────────────────────────────────────────── */
interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  /** How much total scroll distance per card (in vh). Default 100. */
  scrollPerCard?: number;
  /** Scale reduction per depth level (0.04 = 4 %). */
  depthScale?: number;
  /** Brightness reduction per depth level (0.08 = 8 %). */
  depthDim?: number;
  /** ScrollTrigger scrub value. */
  scrub?: number | boolean;
  /** Callback when the last card has fully entered. */
  onStackComplete?: () => void;
}

/* ── Component ────────────────────────────────────────────────── */
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  scrollPerCard = 100,
  depthScale = 0.04,
  depthDim = 0.08,
  scrub = 0.4,
  onStackComplete,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const childArray = React.Children.toArray(children);
  const total = childArray.length;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        ".scroll-stack-card",
        wrapperRef.current,
      );
      if (!cards.length) return;

      // Assign ascending z-index so later cards render on top
      cards.forEach((card, i) => {
        card.style.zIndex = String(i + 1);
        if (i > 0) card.style.transform = "translateY(100%)";
      });

      // Pin the wrapper for the full scroll distance
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${total * scrollPerCard}vh`,
        pin: wrapperRef.current,
        pinSpacing: true,
      });

      // Animate each card (except the first) sliding up to overlay
      cards.forEach((card, i) => {
        if (i === 0) return;

        // Slide up
        gsap.fromTo(
          card,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `${(i / total) * 100}% top`,
              end: () => `${((i + 0.5) / total) * 100}% top`,
              scrub,
            },
          },
        );

        // Scale + dim previous cards to create depth
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          gsap.to(cards[j], {
            scale: 1 - depth * depthScale,
            filter: `brightness(${1 - depth * depthDim})`,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `${(i / total) * 100}% top`,
              end: () => `${((i + 0.5) / total) * 100}% top`,
              scrub,
            },
          });
        }

        // Fire callback when last card settles
        if (i === cards.length - 1 && onStackComplete) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: () => `${((i + 0.5) / total) * 100}% top`,
            onEnter: onStackComplete,
          });
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`.trim()}
      style={{ zIndex: 1 }}
    >
      <div
        ref={wrapperRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full h-full max-w-5xl mx-auto px-8">
          {childArray.map((child, i) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement, { key: i })
              : child,
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollStack;
