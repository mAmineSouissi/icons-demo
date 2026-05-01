"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const layers = [
  {
    text: "DEPTH",
    speed: -150,
    size: "text-[12rem]",
    opacity: 0.06,
    color: "var(--accent)",
  },
  {
    text: "MOTION",
    speed: -80,
    size: "text-[8rem]",
    opacity: 0.1,
    color: "var(--accent2)",
  },
  {
    text: "SCROLL",
    speed: -40,
    size: "text-[5rem]",
    opacity: 0.15,
    color: "var(--fg)",
  },
];

export const ParallaxSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax text layers — each moves at different speed
      layers.forEach((_, i) => {
        gsap.to(`.parallax-text-${i}`, {
          y: layers[i].speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      // Image scale + parallax
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3, y: 80 },
        {
          scale: 1,
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );

      // Floating cards parallax
      gsap.utils.toArray<HTMLElement>(".parallax-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60 + i * 30 },
          {
            y: -60 - i * 30,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.3 + i * 0.2,
            },
          },
        );
      });

      // Horizontal rule draw
      gsap.from(".parallax-hr", {
        scaleX: 0,
        transformOrigin: "center center",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".parallax-hr",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-[150vh] relative overflow-hidden flex items-center justify-center"
    >
      {/* Background parallax text layers */}
      {layers.map((layer, i) => (
        <div
          key={i}
          className={`parallax-text-${i} absolute inset-0 flex items-center justify-center pointer-events-none select-none`}
        >
          <span
            className={`${layer.size} font-black uppercase tracking-tighter`}
            style={{ color: layer.color, opacity: layer.opacity }}
          >
            {layer.text}
          </span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left — image with parallax + overflow clip */}
        <div className="overflow-hidden rounded-2xl h-[500px] relative">
          <div
            ref={imageRef}
            className="absolute inset-0 bg-linear-to-br from-accent via-accent-2 to-fg"
            style={{ willChange: "transform" }}
          />
          {/* Overlay grain */}
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
          <div className="absolute bottom-6 left-6 z-10">
            <p className="text-white text-xs uppercase tracking-[0.2em] mb-2">
              Featured Project
            </p>
            <h3 className="text-white text-3xl font-bold">Parallax Depth</h3>
          </div>
        </div>

        {/* Right — stacked floating cards */}
        <div className="flex flex-col gap-8">
          {[
            {
              label: "01",
              title: "Multi-layer Scrolling",
              desc: "Elements move at different speeds creating depth and dimension.",
            },
            {
              label: "02",
              title: "Image Parallax",
              desc: "Images scale and translate smoothly, creating a cinematic feel.",
            },
            {
              label: "03",
              title: "Background Typography",
              desc: "Large background text drifts independently for a dynamic atmosphere.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="parallax-card p-6 rounded-xl border border-(--color-border) bg-panel/80 backdrop-blur-sm"
              style={{ willChange: "transform" }}
            >
              <span className="text-xs font-mono text-(--color-accent) tracking-wider">
                {card.label}
              </span>
              <h4 className="text-xl font-bold text-(--color-fg) mt-2">
                {card.title}
              </h4>
              <p className="text-sm text-(--color-muted) mt-1">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider line */}
      <div className="parallax-hr absolute bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-px bg-(--color-border)" />
    </section>
  );
};
