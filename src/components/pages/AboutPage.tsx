"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import {
  PageHero,
  InlineStats,
  SectionLabel,
  CTASection,
} from "@/components/shared/PagePrimitives";
import { ease, dur } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

const heroStats = [
  { value: "2022", label: "Founded" },
  { value: "10K+", label: "Creators" },
  { value: "500+", label: "Brands" },
];

const values = [
  { title: "Authenticity", body: "We champion real stories over polished facades. Every piece of content should feel human." },
  { title: "Innovation",   body: "We push the boundaries of how creators and brands collaborate in the digital age." },
  { title: "Community",    body: "Every creator and brand on Icons is a partner. We grow together, always." },
  { title: "Impact",       body: "We measure success not in impressions, but in the genuine connections we spark." },
];

const team = [
  { name: "Sara Malik",   role: "Co-Founder & CEO",            bio: "Former creator with 2M+ followers. Built Icons to solve her own frustrations.", tone: "gradient-warm" },
  { name: "James Okafor", role: "Co-Founder & CTO",            bio: "Ex-Meta engineer. Obsessed with matchmaking algorithms and great espresso.",     tone: "gradient-cool" },
  { name: "Lena Vogel",   role: "Head of Creator Growth",      bio: "Grew creator communities at TikTok Europe before joining the founding team.",   tone: "gradient-accent" },
  { name: "Tomás Rivera", role: "Head of Brand Partnerships",  bio: "Decade of brand strategy at global agencies. Believes in content that moves people.", tone: "gradient-mono" },
];

const milestones = [
  { year: "2022", event: "Icons founded in a Dubai co-working space with 3 people and a big idea." },
  { year: "2023", event: "Reached 1,000 creators and closed first $2M seed round." },
  { year: "2024", event: "Launched AI-powered brand matching. 500 brand partners onboarded." },
  { year: "2025", event: "Crossed $10M in creator earnings. Opened NYC office." },
];

const pressLogos = ["TechCrunch", "Fast Company", "Vogue Business", "AdWeek", "Forbes", "The Drum"];

/* Manifesto split — each line is one beat in the pinned scrub timeline.
   Strings prefixed with `~` render as italic; `*` words highlight in accent. */
const manifestoLines = [
  "We don't do *influencer marketing.",
  "We orchestrate ~cultural moments —",
  "the kind that move real people",
  "and outlast a campaign cycle.",
];

