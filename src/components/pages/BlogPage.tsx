"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = ["All", "Creator Tips", "Brand Strategy", "Industry News", "Case Studies"];

const featured = {
  category: "Industry News",
  title: "The Future of Creator Commerce is Here — and It's Not What You Expected",
  excerpt: "As brand budgets shift from traditional ads to creator-first strategies, the platforms that survive will be the ones that put authenticity over algorithms.",
  date: "Apr 28, 2026",
  readTime: "6 min read",
};

const posts = [
  { category: "Creator Tips",   title: "How to Write a Brand Brief That Actually Gets You Booked",  excerpt: "Most creators pitch wrong. Here's the one-page framework that gets responses.",       date: "Apr 22, 2026", readTime: "4 min" },
  { category: "Brand Strategy", title: "Why Your Last Influencer Campaign Failed (and How to Fix It)", excerpt: "Vanity metrics don't drive sales. We break down the numbers that actually matter.",    date: "Apr 18, 2026", readTime: "5 min" },
  { category: "Case Studies",   title: "GlowBeauty's 3M-Impression Campaign: A Full Breakdown",       excerpt: "We go inside the strategy, creator selection, and creative brief that drove results.", date: "Apr 14, 2026", readTime: "7 min" },
  { category: "Creator Tips",   title: "Negotiate Like a Pro: Getting Paid What You're Worth",        excerpt: "A former brand manager reveals exactly how much creators should be charging.",         date: "Apr 10, 2026", readTime: "5 min" },
  { category: "Industry News",  title: "Platform Algorithm Changes: What Creators Need to Know Now",  excerpt: "The latest shifts across TikTok, Instagram, and YouTube — and how to adapt fast.",    date: "Apr 05, 2026", readTime: "4 min" },
  { category: "Brand Strategy", title: "Building a Year-Long Creator Roster (Without a Big Budget)",  excerpt: "Micro-creators consistently outperform mega-influencers in conversion. Here's why.",  date: "Apr 01, 2026", readTime: "6 min" },
];

export const BlogPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useGSAP(() => {
    gsap.from(".blog-hero-word", {
      y: "110%", opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07, delay: 0.1,
    });
    gsap.utils.toArray<Element>(".blog-reveal").forEach((el) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      });
    });
  }, { scope: ref });

  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div ref={ref} className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--muted-fg, var(--muted))" }}>
          Blog
        </p>
        <h1 className="text-6xl md:text-[8.5rem] font-bold leading-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
          {["Stories", "&", "Insights."].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-5">
              <span className="blog-hero-word inline-block" style={w === "&" ? { color: "var(--accent)" } : {}}>
                {w}
              </span>
            </span>
          ))}
        </h1>
      </section>

      {/* ── Featured ── */}
      <section className="px-6 pb-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="blog-reveal flex flex-col lg:flex-row gap-px" style={{ backgroundColor: "var(--border)", marginTop: "-1px" }}>
            <div className="lg:w-1/2 aspect-video bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2,var(--accent))] opacity-20" style={{ minHeight: "280px" }} />
            <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-between" style={{ backgroundColor: "var(--bg)" }}>
              <div>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>{featured.category} · Featured</p>
                <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-5">{featured.title}</h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted-fg, var(--muted))" }}>{featured.excerpt}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted-fg, var(--muted))" }}>{featured.date} · {featured.readTime}</span>
                <button className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                  Read More <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filters ── */}
      <section className="px-6 pb-10" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto pt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 text-xs uppercase tracking-widest transition-all duration-200"
              style={{
                border: "1px solid",
                borderColor: activeCategory === cat ? "var(--accent)" : "var(--border)",
                color: activeCategory === cat ? "var(--accent)" : "var(--muted-fg, var(--muted))",
                backgroundColor: activeCategory === cat ? "color-mix(in srgb, var(--accent) 8%, var(--bg))" : "transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Posts Grid ── */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {filtered.map(({ category, title, excerpt, date, readTime }) => (
            <article
              key={title}
              className="blog-reveal group flex flex-col justify-between p-8 cursor-pointer transition-colors duration-200"
              style={{ backgroundColor: "var(--bg)", minHeight: "280px" }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>{category}</p>
                <h3 className="font-bold text-lg leading-snug mb-3 group-hover:text-[var(--accent)] transition-colors duration-200">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>{excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-xs" style={{ color: "var(--muted-fg, var(--muted))" }}>{date} · {readTime}</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "var(--accent)" }} />
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
