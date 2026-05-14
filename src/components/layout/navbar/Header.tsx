"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dur, ease } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Creators", href: "/creators" },
  { label: "Brands", href: "/brands" },
  { label: "Blog", href: "/blog" },
];

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  // ── Entrance animation ────────────────────────────────────
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".hdr-logo", {
        y: -16,
        opacity: 0,
        duration: dur.base,
        ease: ease.cinematic,
      }).from(
        ".hdr-link",
        {
          y: -12,
          opacity: 0,
          duration: dur.fast,
          ease: ease.out,
          stagger: 0.05,
        },
        "-=0.3",
      );
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50 py-4 px-6 md:px-10"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hdr-logo shrink-0">
          <div className="relative h-8 w-22">
            <Image
              src="/logo_icons.svg"
              alt="Icons"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hdr-link nav-item relative px-3 py-1.5 text-sm font-sans font-medium transition-colors duration-200",
                  isActive ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Underline hover animation */}
      <style jsx>{`
        .nav-item::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 0;
          height: 1.5px;
          background: var(--fg);
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-item:hover::after {
          transform: scaleX(1);
        }
      `}</style>
    </header>
  );
};

export default Header;
