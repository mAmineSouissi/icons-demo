import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkle } from "@/components/ui/Sparkle";

gsap.registerPlugin(ScrollTrigger);

export const WhyGenZ = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headline = ref.current?.querySelector(".why-headline");
      if (headline) {
        const words = headline.textContent?.split(" ") ?? [];
        headline.innerHTML = words
          .map(
            (w) =>
              `<span class="why-word inline-block overflow-hidden align-bottom"><span class="inline-block">${w}&nbsp;</span></span>`,
          )
          .join("");
      }

      gsap.from(".why-word > span", {
        yPercent: 110,
        rotate: 6,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
      });

      gsap.from(".why-body", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
        },
      });

      gsap.from(".why-eyebrow", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });

      gsap.from(".why-star", {
        opacity: 0,
        scale: 0,
        rotate: -180,
        duration: 0.9,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
        },
      });

      // Idle star wobble
      gsap.to(".why-star", {
        rotate: "+=8",
        y: "+=12",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-12 overflow-hidden bracket-frame"
      style={{ background: "var(--accent)", color: "var(--fg)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="why-eyebrow font-mono text-[12px] tracking-[0.32em] uppercase mb-10">
          03b · why gen-z
        </div>

        <h2 className="why-headline font-display italic text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-5xl">
          A star that moves, sticks, multiplies.
        </h2>

        <p className="why-body mt-12 max-w-3xl text-lg md:text-xl leading-relaxed font-sans">
          The star isn&apos;t one logo — it&apos;s a kit. One mark scales from
          app icon to billboard; the same shape becomes a sticker, a tee print,
          a TikTok end-card, a roundel, a wordmark punctuation. Heavy outline +
          offset shadow + bouncy motion gives it the social-native energy a
          luxury serif can&apos;t reach on its own.
        </p>
      </div>

      {/* Big star, bottom-right corner */}
      <div className="why-star absolute bottom-12 right-12 md:bottom-16 md:right-20 pointer-events-none">
        <Sparkle
          size={160}
          fill="var(--accent4)"
          stroke="var(--fg)"
          strokeWidth={5}
        />
      </div>
    </section>
  );
};
