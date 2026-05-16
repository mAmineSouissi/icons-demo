"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  BarChart2,
  ShieldCheck,
  Layers,
  Headphones,
  Check,
} from "lucide-react";
import {
  PageHero,
  InlineStats,
  SectionShell,
  BorderedGrid,
  CTASection,
} from "@/components/shared/PagePrimitives";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

const heroStats = [
  { value: "500+", label: "Campaigns" },
  { value: "10M+", label: "Reach" },
  { value: "2×", label: "Avg. ROI" },
];

// Trusted-by logos rendered as monospace wordmarks (placeholder; replace with SVGs later)
const trustedBy = [
  "Glow",
  "TrailRunner",
  "NestHome",
  "ARCO",
  "Lumen",
  "Vellum",
  "Halcyon",
  "Kindling",
  "North/South",
  "Origins",
  "Folio",
  "Maven",
];

const features = [
  { Icon: Layers,      title: "Authentic content at scale", body: "Commission dozens of creator-led videos, posts, and reviews — all on-brand, all unique." },
  { Icon: ShieldCheck, title: "Vetted creator network",     body: "Every creator is verified for audience quality, engagement, and brand-safety." },
  { Icon: BarChart2,   title: "Real-time analytics",        body: "Track reach, engagement, and conversions from a single clean dashboard." },
  { Icon: Headphones,  title: "Dedicated support",          body: "A campaign manager is with you every step — from brief to delivery." },
];

const cases = [
  { brand: "GlowBeauty",   result: "3.2M impressions, 42% lower CPM vs. paid ads.", category: "Beauty & Lifestyle",  tone: "gradient-warm" },
  { brand: "TrailRunner",  result: "18K new sign-ups from a 30-creator campaign.",   category: "Sports & Fitness",    tone: "gradient-cool" },
  { brand: "NestHome",     result: "4× ROAS on a creator-first product launch.",     category: "Home & Living",       tone: "gradient-accent" },
];

const previewCreators = [
  { name: "Maya R.",    niche: "Books · 412K",   tone: "gradient-warm"   },
  { name: "Kai L.",     niche: "Travel · 1.2M",  tone: "gradient-cool"   },
  { name: "Priya N.",   niche: "Beauty · 289K",  tone: "gradient-accent" },
  { name: "Theo W.",    niche: "Fitness · 640K", tone: "gradient-mono"   },
  { name: "Diego A.",   niche: "Design · 523K",  tone: "gradient-cool"   },
  { name: "Linh P.",    niche: "Recipes · 1.8M", tone: "gradient-accent" },
];

