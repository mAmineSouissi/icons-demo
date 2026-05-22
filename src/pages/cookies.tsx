import type { NextPage } from "next";
import Head from "next/head";
import { LegalPage, type LegalSection } from "@/components/pages/LegalPage";

const sections: LegalSection[] = [
  {
    title: "What Are Cookies",
    body: (
      <>
        <p>Cookies are small text files stored on your device when you visit a website. They help sites remember your preferences, keep you logged in, and understand how the site is used. Cookies are not programs and cannot carry viruses or malware.</p>
        <p>We also use similar technologies: local storage (for theme preference), session tokens (for authentication), and pixel-based tracking (opted-in analytics only). This policy covers all of these.</p>
      </>
    ),
  },
  {
    title: "Cookies We Use",
    body: (
      <>
        <p><strong>Essential cookies</strong> — these are required for the platform to function and cannot be disabled:</p>
        <ul>
          <li><code style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "color-mix(in srgb, var(--color-fg) 8%, transparent)", padding: "1px 5px", borderRadius: "3px" }}>icons_session</code> — keeps you logged in. Expires after 30 days of inactivity.</li>
          <li><code style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "color-mix(in srgb, var(--color-fg) 8%, transparent)", padding: "1px 5px", borderRadius: "3px" }}>icons_csrf</code> — protects against cross-site request forgery. Session-scoped.</li>
          <li><code style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "color-mix(in srgb, var(--color-fg) 8%, transparent)", padding: "1px 5px", borderRadius: "3px" }}>theme</code> — stores your light/dark mode preference in localStorage. No expiry.</li>
        </ul>

        <p><strong>Analytics cookies</strong> — used only with your consent to improve the platform:</p>
        <ul>
          <li><strong>Plausible Analytics</strong> — privacy-first analytics that does not use cookies or collect personal data. No consent required under GDPR. We use it to understand which pages are visited and how traffic arrives.</li>
          <li><strong>Vercel Web Analytics</strong> — aggregated, anonymous usage metrics. No personal identifiers stored.</li>
        </ul>

        <p><strong>What we do NOT use:</strong></p>
        <ul>
          <li>Advertising or retargeting cookies</li>
          <li>Cross-site tracking cookies</li>
          <li>Third-party social media pixels (Facebook, TikTok, etc.)</li>
          <li>Heat-mapping or session-recording tools</li>
        </ul>
      </>
    ),
  },
  {
    title: "Third-Party Cookies",
    body: (
      <>
        <p>Some third-party services integrated into Icons may set their own cookies:</p>
        <ul>
          <li><strong>Stripe</strong> — sets cookies during payment flows for fraud prevention. Governed by <a href="https://stripe.com/cookie-settings" target="_blank" rel="noopener noreferrer">Stripe's Cookie Policy</a>.</li>
          <li><strong>YouTube embeds</strong> — if a creator profile includes embedded video, YouTube may set cookies. We use youtube-nocookie.com where possible to limit this.</li>
        </ul>
        <p>We have no control over third-party cookies. Refer to those parties' policies for details.</p>
      </>
    ),
  },
  {
    title: "Managing Cookies",
    body: (
      <>
        <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
        <ul>
          <li>View which cookies are set and delete them individually</li>
          <li>Block all cookies (note: this will break the login functionality on Icons)</li>
          <li>Block third-party cookies only</li>
          <li>Set cookie preferences per site</li>
        </ul>
        <p>Browser-specific instructions:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
        <p>Disabling essential cookies will prevent you from logging in and using most platform features.</p>
      </>
    ),
  },
  {
    title: "Do Not Track",
    body: (
      <>
        <p>Some browsers send a "Do Not Track" (DNT) signal to websites. Because we use privacy-first analytics (Plausible) that does not track individuals regardless of DNT signals, and we do not serve ads, our analytics behaviour does not change based on DNT signals. We do, however, respect your right to opt out of any future analytics enhancements by emailing <a href="mailto:privacy@icons.studio">privacy@icons.studio</a>.</p>
      </>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <>
        <p>We'll update this policy if we add new tools or change how we use cookies. Material changes will be announced via email and by updating the "Last updated" date above. Continuing to use Icons after an update constitutes acceptance.</p>
      </>
    ),
  },
  {
    title: "Contact",
    body: (
      <>
        <p>Icons Studio, Inc.<br />112 Greene St, SoHo, New York, NY 10012</p>
        <p>Cookie and privacy questions: <a href="mailto:privacy@icons.studio">privacy@icons.studio</a></p>
      </>
    ),
  },
];

const Cookies: NextPage = () => (
  <>
    <Head>
      <title>Cookie Policy — Icons</title>
      <meta name="description" content="How Icons uses cookies and similar technologies on our platform." />
    </Head>
    <LegalPage
      title="Cookie Policy"
      effectiveDate="1 January 2025"
      lastUpdated="19 May 2026"
      intro="This Cookie Policy explains what cookies and similar technologies Icons uses, why we use them, and how you can control them. Icons is built with privacy in mind — we use only what's necessary to run the platform and understand how it performs."
      sections={sections}
      relatedLinks={[
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ]}
    />
  </>
);

export default Cookies;
