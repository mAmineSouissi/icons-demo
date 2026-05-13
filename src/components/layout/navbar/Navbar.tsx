"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { MagneticButton } from "@/components/shared/MagneticButton";

type NavItem = {
  label: string;
  href: string;
};

export default function Navbar({ items, logo }: { items: NavItem[]; logo: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  return (
    <motion.header
      initial={{ y: 0, width: "100%", borderRadius: "0px", top: 0 }}
      animate={{
        y: scrolled ? 16 : 0,
        width: scrolled ? "90%" : "100%",
        borderRadius: scrolled ? "9999px" : "0px",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed left-0 right-0 mx-auto z-[1000] border border-transparent",
        scrolled ? "bg-(--color-bg)/80 backdrop-blur-lg border-(--color-border) shadow-lg py-3" : "bg-transparent py-6"
      )}
    >
      <div className={cn("mx-auto flex items-center justify-between", scrolled ? "px-6" : "container px-6")}>
        
        {/* Left: Logo + Name */}
        <Link href="/" className="z-50 relative flex items-center gap-3 h-full group">
          {logo}
          <span className="font-bold text-xl tracking-wide text-(--color-fg) group-hover:text-(--color-accent) transition-colors hidden sm:block">
            Icons.
          </span>
        </Link>
        
        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold tracking-[0.1em] uppercase text-(--color-muted) hover:text-(--color-fg) transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-(--color-fg) hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Theme Switcher & Actions */}
        <div className="hidden md:flex items-center gap-4 z-50">
          <ThemeSwitcher />
          <MagneticButton>Get Started</MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3 z-50">
          <ThemeSwitcher />
          <MagneticButton className="px-4 py-1.5 text-xs hidden sm:block">Start</MagneticButton>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-(--color-fg) focus:outline-none p-2 rounded-full hover:bg-(--color-panel) transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 mt-4 mx-4 rounded-3xl bg-(--color-bg)/95 backdrop-blur-2xl border border-(--color-border) shadow-2xl md:hidden overflow-hidden"
          >
            <nav className="px-6 py-8">
              <ul className="flex flex-col gap-6 items-center">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-bold tracking-widest uppercase text-(--color-fg) hover:text-(--color-accent) transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-(--color-border) w-full flex justify-center sm:hidden">
                  <MagneticButton className="w-full text-center">Get Started</MagneticButton>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
