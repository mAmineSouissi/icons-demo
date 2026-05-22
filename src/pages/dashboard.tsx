import Head from "next/head";
import DashboardPage from "@/components/pages/DashboardPage";
import type { ReactNode } from "react";

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard — Icons</title>
        <meta name="robots" content="noindex" />
      </Head>
      <DashboardPage />
    </>
  );
}

Dashboard.getLayout = (page: ReactNode) => page;

export default Dashboard;
