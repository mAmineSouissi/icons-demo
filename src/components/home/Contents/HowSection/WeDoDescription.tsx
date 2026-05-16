"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface WeDoDescriptionProps {
  className?: string;
}

export const WeDoDescription = ({ className }: WeDoDescriptionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".how-eyebrow", {
        opacity: 0,
        x: -20,
        duration: dur.fast,
        ease: ease.out,
      });

      tl.from(
        ".how-title",
        { y: 40, opacity: 0, duration: dur.slow, ease: ease.cinematic },
        "-=0.2",
      );

      tl.from(
        ".how-body",
        { y: 20, opacity: 0, duration: dur.base, ease: ease.out },
        "-=0.4",
      );

      tl.from(
        ".how-stat",
        {
          opacity: 0,
          y: 16,
          duration: dur.base,
          ease: ease.out,
          stagger: 0.1,
        },
        "-=0.3",
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col justify-center p-8 lg:p-14 gap-6",
        className,
      )}
    >
      {/* Eyebrow */}
      <div className="how-eyebrow flex items-center gap-3">
        <span className="h-px w-6 bg-(--color-accent) inline-block" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-(--color-muted-fg) font-medium">
          Process
        </span>
      </div>

      {/* Heading */}
      <h2 className="how-title font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-(--color-fg)">
        How We Make<br />
        <span className="text-(--color-accent)">It Happen.</span>
      </h2>

      {/* Body */}
      <p className="how-body text-base md:text-lg text-(--color-muted-fg) leading-relaxed max-w-md">
        Four steps from discovery to results — no guesswork, no bloated
        agencies, no wasted spend. Just creators who move the needle.
      </p>

      {/* Stats row */}
      <div className="flex flex-wrap gap-8 pt-2">
        {[
          { val: "48h", label: "Campaign live" },
          { val: "50K+", label: "Vetted creators" },
          { val: "2×", label: "Average ROI" },
        ].map(({ val, label }) => (
          <div key={label} className="how-stat flex flex-col gap-1">
            <span className="font-display text-3xl text-(--color-fg) leading-none">
              {val}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-(--color-muted-fg)">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
