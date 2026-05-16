"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TreatedImage } from "@/components/shared/TreatedImage";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Swap these Unsplash IDs for your curated selects ──────────────────────────
const CREATORS = [
  {
    name: "Sofia Carvalho",
    niche: "Fashion & Beauty",
    location: "São Paulo",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Marcus Webb",
    niche: "Tech & Gadgets",
    location: "London",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Aisha Okonkwo",
    niche: "Lifestyle & Wellness",
    location: "Lagos",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Kenji Nakamura",
    niche: "Sports & Fitness",
    location: "Tokyo",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Lena Fischer",
    niche: "Art & Culture",
    location: "Berlin",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Omar Hassan",
    niche: "Travel & Adventure",
    location: "Dubai",
    img: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=600&h=800&fit=crop&crop=face&q=80",
  },
];

export const CreatorReelSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    // ── Header words fly in ──────────────────────────────────────────────────
    gsap.from(".reel-head-word", {
      y: "110%",
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: headRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // ── Cards cascade in before pin locks ────────────────────────────────────
    gsap.from(".reel-card", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: 0.07,
      scrollTrigger: {
        trigger: track,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // ── Horizontal scroll pin ────────────────────────────────────────────────
    const getDistance = () => track.scrollWidth - section.offsetWidth + 96;

    gsap.to(track, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
    >
      {/* ── Section header ── */}
      <div ref={headRef} className="px-6 md:px-12 pt-24 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
              style={{ color: "var(--muted-fg, var(--muted))" }}
            >
              Creator Network
            </p>
            <h2
              className="text-5xl md:text-7xl font-bold leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {["Meet", "the"].map((w, i) => (
                <span key={i} className="inline-block overflow-hidden mr-4">
                  <span className="reel-head-word inline-block">{w}</span>
                </span>
              ))}
              <span className="inline-block overflow-hidden">
                <span
                  className="reel-head-word inline-block"
                  style={{ color: "var(--accent)" }}
                >
                  Icons.
                </span>
              </span>
            </h2>
          </div>
          <p
            className="text-sm max-w-xs leading-relaxed md:text-right"
            style={{ color: "var(--muted-fg, var(--muted))" }}
          >
            10,000+ creators across every niche, culture, and corner of the globe.
          </p>
        </div>
      </div>

      {/* ── Horizontal track ── */}
      <div
        ref={trackRef}
        className="flex gap-3 px-6 md:px-12 pb-12 will-change-transform"
        style={{ width: "max-content" }}
      >
        {CREATORS.map(({ name, niche, location, img }, idx) => (
          <div
            key={name}
            className="reel-card group relative shrink-0 rounded-xl overflow-hidden"
            style={{
              width: "clamp(220px, 22vw, 320px)",
              height: "clamp(300px, 55vh, 500px)",
            }}
          >
            <TreatedImage
              src={img}
              alt={name}
              wrapperClassName="w-full h-full"
              grainOpacity={0.14}
              parallax={0.2}
            />

            {/* Index number — top-left watermark */}
            <div
              className="absolute top-4 left-4 text-xs font-semibold tabular-nums opacity-40"
              style={{ color: "#fff" }}
            >
              {String(idx + 1).padStart(2, "0")}
            </div>

            {/* Bottom info overlay */}
            <div
              className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 55%, transparent 100%)",
              }}
            >
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="font-bold text-white text-base leading-tight">
                    {name}
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest mt-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {niche}
                  </p>
                  <p
                    className="text-xs mt-0.5 opacity-50"
                    style={{ color: "#fff" }}
                  >
                    {location}
                  </p>
                </div>

                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  <ArrowUpRight size={14} color="#000" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ── CTA end-card ── */}
        <div
          className="reel-card shrink-0 rounded-xl flex flex-col items-center justify-center gap-4 px-8"
          style={{
            width: "clamp(200px, 18vw, 280px)",
            height: "clamp(300px, 55vh, 500px)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-5xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--accent)",
            }}
          >
            +10K
          </p>
          <p
            className="text-xs uppercase tracking-widest text-center"
            style={{ color: "var(--muted-fg, var(--muted))" }}
          >
            creators & growing
          </p>
          <Link
            href="/creators"
            className="mt-2 inline-flex items-center gap-2 border px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all duration-300 hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Join Network <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};
