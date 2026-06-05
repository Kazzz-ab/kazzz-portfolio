"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — render only after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="w-8 h-4 inline-block" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative flex items-center gap-1.5 font-mono text-[10px] tracking-[0.06em] text-muted hover:text-default transition-colors duration-150"
    >
      {/* Track */}
      <span
        className="relative inline-flex items-center rounded-full transition-colors duration-250"
        style={{
          width: "32px",
          height: "18px",
          background: isDark ? "rgba(107,142,174,0.3)" : "rgba(122,90,40,0.25)",
          border: isDark ? "0.5px solid rgba(107,142,174,0.5)" : "0.5px solid rgba(122,90,40,0.4)",
        }}
      >
        {/* Thumb */}
        <span
          className="absolute rounded-full transition-all duration-250"
          style={{
            width: "12px",
            height: "12px",
            background: isDark ? "#6B8EAE" : "#B89968",
            left: isDark ? "3px" : "17px",
          }}
        />
      </span>
      <span className="hidden sm:inline">{isDark ? "dark" : "light"}</span>
    </button>
  );
}
