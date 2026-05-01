"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const gridItems = [
  { title: "Strategy", num: "01", desc: "Define the roadmap" },
  { title: "Design", num: "02", desc: "Craft the experience" },
  { title: "Develop", num: "03", desc: "Build with precision" },
  { title: "Launch", num: "04", desc: "Ship and iterate" },
  { title: "Analyze", num: "05", desc: "Measure and refine" },
  { title: "Scale", num: "06", desc: "Grow and optimize" },
  { title: "Iterate", num: "07", desc: "Continuous improvement" },
  { title: "Support", num: "08", desc: "Ongoing partnership" },
];

export const StaggeredGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".stagger-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".stagger-label", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      tl.from(
        ".stagger-title",
        {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.3",
      );

      // Use ScrollTrigger.batch for the grid cards
      ScrollTrigger.batch(".stagger-card", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            {
              y: 80,
              opacity: 0,
              scale: 0.9,
              rotationX: -15,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: true,
            },
          );
        },
        onLeaveBack: (elements) => {
          gsap.to(elements, {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            ease: "power2.in",
            stagger: 0.05,
            overwrite: true,
          });
        },
        start: "top 85%",
        end: "bottom 15%",
      });

      // Bottom counter animation
      gsap.from(".stagger-stat", {
        innerText: 0,
        snap: { innerText: 1 },
        duration: 2,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".stagger-stats",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen py-32 px-6 relative overflow-hidden"
    >
      {/* Header */}
      <div className="stagger-header max-w-7xl mx-auto mb-16">
        <p className="stagger-label text-xs uppercase tracking-[0.3em] text-(--color-accent) mb-4">
          Our Process
        </p>
        <h2 className="stagger-title text-5xl md:text-7xl font-bold text-(--color-fg)">
          How We Work
        </h2>
      </div>

      {/* Grid */}
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        style={{ perspective: "1000px" }}
      >
        {gridItems.map((item, i) => (
          <div
            key={i}
            className="stagger-card group relative p-8 rounded-xl border border-(--color-border) bg-(--color-panel) hover:border-(--color-accent) transition-colors duration-300 cursor-pointer"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Number */}
            <span className="text-[4rem] font-black text-fg/5 absolute top-4 right-4 leading-none select-none group-hover:text-accent/10 transition-colors duration-300">
              {item.num}
            </span>

            {/* Content */}
            <div className="relative z-10">
              <span className="text-xs font-mono text-(--color-accent) uppercase tracking-wider">
                Step {item.num}
              </span>
              <h3 className="text-2xl font-bold text-(--color-fg) mt-3 group-hover:text-(--color-accent) transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-(--color-muted) mt-2">{item.desc}</p>

              {/* Arrow */}
              <div className="mt-6 w-8 h-8 rounded-full border border-(--color-border) flex items-center justify-center group-hover:border-(--color-accent) group-hover:bg-(--color-accent) transition-all duration-300">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-(--color-muted) group-hover:text-white transition-colors duration-300"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="stagger-stats max-w-7xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: 150, suffix: "+", label: "Projects Delivered" },
          { value: 98, suffix: "%", label: "Client Satisfaction" },
          { value: 12, suffix: "+", label: "Years Experience" },
          { value: 40, suffix: "+", label: "Team Members" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-(--color-fg)">
              <span className="stagger-stat">{stat.value}</span>
              {stat.suffix}
            </div>
            <p className="text-sm text-(--color-muted) mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
