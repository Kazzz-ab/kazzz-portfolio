import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StackChip } from "@/components/ui/StackChip";
import type { CaseStudy } from "@/.velite";

interface ProjectCardProps {
  project: CaseStudy;
  track: "ai-ml" | "business";
  trackOrder: number;
}

const trackAccent: Record<"ai-ml" | "business", string> = {
  "ai-ml": "text-accent-ai",
  business: "text-accent-biz",
};

export function ProjectCard({ project, track, trackOrder }: ProjectCardProps) {
  const accent = trackAccent[track];

  return (
    <div
      className="flex-none w-[400px] p-5 rounded-sm flex flex-col gap-0"
      style={{
        background: "var(--color-card, #13131A)",
        border: "0.5px solid var(--border-card)",
      }}
    >
      {/* Top row */}
      <div className="flex justify-between items-start mb-3.5">
        <div className="flex items-baseline gap-2">
          <span className={`font-mono text-[11px] tracking-[0.04em] ${accent}`}>
            {String(trackOrder).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-faint uppercase">
            {project.domain}
          </span>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Title + description */}
      <h3 className="text-[26px] font-medium tracking-[-0.01em] text-primary leading-[1.15] mb-1.5">
        {project.title}
      </h3>
      <p className="text-[13px] text-body leading-[1.5] mb-4">
        {project.summary}
      </p>

      {/* Mini diagram placeholder */}
      <div
        className="w-full h-[140px] rounded mb-3 flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.015)",
          border: "0.5px solid var(--border-subtle)",
        }}
      >
        <span className="font-mono text-[10px] text-faint tracking-[0.06em]">
          architecture diagram
        </span>
      </div>

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.primary_stack.slice(0, 4).map((tech) => (
          <StackChip key={tech} label={tech} />
        ))}
      </div>

      {/* Capability line */}
      {project.tags.length > 0 && (
        <p className={`font-mono text-[11px] ${accent} mb-3`}>
          {project.tags.slice(0, 3).join(" · ")}
        </p>
      )}

      {/* Bottom row */}
      <div
        className="flex justify-between items-center pt-3 mt-auto"
        style={{ borderTop: "0.5px solid var(--border-subtle)" }}
      >
        <span className="font-mono text-[11px] text-faint">
          case-study/{project.slug}
        </span>
        <Link
          href={`/work/${project.slug}`}
          className="font-mono text-[11px] text-default hover:text-primary transition-colors duration-150"
        >
          read →
        </Link>
      </div>
    </div>
  );
}