export const AboutPage = () => {
  const root = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      // ── 1. Floating accent orb tied to scroll progress ────────────
      gsap.to(orbRef.current, {
        y: () => window.innerHeight * 1.2,
        x: () => window.innerWidth * 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
        },
      });

      // ── 2. Pinned manifesto: scrub-driven line reveal ─────────────
      const manifesto = manifestoRef.current!;
      const mTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: manifesto,
          start: "top top",
          end: "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Background gradient drift over the whole pin range
      mTl
        .fromTo(
          ".mn-glow",
          { scale: 0.7, opacity: 0.04 },
          { scale: 1.4, opacity: 0.12, duration: 1 },
          0,
        )
        // Each line: lift its inner span out of the mask + fade in accent words
        .from(
          ".mn-line",
          {
            yPercent: 110,
            rotate: 3,
            transformOrigin: "left bottom",
            stagger: 0.55,
            duration: 0.8,
          },
          0.05,
        )
        // The lede follows the lines
        .from(
          ".mn-lede",
          { y: 28, opacity: 0, duration: 0.6 },
          ">-0.2",
        )
        // Side note slides in last
        .from(
          ".mn-note",
          { xPercent: -25, opacity: 0, duration: 0.6 },
          "<",
        );

      // ── 3. Values: numbered cards with mask reveal via batch ──────
      ScrollTrigger.batch(".val-card", {
        start: "top 85%",
        onEnter: (els) => {
          gsap.from(els, {
            yPercent: 35,
            opacity: 0,
            duration: dur.slow,
            ease: ease.cinematic,
            stagger: 0.12,
            overwrite: "auto",
          });
          // The huge numerals lift independently after the card lands
          gsap.from(
            els.map((el) => el.querySelector(".val-num")).filter(Boolean),
            {
              yPercent: 120,
              opacity: 0,
              duration: dur.epic,
              ease: ease.cinematic,
              stagger: 0.12,
              delay: 0.15,
              overwrite: "auto",
            },
          );
        },
      });

      // ── 4. Timeline rows: horizontal slide-in + center-scale shift ─
      const rows = gsap.utils.toArray<HTMLElement>(".tl-row");
      rows.forEach((row) => {
        const yearEl = row.querySelector(".tl-year");
        const eventEl = row.querySelector(".tl-event");
        const rule = row.querySelector(".tl-rule");

        // Entry animation — distinct from scrub
        gsap
          .timeline({
            defaults: { ease: ease.cinematic },
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          })
          .from(rule, { scaleX: 0, transformOrigin: "left center", duration: 0.7 })
          .from(
            yearEl,
            { xPercent: -8, yPercent: 110, duration: 0.95 },
            "-=0.35",
          )
          .from(
            eventEl,
            { y: 30, opacity: 0, duration: 0.7 },
            "-=0.55",
          );

        // Scrub: as the row crosses center, the year scales up + tints accent
        gsap.fromTo(
          yearEl,
          { scale: 0.92, color: "var(--fg)" },
          {
            scale: 1.04,
            color: "var(--accent)",
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              end: "bottom 30%",
              scrub: 1,
            },
          },
        );
      });

      // ── 5. Team grid: batch reveal + circle clip-path entry ────────
      ScrollTrigger.batch(".team-card", {
        start: "top 88%",
        onEnter: (els) => {
          gsap.from(els, {
            yPercent: 25,
            opacity: 0,
            duration: dur.slow,
            ease: ease.cinematic,
            stagger: 0.1,
            overwrite: "auto",
          });
          gsap.fromTo(
            els.map((el) => el.querySelector(".team-photo")).filter(Boolean),
            { clipPath: "circle(0% at 50% 50%)" },
            {
              clipPath: "circle(60% at 50% 50%)",
              duration: dur.epic,
              ease: ease.cinematic,
              stagger: 0.1,
              delay: 0.2,
              overwrite: "auto",
            },
          );
        },
      });

      // ── 6. Magnetic hover on team cards ───────────────────────────
      const cards = gsap.utils.toArray<HTMLElement>(".team-card");
      const cleanups: (() => void)[] = [];

      cards.forEach((card) => {
        const photo = card.querySelector<HTMLElement>(".team-photo");
        if (!photo) return;

        const qX = gsap.quickTo(card, "x", { duration: 0.5, ease: "power3.out" });
        const qY = gsap.quickTo(card, "y", { duration: 0.5, ease: "power3.out" });
        const qPX = gsap.quickTo(photo, "x", { duration: 0.6, ease: "power3.out" });
        const qPY = gsap.quickTo(photo, "y", { duration: 0.6, ease: "power3.out" });

        const onMove = contextSafe!((e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const cx = e.clientX - (r.left + r.width / 2);
          const cy = e.clientY - (r.top + r.height / 2);
          qX(cx * 0.08);
          qY(cy * 0.08);
          qPX(cx * 0.18);
          qPY(cy * 0.18);
        });
        const onLeave = contextSafe!(() => {
          qX(0); qY(0); qPX(0); qPY(0);
        });

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      // ── 7. Press marquee: continuous loop + velocity-reactive skew ─
      const track = marqueeRef.current;
      if (track) {
        const totalW = track.scrollWidth / 2;
        const loop = gsap.to(track, {
          x: -totalW,
          duration: 30,
          ease: "none",
          repeat: -1,
          modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % totalW) },
        });

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            const v = self.getVelocity();
            const n = gsap.utils.clamp(-1, 1, v / 2400);
            const mult = 1 + Math.abs(n) * 2.6;
            loop.timeScale(n < 0 ? -mult : mult);
            gsap.to(track, {
              skewX: n * 8,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });
      }

      // ── 8. Section eyebrows / titles — small mask reveals ─────────
      gsap.utils.toArray<HTMLElement>(".sec-reveal").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: dur.slow,
          ease: ease.out,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => {
        cleanups.forEach((c) => c());
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="min-h-screen bg-(--color-bg) text-(--color-fg) relative">
      {/* Floating decorative orb — drifts the full page length */}
      <div
        ref={orbRef}
        aria-hidden
        className="pointer-events-none fixed top-[20vh] left-[8vw] w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-30 z-0"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative z-10">
        <PageHero
          eyebrow="About"
          title="We Are __ACCENT__Icons."
          lede="We built Icons because authentic creator–brand partnerships shouldn't be hard. No middlemen. No vanity metrics. Just real people, real content, and results that compound."
          meta={<InlineStats items={heroStats} />}
        />

        {/* ── 1. Pinned manifesto ──────────────────────────────── */}
        <section
          ref={manifestoRef}
          className="relative h-screen flex items-center px-6 md:px-10 border-t border-(--color-border) overflow-hidden"
        >
          <div
            className="mn-glow absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
            }}
          />
          <div className="max-w-6xl mx-auto w-full grid grid-cols-12 gap-8 relative">
            <aside className="mn-note col-span-12 md:col-span-3 self-start">
              <p className="eyebrow">The manifesto</p>
              <p className="mt-3 text-xs text-(--color-muted-fg) leading-relaxed max-w-[15ch]">
                First written on a napkin in Dubai, 2022.
              </p>
            </aside>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-tight">
                {manifestoLines.map((line, i) => {
                  // tokenize: words prefixed with * are accent; lines prefixed with ~ are italic
                  const italic = line.startsWith("~");
                  const clean = italic ? line.slice(1) : line;
                  return (
                    <span
                      key={i}
                      className="block overflow-hidden"
                    >
                      <span
                        className={`mn-line inline-block ${italic ? "italic" : ""}`}
                      >
                        {clean.split(" ").map((w, j) => {
                          const isAccent = w.startsWith("*");
                          const word = isAccent ? w.slice(1) : w;
                          return (
                            <span
                              key={j}
                              className={
                                isAccent ? "text-(--color-accent)" : ""
                              }
                            >
                              {word}
                              {j < clean.split(" ").length - 1 ? " " : ""}
                            </span>
                          );
                        })}
                      </span>
                    </span>
                  );
                })}
              </h2>
              <p className="mn-lede mt-10 text-base md:text-lg text-(--color-muted-fg) leading-relaxed max-w-2xl">
                Creators built the modern internet. Brands need a better way to
                work with them — one that respects creative integrity, pays
                fairly, and proves out in numbers. That's the platform we're
                building, and the only one we'd want to be on ourselves.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. Values ─────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-28 md:py-32 border-t border-(--color-border)">
          <div className="max-w-7xl mx-auto">
            <header className="mb-14 md:mb-20 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 sec-reveal">
                <SectionLabel>Our values</SectionLabel>
              </div>
              <div className="md:col-span-8">
                <h2 className="sec-reveal font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-3xl">
                  The four things we won't compromise on.
                </h2>
              </div>
            </header>
            <div className="grid-divider grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
              {values.map(({ title, body }, i) => (
                <article
                  key={title}
                  className="val-card p-8 will-change-transform"
                >
                  <span className="block overflow-hidden mb-6">
                    <span className="val-num font-display text-5xl text-(--color-accent)/30 leading-none inline-block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="font-medium text-lg mb-3">{title}</h3>
                  <p className="text-sm text-(--color-muted-fg) leading-relaxed">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Timeline ───────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-28 md:py-32 border-t border-(--color-border)">
          <div className="max-w-7xl mx-auto" ref={timelineRef}>
            <header className="mb-14 md:mb-20 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 sec-reveal">
                <SectionLabel>Our story</SectionLabel>
              </div>
              <div className="md:col-span-8">
                <h2 className="sec-reveal font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-3xl">
                  Built one milestone at a time.
                </h2>
              </div>
            </header>

            <div>
              {milestones.map(({ year, event }) => (
                <div
                  key={year}
                  className="tl-row grid grid-cols-12 gap-6 items-start py-10 relative"
                >
                  <div className="tl-rule absolute left-0 right-0 top-0 h-px bg-(--color-border)" />
                  <div className="col-span-12 md:col-span-3 overflow-hidden">
                    <span className="tl-year font-display text-5xl md:text-7xl leading-none inline-block will-change-transform">
                      {year}
                    </span>
                  </div>
                  <p className="tl-event col-span-12 md:col-span-9 text-lg md:text-xl leading-relaxed text-(--color-fg)/85 pt-2 md:pt-4">
                    {event}
                  </p>
                </div>
              ))}
              <div className="h-px bg-(--color-border)" />
            </div>
          </div>
        </section>

        {/* ── 4. Team ───────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-28 md:py-32 border-t border-(--color-border)">
          <div className="max-w-7xl mx-auto">
            <header className="mb-14 md:mb-20 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 sec-reveal">
                <SectionLabel>The team</SectionLabel>
              </div>
              <div className="md:col-span-8">
                <h2 className="sec-reveal font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-3xl">
                  Operators, builders, and creators-turned-founders.
                </h2>
              </div>
            </header>
            <div
              ref={teamGridRef}
              className="grid-divider grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
            >
              {team.map(({ name, role, bio, tone }) => (
                <article
                  key={name}
                  className="team-card group cursor-pointer p-8 will-change-transform"
                >
                  <div
                    className={`team-photo ${tone} w-full aspect-square mb-6 rounded-full relative overflow-hidden will-change-transform`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center font-display text-6xl text-(--color-fg)/40">
                      {name.split(" ").map((p) => p[0]).join("")}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium mb-1 group-hover:text-(--color-accent) transition-colors duration-300">
                        {name}
                      </h3>
                      <p className="eyebrow !text-[10px] mb-4 text-(--color-accent)">
                        {role}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-(--color-muted-fg) opacity-0 group-hover:opacity-100 group-hover:text-(--color-accent) transition-all duration-300" />
                  </div>
                  <p className="text-sm text-(--color-muted-fg) leading-relaxed">
                    {bio}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Press — velocity-reactive marquee ─────────────── */}
        <section className="py-20 border-t border-(--color-border) overflow-hidden relative">
          <div className="mb-10 text-center sec-reveal">
            <SectionLabel>As seen in</SectionLabel>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-(--color-bg) to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-(--color-bg) to-transparent pointer-events-none" />
          <div
            ref={marqueeRef}
            className="flex items-center gap-20 whitespace-nowrap w-max will-change-transform"
          >
            {[...pressLogos, ...pressLogos, ...pressLogos].map((p, i) => (
              <span
                key={i}
                className="font-display text-4xl md:text-6xl text-(--color-fg)/55 tracking-tight"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        <CTASection
          title="Want to build with us?"
          description="We're hiring across engineering, design, and creator operations."
          primary={{ label: "See open roles", href: "/contact" }}
          secondary={{ label: "Read the blog", href: "/blog" }}
        />
      </div>
    </div>
  );
};
