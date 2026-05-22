import Head from "next/head";
import { BriefBuilderPage } from "@/components/pages/BriefBuilderPage";
import type { ReactNode } from "react";

function BriefBuilder() {
  return (
    <>
      <Head>
        <title>Brief Builder — Icons</title>
        <meta name="description" content="Build your campaign brief step by step. Define your brand, goals, creator criteria, and content direction — then submit in minutes." />
        <meta name="robots" content="noindex" />
      </Head>
      <BriefBuilderPage />
    </>
  );
}

BriefBuilder.getLayout = (page: ReactNode) => page;

export default BriefBuilder;
