import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { stat: "4.5×", label: "Higher engagement", sub: "vs brand-produced creative on TikTok & Reels", tone: "accent" },
  { stat: "50%", label: "Lower CPM", sub: "vs studio-produced ad spend", tone: "pink" },
  { stat: "92%", label: "Trust peer content", sub: "over traditional brand advertising", tone: "blue" },
  { stat: "48h", label: "Brief to live", sub: "no set, no crew, no revision spiral", tone: "yellow" },
];

const VS = [
  { label: "Production cost",      ugc: "$300–$1.5K",  trad: "$15K–80K" },
  { label: "Time to publish",      ugc: "48 hours",    trad: "4–8 weeks" },
  { label: "Engagement rate",      ugc: "6–9%",        trad: "1–2%" },
  { label: "Creative variations",  ugc: "Unlimited",   trad: "1–3 per shoot" },
  { label: "Audience trust",       ugc: "High",        trad: "Low" },
];

export const BrandsValueSection = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".bvs-eyebrow",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } },
      );

      gsap.fromTo(".bvs-word > span",
        { opacity: 0, y: 52, rotate: 4 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.85, ease: "power3.out", stagger: 0.06, overwrite: "auto", clearProps: "transform,opacity",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } },
      );

      gsap.fromTo(".bvs-stat",
        { opacity: 0, y: 50, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "back.out(1.7)", stagger: 0.1,
          scrollTrigger: { trigger: ".bvs-stats", start: "top 90%", once: true } },
      );

      gsap.to(".bvs-stat", {
        y: "+=10", rotate: "+=3", duration: 2.8, ease: "sine.inOut",
        repeat: -1, yoyo: true,
        stagger: { each: 0.4, from: "random" },
      });

      gsap.fromTo(".bvs-sparkle",
        { opacity: 0, scale: 0, rotate: -120 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.15,
          scrollTrigger: { trigger: ".bvs-stats", start: "top 85%", once: true } },
      );

      gsap.to(".bvs-sparkle", {
        rotate: "+=12", y: "+=8", duration: 3.2, ease: "sine.inOut",
        repeat: -1, yoyo: true, stagger: 0.3,
      });

      gsap.fromTo(".bvs-row",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.08,
          scrollTrigger: { trigger: ".bvs-vs", start: "top 90%", once: true } },
      );

      gsap.fromTo(".bvs-script",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: ".bvs-script", start: "top 95%", once: true } },
      );

      gsap.fromTo(".bvs-cta-block",
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".bvs-cta-block", start: "top 95%", once: true } },
      );
    },
    { scope: ref },
  );

  const headline = ["UGC", "outperforms.", "Every.", "Time."];

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-12 overflow-hidden bracket-frame"
      style={{ background: "var(--panel-2)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <div className="bvs-eyebrow font-mono text-[12px] tracking-[0.32em] uppercase mb-10 opacity-60">
          04 · for brands
        </div>

        {/* Headline */}
        <h2 className="font-display italic text-[clamp(3rem,8vw,8rem)] leading-[0.88] tracking-[-0.03em] mb-6">
          {headline.map((word, i) => (
            <span key={i} className="bvs-word inline-block align-bottom mr-[0.2em] last:mr-0">
              <span
                className="inline-block"
                style={i === 1 || i === 3 ? { color: "var(--accent2)" } : undefined}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Script sub */}
        <p className="bvs-script font-script text-2xl md:text-3xl mb-24 opacity-70">
          — the numbers don't lie, bestie
        </p>

        {/* Stat sticker cards */}
        <div className="bvs-stats relative grid grid-cols-2 lg:grid-cols-4 gap-5 mb-28">
          {/* Decorative sparkles */}
          <Sparkle size={52} fill="var(--accent4)" className="bvs-sparkle absolute -top-8 left-1/2 hidden md:block pointer-events-none" />
          <Sparkle size={40} fill="var(--accent2)" className="bvs-sparkle absolute -bottom-8 right-8 hidden md:block pointer-events-none rotate-12" />

          {STATS.map((s) => (
            <div
              key={s.stat}
              className="bvs-stat sticker p-6 md:p-8 flex flex-col gap-3"
              data-tone={s.tone}
            >
              <div className="font-display italic leading-none tracking-tight" style={{ fontSize: "clamp(3rem,5vw,5rem)" }}>
                {s.stat}
              </div>
              <div className="font-mono text-[11px] tracking-[0.26em] uppercase font-semibold">
                {s.label}
              </div>
              <p className="font-sans text-sm leading-snug opacity-70 mt-auto">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Source attribution */}
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase -mt-20 mb-28 opacity-40">
          Sources: Nielsen 2024 · Sprout Social Q1 2024 · Edelman Trust Barometer
        </p>

        {/* UGC vs Traditional */}
        <div className="bvs-vs mb-28">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] tracking-[0.28em] uppercase opacity-60">
              UGC vs traditional
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--fg)", opacity: 0.15 }} />
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 mb-2 px-6">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#888" }}>Metric</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "var(--accent2)" }}>Icons UGC</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#888" }}>Traditional</span>
          </div>

          <div style={{ border: "2px solid #0a0a0a", borderRadius: "16px", overflow: "hidden", boxShadow: "6px 6px 0 0 #0a0a0a", background: "#ffffff" }}>
            {VS.map((row, i) => (
              <div
                key={row.label}
                className="bvs-row grid grid-cols-[2fr_1fr_1fr] gap-4 items-center"
                style={{
                  padding: "18px 24px",
                  borderTop: i > 0 ? "1px solid #e5e5e5" : undefined,
                  background: i % 2 === 0 ? "#ffffff" : "#f7f7f7",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#111111", fontWeight: 600 }}>
                  {row.label}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "22px", lineHeight: 1, fontWeight: 700, color: "#0a0a0a" }}>
                  {row.ugc}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "#888888", textDecoration: "line-through", textDecorationThickness: "2px" }}>
                  {row.trad}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA sticker block */}
        <div className="bvs-cta-block sticker p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8" data-tone="ink">
          <div>
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4 opacity-60 flex items-center gap-2">
              <span>✦</span>
              <span>ready to brief</span>
            </div>
            <h3 className="font-display italic text-[clamp(1.8rem,4vw,3.5rem)] leading-[0.92] tracking-tight">
              Request your first <br className="hidden md:block" />
              UGC video today.
            </h3>
            <p className="font-script text-xl md:text-2xl mt-3 opacity-70">
              — no agency, no markup, just content that converts
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <Link href="/brands" className="btn-primary whitespace-nowrap">
              Request content
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/creators"
              className="btn-ghost whitespace-nowrap"
              style={{ background: "transparent", borderColor: "var(--bg)", color: "var(--bg)" }}
            >
              Browse creators
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
