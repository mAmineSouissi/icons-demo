"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface WeDoDescriptionProps {
  className?: string;
}

export const WeDoDescription = ({ className }: WeDoDescriptionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".how-title", {
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
      });

      tl.from(
        ".how-subtitle",
        { x: -40, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5",
      );

      tl.from(
        ".how-body",
        { y: 25, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3",
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={cn(
        "w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center",
        className,
      )}
    >
      <h2 className="how-title text-[250px] lg:text-8xl font-bold mb-3 text-primary leading-none">
        So
      </h2>
      <h3 className="how-subtitle text-[35px] lg:text-4xl font-bold mb-4 text-secondary">
        How Do We Make It Happen
      </h3>
      <p className="how-body text-sm lg:text-base opacity-75 leading-relaxed text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        Duis.
      </p>
    </div>
  );
};
