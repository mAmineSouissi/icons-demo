import { TextRevealAnimation } from "@/components/gsap-animations/TextRevealAnimation";
import { ParallaxSection } from "@/components/gsap-animations/ParallaxSection";
import { HorizontalScrollGallery } from "@/components/gsap-animations/HorizontalScrollGallery";
import { MagneticButtonShowcase } from "@/components/gsap-animations/MagneticButton";
import { StaggeredGrid } from "@/components/gsap-animations/StaggeredGrid";
import { ImageMaskReveal } from "@/components/gsap-animations/ImageMaskReveal";
import Link from "next/link";

export default function AnimationsPage() {
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      {/* Navigation bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-bg/80 border-b border-border/50">
        <Link
          href="/"
          className="text-sm font-mono uppercase tracking-wider text-(--color-muted) hover:text-(--color-accent) transition-colors"
        >
          &larr; Back to Home
        </Link>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-(--color-fg)">
          GSAP Animation Showcase
        </span>
        <span className="text-xs font-mono text-(--color-muted)">
          Locomotive-Inspired
        </span>
      </nav>

      {/* Hero intro */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-(--color-accent) mb-6">
          Inspired by Locomotive.ca
        </p>
        <h1 className="text-6xl md:text-9xl font-black text-(--color-fg) tracking-tight leading-none">
          GSAP
          <br />
          <span className="text-(--color-accent)">Animations</span>
        </h1>
        <p className="mt-6 text-lg text-(--color-muted) max-w-lg">
          Six Locomotive-style animations built with GSAP core, ScrollTrigger,
          timelines, and gsap.quickTo — all in React with useGSAP cleanup.
        </p>
        <div className="mt-12 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-wider text-(--color-muted)">
            Scroll to explore
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-(--color-muted)"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* 1. Text Split Reveal */}
      <TextRevealAnimation />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-(--color-border)" />
      </div>

      {/* 2. Parallax Depth */}
      <ParallaxSection />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-(--color-border)" />
      </div>

      {/* 3. Horizontal Scroll Gallery */}
      <HorizontalScrollGallery />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-(--color-border)" />
      </div>

      {/* 4. Magnetic Hover Buttons */}
      <MagneticButtonShowcase />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-(--color-border)" />
      </div>

      {/* 5. Staggered Grid */}
      <StaggeredGrid />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-(--color-border)" />
      </div>

      {/* 6. Image Mask Reveal */}
      <ImageMaskReveal />

      {/* Footer */}
      <footer className="py-16 px-6 text-center border-t border-(--color-border)">
        <p className="text-xs uppercase tracking-[0.3em] text-(--color-muted) mb-2">
          Built with GSAP + ScrollTrigger + React
        </p>
        <p className="text-sm text-(--color-muted)">
          Inspired by{" "}
          <a
            href="https://locomotive.ca/en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-accent) hover:underline"
          >
            Locomotive.ca
          </a>
        </p>
      </footer>
    </div>
  );
}
