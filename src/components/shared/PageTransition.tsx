"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import gsap from "gsap";
import { dur, ease } from "@/lib/motion";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const curtain = curtainRef.current;
    const logo = logoRef.current;
    if (!curtain || !logo) return;

    // ── Initial page load: curtain is already gone, Preloader handles the entry ──
    gsap.set(logo, { scale: 0, opacity: 0 });
    gsap.set(curtain, { clipPath: "inset(0 0 100% 0)" });

    // ── Route change start: curtain drops, logo spins in ──
    const onRouteStart = () => {
      gsap.killTweensOf([curtain, logo]);
      gsap.set(curtain, { clipPath: "inset(100% 0 0% 0)" });
      gsap.set(logo, { scale: 0, rotation: 0, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(curtain, {
        clipPath: "inset(0% 0 0% 0)",
        duration: dur.slow,
        ease: ease.cinematic,
      })
        .to(
          logo,
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "back.out(2)",
          },
          "-=0.35",
        )
        .to(
          logo,
          {
            rotation: "+=720",
            duration: 0.65,
            ease: "power3.inOut",
          },
          "<",
        );
    };

    // ── Route change complete: logo spins out, curtain wipes away ──
    const onRouteComplete = () => {
      const tl = gsap.timeline();
      tl
        // Final spin
        .to(logo, {
          rotation: "+=360",
          duration: 0.4,
          ease: "power2.inOut",
        })
        // Curtain wipes upward
        .to(
          curtain,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: dur.epic,
            ease: ease.cinematic,
            delay: 0.05,
          },
          "-=0.1",
        )
        // Logo shrinks out mid-wipe
        .to(
          logo,
          {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          "-=0.5",
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
      <div
        ref={curtainRef}
        className="fixed inset-0 z-190 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ clipPath: "inset(0 0 100% 0)", backgroundColor: "var(--bg)" }}
      >
        <div
          ref={logoRef}
          className="select-none"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src="/logo_icons.svg"
            alt="Icons"
            width={80}
            height={80}
            priority
            draggable={false}
          />
        </div>
      </div>

      {children}
    </>
  );
};
