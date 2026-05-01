import { ThemeToggle } from "./ThemeToggle";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import TextType from "@/components/shared/TextType";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dur, ease, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroSectionProps {
  onThemeChange: (theme: "dark" | "light") => void;
}

// "Idols" split into masked character spans for GSAP reveal
const HERO_CHARS = ["I", "d", "o", "l", "s"];

export const HeroSection = ({ onThemeChange }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

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

      // Toggle + scroll cue fade in
      tl.from(
        toggleRef.current,
        { y: 24, opacity: 0, duration: dur.base, ease: ease.out },
        "-=0.3",
      );
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

      gsap.to(toggleRef.current, {
        autoAlpha: 0,
        ease: ease.scrub,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "35% top",
          scrub: 0.8,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
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

      {/* Photo overlay */}
      <div className="absolute inset-0 opacity-28 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/twoHands.png')] bg-size-[60%] bg-no-repeat bg-center blur-md" />
        <div className="absolute left-0 top-0 h-full w-2/5 bg-linear-to-r from-bg from-10% via-bg via-50% to-transparent" />
        <div className="absolute right-0 top-0 h-full w-2/5 bg-linear-to-l from-bg from-10% via-bg via-50% to-transparent" />
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
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(5rem, 14vw, 11rem)",
          }}
          aria-label="Idols"
        >
          {HERO_CHARS.map((char, i) => (
            // overflow-hidden masks the y:"110%" starting position
            <span key={i} className="inline-block overflow-hidden leading-none">
              <span
                className="hero-char inline-block"
                style={{ color: "var(--fg)" }}
              >
                {char}
              </span>
            </span>
          ))}
          {/* Accent dot */}
          <span className="inline-block overflow-hidden leading-none ml-0.5">
            <span
              className="hero-dot inline-block"
              style={{ color: "var(--accent)", lineHeight: "inherit" }}
            >
              .
            </span>
          </span>
        </h1>

        {/* Subtitle typewriter */}
        <div
          className="hero-typewriter"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <TextType
            text={[
              "The UGC platform",
              "Where creativity meets opportunity.",
              "Join us today!",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            className="text-[clamp(1.2rem,3vw,2rem)]"
            cursorCharacter="|"
          />
        </div>
      </div>

      <div
        ref={toggleRef}
        className="text-center max-w-5xl z-10 mt-4"
        style={{ willChange: "opacity" }}
      >
        <ThemeToggle onThemeChange={onThemeChange} />
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
