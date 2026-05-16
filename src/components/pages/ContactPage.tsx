"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Plus,
  Minus,
  Clock,
} from "lucide-react";
import {
  PageHero,
  SectionShell,
  SectionLabel,
} from "@/components/shared/PagePrimitives";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

const offices = [
  { city: "New York",  country: "USA",  address: "112 Greene St, SoHo",  tone: "gradient-cool" },
  { city: "Dubai",     country: "UAE",  address: "DIFC, Gate Avenue",     tone: "gradient-warm" },
  { city: "Lisbon",    country: "PT",   address: "Rua da Boavista 84",    tone: "gradient-accent" },
];

const faqs = [
  {
    q: "How fast do you respond?",
    a: "We aim for a real response within 24 hours, Monday through Friday. Most messages get a reply same-day during business hours in New York or Dubai.",
  },
  {
    q: "I'm a creator — how do I get on the platform?",
    a: "Use the form below and pick 'I'm a creator'. We'll send you the full application within a day. Vetting usually takes 48 hours after you submit.",
  },
  {
    q: "What's the minimum budget for a brand campaign?",
    a: "Our Spark plan starts at $2.5K per campaign and runs with 3–5 creators. For always-on programs, Studio starts at $8K/mo.",
  },
  {
    q: "Do you work outside the US, UAE, and EU?",
    a: "Yes — we run campaigns across 40+ markets through our creator network. The team is split between New York, Dubai, and Lisbon, but our roster is global.",
  },
  {
    q: "How does payment to creators work?",
    a: "Creators are paid within 48 hours of brand approval. Icons takes 0% from the creator side — our revenue comes from the brand-side service fee.",
  },
];

const subjectOptions = [
  { value: "creator", label: "I'm a creator" },
  { value: "brand",   label: "I represent a brand" },
  { value: "press",   label: "Press & media" },
  { value: "other",   label: "Something else" },
];

