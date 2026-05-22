import Head from "next/head";
import DemoPage from "@/components/pages/DemoPage";
import type { ReactNode } from "react";

function Demo() {
  return (
    <>
      <Head>
        <title>Try Icons — Interactive Demo</title>
        <meta name="description" content="Try the Icons platform demo. Explore the brand dashboard, creator dashboard, brief builder, and more — no sign-up required." />
        <meta name="robots" content="noindex" />
      </Head>
      <DemoPage />
    </>
  );
}

// Opt out of standard Layout — full-page standalone
Demo.getLayout = (page: ReactNode) => page;

export default Demo;
