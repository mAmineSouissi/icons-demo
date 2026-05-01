"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoLoop from "@/components/LogoLoop";
import { techLogos } from "./data/logos";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const LogoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Divider line draws in
      gsap.from(".logo-divider", {
        scaleX: 0,
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Label fades up
      gsap.from(".logo-label", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Logos slide up and fade in
      gsap.from(".logo-track", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Subtle parallax on the logo track
      gsap.to(".logo-track", {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="py-16 px-12 relative overflow-hidden">
      {/* Divider */}
      <div className="logo-divider h-px bg-(--color-border) max-w-4xl mx-auto mb-8 origin-center" />

      {/* Label */}
      <p className="logo-label text-center text-xs font-semibold text-(--color-muted-fg) uppercase tracking-[0.3em] mb-8">
        Built with industry-leading technology
      </p>

      {/* Logo strip */}
      <div className="logo-track relative" style={{ height: "80px" }}>
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={40}
          gap={48}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
};
