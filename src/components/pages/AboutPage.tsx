"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const values = [
  { title: "Authenticity", body: "We champion real stories over polished facades. Every piece of content should feel human." },
  { title: "Innovation",   body: "We push the boundaries of how creators and brands collaborate in the digital age." },
  { title: "Community",    body: "Every creator and brand on Icons is a partner. We grow together, always." },
  { title: "Impact",       body: "We measure success not in impressions, but in the genuine connections we spark." },
];

const team = [
  { name: "Sara Malik",     role: "Co-Founder & CEO",      bio: "Former creator with 2M+ followers. Built Icons to solve her own frustrations." },
  { name: "James Okafor",   role: "Co-Founder & CTO",      bio: "Ex-Meta engineer. Obsessed with matchmaking algorithms and great espresso." },
  { name: "Lena Vogel",     role: "Head of Creator Growth", bio: "Grew creator communities at TikTok Europe before joining the founding team." },
  { name: "Tomás Rivera",   role: "Head of Brand Partnerships", bio: "Decade of brand strategy at global agencies. Believes in content that moves people." },
];

const milestones = [
  { year: "2022", event: "Icons founded in a Dubai co-working space with 3 people and a big idea." },
  { year: "2023", event: "Reached 1,000 creators and closed first $2M seed round." },
  { year: "2024", event: "Launched AI-powered brand matching. 500 brand partners onboarded." },
  { year: "2025", event: "Crossed $10M in creator earnings. Opened NYC office." },
];

export const AboutPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".about-hero-word", {
      y: "110%", opacity: 0, duration: 1, ease: "expo.out",
      stagger: 0.06, delay: 0.1,
    });
    gsap.utils.toArray<Element>(".about-reveal").forEach((el) => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Hero ── */}
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <p className="about-reveal text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--muted-fg, var(--muted))" }}>
          About Us
        </p>
        <h1 className="text-7xl md:text-[10rem] font-bold leading-none mb-8 overflow-hidden" style={{ fontFamily: "'DM Serif Display', serif" }}>
          {"We Are".split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-6">
              <span className="about-hero-word inline-block">{w}</span>
            </span>
          ))}
          <span className="inline-block overflow-hidden">
            <span className="about-hero-word inline-block" style={{ color: "var(--accent)" }}>Icons.</span>
          </span>
        </h1>
        <div className="about-reveal flex flex-col md:flex-row gap-16 mt-16" style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
          <p className="text-xl md:text-2xl leading-relaxed md:w-3/5" style={{ color: "var(--fg)", opacity: 0.8 }}>
            We built Icons because authentic creator-brand partnerships shouldn't be hard. No middlemen. No fake metrics. Just real people, real content, and real results.
          </p>
          <div className="flex gap-12 md:w-2/5 items-start">
            {[["2022", "Founded"], ["10K+", "Creators"], ["500+", "Brands"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-4xl font-bold mb-1" style={{ color: "var(--accent)" }}>{num}</div>
                <div className="text-xs uppercase tracking-widest" style={{ color: "var(--muted-fg, var(--muted))" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="about-reveal text-xs font-semibold uppercase tracking-[0.3em] mb-12" style={{ color: "var(--muted-fg, var(--muted))" }}>Our Values</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {values.map(({ title, body }) => (
              <div key={title} className="about-reveal p-8" style={{ backgroundColor: "var(--bg)" }}>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="about-reveal text-xs font-semibold uppercase tracking-[0.3em] mb-12" style={{ color: "var(--muted-fg, var(--muted))" }}>Our Story</p>
          <div className="space-y-0">
            {milestones.map(({ year, event }, i) => (
              <div key={year} className="about-reveal flex gap-8 items-start py-8" style={{ borderTop: i === 0 ? "1px solid var(--border)" : "none", borderBottom: "1px solid var(--border)" }}>
                <span className="text-4xl font-bold shrink-0 w-24" style={{ color: "var(--accent)", fontFamily: "'DM Serif Display', serif" }}>{year}</span>
                <p className="text-lg leading-relaxed pt-2" style={{ opacity: 0.8 }}>{event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="about-reveal text-xs font-semibold uppercase tracking-[0.3em] mb-12" style={{ color: "var(--muted-fg, var(--muted))" }}>The Team</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)" }}>
            {team.map(({ name, role, bio }) => (
              <div key={name} className="about-reveal p-8" style={{ backgroundColor: "var(--bg)" }}>
                <div className="w-16 h-16 rounded-full mb-6" style={{ backgroundColor: "var(--accent)", opacity: 0.15 }} />
                <h3 className="font-bold mb-1">{name}</h3>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>{role}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
