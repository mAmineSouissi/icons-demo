"use client";

import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import Header from "./navbar/Header";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setSpinning(true);
    setTheme(theme === "dark" ? "light" : "dark");
    setTimeout(() => setSpinning(false), 400);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed bottom-7 left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
      style={{
        background: isDark ? "var(--color-accent)" : "var(--color-fg)",
        color: isDark ? "#000" : "var(--color-bg)",
        boxShadow: isDark
          ? "0 0 0 1px color-mix(in srgb, var(--color-accent) 40%, transparent), 0 4px 20px color-mix(in srgb, var(--color-accent) 30%, transparent)"
          : "0 0 0 1px color-mix(in srgb, var(--color-border) 60%, transparent), 0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          transition:
            "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s",
          transform: spinning
            ? "rotate(180deg) scale(0.6)"
            : "rotate(0deg) scale(1)",
          opacity: spinning ? 0 : 1,
        }}
      >
        {isDark ? (
          <Sun className="w-4.5 h-4.5" strokeWidth={2} />
        ) : (
          <Moon className="w-4.5 h-4.5" strokeWidth={2} />
        )}
      </span>
    </button>
  );
}

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
      <Header />
      <main className={cn("relative z-10 pt-24")}>{children}</main>
      <Footer />
      <FloatingThemeToggle />
    </div>
  );
}
