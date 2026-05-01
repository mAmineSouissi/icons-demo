"use client";

import { useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CardItemProps {
  className?: string;
  title?: string;
  badge?: string;
  description?: string;
  src?: string;
  bgColor?: string;
  textColor?: string;
  accent?: string;
}

export const CardItem = ({
  className,
  title,
  badge,
  description,
  src,
  bgColor,
  textColor,
}: CardItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rxTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const ryTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const scaleTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    rxTo.current = gsap.quickTo(cardRef.current, "rotationY", {
      duration: 0.5,
      ease: "power3",
    });
    ryTo.current = gsap.quickTo(cardRef.current, "rotationX", {
      duration: 0.5,
      ease: "power3",
    });
    scaleTo.current = gsap.quickTo(cardRef.current, "scale", {
      duration: 0.4,
      ease: "power3",
    });
    gsap.set(cardRef.current, {
      transformPerspective: 900,
      transformOrigin: "center center",
    });
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !rxTo.current || !ryTo.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rx = ((e.clientY - centerY) / (rect.height / 2)) * -8; // tilt X
    const ry = ((e.clientX - centerX) / (rect.width / 2)) * 8; // tilt Y
    rxTo.current(ry);
    ryTo.current(rx);
    scaleTo.current?.(1.02);
  }, []);

  const handleMouseLeave = useCallback(() => {
    rxTo.current?.(0);
    ryTo.current?.(0);
    scaleTo.current?.(1);
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={cn(
          "h-[400px]! rounded-md! shadow-2xl! my-2! group border-0 -pr-4 pl-4",
          textColor,
          className,
        )}
        style={{ backgroundColor: bgColor }}
      >
        <CardContent className="flex flex-row items-center h-full w-full gap-3 px-6 justify-between">
          {/* Left side */}
          <div className="flex flex-col justify-between w-1/2 pr-4">
            <div>
              {badge && (
                <span className="inline-flex px-3 py-1 font-medium bg-black/5 dark:bg-white/10">
                  {badge}
                </span>
              )}
              {title && (
                <h2 className="text-3xl font-bold mt-3 mb-3 leading-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm leading-relaxed opacity-85">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Right side — image */}
          <div className="w-fit relative overflow-hidden rounded-md bg-black/5 dark:bg-white/5">
            <div className="relative w-[270px] flex items-center justify-center p-4">
              {src && (
                <img
                  src={src}
                  alt={title ?? ""}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.05] drop-shadow-md rounded-md"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
