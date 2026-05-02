"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const WeDoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax: WE drifts up, DO drifts down
      gsap.fromTo(
        ".wedo-we",
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );

      gsap.fromTo(
        ".wedo-do",
        { y: -60 },
        {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );

      // Entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".wedo-we", {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
      });

      tl.from(
        ".wedo-do",
        { x: 100, opacity: 0, duration: 0.8, ease: "power4.out" },
        "<",
      );

      tl.from(
        ".wedo-body",
        { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5",
      );

      // Sentence-by-sentence mask reveal
      tl.from(
        ".wedo-sentence",
        {
          y: "105%",
          duration: dur.base,
          ease: ease.out,
          stagger: stagger.normal,
        },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef}>
      <div className="flex flex-row justify-between items-center w-full px-8 gap-x-6 py-24">
        <div>
          <h2 className="wedo-we text-[250px] font-bold mb-8 text-secondary/60 dark:text-accent leading-none">
            WE
          </h2>
        </div>

        <div className="wedo-body flex flex-col gap-4 max-w-xs">
          {[
            "We connect ambitious creators with forward-thinking brands to craft content that actually moves people.",
            "No forced campaigns. No fake filters. Just raw, human stories that spark real conversations.",
            "Every collaboration on Icons is built on trust, creativity, and a shared desire to make something iconic.",
          ].map((sentence, i) => (
            <div key={i} className="overflow-hidden">
              <p
                className="wedo-sentence text-base leading-relaxed"
                style={{ color: "var(--fg)", opacity: 0.8 }}
              >
                {sentence}
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="wedo-do text-[250px] font-bold mb-8 text-primary/60 leading-none">
            DO
          </h2>
        </div>
      </div>
    </div>
  );
};
