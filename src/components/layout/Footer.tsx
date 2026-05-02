"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = ["Work", "Creators", "Brands", "About"];

const marqueeWords = [
  "icons",
  "creators",
  "brands",
  "content",
  "impact",
  "icons",
  "creators",
  "brands",
  "content",
  "impact",
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const btnXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const btnYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(
    () => {
      // ── Marquee — velocity-reactive speed ──
      const marqueeTrack = document.querySelector<HTMLElement>(
        ".footer-marquee-track",
      );
      if (marqueeTrack) {
        const totalWidth = marqueeTrack.scrollWidth / 2;

        // Base tween — drives the loop
        const marqueeTween = gsap.to(marqueeTrack, {
          x: -totalWidth,
          duration: 22,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
          },
        });

        // Speed + skew based on scroll velocity
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            const v = self.getVelocity(); // px/s
            const normalized = gsap.utils.clamp(-1, 1, v / 2000); // -1..1
            const speedMult = 1 + Math.abs(normalized) * 3; // 1x–4x
            const skew = normalized * 6; // ±6deg

            marqueeTween.timeScale(normalized < 0 ? -speedMult : speedMult);
            gsap.to(marqueeTrack, {
              skewX: skew,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });
      }

      // CTA heading reveal
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer-cta",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      ctaTl.from(".footer-cta-line", {
        scaleX: 0,
        duration: 0.8,
        ease: "power4.inOut",
      });

      ctaTl.from(
        ".footer-cta-heading span",
        {
          yPercent: 120,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
        },
        "-=0.4",
      );

      ctaTl.from(
        ".footer-cta-btn",
        { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.5",
      );

      gsap.from(".footer-col", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-grid",
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".footer-bottom-line", {
        scaleX: 0,
        duration: 0.8,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      // Magnetic CTA button
      if (ctaBtnRef.current) {
        btnXTo.current = gsap.quickTo(ctaBtnRef.current, "x", {
          duration: 0.4,
          ease: "power3",
        });
        btnYTo.current = gsap.quickTo(ctaBtnRef.current, "y", {
          duration: 0.4,
          ease: "power3",
        });
      }
    },
    { scope: footerRef },
  );

  const handleBtnMove = useCallback((e: React.MouseEvent) => {
    if (!ctaBtnRef.current || !btnXTo.current || !btnYTo.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    btnXTo.current((e.clientX - cx) * 0.35);
    btnYTo.current((e.clientY - cy) * 0.35);
  }, []);

  const handleBtnLeave = useCallback(() => {
    btnXTo.current?.(0);
    btnYTo.current?.(0);
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* ── Marquee band ── */}
      <div className="relative py-6 overflow-hidden border-t border-b border-border/20">
        <div className="footer-marquee-track flex items-center gap-12 whitespace-nowrap w-max">
          {marqueeWords.map((word, i) => (
            <span key={i} className="flex items-center gap-12">
              <span
                className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-normal leading-none tracking-tight"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  WebkitTextStroke: "1.5px var(--fg)",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.15,
                }}
              >
                {word}
              </span>
              <span className="text-accent opacity-30 text-4xl">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA section ── */}
      <div className="footer-cta relative px-6 py-28 md:py-36">
        {/* Radial glow behind CTA */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, var(--accent) 0%, transparent 70%)",
            opacity: 0.06,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="footer-cta-line h-px w-20 bg-accent mx-auto mb-10 origin-center" />

          <h2 className="footer-cta-heading text-5xl md:text-8xl lg:text-[7rem] font-normal text-(--color-fg) leading-[0.9] mb-8 overflow-hidden">
            <span
              className="inline-block"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Let&apos;s create
            </span>
            <br />
            <span
              className="inline-block text-accent"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              something iconic
            </span>
          </h2>

          <div
            className="footer-cta-btn inline-block"
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
          >
            <Link
              ref={ctaBtnRef}
              href="#"
              className="group inline-flex items-center gap-3 border border-(--color-fg) text-(--color-fg) px-10 py-5 rounded-full text-lg transition-all duration-300 hover:bg-(--color-fg) hover:text-(--color-bg)"
              style={{ willChange: "transform" }}
            >
              Start a project
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer bottom row ── */}
      <div className="footer-grid relative z-10 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="footer-bottom">
            <div className="footer-bottom-line h-px bg-(--color-border) mb-8 origin-center" />

            <div className="footer-col flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Brand */}
              <Link
                href="/"
                className="text-xl font-normal text-(--color-fg) shrink-0 hover:text-accent transition-colors duration-300"
              >
                icons<span className="text-accent">.</span>
              </Link>

              {/* Nav links — centered */}
              <nav className="flex items-center gap-8">
                {[...navLinks, "Twitter", "Instagram", "LinkedIn"].map(
                  (link) => (
                    <Link
                      key={link}
                      href="#"
                      className="text-sm text-(--color-muted-fg) hover:text-(--color-fg) transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  ),
                )}
              </nav>

              {/* Copyright */}
              <p className="text-[11px] text-(--color-muted-fg) shrink-0 tracking-wide">
                &copy; {new Date().getFullYear()} icons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
