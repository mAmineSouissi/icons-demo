import { ChevronDown } from "lucide-react";
import React, { useRef } from "react";
import TextType from "@/components/shared/TextType";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease } from "@/lib/motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GOOEY_TEXTS = ["Icons.", "Creators.", "Icons.", "Culture.", "Icons."];

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Eyebrow label
      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: -10,
        duration: dur.fast,
        ease: ease.out,
      });

      // Gooey title wrapper
      tl.from(
        ".hero-title-wrap",
        { opacity: 0, y: 30, duration: dur.base, ease: ease.out },
        "-=0.1",
      );

      // Divider expands
      tl.from(
        ".hero-divider",
        { scaleX: 0, duration: dur.fast, ease: ease.out, transformOrigin: "center" },
        "-=0.3",
      );

      // Subtitle wipe
      tl.from(
        ".hero-typewriter",
        { clipPath: "inset(0 100% 0 0)", opacity: 0, duration: dur.base, ease: ease.out },
        "-=0.2",
      );

      // CTA buttons
      tl.from(
        ".hero-cta",
        { opacity: 0, y: 12, duration: dur.base, ease: ease.out, stagger: 0.08 },
        "-=0.3",
      );

      // Scroll cue
      tl.from(scrollCueRef.current, { opacity: 0, duration: dur.base }, "-=0.2");

      // Chevron breathes — Disney follow-through
      gsap.to(chevronRef.current, {
        y: 8,
        duration: 0.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Content clips upward on scroll (cinematic exit)
      gsap.to(contentRef.current, {
        clipPath: "inset(0 0 100% 0)",
        ease: ease.scrub,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "42% top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      // -mt-24 compensates for Layout's pt-24, giving a true full-viewport hero
      className="h-screen -mt-24 flex flex-col items-center justify-center relative isolate overflow-hidden"
    >
      {/* Radial accent glow behind the title */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 68%)",
          opacity: 0.13,
        }}
        aria-hidden="true"
      />

      {/* Hero content — centered in true viewport */}
      <div
        ref={contentRef}
        className="flex flex-col items-center text-center px-6 pt-24 gap-5 z-10 w-full"
        style={{ willChange: "clip-path", clipPath: "inset(0 0 0% 0)" }}
      >
        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3">
          <span className="h-px w-5 bg-(--color-accent)/60 inline-block" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-(--color-muted-fg) font-medium">
            The Creator Platform
          </span>
          <span className="h-px w-5 bg-(--color-accent)/60 inline-block" />
        </div>

        {/* GooeyText morphing title */}
        <div className="hero-title-wrap w-full">
          <GooeyText
            texts={GOOEY_TEXTS}
            morphTime={1.2}
            cooldownTime={2.8}
            className="h-20 sm:h-24 md:h-32 lg:h-40 w-full"
            textClassName="font-display font-black leading-none text-[clamp(3.5rem,8.5vw,8rem)]"
          />
        </div>

        {/* Divider */}
        <div className="hero-divider w-20 h-px bg-(--color-border-strong)/60 mx-auto" />

        {/* Typewriter tagline */}
        <div
          className="hero-typewriter"
          style={{ fontFamily: '"snaga-unicase-display", sans-serif', fontWeight: 300 }}
        >
          <TextType
            text={[
              "The UGC platform",
              "where every face is an icon.",
              "Join us today!",
            ]}
            typingSpeed={70}
            pauseDuration={1500}
            showCursor={true}
            className="text-[clamp(0.85rem,2vw,1.4rem)] text-(--color-muted-fg) tracking-wide"
            cursorCharacter="|"
            cursorClassName="font-sans font-thin text-[0.75em] opacity-50 align-middle"
          />
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Link
            href="/creators"
            className="hero-cta inline-flex items-center gap-2 px-6 py-3 rounded-full bg-(--color-fg) text-(--color-bg) text-sm font-medium transition-all duration-300 hover:bg-(--color-accent) hover:text-white"
          >
            Start Creating
          </Link>
          <Link
            href="/brands"
            className="hero-cta inline-flex items-center gap-2 px-6 py-3 rounded-full border border-(--color-border) text-(--color-fg) text-sm font-medium transition-all duration-300 hover:border-(--color-border-strong) hover:bg-(--color-panel-2)/60"
          >
            For Brands
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-2 cursor-pointer group z-10"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-(--color-muted-fg)/70 group-hover:text-(--color-muted-fg) transition-colors duration-300">
          Scroll
        </span>
        <div ref={chevronRef}>
          <ChevronDown
            className="w-4 h-4 text-(--color-muted-fg)/60 group-hover:text-(--color-accent) transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </section>
  );
};
