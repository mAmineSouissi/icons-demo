import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import Application from "@/components/Application";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { PageTransition } from "@/components/shared/PageTransition";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="icons - UGC Creator Platform - Connect with brands and create amazing content"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>icons - UGC Creator Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="dark"
        enableSystem={false}
      >
        <SmoothScroll>
          <PageTransition>
            <Application Component={Component} pageProps={pageProps} />
          </PageTransition>
        </SmoothScroll>
      </ThemeProvider>
    </>
  );
}
