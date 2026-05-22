import type { NextPage } from "next";
import Head from "next/head";
import { LegalPage, type LegalSection } from "@/components/pages/LegalPage";

const sections: LegalSection[] = [
  {
    title: "Acceptance",
    body: (
      <>
        <p>By creating an account or using Icons in any capacity, you agree to these Terms of Service ("Terms"). If you do not agree, do not use the platform. These Terms form a binding legal agreement between you and Icons Studio, Inc.</p>
        <p>If you're using Icons on behalf of a company or organisation, you represent that you have authority to bind that entity to these Terms.</p>
      </>
    ),
  },
  {
    title: "The Platform",
    body: (
      <>
        <p>Icons is a creator-brand matching platform that connects vetted content creators with brands running paid campaigns. Icons facilitates the match, brief distribution, content review, and payout process. Icons is not an employer of creators and is not an agency.</p>
        <p>We reserve the right to modify, suspend, or discontinue any part of the platform at any time with reasonable notice. We are not liable for any interruption or discontinuation of the service.</p>
      </>
    ),
  },
  {
    title: "Creator Accounts",
    body: (
      <>
        <p>To join as a creator you must:</p>
        <ul>
          <li>Be at least 18 years old</li>
          <li>Provide accurate information during the application process</li>
          <li>Maintain the social accounts you listed during onboarding</li>
          <li>Not have been previously removed from Icons for policy violations</li>
        </ul>
        <p>Creators are independent contractors, not employees or agents of Icons. You are responsible for your own taxes on any income earned through the platform. Icons will issue a 1099-NEC to US-based creators earning over $600 in a calendar year.</p>
        <p>Icons takes <strong>0% commission</strong> from creator payouts. The fee you agree to in a campaign brief is what you receive, minus applicable payment processing fees.</p>
      </>
    ),
  },
  {
    title: "Brand Accounts",
    body: (
      <>
        <p>To run campaigns as a brand you must:</p>
        <ul>
          <li>Be a legally registered business or authorised representative of one</li>
          <li>Provide accurate business details and billing information</li>
          <li>Comply with all applicable advertising laws in your target markets, including FTC disclosure requirements</li>
        </ul>
        <p>Brands are responsible for ensuring their campaigns comply with platform policies, advertising standards, and applicable law. Icons does not accept liability for non-compliant campaign content.</p>
      </>
    ),
  },
  {
    title: "Campaign Rules",
    body: (
      <>
        <p>All campaigns on Icons must comply with the following:</p>
        <ul>
          <li>Content must clearly disclose the paid partnership (e.g. #ad, #sponsored, or native platform disclosure tools)</li>
          <li>No misleading claims about products, services, or results</li>
          <li>No promotion of prohibited categories: tobacco, gambling, adult content, weapons, MLM schemes, or any product illegal in the creator's jurisdiction</li>
          <li>No content that disparages competitors by name</li>
          <li>Creators retain creative ownership of their content; brands receive a limited, non-exclusive licence to repurpose agreed deliverables</li>
        </ul>
        <p>Icons reserves the right to remove any campaign or content that violates these rules without refund.</p>
      </>
    ),
  },
  {
    title: "Payments and Payouts",
    body: (
      <>
        <p><strong>Brands</strong> are charged when a campaign is confirmed and creators are locked in. Campaign fees are non-refundable once content has been delivered and approved.</p>
        <p><strong>Creators</strong> are paid within 48 hours of brand approval of delivered content. Disputes must be raised within 7 days of payout. Icons may hold disputed payments pending resolution.</p>
        <p>All payments are processed via Stripe. By using Icons you agree to Stripe's <a href="https://stripe.com/legal" target="_blank" rel="noopener noreferrer">Terms of Service</a>.</p>
      </>
    ),
  },
  {
    title: "Intellectual Property",
    body: (
      <>
        <p>Icons and its logos, product names, and design are trademarks of Icons Studio, Inc. You may not use them without written permission.</p>
        <p>Creators retain full ownership of content they create. By publishing content for a campaign, creators grant Icons a limited licence to display that content for platform marketing purposes (e.g. case studies, social proof). Creators may revoke this licence with 30 days' written notice.</p>
        <p>Brands receive a non-exclusive, non-transferable licence to use delivered content for the duration and channels specified in the campaign brief unless a broader licence is negotiated separately.</p>
      </>
    ),
  },
  {
    title: "Prohibited Conduct",
    body: (
      <>
        <p>You must not:</p>
        <ul>
          <li>Circumvent the platform to pay creators or brands directly after being introduced through Icons</li>
          <li>Create fake engagement (purchased followers, bot activity) on any account used on Icons</li>
          <li>Scrape, reverse-engineer, or attempt to access Icons systems outside the provided interface</li>
          <li>Harass, threaten, or discriminate against other users</li>
          <li>Impersonate another person or entity</li>
          <li>Use Icons for any unlawful purpose</li>
        </ul>
        <p>Violations may result in immediate account termination and, where applicable, legal action.</p>
      </>
    ),
  },
  {
    title: "Limitation of Liability",
    body: (
      <>
        <p>To the maximum extent permitted by law, Icons is not liable for:</p>
        <ul>
          <li>Indirect, incidental, special, or consequential damages</li>
          <li>Loss of revenue, profits, data, or goodwill</li>
          <li>Damages resulting from content created by creators or campaigns run by brands</li>
          <li>Platform downtime or service interruptions beyond our reasonable control</li>
        </ul>
        <p>Our total liability to you for any claim arising from these Terms or your use of Icons is limited to the greater of (a) the amount you paid Icons in the 12 months prior to the claim, or (b) $100 USD.</p>
      </>
    ),
  },
  {
    title: "Governing Law",
    body: (
      <>
        <p>These Terms are governed by the laws of the State of New York, USA, without regard to conflict of law principles. Any disputes arising from these Terms will be resolved through binding arbitration in New York County, NY, under the rules of the American Arbitration Association.</p>
        <p>You waive any right to participate in a class action lawsuit or class-wide arbitration against Icons.</p>
      </>
    ),
  },
  {
    title: "Changes to These Terms",
    body: (
      <>
        <p>We may revise these Terms from time to time. We'll notify you by email of material changes at least 14 days before they take effect. Continued use of Icons after the effective date constitutes acceptance of the revised Terms.</p>
      </>
    ),
  },
  {
    title: "Contact",
    body: (
      <>
        <p>Icons Studio, Inc.<br />112 Greene St, SoHo, New York, NY 10012</p>
        <p>Legal enquiries: <a href="mailto:legal@icons.studio">legal@icons.studio</a></p>
      </>
    ),
  },
];

const Terms: NextPage = () => (
  <>
    <Head>
      <title>Terms of Service — Icons</title>
      <meta name="description" content="The terms governing your use of the Icons creator platform." />
    </Head>
    <LegalPage
      title="Terms of Service"
      effectiveDate="1 January 2025"
      lastUpdated="19 May 2026"
      intro="These Terms of Service govern your access to and use of the Icons platform, including all features, content, and services we offer. Please read them carefully. If you have questions, email legal@icons.studio before using the platform."
      sections={sections}
      relatedLinks={[
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
      ]}
    />
  </>
);

export default Terms;
