import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkle } from "@/components/ui/Sparkle";

gsap.registerPlugin(ScrollTrigger);

type Tone = {
  label: string;
  bg: string;
  starFill: string;
  outline: boolean;
};

const TONES: Tone[] = [
  { label: "ACID", bg: "#c5ff3d", starFill: "#f5c518", outline: true },
  { label: "PINK", bg: "#ff3d8b", starFill: "#f5c518", outline: true },
  { label: "BLUE", bg: "#2d6cff", starFill: "#f5c518", outline: true },
  { label: "INK", bg: "transparent", starFill: "#c5ff3d", outline: false },
];

export const AppTilesScene = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tile-card", {
        opacity: 0,
        y: 80,
        scale: 0.85,
        rotate: -6,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });

      gsap.from(".tile-label", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });

      // Subtle hover wobble loop
      gsap.to(".tile-card", {
        y: "+=8",
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.25, from: "random" },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 bg-(--color-fg) text-(--color-bg) overflow-hidden bracket-frame"
    >
      {/* Top eyebrow */}
      <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-[11px] tracking-[0.28em] uppercase mb-16 text-(--color-bg)">
        <span>03b / 04 · app icons</span>
        <span className="hidden sm:inline">colorways</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {TONES.map((tone) => (
          <div key={tone.label} className="flex flex-col items-center gap-6">
            <div
              className="tile-card relative w-full aspect-square rounded-[28%] flex items-center justify-center"
              style={{
                background: tone.bg,
                border: tone.outline ? "2px solid #0a0a0a" : "2px solid #f5f1ea",
                boxShadow: tone.outline
                  ? "10px 10px 0 0 #c5ff3d33"
                  : "10px 10px 0 0 #ffffff14",
              }}
            >
              <Sparkle
                size={170}
                fill={tone.starFill}
                stroke="#0a0a0a"
                strokeWidth={5}
                className={tone.label === "INK" ? "drop-shadow-none" : ""}
              />
            </div>
            <div className="tile-label font-mono text-sm tracking-[0.32em] uppercase">
              {tone.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom caption */}
      <div className="max-w-7xl mx-auto mt-20 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.28em] uppercase">
        <span>same star · four energies</span>
        <span>pick the vibe →</span>
      </div>
    </section>
  );
};
