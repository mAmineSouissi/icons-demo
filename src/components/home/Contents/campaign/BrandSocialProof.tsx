"use client";

import React from "react";
import { useEntrance } from "@/hooks/animations";
import { dur, ease } from "@/lib/motion";

/* ─── Brand wordmarks ─────────────────────────────────────────── */
const LOGOS = [
  {
    name: "Patagonia",
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      fontSize: "1.15rem",
    },
  },
  {
    name: "Glossier",
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "700",
      fontSize: "1rem",
      letterSpacing: "0.08em",
    },
  },
  {
    name: "Gymshark",
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "800",
      fontSize: "0.95rem",
      letterSpacing: "0.04em",
      textTransform: "uppercase" as const,
    },
  },
  {
    name: "Chamberlain Coffee",
    style: { fontFamily: "var(--font-script)", fontSize: "1.4rem" },
  },
  {
    name: "Paula's Choice",
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "600",
      fontSize: "0.9rem",
      letterSpacing: "0.06em",
    },
  },
  {
    name: "Away",
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      fontSize: "1.4rem",
      letterSpacing: "-0.02em",
    },
  },
  {
    name: "Penguin Random House",
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: "700",
      fontSize: "0.7rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase" as const,
    },
  },
  {
    name: "LUSH",
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: "900",
      fontSize: "1.1rem",
      letterSpacing: "0.18em",
      textTransform: "uppercase" as const,
    },
  },
];

const STYLES = `
  .bsp-logo-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0 3rem;
  }
  @media (min-width: 768px) { .bsp-logo-row { gap: 0 4rem; flex-wrap: nowrap; } }

  .bsp-quote-card {
    position: relative;
    border: 2px solid var(--color-fg);
    border-radius: 20px;
    padding: 2.5rem 3rem;
    max-width: 56rem;
    margin: 0 auto;
    box-shadow: 6px 6px 0 0 var(--color-fg);
  }
  @media (min-width: 768px) { .bsp-quote-card { padding: 3rem 4rem; } }
`;

export const BrandSocialProof = () => {
  const ref = React.useRef<HTMLElement>(null);

  // Logos: staggered fade-up
  useEntrance({
    scope: ref,
    selector: ".bsp-logo",
    y: 16,
    duration: dur.base,
    ease: ease.out,
    scrollTrigger: { start: "top 85%", once: true },
  });

  // Quote card: cinematic clip-path wipe up
  useEntrance({
    scope: ref,
    selector: ".bsp-quote-card",
    y: 24,
    clipPath: "inset(0 0 100% 0)",
    duration: dur.slow,
    ease: ease.cinematic,
    scrollTrigger: { start: "top 88%", once: true },
  });

  return (
    <section
      ref={ref}
      className="relative border-y border-(--color-border) overflow-hidden"
      style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
    >
      <style>{STYLES}</style>

      {/* ── Logos strip ────────────────────────────────────────── */}
      <div className="px-8 md:px-14 pt-14 pb-10 border-b border-bg/10">
        <p
          className="font-mono font-semibold text-[10px] uppercase tracking-[0.32em] mb-10 text-center"
          style={{
            color: "color-mix(in srgb, var(--color-bg) 45%, transparent)",
          }}
        >
          Trusted by category-defining brands
        </p>
        <div className="bsp-logo-row">
          {LOGOS.map((logo) => (
            <span
              key={logo.name}
              className="bsp-logo whitespace-nowrap py-2"
              style={{
                ...logo.style,
                color: "color-mix(in srgb, var(--color-bg) 55%, transparent)",
                transition: "color 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--color-bg)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "color-mix(in srgb, var(--color-bg) 55%, transparent)")
              }
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured brand quote ────────────────────────────────── */}
      <div className="px-6 md:px-14 py-16">
        <div
          className="bsp-quote-card"
          style={{ background: "var(--color-bg)", color: "var(--color-fg)" }}
        >
          {/* Opening quotation mark */}
          <span
            aria-hidden
            className="absolute -top-6 left-8 font-display leading-none select-none"
            style={{
              fontSize: "8rem",
              color: "var(--color-fg)",
              opacity: 0.07,
              lineHeight: 1,
            }}
          >
            "
          </span>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-8">
            <div className="flex-1">
              <p
                className="font-display italic leading-[1.1] mb-6"
                style={{ fontSize: "clamp(1.35rem, 2.8vw, 2rem)" }}
              >
                Icons delivered{" "}
                <span style={{ color: "var(--color-accent)" }}>
                  3× our normal engagement rate
                </span>{" "}
                in the first week. Zero agency overhead, zero ambiguity on who
                owns the creative. We briefed on Monday — content was live by
                Wednesday.
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar initials */}
                <div
                  className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-display italic text-base border-2 border-(--color-fg)"
                  style={{ background: "var(--color-accent)" }}
                  aria-hidden
                >
                  E
                </div>
                <div>
                  <p className="font-mono font-semibold text-[12px] tracking-wide">
                    Emma W.
                  </p>
                  <p className="font-mono text-[12px] opacity-30 tracking-wide mt-0.5">
                    VP Marketing · Glossier
                  </p>
                </div>
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="flex md:flex-col gap-8 md:gap-4 shrink-0 md:text-right">
              {[
                { value: "3×", label: "engagement lift" },
                { value: "48h", label: "campaign go-live" },
                { value: "$0", label: "agency markup" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="font-display italic leading-none"
                    style={{
                      fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-30 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
