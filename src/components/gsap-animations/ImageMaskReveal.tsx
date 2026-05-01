"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const showcaseItems = [
  {
    title: "Locomotive Style",
    subtitle: "Image Reveal",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Clip Path",
    subtitle: "Animation",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Scale & Mask",
    subtitle: "Effect",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

export const ImageMaskReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Each reveal card: mask curtain wipes away, image scales down
      gsap.utils.toArray<HTMLElement>(".mask-reveal-item").forEach((item) => {
        const curtain = item.querySelector(".mask-curtain");
        const image = item.querySelector(".mask-image");
        const title = item.querySelector(".mask-title");
        const subtitle = item.querySelector(".mask-subtitle");
        const line = item.querySelector(".mask-line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        });

        // Curtain wipes from left to right
        tl.fromTo(
          curtain,
          { scaleX: 1, transformOrigin: "right center" },
          { scaleX: 0, duration: 1.2, ease: "power4.inOut" },
        );

        // Image scales down from zoomed state
        tl.fromTo(
          image,
          { scale: 1.4 },
          { scale: 1, duration: 1.4, ease: "power3.out" },
          "-=1.0",
        );

        // Title slides up
        tl.from(
          title,
          { y: 60, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.8",
        );

        // Line draws in
        tl.from(
          line,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.5",
        );

        // Subtitle fades up
        tl.from(
          subtitle,
          { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );
      });

      // Bottom marquee text
      gsap.to(".mask-marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent) mb-4">
          Image Reveals
        </p>
        <h2 className="text-5xl md:text-7xl font-bold text-(--color-fg)">
          Mask & Reveal
        </h2>
      </div>

      {/* Reveal grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {showcaseItems.map((item, i) => (
          <div key={i} className="mask-reveal-item">
            {/* Image container with overflow clip */}
            <div className="relative overflow-hidden rounded-xl aspect-3/4 mb-6">
              {/* The "image" (gradient placeholder) */}
              <div
                className="mask-image absolute inset-0"
                style={{
                  background: item.gradient,
                  willChange: "transform",
                }}
              />

              {/* Curtain overlay that wipes away */}
              <div
                className="mask-curtain absolute inset-0 z-10"
                style={{
                  background: "var(--bg)",
                  willChange: "transform",
                }}
              />

              {/* Hover zoom effect */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-500 z-20" />
            </div>

            {/* Text content */}
            <div className="overflow-hidden">
              <h3 className="mask-title text-2xl font-bold text-(--color-fg)">
                {item.title}
              </h3>
            </div>
            <div
              className="mask-line h-[2px] w-12 my-3"
              style={{ background: "var(--accent)" }}
            />
            <div className="overflow-hidden">
              <p className="mask-subtitle text-sm text-(--color-muted) uppercase tracking-wider">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom marquee */}
      <div className="mt-32 overflow-hidden border-t border-b border-(--color-border) py-6">
        <div className="mask-marquee-inner flex whitespace-nowrap gap-16">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 shrink-0">
              {[
                "ANIMATION",
                "DESIGN",
                "MOTION",
                "INTERACTIVE",
                "CREATIVE",
                "DIGITAL",
                "EXPERIENCE",
                "INNOVATION",
              ].map((word, i) => (
                <span
                  key={`${setIdx}-${i}`}
                  className="text-5xl md:text-7xl font-black text-fg/5 uppercase tracking-tight select-none"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
