import { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Preloader } from "@/components/shared/Preloader";
import { HeroCampaign } from "@/components/home/Contents/campaign/HeroCampaign";
import { AppTilesScene } from "@/components/home/Contents/campaign/AppTilesScene";
import { WhyGenZ } from "@/components/home/Contents/campaign/WhyGenZ";
import { HowSticker } from "@/components/home/Contents/campaign/HowSticker";
import { BrandsValueSection } from "@/components/home/Contents/campaign/BrandsValueSection";
import { CtaSticker } from "@/components/home/Contents/campaign/CtaSticker";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const HomePage = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className="relative bg-(--color-bg) text-(--color-fg)"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <HeroCampaign />
        <AppTilesScene />
        <WhyGenZ />
        <BrandsValueSection />
        <HowSticker />
        <CtaSticker />
      </div>
    </>
  );
};
