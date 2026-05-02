"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ContactPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useGSAP(() => {
    gsap.from(".contact-hero-char", {
      y: "110%", opacity: 0, duration: 1, ease: "expo.out", stagger: 0.04, delay: 0.1,
    });
    gsap.utils.toArray<Element>(".contact-reveal").forEach((el) => {
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
    // Magnetic button
    const btn = btnRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
  }, { scope: ref });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={ref} className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Hero ── */}
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: "var(--muted-fg, var(--muted))" }}>
          Contact
        </p>
        <h1 className="text-7xl md:text-[9rem] font-bold leading-none overflow-hidden" style={{ fontFamily: "'DM Serif Display', serif" }}>
          {"Let's Talk.".split("").map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="contact-hero-char inline-block" style={ch === " " ? { width: "0.4em" } : {}}>
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          ))}
        </h1>
        <p className="contact-reveal mt-8 text-lg max-w-xl leading-relaxed" style={{ color: "var(--muted-fg, var(--muted))" }}>
          Whether you're a creator ready to grow, a brand looking for authentic content, or just curious — we'd love to hear from you.
        </p>
      </section>

      {/* ── Form + Info ── */}
      <section className="pb-32 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-px" style={{ backgroundColor: "var(--border)" }}>

          {/* Form */}
          <div className="contact-reveal lg:w-3/5 p-10 lg:p-16" style={{ backgroundColor: "var(--bg)" }}>
            {sent ? (
              <div className="flex flex-col items-start gap-4 py-16">
                <div className="text-5xl font-bold" style={{ color: "var(--accent)" }}>✓</div>
                <h3 className="text-2xl font-bold">Message received.</h3>
                <p style={{ color: "var(--muted-fg, var(--muted))" }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: "name",  label: "Full Name",     type: "text",  placeholder: "Sara Malik" },
                    { id: "email", label: "Email Address",  type: "email", placeholder: "hello@you.com" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest" style={{ color: "var(--muted-fg, var(--muted))" }}>{label}</label>
                      <input
                        required type={type} placeholder={placeholder}
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm(f => ({ ...f, [id]: e.target.value }))}
                        className="bg-transparent border-b py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors duration-200 placeholder:opacity-30"
                        style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest" style={{ color: "var(--muted-fg, var(--muted))" }}>Subject</label>
                  <select
                    required value={form.subject}
                    onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="bg-transparent border-b py-3 text-sm outline-none transition-colors duration-200"
                    style={{ borderColor: "var(--border)", color: form.subject ? "var(--fg)" : "var(--muted-fg, var(--muted))" }}
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="creator">I'm a creator</option>
                    <option value="brand">I represent a brand</option>
                    <option value="press">Press & media</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest" style={{ color: "var(--muted-fg, var(--muted))" }}>Message</label>
                  <textarea
                    required rows={5} placeholder="Tell us what's on your mind…"
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    className="bg-transparent border-b py-3 text-sm outline-none resize-none focus:border-[var(--accent)] transition-colors duration-200 placeholder:opacity-30"
                    style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                  />
                </div>
                <button
                  ref={btnRef} type="submit"
                  className="mt-4 inline-flex items-center gap-3 border-2 px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  Send Message <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="contact-reveal lg:w-2/5 p-10 lg:p-16 flex flex-col justify-between gap-12" style={{ backgroundColor: "var(--bg)" }}>
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted-fg, var(--muted))" }}>Email Us</p>
                <a href="mailto:hello@icons.studio" className="flex items-center gap-2 text-lg font-medium hover:text-[var(--accent)] transition-colors duration-200">
                  <Mail size={16} /> hello@icons.studio
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted-fg, var(--muted))" }}>Offices</p>
                <div className="space-y-2 text-sm" style={{ opacity: 0.8 }}>
                  <div className="flex items-center gap-2"><MapPin size={14} /> New York, USA</div>
                  <div className="flex items-center gap-2"><MapPin size={14} /> Dubai, UAE</div>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--muted-fg, var(--muted))" }}>Follow Along</p>
                <div className="flex items-center gap-5">
                  {[
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Twitter,   label: "Twitter"   },
                    { Icon: Linkedin,  label: "LinkedIn"  },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="hover:text-[var(--accent)] transition-colors duration-200">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative */}
            <div className="hidden lg:block">
              <div className="text-[8rem] font-bold leading-none select-none" style={{ color: "var(--accent)", opacity: 0.07, fontFamily: "'DM Serif Display', serif" }}>
                icons.
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
