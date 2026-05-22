"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { SectionLabel } from "@/components/shared/PagePrimitives";
import { Sparkle } from "@/components/ui/Sparkle";
import { blogPosts } from "@/data/blog-posts";
import { ease } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ── Bespoke card star (kept for VISUALS configs) ────────────── */

function CardSparkle({ size = 20, color = "#F5C518", style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={style} aria-hidden>
      <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill={color} />
    </svg>
  );
}

function BigStar({ fill = "#F5C518", size = 110, style }: { fill?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} style={style} aria-hidden>
      <path
        d="M150 10 C150 10 170 120 260 150 C170 180 150 290 150 290 C150 290 130 180 40 150 C130 120 150 10 150 10Z"
        fill={fill} stroke="#000" strokeWidth="9" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Card visual configs ─────────────────────────────────────── */

type CardVisuals = {
  bg: string;
  dark?: boolean;
  dots?: boolean;
  accent: string;
  headline: ReactNode;
  sub?: string;
  deco?: ReactNode;
};

const VISUALS: Record<string, CardVisuals> = {
  "creator-commerce": {
    headline: <>the future of <span style={{ color: "#F5C518" }}>creator commerce</span> is here.</>,
    sub: "— and it's not what you expected",
    bg: "radial-gradient(ellipse at 50% 40%, #2a1a4a 0%, #0a0812 100%)",
    dark: true,
    accent: "#F5C518",
    deco: (
      <>
        <BigStar fill="#F5C518" size={120} style={{ position: "absolute", top: "50%", left: "55%", transform: "translate(-50%,-60%)", zIndex: 1, opacity: 0.85 }} />
        <CardSparkle size={18} color="#FF3EB5" style={{ position: "absolute", top: 28, left: 48, zIndex: 3 }} />
        <CardSparkle size={13} color="#3B9EFF" style={{ position: "absolute", top: 60, left: 220, zIndex: 3 }} />
      </>
    ),
  },
  "brand-brief": {
    headline: <>how to write a <span style={{ color: "#FF3EB5" }}>brand brief</span> that gets you booked.</>,
    bg: "#C8F135",
    dots: true,
    accent: "#FF3EB5",
    deco: <BigStar fill="#F5C518" size={95} style={{ position: "absolute", bottom: -16, right: -16, zIndex: 1 }} />,
  },
  "influencer-campaign": {
    headline: <>why your last <span style={{ color: "#FF3EB5" }}>influencer campaign</span> failed.</>,
    sub: "— and how to fix it",
    bg: "#F0EBE0",
    accent: "#C8F135",
    deco: (
      <>
        <CardSparkle size={20} color="#C8F135" style={{ position: "absolute", top: 14, right: 18, zIndex: 3 }} />
        <CardSparkle size={13} color="#FF3EB5" style={{ position: "absolute", bottom: 18, right: 56, zIndex: 3 }} />
      </>
    ),
  },
  glowbeauty: {
    headline: <>glowbeauty&apos;s <span style={{ color: "#FF3EB5" }}>full story.</span></>,
    sub: "3M impressions → real revenue.",
    bg: "linear-gradient(110deg, #FF3EB5 0%, #FF3EB5 46%, #F0EBE0 46%, #F0EBE0 100%)",
    accent: "#C8F135",
    deco: (
      <>
        <CardSparkle size={16} color="#C8F135" style={{ position: "absolute", top: 14, right: 90, zIndex: 3 }} />
        <div aria-hidden className="font-display absolute right-5 top-1/2 -translate-y-1/2" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontStyle: "italic", color: "#0d0d0d", opacity: 0.1, zIndex: 1 }}>3M</div>
      </>
    ),
  },
  negotiate: {
    headline: <>negotiate like a <span style={{ color: "#C8F135" }}>pro.</span></>,
    sub: "getting paid exactly what you're worth.",
    bg: "#0d0d0d",
    dark: true,
    accent: "#C8F135",
    deco: (
      <div aria-hidden className="absolute right-5 top-1/2 -translate-y-1/2 text-right" style={{ zIndex: 2 }}>
        <div className="font-mono" style={{ fontSize: 7, color: "rgba(255,255,255,0.28)", marginBottom: 2 }}>YOUR RATE</div>
        <div className="font-display" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontStyle: "italic", color: "#C8F135", lineHeight: 1 }}>$∞</div>
      </div>
    ),
  },
  algorithm: {
    headline: <>algo<span style={{ color: "#C8F135" }}>rithm</span> changes: what creators need to know now.</>,
    sub: "// v4.7.2 → v5.0.0 detected",
    bg: "#0d0d0d",
    dark: true,
    accent: "#C8F135",
    deco: (
      <div aria-hidden className="absolute right-0 top-0 bottom-0 overflow-hidden flex flex-col justify-center p-3" style={{ width: "52%", zIndex: 2, opacity: 0.5 }}>
        {["const engagement = posts", "  .filter(p => p.format", "   === 'video').reduce(sum);", "platform.feed.weights = {", "  video: 0.72, carousel: 0.18", "};"].map((line, i) => (
          <div key={i} className="font-mono whitespace-nowrap" style={{ fontSize: 7.5, color: "#C8F135", lineHeight: 1.95 }}>{line}</div>
        ))}
      </div>
    ),
  },
  roster: {
    headline: <>build your <span style={{ color: "#FF3EB5" }}>roster.</span></>,
    sub: "a full year of creators — planned & paid.",
    bg: "#C8F135",
    dots: true,
    accent: "#FF3EB5",
    deco: (
      <div aria-hidden className="absolute right-3 bottom-3 grid grid-cols-4 gap-0.5" style={{ zIndex: 2, opacity: 0.55 }}>
        {["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG"].map((m) => (
          <div key={m} className="font-mono text-center px-0.5 py-0.5 rounded-sm" style={{ fontSize: 5.5, background: "rgba(0,0,0,0.18)" }}>{m}</div>
        ))}
      </div>
    ),
  },
};

