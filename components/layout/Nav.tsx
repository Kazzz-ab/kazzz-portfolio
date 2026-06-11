"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/about", label: "about", hoverAccent: "hover:text-accent-about" },
  { href: "/ai-ml", label: "ai/ml", hoverAccent: "hover:text-accent-ai" },
  { href: "/business", label: "business", hoverAccent: "hover:text-accent-biz" },
  { href: "mailto:kaziabrarulh@gmail.com", label: "contact", hoverAccent: "hover:text-accent-ai" },
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
                className={`group relative font-mono text-[11px] tracking-[0.04em] transition-colors duration-150 py-2 -my-2 ${
                  isActive ? accent : "text-muted hover:text-default"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-current"
                  />
                )}
                <span className="link-underline">{label}</span>
              </Link>
            );
          })}
          {/* Divider */}
          <span className="w-px h-3 bg-ghost" />
          <ThemeToggle />
        </div>

        {/* Mobile: hamburger only */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-3 -m-3 min-w-[44px] min-h-[44px]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
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
          style={{
            background: "var(--color-base)",
            animation: "fadeIn 0.25s ease both",
          }}
        >
          <div className="flex justify-between items-center px-7 pt-7 pb-8">
            <Link href="/" onClick={() => setOpen(false)}
              className="font-mono text-[12px] tracking-[0.04em] text-default">
              kazi a. haque
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="font-mono text-[11px] text-muted p-3 -m-3 min-w-[44px] min-h-[44px]"
              >
                ✕
              </button>
            </div>
          </div>
          <nav className="flex flex-col gap-2 px-7">
            {navItems.map(({ href, label, hoverAccent }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-mono text-[22px] tracking-[-0.01em] text-primary py-3 ${hoverAccent} transition-colors duration-150`}
                style={{
                  borderBottom: "0.5px solid var(--border-subtle)",
                  animation: "drawerIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
                  animationDelay: `${80 + i * 60}ms`,
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-7 pb-8">
            <p
              className="font-mono text-[10px] tracking-[0.08em] text-faint"
              style={{ animation: "drawerIn 0.45s ease both", animationDelay: "360ms" }}
            >
              full-stack engineer · dhaka, bd
            </p>
          </div>
        </div>
      )}
    </>
  );
}
