import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://use.typekit.net/koq3yye.css" />
        {/* Favicon + home screen icon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo_icons.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logoBlack.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f5f0e8" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
