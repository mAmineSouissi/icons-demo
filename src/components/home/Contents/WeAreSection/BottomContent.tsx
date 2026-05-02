"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface BottomContentProps {
  className?: string;
}
export const BottomContent = ({ className }: BottomContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Curtain reveal: clip from left
      gsap.from(ref.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".bottom-text", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("mt-4 bg-black p-6", className)}>
      <p className="bottom-text text-2xl font-extrabold text-black dark:text-white mb-3">
        ICONS IS
      </p>
      <p className="bottom-text text-sm font-bold uppercase text-black dark:text-white leading-relaxed mb-4">
        A CREATIVE PLAYGROUND WHERE IDEAS, STORIES, AND COLLABORATIONS COME TO
        LIFE
      </p>
      <p className="bottom-text text-xs font-bold text-muted-foreground leading-tight mb-3 border-t border-primary pt-3">
        AT ICONS, WE DON'T FAKE IT — WE CREATE IT. BUILDING A SPACE WHERE REAL
        CREATORS AND REAL BRANDS MEET THROUGH GENUINE CONTENT THAT ACTUALLY
        CONNECTS.
      </p>
      <p className="bottom-text text-xs text-muted-foreground leading-relaxed">
        WE'RE NOT HERE FOR PERFECT FILTERS OR FORCED CAMPAIGNS — WE'RE HERE FOR
        STORIES THAT FEEL HUMAN, RAW, AND FULL OF ENERGY.
      </p>
      <p className="bottom-text text-xs text-muted-foreground leading-relaxed mt-2">
        EVERY POST, EVERY COLLAB, EVERY IDEA IS CRAFTED TO SPARK EMOTION, START
        CONVERSATIONS, AND MAKE IMPACT THAT LASTS.
      </p>
    </div>
  );
};
