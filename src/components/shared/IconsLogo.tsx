"use client";

/**
 * IconsLogo — the 03b "Polaris ▸ Gen Z" sticker mark + wordmark.
 *
 * Usage:
 *   <IconsLogo />                        // horizontal lockup (default)
 *   <IconsLogo variant="mark" size={48}/> // star only, e.g. for favicon-style spots
 *   <IconsLogo variant="stacked" />      // wordmark below mark
 *
 * Color props default to currentColor so it inherits from parent CSS,
 * letting it adapt to light/dark theme without two files.
 */

import * as React from "react";

export interface IconsLogoProps {
  variant?: "horizontal" | "stacked" | "mark";
  /** Total height in px. Wordmark scales relative to this. */
  size?: number;
  /** Wordmark color. Defaults to currentColor. */
  color?: string;
  /** Star fill. */
  starColor?: string;
  /** Star/wordmark outline. */
  outline?: string;
  className?: string;
}

export function IconsLogo({
  variant = "horizontal",
  size = 40,
  color = "currentColor",
  starColor = "#F5C518",
  outline = "#0a0a0a",
  className,
}: IconsLogoProps) {
  if (variant === "mark") {
    return <StarMark size={size} fill={starColor} outline={outline} className={className} />;
  }

  if (variant === "stacked") {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: size * 0.08,
        }}
      >
        <StarMark size={size * 1.1} fill={starColor} outline={outline} />
        <Wordmark size={size * 0.55} color={color} />
      </span>
    );
  }

  // horizontal — IC ★ NS
  const fontSize = size * 0.95;
  const starSize = size * 0.85;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.03,
        fontFamily:
          '"Bricolage Grotesque", "Archivo Black", system-ui, -apple-system, sans-serif',
        fontWeight: 800,
        fontStyle: "italic",
        fontSize,
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        color,
        whiteSpace: "nowrap",
      }}
      aria-label="ICONS"
    >
      <span aria-hidden>IC</span>
      <StarMark size={starSize} fill={starColor} outline={outline} />
      <span aria-hidden>NS</span>
    </span>
  );
}

/* ----- Star sticker (4-point sparkle, outline + offset shadow + glint) ----- */
export function StarMark({
  size = 40,
  fill = "#F5C518",
  outline = "#0a0a0a",
  className,
}: {
  size?: number;
  fill?: string;
  outline?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", overflow: "visible", flexShrink: 0 }}
      className={className}
      aria-hidden
    >
      {/* offset shadow */}
      <path
        d="M 64 19 C 69 49 80 60 110 65 C 80 70 69 81 64 111 C 59 81 48 70 18 65 C 48 60 59 49 64 19 Z"
        fill={outline}
      />
      {/* main star */}
      <path
        d="M 60 14 C 65 44 76 55 106 60 C 76 65 65 76 60 106 C 55 76 44 65 14 60 C 44 55 55 44 60 14 Z"
        fill={fill}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      {/* glint */}
      <ellipse
        cx={48}
        cy={40}
        rx={6}
        ry={9}
        fill="#ffffff"
        opacity={0.75}
        transform="rotate(-25 48 40)"
      />
    </svg>
  );
}

/* ----- HTML wordmark, used by stacked variant ----- */
function Wordmark({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <span
      style={{
        fontFamily:
          '"Bricolage Grotesque", "Archivo Black", system-ui, sans-serif',
        fontWeight: 800,
        fontStyle: "italic",
        fontSize: size,
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        color,
      }}
    >
      ICONS
    </span>
  );
}

export default IconsLogo;
