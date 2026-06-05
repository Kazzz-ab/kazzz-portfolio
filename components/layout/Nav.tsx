"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/about", label: "about" },
  { href: "/ai-ml", label: "ai/ml" },
  { href: "/business", label: "business" },
  { href: "mailto:kaziabrarulh@gmail.com", label: "contact" },
];

function accentForPath(path: string): string {
  if (path.startsWith("/ai-ml") || path === "/work/finsight" || path === "/work/argus")
    return "text-accent-ai";
  if (path.startsWith("/work/") || path.startsWith("/business"))
    return "text-accent-biz";
  if (path.startsWith("/about"))
    return "text-accent-about";
  return "";
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav className="flex justify-between items-center pb-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-mono text-[12px] tracking-[0.04em] text-default hover:text-primary transition-colors duration-150"
        >
          kazi a. haque
        </Link>

        {/* Desktop: nav links + theme toggle grouped together on the right */}
        <div className="hidden md:flex items-center gap-5">
          {navItems.map(({ href, label }) => {
            const isActive = href.startsWith("/") && pathname.startsWith(href);
            const accent = isActive ? accentForPath(pathname) : "";
            return (
              <Link
                key={href}
                href={href}
                className={`font-mono text-[11px] tracking-[0.04em] transition-colors duration-150 ${
                  isActive ? accent : "text-muted hover:text-default"
                }`}
              >
                {label}
              </Link>
            );
          })}
          {/* Divider */}
          <span className="w-px h-3 bg-ghost" />
          <ThemeToggle />
        </div>

        {/* Mobile: hamburger only */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block h-px w-5 bg-muted transition-all duration-200"
            style={{ transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span className="block h-px w-5 bg-muted transition-all duration-200"
            style={{ opacity: open ? 0 : 1 }} />
          <span className="block h-px w-5 bg-muted transition-all duration-200"
            style={{ transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col"
          style={{ background: "var(--color-base)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex justify-between items-center px-7 pt-7 pb-8">
            <Link href="/" onClick={() => setOpen(false)}
              className="font-mono text-[12px] tracking-[0.04em] text-default">
              kazi a. haque
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button onClick={() => setOpen(false)} className="font-mono text-[11px] text-muted">
                ✕
              </button>
            </div>
          </div>
          <nav className="flex flex-col gap-2 px-7">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-mono text-[22px] tracking-[-0.01em] text-primary py-3 hover:text-accent-ai transition-colors duration-150"
                style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-7 pb-8">
            <p className="font-mono text-[10px] tracking-[0.08em] text-faint">
              full-stack engineer · dhaka, bd
            </p>
          </div>
        </div>
      )}
    </>
  );
}
