"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Zap, DollarSign, Users, Sliders } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { value: "10K+",  label: "Active Creators" },
  { value: "$10M+", label: "Creator Earnings" },
  { value: "500+",  label: "Brand Partners"  },
  { value: "4.8★",  label: "Avg. Rating"      },
];

const steps = [
  { n: "01", title: "Build Your Profile",   body: "Showcase your niche, audience, and content style. Takes less than 10 minutes." },
  { n: "02", title: "Get Matched",           body: "Our AI surfaces brands that genuinely align with your audience and values." },
  { n: "03", title: "Create & Get Paid",     body: "Collaborate on your terms, publish great content, and receive fast payouts." },
];

const benefits = [
  { Icon: DollarSign, title: "Fair, Fast Pay",         body: "No chasing invoices. Payments hit your account within 48 hours of delivery." },
  { Icon: Zap,        title: "Matched Opportunities",  body: "Stop cold-pitching. We surface deals relevant to your niche automatically." },
  { Icon: Sliders,    title: "Creative Control",       body: "Your voice, your style. Brands on Icons respect your creative process." },
  { Icon: Users,      title: "A Real Community",       body: "Workshops, peer groups, and direct access to a team that's in your corner." },
];

export const CreatorsPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".cr-hero-word", {
      y: "110%", opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07, delay: 0.1,
    });
    gsap.utils.toArray<Element>(".cr-reveal").forEach((el) => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Hero ── */}
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--muted-fg, var(--muted))" }}>
          For Creators
        </p>
        <h1 className="text-6xl md:text-[8.5rem] font-bold leading-none mb-10" style={{ fontFamily: "'DM Serif Display', serif" }}>
          {["Built", "For", "Creators."].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-5">
              <span className="cr-hero-word inline-block" style={w === "Creators." ? { color: "var(--accent)" } : {}}>
                {w}
              </span>
            </span>
          ))}
        </h1>
        <p className="cr-reveal text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>
          Icons gives you real brand deals, fair pay, and creative freedom — so you can focus on making content that actually matters to your audience.
        </p>
      </section>

      {/* ── Stats ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ "--tw-divide-opacity": 1, borderColor: "var(--border)" } as React.CSSProperties}>
          {stats.map(({ value, label }) => (
            <div key={label} className="cr-reveal p-10 text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: "var(--accent)", fontFamily: "'DM Serif Display', serif" }}>{value}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "var(--muted-fg, var(--muted))" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="cr-reveal text-xs font-semibold uppercase tracking-[0.3em] mb-16" style={{ color: "var(--muted-fg, var(--muted))" }}>How It Works</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {steps.map(({ n, title, body }) => (
              <div key={n} className="cr-reveal p-10" style={{ backgroundColor: "var(--bg)" }}>
                <div className="text-6xl font-bold mb-6 leading-none" style={{ color: "var(--accent)", opacity: 0.2, fontFamily: "'DM Serif Display', serif" }}>{n}</div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 px-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="cr-reveal text-xs font-semibold uppercase tracking-[0.3em] mb-16" style={{ color: "var(--muted-fg, var(--muted))" }}>Why Icons</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {benefits.map(({ Icon, title, body }) => (
              <div key={title} className="cr-reveal p-8" style={{ backgroundColor: "var(--bg)" }}>
                <Icon size={24} style={{ color: "var(--accent)" }} className="mb-5" />
                <h3 className="font-bold mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="cr-reveal text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Ready to grow?
          </h2>
          <p className="cr-reveal text-lg mb-10" style={{ color: "var(--muted-fg, var(--muted))" }}>
            Join thousands of creators already building their brand with Icons.
          </p>
          <Link href="/contact" className="cr-reveal inline-flex items-center gap-3 border-2 px-10 py-4 font-semibold tracking-wide transition-all duration-300 hover:bg-accent hover:border-accent hover:text-black" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
            Apply as Creator <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
};
