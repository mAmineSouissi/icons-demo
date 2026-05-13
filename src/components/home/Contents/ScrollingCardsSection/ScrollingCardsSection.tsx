"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CardItem } from "./CardItem";
import { cards } from "../data/card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ScrollingCardsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // Total horizontal distance to scroll
      const scrollWidth = track.scrollWidth - window.innerWidth;

      // Pin section & scrub the track left
      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // Cards scale-up entrance on first reveal
      gsap.from(".hscroll-card", {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden h-screen flex items-center"
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none">
        <div
          ref={progressRef}
          className="h-full bg-accent origin-left"
          style={{ transform: "scaleX(0)", willChange: "transform" }}
        />
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-stretch gap-8 px-[5vw] py-12"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {/* Leading spacer for centered start */}
        <div className="shrink-0 w-[10vw]" />

        {cards.map((card, index) => (
          <div
            key={index}
            className="hscroll-card shrink-0 w-[70vw] max-w-[900px]"
          >
            <CardItem
              title={card.title}
              badge={card.badge}
              description={card.description}
              src={card.src}
              bgColor={card.accent}
            />
          </div>
        ))}

        {/* Trailing spacer */}
        <div className="shrink-0 w-[10vw]" />
      </div>
    </div>
  );
};
