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
import { BrandSocialProof } from "@/components/home/Contents/campaign/BrandSocialProof";
import { CtaSticker } from "@/components/home/Contents/campaign/CtaSticker";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const HomePage = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      // Skip preloader on return visits within the same browser session
      if (sessionStorage.getItem("icons-intro-seen")) {
        setLoading(false);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    sessionStorage.setItem("icons-intro-seen", "1");
    setLoading(false);
  }, []);

  /* Before mount: render an invisible full-height placeholder so the
     Layout footer doesn't flash at the top of the viewport. */
  if (!mounted) {
    return <div className="min-h-[300svh]" style={{ background: "var(--color-bg)" }} />;
  }

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Pre-hide hero entrance-animated elements via CSS to prevent FOUC
          on return visits (GSAP .from() sets opacity 0 *after* first paint). */}
      <style id="hero-prehide">{`
        .hero-mono, .hero-card, .hero-letter, .hero-star,
        .hero-star-glow, .hero-script, .hero-cta, .hero-floater { opacity: 0; }
      `}</style>

      <div
        className="relative bg-(--color-bg) text-(--color-fg)"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <HeroCampaign />
        <AppTilesScene />
        <WhyGenZ />
        <BrandSocialProof />
        <BrandsValueSection />
        <HowSticker />
        <CtaSticker />
      </div>
    </>
  );
};
