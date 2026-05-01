"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const MagneticItem = ({
  children,
  className = "",
  strength = 0.4,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    if (!ref.current) return;
    // gsap.quickTo for performance — reuses a single tween
    xTo.current = gsap.quickTo(ref.current, "x", {
      duration: 0.6,
      ease: "power3",
    });
    yTo.current = gsap.quickTo(ref.current, "y", {
      duration: 0.6,
      ease: "power3",
    });
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !xTo.current || !yTo.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      xTo.current(deltaX);
      yTo.current(deltaY);
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(0);
    yTo.current(0);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
};

export const MagneticButtonShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Stagger entrance for the buttons
      gsap.from(".magnetic-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Floating orbs in background
      gsap.utils.toArray<HTMLElement>(".magnetic-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          rotation: `random(-15, 15)`,
          duration: `random(3, 5)`,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="magnetic-orb absolute rounded-full"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? "var(--accent)" : "var(--accent2)"}, transparent)`,
              opacity: 0.08,
              top: `${15 + i * 15}%`,
              left: `${10 + i * 18}%`,
            }}
          />
        ))}
      </div>

      <div className="text-center mb-16 relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] text-(--color-accent) mb-4">
          Magnetic Interaction
        </p>
        <h2 className="text-5xl md:text-7xl font-bold text-(--color-fg) mb-4">
          Hover & Attract
        </h2>
        <p className="text-lg text-(--color-muted) max-w-md mx-auto">
          Elements follow your cursor with magnetic attraction. Powered by
          gsap.quickTo() for smooth 60fps performance.
        </p>
      </div>

      {/* Magnetic buttons grid */}
      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {/* Large CTA button */}
        <MagneticItem className="magnetic-item cursor-pointer" strength={0.5}>
          <div className="px-12 py-6 rounded-full border-2 border-(--color-accent) text-(--color-accent) text-lg font-semibold uppercase tracking-wider hover:bg-(--color-accent) hover:text-white transition-colors duration-300">
            Explore Work
          </div>
        </MagneticItem>

        {/* Circle button */}
        <MagneticItem className="magnetic-item cursor-pointer" strength={0.6}>
          <div className="w-28 h-28 rounded-full border-2 border-(--color-fg) flex items-center justify-center hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </MagneticItem>

        {/* Pill button */}
        <MagneticItem className="magnetic-item cursor-pointer" strength={0.4}>
          <div className="px-10 py-5 rounded-full bg-(--color-fg) text-(--color-bg) text-lg font-semibold hover:scale-105 transition-transform duration-300">
            Get in Touch
          </div>
        </MagneticItem>
      </div>

      {/* Secondary row */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 relative z-10">
        {["About", "Projects", "Contact", "Blog"].map((label, i) => (
          <MagneticItem
            key={i}
            className="magnetic-item cursor-pointer"
            strength={0.3}
          >
            <div className="px-6 py-3 rounded-lg border border-(--color-border) text-(--color-muted) text-sm uppercase tracking-wider hover:border-(--color-accent) hover:text-(--color-accent) transition-colors duration-300">
              {label}
            </div>
          </MagneticItem>
        ))}
      </div>
    </section>
  );
};