/* ── CardVisual — visual only, no link ───────────────────────── */

function CardVisual({ slug, category, readTime, height = 200 }: { slug: string; category: string; readTime: string; height?: number }) {
  const v = VISUALS[slug];
  if (!v) return null;
  const bdr = v.dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.3)";
  const fg  = v.dark ? "#fff" : "#000";
  const dim = v.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.38)";
  return (
    <div className="relative overflow-hidden w-full" style={{ height: height ?? "100%", minHeight: height ? undefined : 280, background: v.bg }}>
      {v.dots && (
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.13) 1.5px, transparent 1.5px)", backgroundSize: "15px 15px" }} />
      )}
      <div aria-hidden className="absolute top-2 left-2 w-3 h-3" style={{ borderTop: `1px solid ${bdr}`, borderLeft: `1px solid ${bdr}` }} />
      <div aria-hidden className="absolute top-2 right-2 w-3 h-3" style={{ borderTop: `1px solid ${bdr}`, borderRight: `1px solid ${bdr}` }} />
      <div aria-hidden className="absolute bottom-2 left-2 w-3 h-3" style={{ borderBottom: `1px solid ${bdr}`, borderLeft: `1px solid ${bdr}` }} />
      <div aria-hidden className="absolute bottom-2 right-2 w-3 h-3" style={{ borderBottom: `1px solid ${bdr}`, borderRight: `1px solid ${bdr}` }} />
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center" style={{ zIndex: 5 }}>
        <span className="font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color: dim }}>{category}</span>
        <span className="font-mono text-[8px]" style={{ color: dim }}>{readTime}</span>
      </div>
      <div className="absolute inset-x-4 top-8 bottom-8 flex flex-col justify-center" style={{ zIndex: 4 }}>
        <div className="font-display leading-[0.88]" style={{ fontSize: "clamp(1rem,2vw,1.6rem)", color: fg, fontStyle: "italic", textTransform: "lowercase" }}>
          {v.headline}
        </div>
        {v.sub && <p className="font-mono mt-2" style={{ fontSize: 8, color: dim }}>{v.sub}</p>}
      </div>
      {v.deco}
    </div>
  );
}

/* ── BlogCard — CardVisual + link + hover cue ────────────────── */

