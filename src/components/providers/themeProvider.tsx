"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [resolvedTheme]);

  useEffect(() => {
    // Set theme to user's preference or default to dark
    setTheme(localStorage.getItem("theme") || "dark");
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
