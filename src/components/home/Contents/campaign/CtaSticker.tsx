import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkle } from "@/components/ui/Sparkle";

gsap.registerPlugin(ScrollTrigger);

export const CtaSticker = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-card", {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotate: -3,
        duration: 0.9,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });

      gsap.from(".cta-side", {
        opacity: 0,
        scale: 0,
        rotate: -90,
        duration: 0.7,
        ease: "back.out(2)",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });

      // Idle wobble on big card
      gsap.to(".cta-card", {
        rotate: "+=1",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cta-side", {
        y: "+=14",
        rotate: "+=8",
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.3, from: "random" },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-12 dot-grid overflow-hidden bracket-frame"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Floating sparkles */}
        <Sparkle
          size={64}
          fill="var(--accent2)"
          className="cta-side absolute -top-6 -left-4 md:-left-12 -rotate-12"
        />
        <Sparkle
          size={56}
          fill="var(--accent3)"
          className="cta-side absolute -bottom-6 -right-4 md:-right-12 rotate-12"
        />
        <Sparkle
          size={44}
          fill="var(--accent4)"
          className="cta-side absolute top-1/3 -right-6 md:-right-20 rotate-6 hidden md:block"
        />

        <div
          className="cta-card sticker p-10 md:p-16 text-center flex flex-col items-center gap-8"
          data-tone="ink"
        >
          <div className="font-mono text-[11px] tracking-[0.32em] uppercase flex items-center gap-2 opacity-80">
            <span>✦</span>
            <span>new icon alert</span>
            <span>✦</span>
          </div>

          <h2 className="font-display italic text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-[-0.03em]">
            be the&nbsp;
            <span className="inline-block align-baseline -translate-y-1">
              <Sparkle size={86} fill="var(--accent)" strokeWidth={6} />
            </span>
            &nbsp;icon.
          </h2>

          <p className="font-script text-2xl md:text-3xl">
            — apply in 60 seconds, no portfolio drama
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/creators" className="btn-primary">
              Become a creator
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/brands"
              className="btn-ghost"
              style={{ background: "transparent", color: "var(--bg)", borderColor: "var(--bg)", boxShadow: "4px 4px 0 0 var(--accent)" }}
            >
              Hire creators
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
