"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { dur, ease, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ============================================================
   SectionLabel — uppercase tracked eyebrow used above every block
   ============================================================ */
export const SectionLabel = ({
  children,
  className,
  withDot = true,
}: {
  children: ReactNode;
  className?: string;
  withDot?: boolean;
}) => (
  <span className={cn("eyebrow inline-flex items-center gap-2.5", className)}>
    {withDot && <span className="chip-dot" />}
    {children}
  </span>
);

/* ============================================================
   PageHero — eyebrow + cinematic split-word headline + lede
   Words wrapped in <Accent>...</Accent> render in accent color.
   ============================================================ */
type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;        // raw text or array of words; pass `__ACCENT__` prefix to color a word
  lede?: ReactNode;
  meta?: ReactNode;        // optional inline meta block (e.g., stats)
  className?: string;
};

export const PageHero = ({ eyebrow, title, lede, meta, className }: PageHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".ph-eyebrow", {
        y: 12,
        opacity: 0,
        duration: dur.base,
        ease: ease.out,
      });

      tl.from(
        ".ph-word",
        {
          yPercent: 110,
          rotation: 4,
          duration: dur.epic,
          ease: ease.cinematic,
          stagger: stagger.tight,
          transformOrigin: "bottom center",
        },
        "-=0.4",
      );

      tl.from(
        ".ph-lede",
        { y: 24, opacity: 0, duration: dur.base, ease: ease.out },
        "-=0.7",
      );

      tl.from(
        ".ph-meta",
        { y: 24, opacity: 0, duration: dur.base, ease: ease.out },
        "-=0.6",
      );
    },
    { scope: ref },
  );

  // Parse title: split into words; if a word starts with __ACCENT__, color it.
  const words = typeof title === "string" ? title.split(" ") : null;

  return (
    <section
      ref={ref}
      className={cn("relative pt-40 pb-20 px-6 md:px-10", className)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="ph-eyebrow mb-10">
          <SectionLabel>{eyebrow}</SectionLabel>
        </div>

        <h1
          className="font-display leading-[0.92] text-[clamp(3.25rem,11vw,11rem)] tracking-tight"
          aria-label={typeof title === "string" ? title : undefined}
        >
          {words ? (
            words.map((w, i) => {
              const isAccent = w.startsWith("__ACCENT__");
              const clean = isAccent ? w.replace("__ACCENT__", "") : w;
              return (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom mr-[0.18em] last:mr-0"
                >
                  <span
                    className={cn(
                      "ph-word inline-block",
                      isAccent && "text-(--color-accent)",
                    )}
                  >
                    {clean}
                  </span>
                </span>
              );
            })
          ) : (
            <span className="ph-word inline-block">{title}</span>
          )}
        </h1>

        {(lede || meta) && (
          <div className="mt-14 pt-10 border-t border-(--color-border) grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            {lede && (
              <p className="ph-lede md:col-span-7 text-lg md:text-xl text-(--color-fg)/80 leading-relaxed max-w-3xl">
                {lede}
              </p>
            )}
            {meta && (
              <div className="ph-meta md:col-span-5 md:justify-self-end self-start w-full">
                {meta}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

/* ============================================================
   InlineStats — small horizontal stats block used in hero meta
   ============================================================ */
export const InlineStats = ({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) => (
  <dl
    className={cn(
      "grid grid-cols-3 gap-6 md:gap-10 w-full md:w-auto",
      className,
    )}
  >
    {items.map(({ value, label }) => (
      <div key={label} className="flex flex-col">
        <dt className="font-display text-3xl md:text-5xl text-(--color-accent) leading-none mb-2">
          {value}
        </dt>
        <dd className="eyebrow !text-[10px] !tracking-[0.25em]">{label}</dd>
      </div>
    ))}
  </dl>
);

/* ============================================================
   SectionShell — consistent vertical rhythm + top hairline
   ============================================================ */
export const SectionShell = ({
  eyebrow,
  title,
  description,
  children,
  className,
  tight = false,
  noBorder = false,
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  tight?: boolean;
  noBorder?: boolean;
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<Element>(".sx-reveal").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: ease.out,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={cn(
        "px-6 md:px-10",
        tight ? "py-20" : "py-28 md:py-32",
        !noBorder && "border-t border-(--color-border)",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">
        {(eyebrow || title || description) && (
          <header className="mb-14 md:mb-20 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 sx-reveal">
              {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
            </div>
            <div className="md:col-span-8">
              {title && (
                <h2 className="sx-reveal font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 max-w-3xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="sx-reveal text-base md:text-lg text-(--color-muted-fg) max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </header>
        )}
        {children}
      </div>
    </section>
  );
};

/* ============================================================
   BorderedGrid — 1px hairline grid container
   ============================================================ */
export const BorderedGrid = ({
  cols = 4,
  children,
  className,
}: {
  cols?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}) => {
  const colClass =
    cols === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : cols === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2";

  return (
    <div className={cn("grid-divider grid grid-cols-1 gap-px", colClass, className)}>
      {children}
    </div>
  );
};

/* ============================================================
   CTASection — final-section CTA used on most pages
   ============================================================ */
export const CTASection = ({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<Element>(".cta-reveal").forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.85,
          ease: ease.out,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-(--color-border) px-6 md:px-10 py-32 md:py-44"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 110%, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        {eyebrow && (
          <div className="cta-reveal mb-8 flex justify-center">
            <SectionLabel>{eyebrow}</SectionLabel>
          </div>
        )}
        <h2 className="cta-reveal font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
          {title}
        </h2>
        {description && (
          <p className="cta-reveal text-base md:text-lg text-(--color-muted-fg) max-w-xl mx-auto mb-12">
            {description}
          </p>
        )}
        <div className="cta-reveal flex flex-wrap items-center justify-center gap-4">
          <Link href={primary.href} className="btn-primary group">
            {primary.label}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn-ghost group">
              {secondary.label}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
