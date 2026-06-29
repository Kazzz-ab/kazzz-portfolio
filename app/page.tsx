"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const HeroCanvas = dynamic(
  () => import("@/components/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG motifs ────────────────────────────────────────────────────────── */
function AiMotif() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <line x1="40" y1="30" x2="80" y2="50" stroke="#6B8EAE" strokeWidth="0.5" />
      <line x1="80" y1="50" x2="60" y2="75" stroke="#6B8EAE" strokeWidth="0.5" />
      <line x1="20" y1="55" x2="80" y2="50" stroke="#3A3A38" strokeWidth="0.5" />
      <line x1="40" y1="30" x2="100" y2="25" stroke="#3A3A38" strokeWidth="0.5" />
      <line x1="100" y1="25" x2="80" y2="50" stroke="#3A3A38" strokeWidth="0.5" />
      <line className="motif-dash" x1="20" y1="55" x2="60" y2="75" stroke="#6B8EAE" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle className="motif-node" cx="40" cy="30" r="3" fill="#6B8EAE" />
      <circle className="motif-node" style={{ animationDelay: "150ms" }} cx="80" cy="50" r="4" fill="#6B8EAE" />
      <circle className="motif-node" style={{ animationDelay: "300ms" }} cx="60" cy="75" r="3" fill="#3A3A38" />
      <circle className="motif-node" style={{ animationDelay: "450ms" }} cx="20" cy="55" r="2.5" fill="#3A3A38" />
      <circle className="motif-node" style={{ animationDelay: "600ms" }} cx="100" cy="25" r="2.5" fill="#3A3A38" />
    </svg>
  );
}

function BizMotif() {
  const cells = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]];
  const highlighted = [[1,0],[2,1]];
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      {cells.map(([c, r], i) => {
        const isH = highlighted.some(([hc, hr]) => hc === c && hr === r);
        const isFirst = c === 0 && r === 0;
        return (
          <rect key={`${c}-${r}`} x={20+c*22} y={10+r*22} width="16" height="16" rx="1"
            className={isFirst ? undefined : "motif-cell"}
            style={isFirst ? undefined : { animationDelay: `${i * 70}ms` }}
            fill={isFirst ? "rgba(184,153,104,0.15)" : "#B89968"}
            fillOpacity={isFirst ? undefined : 0}
            stroke={isH ? "#B89968" : "#3A3A38"} strokeWidth="0.5" />
        );
      })}
      <rect x="20" y="82" width="72" height="7" rx="1" fill="none" stroke="#B89968" strokeWidth="0.5" />
      <rect className="motif-bar" x="20" y="82" width="28" height="7" rx="1" fill="rgba(184,153,104,0.2)" />
    </svg>
  );
}

function AboutMotif() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="30" y="8" width="60" height="75" rx="2" fill="none" stroke="#8FA88F" strokeWidth="0.5" />
      <line className="motif-draw" pathLength={1} x1="42" y1="30" x2="78" y2="30" stroke="#3A3A38" strokeWidth="0.5" />
      <line className="motif-draw" pathLength={1} style={{ animationDelay: "120ms" }} x1="42" y1="40" x2="70" y2="40" stroke="#3A3A38" strokeWidth="0.5" />
      <line className="motif-draw" pathLength={1} style={{ animationDelay: "240ms" }} x1="42" y1="50" x2="74" y2="50" stroke="#3A3A38" strokeWidth="0.5" />
      <text x="60" y="95" textAnchor="middle" fill="#8FA88F" fontFamily="monospace" fontSize="8" letterSpacing="0.04em">portrait</text>
    </svg>
  );
}

