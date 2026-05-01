"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const revealScrollbar = () => {
      document.body.classList.add("scrollbar-visible");
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("scrollbar-visible");
      }, 700);
    };

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // ── Sync Lenis with GSAP ScrollTrigger ──
    // Drive lenis via gsap.ticker so both share the same clock.
    // This eliminates the jank caused by Lenis and ScrollTrigger
    // running on separate rAF loops.
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0); // prevent GSAP lag compensation fighting Lenis

    lenis.on("scroll", revealScrollbar);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.off("scroll", revealScrollbar);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
