import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  no: string;
  badge: string;
  title: string;
  intro: string;
  bullets: string[];
  bg: string;
  numberTint: string;
  bulletStroke: string;
  textColor: string;
  mediaBg: string;
  mediaStars: { fill: string; size: number; cls: string }[];
  mediaImage: { src: string; alt: string };
  /** Inset frame color — matches the card accent for visual cohesion */
  mediaAccent: string;
};

const STEPS: Step[] = [
  {
    no: "01",
    badge: "Apply in 60 seconds",
    title: "Show us the vibe, skip the resume",
    intro:
      "Drop a clip, your handles, and the niche you live in. No portfolio drama — we read the vibe, not the bullet points.",
    bullets: [
      "One reel + your three best posts",
      "Your handles + the niche you live in",
      "Approved in under 48 hours",
    ],
    bg: "#c5ff3d",
    numberTint: "#eaffb0",
    bulletStroke: "#0a0a0a",
    textColor: "#0a0a0a",
    mediaBg: "#0a0a0a",
    mediaAccent: "#c5ff3d",
    mediaImage: {
      src: "/cards/apply_in_seconds.jpg",
      alt: "Apply in 60 seconds — vibe-first creator application",
    },
    mediaStars: [
      { fill: "#f5c518", size: 44, cls: "top-4 right-4 rotate-12" },
      { fill: "#c5ff3d", size: 34, cls: "bottom-16 left-4 -rotate-12" },
    ],
  },
  {
    no: "02",
    badge: "Get matched to brands",
    title: "Real briefs. Real rates. Public.",
    intro:
      "Our team pairs you with paid campaigns that actually fit your audience. You see the brief, the rate, the deadline — accept or skip.",
    bullets: [
      "Rates posted up-front, no DMs to negotiate",
      "Briefs hand-picked for your niche",
      "Skip anything that's not your vibe — zero penalty",
    ],
    bg: "#ff3d8b",
    numberTint: "#ff9ec3",
    bulletStroke: "#0a0a0a",
    textColor: "#0a0a0a",
    mediaBg: "#0a0a0a",
    mediaAccent: "#ff3d8b",
    mediaImage: {
      src: "/cards/get_matched.webp",
      alt: "Get matched to brands — paid campaigns hand-picked for your niche",
    },
    mediaStars: [
      { fill: "#ff3d8b", size: 44, cls: "top-4 left-4 -rotate-12" },
      { fill: "#f5c518", size: 34, cls: "bottom-16 right-4 rotate-12" },
    ],
  },
  {
    no: "03",
    badge: "Ship it & get paid",
    title: "Money hits before the algorithm cools",
    intro:
      "Film it your way, upload, get reviewed in 48h. Money hits your account on approval — no chasing invoices, no 30-day waits.",
    bullets: [
      "48-hour reviews from a real human",
      "Paid on approval, not on invoice cycles",
      "Performance bonuses on viral hits",
    ],
    bg: "#2d6cff",
    numberTint: "#a8c4ff",
    bulletStroke: "#ffffff",
    textColor: "#ffffff",
    mediaBg: "#0a0a0a",
    mediaAccent: "#2d6cff",
    mediaImage: {
      src: "/cards/get_paid.jpg",
      alt: "Ship it & get paid — money hits in 48 hours, not 30-day invoice cycles",
    },
    mediaStars: [
      { fill: "#2d6cff", size: 44, cls: "top-4 right-4 rotate-12" },
      { fill: "#f5c518", size: 34, cls: "bottom-16 left-4 -rotate-12" },
    ],
  },
  {
    no: "04",
    badge: "Grow with us",
    title: "Your roster grows, your rate grows",
    intro:
      "Every shipped campaign unlocks the next tier — higher rates, exclusive briefs, real-life Icons events, and a manager when you're ready.",
    bullets: [
      "Tier-based rate bumps after each campaign",
      "Invite-only briefs once you hit Icon tier",
      "IRL meetups, drops, and collabs",
    ],
    bg: "#0a0a0a",
    numberTint: "#2a2a2a",
    bulletStroke: "#c5ff3d",
    textColor: "#f5f1ea",
    mediaBg: "#0a0a0a",
    mediaAccent: "#f5c518",
    mediaImage: {
      src: "/cards/grow_with_us.jpg",
      alt: "Grow with us — tier-based rate bumps, invite-only briefs, IRL meetups",
    },
    mediaStars: [
      { fill: "#f5c518", size: 44, cls: "top-4 right-4 rotate-12" },
      { fill: "#c5ff3d", size: 34, cls: "bottom-16 left-4 -rotate-12" },
    ],
  },
];

