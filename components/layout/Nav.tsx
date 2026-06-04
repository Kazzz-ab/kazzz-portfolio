"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/ai-ml", label: "ai/ml" },
  { href: "/business", label: "business" },
  { href: "/about", label: "about" },
  { href: "mailto:abrarulh2004@gmail.com", label: "contact" },
];

function accentForPath(path: string): string {
  if (path.startsWith("/ai-ml") || path.startsWith("/work/finsight") || path.startsWith("/work/argus"))
    return "text-accent-ai";
  if (path.startsWith("/business") || path.startsWith("/work/"))
    return "text-accent-biz";
  if (path.startsWith("/about"))
    return "text-accent-about";
  return "";
}

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center pb-8">
      <Link
        href="/"
        className="font-mono text-[12px] tracking-[0.04em] text-default hover:text-primary transition-colors duration-150"
      >
        kazzz
      </Link>
      <ul className="flex items-center gap-5">
        {navItems.map(({ href, label }) => {
          const isActive =
            href !== "mailto:abrarulh2004@gmail.com" &&
            pathname.startsWith(href);
          const accent = isActive ? accentForPath(pathname) : "";
          return (
            <li key={href}>
              <Link
                href={href}
                className={`font-mono text-[11px] tracking-[0.04em] transition-colors duration-150 ${
                  isActive ? accent : "text-muted hover:text-default"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
