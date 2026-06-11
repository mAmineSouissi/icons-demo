/**
 * Shared primitives — reusable building blocks that encode the Icons design
 * language. Prefer these over re-rolling inline patterns.
 *
 * Categories:
 *   • Visual atoms   — MonoLabel, Avatar, Chip, FileChip, IconButton
 *   • Containers     — StickerCard, EmptyState
 *   • Feedback       — InlineToast, ToastProvider + useToast
 *   • Motion         — FadeIn, StaggerChildren, Reveal
 *
 * For higher-level page primitives (PageHero, SectionShell, CTASection),
 * see ../PagePrimitives.tsx.
 */

// Visual atoms
export { MonoLabel } from "./MonoLabel";
export { Avatar } from "./Avatar";
export { Chip } from "./Chip";
export { FileChip } from "./FileChip";
export { IconButton } from "./IconButton";

// Containers
export { StickerCard } from "./StickerCard";
export { EmptyState } from "./EmptyState";

// Feedback
export { InlineToast, ToastProvider, useToast } from "./Toast";

// Motion
export { FadeIn } from "./FadeIn";
export { StaggerChildren } from "./StaggerChildren";
export { Reveal } from "./Reveal";
