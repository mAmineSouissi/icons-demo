import React from "react";

/* ─── Shared primitives ──────────────────────────────────────── */

function Star4({
  fill = "#C8F135",
  size = 40,
  style,
}: {
  fill?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={style} aria-hidden>
      <path
        d="M50 4 C50 4 58 42 96 50 C58 58 50 96 50 96 C50 96 42 58 4 50 C42 42 50 4 50 4Z"
        fill={fill}
        stroke="#000"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiamondStar({
  fill = "#F5C518",
  gradient = false,
  size = 220,
  style,
}: {
  fill?: string;
  gradient?: boolean;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 300 300" width={size} height={size} style={style} aria-hidden>
      {gradient && (
        <defs>
          <radialGradient id="dsg" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFE566" />
            <stop offset="55%" stopColor="#F5C518" />
            <stop offset="100%" stopColor="#C87800" />
          </radialGradient>
        </defs>
      )}
      <path
        d="M150 12 C150 12 172 128 268 150 C172 172 150 288 150 288 C150 288 128 172 32 150 C128 128 150 12 150 12Z"
        fill={gradient ? "url(#dsg)" : fill}
        stroke="#000"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <ellipse
        cx="108"
        cy="108"
        rx="20"
        ry="32"
        fill="rgba(255,255,255,0.45)"
        transform="rotate(-30 108 108)"
      />
    </svg>
  );
}

function Brackets({ color = "rgba(0,0,0,0.3)" }: { color?: string }) {
  const b = `1.5px solid ${color}`;
  const s = { position: "absolute" as const, width: 20, height: 20, zIndex: 6 };
  return (
    <>
      <div style={{ ...s, top: 14, left: 14, borderTop: b, borderLeft: b }} />
      <div style={{ ...s, top: 14, right: 14, borderTop: b, borderRight: b }} />
      <div style={{ ...s, bottom: 14, left: 14, borderBottom: b, borderLeft: b }} />
      <div style={{ ...s, bottom: 14, right: 14, borderBottom: b, borderRight: b }} />
    </>
  );
}

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)", letterSpacing: "0.12em" };
const DISPLAY: React.CSSProperties = { fontFamily: "var(--font-display)", letterSpacing: "-0.02em" };
const SCRIPT: React.CSSProperties = { fontFamily: "var(--font-script)" };

/* ─── Cover 0 — Creator Commerce ────────────────────────────── */
export function BlogCover0() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 40%, #2a1a4a 0%, #130d22 50%, #0a0812 100%)",
      }}
    >
      <Brackets color="rgba(255,255,255,0.3)" />

      {/* Label */}
      <div style={{ ...MONO, position: "absolute", top: 18, left: 44, fontSize: "clamp(7px,0.8vw,11px)", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", zIndex: 5 }}>
        03b/06 · BLOG
      </div>

      {/* Ambient glow */}
      <div aria-hidden style={{ position: "absolute", top: "10%", left: "28%", width: "34%", paddingTop: "34%", borderRadius: "50%", background: "radial-gradient(circle, rgba(220,160,0,0.5), transparent 70%)", filter: "blur(24px)", zIndex: 1 }} />

      {/* Big diamond star */}
      <DiamondStar gradient size={240} style={{ position: "absolute", top: "50%", left: "32%", transform: "translate(-50%, -58%)", zIndex: 2 }} />

      {/* Colored sparkles */}
      <Star4 fill="#FF3EB5" size={52} style={{ position: "absolute", top: "10%", left: "6%", zIndex: 3 }} />
      <Star4 fill="#3B8BFF" size={38} style={{ position: "absolute", top: "20%", left: "33%", zIndex: 3 }} />
      <Star4 fill="#C8F135" size={32} style={{ position: "absolute", top: "25%", right: "24%", zIndex: 3 }} />
      <Star4 fill="#F5C518" size={28} style={{ position: "absolute", bottom: "32%", left: "16%", zIndex: 3 }} />

      {/* Right text */}
      <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: "45%", zIndex: 4, display: "flex", flexDirection: "column", gap: "clamp(6px,1vw,16px)" }}>
        <div style={{ ...DISPLAY, fontSize: "clamp(1.8rem,7.5vw,7rem)", lineHeight: 0.88, color: "#fff", textTransform: "uppercase", fontStyle: "italic" }}>
          The <span style={{ color: "#F5C518" }}>Future</span>
          <br />of Creator
          <br /><span style={{ color: "#FF3EB5" }}>Commerce</span>
          <br />is Here.
        </div>
        <div style={{ ...SCRIPT, fontSize: "clamp(0.8rem,1.8vw,1.4rem)", color: "#C8F135", fontWeight: 600 }}>
          — and it&apos;s not what you expected
        </div>
      </div>

      {/* Branding */}
      <div style={{ position: "absolute", bottom: 18, left: 44, zIndex: 5 }}>
        <div style={{ ...DISPLAY, fontSize: "clamp(1rem,2.2vw,1.8rem)", color: "#fff", textTransform: "uppercase", fontStyle: "italic", lineHeight: 1 }}>ICONS</div>
        <div style={{ ...MONO, fontSize: "clamp(6px,0.7vw,9px)", fontWeight: 700, color: "#C8F135", marginTop: 2 }}>ICONS.STUDIO</div>
      </div>
    </div>
  );
}

