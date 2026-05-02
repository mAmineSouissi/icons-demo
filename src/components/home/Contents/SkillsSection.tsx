"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const skills = [
  { title: ["Creator", "Matching"], image: "/card1.jpg" },
  { title: ["Campaign", "Management"], image: "/card2.jpg" },
  { title: ["Analytics", "& Insights"], image: "/card3.jpg" },
  { title: ["Content", "Strategy"], image: "/card1.jpg" },
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── Per-word mask reveal on scroll ──
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

      // Divider lines draw in
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
    },
    { scope: sectionRef },
  );

  // ── Split + reveal ────────────────────────────────────────────────────────
  const handleRowEnter = useCallback((row: HTMLLIElement) => {
    const wraps = row.querySelectorAll<HTMLElement>(".skill-word-wrap");
    const reveal = row.querySelector<HTMLElement>(".skill-reveal-img");

    if (wraps.length >= 2) {
      gsap.to(wraps[0], {
        x: "-14vw",
        duration: 0.6,
        ease: "expo.out",
        overwrite: "auto",
      });
      gsap.to(wraps[1], {
        x: "14vw",
        duration: 0.6,
        ease: "expo.out",
        overwrite: "auto",
      });
    }

    if (reveal) {
      gsap.fromTo(
        reveal,
        { clipPath: "inset(50% 0 50% 0)" },
        {
          clipPath: "inset(0% 0 0% 0)",
          duration: 0.6,
          ease: "expo.out",
          overwrite: "auto",
        },
      );
    }
  }, []);

  const handleRowLeave = useCallback((row: HTMLLIElement) => {
    const wraps = row.querySelectorAll<HTMLElement>(".skill-word-wrap");
    const reveal = row.querySelector<HTMLElement>(".skill-reveal-img");

    if (wraps.length >= 2) {
      gsap.to(wraps[0], {
        x: 0,
        duration: 0.55,
        ease: "expo.inOut",
        overwrite: "auto",
      });
      gsap.to(wraps[1], {
        x: 0,
        duration: 0.55,
        ease: "expo.inOut",
        overwrite: "auto",
      });
    }

    if (reveal) {
      gsap.to(reveal, {
        clipPath: "inset(50% 0 50% 0)",
        duration: 0.4,
        ease: "expo.in",
        overwrite: "auto",
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <div className="mx-auto w-full">
        <div className="skills-divider h-px bg-(--color-border)" />

        <ul className="list-none p-0 m-0">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="skills-row group relative"
              onMouseEnter={(e) => handleRowEnter(e.currentTarget)}
              onMouseLeave={(e) => handleRowLeave(e.currentTarget)}
            >
              {/* ── Center reveal image (behind content) ── */}
              <div
                className="skill-reveal-img absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                style={{ clipPath: "inset(50% 0 50% 0)" }}
              >
                <div
                  className="rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    width: "clamp(200px, 18vw, 320px)",
                    height: "clamp(120px, 12vw, 210px)",
                  }}
                >
                  <img
                    src={skill.image}
                    alt={skill.title.join(" ")}
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
              </div>

              {/* ── Row content (above image) ── */}
              <div className="relative z-10 flex items-center justify-between py-8 md:py-10 cursor-pointer">
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

                {/* Words — each outer span is the split target */}
                <div className="flex items-center justify-center gap-4 md:gap-6 flex-1">
                  {skill.title.map((word, j) => (
                    <span
                      key={j}
                      className="skill-word-wrap inline-block overflow-hidden leading-[0.9]"
                    >
                      <span
                        className="skill-word-inner inline-block"
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

                {/* Arrow */}
                <span
                  className="hidden md:block shrink-0 w-8 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-(--color-accent)"
                  style={{ fontSize: "1.25rem" }}
                >
                  ↗
                </span>
              </div>

              {/* Divider */}
              <div className="skills-divider h-px bg-(--color-border) relative z-10" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
