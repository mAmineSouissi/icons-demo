import { cn } from "@/lib/utils";
import { AppProps } from "next/app";
import Layout from "./layout/Layout";
import type { ReactNode } from "react";

interface ApplicationProps {
  className?: string;
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
}

function Application({ className, Component, pageProps }: ApplicationProps) {
  const getLayout =
    (Component as any).getLayout ??
    ((page: ReactNode) => <Layout className="relative z-10">{page}</Layout>);

  return (
    <div
      className={cn(
        "min-h-screen relative overflow-hidden bg-(--color-bg) text-(--color-fg) transition-colors duration-500",
        className,
      )}
    >
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}

export default Application;
