import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/layout/navbar/NavBar";
import { HeroSection } from "@/components/home/Contents/HeroSection";
import { WeAreSection } from "@/components/home/Contents/WeAreSection/WeAreSection";
import { ScrollingCardsSection } from "@/components/home/Contents/ScrollingCardsSection/ScrollingCardsSection";
import { HowSection } from "@/components/home/Contents/HowSection/HowSection";
import { WeDoSection } from "@/components/home/Contents/WeDoSection/WeDoSection";
import { AboutSection } from "@/components/home/Contents/AboutUs/AboutSection";
import { SkillsSection } from "@/components/home/Contents/SkillsSection";
import { PlatformSection } from "@/components/home/Contents/PlatformSection/PlatformSection";
import { LogoSection } from "./Contents/LogoSection";
import { Preloader } from "@/components/shared/Preloader";
import { CustomCursor } from "@/components/shared/CustomCursor";

gsap.registerPlugin(useGSAP);

export const HomePage = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useGSAP(
    () => {
      // Float loops — idle breathing animation
      gsap.to(".ambient-orb-1", {
        x: 80,
        y: -60,
        scale: 1.15,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".ambient-orb-2", {
        x: -80,
        y: 60,
        scale: 0.9,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Scroll-reactive drift — orbs follow scroll progress across the page
      gsap.to(".ambient-orb-1", {
        xPercent: -40,
        yPercent: 60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
      gsap.to(".ambient-orb-2", {
        xPercent: 40,
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
        },
      });
    },
    { scope: containerRef },
  );

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (newTheme: "dark" | "light") => {
    setTheme(newTheme);
  };

  return (
    <>
      {/* Custom cursor — pointer devices only */}
      <CustomCursor />

      {/* Preloader — unmounts itself via onComplete */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        ref={containerRef}
        className="min-h-screen relative overflow-hidden bg-(--color-bg) text-(--color-fg) transition-colors duration-500"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        {/* ── Film grain overlay ── */}
        <div
          className="fixed inset-0 pointer-events-none z-150"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
          }}
        />

        {/* Navbar */}
        <Navbar />

        {/* Ambient background effect — GSAP floating */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div className="ambient-orb-1 absolute top-0 left-1/4 w-96 h-96 bg-(--color-accent) rounded-full blur-[120px]" />
          <div className="ambient-orb-2 absolute bottom-0 right-1/4 w-96 h-96 bg-(--color-accent-2) rounded-full blur-[120px]" />
        </div>

        <main className="relative z-10">
          <HeroSection onThemeChange={handleThemeChange} />

          <WeAreSection />

          <ScrollingCardsSection />

          <HowSection />

          <WeDoSection />

          <AboutSection />

          <SkillsSection />

          <LogoSection />

          <PlatformSection />
        </main>
      </div>
    </>
  );
};
