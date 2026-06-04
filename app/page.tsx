"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";

/* ─── SVG motifs ─────────────────────────────────────────────────────────── */

function AiMotif({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="40" y1="30" x2="80" y2="50" stroke={active ? "#6B8EAE" : "#3A3A38"} strokeWidth="0.5" />
      <line x1="80" y1="50" x2="60" y2="75" stroke={active ? "#6B8EAE" : "#3A3A38"} strokeWidth="0.5" />
      <line x1="20" y1="55" x2="80" y2="50" stroke="#3A3A38" strokeWidth="0.5" />
      <line x1="40" y1="30" x2="100" y2="25" stroke="#3A3A38" strokeWidth="0.5" />
      <line x1="100" y1="25" x2="80" y2="50" stroke="#3A3A38" strokeWidth="0.5" />
      <line x1="20" y1="55" x2="60" y2="75" stroke={active ? "#6B8EAE" : "#3A3A38"} strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="40" cy="30" r="3" fill={active ? "#6B8EAE" : "#3A3A38"} />
      <circle cx="80" cy="50" r="4" fill={active ? "#6B8EAE" : "#5A5A55"} />
      <circle cx="60" cy="75" r="3" fill="#3A3A38" />
      <circle cx="20" cy="55" r="2.5" fill="#3A3A38" />
      <circle cx="100" cy="25" r="2.5" fill="#3A3A38" />
    </svg>
  );
}

function BizMotif({ active }: { active: boolean }) {
  const cells = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]];
  const highlighted = [[1,0],[2,1]];
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {cells.map(([c, r]) => {
        const isHighlighted = highlighted.some(([hc, hr]) => hc === c && hr === r);
        const isFilled = c === 0 && r === 0;
        return (
          <rect
            key={`${c}-${r}`}
            x={20 + c * 22} y={10 + r * 22} width="16" height="16" rx="1"
            fill={isFilled ? (active ? "rgba(184,153,104,0.15)" : "rgba(255,255,255,0.03)") : "none"}
            stroke={isHighlighted ? (active ? "#B89968" : "#5A5A55") : "#3A3A38"}
            strokeWidth="0.5"
          />
        );
      })}
      <rect x="20" y="82" width="72" height="7" rx="1" fill="none" stroke={active ? "#B89968" : "#3A3A38"} strokeWidth="0.5" />
      <rect x="20" y="82" width="28" height="7" rx="1" fill={active ? "rgba(184,153,104,0.2)" : "rgba(255,255,255,0.04)"} />
    </svg>
  );
}

function AboutMotif({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="30" y="8" width="60" height="75" rx="2" fill="none" stroke={active ? "#8FA88F" : "#3A3A38"} strokeWidth="0.5" />
      <line x1="42" y1="30" x2="78" y2="30" stroke="#3A3A38" strokeWidth="0.5" />
      <line x1="42" y1="40" x2="70" y2="40" stroke="#3A3A38" strokeWidth="0.5" />
      <line x1="42" y1="50" x2="74" y2="50" stroke="#3A3A38" strokeWidth="0.5" />
      <text x="60" y="95" textAnchor="middle" fill={active ? "#8FA88F" : "#5A5A55"} fontFamily="monospace" fontSize="8" letterSpacing="0.04em">portrait</text>
    </svg>
  );
}

/* ─── Track section ──────────────────────────────────────────────────────── */

interface TrackSectionProps {
  number: string;
  accentLabel: string;
  accentClass: string;
  title: string;
  description: string;
  ctaCount: string;
  ctaText: string;
  href: string;
  motif: React.ReactNode;
}

function TrackSection({
  number, accentLabel, accentClass, title, description,
  ctaCount, ctaText, href, motif,
}: TrackSectionProps) {
  return (
    <Link href={href} className="group block">
      <div
        className="flex items-start gap-6 py-6 transition-colors duration-200"
        style={{ borderTop: "0.5px solid var(--border-subtle)" }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-2.5">
            <span className="font-mono text-[11px] tracking-[0.04em] text-faint">{number}</span>
            <span className={`font-mono text-[11px] tracking-[0.1em] ${accentClass}`}>{accentLabel}</span>
          </div>
          <h2 className="text-[22px] font-medium tracking-[-0.01em] text-primary mb-2 leading-[1.15]">
            {title}
          </h2>
          <p className="text-[13px] text-muted leading-[1.6] max-w-[380px] mb-3.5">
            {description}
          </p>
          <div className="flex items-center gap-3.5">
            <span className="font-mono text-[11px] text-faint">{ctaCount}</span>
            <span className="font-mono text-[11px] text-faint">·</span>
            <span className="font-mono text-[11px] text-default group-hover:text-primary transition-colors duration-150">
              {ctaText} →
            </span>
          </div>
        </div>
        <div className="w-[120px] h-[100px] shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          {motif}
        </div>
      </div>
    </Link>
  );
}

/* ─── Landing page ───────────────────────────────────────────────────────── */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(useTransform(rawX, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });
  const y = useSpring(useTransform(rawY, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  return (
    <PageContainer>
      <Nav />

      {/* Hero */}
      <div
        ref={heroRef}
        className="pb-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
        style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
      >
        <p className="font-mono text-[11px] tracking-[0.08em] text-faint mb-4">
          — full-stack engineer · dhaka, bd —
        </p>
        <motion.h1
          style={{ x, y }}
          className="text-[38px] font-medium tracking-[-0.02em] text-primary leading-[1.15] max-w-[480px] mb-3"
        >
          Building full-stack business solutions at the crossroads of software and AI.
        </motion.h1>
        <p className="text-[14px] text-muted max-w-[440px] leading-[1.55]">
          NestJS, TypeScript, MongoDB, React. Two tracks of work below — pick the brief that fits.
        </p>
      </div>

      {/* Track sections */}
      <div>
        <TrackSection
          number="01"
          accentLabel="ai / ml"
          accentClass="text-accent-ai"
          title="AI integration & RAG systems"
          description="Production AI features — retrieval, embeddings, streaming agents, vector search. Built for teams that want AI as a real capability, not a chatbot bolt-on."
          ctaCount="2 projects"
          ctaText="view work"
          href="/ai-ml"
          motif={<AiMotif active={false} />}
        />
        <TrackSection
          number="02"
          accentLabel="business"
          accentClass="text-accent-biz"
          title="Full-stack business systems"
          description="Booking platforms, multi-tenant apps, headless commerce, marketing systems. Architecture-first builds for clinics, agencies, and small operators."
          ctaCount="3 projects"
          ctaText="view work"
          href="/business"
          motif={<BizMotif active={false} />}
        />
        <TrackSection
          number="03"
          accentLabel="about"
          accentClass="text-accent-about"
          title="Engineer, writer, working from Dhaka"
          description="Self-taught into senior-level work while completing my CSE degree. Mastery-first approach to building. Available for AI integration and architecture-led builds, remote-first."
          ctaCount="available 2026"
          ctaText="read more"
          href="/about"
          motif={<AboutMotif active={false} />}
        />
      </div>

      <Footer />
    </PageContainer>
  );
}
