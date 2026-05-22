import { Component, type ReactNode } from "react";
import Link from "next/link";
import { Sparkle } from "@/components/ui/Sparkle";

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    // In production, wire to an error reporting service here
    console.error("[Icons] Uncaught error:", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "var(--color-bg)",
          color: "var(--color-fg)",
          textAlign: "center",
          gap: "1.5rem",
        }}
      >
        <Sparkle size={48} fill="var(--color-accent)" className="opacity-30" />
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            opacity: 0.4,
          }}
        >
          ✦ Something went wrong
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 0.95,
          }}
        >
          Unexpected<br />glitch.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            lineHeight: 1.75,
            opacity: 0.55,
            maxWidth: "24rem",
          }}
        >
          Something broke on our end. Try refreshing — if it keeps happening, head back home.
        </p>
        <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => this.setState({ hasError: false, message: "" })}
            className="btn-primary"
          >
            Try again
          </button>
          <Link href="/" className="btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    );
  }
}
