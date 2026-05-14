import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  onThemeChange: (theme: "dark" | "light") => void;
}

export const ThemeToggle = ({ onThemeChange }: ThemeToggleProps) => {
  const [activeTheme, setActiveTheme] = useState<"dark" | "light">("dark");

  const handleToggle = (theme: "dark" | "light") => {
    setActiveTheme(theme);
    onThemeChange(theme);
  };

  return (
    <div className="inline-flex items-center gap-1 glass rounded-full px-2 py-2 border border-(--color-border) shadow-lg">
      <Button
        onClick={() => handleToggle("dark")}
        className="px-8 py-3 rounded-full font-semibold transition-all relative overflow-hidden hover:scale-105 active:scale-95"
      >
        {activeTheme === "dark" && (
          <div className="absolute inset-0 bg-(--color-accent) rounded-full">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}
        <span
          className="relative z-10 font-bold tracking-wide"
          style={{ color: activeTheme === "dark" ? "#000000" : undefined }}
        >
          Creator
        </span>
      </Button>

      <Button
        onClick={() => handleToggle("light")}
        className={cn(
          "px-8 py-3 rounded-full font-semibold transition-all relative overflow-hidden hover:scale-105 active:scale-95",
        )}
      >
        {activeTheme === "light" && (
          <div className="absolute inset-0 bg-(--color-accent-2) rounded-full">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}
        <span
          className="relative z-10 font-bold tracking-wide"
          style={{ color: "#ffffff" }}
        >
          Brand
        </span>
      </Button>
    </div>
  );
};
