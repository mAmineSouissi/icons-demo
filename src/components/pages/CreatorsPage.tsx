"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Zap,
  DollarSign,
  Users,
  Sliders,
  Sparkles,
  Quote,
} from "lucide-react";
import {
  PageHero,
  InlineStats,
  SectionShell,
  BorderedGrid,
  CTASection,
  SectionLabel,
} from "@/components/shared/PagePrimitives";
import { ease } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

const heroStats = [
  { value: "10K+", label: "Creators" },
  { value: "$10M+", label: "Earnings" },
  { value: "4.8★", label: "Rating" },
];

const featuredCreators = [
  { name: "Maya R.",      handle: "@mayareads",    niche: "Books & culture",      followers: "412K",  tone: "gradient-warm" },
  { name: "Kai L.",       handle: "@kaiwalks",     niche: "Travel & food",        followers: "1.2M",  tone: "gradient-cool" },
  { name: "Priya N.",     handle: "@priyaedits",   niche: "Beauty & wellness",    followers: "289K",  tone: "gradient-accent" },
  { name: "Theo W.",      handle: "@theofitness",  niche: "Fitness coaching",     followers: "640K",  tone: "gradient-mono" },
  { name: "Nia O.",       handle: "@niamakes",     niche: "Craft & DIY",          followers: "186K",  tone: "gradient-warm" },
  { name: "Diego A.",     handle: "@diegoarchive", niche: "Streetwear & design",  followers: "523K",  tone: "gradient-cool" },
  { name: "Sasha M.",     handle: "@sashabrews",   niche: "Coffee & rituals",     followers: "94K",   tone: "gradient-accent" },
  { name: "Linh P.",      handle: "@linhcooks",    niche: "Recipes & home",       followers: "1.8M",  tone: "gradient-mono" },
];

const handles = [
  "@mayareads", "@kaiwalks", "@priyaedits", "@theofitness", "@niamakes",
  "@diegoarchive", "@sashabrews", "@linhcooks", "@mayareads", "@kaiwalks",
];

const steps = [
  { n: "01", title: "Build your profile",  body: "Showcase your niche, audience, and content style in under 10 minutes." },
  { n: "02", title: "Get matched",          body: "Our AI surfaces brands that genuinely align with your values and feed." },
  { n: "03", title: "Create & get paid",    body: "Collaborate on your terms. Payouts within 48 hours of delivery." },
];

const benefits = [
  { Icon: DollarSign, title: "Fair, fast pay",       body: "No chasing invoices. Direct deposit within 48 hours of delivery." },
  { Icon: Zap,        title: "Matched opportunities", body: "Stop cold-pitching. We surface deals relevant to your niche." },
  { Icon: Sliders,    title: "Creative control",      body: "Your voice, your style. Brands respect your creative process." },
  { Icon: Users,      title: "A real community",      body: "Workshops, peer groups, and direct access to a team in your corner." },
];

const earnings = [
  { metric: "Avg. campaign payout",     icons: "$2,400", others: "$680",   delta: "3.5×" },
  { metric: "Time to first payment",    icons: "48 hrs", others: "30–90d", delta: "Faster" },
  { metric: "Creator commission",       icons: "0%",     others: "20–35%", delta: "Yours" },
  { metric: "Avg. monthly opportunities", icons: "12+",  others: "2–3",    delta: "5×" },
];

