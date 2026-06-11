import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconButtonSize = "sm" | "md" | "lg";
type IconButtonVariant = "outline" | "solid" | "ghost";

const SIZE_PX: Record<IconButtonSize, number> = {
  sm: 32,
  md: 36,
  lg: 44,
};

const VARIANT_STYLES: Record<IconButtonVariant, string> = {
  outline:
    "border-2 border-(--color-fg) bg-transparent hover:bg-(--color-fg) hover:text-(--color-bg)",
  solid:
    "border-2 border-(--color-fg) bg-(--color-fg) text-(--color-bg) hover:opacity-85",
  ghost:
    "border-2 border-(--color-border) bg-transparent hover:border-(--color-fg)",
};

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Lucide icon element or any ReactNode */
  icon: ReactNode;
  /** Required accessible label */
  "aria-label": string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
};

/**
 * IconButton — circular bordered button for icon-only actions.
 * Used for close, attach, send, back, bell, theme toggle, mobile menu, etc.
 *
 * Always requires an aria-label since there's no text content.
 *
 * Usage:
 *   <IconButton icon={<X />} aria-label="Close" />
 *   <IconButton icon={<Send />} variant="solid" aria-label="Send message" />
 *   <IconButton icon={<Bell />} size="lg" variant="outline" aria-label="Notifications" />
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, size = "md", variant = "outline", className, type = "button", ...rest },
    ref,
  ) {
    const px = SIZE_PX[size];

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-full shrink-0 transition-colors",
          VARIANT_STYLES[variant],
          className,
        )}
        style={{ width: px, height: px }}
        {...rest}
      >
        {icon}
      </button>
    );
  },
);