export const HowSticker = () => {
  const ref = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      const pin = pinRef.current;
      const stage = stageRef.current;
      if (!pin || !stage || cards.length === 0) return;

      // ── Initial state: cards 2..N start fully below the stage ──
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          zIndex: i + 1,
        });
      });

      // ── Pin the stage for (cards.length) viewport-heights of scroll ──
      const totalSegments = cards.length - 1; // number of transitions
      const scrollDistance = () => window.innerHeight * totalSegments;

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: stage,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each card (after the first) slides up from yPercent:100 → 0,
      // occupying one segment of the scrub timeline.
      cards.forEach((card, i) => {
        if (i === 0) return;
        master.to(
          card,
          {
            yPercent: 0,
            ease: "none",
          },
          // place this tween at segment (i-1) of length 1
          i - 1,
        );
      });

      // Heading intro (outside the pin)
      gsap.from(".how-eyebrow", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
      gsap.from(".how-headline", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      // Idle wiggle on badges + drifting sparkles
      gsap.utils.toArray<HTMLElement>(".stack-badge").forEach((el) => {
        gsap.to(el, {
          rotate: "+=3",
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
      gsap.utils.toArray<HTMLElement>(".stack-spark").forEach((el, i) => {
        gsap.to(el, {
          y: "+=14",
          rotate: i % 2 === 0 ? "+=8" : "-=8",
          duration: 2.4 + (i % 3) * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative bracket-frame dot-grid"
      style={{ background: "var(--bg)" }}
    >
      {/* Heading (scrolls normally) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-12">
        <div className="how-eyebrow font-mono text-[12px] tracking-[0.32em] uppercase mb-6">
          04 · how it works
        </div>
        <h2 className="how-headline font-display italic text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] max-w-4xl">
          Three steps. No agency. <br />
          Just&nbsp;
          <span className="relative inline-block">
            <span className="relative z-10">vibes & cash.</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 h-3 -z-0"
              style={{ background: "var(--accent)" }}
            />
          </span>
        </h2>
      </div>

      {/* Pinned stack container */}
      <div ref={pinRef} className="relative">
        <div
          ref={stageRef}
          className="relative w-full h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden"
        >
          <div className="relative w-full max-w-7xl mx-auto h-[min(82vh,780px)]">
            {STEPS.map((step) => (
              <article
                key={step.no}
                className="stack-card absolute inset-0 rounded-[28px] border-2 border-(--color-fg) overflow-hidden will-change-transform"
                style={{
                  background: step.bg,
                  color: step.textColor,
                  boxShadow: "10px 10px 0 0 var(--color-fg)",
                }}
              >
                {/* Side-by-side row: text on left | image on right */}
                <div className="stack-card-grid relative h-full grid gap-5 md:gap-7 p-5 md:p-7 lg:p-9 overflow-hidden">
                  {/* LEFT — text column */}
                  <div className="relative flex flex-col gap-4 min-w-0 overflow-hidden">
                    {/* Header row: badge + number */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="stack-badge inline-block px-4 py-1.5 rounded-full border-2 border-(--color-fg) font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase -rotate-3 shrink-0"
                        style={{
                          background: "#ffffff",
                          color: "#0a0a0a",
                          boxShadow: "3px 3px 0 0 #0a0a0a",
                        }}
                      >
                        {step.badge}
                      </div>
                      <h3
                        className="font-display italic leading-[0.8] tracking-[-0.04em] text-[clamp(2.5rem,5.5vw,4.5rem)] select-none"
                        style={{ color: step.numberTint }}
                        aria-hidden
                      >
                        {step.no}
                      </h3>
                    </div>

                    {/* Title */}
                    <h4 className="font-display italic text-[clamp(1.4rem,2.8vw,2.25rem)] leading-[1] tracking-[-0.02em] mt-2">
                      {step.title}
                    </h4>

                    {/* Body */}
                    <p className="text-sm md:text-[15px] leading-relaxed font-sans opacity-95">
                      {step.intro}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-1.5 mt-auto">
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 font-sans text-sm leading-snug"
                        >
                          <ArrowRight
                            className="shrink-0 mt-0.5"
                            width={18}
                            height={18}
                            strokeWidth={2.4}
                            color={step.bulletStroke}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="font-script text-xl pt-1">
                      — easy, bestie
                    </div>
                  </div>

                  {/* RIGHT — image column, fills card height */}
                  <div className="relative w-full h-full min-h-0">
                    <div
                      className="relative w-full h-full rounded-[18px] border-[5px] overflow-hidden"
                      style={{
                        background: step.mediaBg,
                        borderColor: "#0a0a0a",
                        boxShadow: "6px 6px 0 0 #0a0a0a",
                      }}
                    >
                      {/* Card image */}
                      <img
                        src={step.mediaImage.src}
                        alt={step.mediaImage.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Inset sticker frame — accent ring over a black ring for depth */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-2 rounded-[14px] border-2"
                        style={{
                          borderColor: step.mediaAccent,
                          boxShadow: "inset 0 0 0 2px #0a0a0a",
                        }}
                      />

                      {/* Soft bottom gradient — keeps the tape strip readable */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(10,10,10,0.55), transparent)",
                        }}
                      />

                      {/* Small corner sparkles on top of the image */}
                      {step.mediaStars.map((s, idx) => (
                        <span
                          key={idx}
                          className={`stack-spark absolute z-10 ${s.cls}`}
                        >
                          <Sparkle
                            size={s.size}
                            fill={s.fill}
                            stroke="#0a0a0a"
                            strokeWidth={6}
                          />
                        </span>
                      ))}

                      {/* Tape-strip caption */}
                      <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full border-2 border-(--color-fg) font-mono text-[10px] tracking-[0.28em] uppercase whitespace-nowrap"
                        style={{
                          background: "#ffffff",
                          color: "#0a0a0a",
                          boxShadow: "2px 2px 0 0 #0a0a0a",
                        }}
                      >
                        ✦ step {step.no} preview
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