export const CreatorsPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<Element>(".cr-reveal").forEach((el) => {
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

      // Handles marquee
      const track = ref.current?.querySelector<HTMLElement>(".cr-marquee");
      if (track) {
        const w = track.scrollWidth / 2;
        gsap.to(track, {
          x: -w,
          duration: 28,
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
        eyebrow="For Creators"
        title="Built __ACCENT__For Creators."
        lede="Icons gives you real brand deals, fair pay, and creative freedom — so you can focus on making content that actually moves your audience."
        meta={<InlineStats items={heroStats} />}
      />

      {/* ── Handles marquee ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-10 border-y border-(--color-border)">
        <div className="cr-marquee flex items-center gap-12 whitespace-nowrap w-max">
          {[...handles, ...handles].map((h, i) => (
            <span key={i} className="flex items-center gap-12">
              <span
                className="font-display text-5xl md:text-7xl leading-none"
                style={{
                  WebkitTextStroke: "1px var(--fg)",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.4,
                }}
              >
                {h}
              </span>
              <Sparkles className="w-5 h-5 text-(--color-accent)/60" />
            </span>
          ))}
        </div>
      </section>

      {/* ── Creator showcase ────────────────────────────────────── */}
      <SectionShell
        eyebrow="On the platform"
        title="A roster of voices, not influencers."
        description="Every creator is verified for audience quality, engagement, and brand-safety. Here are a few making waves right now."
      >
        <BorderedGrid cols={4}>
          {featuredCreators.map((c) => (
            <article
              key={c.handle}
              className="sx-reveal card-hover group relative p-6 cursor-pointer"
            >
              <div
                className={`${c.tone} aspect-[4/5] mb-5 relative overflow-hidden rounded-sm`}
              >
                {/* Initials in lieu of real photos */}
                <span className="absolute inset-0 flex items-center justify-center font-display text-7xl text-(--color-fg)/30 select-none">
                  {c.name.charAt(0)}
                </span>
                <span className="absolute top-3 left-3 chip !py-1 !px-2 !text-[9px] !tracking-[0.2em] bg-(--color-bg)/70">
                  {c.followers}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium text-base mb-0.5 group-hover:text-(--color-accent) transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-xs text-(--color-muted-fg)">{c.handle}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-(--color-muted-fg) opacity-0 group-hover:opacity-100 group-hover:text-(--color-accent) transition-all duration-300" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-(--color-muted-fg)">
                {c.niche}
              </p>
            </article>
          ))}
        </BorderedGrid>
      </SectionShell>

      {/* ── How it works ────────────────────────────────────────── */}
      <SectionShell
        eyebrow="How it works"
        title="Three steps. No agency in the middle."
      >
        <BorderedGrid cols={3}>
          {steps.map(({ n, title, body }) => (
            <div key={n} className="sx-reveal p-10">
              <div className="font-display text-7xl text-(--color-accent)/25 leading-none mb-8">
                {n}
              </div>
              <h3 className="font-medium text-xl mb-3">{title}</h3>
              <p className="text-sm text-(--color-muted-fg) leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </BorderedGrid>
      </SectionShell>

      {/* ── Earnings comparison ─────────────────────────────────── */}
      <SectionShell
        eyebrow="The numbers"
        title="What earning on Icons actually looks like."
        description="A side-by-side honest comparison vs. typical influencer agencies and brand marketplaces."
      >
        <div className="cr-reveal overflow-hidden border border-(--color-border) rounded-sm">
          {/* Header row */}
          <div className="grid grid-cols-12 bg-(--color-panel-2) px-6 py-4 border-b border-(--color-border)">
            <div className="col-span-6 eyebrow !text-[10px]">Metric</div>
            <div className="col-span-2 eyebrow !text-[10px] text-(--color-accent) !tracking-[0.25em]">
              Icons
            </div>
            <div className="col-span-2 eyebrow !text-[10px]">Typical agency</div>
            <div className="col-span-2 eyebrow !text-[10px] text-right">Δ</div>
          </div>
          {earnings.map((e, i) => (
            <div
              key={e.metric}
              className={`grid grid-cols-12 px-6 py-6 items-center ${
                i !== earnings.length - 1 ? "border-b border-(--color-border)" : ""
              }`}
            >
              <div className="col-span-6 text-sm md:text-base">{e.metric}</div>
              <div className="col-span-2 font-display text-2xl md:text-3xl text-(--color-accent)">
                {e.icons}
              </div>
              <div className="col-span-2 text-(--color-muted-fg) text-sm">
                {e.others}
              </div>
              <div className="col-span-2 text-right">
                <span className="chip" data-tone="accent">
                  {e.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── Why Icons ───────────────────────────────────────────── */}
      <SectionShell eyebrow="Why Icons" title="Built around how you actually work.">
        <BorderedGrid cols={4}>
          {benefits.map(({ Icon, title, body }) => (
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

      {/* ── Creator quote ───────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-28 md:py-40 border-t border-(--color-border) relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="cr-reveal flex items-center gap-3 mb-10">
            <SectionLabel>Creator story</SectionLabel>
          </div>
          <Quote className="cr-reveal w-12 h-12 text-(--color-accent) mb-6" strokeWidth={1} />
          <blockquote className="cr-reveal font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] mb-10">
            “The first platform that paid me on time, every time — and let me say
            no to a brand that didn't fit. That alone changed everything.”
          </blockquote>
          <footer className="cr-reveal flex items-center gap-4">
            <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center font-display text-xl text-(--color-fg)/40">
              M
            </div>
            <div>
              <div className="font-medium">Maya R.</div>
              <div className="text-sm text-(--color-muted-fg)">
                @mayareads · 412K followers · Books & culture
              </div>
            </div>
          </footer>
        </div>
      </section>

      <CTASection
        eyebrow="Join the roster"
        title="Ready to grow?"
        description="Apply in 5 minutes. We review every application within 48 hours."
        primary={{ label: "Apply as creator", href: "/contact" }}
        secondary={{ label: "How payouts work", href: "/about" }}
      />
    </div>
  );
};
