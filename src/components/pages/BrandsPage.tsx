"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, BarChart2, ShieldCheck, Layers, Headphones } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { value: "500+",  label: "Brand Campaigns"  },
  { value: "10M+",  label: "Total Reach"       },
  { value: "2×",    label: "Avg. ROI"          },
  { value: "98%",   label: "Satisfaction Rate" },
];

const features = [
  { Icon: Layers,      title: "Authentic Content at Scale", body: "Commission dozens of creator-led videos, posts, and reviews — all on-brand, all unique." },
  { Icon: ShieldCheck, title: "Vetted Creator Network",     body: "Every creator is verified for audience quality, engagement, and brand-safety." },
  { Icon: BarChart2,   title: "Real-Time Analytics",        body: "Track reach, engagement, and conversions from a single clean dashboard." },
  { Icon: Headphones,  title: "Dedicated Support",          body: "A campaign manager is with you every step — from brief to delivery." },
];

const cases = [
  { brand: "GlowBeauty",  result: "3.2M impressions, 42% lower CPM vs. paid ads.",    category: "Beauty & Lifestyle"  },
  { brand: "TrailRunner",  result: "18K new sign-ups from a 30-creator campaign.",      category: "Sports & Fitness"    },
  { brand: "NestHome",     result: "4× ROAS on a creator-first product launch.",        category: "Home & Living"       },
];

export const BrandsPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".br-hero-word", {
      y: "110%", opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.1,
    });
    gsap.utils.toArray<Element>(".br-reveal").forEach((el) => {
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
          For Brands
        </p>
        <h1 className="text-6xl md:text-[8rem] font-bold leading-none mb-10" style={{ fontFamily: "'DM Serif Display', serif" }}>
          {["Your", "Brand.", "Amplified."].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-5">
              <span className="br-hero-word inline-block" style={w === "Amplified." ? { color: "var(--accent)" } : {}}>
                {w}
              </span>
            </span>
          ))}
        </h1>
        <p className="br-reveal text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>
          Stop guessing which influencers will perform. Icons matches you with creators whose audience actually cares about what you do.
        </p>
      </section>

      {/* ── Stats ── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4" style={{ backgroundColor: "var(--border)", gap: "1px" }}>
          {stats.map(({ value, label }) => (
            <div key={label} className="br-reveal p-10 text-center" style={{ backgroundColor: "var(--bg)" }}>
              <div className="text-5xl font-bold mb-2" style={{ color: "var(--accent)", fontFamily: "'DM Serif Display', serif" }}>{value}</div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "var(--muted-fg, var(--muted))" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="py-24 px-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="br-reveal text-xs font-semibold uppercase tracking-[0.3em] mb-16" style={{ color: "var(--muted-fg, var(--muted))" }}>What You Get</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {features.map(({ Icon, title, body }) => (
              <div key={title} className="br-reveal p-8" style={{ backgroundColor: "var(--bg)" }}>
                <Icon size={24} style={{ color: "var(--accent)" }} className="mb-5" />
                <h3 className="font-bold mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="py-24 px-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="br-reveal text-xs font-semibold uppercase tracking-[0.3em] mb-16" style={{ color: "var(--muted-fg, var(--muted))" }}>Results That Speak</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {cases.map(({ brand, result, category }) => (
              <div key={brand} className="br-reveal p-8 flex flex-col justify-between gap-6 min-h-[220px]" style={{ backgroundColor: "var(--bg)" }}>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>{category}</p>
                  <h3 className="text-2xl font-bold mb-3">{brand}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>{result}</p>
                </div>
                <ArrowUpRight size={18} style={{ color: "var(--accent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="br-reveal text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Start a campaign.
          </h2>
          <p className="br-reveal text-lg mb-10" style={{ color: "var(--muted-fg, var(--muted))" }}>
            Tell us about your brand and we'll hand-pick the right creators for your next campaign.
          </p>
          <Link href="/contact" className="br-reveal inline-flex items-center gap-3 border-2 px-10 py-4 font-semibold tracking-wide transition-all duration-300 hover:bg-accent hover:border-accent hover:text-black" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
            Get in Touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
};
