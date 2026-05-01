"use client";

import { useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const AboutUsCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Image: mask reveal from left
      tl.from(".about-image-wrap", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
        ease: "power4.inOut",
      });

      tl.from(
        ".about-image",
        { scale: 1.3, duration: 1.2, ease: "power3.out" },
        "-=0.8",
      );

      // Content: staggered entrance from right
      tl.from(
        ".about-content-item",
        {
          x: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.6",
      );

      // Button magnetic hover
      if (btnRef.current) {
        btnYTo.current = gsap.quickTo(btnRef.current, "y", {
          duration: 0.3,
          ease: "power3",
        });
      }
    },
    { scope: cardRef },
  );

  const handleBtnEnter = useCallback(() => {
    btnYTo.current?.(-4);
  }, []);
  const handleBtnLeave = useCallback(() => {
    btnYTo.current?.(0);
  }, []);

  return (
    <Card ref={cardRef} className="bg-transparent border-none overflow-hidden">
      <CardContent>
        <div className="flex flex-row items-stretch">
          {/* Left image — mask reveal */}
          <div className="about-image-wrap w-1/2 relative overflow-hidden rounded-md">
            <div className="w-full h-full">
              <Image
                src="/about.jpg"
                alt="About Us"
                width={1000}
                height={700}
                className="about-image w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right content */}
          <div className="w-1/2 p-4 flex flex-col justify-center text-left gap-4">
            <span className="about-content-item text-[3rem] text-accent-2 dark:text-accent">
              About Us
            </span>
            <h3 className="about-content-item text-[2.5rem] lg:text-5xl font-extrabold text-accent-2 dark:text-accent leading-tight">
              We Always Make The Best
            </h3>
            <p className="about-content-item text-base leading-relaxed text-muted-foreground dark:text-(--color-fg)">
              We believe in the power of authentic storytelling. Our platform
              bridges the gap between creative talent and brand vision,
              fostering partnerships that create meaningful content and drive
              real business results.
            </p>

            <p className="about-content-item text-base leading-relaxed text-muted-foreground dark:text-(--color-fg)">
              With a global network of creators and brands, we're building the
              future of user-generated content marketing — focused on quality,
              creativity, and measurable impact.
            </p>

            <div className="about-content-item mt-4">
              <button
                ref={btnRef}
                onMouseEnter={handleBtnEnter}
                onMouseLeave={handleBtnLeave}
                className="inline-block bg-accent-2 dark:bg-accent text-foreground px-8 py-3 rounded-full font-medium shadow-lg"
                style={{ willChange: "transform" }}
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