/* ─── Cover 1 — Brand Brief ──────────────────────────────────── */
export function BlogCover1() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        backgroundColor: "#C8F135",
      }}
    >
      {/* Polka dots */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)", backgroundSize: "20px 20px", zIndex: 0 }} />
      <Brackets color="#000" />

      {/* Labels */}
      <div style={{ ...MONO, position: "absolute", top: 20, left: 48, fontSize: "clamp(7px,0.85vw,11px)", fontWeight: 700, color: "#000", zIndex: 3 }}>VOL. 04 · MMXXVI</div>
      <div style={{ ...MONO, position: "absolute", top: 20, right: 48, fontSize: "clamp(7px,0.85vw,11px)", fontWeight: 700, color: "#000", zIndex: 3 }}>CREATOR TIPS</div>

      {/* Headline */}
      <div style={{ position: "absolute", top: "50%", left: "5%", transform: "translateY(-50%)", zIndex: 2, maxWidth: "58%" }}>
        <div style={{ ...DISPLAY, fontSize: "clamp(1.5rem,7vw,6.5rem)", lineHeight: 0.92, color: "#000", textTransform: "lowercase", fontStyle: "italic" }}>
          how to write a<br />
          <span style={{ color: "#FF3EB5" }}>brand brief</span><br />
          that actually<br />
          gets you booked.
        </div>
        <div style={{ ...SCRIPT, fontSize: "clamp(0.75rem,1.8vw,1.5rem)", color: "#000", marginTop: "clamp(8px,1.5vw,20px)", fontWeight: 600 }}>
          (some of them on purpose)
        </div>
      </div>

      {/* Big star bottom-right */}
      <DiamondStar fill="#F5C518" size={320} style={{ position: "absolute", bottom: "-10%", right: "-6%", zIndex: 1 }} />

      {/* Branding */}
      <div style={{ position: "absolute", bottom: 22, left: 48, zIndex: 3 }}>
        <div style={{ ...DISPLAY, fontSize: "clamp(1.2rem,2.5vw,2.2rem)", color: "#000", textTransform: "uppercase", fontStyle: "italic", lineHeight: 1 }}>ICONS</div>
        <div style={{ ...MONO, fontSize: "clamp(6px,0.7vw,9px)", fontWeight: 700, color: "#000", marginTop: 2 }}>ICONS.STUDIO</div>
      </div>
    </div>
  );
}

