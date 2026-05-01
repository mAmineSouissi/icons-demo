"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UpperContentProps {
  className?: string;
}

const textLines = [
  { text: "WE ARE WE ARE", size: "text-sm", tracking: "tracking-[0.3em]" },
  { text: "IDOLS IDOLS", size: "text-3xl", tracking: "tracking-tight" },
  {
    text: "AND WE'RE AND WE'RE",
    size: "text-sm",
    tracking: "tracking-[0.3em]",
  },
  { text: "HERE TO HERE TO", size: "text-sm", tracking: "tracking-[0.3em]" },
  {
    text: "STEAL THE STEAL THE",
    size: "text-sm",
    tracking: "tracking-[0.3em]",
  },
  {
    text: "SPOTLIGHT. SPOTLIGHT.",
    size: "text-sm",
    tracking: "tracking-[0.3em]",
  },
];

export const UpperContent = ({ className }: UpperContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reveal each line's inner span from below its overflow-hidden mask
      gsap.from(".upper-line-inner", {
        y: "110%",
        duration: dur.slow,
        ease: ease.cinematic,
        stagger: stagger.normal,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn("justify-center content-center items-center", className)}
    >
      <div className="text-center mb-4 space-y-1">
        {textLines.map((line, index) => (
          // overflow-hidden acts as the mask; inner span slides up into view
          <div key={index} className="overflow-hidden leading-[1.2]">
            <p
              className={`upper-line-inner inline-block ${line.size} ${line.tracking} font-bold text-(--color-fg)`}
            >
              {line.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
