"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    title: "Brand Identity",
    category: "Branding",
    color: "from-rose-500 to-orange-400",
    year: "2024",
  },
  {
    title: "Motion Design",
    category: "Animation",
    color: "from-violet-500 to-indigo-400",
    year: "2024",
  },
  {
    title: "Web Platform",
    category: "Development",
    color: "from-emerald-500 to-teal-400",
    year: "2023",
  },
  {
    title: "Mobile App",
    category: "Product",
    color: "from-amber-500 to-yellow-400",
    year: "2023",
  },
  {
    title: "Art Direction",
    category: "Creative",
    color: "from-sky-500 to-cyan-400",
    year: "2024",
  },
];

export const HorizontalScrollGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Calculate how far we need to scroll horizontally
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      // Horizontal scroll tween — must use ease: "none"
      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress bar
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      // Each card scales up when it enters the viewport center
      gsap.utils.toArray<HTMLElement>(".h-scroll-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.85, rotationY: -5 },
          {
            scale: 1,
            rotationY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
            },
          },
        );
      });

      // Counter animates with scroll
      gsap.to(".h-scroll-counter", {
        innerText: projects.length,
        snap: { innerText: 1 },
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* Top bar with label + progress */}
      <div
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none hidden"
        id="h-scroll-ui"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-(--color-muted)">
            Featured Work
          </span>
          <span className="text-xs font-mono text-(--color-muted)">
            <span className="h-scroll-counter">0</span> / {projects.length}
          </span>
        </div>
      </div>

      {/* Section header */}
      <div className="h-screen flex flex-col justify-center items-start px-12 md:px-24">
        <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent) mb-4">
          Horizontal Gallery
        </p>
        <h2 className="text-5xl md:text-7xl font-bold text-(--color-fg) mb-4">
          Featured Work
        </h2>
        <p className="text-lg text-(--color-muted) max-w-md">
          Scroll to explore our latest projects. A pinned horizontal scroll
          gallery inspired by Locomotive.ca.
        </p>

        {/* Progress bar */}
        <div className="mt-8 w-64 h-[2px] bg-(--color-border) rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full origin-left"
            style={{
              background: "var(--accent)",
              transform: "scaleX(0)",
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-8 px-12 md:px-24 pb-24"
        style={{ willChange: "transform" }}
      >
        {projects.map((project, i) => (
          <div
            key={i}
            className="h-scroll-card shrink-0 w-[70vw] md:w-[40vw] group cursor-pointer"
            style={{ perspective: "800px", willChange: "transform" }}
          >
            {/* Card */}
            <div className="relative h-[60vh] rounded-2xl overflow-hidden">
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex justify-between items-start">
                  <span className="text-white/60 text-xs font-mono uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-white/40 text-xs font-mono">
                    {project.year}
                  </span>
                </div>

                <div>
                  <h3 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                    {project.title}
                  </h3>
                  <div className="mt-4 w-12 h-[2px] bg-white/40 group-hover:w-24 transition-all duration-500" />
                </div>
              </div>

              {/* Index number */}
              <div className="absolute top-1/2 right-8 -translate-y-1/2 text-white/10 text-[10rem] font-black leading-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
