"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { dur, ease } from "@/lib/motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    // Set initial states
    gsap.set(barFillRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set([wordRef.current, barTrackRef.current, countRef.current], {
      opacity: 0,
      y: 20,
    });

    // Step 1 — fade in elements staggered
    tl.to([wordRef.current, barTrackRef.current, countRef.current], {
      opacity: 1,
      y: 0,
      duration: dur.fast,
      ease: ease.out,
      stagger: 0.08,
    });

    // Step 2 — count 0 → 100 + bar fill simultaneously
    tl.to(
      countRef.current,
      {
        innerText: 100,
        duration: 1.6,
        ease: "power2.inOut",
        snap: { innerText: 1 },
      },
      "+=0.1",
    );

    tl.to(
      barFillRef.current,
      {
        scaleX: 1,
        duration: 1.6,
        ease: "power2.inOut",
      },
      "<", // same start as count
    );

    // Step 3 — accent dot pulse
    tl.to(
      dotRef.current,
      { scale: 1.4, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 },
      "-=0.3",
    );

    // Step 4 — hold briefly then exit via clip-path wipe upward
    tl.to(overlayRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: dur.epic,
      ease: ease.cinematic,
      delay: 0.15,
    });
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-(--color-bg)"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      {/* Logo word */}
      <div
        ref={wordRef}
        className="mb-10 select-none"
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(3rem, 8vw, 5rem)",
          lineHeight: 1,
        }}
      >
        <span style={{ color: "var(--fg)" }}>idols</span>
        <span
          ref={dotRef}
          style={{ color: "var(--accent)", display: "inline-block" }}
        >
          .
        </span>
      </div>

      {/* Progress bar */}
      <div
        ref={barTrackRef}
        className="w-40 h-px relative overflow-hidden"
        style={{ backgroundColor: "var(--border)" }}
      >
        <div
          ref={barFillRef}
          className="absolute inset-0"
          style={{
            backgroundColor: "var(--accent)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* Count */}
      <div
        ref={countRef}
        className="mt-4 tabular-nums text-xs tracking-widest"
        style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
      >
        0
      </div>
    </div>
  );
};
