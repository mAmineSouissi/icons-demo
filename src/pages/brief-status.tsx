import Head from "next/head";
import BriefStatusPage from "@/components/pages/BriefStatusPage";
import type { ReactNode } from "react";

export default function BriefStatus() {
  return (
    <>
      <Head>
        <title>Brief Received — Icons</title>
        <meta name="description" content="Your campaign brief is live. Track status, review creator matches, and get ready to go live in 48 hours." />
        <meta name="robots" content="noindex" />
      </Head>
      <BriefStatusPage />
    </>
  );
}

BriefStatus.getLayout = (page: ReactNode) => page;