function BlogCard({ slug, category, readTime }: { slug: string; category: string; readTime: string }) {
  const v = VISUALS[slug];
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="relative overflow-hidden">
        <CardVisual slug={slug} category={category} readTime={readTime} height={200} />
        <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ zIndex: 10 }}>
          <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: v?.accent ?? "#C8F135", color: "#000" }}>
            read →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Category filter ─────────────────────────────────────────── */

const CATEGORIES = ["All", "Creator Tips", "Brand Strategy", "Industry News", "Case Studies"];

/* ── Page ────────────────────────────────────────────────────── */

export const BlogPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);
  const filtered = activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(".hero-word",    { opacity: 0, y: 48, rotate: 2 }, { opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: "power4.out", stagger: 0.07, overwrite: "auto", clearProps: "transform,opacity" });
      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: ease.out, overwrite: "auto" }, "-=0.55");
      tl.fromTo(".hero-meta",    { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: ease.out, overwrite: "auto" }, "-=0.5");
      tl.fromTo(".hero-lede",    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6,  ease: ease.out, overwrite: "auto" }, "-=0.45");
      tl.fromTo(".hero-stat",    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, ease: ease.out, stagger: 0.09, overwrite: "auto" }, "-=0.4");
      tl.fromTo(".hero-ticker",  { opacity: 0 },        { opacity: 1, duration: 0.5, ease: ease.out, overwrite: "auto" }, "-=0.4");

      gsap.utils.toArray<Element>(".bl-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: ease.out, overwrite: "auto",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } },
        );
      });
    },
    { scope: ref },
  );

  const featuredInitials = featured.author.split(" ").map((w) => w[0]).join("");

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg)">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative pt-32 overflow-hidden bracket-frame dot-grid" style={{ background: "var(--color-bg)" }}>
        <style>{`
          @keyframes hero-ticker  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        `}</style>

        <Sparkle size={52} fill="var(--accent2)" className="absolute top-24 right-[8%] rotate-12 opacity-55 pointer-events-none" />
        <Sparkle size={36} fill="var(--accent4)" className="absolute top-1/3 left-[5%] -rotate-6 opacity-45 pointer-events-none" />

        <div className="px-6 md:px-10 flex items-center justify-between pb-10 border-b border-(--color-border)">
          <span className="hero-eyebrow"><SectionLabel>Journal</SectionLabel></span>
          <div className="hero-meta hidden md:flex items-center gap-5 text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)">
            <span>Vol. I</span>
            <span className="w-1 h-1 rounded-full bg-(--color-border)" />
            <span>MMXXVI</span>
            <span className="w-1 h-1 rounded-full bg-(--color-border)" />
            <span>Published Weekly</span>
          </div>
        </div>

        <div className="relative px-6 md:px-10 pt-12 pb-12">
          <span aria-hidden className="absolute bottom-0 right-4 md:right-8 font-display leading-none select-none pointer-events-none" style={{ fontSize: "clamp(8rem, 24vw, 28rem)", color: "transparent", WebkitTextStroke: "1px color-mix(in srgb, var(--color-fg) 6%, transparent)", letterSpacing: "-0.04em" }}>048</span>
          <h1 className="relative z-10 font-display italic leading-[0.88] tracking-tight" aria-label="Stories & Insights." style={{ fontSize: "clamp(3.5rem, 10.5vw, 12rem)" }}>
            <span className="hero-word inline-block align-bottom mr-[0.14em]">Stories</span>
            <span className="hero-word inline-block align-bottom mr-[0.14em] text-(--color-accent)">&amp;</span>
            <span className="hero-word inline-block align-bottom">Insights.</span>
          </h1>
        </div>

        <div className="hero-ticker overflow-hidden border-t border-(--color-border) py-3">
          <div className="flex" style={{ animation: "hero-ticker 22s linear infinite", width: "max-content" }}>
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-6 pr-6">
                {([ ["Creator Tips","accent"], ["Brand Strategy","pink"], ["Industry News","blue"], ["Case Studies","yellow"], ["Creator Tips","accent"], ["Brand Strategy","pink"], ["Industry News","blue"], ["Case Studies","yellow"] ] as [string,string][]).map(([label, tone], j) => (
                  <span key={j} className="flex items-center gap-6">
                    <span className="chip !text-[10px] !px-3 !py-1" data-tone={tone}>{label}</span>
                    <span className="text-(--color-border) text-sm select-none">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-(--color-border) px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <p className="hero-lede lg:col-span-7 font-script text-2xl md:text-3xl opacity-65">
            — field notes from the creator economy. what's working, what's not, and what's next.
          </p>
          <div className="lg:col-span-5 flex items-center gap-8 lg:justify-end">
            {([ ["14.2K","Readers","text-(--color-accent)"], ["48","Issues","text-(--color-accent-2)"], ["4 min","Avg. Read","text-(--color-accent-3)"] ] as [string,string,string][]).map(([val, label, color]) => (
              <div key={label} className="hero-stat flex flex-col items-center text-center">
                <span className={`font-display italic text-2xl md:text-4xl leading-none tabular-nums ${color}`}>{val}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] mt-1.5 opacity-50">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured post ─────────────────────────────────────── */}
      <section className="border-t border-(--color-border) px-6 md:px-10 py-14 md:py-20">
        <style>{`
          /* Pre-hide scroll-animated elements to prevent FOUC */
          .bl-reveal { opacity: 0; }
          .blog-featured-grid { display: grid; grid-template-columns: 1fr; }
          @media (min-width: 768px) { .blog-featured-grid { grid-template-columns: 1fr 1fr; } }
          .blog-articles-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
          @media (min-width: 640px)  { .blog-articles-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (min-width: 1024px) { .blog-articles-grid { grid-template-columns: repeat(3, 1fr); } }
        `}</style>
        <div className="max-w-7xl mx-auto">
          <div className="bl-reveal flex items-end justify-between mb-8">
            <SectionLabel>Featured</SectionLabel>
            <span className="font-mono text-[10px] uppercase tracking-widest text-(--color-muted-fg)">Latest issue</span>
          </div>

          <Link href={`/blog/${featured.slug}`} className="bl-reveal group block">
            <div className="blog-featured-grid border-2 border-(--color-border) rounded-2xl overflow-hidden hover:border-(--color-fg) transition-colors duration-300" style={{ boxShadow: "4px 4px 0 0 var(--color-border)" }}>
              {/* Visual */}
              <div className="overflow-hidden" style={{ minHeight: 280 }}>
                <div className="h-full transition-transform duration-500 group-hover:scale-[1.02]">
                  <CardVisual slug={featured.slug} category={featured.category} readTime={featured.readTime} height={undefined} />
                </div>
              </div>
              {/* Metadata */}
              <div className="flex flex-col justify-between p-8 md:p-10 bg-(--color-panel)">
                <div className="flex flex-col gap-4">
                  <span className="chip !text-[9px] !px-3 !py-1 self-start">{featured.category}</span>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-[2.2rem] leading-[1.05] group-hover:text-(--color-accent) transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-(--color-muted-fg) leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-(--color-border)">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full gradient-warm flex items-center justify-center font-display text-xs text-(--color-fg)/60 shrink-0 border border-(--color-border)">
                      {featuredInitials}
                    </div>
                    <div>
                      <div className="text-sm font-medium leading-tight">{featured.author}</div>
                      <div className="text-[9px] uppercase tracking-widest text-(--color-muted-fg)">{featured.readTime} · {featured.date}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-(--color-accent) group-hover:gap-3 transition-all duration-300">
                    Read
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── All articles ──────────────────────────────────────── */}
      <section className="border-t border-(--color-border) px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-7xl mx-auto">

          {/* Header + filter */}
          <div className="bl-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <SectionLabel>All Articles</SectionLabel>
              <p className="text-sm text-(--color-muted-fg) mt-1.5">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" ? ` in ${activeCategory}` : " published"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer"
                  style={{
                    background: activeCategory === cat ? "var(--color-fg)" : "transparent",
                    color: activeCategory === cat ? "var(--color-bg)" : "var(--color-muted-fg)",
                    borderColor: activeCategory === cat ? "var(--color-fg)" : "var(--color-border)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="blog-articles-grid">
              {filtered.map((post) => {
                const initials = post.author.split(" ").map((w) => w[0]).join("");
                return (
                  <article key={post.slug} className="bl-reveal flex flex-col group">
                    {/* Card art */}
                    <div className="overflow-hidden rounded-xl border border-(--color-border) mb-4">
                      <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                        <BlogCard slug={post.slug} category={post.category} readTime={post.readTime} />
                      </div>
                    </div>
                    {/* Meta */}
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="chip !text-[8px] !px-2.5 !py-0.5 self-start">{post.category}</span>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="font-display text-lg leading-snug group-hover:text-(--color-accent) transition-colors duration-200 cursor-pointer">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-(--color-muted-fg) leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 mt-auto border-t border-(--color-border)">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full gradient-cool flex items-center justify-center font-display text-[9px] text-(--color-fg)/60 border border-(--color-border) shrink-0">
                            {initials}
                          </div>
                          <span className="text-[10px] text-(--color-muted-fg)">{post.author.split(" ")[0]}</span>
                        </div>
                        <span className="text-[10px] text-(--color-muted-fg)">{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 border border-(--color-border) rounded-2xl">
              <p className="font-display text-2xl mb-2">Nothing here yet.</p>
              <p className="text-sm text-(--color-muted-fg) mb-6">Try a different category.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-all duration-200 cursor-pointer"
              >
                Show all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter + CTA ──────────────────────────────────── */}
      <section className="relative py-24 px-6 md:px-12 dot-grid bracket-frame border-t border-(--color-border)"
        style={{ background: "var(--color-bg)" }}>
        <div className="max-w-4xl mx-auto relative">
          <Sparkle size={56} fill="var(--accent2)" className="absolute -top-4 -left-4 md:-left-10 -rotate-12 pointer-events-none" />
          <Sparkle size={44} fill="var(--accent4)" className="absolute -bottom-4 -right-4 md:-right-10 rotate-12 pointer-events-none" />

          <div className="bl-reveal sticker p-10 md:p-16 flex flex-col gap-8" data-tone="ink">
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-60 flex items-center gap-2">
              <span>✦</span><span>weekly dispatch</span><span>✦</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="font-display italic text-[clamp(2rem,5vw,4rem)] leading-[0.92] tracking-[-0.03em]">
                  Read what the industry won&apos;t tell you.
                </h2>
                <p className="font-script text-xl md:text-2xl opacity-70">
                  — free. no spam. unsubscribe in one click.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {([ ["Free forever","accent"], ["No spam","blue"], ["Unsubscribe anytime","pink"] ] as [string,string][]).map(([label, tone]) => (
                    <span key={label} className="chip !text-[10px] !px-3 !py-1" data-tone={tone}>{label}</span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-80 shrink-0">
                {subscribed ? (
                  <div className="sticker p-8 flex flex-col items-center text-center gap-4" data-tone="accent">
                    <span className="font-display italic text-5xl leading-none" style={{ color: "var(--color-fg)" }}>✓</span>
                    <div>
                      <p className="font-display italic text-2xl mb-1">You&apos;re on the list.</p>
                      <p className="font-script text-lg opacity-65">— watch your inbox every week.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex flex-col gap-3">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "color-mix(in srgb, var(--color-bg) 50%, transparent)" }} />
                      <input
                        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@studio.com"
                        className="w-full pl-11 pr-4 py-4 rounded-xl text-sm focus:outline-none transition-all duration-300"
                        style={{
                          background: "color-mix(in srgb, var(--color-bg) 15%, transparent)",
                          border: "1.5px solid color-mix(in srgb, var(--color-bg) 30%, transparent)",
                          color: "var(--color-bg)",
                        }}
                      />
                    </div>
                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-200 cursor-pointer group"
                      style={{ background: "var(--color-accent)", color: "var(--color-fg)", border: "1.5px solid var(--color-accent)" }}>
                      Subscribe — it&apos;s free
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-center"
                      style={{ color: "color-mix(in srgb, var(--color-bg) 40%, transparent)" }}>
                      joined by 14,200 creators &amp; operators
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
