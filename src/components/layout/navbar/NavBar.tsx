"use client";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sun, Moon } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navLinks = [
  { label: "Creators", href: "#" },
  { label: "Brands", href: "#" },
  { label: "Blog", href: "#" },
];

export const Navbar = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  // Hamburger line refs for morph animation
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP morph hamburger ↔ X
  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return;
    if (mobileOpen) {
      gsap.to(line1Ref.current, {
        rotate: 45,
        y: 7,
        duration: 0.3,
        ease: "power3.inOut",
      });
      gsap.to(line2Ref.current, {
        opacity: 0,
        scaleX: 0,
        duration: 0.2,
        ease: "power3.inOut",
      });
      gsap.to(line3Ref.current, {
        rotate: -45,
        y: -7,
        duration: 0.3,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(line1Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power3.inOut",
      });
      gsap.to(line2Ref.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        ease: "power3.inOut",
      });
      gsap.to(line3Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power3.inOut",
      });
    }
  }, [mobileOpen]);

  useGSAP(() => {
    // Entrance
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.9,
      ease: "power4.out",
    });
    gsap.from(".nav-item", {
      y: -8,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.07,
      delay: 0.35,
    });

    const bar = barRef.current;
    const wrap = wrapRef.current;
    if (!bar || !wrap) return;

    // Initial: fully transparent, full width (no side padding)
    gsap.set(bar, {
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "rgba(128,128,128,0)",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
      height: "3.5rem",
    });
    gsap.set(wrap, {
      paddingLeft: "0px",
      paddingRight: "0px",
      marginTop: "0px",
    });

    // On scroll: pill shape, frosted glass, smaller, side margins appear
    ScrollTrigger.create({
      start: "60px top",
      onEnter: () => {
        gsap.to(bar, {
          backgroundColor: "rgba(10,10,12,0.8)",
          borderColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          height: "3rem",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(wrap, {
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          marginTop: "0.75rem",
          duration: 0.4,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(bar, {
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "rgba(128,128,128,0)",
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          height: "3.5rem",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(wrap, {
          paddingLeft: "0px",
          paddingRight: "0px",
          marginTop: "0px",
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });
  });

  // Mobile menu open animation
  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" },
      );
    }
  }, [mobileOpen]);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div ref={navRef} className={cn("fixed top-0 inset-x-0 z-50", className)}>
      {/* Bar wrapper */}
      <div
        ref={wrapRef}
        style={{ paddingLeft: "0px", paddingRight: "0px", marginTop: "0px" }}
      >
        <div
          ref={barRef}
          className="flex items-center justify-between px-6 rounded-md"
          style={{
            height: "3.5rem",
            backgroundColor: "rgba(0,0,0,0)",
            border: "1px solid rgba(128,128,128,0)",
            willChange:
              "background-color, border-color, backdrop-filter, height",
          }}
        >
          {/* Text logo */}
          <Link
            href="/"
            className="nav-item shrink-0 text-xl font-normal leading-none transition-colors duration-200"
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.85)",
            }}
          >
            idols<span style={{ color: "var(--accent)" }}>.</span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="nav-item px-4 py-2 text-sm rounded-md transition-colors duration-200"
                style={{
                  color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = isDark ? "#fff" : "#000")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isDark
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(0,0,0,0.5)")
                }
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="nav-item p-2 rounded-md transition-colors duration-200"
                style={{
                  color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                }}
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}

            <Link
              href="#"
              className="nav-item hidden md:inline-flex items-center text-sm font-medium bg-accent text-black px-5 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
            >
              Join Us
            </Link>

            {/* Morphing hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-0 rounded-md transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <span
                ref={line1Ref}
                className="block w-5 h-[1.5px] origin-center"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(0,0,0,0.7)",
                  marginBottom: "5px",
                }}
              />
              <span
                ref={line2Ref}
                className="block w-5 h-[1.5px] origin-center"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(0,0,0,0.7)",
                }}
              />
              <span
                ref={line3Ref}
                className="block w-5 h-[1.5px] origin-center"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(0,0,0,0.7)",
                  marginTop: "5px",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden rounded-md overflow-hidden"
          style={{
            margin: "0.5rem 1rem 0",
            background: isDark
              ? "rgba(10,10,12,0.97)"
              : "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex flex-col p-3 gap-0.5">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm rounded-md transition-colors duration-200"
                style={{
                  color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                }}
              >
                {label}
              </Link>
            ))}
            <div
              className="mt-2 pt-2"
              style={{
                borderTop: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm font-medium bg-accent text-black px-5 py-3 rounded-md hover:opacity-90 transition-opacity duration-200"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
