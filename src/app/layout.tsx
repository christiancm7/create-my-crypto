/* eslint-disable @next/next/next-script-for-ga */
import { Header } from "../components/header";
import { Providers } from "../components/providers";
import { ThemeWrapper } from "../components/providers/themeProvider";
import { Sidebar } from "../components/sidebar";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="description"
          content="Create your own crypto currency on Solana"
        />
        <title>Create My Crypto</title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16523832540"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Providers>
          <ThemeWrapper>
            <div className="min-h-screen">
              <Header />
              <Sidebar />
              <main className="px-0 py-4 sm:px-4 md:ml-56 h-auto pt-20">
                {children}
                <Analytics />
              </main>
            </div>
            <SpeedInsights />
          </ThemeWrapper>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