/* ─── Cover 2 — Influencer Campaign ─────────────────────────── */
export function BlogCover2() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        backgroundColor: "#F0EBE0",
      }}
    >
      {/* Polka dots */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.10) 1.2px, transparent 1.2px)", backgroundSize: "22px 22px", zIndex: 0 }} />

      {/* Corner sparkles */}
      <Star4 fill="#FF3EB5" size={72} style={{ position: "absolute", top: "8%", left: "7%", zIndex: 2 }} />
      <Star4 fill="#C8F135" size={55} style={{ position: "absolute", top: "8%", right: "8%", zIndex: 2 }} />
      <Star4 fill="#3B8BFF" size={62} style={{ position: "absolute", bottom: "10%", left: "10%", zIndex: 2 }} />
      <Star4 fill="#F5C518" size={68} style={{ position: "absolute", bottom: "8%", right: "8%", zIndex: 2 }} />

      {/* Central rotated card */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-3deg)", zIndex: 3, width: "54%" }}>
        <div style={{
          background: "#C8F135",
          borderRadius: "clamp(12px,2.5vw,28px)",
          border: "4px solid #000",
          boxShadow: "6px 8px 0 #000",
          padding: "clamp(16px,3vw,40px) clamp(20px,4vw,50px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(4px,0.8vw,10px)",
          textAlign: "center",
        }}>
          <div style={{ ...MONO, fontSize: "clamp(6px,0.9vw,11px)", fontWeight: 700, letterSpacing: "0.22em", color: "#000", textTransform: "uppercase" }}>
            ★ NEW ICON ALERT ★
          </div>
          <div style={{ ...DISPLAY, fontSize: "clamp(1rem,5.5vw,5rem)", lineHeight: 0.88, color: "#000", textTransform: "uppercase", fontStyle: "italic" }}>
            Why Your Last<br />
            <span style={{ color: "#FF3EB5" }}>Influencer</span> Campaign<br />
            Failed
          </div>
          <div style={{ ...SCRIPT, fontSize: "clamp(0.65rem,1.5vw,1.3rem)", color: "#000", fontWeight: 600 }}>
            — and how to fix it, bestie
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Cover 3 — GlowBeauty ──────────────────────────────────── */
export function BlogCover3() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Pink dot grid */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,60,180,0.10) 1.2px, transparent 1.2px)", backgroundSize: "24px 24px", zIndex: 0 }} />

      {/* Pink diagonal slash */}
      <div style={{ position: "absolute", top: "-8%", left: "-4%", width: "44%", height: "125%", background: "#FF3EB5", transform: "rotate(-6deg)", transformOrigin: "top left", zIndex: 1 }}>
        {/* Lime stripe on edge */}
        <div style={{ position: "absolute", top: 0, right: -12, width: 12, height: "100%", background: "#C8F135" }} />
      </div>

      {/* Faded 3M behind slash */}
      <div aria-hidden style={{ ...DISPLAY, position: "absolute", top: "-5%", left: "-2%", fontSize: "clamp(6rem,40vw,36rem)", lineHeight: 1, color: "rgba(0,0,0,0.08)", zIndex: 2, userSelect: "none", pointerEvents: "none", fontStyle: "italic" }}>3M</div>

      {/* Left text on pink */}
      <div style={{ position: "absolute", top: "50%", left: "4%", transform: "translateY(-50%)", zIndex: 4, maxWidth: "34%", display: "flex", flexDirection: "column", gap: "clamp(6px,1vw,14px)" }}>
        <div style={{ ...MONO, fontSize: "clamp(6px,0.85vw,11px)", fontWeight: 700, letterSpacing: "0.22em", color: "#fff", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#C8F135" }}>★</span> Campaign Breakdown
        </div>
        <div style={{ ...DISPLAY, fontSize: "clamp(1.5rem,7.5vw,7rem)", lineHeight: 0.86, color: "#fff", textTransform: "uppercase", fontStyle: "italic" }}>
          Glow<br /><span style={{ color: "#C8F135" }}>Beauty</span>&apos;s<br />Full<br />Story.
        </div>
        <div style={{ ...SCRIPT, fontSize: "clamp(0.65rem,1.5vw,1.3rem)", color: "rgba(255,255,255,0.85)", fontWeight: 600, lineHeight: 1.35 }}>
          How one brand turned<br />3 million impressions<br />into real revenue.
        </div>
      </div>

      {/* Right stat badge */}
      <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", zIndex: 4, width: "38%", display: "flex", flexDirection: "column", gap: "clamp(8px,1.5vw,22px)" }}>
        <div style={{
          background: "#0d0d0d",
          borderRadius: "clamp(10px,1.5vw,18px)",
          padding: "clamp(10px,2vw,18px) clamp(14px,2.5vw,28px)",
          boxShadow: "5px 5px 0 #FF3EB5",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          position: "relative",
        }}>
          <div style={{ ...MONO, fontSize: "clamp(6px,0.7vw,9px)", fontWeight: 700, letterSpacing: "0.18em", color: "#C8F135", textTransform: "uppercase" }}>★ CASE STUDY ★</div>
          <div style={{ ...DISPLAY, fontSize: "clamp(2rem,9vw,8rem)", lineHeight: 0.85, color: "#fff", fontStyle: "italic" }}>
            3M<span style={{ fontSize: "clamp(1.2rem,5vw,5rem)", color: "#FF3EB5" }}>+</span>
          </div>
          <div style={{ ...MONO, fontSize: "clamp(6px,0.8vw,11px)", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>Total Impressions</div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(4px,0.8vw,8px)" }}>
          {[["Strategy","filled"],["Influencer Mix","dark"],["Conversion",""],["ROI","filled"],["Content","dark"]].map(([label, type]) => (
            <div key={label} style={{
              ...MONO,
              fontSize: "clamp(5px,0.7vw,10px)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "clamp(3px,0.5vw,6px) clamp(8px,1.2vw,14px)",
              borderRadius: 999,
              border: `2px solid ${type === "filled" ? "#C8F135" : type === "dark" ? "#0d0d0d" : "#0d0d0d"}`,
              background: type === "filled" ? "#C8F135" : type === "dark" ? "#0d0d0d" : "transparent",
              color: type === "dark" ? "#fff" : "#0d0d0d",
            }}>{label}</div>
          ))}
        </div>
      </div>

      {/* Sparkles */}
      <Star4 fill="#C8F135" size={36} style={{ position: "absolute", top: "6%", right: "16%", zIndex: 5 }} />
      <Star4 fill="#FF3EB5" size={24} style={{ position: "absolute", top: "32%", right: "5%", zIndex: 5 }} />

      {/* Branding */}
      <div style={{ position: "absolute", bottom: 16, right: 44, zIndex: 6, textAlign: "right" }}>
        <div style={{ ...DISPLAY, fontSize: "clamp(0.9rem,2vw,1.6rem)", color: "#0d0d0d", textTransform: "uppercase", fontStyle: "italic", lineHeight: 1 }}>ICONS</div>
        <div style={{ ...MONO, fontSize: "clamp(5px,0.65vw,9px)", fontWeight: 700, letterSpacing: "0.14em", color: "#FF3EB5" }}>ICONS.STUDIO</div>
      </div>
    </div>
  );
}

/* ─── Cover 4 — Negotiate ────────────────────────────────────── */
export function BlogCover4() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#0d0d0d" }}>
      {/* Checkerboard bottom-right */}
      <div aria-hidden style={{ position: "absolute", bottom: 0, right: 0, width: "28%", height: "50%", opacity: 0.15, backgroundImage: "repeating-conic-gradient(#C8F135 0% 25%, transparent 0% 50%)", backgroundSize: "40px 40px", zIndex: 1 }} />

      {/* Lime left bar */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 16, height: "100%", background: "#C8F135", zIndex: 3 }} />

      <Brackets color="rgba(255,255,255,0.25)" />

      {/* Labels */}
      <div style={{ ...MONO, position: "absolute", top: 17, left: 52, fontSize: "clamp(6px,0.75vw,10px)", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", zIndex: 6 }}>05 · MONEY TALK</div>
      <div style={{ ...MONO, position: "absolute", top: 17, right: 44, fontSize: "clamp(6px,0.75vw,10px)", fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", zIndex: 6 }}>VOL. 04 · MMXXVI</div>

      {/* Price tag (right) */}
      <div style={{
        position: "absolute",
        right: "-3%",
        top: "50%",
        transform: "translateY(-50%) rotate(5deg)",
        width: "30%",
        background: "#C8F135",
        borderRadius: "clamp(10px,2vw,22px)",
        border: "4px solid #000",
        boxShadow: "-6px 6px 0 #FF3EB5",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(24px,5vw,44px) clamp(12px,2vw,24px) clamp(16px,3vw,32px)",
        gap: "clamp(4px,0.5vw,8px)",
      }}>
        {/* Hole at top */}
        <div style={{ position: "absolute", top: "clamp(10px,2vw,20px)", left: "50%", transform: "translateX(-50%)", width: "clamp(18px,3vw,28px)", height: "clamp(18px,3vw,28px)", borderRadius: "50%", background: "#0d0d0d", border: "4px solid #000" }} />
        <div style={{ ...MONO, fontSize: "clamp(5px,0.7vw,10px)", fontWeight: 700, letterSpacing: "0.2em", color: "#000", textTransform: "uppercase", marginTop: "clamp(16px,3vw,28px)" }}>Your Rate</div>
        <div style={{ ...DISPLAY, fontSize: "clamp(2.5rem,10vw,9rem)", lineHeight: 0.85, color: "#000", fontStyle: "italic", letterSpacing: "-0.03em" }}>$∞</div>
        <div style={{ ...SCRIPT, fontSize: "clamp(0.6rem,1.4vw,1.1rem)", fontWeight: 700, color: "#000", textAlign: "center", lineHeight: 1.3 }}>you&apos;re worth it,<br />charge accordingly.</div>
        <div style={{ width: "80%", height: 1, background: "rgba(0,0,0,0.25)", margin: "clamp(4px,0.8vw,12px) 0" }} />
        <div style={{ ...MONO, fontSize: "clamp(5px,0.6vw,9px)", fontWeight: 700, letterSpacing: "0.14em", color: "#000", opacity: 0.6, textTransform: "uppercase" }}>ICONS.STUDIO</div>
      </div>

      {/* Left content */}
      <div style={{ position: "absolute", left: "clamp(32px,5vw,52px)", top: "50%", transform: "translateY(-50%)", zIndex: 4, maxWidth: "62%", display: "flex", flexDirection: "column", gap: "clamp(8px,1.5vw,18px)" }}>
        <div style={{ ...MONO, fontSize: "clamp(6px,0.85vw,11px)", fontWeight: 700, letterSpacing: "0.2em", color: "#C8F135", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF3EB5", display: "inline-block", flexShrink: 0 }} />
          Pro Playbook
        </div>
        <div style={{ ...DISPLAY, fontSize: "clamp(1.8rem,9vw,10rem)", lineHeight: 0.83, color: "#fff", textTransform: "uppercase", fontStyle: "italic", letterSpacing: "-0.02em" }}>
          Nego<span style={{ color: "#FF3EB5" }}>-</span><br />
          <span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>tiate</span><br />
          Like a<br />
          <span style={{ color: "#C8F135" }}>Pro.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,1.5vw,16px)", flexWrap: "wrap" }}>
          <div style={{ ...SCRIPT, fontSize: "clamp(0.65rem,1.5vw,1.3rem)", fontWeight: 600, color: "rgba(255,255,255,0.7)", lineHeight: 1.3 }}>
            Getting paid exactly<br />what you&apos;re worth.
          </div>
          <div style={{ ...MONO, fontSize: "clamp(5px,0.7vw,9px)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, background: "#FF3EB5", color: "#fff", border: "2px solid #fff", whiteSpace: "nowrap", flexShrink: 0 }}>★ Must Read</div>
        </div>
        <div style={{ display: "flex", gap: "clamp(4px,0.8vw,10px)", flexWrap: "wrap" }}>
          {["Know Your Value", "Set the Anchor", "Close the Deal"].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "clamp(4px,0.7vw,8px)", background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "clamp(3px,0.5vw,6px) clamp(8px,1.5vw,16px) clamp(3px,0.5vw,6px) clamp(4px,0.6vw,8px)" }}>
              <span style={{ ...MONO, width: "clamp(14px,2vw,22px)", height: "clamp(14px,2vw,22px)", borderRadius: "50%", background: "#C8F135", color: "#000", fontSize: "clamp(5px,0.7vw,10px)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
              <span style={{ ...MONO, fontSize: "clamp(5px,0.65vw,9px)", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sparkles */}
      <Star4 fill="#C8F135" size={30} style={{ position: "absolute", top: "7%", left: "28%", zIndex: 5 }} />
      <Star4 fill="#FF3EB5" size={22} style={{ position: "absolute", bottom: "14%", left: "22%", zIndex: 5 }} />
    </div>
  );
}

/* ─── Cover 5 — Algorithm ────────────────────────────────────── */
export function BlogCover5() {
  const codeLines = [
    { text: "if (reach < prev_reach) { adjustStrategy(); triggerAlarm(); }", type: "" },
    { text: "// ⚠ ALGORITHM UPDATE DETECTED — v4.7.2 → v5.0.0", type: "pink" },
    { text: "const engagement = posts.filter(p => p.format === 'video').reduce(sum);", type: "" },
    { text: "platform.feed.weights = { video: 0.72, carousel: 0.18, static: 0.10 };", type: "" },
    { text: "creator.adapt({ hooks: true, consistency: 'high', niche: 'tight' });", type: "lime" },
    { text: "while (!visible) { postMore(); optimiseHashtags(); testFormats(); }", type: "" },
    { text: "// NEW: watch time > 3s now weighted 2.4x vs previous 1.8x", type: "pink" },
    { text: "const signal = { saves: 0.9, shares: 1.4, comments: 1.1, likes: 0.6 };", type: "" },
    { text: "if (creator.postFreq < 4) { penalise(creator, 0.3); }", type: "" },
    { text: "export default { strategy: 'adapt_or_disappear' };", type: "lime" },
    { text: "// ACTION REQUIRED: update content mix before next post cycle", type: "pink" },
    { text: "return { visibility: 'restored', reach: 'expanding', growth: true };", type: "" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#F0EBE0" }}>
      {/* Dot grid */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.10) 1.2px, transparent 1.2px)", backgroundSize: "22px 22px", zIndex: 0 }} />

      {/* Background code rain */}
      <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "52%", height: "100%", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "30px 20px", gap: 2, overflow: "hidden" }}>
        {codeLines.map((line, i) => (
          <div key={i} style={{ ...MONO, fontSize: "clamp(5px,0.7vw,11px)", fontWeight: line.type ? 700 : 400, color: line.type === "pink" ? "rgba(255,62,181,0.22)" : line.type === "lime" ? "rgba(100,160,0,0.22)" : "rgba(0,0,0,0.10)", whiteSpace: "nowrap", letterSpacing: "0.04em", lineHeight: 1.8 }}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Right lime bar */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 14, height: "100%", background: "#C8F135", zIndex: 4 }} />

      {/* Alert banner top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 14, height: "clamp(32px,5vw,46px)", background: "#0d0d0d", zIndex: 5, display: "flex", alignItems: "center", padding: "0 44px", gap: 14, overflow: "hidden" }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF3EB5", flexShrink: 0, animation: "algoBlink 1.2s infinite" }} />
        <div style={{ ...MONO, fontSize: "clamp(6px,0.8vw,10px)", fontWeight: 700, letterSpacing: "0.22em", color: "#C8F135", textTransform: "uppercase", whiteSpace: "nowrap" }}>Breaking Update</div>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "clamp(8px,1vw,12px)" }}>|</div>
        <div style={{ ...MONO, fontSize: "clamp(6px,0.75vw,10px)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>VOL. 04 · MMXXVI · ICONS.STUDIO</div>
      </div>
      <style>{`@keyframes algoBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>

      <Brackets color="rgba(0,0,0,0.25)" />

      {/* Main content */}
      <div style={{ position: "absolute", top: "50%", left: 44, transform: "translateY(-40%)", zIndex: 4, maxWidth: "54%", display: "flex", flexDirection: "column", gap: "clamp(6px,1.2vw,16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...MONO, fontSize: "clamp(5px,0.7vw,9px)", fontWeight: 700, letterSpacing: "0.14em", padding: "3px 10px", borderRadius: 4, background: "#FF3EB5", color: "#fff", textTransform: "uppercase" }}>⚠ URGENT</span>
          <span style={{ ...MONO, fontSize: "clamp(5px,0.7vw,10px)", fontWeight: 700, letterSpacing: "0.2em", color: "#000", textTransform: "uppercase" }}>Platform Intelligence</span>
        </div>
        <div style={{ ...DISPLAY, fontSize: "clamp(1.8rem,9vw,9.5rem)", lineHeight: 0.84, color: "#0d0d0d", textTransform: "uppercase", fontStyle: "italic", letterSpacing: "-0.02em" }}>
          Algo-<br />
          <span style={{ background: "#0d0d0d", color: "#C8F135", padding: "0 8px", display: "inline-block", lineHeight: 0.95 }}>rithm</span><br />
          <span style={{ WebkitTextStroke: "2px #0d0d0d", color: "transparent" }}>Chang</span><span style={{ color: "#FF3EB5" }}>es.</span>
        </div>

        {/* Glitch bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: "clamp(80px,15vw,180px)", height: 5, borderRadius: 2, background: "#FF3EB5" }} />
          <div style={{ width: "clamp(28px,5vw,60px)", height: 5, borderRadius: 2, background: "#C8F135" }} />
          <div style={{ width: "clamp(14px,2.5vw,30px)", height: 5, borderRadius: 2, background: "#0d0d0d" }} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(8px,1.5vw,20px)" }}>
          <div style={{ ...SCRIPT, fontSize: "clamp(0.6rem,1.4vw,1.2rem)", fontWeight: 600, color: "#444", lineHeight: 1.35 }}>
            What creators need to<br />know right now — no fluff,<br />just the real playbook.
          </div>
          <div style={{ display: "flex", gap: "clamp(4px,0.7vw,10px)" }}>
            {[["5.0","New Version"],["72%","Video Weight"]].map(([num, label]) => (
              <div key={num} style={{ background: "#0d0d0d", borderRadius: "clamp(6px,1vw,12px)", padding: "clamp(6px,1vw,10px) clamp(8px,1.4vw,16px)", display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ ...DISPLAY, fontSize: "clamp(1rem,3vw,2.2rem)", lineHeight: 1, color: "#C8F135", fontStyle: "italic" }}>{num}</div>
                <div style={{ ...MONO, fontSize: "clamp(4px,0.6vw,8px)", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 14, height: "clamp(24px,4vw,38px)", background: "#C8F135", zIndex: 5, display: "flex", alignItems: "center", padding: "0 44px", gap: "clamp(16px,3vw,32px)", overflow: "hidden" }}>
        {["Know the Change","Adapt Your Strategy","Stay Visible","Creators Win","Read Now","Icons.Studio"].map((item) => (
          <span key={item} style={{ ...MONO, fontSize: "clamp(5px,0.7vw,10px)", fontWeight: 700, letterSpacing: "0.16em", color: "#000", textTransform: "uppercase", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ color: "#FF3EB5" }}>★</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Cover 6 — Roster ───────────────────────────────────────── */
export function BlogCover6() {
  const months = [
    { name: "JAN", w: 60, n: 3, type: "active" },
    { name: "FEB", w: 40, n: 2, type: "semi" },
    { name: "MAR", w: 80, n: 4, type: "semi" },
    { name: "APR", w: 100, n: 5, type: "pink" },
    { name: "MAY", w: 50, n: 3, type: "semi" },
    { name: "JUN", w: 70, n: 4, type: "active" },
    { name: "JUL", w: 30, n: 2, type: "semi" },
    { name: "AUG", w: 60, n: 3, type: "semi" },
    { name: "SEP", w: 90, n: 5, type: "pink" },
    { name: "OCT", w: 75, n: 4, type: "active" },
    { name: "NOV", w: 85, n: 4, type: "semi" },
    { name: "DEC", w: 100, n: 5, type: "active" },
  ];

  const cellBg = (t: string) =>
    t === "active" ? "#C8F135" : t === "pink" ? "#FF3EB5" : "rgba(200,241,53,0.12)";
  const cellBorder = (t: string) =>
    t === "active" ? "#C8F135" : t === "pink" ? "#FF3EB5" : "rgba(200,241,53,0.25)";
  const nameColor = (t: string) =>
    t === "active" || t === "pink" ? "#000" : "rgba(255,255,255,0.4)";
  const barColor = (t: string) =>
    t === "active" ? "#000" : t === "pink" ? "#fff" : "#C8F135";
  const countColor = (t: string) =>
    t === "active" ? "#000" : t === "pink" ? "#fff" : "rgba(200,241,53,0.7)";

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#C8F135" }}>
      {/* Dot grid */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.13) 1.3px, transparent 1.3px)", backgroundSize: "22px 22px", zIndex: 0 }} />

      {/* Right dark panel */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "38%", height: "100%", background: "#0d0d0d", zIndex: 1 }} />

      {/* Zigzag divider */}
      <div style={{ position: "absolute", top: 0, right: "calc(38% - 30px)", width: 32, height: "100%", zIndex: 2, overflow: "hidden" }}>
        <svg viewBox="0 0 32 720" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <polyline
            points="32,0 0,36 32,72 0,108 32,144 0,180 32,216 0,252 32,288 0,324 32,360 0,396 32,432 0,468 32,504 0,540 32,576 0,612 32,648 0,684 32,720 32,0"
            fill="#0d0d0d"
          />
        </svg>
      </div>

      <Brackets color="#000" />

      {/* Top label */}
      <div style={{ ...MONO, position: "absolute", top: 17, left: 44, fontSize: "clamp(6px,0.75vw,10px)", fontWeight: 700, letterSpacing: "0.1em", color: "#000", zIndex: 6 }}>07 · STRATEGY GUIDE · VOL. 04 · MMXXVI</div>

      {/* Left content */}
      <div style={{ position: "absolute", top: "50%", left: 44, transform: "translateY(-50%)", zIndex: 4, maxWidth: "55%", display: "flex", flexDirection: "column", gap: "clamp(6px,1.2vw,16px)" }}>
        <div style={{ ...MONO, fontSize: "clamp(6px,0.85vw,10px)", fontWeight: 700, letterSpacing: "0.2em", color: "#000", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#FF3EB5", fontSize: "clamp(8px,1.2vw,14px)" }}>★</span> Strategy Guide
        </div>
        <div style={{ ...DISPLAY, fontSize: "clamp(1.8rem,9.5vw,10rem)", lineHeight: 0.83, color: "#0d0d0d", textTransform: "uppercase", fontStyle: "italic", letterSpacing: "-0.02em" }}>
          Build<br />Your<br />
          <span style={{ background: "#0d0d0d", color: "#C8F135", padding: "0 8px", display: "inline-block" }}>Roster.</span>
        </div>
        <div style={{ ...SCRIPT, fontSize: "clamp(0.65rem,1.5vw,1.3rem)", fontWeight: 600, color: "rgba(0,0,0,0.6)", lineHeight: 1.35 }}>
          A full year of creators —<br />planned, managed &amp; paid<br />without breaking the bank.
        </div>
        <div style={{ display: "flex", gap: "clamp(4px,0.7vw,8px)", flexWrap: "wrap" }}>
          {[["Micro-creators","dark"],["Smart Budgeting","pink"],["Long-term Deals",""],["Vetting Process","dark"]].map(([label, type]) => (
            <div key={label} style={{ ...MONO, fontSize: "clamp(5px,0.65vw,9px)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "clamp(3px,0.5vw,5px) clamp(8px,1.2vw,14px)", borderRadius: 999, border: `2px solid ${type === "pink" ? "#FF3EB5" : "#000"}`, background: type === "dark" ? "#0d0d0d" : type === "pink" ? "#FF3EB5" : "transparent", color: type === "dark" ? "#C8F135" : type === "pink" ? "#fff" : "#000" }}>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel header */}
      <div style={{ position: "absolute", top: "clamp(16px,3vw,28px)", right: "clamp(16px,2.5vw,30px)", width: "34%", zIndex: 3, padding: "0 clamp(12px,2vw,24px)" }}>
        <div style={{ ...MONO, fontSize: "clamp(5px,0.65vw,9px)", fontWeight: 700, letterSpacing: "0.2em", color: "#C8F135", textTransform: "uppercase" }}>★ Year Planner</div>
        <div style={{ ...DISPLAY, fontSize: "clamp(0.8rem,2.2vw,1.8rem)", color: "#fff", textTransform: "uppercase", fontStyle: "italic", lineHeight: 1, marginTop: 2 }}>Your Full Roster</div>
      </div>

      {/* Month grid */}
      <div style={{ position: "absolute", top: "50%", right: "clamp(16px,2.5vw,30px)", transform: "translateY(-50%)", width: "34%", zIndex: 3, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(4px,0.7vw,8px)", padding: "0 clamp(12px,2vw,24px)" }}>
        {months.map((m) => (
          <div key={m.name} style={{ background: cellBg(m.type), border: `1.5px solid ${cellBorder(m.type)}`, borderRadius: "clamp(4px,0.8vw,10px)", padding: "clamp(4px,0.8vw,8px) clamp(5px,1vw,10px)", display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ ...MONO, fontSize: "clamp(4px,0.55vw,8px)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: nameColor(m.type) }}>{m.name}</div>
            <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${m.w}%`, height: "100%", background: barColor(m.type), borderRadius: 2 }} />
            </div>
            <div style={{ ...MONO, fontSize: "clamp(4px,0.5vw,7px)", fontWeight: 700, color: countColor(m.type) }}>{m.n}c</div>
          </div>
        ))}
      </div>

      {/* Right panel footer */}
      <div style={{ position: "absolute", bottom: "clamp(14px,2.5vw,26px)", right: "clamp(16px,2.5vw,30px)", width: "34%", zIndex: 3, padding: "0 clamp(12px,2vw,24px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ ...MONO, fontSize: "clamp(5px,0.65vw,9px)", fontWeight: 700, letterSpacing: "0.14em", padding: "clamp(3px,0.5vw,5px) clamp(8px,1.2vw,14px)", borderRadius: 999, background: "#FF3EB5", color: "#fff", textTransform: "uppercase" }}>★ No Big Budget</div>
        <div style={{ ...DISPLAY, fontSize: "clamp(1.2rem,4vw,3rem)", color: "rgba(255,255,255,0.12)", fontStyle: "italic", lineHeight: 1 }}>42+</div>
      </div>

      {/* Left sparkles */}
      <Star4 fill="#FF3EB5" size={28} style={{ position: "absolute", top: "8%", left: "30%", zIndex: 5 }} />
      <Star4 fill="#F5C518" size={22} style={{ position: "absolute", bottom: "12%", left: "26%", zIndex: 5 }} />

      {/* Branding */}
      <div style={{ position: "absolute", bottom: 16, left: 44, zIndex: 6 }}>
        <div style={{ ...DISPLAY, fontSize: "clamp(0.9rem,2vw,1.6rem)", color: "#000", textTransform: "uppercase", fontStyle: "italic", lineHeight: 1 }}>ICONS</div>
        <div style={{ ...MONO, fontSize: "clamp(5px,0.65vw,9px)", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(0,0,0,0.5)" }}>ICONS.STUDIO</div>
      </div>
    </div>
  );
}
