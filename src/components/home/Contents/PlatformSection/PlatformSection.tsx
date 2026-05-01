"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Sponsors } from "./Sponsors";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const PlatformSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const btnYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

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
      tl.from(".platform-line", {
        scaleX: 0,
        duration: 0.8,
        ease: "power4.inOut",
      });

      // Label
      tl.from(
        ".platform-label",
        { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4",
      );

      // Heading chars stagger
      tl.from(
        ".platform-heading",
        { y: 60, opacity: 0, duration: 0.8, ease: "power4.out" },
        "-=0.3",
      );

      // Subtitle
      tl.from(
        ".platform-sub",
        { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
        "-=0.4",
      );

      // CTA button
      tl.from(
        ".platform-cta",
        { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2",
      );

      // Sponsors
      tl.from(
        ".platform-sponsors",
        { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2",
      );

      // Magnetic CTA button
      if (btnRef.current) {
        btnXTo.current = gsap.quickTo(btnRef.current, "x", {
          duration: 0.4,
          ease: "power3",
        });
        btnYTo.current = gsap.quickTo(btnRef.current, "y", {
          duration: 0.4,
          ease: "power3",
        });
      }
    },
    { scope: sectionRef },
  );

  const handleBtnMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current || !btnXTo.current || !btnYTo.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    btnXTo.current((e.clientX - cx) * 0.3);
    btnYTo.current((e.clientY - cy) * 0.3);
  }, []);

  const handleBtnEnter = useCallback(() => {
    gsap.to(".platform-btn-fill", {
      scaleX: 1,
      duration: 0.45,
      ease: "power3.inOut",
    });
    gsap.to([".platform-btn-label", ".platform-btn-arrow"], {
      color: "#000",
      duration: 0.2,
      delay: 0.15,
    });
  }, []);

  const handleBtnLeave = useCallback(() => {
    btnXTo.current?.(0);
    btnYTo.current?.(0);
    gsap.to(".platform-btn-fill", {
      scaleX: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
    gsap.to([".platform-btn-label", ".platform-btn-arrow"], {
      color: "var(--accent)",
      duration: 0.15,
    });
  }, []);

  return (
    <div ref={sectionRef} className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Accent line */}
        <div className="platform-line h-px w-16 bg-accent mx-auto mb-8 origin-center" />

        {/* Label */}
        <p className="platform-label text-xs font-semibold text-(--color-muted-fg) uppercase tracking-[0.3em] mb-6">
          Trusted by leading brands & creators
        </p>

        {/* Heading */}
        <h2 className="platform-heading text-4xl md:text-6xl font-bold text-(--color-fg) mb-4">
          Ready to create impact?
        </h2>

        {/* Subtitle */}
        <p className="platform-sub text-lg text-(--color-muted-fg) mb-10 max-w-lg mx-auto">
          Join thousands of creators and brands building authentic content
          together on Idols.
        </p>

        {/* CTA Button — magnetic + liquid fill */}
        <div className="platform-cta mb-12">
          <button
            ref={btnRef}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
            onMouseEnter={handleBtnEnter}
            className="relative inline-flex items-center gap-3 border-2 border-accent text-accent px-8 py-4 rounded-full text-lg font-semibold overflow-hidden"
            style={{ willChange: "transform" }}
          >
            {/* Liquid fill layer */}
            <span
              className="platform-btn-fill absolute inset-0 bg-accent rounded-full"
              style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
            />
            {/* Label — sits above fill */}
            <span className="platform-btn-label relative z-10 transition-colors duration-200">
              Get Started
            </span>
            <ArrowRight className="platform-btn-arrow relative z-10 w-5 h-5 transition-colors duration-200" />
          </button>
        </div>

        {/* Sponsors */}
        <div className="platform-sponsors">
          <Sponsors />
        </div>
      </div>
    </div>
  );
};
