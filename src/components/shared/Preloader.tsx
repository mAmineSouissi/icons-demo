"use client";

import { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Gen-Z Preloader (matches the 03b · Polaris star direction)
 *
 * - Acid-cream background with halftone dot pattern
 * - Big 4-point sticker star that bounces + rotates
 * - Scattered confetti stars drift in the corners
 * - "LOADING" eyebrow + Bricolage italic counter + chunky progress bar
 *
 * Drop-in replacement for the old BoxLoader-based Preloader.
 * Same `onComplete` prop, same GSAP timeline shape.
 */
export const Preloader = ({ onComplete }: PreloaderProps) => {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const starWrapRef = useRef<HTMLDivElement>(null);
  const starRef     = useRef<SVGSVGElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const countRef    = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef  = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(starWrapRef.current, { opacity: 0, scale: 0.5, y: 24 });
    gsap.set([eyebrowRef.current, countRef.current, barTrackRef.current], { opacity: 0, y: 10 });
    gsap.set(barFillRef.current, { scaleX: 0, transformOrigin: "left center" });
    if (confettiRef.current) {
      gsap.set(confettiRef.current.children, { opacity: 0, scale: 0, rotate: 0 });
    }

    const tl = gsap.timeline({ onComplete });

    // Star pops in
    tl.to(starWrapRef.current, {
      opacity: 1, scale: 1, y: 0,
      duration: 0.65, ease: "back.out(2.2)",
    });

    // Star bounces + rotates on a loop while loading
    tl.add(() => {
      gsap.to(starRef.current, {
        y: -22, rotate: 18,
        duration: 0.55, ease: "sine.inOut",
        yoyo: true, repeat: -1,
      });
    }, "<");

    // Confetti stars pop in
    if (confettiRef.current) {
      tl.to(confettiRef.current.children, {
        opacity: 1, scale: 1, rotate: (i) => (i % 2 ? 18 : -14),
        duration: 0.5, ease: "back.out(2)",
        stagger: { each: 0.05, from: "random" },
      }, "-=0.3");

      // Slow drift
      tl.add(() => {
        if (!confettiRef.current) return;
        Array.from(confettiRef.current.children).forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -10 : 10, rotate: `+=${i % 2 ? 12 : -10}`,
            duration: 1.4 + (i * 0.07), ease: "sine.inOut",
            yoyo: true, repeat: -1,
          });
        });
      }, "<");
    }

    // Eyebrow + counter + bar slide up
    tl.to(
      [eyebrowRef.current, barTrackRef.current, countRef.current],
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.08 },
      "-=0.4",
    );

    // 0 → 100 with bar fill
    tl.to(countRef.current, {
      innerText: 100,
      duration: 1.8, ease: "power2.inOut",
      snap: { innerText: 1 },
    }, "+=0.1");
    tl.to(barFillRef.current, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, "<");

    tl.to({}, { duration: 0.2 });

    // EXIT — star explodes outward, supporting bits sweep
    tl.to(starRef.current, {
      scale: 8, rotate: 90, opacity: 0,
      duration: 0.55, ease: "expo.in",
    });
    tl.to(
      [eyebrowRef.current, countRef.current, barTrackRef.current],
      { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" },
      "<",
    );
    if (confettiRef.current) {
      tl.to(confettiRef.current.children, {
        opacity: 0, scale: 0, duration: 0.35, ease: "power2.in",
        stagger: { each: 0.03, from: "random" },
      }, "<");
    }

    tl.to(overlayRef.current, { opacity: 0, duration: 0.5, ease: "power3.in" }, "-=0.1");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#fff7df",
        backgroundImage: "radial-gradient(#0a0a0a 1.2px, transparent 1.4px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Confetti / scattered stars */}
      <div ref={confettiRef} className="pointer-events-none absolute inset-0">
        <ConfettiStar style={{ top: "14%",  left: "10%" }} size={54} fill="#ff3d8b" />
        <ConfettiStar style={{ top: "22%",  right: "14%" }} size={38} fill="#2d6cff" />
        <ConfettiStar style={{ bottom: "20%", left: "12%" }} size={46} fill="oklch(0.7823 0.0488 220.2338)" />
        <ConfettiStar style={{ bottom: "16%", right: "10%" }} size={62} fill="#F5C518" />
        <ConfettiStar style={{ top: "10%",  left: "44%" }} size={28} fill="#0a0a0a" />
        <ConfettiStar style={{ bottom: "8%", left: "46%" }} size={32} fill="#ff3d8b" />
      </div>

      {/* Eyebrow */}
      <div
        ref={eyebrowRef}
        className="mb-6 text-[10px] tracking-[0.5em] uppercase"
        style={{ fontFamily: "var(--font-mono, ui-monospace, monospace)", color: "#0a0a0a" }}
      >
        ★ ICONS · NOW LOADING ★
      </div>

      {/* Big bouncing star */}
      <div ref={starWrapRef} style={{ willChange: "transform, opacity" }}>
        <BigStar ref={starRef} />
      </div>

      {/* Counter + tagline */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <div
          ref={countRef}
          className="tabular-nums italic"
          style={{
            fontFamily:
              'var(--font-bricolage, "Bricolage Grotesque"), system-ui, sans-serif',
            fontWeight: 800,
            fontSize: 56,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#0a0a0a",
          }}
        >
          0
        </div>

        {/* Chunky progress bar with offset shadow */}
        <div
          ref={barTrackRef}
          className="relative"
          style={{
            width: 220,
            height: 14,
            background: "#fff7df",
            border: "2px solid #0a0a0a",
            borderRadius: 999,
            boxShadow: "3px 4px 0 #0a0a0a",
            overflow: "hidden",
          }}
        >
          <div
            ref={barFillRef}
            className="absolute inset-0"
            style={{
              background: "oklch(0.7823 0.0488 220.2338)",
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ===== sub-components ===== */

const BigStar = forwardRef<SVGSVGElement>(function BigStar(_, ref) {
  return (
    <svg
      ref={ref}
      width={180}
      height={180}
      viewBox="0 0 120 120"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden
    >
      {/* offset shadow */}
      <path
        d="M 64 19 C 69 49 80 60 110 65 C 80 70 69 81 64 111 C 59 81 48 70 18 65 C 48 60 59 49 64 19 Z"
        fill="#0a0a0a"
      />
      {/* main star */}
      <path
        d="M 60 14 C 65 44 76 55 106 60 C 76 65 65 76 60 106 C 55 76 44 65 14 60 C 44 55 55 44 60 14 Z"
        fill="#F5C518"
        stroke="#0a0a0a"
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <ellipse
        cx={48} cy={40} rx={6} ry={9}
        fill="#fff" opacity={0.75}
        transform="rotate(-25 48 40)"
      />
    </svg>
  );
});

function ConfettiStar({
  size = 40,
  fill = "#F5C518",
  style,
}: {
  size?: number;
  fill?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="absolute" style={style}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        <path
          d="M 64 19 C 69 49 80 60 110 65 C 80 70 69 81 64 111 C 59 81 48 70 18 65 C 48 60 59 49 64 19 Z"
          fill="#0a0a0a"
        />
        <path
          d="M 60 14 C 65 44 76 55 106 60 C 76 65 65 76 60 106 C 55 76 44 65 14 60 C 44 55 55 44 60 14 Z"
          fill={fill}
          stroke="#0a0a0a"
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default Preloader;
