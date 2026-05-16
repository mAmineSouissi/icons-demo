"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AboutUsCard } from "./AboutUsCard";
import { dur, ease, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HEADING_WORDS = ["ABOUT", "US"];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Accent line draws in
      tl.from(".about-divider", {
        scaleX: 0,
        duration: dur.base,
        ease: ease.inOut,
        transformOrigin: "left center",
      });

      // Section label fades up
      tl.from(
        ".about-label",
        {
          y: 16,
          opacity: 0,
          duration: dur.fast,
          ease: ease.out,
        },
        "-=0.3",
      );

      // Word mask reveal — each word slides up from its overflow-hidden mask
      tl.from(
        ".about-word-inner",
        {
          y: "105%",
          duration: dur.epic,
          ease: ease.cinematic,
          stagger: stagger.wide,
        },
        "-=0.2",
      );

      // Card entrance
      tl.from(
        ".about-card-wrap",
        {
          y: 50,
          opacity: 0,
          duration: dur.slow,
          ease: ease.out,
        },
        "-=0.6",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section label + divider */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="about-divider h-px flex-1 max-w-[3rem]"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span
            className="about-label text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--muted)" }}
          >
            Our Story
          </span>
        </div>

        {/* Word-masked heading */}
        <h2
          className="flex flex-wrap gap-x-6 mb-16 leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
          }}
          aria-label="About Us"
        >
          {HEADING_WORDS.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden leading-[0.9]"
            >
              <span
                className="about-word-inner inline-block"
                style={{ color: "var(--fg)" }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Card */}
        <div className="about-card-wrap">
          <AboutUsCard />
        </div>
      </div>
    </section>
  );
};
