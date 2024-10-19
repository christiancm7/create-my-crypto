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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