/* ─── Track card ────────────────────────────────────────────────────────── */
function TrackCard({
  number, accentLabel, accentClass, glowColor, title, description,
  ctaCount, ctaText, href, motif,
}: {
  number: string; accentLabel: string; accentClass: string; glowColor: string;
  title: string; description: string; ctaCount: string; ctaText: string;
  href: string; motif: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="group block"
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex items-start gap-6 p-6 rounded-sm transition-all duration-300 cursor-pointer ${hovered ? "-translate-y-0.5" : ""}`}
        style={{
          border: `0.5px solid ${hovered ? glowColor + "40" : "var(--border-subtle)"}`,
          background: "var(--surface-inset)",
          boxShadow: hovered ? `0 0 24px ${glowColor}15` : "none",
        }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-2.5">
            <span className={`font-mono text-[11px] tracking-[0.04em] transition-colors duration-200 ${hovered ? accentClass : "text-faint"}`}>
              {number}
            </span>
            <span className={`font-mono text-[11px] tracking-[0.1em] ${accentClass}`}>{accentLabel}</span>
          </div>
          <h2 className="text-[22px] font-medium tracking-[-0.01em] text-primary mb-2 leading-[1.15]">
            {title}
          </h2>
          <p className="text-[13px] text-muted leading-[1.6] max-w-[380px] mb-3.5">{description}</p>
          <div className="flex items-center gap-3.5">
            <span className="font-mono text-[11px] text-faint">{ctaCount}</span>
            <span className="font-mono text-[11px] text-faint">·</span>
            <span className={`font-mono text-[11px] ${accentClass} group-hover:underline transition-all duration-150`}>
              {ctaText}{" "}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </span>
          </div>
        </div>
        <div aria-hidden="true" className="w-[110px] h-[90px] shrink-0 opacity-50 group-hover:opacity-90 transition-opacity duration-300">
          {motif}
        </div>
      </div>
    </Link>
  );
}

/* ─── Hero copy (split for the masked reveal) ───────────────────────────── */
const HEADLINE: Array<{ w?: string; cls?: string; br?: boolean }> = [
  { w: "Software" }, { w: "that", cls: "text-[#cba24f]" }, { w: "ships.", cls: "text-[#cba24f]" },
  { br: true },
  { w: "AI" }, { w: "that" }, { w: "tells" }, { w: "the" }, { w: "truth.", cls: "text-[#3dd0c0]" },
];

const EYEBROW = "— full-stack + ai engineer · remote · gmt+6 —";

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set("[data-hero-char]", { opacity: 1 });
      // y: 0 clears the pixel offset GSAP reads from the translate-y class
      gsap.set("[data-hero-word]", { yPercent: 0, y: 0 });
      gsap.set(subRef.current, { opacity: 1 });
      if (cardsRef.current) {
        gsap.set(cardsRef.current.querySelectorAll("[data-reveal]"), { opacity: 1 });
      }
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to("[data-hero-char]", { opacity: 1, duration: 0.45, stagger: 0.012, ease: "none" })
      .fromTo(
        "[data-hero-word]",
        { yPercent: 110, y: 0 },
        { yPercent: 0, y: 0, duration: 0.85, stagger: 0.04 },
        "-=0.25"
      )
      .fromTo(subRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.45");

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(cards,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 82%", once: true },
        }
      );
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div className="min-h-screen bg-base">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* CSS gradient fallback — visible on mobile where canvas is skipped */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, #6B8EAE0A 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, #B899680A 0%, transparent 60%)",
            zIndex: 0,
          }}
        />
        <HeroCanvas />

        <div className="relative z-10 max-w-[720px] mx-auto w-full px-5 md:px-7 pt-7 flex-1 flex flex-col">
          <Nav />

          <div className="flex-1 flex flex-col justify-center py-10 md:py-24">
            <p
              ref={eyebrowRef}
              className="font-mono text-[11px] tracking-[0.08em] text-faint mb-5"
              aria-label={EYEBROW}
            >
              {EYEBROW.split("").map((c, i) => (
                <span key={i} data-hero-char aria-hidden="true" className="opacity-0">
                  {c === " " ? " " : c}
                </span>
              ))}
            </p>
            <h1
              ref={headlineRef}
              className="tracking-[-0.01em] text-primary leading-[1.04] mb-5 max-w-[600px]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(34px, 6.6vw, 70px)", fontWeight: 500 }}
            >
              {HEADLINE.map(({ w, cls, br }, i) =>
                br ? (
                  <span key={i} className="block w-full" aria-hidden="true" />
                ) : (
                  <span key={i}>
                    <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
                      <span data-hero-word className={`inline-block translate-y-[110%] ${cls ?? ""}`}>
                        {w}
                      </span>
                    </span>{" "}
                  </span>
                )
              )}
            </h1>
            <p
              ref={subRef}
              className="text-[15px] text-muted max-w-[460px] leading-[1.75] mb-8"
              style={{ opacity: 0 }}
            >
              A full-stack engineer building production software and AI for real operators — grounded
              answers, honest about the gaps, and no demo-ware.
            </p>
            <div className="flex gap-4 flex-wrap items-center">
              <Link
                href="#work"
                className="font-mono text-[12px] tracking-[0.02em] font-medium px-5 py-3 rounded-sm bg-[#3dd0c0] text-[#04201d] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(61,208,192,0.4)]"
              >
                view work →
              </Link>
              <Link
                href="/about"
                className="font-mono text-[12px] tracking-[0.02em] px-5 py-3 rounded-sm text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-default hover:underline underline-offset-4"
                style={{ border: "0.5px solid var(--border-subtle)" }}
              >
                about me
              </Link>
            </div>
          </div>

          {/* Hero footer — quick links + scroll hint */}
          <div className="flex justify-between items-end pb-8">
            <div className="flex gap-4">
              <a href="https://github.com/Kazzz-ab" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-faint hover:text-default transition-colors duration-150">github ↗</a>
              <a href="https://www.linkedin.com/in/kazi-abrarul-haque05/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-faint hover:text-default transition-colors duration-150">linkedin ↗</a>
              <a href="mailto:kaziabrarulh@gmail.com" className="font-mono text-[11px] text-faint hover:text-default transition-colors duration-150">email ↗</a>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-1.5 opacity-30">
              <span className="font-mono text-[9px] tracking-[0.12em] text-faint">scroll</span>
              <div className="w-px bg-faint" style={{ height: "28px", animation: "fadeDown 2s ease infinite" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Track sections */}
      <div
        id="work"
        className="max-w-[720px] mx-auto px-5 md:px-7 py-10 md:py-14 scroll-mt-16"
        style={{ borderTop: "0.5px solid var(--border-subtle)" }}
      >
        <p className="font-mono text-[10px] tracking-[0.12em] text-faint mb-6">select a track</p>
        <div ref={cardsRef} className="flex flex-col gap-3">
          <TrackCard
            number="01" accentLabel="about" accentClass="text-accent-about" glowColor="#8FA88F"
            title="Kazi Abrarul Haque — Dhaka"
            description="Builds production software and AI systems people can rely on. Available for remote work now — AI integration and architecture-led builds."
            ctaCount="available now" ctaText="read more" href="/about"
            motif={<AboutMotif />}
          />
          <TrackCard
            number="02" accentLabel="ai / ml" accentClass="text-accent-ai" glowColor="#6B8EAE"
            title="AI integration & RAG systems"
            description="Production AI features — retrieval, embeddings, streaming agents, vector search. Built for teams that want AI as a real capability, not a chatbot bolt-on."
            ctaCount="2 projects" ctaText="view work" href="/ai-ml"
            motif={<AiMotif />}
          />
          <TrackCard
            number="03" accentLabel="web & saas" accentClass="text-accent-biz" glowColor="#B89968"
            title="Full-stack web & SaaS"
            description="Booking platforms, multi-tenant apps, headless commerce, marketing systems. Architecture-first builds for operators, not for show."
            ctaCount="4 projects" ctaText="view work" href="/business"
            motif={<BizMotif />}
          />
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-5 md:px-7">
        <Footer />
      </div>
    </div>
  );
}
