import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkle } from "@/components/ui/Sparkle";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
              `<span class="why-word inline-block align-bottom"><span class="inline-block">${w}&nbsp;</span></span>`,
          )
          .join("");
      }

      gsap.fromTo(".why-word > span",
        { opacity: 0, y: 48, rotate: 6 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: "auto", clearProps: "transform,opacity",
          scrollTrigger: { trigger: ref.current, start: "top 70%" } },
      );

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
          03 · why it works
        </div>

        <h2 className="why-headline font-display italic text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-5xl">
          Authenticity is the only ad format that scales.
        </h2>

        <p className="why-body mt-12 max-w-3xl text-lg md:text-xl leading-relaxed font-sans">
          Gen-Z skips every ad that feels like an ad. Icons creators are already
          living inside the communities your brand wants to reach — their content
          pulls 4.5× more engagement than studio-produced video, at a fraction
          of the cost. No set, no script, no agency markup. Just real people
          who actually use the product.
        </p>

        <div className="why-body mt-10 flex flex-wrap gap-4">
          <Link href="/brands" className="btn-primary">
            Start a campaign
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/creators"
            className="btn-ghost"
            style={{ borderColor: "var(--fg)", color: "var(--fg)" }}
          >
            Join as creator
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
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
