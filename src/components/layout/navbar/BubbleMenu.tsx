"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  logo: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  pillBg?: string;
  pillColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: "home",
    href: "/",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#F5C518", textColor: "#000" },
  },
  {
    label: "creators",
    href: "/creators",
    ariaLabel: "Creators",
    rotation: -4,
    hoverStyles: { bgColor: "#151020", textColor: "#fff" },
  },
  {
    label: "brands",
    href: "/brands",
    ariaLabel: "Brands",
    rotation: 4,
    hoverStyles: { bgColor: "#1a1030", textColor: "#fff" },
  },
  {
    label: "about",
    href: "/about",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#0e1a20", textColor: "#fff" },
  },
  {
    label: "contact",
    href: "/contact",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#1a1010", textColor: "#fff" },
  },
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuBg = "#fff",
  menuContentColor = "#111",
  pillBg,
  pillColor,
  useFixedPosition = false,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const router = useRouter();

  // ── Close on route change ──────────────────────────────────────────────────
  useEffect(() => {
    const close = () => setIsMenuOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
    "left-0 right-0 top-8",
    "flex items-center justify-between",
    "gap-4 px-8",
    "pointer-events-none",
    "z-[1001]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  // ── Open / close animations ────────────────────────────────────────────────
  useEffect(() => {
    if (isMenuOpen) {
      // rAF ensures the overlay div is painted before GSAP measures/animates it
      const raf = requestAnimationFrame(() => {
        const overlay = overlayRef.current;
        const bubbles = bubblesRef.current.filter(Boolean);
        const labels = labelRefs.current.filter(Boolean);
        if (!overlay || !bubbles.length) return;

        gsap.killTweensOf([...bubbles, ...labels]);
        gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(labels, { y: 24, autoAlpha: 0 });

        gsap.to(bubbles, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
          stagger: { each: staggerDelay, from: "start" },
        });

        if (labels.length) {
          gsap.to(labels, {
            y: 0,
            autoAlpha: 1,
            duration: animationDuration,
            ease: "power3.out",
            stagger: { each: staggerDelay, from: "start" },
            delay: animationDuration * 0.1,
          });
        }
      });
      return () => cancelAnimationFrame(raf);
    } else if (showOverlay) {
      const bubbles = bubblesRef.current.filter(Boolean);
      const labels = labelRefs.current.filter(Boolean);
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power3.in",
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => setShowOverlay(false),
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  // ── Recalculate rotation on resize ────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (!isMenuOpen) return;
      const bubbles = bubblesRef.current.filter(Boolean);
      const isDesktop = window.innerWidth >= 900;
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        if (bubble && item) {
          gsap.set(bubble, { rotation: isDesktop ? (item.rotation ?? 0) : 0 });
        }
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      {/* ── Inline styles for CSS-only hover / responsive rules ── */}
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

      {/* ── Nav bar (logo + toggle) ── */}
      <nav
        className={containerClassName}
        style={style}
        aria-label="Main navigation"
      >
        {/* Logo bubble */}
        <div
          className="bubble logo-bubble inline-flex items-center justify-center rounded-full pointer-events-auto h-12 md:h-14 px-4 md:px-8 gap-2 will-change-transform"
          aria-label="Logo"
          style={{
            background: menuBg,
            minHeight: "48px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center w-[120px] h-full"
          >
            {typeof logo === "string" ? (
              <img
                src={logo}
                alt="Logo"
                className="bubble-logo max-h-[60%] max-w-full object-contain block"
              />
            ) : (
              logo
            )}
          </Link>
        </div>

        {/* Toggle bubble */}
        <button
          type="button"
          className={[
            "bubble toggle-bubble menu-btn",
            isMenuOpen ? "open" : "",
            "inline-flex flex-col items-center justify-center",
            "rounded-full",
            "pointer-events-auto w-12 h-12 md:w-14 md:h-14",
            "border-0 cursor-pointer p-0 will-change-transform",
          ].join(" ")}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{
            background: menuBg,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          }}
        >
          <span
            className="menu-line block mx-auto rounded-[2px]"
            style={{
              width: 26,
              height: 2,
              background: menuContentColor,
              transform: isMenuOpen ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="menu-line short block mx-auto rounded-[2px]"
            style={{
              marginTop: "6px",
              width: 26,
              height: 2,
              background: menuContentColor,
              transform: isMenuOpen
                ? "translateY(-4px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </nav>

      {/* ── Full-screen overlay ── */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className={[
            "bubble-menu-items",
            "fixed",
            "inset-0",
            "flex items-center justify-center",
            "pointer-events-none",
            "z-[1000]",
          ].join(" ")}
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          aria-hidden={!isMenuOpen}
        >
          <ul
            className="pill-list list-none m-0 px-6 w-full max-w-[1600px] mx-auto flex flex-wrap gap-x-0 gap-y-1 pointer-events-auto"
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                role="none"
                ref={(el) => {
                  if (el) bubblesRef.current[idx] = el;
                }}
                className="pill-col flex justify-center items-stretch [flex:0_0_calc(100%/3)] box-border"
              >
                <Link
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link w-full rounded-[999px] no-underline shadow-[0_4px_14px_rgba(0,0,0,0.10)] flex items-center justify-center relative transition-[background,color] duration-300 ease-in-out box-border whitespace-nowrap overflow-hidden"
                  style={
                    {
                      ["--item-rot"]: `${item.rotation ?? 0}deg`,
                      ["--pill-bg"]: pillBg ?? menuBg,
                      ["--pill-color"]: pillColor ?? menuContentColor,
                      ["--hover-bg"]: item.hoverStyles?.bgColor ?? "#f3f4f6",
                      ["--hover-color"]:
                        item.hoverStyles?.textColor ??
                        pillColor ??
                        menuContentColor,
                      background: "var(--pill-bg)",
                      color: "var(--pill-color)",
                      minHeight: "var(--pill-min-h, 160px)",
                      padding: "clamp(1.5rem, 3vw, 8rem) 0",
                      fontSize: "clamp(1.5rem, 4vw, 4rem)",
                      fontWeight: 400,
                      lineHeight: 0,
                      willChange: "transform",
                      height: 10,
                    } as CSSProperties
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span
                    className="pill-label inline-block"
                    style={{
                      willChange: "transform, opacity",
                      height: "1.2em",
                      lineHeight: 1.2,
                    }}
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
