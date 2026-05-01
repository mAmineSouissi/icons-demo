"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const skills = [
  {
    title: ["Creator", "Matching"],
    image: "/card1.jpg",
  },
  {
    title: ["Campaign", "Management"],
    image: "/card2.jpg",
  },
  {
    title: ["Analytics", "& Insights"],
    image: "/card3.jpg",
  },
  {
    title: ["Content", "Strategy"],
    image: "/card1.jpg",
  },
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLImageElement>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(
    () => {
      // ── Per-word mask reveal ──
      // Each .skill-word-inner starts at y:"100%" (hidden below its mask),
      // animates up when its row's trigger enters viewport.
      gsap.utils.toArray<HTMLElement>(".skills-row").forEach((row) => {
        const words = row.querySelectorAll(".skill-word-inner");
        const index = row.querySelector(".skill-index");

        gsap.from(words, {
          y: "100%",
          duration: dur.slow,
          ease: ease.cinematic,
          stagger: stagger.tight,
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        // Index number counts up 0 → i+1
        if (index) {
          gsap.from(index, {
            innerText: 0,
            snap: { innerText: 1 },
            duration: 0.6,
            ease: "power2.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Divider lines draw in from center
      gsap.from(".skills-divider", {
        scaleX: 0,
        duration: dur.base,
        ease: ease.inOut,
        stagger: stagger.tight,
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // quickTo for floating hover image
      if (imageRef.current) {
        xTo.current = gsap.quickTo(imageRef.current, "x", {
          duration: 0.45,
          ease: "power3",
        });
        yTo.current = gsap.quickTo(imageRef.current, "y", {
          duration: 0.45,
          ease: "power3",
        });
      }
    },
    { scope: sectionRef },
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current || !xTo.current || !yTo.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    xTo.current(e.clientX - rect.left - 180);
    yTo.current(e.clientY - rect.top - 130);
  }, []);

  const handleRowEnter = useCallback((image: string) => {
    if (!imageRef.current || !imgInnerRef.current) return;
    imgInnerRef.current.src = image;
    gsap.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: ease.out,
    });
  }, []);

  const handleRowLeave = useCallback(() => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.88,
      rotation: -3,
      duration: 0.3,
      ease: "power3.in",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating hover image */}
      <div
        ref={imageRef}
        className="pointer-events-none absolute z-20 w-[360px] h-[260px] rounded-xl overflow-hidden shadow-2xl"
        style={
          {
            opacity: 0,
            scale: 0.88,
            rotation: -3,
            willChange: "transform, opacity",
          } as React.CSSProperties
        }
      >
        <img
          ref={imgInnerRef}
          src=""
          alt=""
          className="w-full h-full object-cover scale-105"
        />
      </div>

      <div className="mx-auto w-full">
        {/* Top divider */}
        <div className="skills-divider h-px bg-(--color-border)" />

        <ul className="list-none p-0 m-0">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="skills-row group"
              onMouseEnter={() => handleRowEnter(skill.image)}
              onMouseLeave={handleRowLeave}
            >
              <div className="flex items-center justify-between py-8 md:py-10 cursor-pointer">
                {/* Index counter */}
                <span
                  className="skill-index hidden md:block text-xs tabular-nums tracking-widest shrink-0 w-8"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Words — each inside an overflow-hidden mask */}
                <div className="flex items-center justify-center gap-4 md:gap-6 flex-1">
                  {skill.title.map((word, j) => (
                    <span
                      key={j}
                      className="inline-block overflow-hidden leading-[0.9]"
                    >
                      <span
                        className="skill-word-inner inline-block transition-colors duration-500 group-hover:text-(--color-accent)"
                        style={{
                          fontFamily: "'DM Serif Display', serif",
                          fontSize: "clamp(3rem, 8vw, 11rem)",
                          color: "var(--fg)",
                        }}
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Arrow — appears on hover */}
                <span
                  className="hidden md:block shrink-0 w-8 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-(--color-accent)"
                  style={{ fontSize: "1.25rem" }}
                >
                  ↗
                </span>
              </div>

              {/* Row divider */}
              <div className="skills-divider h-px bg-(--color-border)" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
