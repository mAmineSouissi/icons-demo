"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { dur, ease } from "@/lib/motion";

/**
 * PageTransition — full-screen clip-path curtain that wipes on route change.
 * Place once inside _app.tsx, wrapping <Component />.
 *
 * Enter: curtain wipes UP (reveals page)
 * Exit:  curtain drops DOWN (covers page before navigation)
 */
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    // ── Page enter: reveal from bottom ──
    gsap.fromTo(
      curtain,
      { clipPath: "inset(0 0 0% 0)" }, // fully covering
      {
        clipPath: "inset(0 0 100% 0)", // wipes upward, revealing content
        duration: dur.epic,
        ease: ease.cinematic,
        delay: 0.05,
      },
    );

    // ── Route change start: drop curtain over current page ──
    const onRouteStart = () => {
      gsap.fromTo(
        curtain,
        { clipPath: "inset(100% 0 0% 0)" }, // starts from top edge (invisible)
        {
          clipPath: "inset(0% 0 0% 0)", // drops down, covering page
          duration: dur.slow,
          ease: ease.cinematic,
        },
      );
    };

    // ── Route change complete: wipe away ──
    const onRouteComplete = () => {
      gsap.fromTo(
        curtain,
        { clipPath: "inset(0 0 0% 0)" },
        {
          clipPath: "inset(0 0 100% 0)",
          duration: dur.epic,
          ease: ease.cinematic,
          delay: 0.1,
        },
      );
    };

    router.events.on("routeChangeStart", onRouteStart);
    router.events.on("routeChangeComplete", onRouteComplete);
    router.events.on("routeChangeError", onRouteComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteStart);
      router.events.off("routeChangeComplete", onRouteComplete);
      router.events.off("routeChangeError", onRouteComplete);
    };
  }, [router]);

  return (
    <>
      {/* Curtain overlay — sits above everything, below cursor */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-190 pointer-events-none flex items-center justify-center"
        style={{
          clipPath: "inset(0 0 0% 0)",
          backgroundColor: "var(--bg)",
        }}
      >
        {/* Logo shown during transition */}
        <span
          className="select-none"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "var(--fg)",
            opacity: 0.6,
          }}
        >
          idols<span style={{ color: "var(--accent)" }}>.</span>
        </span>
      </div>

      {children}
    </>
  );
};
