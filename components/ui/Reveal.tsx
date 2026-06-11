"use client";

import { createElement, useLayoutEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children?: ReactNode;
  /** Element to render — keeps page semantics (section, div, li, ...) */
  as?: keyof React.JSX.IntrinsicElements;
  /** Stagger delay in ms */
  delay?: number;
  /** "fade-up" for content blocks, "rule" for scaleX border draws */
  variant?: "fade-up" | "rule";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll-reveal wrapper for server components.
 * Renders visible (SSR / no-JS / reduced-motion safe); the hidden state is
 * applied before first paint only when JS runs and motion is allowed, then
 * IntersectionObserver releases it.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  variant = "fade-up",
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-inview");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `${variant === "rule" ? "rule-fx" : "reveal-fx"} ${className}`.trim(),
      style: { ...style, "--reveal-delay": `${delay}ms` } as React.CSSProperties,
    },
    children
  );
}
