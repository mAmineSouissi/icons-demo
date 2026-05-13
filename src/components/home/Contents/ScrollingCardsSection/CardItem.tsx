"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Badge } from "@/components/ui/badge";

interface CardItemProps {
  className?: string;
  title?: string;
  badge?: string;
  description?: string;
  src?: string;
  bgColor?: string;
  accent?: string;
}

export const CardItem = ({
  className,
  title,
  badge,
  description,
  src,
}: CardItemProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const rxTo = React.useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const ryTo = React.useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const scaleTo = React.useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  const glowRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    rxTo.current = gsap.quickTo(cardRef.current, "rotationY", {
      duration: 0.5,
      ease: "power3.out",
    });

    ryTo.current = gsap.quickTo(cardRef.current, "rotationX", {
      duration: 0.5,
      ease: "power3.out",
    });

    scaleTo.current = gsap.quickTo(cardRef.current, "scale", {
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.set(cardRef.current, {
      transformPerspective: 1200,
      transformOrigin: "center center",
      transformStyle: "preserve-3d",
    });
  });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !rxTo.current || !ryTo.current) return;

      const rect = cardRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rx = ((e.clientY - centerY) / (rect.height / 2)) * -10;
      const ry = ((e.clientX - centerX) / (rect.width / 2)) * 10;

      rxTo.current(ry);
      ryTo.current(rx);

      scaleTo.current?.(1.025);

      // dynamic glow
      if (glowRef.current) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        glowRef.current.style.background = `
          radial-gradient(
            circle at ${x}px ${y}px,
            rgba(255,255,255,0.22),
            transparent 35%
          )
        `;
      }
    },
    [],
  );

  const handleMouseLeave = React.useCallback(() => {
    rxTo.current?.(0);
    ryTo.current?.(0);
    scaleTo.current?.(1);

    if (glowRef.current) {
      glowRef.current.style.background = "transparent";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full"
    >
      <Card
        className={cn(
          `
          relative
          overflow-hidden
          h-full
          border
          border-white/10
          dark:border-white/5
          bg-white/55
          dark:bg-[#123943]/55
          backdrop-blur-2xl
          shadow-[0_10px_40px_rgba(15,65,74,0.12)]
          dark:shadow-[0_10px_50px_rgba(0,0,0,0.45)]
          rounded-[2rem]
          transition-all
          duration-500
          group
        `,
          className,
        )}
      >
        {/* atmospheric gradient */}
        <div
          className="
            absolute inset-0 opacity-90 pointer-events-none
          "
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(239,232,223,0.72) 0%,
                rgba(216,186,152,0.32) 45%,
                rgba(150,192,206,0.22) 100%
              )
            `,
          }}
        />

        {/* dark atmospheric layer */}
        <div
          className="
            absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none
          "
          style={{
            background: `
              linear-gradient(
                145deg,
                rgba(15,65,74,0.82) 0%,
                rgba(21,78,89,0.78) 55%,
                rgba(127,3,3,0.22) 100%
              )
            `,
          }}
        />

        {/* moving glow */}
        <div
          ref={glowRef}
          className="
            absolute inset-0
            opacity-70
            transition-opacity
            duration-300
            pointer-events-none
          "
        />

        {/* border shine */}
        <div
          className="
            absolute inset-0 rounded-[2rem]
            border border-white/20
            dark:border-white/10
            pointer-events-none
          "
        />

        {/* top highlight */}
        <div
          className="
            absolute top-0 inset-x-0 h-[1px]
            bg-gradient-to-r
            from-transparent
            via-white/70
            to-transparent
            dark:via-white/20
          "
        />

        <CardContent
          className="
            relative z-10

            flex flex-row items-center
            justify-between

            gap-4

            px-8 py-8

            h-full
          "
        >
          {/* LEFT */}
          <div
            className="
              flex flex-col justify-between
              w-[60%]
              h-full
            "
            style={{
              transform: "translateZ(40px)",
            }}
          >
            <div className="space-y-3">
              {badge && (
                <Badge
                  variant="outline"
                  className="
                    rounded-full

                    border-[#7F0303]/20
                    bg-[#7F0303]/10

                    text-[#7F0303]

                    dark:border-[#96C0CE]/20
                    dark:bg-[#96C0CE]/10
                    dark:text-[#96C0CE]

                    px-4 py-1
                    text-xs
                    tracking-[0.18em]
                    uppercase
                  "
                >
                  {badge}
                </Badge>
              )}

              {title && (
                <h2
                  className="
                    text-[clamp(1.8rem,3.5vw,3.5rem)]
                    leading-[1.1]
                    font-black
                    tracking-[-0.04em]
                    text-[#0F414A]
                    dark:text-[#EFE8DF]"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  className="
                    text-[15px]
                    leading-relaxed

                    text-[#35535B]
                    dark:text-[#D8BA98]/85
                  "
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="relative w-[320px] h-[320px] flex items-center justify-center rounded-[2rem] overflow-hidden bg-white/25 dark:bg-black/20"
            style={{
              transform: "translateZ(60px)",
            }}
          >
            {src && (
              <img
                src={src}
                alt={title ?? ""}
                className="
                  relative z-10

                  h-full
                  w-full

                  object-contain

                  transition-transform
                  duration-700

                  group-hover:scale-[1.04]
                "
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
