"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  PageHero,
  SectionShell,
  SectionLabel,
} from "@/components/shared/PagePrimitives";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

const categories = ["All", "Creator Tips", "Brand Strategy", "Industry News", "Case Studies"];

const categoryTone: Record<string, string> = {
  "Creator Tips":  "gradient-accent",
  "Brand Strategy": "gradient-cool",
  "Industry News":  "gradient-warm",
  "Case Studies":   "gradient-mono",
};

const featured = {
  category: "Industry News",
  title: "The Future of Creator Commerce is Here — and It's Not What You Expected",
  excerpt:
    "As brand budgets shift from traditional ads to creator-first strategies, the platforms that survive will be the ones that put authenticity over algorithms.",
  date: "Apr 28, 2026",
  readTime: "6 min read",
  author: "Sara Malik",
  authorRole: "Co-Founder & CEO",
};

const posts = [
  { category: "Creator Tips",   title: "How to Write a Brand Brief That Actually Gets You Booked",      excerpt: "Most creators pitch wrong. Here's the one-page framework that gets responses.",       date: "Apr 22, 2026", readTime: "4 min", author: "Lena Vogel" },
  { category: "Brand Strategy", title: "Why Your Last Influencer Campaign Failed (and How to Fix It)", excerpt: "Vanity metrics don't drive sales. We break down the numbers that actually matter.",    date: "Apr 18, 2026", readTime: "5 min", author: "Tomás Rivera" },
  { category: "Case Studies",   title: "GlowBeauty's 3M-Impression Campaign: A Full Breakdown",         excerpt: "We go inside the strategy, creator selection, and creative brief that drove results.", date: "Apr 14, 2026", readTime: "7 min", author: "Sara Malik" },
  { category: "Creator Tips",   title: "Negotiate Like a Pro: Getting Paid What You're Worth",          excerpt: "A former brand manager reveals exactly how much creators should be charging.",         date: "Apr 10, 2026", readTime: "5 min", author: "Lena Vogel" },
  { category: "Industry News",  title: "Platform Algorithm Changes: What Creators Need to Know Now",    excerpt: "The latest shifts across TikTok, Instagram, and YouTube — and how to adapt fast.",     date: "Apr 05, 2026", readTime: "4 min", author: "James Okafor" },
  { category: "Brand Strategy", title: "Building a Year-Long Creator Roster (Without a Big Budget)",    excerpt: "Micro-creators consistently outperform mega-influencers in conversion. Here's why.",  date: "Apr 01, 2026", readTime: "6 min", author: "Tomás Rivera" },
];

const BLOGPIC_TITLE  = "How to Write a Brand Brief That Actually Gets You Booked";
const BLOGPIC2_TITLE = "Why Your Last Influencer Campaign Failed (and How to Fix It)";
const BLOGPIC3_TITLE = "GlowBeauty's 3M-Impression Campaign: A Full Breakdown";
const BLOGPIC4_TITLE = "Negotiate Like a Pro: Getting Paid What You're Worth";
const BLOGPIC5_TITLE = "Platform Algorithm Changes: What Creators Need to Know Now";
const BLOGPIC6_TITLE = "Building a Year-Long Creator Roster (Without a Big Budget)";

