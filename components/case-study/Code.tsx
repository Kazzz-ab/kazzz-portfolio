"use client";

import { useState } from "react";

interface CodeProps {
  language?: string;
  title?: string;
  children: React.ReactNode;
}

export function Code({ language = "typescript", title, children }: CodeProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(String(children));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard unavailable (permissions / http) — leave the label as-is
    }
  };

  return (
    <section aria-labelledby="code-heading">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[11px] text-faint">04</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted">code</span>
      </div>
      {title && (
        <h3 className="text-[22px] font-medium tracking-[-0.01em] text-primary mb-4">{title}</h3>
      )}
      <div
        className="rounded overflow-hidden"
        style={{
          background: "var(--color-code-bg)",
          border: "0.5px solid var(--border-subtle)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-2.5"
          style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
        >
          <span className="font-mono text-[11px] text-faint">{title ?? language}</span>
          <div className="flex items-center gap-3">
            {title && <span className="font-mono text-[10px] text-faint">{language}</span>}
            <button
              onClick={copy}
              className="font-mono text-[10px] text-faint hover:text-default transition-colors duration-150 py-2 -my-2"
              aria-label="Copy code to clipboard"
            >
              {copied ? "copied ✓" : "copy"}
            </button>
          </div>
        </div>
        <pre className="px-5 py-4.5 overflow-x-auto font-mono text-[12px] leading-[1.75] text-body">
          <code>{children}</code>
        </pre>
      </div>
    </section>
  );
}
