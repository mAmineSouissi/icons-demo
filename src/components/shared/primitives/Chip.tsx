import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ChipVariant = "default" | "active" | "done" | "outline" | "solid";
type ChipSize = "xs" | "sm" | "md";

const VARIANT_STYLES: Record<ChipVariant, string> = {
  default: "border-(--color-border) text-(--color-fg)",
  active: "border-(--color-fg) bg-(--color-fg) text-(--color-bg)",
  done: "border-(--color-border) text-(--color-fg) opacity-50",
  outline: "border-(--color-fg) text-(--color-fg) bg-transparent",
  solid: "border-(--color-accent) bg-(--color-accent) text-(--color-fg)",
};

const SIZE_STYLES: Record<ChipSize, string> = {
  xs: "text-[8px] tracking-[0.15em] px-2 py-0.5",
  sm: "text-[10px] tracking-[0.12em] px-3 py-1",
  md: "text-[11px] tracking-[0.1em] px-3.5 py-1.5",
};

type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  children: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  /** Show as link-like (non-button). Renders <span> instead. */
  asSpan?: boolean;
  /** Optional leading icon node */
  icon?: ReactNode;
};

/**
 * Chip — pill-shaped label/button. Used for milestone status, filter pills,
 * brand tags, content categories. Replaces ad-hoc patterns like:
 *   `font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border`
 *
 * Usage:
 *   <Chip>Brief</Chip>
 *   <Chip variant="active">● Draft</Chip>
 *   <Chip variant="done">✓ Matched</Chip>
 *   <Chip onClick={fn} variant="solid">Apply</Chip>
 *   <Chip asSpan icon={<Star />}>Featured</Chip>
 */
export const Chip = forwardRef<HTMLButtonElement | HTMLSpanElement, ChipProps>(
  function Chip(
    { children, variant = "default", size = "sm", asSpan, icon, className, ...rest },
    ref,
  ) {
    const baseClass = cn(
      "inline-flex items-center gap-1 font-mono uppercase rounded-full border whitespace-nowrap transition-colors",
      SIZE_STYLES[size],
      VARIANT_STYLES[variant],
      !asSpan && "cursor-pointer hover:border-(--color-fg)",
      className,
    );

    if (asSpan) {
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className={baseClass}>
          {icon}
          {children}
        </span>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={baseClass}
        {...rest}
      >
        {icon}
        {children}
      </button>
    );
  },
);