const plans = [
  {
    name: "Spark",
    price: "$2.5K",
    cadence: "per campaign",
    description: "For first-time creator-led launches and one-off product moments.",
    features: [
      "Up to 5 vetted creators",
      "Brief + creative direction",
      "Standard analytics dashboard",
      "Email support",
    ],
    cta: "Start a campaign",
    highlight: false,
  },
  {
    name: "Studio",
    price: "$8K",
    cadence: "per month",
    description: "For brands running always-on creator pipelines and seasonal pushes.",
    features: [
      "20–40 creators per month",
      "Dedicated campaign manager",
      "Advanced analytics + UTM tracking",
      "Whitelisting & paid amplification",
      "Quarterly strategy review",
    ],
    cta: "Talk to studio",
    highlight: true,
  },
  {
    name: "Network",
    price: "Custom",
    cadence: "tailored",
    description: "For global brands with a year-round creator program and roster.",
    features: [
      "Unlimited campaigns",
      "On-site creator events",
      "Custom data & API access",
      "Priority creator booking",
      "Multi-market activation",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export const BrandsPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<Element>(".br-reveal").forEach((el) => {
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

      // Logo wall marquee
      const track = ref.current?.querySelector<HTMLElement>(".br-logos");
      if (track) {
        const w = track.scrollWidth / 2;
        gsap.to(track, {
          x: -w,
          duration: 32,
          ease: "none",
          repeat: -1,
          modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % w) },
        });
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      <PageHero
        eyebrow="For Brands"
        title="Your Brand. __ACCENT__Amplified."
        lede="Stop guessing which influencers will perform. Icons matches you with creators whose audience actually cares about what you do."
        meta={<InlineStats items={heroStats} />}
      />

      {/* ── Trusted-by logo wall ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-10 border-y border-(--color-border)">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-(--color-bg) to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-(--color-bg) to-transparent pointer-events-none" />
        <div className="br-logos flex items-center gap-16 whitespace-nowrap w-max">
          {[...trustedBy, ...trustedBy].map((brand, i) => (
            <span
              key={i}
              className="font-display text-3xl md:text-4xl text-(--color-fg)/45 tracking-tight"
            >
              {brand}
            </span>
          ))}
        </div>
        <p className="mt-6 text-center eyebrow !text-[10px]">
          500+ brand campaigns delivered
        </p>
      </section>

      {/* ── What You Get ─────────────────────────────────────────── */}
      <SectionShell
        eyebrow="What you get"
        title="A creator program that works like an in-house team."
      >
        <BorderedGrid cols={4}>
          {features.map(({ Icon, title, body }) => (
            <div key={title} className="sx-reveal p-8">
              <Icon className="w-6 h-6 text-(--color-accent) mb-6" strokeWidth={1.5} />
              <h3 className="font-medium text-base mb-3">{title}</h3>
              <p className="text-sm text-(--color-muted-fg) leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </BorderedGrid>
      </SectionShell>

      {/* ── Creator preview ──────────────────────────────────────── */}
      <SectionShell
        eyebrow="Talent on tap"
        title="A glimpse of who you could be working with."
        description="From niche micro-creators to platform-defining voices — our roster spans 40+ verticals across beauty, fitness, food, lifestyle, and design."
      >
        <BorderedGrid cols={3}>
          {previewCreators.map((c) => (
            <article
              key={c.name}
              className="sx-reveal card-hover group cursor-pointer p-6"
            >
              <div className={`${c.tone} aspect-[5/4] mb-5 relative overflow-hidden rounded-sm`}>
                <span className="absolute inset-0 flex items-center justify-center font-display text-7xl text-(--color-fg)/30">
                  {c.name.charAt(0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-base group-hover:text-(--color-accent) transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-(--color-muted-fg) mt-1">{c.niche}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-(--color-muted-fg) opacity-0 group-hover:opacity-100 group-hover:text-(--color-accent) transition-all duration-300" />
              </div>
            </article>
          ))}
        </BorderedGrid>
      </SectionShell>

      {/* ── Case studies ─────────────────────────────────────────── */}
      <SectionShell
        eyebrow="Results that speak"
        title="Recent work."
      >
        <BorderedGrid cols={3}>
          {cases.map((c) => (
            <article
              key={c.brand}
              className="sx-reveal card-hover group cursor-pointer p-8 flex flex-col justify-between gap-8 min-h-[320px]"
            >
              <div className={`${c.tone} h-24 rounded-sm relative overflow-hidden`}>
                <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-(--color-fg)/55">
                  {c.brand}
                </span>
              </div>
              <div>
                <p className="eyebrow !text-[10px] mb-3 text-(--color-accent)">
                  {c.category}
                </p>
                <h3 className="font-medium text-xl mb-3">{c.brand}</h3>
                <p className="text-sm text-(--color-muted-fg) leading-relaxed">
                  {c.result}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-(--color-accent) opacity-70 group-hover:opacity-100 transition">
                Read the breakdown
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          ))}
        </BorderedGrid>
      </SectionShell>

      {/* ── Pricing ──────────────────────────────────────────────── */}
      <SectionShell
        eyebrow="Plans"
        title="Pricing that scales with ambition."
        description="No mark-ups on creator fees. Every plan includes brief writing, talent matching, and a campaign manager."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "sx-reveal relative p-8 md:p-10 rounded-sm flex flex-col transition-all duration-300",
                plan.highlight
                  ? "bg-(--color-fg) text-(--color-bg) shadow-2xl"
                  : "border border-(--color-border) bg-(--color-panel-2)/40 hover:border-(--color-border-strong)",
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-8 chip" data-tone="accent">
                  Most popular
                </span>
              )}
              <header className="mb-8">
                <h3 className="font-display text-3xl mb-3">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl">{plan.price}</span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlight
                        ? "text-(--color-bg)/60"
                        : "text-(--color-muted-fg)",
                    )}
                  >
                    {plan.cadence}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed",
                    plan.highlight
                      ? "text-(--color-bg)/75"
                      : "text-(--color-muted-fg)",
                  )}
                >
                  {plan.description}
                </p>
              </header>
              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "w-4 h-4 mt-0.5 shrink-0",
                        plan.highlight ? "text-(--color-accent)" : "text-(--color-accent)",
                      )}
                      strokeWidth={2.5}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-between gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 group",
                  plan.highlight
                    ? "bg-(--color-accent) text-black hover:bg-(--color-fg) hover:text-(--color-bg)"
                    : "border border-(--color-fg) text-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg)",
                )}
              >
                {plan.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </SectionShell>

      <CTASection
        eyebrow="Start a campaign"
        title="Brief us in 10 minutes."
        description="Tell us about your brand and we'll hand-pick the right creators for your next campaign — usually within 48 hours."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "See how it works", href: "/about" }}
      />
    </div>
  );
};
