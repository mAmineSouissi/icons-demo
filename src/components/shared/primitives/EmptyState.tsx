import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "./MonoLabel";

type EmptyStateProps = {
  /** Optional icon node — usually a Lucide icon */
  icon?: ReactNode;
  /** Main heading line (uses font-display italic) */
  title: string;
  /** Optional sub-label (rendered as MonoLabel below the title) */
  caption?: string;
  /** Optional CTA passed as a node, rendered below caption */
  action?: ReactNode;
  /** Visual size; controls padding + icon scale */
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_STYLES = {
  sm: { wrap: "p-6 gap-2", title: "text-base md:text-lg", iconSize: "w-7 h-7" },
  md: { wrap: "p-12 gap-3", title: "text-xl md:text-2xl", iconSize: "w-10 h-10" },
  lg: { wrap: "p-16 md:p-24 gap-4", title: "text-2xl md:text-3xl", iconSize: "w-14 h-14" },
};

/**
 * EmptyState — used when a list, panel, or feed has nothing to show.
 * Renders centered icon + display-italic title + optional caption + action.
 *
 * Usage:
 *   <EmptyState
 *     icon={<MessageSquare />}
 *     title="Select a conversation"
 *     caption="3 active campaign threads"
 *   />
 *
 *   <EmptyState
 *     icon={<Inbox />}
 *     title="No campaigns yet"
 *     caption="Your applied briefs will appear here"
 *     action={<Link href="/briefs" className="btn-primary">Browse briefs</Link>}
 *     size="lg"
 *   />
 */
export const EmptyState = ({
  icon,
  title,
  caption,
  action,
  size = "md",
  className,
}: EmptyStateProps) => {
  const styles = SIZE_STYLES[size];
  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-center justify-center text-center",
        styles.wrap,
        className,
      )}
    >
      {icon && (
        <div className={cn("opacity-30", styles.iconSize)} aria-hidden="true">
          {icon}
        </div>
      )}
      <p className={cn("font-display italic leading-tight", styles.title)}>{title}</p>
      {caption && (
        <MonoLabel size="sm" opacity={50}>
          {caption}
        </MonoLabel>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};
