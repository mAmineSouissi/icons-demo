import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SparkleProps {
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  highlight?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * The brand mark — a four-point sparkle/star with chunky outline and an
 * off-center highlight. This is the core sticker icon from the campaign.
 */
export const Sparkle = ({
  size = 64,
  fill = "var(--accent4)",
  stroke = "var(--fg)",
  strokeWidth = 6,
  highlight = true,
  className,
  style,
}: SparkleProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("block", className)}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M50 4
           C 52 28, 60 38, 96 50
           C 60 62, 52 72, 50 96
           C 48 72, 40 62, 4 50
           C 40 38, 48 28, 50 4 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {highlight && (
        <ellipse
          cx="38"
          cy="32"
          rx="6"
          ry="4.5"
          fill="#ffffff"
          opacity="0.92"
        />
      )}
    </svg>
  );
};