export const ContactPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useGSAP(
    () => {
      gsap.utils.toArray<Element>(".ct-reveal").forEach((el) => {
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

      // Magnetic submit button
      const btn = btnRef.current;
      if (!btn) return;
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.25,
          y: (e.clientY - r.top - r.height / 2) * 0.25,
          duration: 0.4,
          ease: "power2.out",
        });
      };
      const onLeave = () =>
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1,0.4)",
        });
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      <PageHero
        eyebrow="Contact"
        title="Let's __ACCENT__Talk."
        lede="Whether you're a creator ready to grow, a brand looking for authentic content, or just curious — we'd love to hear from you."
        meta={
          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="chip" data-tone="accent">
              <Clock className="w-3.5 h-3.5" />
              Avg. response in 24 hrs
            </span>
            <a
              href="mailto:hello@icons.studio"
              className="font-display text-2xl md:text-3xl hover:text-(--color-accent) transition-colors"
            >
              hello@icons.studio
            </a>
          </div>
        }
      />

      {/* ── Form + Info ──────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-24 border-t border-(--color-border)">
        <div className="max-w-7xl mx-auto pt-16 grid grid-cols-1 lg:grid-cols-12 gap-px grid-divider rounded-sm overflow-hidden border border-(--color-border)">
          {/* Form */}
          <div className="ct-reveal lg:col-span-7 p-8 md:p-14">
            {sent ? (
              <div className="flex flex-col items-start gap-5 py-16">
                <span className="font-display text-7xl text-(--color-accent) leading-none">
                  ✓
                </span>
                <h3 className="font-display text-3xl">Message received.</h3>
                <p className="text-(--color-muted-fg) max-w-md">
                  We'll get back to you within 24 hours. Meanwhile, you can
                  follow along on Instagram for behind-the-scenes from the team.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4 text-sm text-(--color-accent) hover:underline cursor-pointer"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: "name",  label: "Full name",    type: "text",  placeholder: "Sara Malik" },
                    { id: "email", label: "Email address", type: "email", placeholder: "hello@you.com" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label
                        htmlFor={id}
                        className="eyebrow !text-[10px]"
                      >
                        {label}
                      </label>
                      <input
                        id={id}
                        required
                        type={type}
                        placeholder={placeholder}
                        value={form[id as keyof typeof form]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [id]: e.target.value }))
                        }
                        className="bg-transparent border-b border-(--color-border) py-3 text-base outline-none text-(--color-fg) placeholder:text-(--color-muted-fg)/40 focus:border-(--color-accent) transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <span className="eyebrow !text-[10px]">Subject</span>
                  <div className="flex flex-wrap gap-2">
                    {subjectOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, subject: opt.value }))
                        }
                        className={cn(
                          "px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium rounded-full border transition-all duration-200 cursor-pointer",
                          form.subject === opt.value
                            ? "bg-(--color-fg) text-(--color-bg) border-(--color-fg)"
                            : "text-(--color-muted-fg) border-(--color-border) hover:border-(--color-border-strong) hover:text-(--color-fg)",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="eyebrow !text-[10px]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind…"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="bg-transparent border-b border-(--color-border) py-3 text-base outline-none resize-none text-(--color-fg) placeholder:text-(--color-muted-fg)/40 focus:border-(--color-accent) transition-colors duration-200"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                  <p className="text-xs text-(--color-muted-fg) hidden sm:block">
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                  <button
                    ref={btnRef}
                    type="submit"
                    disabled={!form.subject}
                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Send message
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <aside className="ct-reveal lg:col-span-5 p-8 md:p-14 bg-(--color-panel-2)/40 flex flex-col justify-between gap-10">
            <div className="space-y-10">
              <div>
                <SectionLabel>Email us</SectionLabel>
                <a
                  href="mailto:hello@icons.studio"
                  className="mt-3 inline-flex items-center gap-2 text-lg font-medium hover:text-(--color-accent) transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" /> hello@icons.studio
                </a>
              </div>

              <div>
                <SectionLabel>Press & media</SectionLabel>
                <a
                  href="mailto:press@icons.studio"
                  className="mt-3 inline-flex items-center gap-2 text-lg font-medium hover:text-(--color-accent) transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" /> press@icons.studio
                </a>
              </div>

              <div>
                <SectionLabel>Follow along</SectionLabel>
                <div className="mt-4 flex items-center gap-3">
                  {[
                    { Icon: Instagram, label: "Instagram", href: "#" },
                    { Icon: Twitter,   label: "Twitter",   href: "#" },
                    { Icon: Linkedin,  label: "LinkedIn",  href: "#" },
                  ].map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-(--color-border) text-(--color-muted-fg) hover:text-(--color-fg) hover:border-(--color-border-strong) inline-flex items-center justify-center transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="font-display text-[8rem] leading-[0.8] text-(--color-accent) opacity-[0.07] select-none -mr-4 -mb-6">
              icons.
            </div>
          </aside>
        </div>
      </section>

      {/* ── Offices ──────────────────────────────────────────────── */}
      <SectionShell eyebrow="Find us" title="Three offices, one team.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px grid-divider">
          {offices.map((o) => (
            <article key={o.city} className="ct-reveal card-hover p-8">
              <div
                className={cn(
                  o.tone,
                  "aspect-[4/3] mb-6 rounded-sm relative overflow-hidden",
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-(--color-fg)/40" strokeWidth={1.5} />
                </div>
                <span className="absolute top-3 left-3 chip !text-[9px] !px-2 !py-1 bg-(--color-bg)/70">
                  {o.country}
                </span>
              </div>
              <h3 className="font-display text-3xl mb-2">{o.city}</h3>
              <p className="text-sm text-(--color-muted-fg)">{o.address}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <SectionShell eyebrow="FAQ" title="Quick answers." tight>
        <div className="max-w-3xl mx-auto">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={f.q}
                className="ct-reveal border-t border-(--color-border) last:border-b"
              >
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group cursor-pointer"
                >
                  <span className="font-display text-xl md:text-2xl group-hover:text-(--color-accent) transition-colors">
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "w-9 h-9 rounded-full border border-(--color-border) inline-flex items-center justify-center shrink-0 transition-all duration-300",
                      open
                        ? "bg-(--color-accent) border-(--color-accent) text-black rotate-180"
                        : "text-(--color-muted-fg) group-hover:border-(--color-border-strong) group-hover:text-(--color-fg)",
                    )}
                  >
                    {open ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-400 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-7 pr-14 text-base text-(--color-muted-fg) leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionShell>
    </div>
  );
};
