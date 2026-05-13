import { ChevronDown } from "lucide-react";
import React, { useRef, useState } from "react";
import TextType from "@/components/shared/TextType";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger } from "@/lib/motion";
import { CrowdedPeeps } from "./HowSection/CrowdedPeeps";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import FloatingLines from "@/components/ui/FloatingLines";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// "Icons" split into masked character spans for GSAP reveal
const HERO_CHARS = ["I", "c", "o", "n", "s"];

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light" | "system">("system");

  React.useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (nextTheme: "dark" | "light" | "system") => {
    setTheme(nextTheme as "dark" | "light");
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Subtle parallax for background video (matches previous TreatedImage parallax)
      if (bgVideoRef.current) {
        gsap.to(bgVideoRef.current, {
          yPercent: -(0.25 * 30),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // ── Character-by-character reveal ──
      // Each .hero-char sits inside an overflow-hidden mask wrapper.
      // Starting at y:"110%" means it's hidden below the mask edge.
      tl.from(".hero-char", {
        y: "110%",
        rotation: 6,
        duration: dur.slow,
        ease: ease.cinematic,
        stagger: stagger.tight,
        transformOrigin: "bottom center",
      });

      // Accent dot scales in
      tl.from(
        ".hero-dot",
        { scale: 0, opacity: 0, duration: dur.fast, ease: ease.bounce },
        "-=0.5",
      );

      // Subtitle: clip-path wipe left → right
      tl.from(
        ".hero-typewriter",
        {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0,
          duration: dur.base,
          ease: ease.out,
        },
        "-=0.4",
      );

      // Scroll cue fade in
      tl.from(
        scrollCueRef.current,
        { opacity: 0, duration: dur.base, ease: ease.out },
        "-=0.2",
      );

      // Chevron bounce loop
      gsap.to(chevronRef.current, {
        y: 8,
        duration: 0.75,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // ── Scroll-out: clip-path wipe upward (cinematic) ──
      gsap.to(contentRef.current, {
        clipPath: "inset(0 0 100% 0)",
        ease: ease.scrub,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "45% top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(bgRef.current, {
        scale: 0.85,
        autoAlpha: 0,
        ease: ease.scrub,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "min-h-screen flex flex-col items-center justify-center relative isolate overflow-hidden transition-colors duration-700",
      )}
    >
      {/* FloatingLines background with accent colors */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[8, 12, 16]}
          lineDistance={[8, 6, 4]}
          bendRadius={3.0}
          bendStrength={-1.2}
          mouseDamping={0.08}
          interactive={true}
          parallax={true}
          parallaxStrength={0.3}
          linesGradient={["#d7ff2f", "#ff5a3c", "#96c0ce"]}
          animationSpeed={1.0}
          mixBlendMode="screen"
        />
      </div>
      {/* Gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-(--color-accent) rounded-md blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-(--color-accent-2) rounded-md blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div
        ref={contentRef}
        className="text-center mb-10 z-10"
        style={{ willChange: "clip-path", clipPath: "inset(0 0 0% 0)" }}
      >
        {/* ── Split-character heading ── */}
        <h1
          className="flex items-end justify-center leading-none mb-4"
          style={{
            fontFamily: '"fat", sans-serif',
            fontWeight: 800,
          }}
          aria-label="Icons"
        >
          {HERO_CHARS.map((char, i) => (
            // overflow-hidden masks the y:"110%" starting position
            <span key={i} className="inline-block overflow-hidden leading-none">
              <span className="hero-char inline-block text-[7vh]">{char}</span>
            </span>
          ))}
          {/* Accent dot */}
          <span className="inline-block overflow-hidden leading-none ml-0.5">
            <span
              className="hero-dot inline-block text-[5vh]"
              style={{ color: "var(--accent)", lineHeight: "inherit" }}
            >
              .
            </span>
          </span>
        </h1>

        {/* Subtitle typewriter */}
        <div
          style={{
            fontFamily: '"snaga-unicase-display", sans-serif',
            fontWeight: 300,
            fontStyle: "normal",
          }}
        >
          <TextType
            text={[
              "The UGC platform",
              "where every face is an icon.",
              "Join us today!",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            className="text-[clamp(1.2rem,3vw,2rem)]"
            cursorCharacter="|"
          />
          <div className="mt-8 flex justify-center">
            <ThemeSwitcher onChange={handleThemeChange} />
          </div>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer group z-10"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-xs uppercase tracking-[0.25em] text-(--color-muted)">
          Scroll
        </span>
        <div ref={chevronRef}>
          <ChevronDown className="w-5 h-5 text-(--color-muted) group-hover:text-(--color-accent) transition-colors" />
        </div>
      </div>
    </section>
  );
};
