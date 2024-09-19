import { Header } from "./components/header";
import { Providers } from "./components/providers";
import { ThemeWrapper } from "./components/providers/themeProvider";
import { Sidebar } from "./components/sidebar";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

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
              <main className="p-4 md:ml-64 h-auto pt-20">{children}</main>
            </div>
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
