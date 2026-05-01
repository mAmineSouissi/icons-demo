"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CrowdedPeeps } from "./CrowdedPeeps";
import { WeDoDescription } from "./WeDoDescription";
import { dur, ease } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

      // Right column — clip wipe from right, slightly delayed
      tl.from(
        ".how-right",
        {
          clipPath: "inset(0 0 0 100%)",
          duration: dur.epic,
          ease: ease.cinematic,
        },
        "-=1.1",
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

        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
            <div
              className="how-left w-full lg:w-2/5"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <WeDoDescription className="h-full" />
            </div>
            <div
              className="how-right w-full lg:w-3/5"
              style={{ clipPath: "inset(0 0 0 100%)" }}
            >
              <CrowdedPeeps />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
