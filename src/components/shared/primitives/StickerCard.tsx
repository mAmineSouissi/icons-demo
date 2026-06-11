import { forwardRef, type ReactNode, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type StickerRadius = "sm" | "md" | "lg" | "pill";
type StickerTone = "default" | "accent" | "accent2" | "panel" | "fg" | "bg";

const RADIUS_MAP: Record<StickerRadius, string> = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  pill: "999px",
};

const TONE_BG: Record<StickerTone, string> = {
  default: "var(--color-panel)",
  accent: "var(--color-accent)",
  accent2: "var(--color-accent-2)",
  panel: "var(--color-panel)",
  fg: "var(--color-fg)",
  bg: "var(--color-bg)",
};

const TONE_SHADOW: Record<StickerTone, string> = {
  default: "var(--color-accent)",
  accent: "var(--color-fg)",
  accent2: "var(--color-fg)",
  panel: "var(--color-accent)",
  fg: "var(--color-accent)",
  bg: "var(--color-fg)",
};

type StickerCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Border radius preset */
  radius?: StickerRadius;
  /** Background color preset */
  tone?: StickerTone;
  /** Offset shadow size in px; set 0 to disable */
  shadow?: number;
  /** Custom shadow color override (CSS var) */
  shadowColor?: string;
  /** Border width in px */
  borderWidth?: number;
  /** Border color override */
  borderColor?: string;
  /** Inner padding token: sm = 0.75rem, md = 1rem 1.25rem, lg = 1.5rem 2rem */
  padding?: "none" | "sm" | "md" | "lg";
};

const PADDING_MAP = {
  none: "0",
  sm: "0.75rem",
  md: "1rem 1.25rem",
  lg: "1.5rem 2rem",
};

/**
 * StickerCard — the offset-shadow card pattern that defines the brand's
 * sticker visual language. Used for milestone cards, CTAs, callout panels,
 * notification cards, etc.
 *
 * Replaces inline patterns like:
 *   `border: 2px solid var(--color-fg); border-radius: 14px;
 *    box-shadow: 3px 3px 0 0 var(--color-accent)`
 *
 * Usage:
 *   <StickerCard>Default panel card</StickerCard>
 *   <StickerCard tone="accent" radius="lg">Hero CTA</StickerCard>
 *   <StickerCard radius="pill" padding="sm" shadow={2}>Mini pill</StickerCard>
 */
export const StickerCard = forwardRef<HTMLDivElement, StickerCardProps>(
  function StickerCard(
    {
      children,
      radius = "md",
      tone = "default",
      shadow = 3,
      shadowColor,
      borderWidth = 2,
      borderColor = "var(--color-fg)",
      padding = "md",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const resolvedShadow = shadowColor ?? TONE_SHADOW[tone];

    const finalStyle: CSSProperties = {
      borderRadius: RADIUS_MAP[radius],
      background: TONE_BG[tone],
      border: `${borderWidth}px solid ${borderColor}`,
      boxShadow: shadow > 0 ? `${shadow}px ${shadow}px 0 0 ${resolvedShadow}` : undefined,
      padding: PADDING_MAP[padding],
      ...style,
    };

    return (
      <div ref={ref} className={cn(className)} style={finalStyle} {...rest}>
        {children}
      </div>
    );
  },
);
