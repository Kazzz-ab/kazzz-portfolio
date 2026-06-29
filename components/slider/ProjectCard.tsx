"use client";

import Link from "next/link";
import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StackChip } from "@/components/ui/StackChip";
import type { CaseStudy } from "@/.velite";

interface ProjectCardProps {
  project: CaseStudy;
  track: "ai-ml" | "business";
  trackOrder: number;
}

const trackAccent: Record<"ai-ml" | "business", string> = {
  "ai-ml":  "text-accent-ai",
  business: "text-accent-biz",
};

const trackGlow: Record<"ai-ml" | "business", string> = {
  "ai-ml":  "#6B8EAE",
  business: "#B89968",
};

/* Stylised thumbnail — uses the architecture SVG if available, else gradient */
function ProjectThumbnail({ project, track }: { project: CaseStudy; track: "ai-ml" | "business" }) {
  const color = track === "ai-ml" ? "#6B8EAE" : "#B89968";
  const bg = track === "ai-ml"
    ? "linear-gradient(135deg, #0d1a24 0%, #0A0A0B 60%)"
    : "linear-gradient(135deg, #1c1508 0%, #0A0A0B 60%)";

  return (
    <div
      className="w-full h-[130px] rounded-sm relative overflow-hidden flex items-center justify-center mb-3"
      style={{ background: bg, border: `0.5px solid ${color}22` }}
    >
      {project.architecture_diagram ? (
        /* If we have an SVG diagram, show it faintly */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.architecture_diagram}
          alt={`${project.title} architecture`}
          loading="lazy"
          width={600}
          height={300}
          className="w-full h-full object-contain opacity-30 scale-110 transition-all duration-500 group-hover:opacity-50 group-hover:scale-105"
        />
      ) : (
        /* Abstract grid pattern */
        <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-10">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 10 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={c * 22} y={r * 18} width="16" height="12" rx="1"
                fill="none" stroke={color} strokeWidth="0.5" />
            ))
          )}
        </svg>
      )}
      {/* Domain label overlay */}
      <div className="absolute inset-0 flex items-end p-3">
        <span
          className="font-mono text-[9px] tracking-[0.1em] px-2 py-0.5 rounded-sm"
          style={{ color, background: `${color}18`, border: `0.5px solid ${color}33` }}
        >
          {project.domain.toLowerCase()}
        </span>
      </div>
      {/* AI badge */}
      {project.ai_layer && project.ai_layer.length > 0 && (
        <div className="absolute top-2.5 right-2.5">
          <span className="font-mono text-[8px] tracking-[0.08em] px-1.5 py-0.5 rounded-sm text-accent-ai"
            style={{ background: "#6B8EAE18", border: "0.5px solid #6B8EAE33" }}>
            AI-integrated
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project, track, trackOrder }: ProjectCardProps) {
  const accent = trackAccent[track];
  const glow = trackGlow[track];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex-none w-[min(360px,calc(100vw-56px))] sm:w-[400px] p-5 rounded-sm flex flex-col transition-all duration-300"
      style={{
        background: "var(--color-card, #13131A)",
        border: `0.5px solid ${hovered ? glow + "44" : "var(--border-card)"}`,
        boxShadow: hovered ? `0 4px 32px ${glow}12` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      {/* Top row */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-baseline gap-2">
          <span className={`font-mono text-[11px] tracking-[0.04em] ${accent}`}>
            {String(trackOrder).padStart(2, "0")}
          </span>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Title */}
      <h3 className="text-[24px] font-medium tracking-[-0.01em] text-primary leading-[1.15] mb-1.5">
        <span className="link-underline">{project.title}</span>
      </h3>
      <p className="text-[13px] text-body leading-[1.5] mb-3">{project.summary}</p>

      {/* Thumbnail */}
      <ProjectThumbnail project={project} track={track} />

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {project.primary_stack.slice(0, 4).map((tech) => (
          <StackChip key={tech} label={tech} />
        ))}
      </div>

      {/* Capability line */}
      {project.tags.length > 0 && (
        <p className={`font-mono text-[11px] ${accent} mb-3 leading-[1.4]`}>
          {project.tags.slice(0, 3).join(" · ")}
        </p>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Links row */}
      <div
        className="flex items-center justify-between pt-3 mt-2 flex-wrap gap-2"
        style={{ borderTop: "0.5px solid var(--border-subtle)" }}
      >
        <Link
          href={`/work/${project.slug}`}
          className={`font-mono text-[11px] ${accent} hover:underline transition-all duration-150 inline-block py-2 -my-2`}
        >
          case study →
        </Link>
        <div className="flex items-center gap-3">
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] text-faint hover:text-default transition-colors duration-150 inline-block py-2 -my-2">
              live demo
            </a>
          )}
          {project.loom_url && (
            <a href={project.loom_url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] text-faint hover:text-muted transition-colors duration-150 inline-block py-2 -my-2">
              loom
            </a>
          )}
          <a
            href={`mailto:kaziabrarulh@gmail.com?subject=${encodeURIComponent(`Demo request — ${project.title}`)}`}
            className="font-mono text-[10px] text-faint hover:text-muted transition-colors duration-150 inline-block py-2 -my-2"
          >
            ask for demo
          </a>
        </div>
      </div>
    </div>
  );
}
