import Head from "next/head";
import LoginPage from "@/components/pages/LoginPage";
import type { ReactNode } from "react";

function Login() {
  return (
    <>
      <Head>
        <title>Log in — Icons</title>
        <meta name="description" content="Log in to your Icons creator or brand account." />
        <meta name="robots" content="noindex" />
      </Head>
      <LoginPage />
    </>
  );
}

// Opt out of the standard Layout (header + footer) — the page has its own chrome
Login.getLayout = (page: ReactNode) => page;

export default Login;
