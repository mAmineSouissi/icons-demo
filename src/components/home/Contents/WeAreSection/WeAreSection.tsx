"use client";

import { CenterContent } from "./CenterContent";
import { UpperContent } from "./UpperContent";
import { BottomContent } from "./BottomContent";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const WeAreSection = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>(".we-are-block", {
    y: 50,
    stagger: 0.12,
    start: "top 85%",
  });

  return (
    <div
      ref={sectionRef}
      className="flex flex-1 flex-col justify-center items-center content-center"
    >
      <div className="we-are-block w-full">
        <UpperContent />
      </div>
      <div className="we-are-block w-full">
        <CenterContent />
      </div>
      <div className="we-are-block w-full">
        <BottomContent />
      </div>
    </div>
  );
};
