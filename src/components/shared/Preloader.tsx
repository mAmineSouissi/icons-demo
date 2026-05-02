"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { dur, ease } from "@/lib/motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Initial states ──
    gsap.set(logoRef.current, { scale: 0, rotation: -30, opacity: 0 });
    gsap.set(barFillRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set([barTrackRef.current, countRef.current], { opacity: 0, y: 20 });

    // ── Continuous spin — plays independently while loading ──
    const rotSpin = gsap.to(logoRef.current, {
      rotation: "+=360",
      duration: 3,
      ease: "none",
      repeat: -1,
      paused: true,
    });

    const tl = gsap.timeline({ onComplete });

    // Step 1 — Logo springs in with back-ease bounce
    tl.to(logoRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.85,
      ease: "back.out(2.2)",
    });

    // Kick off the continuous spin once logo has arrived
    tl.add(() => {
      rotSpin.play();
    });

    // Step 2 — Bar + counter slide in
    tl.to(
      [barTrackRef.current, countRef.current],
      {
        opacity: 1,
        y: 0,
        duration: dur.fast,
        ease: ease.out,
        stagger: 0.08,
      },
      "-=0.2",
    );

    // Step 3 — Count 0 → 100 + bar fill (run together)
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
      "<",
    );

    // Step 4 — Kill spin loop, then EXPLOSIVE exit
    tl.add(() => {
      rotSpin.kill();
    }, "+=0.15");

    // Logo rockets to 22× scale + 1080° spin — fills entire screen
    tl.to(logoRef.current, {
      scale: 22,
      rotation: "+=1080",
      duration: 1.15,
      ease: "expo.in",
    });

    // Bar + counter sweep away simultaneously
    tl.to(
      [barTrackRef.current, countRef.current],
      {
        opacity: 0,
        y: -14,
        duration: 0.3,
      },
      "<",
    );

    // Overlay fades out while logo is at max scale — page bursts through
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.45,
        ease: "power3.in",
      },
      "-=0.4",
    );

    return () => {
      tl.kill();
      rotSpin.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-200 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* SVG Logo — scales to fill screen on exit */}
      <div
        ref={logoRef}
        className="mb-10 select-none"
        style={{ willChange: "transform, opacity" }}
      >
        <Image
          src="/logo_icons.svg"
          alt="Icons logo"
          width={120}
          height={120}
          priority
          draggable={false}
        />
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

      {/* Counter */}
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
