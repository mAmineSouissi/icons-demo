"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WeDoDescription } from "./WeDoDescription";
import { dur, ease, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

import runningChar from "../../../../../public/lottie/Running_character.json";
import robotEye from "../../../../../public/lottie/Robot_Eye.json";
import rocketLaunch from "../../../../../public/lottie/Rocket_Launch.json";
import budLeaf from "../../../../../public/lottie/Bud_Leaf_2_fix.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    num: "01",
    emoji: "🎯",
    title: "Match",
    headline: "Find your perfect creator",
    body: "Our AI scans 50,000+ verified profiles and surfaces creators whose audience actually buys what you sell — not just anyone with a big follower count.",
    animationData: runningChar,
    tone: "gradient-accent",
  },
  {
    num: "02",
    emoji: "🤖",
    title: "Brief",
    headline: "AI-powered campaign briefs",
    body: "Smart briefing in minutes. Every creator gets personalized direction, key talking points, and creative freedom — all on-brand, always on message.",
    animationData: robotEye,
    tone: "gradient-cool",
  },
  {
    num: "03",
    emoji: "🚀",
    title: "Launch",
    headline: "Go live in 48 hours",
    body: "Content rolls out across Instagram, TikTok, YouTube, and beyond. Real-time tracking gives you impressions, reach, and conversions in one clean dashboard.",
    animationData: rocketLaunch,
    tone: "gradient-warm",
  },
  {
    num: "04",
    emoji: "🌱",
    title: "Bloom",
    headline: "Grow with every campaign",
    body: "Each campaign feeds the next. Audience insights deepen, creator relationships compound, and your brand becomes a permanent part of the culture.",
    animationData: budLeaf,
    tone: "gradient-mono",
  },
];

export const HowSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Draw the vertical progress line as user scrolls through the section
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        },
      );

      // Each step row reveals on scroll — alternating slide directions
      gsap.utils.toArray<Element>(".how-step").forEach((step, i) => {
        const isEven = i % 2 === 0;

        // Step number count-up effect
        const numEl = step.querySelector(".how-step-num");
        gsap.from(numEl, {
          opacity: 0,
          x: isEven ? -30 : 30,
          duration: dur.base,
          ease: ease.out,
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        // Text block
        gsap.from(step.querySelectorAll(".how-step-text > *"), {
          opacity: 0,
          y: 24,
          duration: dur.base,
          ease: ease.out,
          stagger: stagger.normal,
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          delay: 0.1,
        });

        // Lottie card — scale up from 0.85 with opacity
        gsap.from(step.querySelector(".how-lottie-wrap"), {
          opacity: 0,
          scale: 0.85,
          duration: dur.slow,
          ease: ease.bounce,
          scrollTrigger: {
            trigger: step,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          delay: 0.2,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-(--color-bg)"
    >
      {/* Section intro: left description */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <WeDoDescription />
      </div>

      {/* Steps — each row: number + text left, lottie right */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">

        {/* Vertical progress line */}
        <div
          className="absolute left-[2.75rem] md:left-14 top-0 bottom-0 w-px bg-(--color-border) hidden md:block"
          aria-hidden="true"
        >
          <div
            ref={lineRef}
            className="absolute inset-0 bg-(--color-accent) origin-top"
          />
        </div>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={cn(
                "how-step relative flex flex-col md:flex-row items-stretch gap-0 border-t border-(--color-border)",
                i === steps.length - 1 && "border-b",
              )}
            >
              {/* ── Left: Step number + text ── */}
              <div className="flex flex-row md:flex-col items-start md:items-start gap-6 md:gap-0 py-10 md:py-14 pl-0 pr-6 md:pl-0 md:pr-10 md:w-[55%]">
                {/* Number indicator — acts as dot on the line */}
                <div className="how-step-num flex-shrink-0 flex items-center gap-5 md:mb-6">
                  <div className="relative w-8 h-8 hidden md:flex items-center justify-center">
                    {/* Dot on timeline */}
                    <div className="w-2.5 h-2.5 rounded-full bg-(--color-accent) ring-4 ring-(--color-bg) relative z-10" />
                  </div>
                  <span className="font-display text-6xl md:text-8xl text-(--color-fg)/10 leading-none select-none tabular-nums">
                    {step.num}
                  </span>
                </div>

                {/* Text block */}
                <div className="how-step-text flex flex-col gap-3 md:pl-[3.25rem]">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label={step.title}>
                      {step.emoji}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-(--color-accent) font-medium">
                      {step.title}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-(--color-fg) leading-[1.1]">
                    {step.headline}
                  </h3>
                  <p className="text-sm md:text-base text-(--color-muted-fg) leading-relaxed max-w-lg">
                    {step.body}
                  </p>
                </div>
              </div>

              {/* ── Right: Lottie animation card ── */}
              <div className="how-lottie-wrap md:w-[45%] flex items-center justify-center p-8 md:p-12 border-t md:border-t-0 md:border-l border-(--color-border)">
                <div
                  className={cn(
                    step.tone,
                    "w-full max-w-[280px] aspect-square rounded-2xl flex items-center justify-center overflow-hidden relative group",
                  )}
                >
                  {/* Emoji badge */}
                  <span
                    className="absolute top-4 left-4 text-2xl z-10 select-none"
                    role="img"
                    aria-label={step.title}
                  >
                    {step.emoji}
                  </span>

                  <Lottie
                    animationData={step.animationData}
                    loop
                    autoplay
                    className="w-[85%] h-[85%] transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
