import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowUpRight, MapPin, Clock, Zap, CheckCircle2 } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease } from "@/lib/motion";
import type { CreatorProfile } from "@/data/creators";

gsap.registerPlugin(ScrollTrigger);

/* ── Availability badge ──────────────────────────────────────── */
function AvailBadge({ status }: { status: CreatorProfile["availability"] }) {
  const config = {
    available:      { label: "Available now",    tone: "accent"  },
    "booking-soon": { label: "Booking Q3 2026",  tone: "yellow"  },
    booked:         { label: "Currently booked", tone: "pink"    },
  }[status];
  return (
    <span className="chip inline-flex items-center gap-2 !text-[10px] !px-3 !py-1.5" data-tone={config.tone}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ background: "currentColor" }} />
      {config.label}
    </span>
  );
}

/* ── Portfolio tile ──────────────────────────────────────────── */
function PortfolioTile({ item }: { item: CreatorProfile["portfolio"][0] }) {
  const fg = item.dark ? "#fff" : "#000";
  const dim = item.dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  return (
    <div className="relative overflow-hidden rounded-xl group cursor-default aspect-[4/3] transition-transform duration-500 hover:-translate-y-1"
      style={{ background: item.bg, boxShadow: "0 2px 0 0 var(--color-border)" }}>
      {/* Corner registration marks */}
      {[["top-3 left-3", "borderTop borderLeft"], ["top-3 right-3", "borderTop borderRight"],
        ["bottom-3 left-3", "borderBottom borderLeft"], ["bottom-3 right-3", "borderBottom borderRight"]].map(([pos], i) => (
        <div key={i} aria-hidden className={`absolute ${pos} w-2.5 h-2.5`}
          style={{ borderTop: i < 2 ? `1px solid ${item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}` : undefined,
                   borderBottom: i >= 2 ? `1px solid ${item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}` : undefined,
                   borderLeft: i % 2 === 0 ? `1px solid ${item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}` : undefined,
                   borderRight: i % 2 === 1 ? `1px solid ${item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}` : undefined }} />
      ))}

      {/* Top row — format pill + view count */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center" style={{ zIndex: 4 }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
          style={{ background: item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)", color: dim }}>
          {item.format}
        </span>
        <span className="font-mono text-[10px] font-semibold" style={{ color: fg, opacity: 0.55 }}>{item.views}</span>
      </div>

      {/* Center — big italic number on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ zIndex: 5 }}>
        <span className="font-display" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: fg, opacity: 0.1, fontStyle: "italic", letterSpacing: "-0.02em" }}>
          {item.views}
        </span>
      </div>

      {/* Bottom — frosted brand label */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 translate-y-px group-hover:translate-y-0 transition-transform duration-300"
        style={{ zIndex: 4, background: item.dark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)", backdropFilter: "blur(6px)" }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: fg, opacity: 0.75 }}>
          {item.brand !== "Organic" ? `↗ ${item.brand}` : "✦ Organic"}
        </span>
      </div>
    </div>
  );
}

/* ── Stat pill (dark strip variant) ─────────────────────────── */
function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="cp-stat flex flex-col justify-center py-8 px-6">
      <span className="cp-stat-value font-display italic leading-none mb-2"
        style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "var(--color-accent)" }}>
        {value}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.28em]"
        style={{ color: "color-mix(in srgb, var(--color-bg) 50%, transparent)" }}>
        {label}
      </span>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function CreatorProfilePage({ creator }: { creator: CreatorProfile }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero entrance — staggered
    gsap.fromTo(".cp-hero-in",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: ease.out, stagger: 0.08, delay: 0.2 },
    );

    // Stats bar — stagger each stat pill in
    gsap.fromTo(".cp-stat",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: ease.out, stagger: 0.1,
        scrollTrigger: { trigger: ".cp-stats-grid", start: "top 90%", toggleActions: "play none none none", once: true } },
    );

    // Generic scroll reveals
    gsap.utils.toArray<Element>(".cp-reveal").forEach((el) => {
      gsap.fromTo(el,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: ease.out,
          scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none", once: true } },
      );
    });

    // Portfolio tiles — stagger
    gsap.fromTo(".cp-tile",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: ease.out, stagger: 0.07,
        scrollTrigger: { trigger: ".cp-portfolio-grid", start: "top 88%", toggleActions: "play none none none", once: true } },
    );
  }, { scope: ref });

  const platformTotal = creator.platforms.reduce((sum, p) => {
    const n = parseFloat(p.followers.replace(/[KM]/g, "")) * (p.followers.includes("M") ? 1000 : 1);
    return sum + n;
  }, 0);
  const totalReach = platformTotal >= 1000 ? `${(platformTotal / 1000).toFixed(1)}M` : `${Math.round(platformTotal)}K`;

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      <style>{`
        .cp-hero-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .cp-hero-grid { grid-template-columns: 380px 1fr; min-height: 520px; } }
        .cp-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 768px) { .cp-stats-grid { grid-template-columns: repeat(5, 1fr); } }
        .cp-portfolio-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        @media (min-width: 768px) { .cp-portfolio-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; } }
        .cp-info-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        @media (min-width: 1024px) { .cp-info-grid { grid-template-columns: 1fr 1fr; gap: 4rem; } }
        .cp-platforms-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        @media (min-width: 480px) { .cp-platforms-grid { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); } }
      `}</style>

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="border-b border-(--color-border) px-6 md:px-10 py-4">
        <Link href="/creators"
          className="inline-flex items-center gap-2 text-sm text-(--color-muted-fg) hover:text-(--color-fg) transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Browse creators
        </Link>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-(--color-border)">
        <div className="cp-hero-grid">

          {/* Left — immersive avatar panel */}
          <div className={`${creator.tone} bracket-frame relative flex flex-col items-center justify-center p-12 min-h-[360px] overflow-hidden`}>
            {/* Dot grid overlay */}
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }} />
            {/* Large watermark initial */}
            <span aria-hidden className="absolute inset-0 flex items-end justify-center select-none pb-4 font-display italic leading-none"
              style={{ fontSize: "clamp(8rem,22vw,16rem)", color: "rgba(0,0,0,0.07)" }}>
              {creator.shortName.charAt(0)}
            </span>

            <div className="cp-hero-in relative z-10 flex flex-col items-center gap-5 text-center">
              {/* Avatar ring */}
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 rounded-full animate-pulse"
                  style={{ background: "rgba(255,255,255,0.15)", animationDuration: "3s" }} />
                <div className="relative w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "2px solid rgba(255,255,255,0.35)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                  <span className="font-display italic text-5xl leading-none" style={{ color: "rgba(0,0,0,0.45)" }}>
                    {creator.shortName.charAt(0)}
                  </span>
                </div>
              </div>

              <div>
                <h1 className="font-display italic text-4xl leading-none mb-1.5" style={{ color: "var(--color-fg)" }}>
                  {creator.shortName}
                </h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--color-fg)", opacity: 0.5 }}>
                  {creator.title}
                </p>
              </div>

              <AvailBadge status={creator.availability} />
            </div>
          </div>

          {/* Right — metadata panel */}
          <div className="flex flex-col justify-between p-8 md:p-10 border-t md:border-t-0 md:border-l border-(--color-border)">
            <div className="flex flex-col gap-6">

              {/* Name + meta row */}
              <div className="cp-hero-in flex flex-col gap-2">
                <h2 className="font-display italic text-3xl leading-none">{creator.shortName}</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-muted-fg)">
                    <MapPin className="w-3.5 h-3.5" />{creator.location}
                  </span>
                  <span className="w-px h-3 bg-(--color-border)" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-muted-fg)">
                    <Clock className="w-3.5 h-3.5" />Responds {creator.responseTime}
                  </span>
                  <span className="w-px h-3 bg-(--color-border)" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-muted-fg)">
                    <Zap className="w-3.5 h-3.5" />{creator.fee}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="cp-hero-in font-script text-xl leading-snug opacity-70 max-w-xl">
                — {creator.bio}
              </p>

              {/* Platform cards */}
              <div className="cp-hero-in cp-platforms-grid">
                {creator.platforms.map((p) => (
                  <div key={p.name} className="sticker flex flex-col px-4 py-3" data-tone="cream">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 mb-1">{p.name}</span>
                    <span className="font-display italic text-2xl leading-none">{p.followers}</span>
                    <span className="font-mono text-[8px] mt-1" style={{ color: "var(--color-accent)" }}>{p.growth} growth</span>
                  </div>
                ))}
              </div>

              {/* Brand fit preview */}
              <div className="cp-hero-in flex flex-wrap gap-2">
                {creator.brandFit.slice(0, 4).map((b) => (
                  <span key={b} className="chip inline-flex items-center gap-1.5 !text-[10px] !px-3 !py-1.5" data-tone="accent">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div className="cp-hero-in mt-8 pt-6 border-t border-(--color-border) flex flex-wrap items-center gap-4"
              style={{ borderColor: "var(--color-fg)" }}>
              <Link href={`/contact?creator=${creator.handle}`} className="btn-primary">
                Book via Icons
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">All enquiries managed</span>
                <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">through Icons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar — dark power strip ───────────────────────── */}
      <section style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}>
        <div className="cp-stats-grid max-w-7xl mx-auto px-6 md:px-10">
          {[
            { label: "Total reach", value: totalReach },
            ...creator.stats,
          ].map((s, i, arr) => (
            <div key={s.label}
              style={{ borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : undefined }}>
              <StatPill label={s.label} value={s.value} />
            </div>
          ))}
        </div>
      </section>

      {/* ── About + brand fit ──────────────────────────────────── */}
      <section className="border-b border-(--color-border) bracket-frame dot-grid px-6 md:px-10 py-14"
        style={{ background: "var(--color-panel)" }}>
        <div className="max-w-7xl mx-auto cp-info-grid">

          <div className="cp-reveal flex flex-col gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 mb-4">Content types</p>
              <div className="flex flex-wrap gap-2">
                {creator.contentTypes.map((t) => (
                  <span key={t} className="chip !text-[10px] !px-3 !py-1.5" data-tone="cream">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 mb-4">Audience categories</p>
              <div className="flex flex-wrap gap-2">
                {creator.categories.map((c) => (
                  <span key={c} className="chip !text-[10px] !px-3 !py-1.5" data-tone="ink">{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="cp-reveal flex flex-col gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 mb-4">Works well with</p>
              <div className="flex flex-wrap gap-2">
                {creator.brandFit.map((b) => (
                  <span key={b} className="chip inline-flex items-center gap-1.5 !text-[10px] !px-3 !py-1.5" data-tone="accent">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />{b}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 mb-4">Past brand categories</p>
              <div className="flex flex-wrap gap-2">
                {creator.pastBrands.map((b) => (
                  <span key={b} className="chip !text-[10px] !px-3 !py-1.5" data-tone="yellow">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio ──────────────────────────────────────────── */}
      <section className="border-b border-(--color-border) px-6 md:px-10 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="cp-reveal flex items-end justify-between mb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-50 mb-2">Portfolio</div>
              <h2 className="font-display italic text-3xl md:text-4xl leading-tight">Recent work.</h2>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 text-right hidden md:block">
              Content belongs<br />to Icons platform
            </span>
          </div>
          <div className="cp-portfolio-grid">
            {creator.portfolio.map((item, i) => (
              <div key={i} className="cp-tile">
                <PortfolioTile item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ────────────────────────────────────────── */}
      <section className="relative py-24 px-6 md:px-12 dot-grid bracket-frame border-t border-(--color-border)"
        style={{ background: "var(--color-bg)" }}>
        <div className="max-w-3xl mx-auto relative">
          <Sparkle size={56} fill="var(--accent2)" className="absolute -top-4 -left-4 md:-left-10 -rotate-12 pointer-events-none" />
          <Sparkle size={44} fill="var(--accent4)" className="absolute -bottom-4 -right-4 md:-right-10 rotate-12 pointer-events-none" />

          <div className="cp-reveal sticker p-10 md:p-16 text-center flex flex-col items-center gap-6" data-tone="ink">
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-60 flex items-center gap-2">
              <span>✦</span><span>book a campaign</span><span>✦</span>
            </div>

            <h2 className="font-display italic text-[clamp(2.2rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em]">
              Work with {creator.shortName}
            </h2>

            <p className="font-script text-xl md:text-2xl opacity-70">
              — responds {creator.responseTime}. payments in 48h. zero agency.
            </p>

            <Link href={`/contact?creator=${creator.handle}`}
              className="btn-ghost mt-2"
              style={{ color: "var(--color-bg)", borderColor: "var(--color-bg)", boxShadow: "4px 4px 0 0 var(--color-accent)" }}>
              Send a brief
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <span className="font-mono text-[9px] uppercase tracking-widest"
              style={{ color: "color-mix(in srgb, var(--color-bg) 35%, transparent)" }}>
              Direct contact not shared · Platform-mediated only
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
