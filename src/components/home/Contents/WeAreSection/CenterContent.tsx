"use client";

import { PixelImage } from "@/components/ui/shadcn-io/pixel-image";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LeftContentProps {
  className?: string;
}

export const CenterContent = ({ className }: LeftContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const weRef = useRef<HTMLDivElement>(null);
  const areRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax: WE drifts left-to-right, ARE drifts right-to-left
      gsap.fromTo(
        weRef.current,
        { x: -100 },
        {
          x: 100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );

      gsap.fromTo(
        areRef.current,
        { x: 100 },
        {
          x: -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );

      // Image scale + rotation parallax
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, rotation: -5 },
        {
          scale: 1,
          rotation: 5,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );

      // Entrance: WE text slides in from left
      gsap.from(".center-we-heading", {
        x: -120,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Entrance: ARE text slides in from right
      gsap.from(".center-are-heading", {
        x: 120,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Entrance: sub-text fades up
      gsap.from(".center-sub", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Entrance: image pops in
      gsap.from(imageRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-row w-full justify-between items-center px-4 py-20"
    >
      <div
        ref={weRef}
        className={cn("shrink-0 px-12", className)}
        style={{ willChange: "transform" }}
      >
        <h1 className="center-we-heading text-[180px] md:text-[240px] leading-none font-bold text-bg-foreground dark:text-accent-2">
          WE
        </h1>
        <div className="center-sub mt-8 max-w-xs">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            NO LIMITS (01)
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            JUST IMPACT
          </p>
        </div>
      </div>

      <div
        ref={imageRef}
        className="flex justify-center"
        style={{ willChange: "transform" }}
      >
        <div>
          <PixelImage src="/dwayneJoson.jpg" grid="6x4" />
        </div>
      </div>

      <div
        ref={areRef}
        className="shrink px-12"
        style={{ willChange: "transform" }}
      >
        <h2 className="center-are-heading text-[180px] md:text-[240px] leading-none font-bold text-bg-foreground dark:text-accent">
          ARE
        </h2>
        <div className="center-sub mt-8 max-w-xs text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            (02) BOLD IDEAS
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            KILLER EXECUTION
          </p>
        </div>
      </div>
    </div>
  );
};
