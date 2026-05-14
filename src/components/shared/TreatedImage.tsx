"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TreatedImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  /** CSS filter applied to the raw image. Default is cinematic dark treatment. */
  filter?: string;
  /** Film grain overlay opacity 0–1. Default 0.12. */
  grainOpacity?: number;
  /** Dark radial vignette. Default true. */
  vignette?: boolean;
  /** Brand gradient colour overlay (mix-blend-mode: color). Default true. */
  accentOverlay?: boolean;
  /**
   * Parallax strength 0–1 (0 = none, 0.3 = moderate).
   * Adds slight over-scale and scrolls image slower than page.
   */
  parallax?: number;
}

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const TreatedImage = ({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  filter = "brightness(0.6) contrast(1.15) saturate(0.55)",
  grainOpacity = 0.12,
  vignette = true,
  accentOverlay = true,
  parallax = 0,
}: TreatedImageProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!parallax || !imgRef.current || !wrapperRef.current) return;

    const tween = gsap.to(imgRef.current, {
      yPercent: -(parallax * 30),
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [parallax]);

  return (
    <div
      ref={wrapperRef}
      className={`relative isolate overflow-hidden ${wrapperClassName}`}
    >
      {/* ── Image ── */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className={`w-full h-full object-cover select-none ${className}`}
        style={{
          filter,
          transform: parallax ? "scale(1.25)" : undefined,
          willChange: parallax ? "transform" : "auto",
        }}
      />

      {/* ── Film grain ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "140px 140px",
          opacity: grainOpacity,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Vignette ── */}
      {vignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.72) 100%)",
          }}
        />
      )}

      {/* ── Brand accent colour wash ── */}
      {accentOverlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,197,24,0.07) 0%, rgba(224,45,45,0.05) 50%, rgba(45,188,107,0.07) 100%)",
            mixBlendMode: "color",
          }}
        />
      )}
    </div>
  );
};
