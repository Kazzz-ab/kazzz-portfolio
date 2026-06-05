"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Prevent hydration mismatch — render placeholder until client mounts
  if (!mounted) {
    return (
      <div className="w-[62px] h-[28px] rounded-full opacity-0" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
      style={{
        background: isDark ? "rgba(107,142,174,0.12)" : "rgba(122,90,40,0.1)",
        border: isDark ? "0.5px solid rgba(107,142,174,0.35)" : "0.5px solid rgba(122,90,40,0.35)",
      }}
    >
      {/* Icon — shows what mode you'll switch TO */}
      <span className={isDark ? "text-accent-ai" : "text-accent-biz"}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
      <span
        className="font-mono text-[10px] tracking-[0.06em]"
        style={{ color: isDark ? "#6B8EAE" : "#7A5A28" }}
      >
        {isDark ? "light" : "dark"}
      </span>
    </button>
  );
}
