import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */

export type LegalSection = {
  title: string;
  body: React.ReactNode;
};

export type LegalPageProps = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  relatedLinks?: { label: string; href: string }[];
};

/* ─── Styles ─────────────────────────────────────────────────── */

const PAGE_STYLES = `
  .lg-hero-rule { height: 1px; background: var(--color-border); }
  .lg-toc { position: sticky; top: 6rem; }
  .lg-toc-link {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.45rem 0;
    color: color-mix(in srgb, var(--color-fg) 40%, transparent);
    border-left: 2px solid transparent;
    padding-left: 0.85rem;
    transition: color 0.2s, border-color 0.2s;
    text-decoration: none;
  }
  .lg-toc-link:hover {
    color: var(--color-fg);
    border-left-color: var(--color-accent);
  }
  .lg-section { scroll-margin-top: 6rem; }
  .lg-body-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
  @media (min-width: 768px) { .lg-body-grid { grid-template-columns: 220px 1fr; gap: 4rem; } }
  .lg-sidebar { display: none; }
  @media (min-width: 768px) { .lg-sidebar { display: block; } }
  .lg-section h2 {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    line-height: 1.1;
    font-style: italic;
    margin-bottom: 1.25rem;
    color: var(--color-fg);
  }
  .lg-section p {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.85;
    letter-spacing: 0.01em;
    color: color-mix(in srgb, var(--color-fg) 72%, transparent);
    margin-bottom: 1rem;
  }
  .lg-section ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
  }
  .lg-section ul li {
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.85;
    color: color-mix(in srgb, var(--color-fg) 72%, transparent);
    padding: 0.25rem 0 0.25rem 1.25rem;
    position: relative;
  }
  .lg-section ul li::before {
    content: "✦";
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-size: 9px;
    top: 0.45rem;
  }
  .lg-section a {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .lg-section strong {
    color: var(--color-fg);
    font-weight: 600;
  }
  .lg-divider { height: 1px; background: var(--color-border); margin: 2.5rem 0; }
`;

/* ─── Component ──────────────────────────────────────────────── */

export const LegalPage = ({
  title,
  effectiveDate,
  lastUpdated,
  intro,
  sections,
  relatedLinks,
}: LegalPageProps) => {
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      <style>{PAGE_STYLES}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-(--color-border) px-6 md:px-14 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            Icons
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted-fg) mb-3">
                ✦ Legal
              </p>
              <h1
                className="font-display italic leading-[0.95]"
                style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
              >
                {title}
              </h1>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)">
                Effective {effectiveDate}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)">
                Last updated {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-14 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="lg-body-grid">

            {/* Sidebar TOC */}
            <aside className="lg-sidebar">
              <div className="lg-toc">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-(--color-muted-fg) mb-3 pl-[0.85rem]">
                  Contents
                </p>
                {sections.map((s, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="lg-toc-link"
                  >
                    {s.title}
                  </a>
                ))}
                {relatedLinks && relatedLinks.length > 0 && (
                  <>
                    <div className="lg-divider mt-6 mb-4" />
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-(--color-muted-fg) mb-3 pl-[0.85rem]">
                      Related
                    </p>
                    {relatedLinks.map((l) => (
                      <Link key={l.href} href={l.href} className="lg-toc-link">
                        {l.label}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </aside>

            {/* Main content */}
            <main>
              {/* Intro paragraph */}
              <p
                className="font-mono text-[13px] leading-[1.85] mb-10 pb-10 border-b border-(--color-border)"
                style={{ color: "color-mix(in srgb, var(--color-fg) 72%, transparent)" }}
              >
                {intro}
              </p>

              {/* Sections */}
              <div className="flex flex-col gap-10">
                {sections.map((s, i) => (
                  <div key={i} id={`section-${i}`} className="lg-section">
                    <h2>{s.title}</h2>
                    {s.body}
                    {i < sections.length - 1 && <div className="lg-divider" />}
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div
                className="mt-14 pt-8 border-t border-(--color-border) flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <p className="font-mono text-[11px] text-(--color-muted-fg) tracking-wide">
                  Questions? Email{" "}
                  <a
                    href="mailto:legal@icons.studio"
                    className="text-(--color-accent) underline underline-offset-3"
                  >
                    legal@icons.studio
                  </a>
                </p>
                <div className="flex items-center gap-5">
                  {relatedLinks?.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};
