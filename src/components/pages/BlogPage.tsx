"use client";

import { useRef, useState } from "react";
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

export const BlogPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useGSAP(
    () => {
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
      <PageHero
        eyebrow="Journal"
        title="Stories __ACCENT__& Insights."
        lede="Field notes from the creator economy — what's working, what's not, and what's coming next. Written by the team building Icons."
      />

      {/* ── Featured ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-16 border-t border-(--color-border)">
        <div className="max-w-7xl mx-auto pt-16">
          <div className="bl-reveal mb-6">
            <SectionLabel>Featured</SectionLabel>
          </div>
          <article className="bl-reveal grid grid-cols-1 lg:grid-cols-12 gap-px grid-divider rounded-sm overflow-hidden border border-(--color-border)">
            <div className={cn(categoryTone[featured.category], "lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[320px] relative")}>
              <div className="absolute top-6 left-6 chip" data-tone="accent">
                {featured.category}
              </div>
              <div className="absolute bottom-6 right-6 chip">
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
              <div className={cn(categoryTone[p.category], "aspect-[5/3] mb-6 relative rounded-sm overflow-hidden")}>
                <span className="absolute top-3 left-3 chip !text-[9px] !px-2 !py-1 bg-(--color-bg)/70">
                  {p.category}
                </span>
                <span className="absolute bottom-3 right-3 chip !text-[9px] !px-2 !py-1 bg-(--color-bg)/70">
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
      <SectionShell eyebrow="Stay in the loop">
        <div className="bl-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] mb-5">
              A weekly read for{" "}
              <span className="text-(--color-accent)">people who build</span>{" "}
              with creators.
            </h2>
            <p className="text-base text-(--color-muted-fg) max-w-xl leading-relaxed">
              Field notes, case studies, and tools from inside the platform.
              Free. No spam. Unsubscribe in one click.
            </p>
          </div>
          <form
            className="lg:col-span-5 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
          >
            {subscribed ? (
              <div className="border border-(--color-accent) rounded-full px-6 py-5 flex items-center gap-3 text-sm">
                <span className="font-display text-2xl text-(--color-accent)">✓</span>
                You're on the list. Watch your inbox.
              </div>
            ) : (
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-muted-fg)" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="w-full pl-12 pr-36 py-5 rounded-full bg-(--color-panel-2)/40 border border-(--color-border) text-sm focus:outline-none focus:border-(--color-accent) transition-colors placeholder:text-(--color-muted-fg)/60"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-(--color-fg) text-(--color-bg) text-sm font-medium transition-colors hover:bg-(--color-accent) hover:text-black cursor-pointer"
                >
                  Subscribe
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <p className="mt-3 ml-5 text-[10px] uppercase tracking-widest text-(--color-muted-fg)">
              Joined by 14,200 creators & operators
            </p>
          </form>
        </div>
      </SectionShell>
    </div>
  );
};
