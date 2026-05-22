import Head from "next/head";
import ForgotPasswordPage from "@/components/pages/ForgotPasswordPage";
import type { ReactNode } from "react";

function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Reset Password — Icons</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ForgotPasswordPage />
    </>
  );
}

ForgotPassword.getLayout = (page: ReactNode) => page;

export default ForgotPassword;
