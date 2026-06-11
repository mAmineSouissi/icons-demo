import { useEffect, useState, useCallback, createContext, useContext, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/* ============================================================
   Inline Toast (no portal, lives inside a relative container)
   Use this for in-panel feedback like the chat composer.
   ============================================================ */

type ToastTone = "default" | "success" | "warning" | "danger";

const TONE_STYLES: Record<ToastTone, string> = {
  default: "bg-(--color-fg) text-(--color-bg)",
  success: "bg-(--color-accent) text-(--color-fg) border-2 border-(--color-fg)",
  warning: "bg-(--color-accent-2) text-(--color-fg) border-2 border-(--color-fg)",
  danger: "bg-red-500 text-white",
};

type InlineToastProps = {
  message: string | null;
  tone?: ToastTone;
  /** Auto-dismiss timeout in ms. Set 0 to disable. */
  duration?: number;
  onDismiss?: () => void;
  /** Where the toast docks relative to its container */
  position?: "bottom-center" | "top-center" | "bottom-right";
  className?: string;
};

const POSITION_STYLES = {
  "bottom-center": "bottom-20 left-1/2 -translate-x-1/2",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-6 right-6",
};

/**
 * InlineToast — small confirmation pill that appears within a container.
 * Use for feedback that should stay close to the action (e.g. chat composer,
 * form submit). Auto-dismisses after `duration` ms.
 *
 * Usage:
 *   const [toast, setToast] = useState<string | null>(null);
 *   <InlineToast message={toast} onDismiss={() => setToast(null)} />
 *   // ...then setToast("Message sent")
 */
export const InlineToast = ({
  message,
  tone = "default",
  duration = 1600,
  onDismiss,
  position = "bottom-center",
  className,
}: InlineToastProps) => {
  useEffect(() => {
    if (!message || !duration) return;
    const id = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(id);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "absolute z-20 pointer-events-none font-mono text-[10px] uppercase tracking-[0.15em] px-4 py-2 rounded-full whitespace-nowrap",
        TONE_STYLES[tone],
        POSITION_STYLES[position],
        "animate-toast-in",
        className,
      )}
      style={{
        animation: "toast-in 0.3s ease-out, toast-out 0.3s ease-in forwards",
        animationDelay: `0s, ${(duration - 300) / 1000}s`,
      }}
    >
      {message}
    </div>
  );
};

/* ============================================================
   Global Toast — portal-based, app-wide queue with provider
   Use this for cross-cutting feedback (e.g. "Saved!", "Failed").
   ============================================================ */

type ToastItem = {
  id: string;
  message: string;
  tone: ToastTone;
};

type ToastContextValue = {
  show: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/** Hook for triggering global toasts from anywhere inside <ToastProvider>. */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const show = useCallback((message: string, tone: ToastTone = "default") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2 pointer-events-none">
            {toasts.map((t) => (
              <div
                key={t.id}
                role="status"
                aria-live="polite"
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.15em] px-4 py-2 rounded-full whitespace-nowrap shadow-lg",
                  TONE_STYLES[t.tone],
                )}
                style={{ animation: "toast-in 0.3s ease-out" }}
              >
                {t.message}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};
