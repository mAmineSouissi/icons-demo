"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WeDoDescription } from "./WeDoDescription";
import { dur, ease, stagger } from "@/lib/motion";

import runningChar from "../../../../../public/lottie/Running_character.json";
import robotEye from "../../../../../public/lottie/Robot_Eye.json";
import budLeaf2 from "../../../../../public/lottie/Bud_Leaf_2_fix.json";
import rocketLaunch from "../../../../../public/lottie/Rocket_Launch.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, useGSAP);

const lottiePanels = [
  { animationData: runningChar, label: "Creators on the move" },
  { animationData: robotEye, label: "AI-powered matching" },
  { animationData: rocketLaunch, label: "Organic growth" },
  { animationData: budLeaf2, label: "Brand blooming" },
];

export const HowSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Section label draws in
      tl.from(".how-section-label", {
        scaleX: 0,
        opacity: 0,
        duration: dur.fast,
        ease: ease.out,
        transformOrigin: "left center",
      });

      // Left column — clip wipe from left
      tl.from(
        ".how-left",
        {
          clipPath: "inset(0 100% 0 0)",
          duration: dur.epic,
          ease: ease.cinematic,
        },
        "-=0.1",
      );

      // Right column — clip wipe from right simultaneously
      tl.from(
        ".how-right",
        {
          clipPath: "inset(0 0 0 100%)",
          duration: dur.epic,
          ease: ease.cinematic,
        },
        "<",
      );

      // Lottie cards stagger up
      tl.from(
        ".how-lottie-card",
        {
          y: 40,
          opacity: 0,
          duration: dur.base,
          ease: ease.out,
          stagger: stagger.normal,
        },
        "-=0.8",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="how-section-label h-px w-8"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--muted)" }}
          >
            How We Work
          </span>
        </div>

        <div className="overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
            {/* Text side */}
            <div className="how-left w-full lg:w-2/5">
              <WeDoDescription className="h-full" />
            </div>

            {/* Lottie grid side */}
            <div className="how-right w-full lg:w-3/5 p-8 grid grid-cols-2 gap-6 content-center">
              {lottiePanels.map(({ animationData, label }) => (
                <div
                  key={label}
                  className="how-lottie-card group flex flex-col items-center gap-3 p-2 cursor-default"
                >
                  <div className="w-full aspect-square max-h-[160px] flex items-center justify-center">
                    <Lottie
                      animationData={animationData}
                      loop
                      autoplay
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <span
                    className="text-xs font-medium text-center tracking-wide"
                    style={{ color: "var(--muted)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
