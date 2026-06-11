import { type ReactNode } from "react";
import { Video, Image as ImageIcon, FileText, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FileType = "image" | "video" | "document" | "link";

const ICON_MAP: Record<FileType, ReactNode> = {
  image: <ImageIcon className="w-3 h-3" />,
  video: <Video className="w-3 h-3" />,
  document: <FileText className="w-3 h-3" />,
  link: <LinkIcon className="w-3 h-3" />,
};

type FileChipProps = {
  /** Display filename or URL label */
  name: string;
  /** Type determines the icon */
  type?: FileType;
  /** Optional onClick — when set, renders as button-like span with role=link */
  onOpen?: () => void;
  /** Optional href — when set, renders as <a> */
  href?: string;
  className?: string;
};

/**
 * FileChip — attachment label used in chat messages, milestone cards,
 * brief drops, etc. Shows a small icon based on type plus the filename.
 *
 * Usage:
 *   <FileChip name="brief.pdf" type="document" onOpen={openFile} />
 *   <FileChip name="draft.mp4" type="video" href={fileUrl} />
 *   <FileChip name="cover.jpg" type="image" />
 */
export const FileChip = ({
  name,
  type = "document",
  onOpen,
  href,
  className,
}: FileChipProps) => {
  const baseClass = cn(
    "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-(--radius-sm) bg-(--color-panel) border-[1.5px] border-(--color-border) font-mono text-[10px] tracking-wider transition-colors hover:border-(--color-fg)",
    (onOpen || href) && "cursor-pointer",
    className,
  );

  const inner = (
    <>
      {ICON_MAP[type]}
      <span className="truncate max-w-[18ch]">{name}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClass} aria-label={`Open ${name}`} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }

  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} className={baseClass} aria-label={`Open ${name}`}>
        {inner}
      </button>
    );
  }

  return (
    <span className={baseClass} aria-label={name}>
      {inner}
    </span>
  );
};
