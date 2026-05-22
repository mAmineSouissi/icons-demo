import type { NextPage } from "next";
import Head from "next/head";
import { LegalPage, type LegalSection } from "@/components/pages/LegalPage";

const sections: LegalSection[] = [
  {
    title: "Information We Collect",
    body: (
      <>
        <p>We collect information you provide directly when you create an account, submit a creator application, or start a brand campaign:</p>
        <ul>
          <li>Identity data — name, email address, social handles, profile photo</li>
          <li>Professional data — niche, follower count, engagement metrics, platform links</li>
          <li>Financial data — payout details (processed via Stripe; we do not store card numbers)</li>
          <li>Communications — messages you send through the platform or to our team</li>
          <li>Campaign data — briefs, content submissions, performance metrics</li>
        </ul>
        <p>We also collect data automatically when you use the platform: IP address, browser type, device identifiers, pages visited, time spent, and referral source. We use standard analytics tools (Plausible, Vercel Analytics) that do not sell your data.</p>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    body: (
      <>
        <p>We use your information to operate and improve Icons, specifically to:</p>
        <ul>
          <li>Match creators to brand campaigns based on niche, audience, and engagement</li>
          <li>Process payouts to creators within 48 hours of campaign completion</li>
          <li>Send transactional emails — brief confirmations, payout notifications, application updates</li>
          <li>Provide brands with campaign analytics and attribution reporting</li>
          <li>Detect fraud, enforce our policies, and keep the platform safe</li>
          <li>Improve our matching algorithm and product features</li>
        </ul>
        <p>We do not sell your personal data. We do not use your content or audience data to train AI models without explicit opt-in consent.</p>
      </>
    ),
  },
  {
    title: "Sharing Your Information",
    body: (
      <>
        <p>We share limited data with third parties only where necessary:</p>
        <ul>
          <li><strong>Brands</strong> — when you're matched to a campaign, brands see your public profile data (handle, niche, reach, engagement rate) before agreeing to work with you.</li>
          <li><strong>Stripe</strong> — payment processing and creator payout infrastructure. Subject to Stripe's Privacy Policy.</li>
          <li><strong>Postmark</strong> — transactional email delivery. Email addresses only; no content data.</li>
          <li><strong>Vercel / AWS</strong> — infrastructure and hosting. Governed by data processing agreements.</li>
        </ul>
        <p>We never share your data with data brokers, advertising networks, or third-party marketers.</p>
      </>
    ),
  },
  {
    title: "Data Retention",
    body: (
      <>
        <p>We retain your account data for as long as your account is active. If you delete your account, we remove your personal data within 30 days, except where retention is required by law (e.g., financial records, which we retain for 7 years per tax obligations).</p>
        <p>Campaign performance data may be retained in anonymised, aggregated form after account deletion — it cannot be attributed back to you.</p>
      </>
    ),
  },
  {
    title: "Your Rights",
    body: (
      <>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Access</strong> — request a copy of all data we hold about you</li>
          <li><strong>Correction</strong> — ask us to correct inaccurate data</li>
          <li><strong>Deletion</strong> — request erasure of your data ("right to be forgotten")</li>
          <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
          <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
          <li><strong>Restriction</strong> — ask us to stop processing while a dispute is resolved</li>
        </ul>
        <p>To exercise any of these rights, email <a href="mailto:privacy@icons.studio">privacy@icons.studio</a> with "Data Request" in the subject line. We respond within 30 days.</p>
      </>
    ),
  },
  {
    title: "Cookies",
    body: (
      <>
        <p>We use essential cookies to keep you logged in and remember your preferences. We use analytics cookies (opt-in only) to understand how people use the platform so we can improve it.</p>
        <p>We do not use advertising or tracking cookies. You can review and change your cookie preferences at any time via our <a href="/cookies">Cookie Policy</a>.</p>
      </>
    ),
  },
  {
    title: "Security",
    body: (
      <>
        <p>We use industry-standard security practices: TLS encryption in transit, AES-256 encryption at rest, SOC 2-compliant infrastructure, regular penetration testing, and strict access controls for our team.</p>
        <p>No system is perfectly secure. If you discover a vulnerability, please report it responsibly to <a href="mailto:security@icons.studio">security@icons.studio</a>.</p>
      </>
    ),
  },
  {
    title: "Children",
    body: (
      <>
        <p>Icons is not directed at people under 18. We do not knowingly collect data from anyone under 18. If you believe we have inadvertently collected data from a minor, contact us immediately at <a href="mailto:privacy@icons.studio">privacy@icons.studio</a> and we will delete it.</p>
      </>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <>
        <p>We may update this policy as our product and legal obligations evolve. When we make material changes, we'll notify you by email and update the "Last updated" date at the top of this page. Continued use of Icons after a change constitutes acceptance of the updated policy.</p>
      </>
    ),
  },
  {
    title: "Contact",
    body: (
      <>
        <p>Icons Studio, Inc.<br />112 Greene St, SoHo, New York, NY 10012</p>
        <p>Privacy enquiries: <a href="mailto:privacy@icons.studio">privacy@icons.studio</a><br />General legal: <a href="mailto:legal@icons.studio">legal@icons.studio</a></p>
      </>
    ),
  },
];

const Privacy: NextPage = () => (
  <>
    <Head>
      <title>Privacy Policy — Icons</title>
      <meta name="description" content="How Icons collects, uses, and protects your personal data." />
    </Head>
    <LegalPage
      title="Privacy Policy"
      effectiveDate="1 January 2025"
      lastUpdated="19 May 2026"
      intro={'Icons Studio, Inc. (“Icons”, “we”, “our”) operates the Icons creator platform at icons.studio. This Privacy Policy explains what personal data we collect, why we collect it, how we use it, and the rights you have over it. It applies to all users of the platform — creators, brands, and visitors.'}
      sections={sections}
      relatedLinks={[
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ]}
    />
  </>
);

export default Privacy;
