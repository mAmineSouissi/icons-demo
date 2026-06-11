import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const FONT_SIZE: Record<AvatarSize, string> = {
  xs: "0.65rem",
  sm: "0.8rem",
  md: "1rem",
  lg: "1.4rem",
  xl: "2rem",
};

type AvatarProps = {
  /** Single letter or short initials (first 2 chars used) */
  initial?: string;
  /** Optional image src — overrides initial */
  src?: string;
  alt?: string;
  size?: AvatarSize;
  /** background color CSS var; default accent */
  tint?: string;
  /** Override border color CSS var; default fg */
  borderColor?: string;
  /** Custom border width in px; default 2 */
  borderWidth?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Avatar — circular badge with letter, used for chat threads, profile cards,
 * sidebar user pills, message author indicators. Border + colored fill matches
 * the sticker design language.
 *
 * Usage:
 *   <Avatar initial="C" size="md" />
 *   <Avatar src={user.photo} alt={user.name} size="lg" />
 *   <Avatar initial="MR" tint="var(--color-accent-2)" />
 */
export const Avatar = ({
  initial = "?",
  src,
  alt = "",
  size = "md",
  tint = "var(--color-accent)",
  borderColor = "var(--color-fg)",
  borderWidth = 2,
  className,
  style,
}: AvatarProps) => {
  const px = SIZE_PX[size];
  const baseStyle: CSSProperties = {
    width: px,
    height: px,
    border: `${borderWidth}px solid ${borderColor}`,
    background: src ? "transparent" : tint,
    fontSize: FONT_SIZE[size],
    ...style,
  };

  if (src) {
    return (
      <span
        className={cn("relative inline-block rounded-full overflow-hidden shrink-0", className)}
        style={baseStyle}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full shrink-0 font-display italic font-bold leading-none select-none",
        className,
      )}
      style={baseStyle}
      aria-hidden={!alt}
      aria-label={alt || undefined}
    >
      {initial.slice(0, 2).toUpperCase()}
    </span>
  );
};
