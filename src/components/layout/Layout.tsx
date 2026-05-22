"use client";

import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import Header from "./navbar/Header";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen relative bg-(--color-bg) text-(--color-fg)",
        className,
      )}
    >
      {/* Skip-to-content — visually hidden until focused by keyboard */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.2em]"
        style={{ background: "var(--color-accent)", color: "#000", border: "2px solid #000" }}
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={cn("relative z-10 pt-24")}>{children}</main>
      <Footer />
    </div>
  );
}