export const BlogPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [blogpicScale, setBlogpicScale] = useState(0.32);
  const roRef = useRef<ResizeObserver | null>(null);

  const [featuredScale, setFeaturedScale] = useState(0.56);
  const featuredRoRef = useRef<ResizeObserver | null>(null);
  const featuredImgRef = useCallback((node: HTMLDivElement | null) => {
    if (featuredRoRef.current) { featuredRoRef.current.disconnect(); featuredRoRef.current = null; }
    if (!node) return;
    const ro = new ResizeObserver(() => setFeaturedScale(node.offsetWidth / 1280));
    ro.observe(node);
    featuredRoRef.current = ro;
  }, []);

  const blogpicRef = useCallback((node: HTMLDivElement | null) => {
    if (roRef.current) { roRef.current.disconnect(); roRef.current = null; }
    if (!node) return;
    const ro = new ResizeObserver(() => setBlogpicScale(node.offsetWidth / 1280));
    ro.observe(node);
    roRef.current = ro;
  }, []);

  useGSAP(
    () => {
      // Hero entrance — plays immediately on load
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".hero-word", {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.07,
      });
      tl.from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.55, ease: ease.out }, "-=0.55");
      tl.from(".hero-meta",    { y: 14, opacity: 0, duration: 0.55, ease: ease.out }, "-=0.5");
      tl.from(".hero-lede",   { y: 20, opacity: 0, duration: 0.6,  ease: ease.out }, "-=0.45");
      tl.from(".hero-stat",   { y: 20, opacity: 0, duration: 0.55, ease: ease.out, stagger: 0.09 }, "-=0.4");
      tl.from(".hero-ticker", { opacity: 0, duration: 0.5, ease: ease.out }, "-=0.4");

      // Scroll reveals for sections below
      gsap.utils.toArray<Element>(".bl-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
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

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 overflow-hidden">
        <style>{`
          @keyframes hero-float-a { 0%,100%{transform:translateY(0px) rotate(-5deg)} 50%{transform:translateY(-16px) rotate(-2deg)} }
          @keyframes hero-float-b { 0%,100%{transform:translateY(0px) rotate(6deg)} 50%{transform:translateY(-20px) rotate(3deg)} }
          @keyframes hero-float-c { 0%,100%{transform:translateY(0px) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
          @keyframes hero-float-d { 0%,100%{transform:translateY(0px) rotate(4deg)} 50%{transform:translateY(-18px) rotate(6deg)} }
          @keyframes hero-ticker  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          @keyframes hero-pulse-a { 0%,100%{opacity:0.13} 50%{opacity:0.24} }
          @keyframes hero-pulse-b { 0%,100%{opacity:0.10} 50%{opacity:0.20} }
          @keyframes hero-pulse-c { 0%,100%{opacity:0.08} 50%{opacity:0.17} }
        `}</style>

        {/* Dot grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, color-mix(in srgb, var(--color-fg) 6%, transparent) 1.5px, transparent 1.5px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Multi-colour glows */}
        <div aria-hidden className="absolute pointer-events-none" style={{ top: "-25%", right: "3%",  width: "550px", height: "550px", background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent)   22%, transparent), transparent 70%)", filter: "blur(80px)", animation: "hero-pulse-a 5s ease-in-out infinite" }} />
        <div aria-hidden className="absolute pointer-events-none" style={{ top: "-10%", left: "-6%",  width: "420px", height: "420px", background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent-2) 18%, transparent), transparent 70%)", filter: "blur(70px)", animation: "hero-pulse-b 6s ease-in-out infinite 1.2s" }} />
        <div aria-hidden className="absolute pointer-events-none" style={{ bottom: "-30%", left: "38%", width: "380px", height: "380px", background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent-3) 16%, transparent), transparent 70%)", filter: "blur(70px)", animation: "hero-pulse-c 7s ease-in-out infinite 2.5s" }} />

        {/* Top metadata bar */}
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

        {/* Headline block */}
        <div className="relative px-6 md:px-10 pt-12 pb-12">
          {/* Ghost issue number */}
          <span
            aria-hidden
            className="absolute bottom-0 right-4 md:right-8 font-display leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(8rem, 24vw, 28rem)",
              color: "transparent",
              WebkitTextStroke: "1px color-mix(in srgb, var(--color-fg) 6%, transparent)",
              letterSpacing: "-0.04em",
            }}
          >
            048
          </span>

          {/* Floating category chips */}
          <span aria-hidden className="chip absolute right-[22%] top-6 pointer-events-none z-20 !text-[11px]" data-tone="accent" style={{ animation: "hero-float-a 6s ease-in-out infinite" }}>Creator Tips</span>
          <span aria-hidden className="chip absolute right-[7%]  top-14 pointer-events-none z-20 !text-[11px]" data-tone="pink"   style={{ animation: "hero-float-b 7.5s ease-in-out infinite 0.6s" }}>Brand Strategy</span>
          <span aria-hidden className="chip absolute right-[26%] bottom-10 pointer-events-none z-20 !text-[11px]" data-tone="blue"   style={{ animation: "hero-float-c 8s ease-in-out infinite 1.2s" }}>Industry News</span>
          <span aria-hidden className="chip absolute right-[11%] bottom-4  pointer-events-none z-20 !text-[11px]" data-tone="yellow" style={{ animation: "hero-float-d 5.5s ease-in-out infinite 1.8s" }}>Case Studies</span>

          <h1
            className="relative z-10 font-display leading-[0.88] tracking-tight"
            aria-label="Stories & Insights."
            style={{ fontSize: "clamp(3.5rem, 10.5vw, 12rem)" }}
          >
            <span className="inline-block overflow-hidden align-bottom mr-[0.14em]">
              <span className="hero-word inline-block">Stories</span>
            </span>
            <span className="inline-block overflow-hidden align-bottom mr-[0.14em]">
              <span className="hero-word inline-block text-(--color-accent)">&amp;</span>
            </span>
            <span className="inline-block overflow-hidden align-bottom">
              <span className="hero-word inline-block">Insights.</span>
            </span>
          </h1>
        </div>

        {/* Scrolling ticker */}
        <div className="hero-ticker overflow-hidden border-t border-(--color-border) py-3">
          <div className="flex" style={{ animation: "hero-ticker 22s linear infinite", width: "max-content" }}>
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-6 pr-6">
                {(
                  [
                    ["Creator Tips",   "accent"],
                    ["Brand Strategy", "pink"],
                    ["Industry News",  "blue"],
                    ["Case Studies",   "yellow"],
                    ["Creator Tips",   "accent"],
                    ["Brand Strategy", "pink"],
                    ["Industry News",  "blue"],
                    ["Case Studies",   "yellow"],
                  ] as [string, string][]
                ).map(([label, tone], j) => (
                  <span key={j} className="flex items-center gap-6">
                    <span className="chip !text-[10px] !px-3 !py-1" data-tone={tone}>{label}</span>
                    <span className="text-(--color-border) text-sm select-none">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip — lede + stats */}
        <div className="border-t border-(--color-border) px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <p className="hero-lede lg:col-span-7 text-base md:text-lg text-(--color-fg)/70 leading-relaxed">
            Field notes from the creator economy — what's working, what's not, and what's coming next. Written by the team building Icons.
          </p>
          <div className="lg:col-span-5 flex items-center gap-8 lg:justify-end">
            {(
              [
                ["14.2K", "Readers",   "text-(--color-accent)"],
                ["48",    "Issues",    "text-(--color-accent-2)"],
                ["4 min", "Avg. Read", "text-(--color-accent-3)"],
              ] as [string, string, string][]
            ).map(([val, label, color]) => (
              <div key={label} className="hero-stat flex flex-col items-center text-center">
                <span className={`font-display text-2xl md:text-4xl leading-none tabular-nums ${color}`}>{val}</span>
                <span className="eyebrow !text-[9px] mt-1.5 text-(--color-muted-fg)">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-16 border-t border-(--color-border)">
        <div className="max-w-7xl mx-auto pt-16">
          <div className="bl-reveal mb-6">
            <SectionLabel>Featured</SectionLabel>
          </div>
          <article className="bl-reveal grid grid-cols-1 lg:grid-cols-12 gap-px grid-divider rounded-sm overflow-hidden border border-(--color-border)">
            <div
              ref={featuredImgRef}
              className="lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[320px] relative overflow-hidden"
            >
              <iframe
                src="/blogpic0.html"
                scrolling="no"
                title="Featured blog cover"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 1280,
                  height: 720,
                  border: "none",
                  transformOrigin: "top left",
                  transform: `scale(${featuredScale})`,
                  pointerEvents: "none",
                }}
              />
              <div className="absolute top-6 left-6 chip z-10" data-tone="accent">
                {featured.category}
              </div>
              <div className="absolute bottom-6 right-6 chip z-10">
                {featured.readTime}
              </div>
            </div>
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between gap-8">
              <div>
                <p className="eyebrow !text-[10px] text-(--color-accent) mb-5">
                  Editor's pick
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5">
                  {featured.title}
                </h2>
                <p className="text-sm md:text-base text-(--color-muted-fg) leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>
              <footer className="flex items-center justify-between gap-3 pt-6 border-t border-(--color-border)">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-warm flex items-center justify-center font-display text-sm text-(--color-fg)/50">
                    {featured.author
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-medium">{featured.author}</div>
                    <div className="text-[10px] text-(--color-muted-fg) uppercase tracking-widest">
                      {featured.date}
                    </div>
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-sm font-medium text-(--color-accent) group cursor-pointer">
                  Read article
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </footer>
            </div>
          </article>
        </div>
      </section>

      {/* ── Category Filter ──────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-10 border-t border-(--color-border)">
        <div className="max-w-7xl mx-auto pt-8 flex flex-wrap gap-2 items-center">
          <span className="eyebrow mr-3">Filter</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium rounded-full border transition-all duration-200 cursor-pointer",
                activeCategory === cat
                  ? "bg-(--color-fg) text-(--color-bg) border-(--color-fg)"
                  : "text-(--color-muted-fg) border-(--color-border) hover:border-(--color-border-strong) hover:text-(--color-fg)",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Posts grid ───────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-7xl mx-auto grid-divider grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {filtered.map((p) => (
            <article
              key={p.title}
              className="bl-reveal card-hover group cursor-pointer flex flex-col p-6"
            >
              <div
                ref={p.title === BLOGPIC_TITLE ? blogpicRef : undefined}
                className={cn(
                  p.title !== BLOGPIC_TITLE && p.title !== BLOGPIC2_TITLE && p.title !== BLOGPIC3_TITLE && p.title !== BLOGPIC4_TITLE && p.title !== BLOGPIC5_TITLE && p.title !== BLOGPIC6_TITLE && categoryTone[p.category],
                  "aspect-[5/3] mb-6 relative rounded-sm overflow-hidden"
                )}
              >
                {(p.title === BLOGPIC_TITLE || p.title === BLOGPIC2_TITLE || p.title === BLOGPIC3_TITLE || p.title === BLOGPIC4_TITLE || p.title === BLOGPIC5_TITLE || p.title === BLOGPIC6_TITLE) ? (
                  <iframe
                    src={
                      p.title === BLOGPIC_TITLE ? "/blogpic.html" :
                      p.title === BLOGPIC2_TITLE ? "/blogpic2.html" :
                      p.title === BLOGPIC3_TITLE ? "/blogpic3.html" :
                      p.title === BLOGPIC4_TITLE ? "/blogpic4.html" :
                      p.title === BLOGPIC5_TITLE ? "/blogpic5.html" :
                      "/blogpic6.html"
                    }
                    scrolling="no"
                    title="Blog cover"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 1280,
                      height: 720,
                      border: "none",
                      transformOrigin: "top left",
                      transform: `scale(${blogpicScale})`,
                      pointerEvents: "none",
                    }}
                  />
                ) : null}
                <span className="absolute top-3 left-3 chip !text-[9px] !px-2 !py-1 bg-(--color-bg)/70 z-10">
                  {p.category}
                </span>
                <span className="absolute bottom-3 right-3 chip !text-[9px] !px-2 !py-1 bg-(--color-bg)/70 z-10">
                  {p.readTime}
                </span>
              </div>
              <h3 className="font-display text-2xl leading-[1.15] mb-3 group-hover:text-(--color-accent) transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-(--color-muted-fg) leading-relaxed mb-6 flex-1">
                {p.excerpt}
              </p>
              <footer className="flex items-center justify-between pt-4 border-t border-(--color-border)">
                <div className="text-[10px] uppercase tracking-widest text-(--color-muted-fg)">
                  {p.author} · {p.date}
                </div>
                <ArrowUpRight className="w-4 h-4 text-(--color-muted-fg) opacity-0 group-hover:opacity-100 group-hover:text-(--color-accent) transition-all duration-300" />
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-(--color-border) px-6 md:px-10 py-24 md:py-36">
        <style>{`
          @keyframes nl-glow-a  { 0%,100%{opacity:0.12} 50%{opacity:0.26} }
          @keyframes nl-glow-b  { 0%,100%{opacity:0.08} 50%{opacity:0.20} }
          @keyframes nl-dot     { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.7);opacity:0.5} }
          @keyframes nl-scan    { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
          @keyframes nl-pop     { 0%{opacity:0;transform:scale(0.8) translateY(8px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
          @keyframes nl-success { 0%{opacity:0;transform:scale(0.9)} 100%{opacity:1;transform:scale(1)} }
          @keyframes nl-confetti-a { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(-60px) rotate(180deg);opacity:0} }
          @keyframes nl-confetti-b { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(-80px) rotate(-120deg);opacity:0} }
          @keyframes nl-shimmer { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
          @media (min-width: 1024px) {
            .nl-left  { flex: 7 7 0%; min-width: 0; }
            .nl-right { flex: 5 5 0%; min-width: 0; }
          }
        `}</style>

        {/* Multi-colour ambient glows */}
        <div aria-hidden className="absolute pointer-events-none" style={{ top: "-10%", left: "-5%",   width: "600px", height: "600px", background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent)   16%, transparent), transparent 70%)", filter: "blur(80px)", animation: "nl-glow-a 5s ease-in-out infinite" }} />
        <div aria-hidden className="absolute pointer-events-none" style={{ top: "20%",  right: "-8%",  width: "500px", height: "500px", background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent-2) 13%, transparent), transparent 70%)", filter: "blur(70px)", animation: "nl-glow-b 6s ease-in-out infinite 1.5s" }} />
        <div aria-hidden className="absolute pointer-events-none" style={{ bottom: "-20%", left: "40%", width: "400px", height: "400px", background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent-3) 11%, transparent), transparent 70%)", filter: "blur(70px)", animation: "nl-glow-a 7s ease-in-out infinite 3s" }} />

        {/* Scan line */}
        <div aria-hidden className="absolute left-0 right-0 pointer-events-none" style={{ height: "1px", background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 40%, transparent), transparent)", animation: "nl-scan 8s linear infinite", opacity: 0.6 }} />

        {/* Dot grid */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, color-mix(in srgb, var(--color-fg) 5%, transparent) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="bl-reveal relative mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-center" style={{ maxWidth: "80rem" }}>

          {/* Left — copy */}
          <div className="nl-left w-full flex flex-col gap-7">

            {/* Live badge */}
            <div className="inline-flex self-start items-center gap-3 px-4 py-2 rounded-full border border-(--color-border) bg-(--color-panel)/50 backdrop-blur-sm">
              <span
                className="w-2 h-2 rounded-full bg-(--color-accent) shrink-0"
                style={{ animation: "nl-dot 1.6s ease-in-out infinite" }}
              />
              <span className="text-[10px] uppercase tracking-[0.2em] text-(--color-muted-fg)">
                Live · <span className="text-(--color-accent)">3 joined</span> in the last hour
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.93]">
              A weekly read for{" "}
              <span className="text-(--color-accent)">people who build</span>{" "}
              with creators.
            </h2>

            <p className="text-base text-(--color-muted-fg) max-w-lg leading-relaxed">
              Field notes, case studies, and tools from inside the platform.
              Free. No spam. Unsubscribe in one click.
            </p>

            {/* Avatar stack */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {(
                  [
                    ["SM", "gradient-warm"],
                    ["TR", "gradient-cool"],
                    ["LV", "gradient-accent"],
                    ["JO", "gradient-mono"],
                    ["AK", "gradient-warm"],
                  ] as [string, string][]
                ).map(([initials, grad], i) => (
                  <div
                    key={initials}
                    className={`w-9 h-9 rounded-full ${grad} border-2 border-(--color-bg) flex items-center justify-center font-display text-[11px] text-(--color-fg)/60`}
                    style={{ animation: `nl-pop 0.4s ease-out ${i * 0.07}s both` }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-sm text-(--color-muted-fg) leading-snug">
                <strong className="text-(--color-fg) font-medium">14,200</strong> creators &amp; operators
                <br />
                <span className="text-[11px]">already inside</span>
              </div>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["Free forever",       "accent"],
                  ["No spam",            "blue"],
                  ["Unsubscribe anytime","pink"],
                ] as [string, string][]
              ).map(([label, tone]) => (
                <span key={label} className="chip !text-[10px] !px-3 !py-1" data-tone={tone}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-5 w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
            >
              {subscribed ? (
                <div
                  className="relative overflow-hidden rounded-2xl border border-(--color-accent) p-8 flex flex-col items-center text-center gap-4"
                  style={{ animation: "nl-success 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}
                >
                  {/* Confetti dots */}
                  {(
                    [
                      ["top-3 left-6",   "bg-(--color-accent)",   "nl-confetti-a 1s ease-out 0.1s both"],
                      ["top-3 right-8",  "bg-(--color-accent-2)", "nl-confetti-b 1s ease-out 0.2s both"],
                      ["top-5 left-1/2", "bg-(--color-accent-3)", "nl-confetti-a 1s ease-out 0.15s both"],
                      ["top-2 right-1/3","bg-(--color-accent-4)", "nl-confetti-b 1s ease-out 0.25s both"],
                    ] as [string, string, string][]
                  ).map(([pos, color, anim], i) => (
                    <span key={i} aria-hidden className={`absolute ${pos} ${color} w-2 h-2 rounded-full pointer-events-none`} style={{ animation: anim }} />
                  ))}
                  <span className="font-display text-5xl text-(--color-accent) leading-none">✓</span>
                  <div>
                    <p className="font-display text-2xl mb-1">You're on the list.</p>
                    <p className="text-sm text-(--color-muted-fg)">Watch your inbox every week.</p>
                  </div>
                  <div className="w-full h-px bg-(--color-border)" />
                  <p className="text-[10px] uppercase tracking-widest text-(--color-muted-fg)">
                    Welcome to the community of <span className="text-(--color-accent)">14,201</span>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {/* Glowing form card */}
                  <div
                    className="relative rounded-2xl border border-(--color-border) p-6 flex flex-col gap-4 bg-(--color-panel)/30 backdrop-blur-sm transition-all duration-500"
                    style={{ boxShadow: "0 0 0 0px transparent" }}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-(--color-muted-fg)">Drop your email</p>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-muted-fg)" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@studio.com"
                        className="w-full pl-11 pr-4 py-4 rounded-xl bg-(--color-bg)/60 border border-(--color-border) text-sm focus:outline-none focus:border-(--color-accent) focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_15%,transparent)] transition-all duration-300 placeholder:text-(--color-muted-fg)/50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-(--color-fg) text-(--color-bg) text-sm font-medium transition-all duration-300 hover:bg-(--color-accent) hover:text-black hover:shadow-[0_4px_24px_color-mix(in_srgb,var(--color-accent)_35%,transparent)] cursor-pointer group"
                    >
                      Subscribe — it's free
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    {/* Shimmer accent line */}
                    <div
                      aria-hidden
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px rounded-full pointer-events-none"
                      style={{ width: "60%", background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)", animation: "nl-shimmer 2.5s ease-in-out infinite" }}
                    />
                  </div>

                  <p className="text-center text-[10px] uppercase tracking-widest text-(--color-muted-fg)">
                    Joined by 14,200 creators &amp; operators
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
