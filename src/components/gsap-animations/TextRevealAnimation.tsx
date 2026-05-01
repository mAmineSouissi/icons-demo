"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const TextRevealAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split heading text into individual characters manually
      const heading = headingRef.current;
      if (!heading) return;

      const text = heading.textContent || "";
      heading.innerHTML = "";
      const chars: HTMLSpanElement[] = [];

      // Split into words first, then chars, preserving spaces
      text.split(" ").forEach((word, wi) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.textContent = char;
          charSpan.style.display = "inline-block";
          charSpan.style.willChange = "transform";
          wordSpan.appendChild(charSpan);
          chars.push(charSpan);
        });

        heading.appendChild(wordSpan);

        // Add space between words
        if (wi < text.split(" ").length - 1) {
          const space = document.createElement("span");
          space.innerHTML = "&nbsp;";
          space.style.display = "inline-block";
          heading.appendChild(space);
        }
      });

      // Split subtitle into words
      const sub = subRef.current;
      if (!sub) return;
      const subText = sub.textContent || "";
      sub.innerHTML = "";
      const words: HTMLSpanElement[] = [];

      subText.split(" ").forEach((word, wi) => {
        const wordSpan = document.createElement("span");
        wordSpan.textContent = word;
        wordSpan.style.display = "inline-block";
        wordSpan.style.willChange = "transform";
        sub.appendChild(wordSpan);
        words.push(wordSpan);

        if (wi < subText.split(" ").length - 1) {
          const space = document.createElement("span");
          space.innerHTML = "&nbsp;";
          space.style.display = "inline-block";
          sub.appendChild(space);
        }
      });

      // Locomotive-style: chars cascade in from below with rotation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(chars, {
        y: 120,
        rotationX: -90,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.03,
      });

      // Accent line wipes in
      tl.from(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.6"
      );

      // Words fade up with stagger
      tl.from(
        words,
        {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.05,
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Background grain */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      <div className="max-w-5xl text-center relative z-10">
        {/* Small label */}
        <div className="mb-8 overflow-hidden">
          <p className="text-xs uppercase tracking-[0.3em] text-(--color-muted)">
            Locomotive-Style Text Reveal
          </p>
        </div>

        {/* Main heading with char reveal */}
        <div className="overflow-hidden mb-6" style={{ perspective: "600px" }}>
          <h2
            ref={headingRef}
            className="text-6xl md:text-8xl font-bold text-(--color-fg) leading-none tracking-tight"
          >
            Creative Digital Experiences
          </h2>
        </div>

        {/* Accent line */}
        <div
          ref={lineRef}
          className="h-[3px] w-32 mx-auto mb-8"
          style={{ background: "var(--accent)" }}
        />

        {/* Subtitle with word reveal */}
        <div className="overflow-hidden">
          <p
            ref={subRef}
            className="text-lg md:text-xl text-(--color-muted) max-w-2xl mx-auto leading-relaxed"
          >
            We design and build digital products that push boundaries and create
            meaningful connections between brands and their audiences.
          </p>
        </div>
      </div>
    </section>
  );
};
