"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on non-touch devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.style.cursor = "none";

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // quickTo — one tween instance, called every mousemove (fastest possible)
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.2,
        opacity: 0.35,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 0.4, duration: 0.2 });
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 0.5,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const onMouseDown = () => gsap.to(ring, { scale: 0.8, duration: 0.1 });
    const onMouseUp = () =>
      gsap.to(ring, { scale: 1, duration: 0.25, ease: ease_back });

    const ease_back = "back.out(2)";

    // Attach to all interactive elements
    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Snappy dot — tracks cursor exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-999"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </div>

      {/* Lagging ring — follows with inertia */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-998"
        style={{ transform: "translate(-50%, -50%)", opacity: 0.5 }}
      >
        <div
          className="w-9 h-9 rounded-full border"
          style={{ borderColor: "var(--fg)" }}
        />
      </div>
    </>
  );
};
