import { type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

type MonoLabelSize = "xs" | "sm" | "md";

const SIZE_STYLES: Record<MonoLabelSize, string> = {
  xs: "text-[9px] tracking-[0.15em]",
  sm: "text-[10px] tracking-[0.18em]",
  md: "text-[11px] tracking-[0.12em]",
};

type MonoLabelProps = {
  children: ReactNode;
  size?: MonoLabelSize;
  as?: ElementType;
  weight?: "normal" | "semibold" | "bold";
  opacity?: number; // 0-100
  className?: string;
};

/**
 * MonoLabel — the uppercase mono micro-label used everywhere for system chrome,
 * eyebrows, chip labels, timestamps. Replaces ~200 occurrences of
 *   `font-mono text-[10px] uppercase tracking-[...]`
 *
 * Usage:
 *   <MonoLabel>✦ 3 campaign conversations</MonoLabel>
 *   <MonoLabel size="xs" opacity={45}>{time}</MonoLabel>
 *   <MonoLabel as="span" weight="semibold">{name}</MonoLabel>
 */
export const MonoLabel = ({
  children,
  size = "sm",
  as: Component = "span",
  weight = "normal",
  opacity,
  className,
}: MonoLabelProps) => (
  <Component
    className={cn(
      "font-mono uppercase leading-none",
      SIZE_STYLES[size],
      weight === "semibold" && "font-semibold",
      weight === "bold" && "font-bold",
      className,
    )}
    style={opacity !== undefined ? { opacity: opacity / 100 } : undefined}
  >
    {children}
  </Component>
);
