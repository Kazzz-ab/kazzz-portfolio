"use client";

import { useRef, useState, useCallback } from "react";
import { ProjectCard } from "./ProjectCard";
import type { CaseStudy } from "@/.velite";

interface ProjectSliderProps {
  projects: CaseStudy[];
  track: "ai-ml" | "business";
}

export function ProjectSlider({ projects, track }: ProjectSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-card]");
    const card = cards[index];
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - 28, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") scrollTo(Math.min(activeIndex + 1, projects.length - 1));
    if (e.key === "ArrowLeft") scrollTo(Math.max(activeIndex - 1, 0));
  }

  return (
    <div>
      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 overflow-x-auto pb-3 outline-none"
        style={{
          margin: "0 -28px",
          padding: "0 0 0 28px",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        tabIndex={0}
        role="region"
        aria-label="Project slider"
        onKeyDown={handleKeyDown}
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            data-card
            style={{ scrollSnapAlign: "start" }}
          >
            <ProjectCard project={project} track={track} trackOrder={i + 1} />
          </div>
        ))}
        {/* Trailing spacer for peek effect */}
        <div className="flex-none w-7 shrink-0" />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center pt-6">
        {/* Position + progress bars */}
        <div className="flex items-center gap-3.5">
          <span className="font-mono text-[11px] text-faint">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-[5px]">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="h-0.5 rounded-full transition-all duration-200"
                style={{
                  width: "28px",
                  background: i === activeIndex ? "currentColor" : "rgba(255,255,255,0.12)",
                  color: track === "ai-ml" ? "#6B8EAE" : "#B89968",
                }}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scrollTo(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            className="font-mono text-[11px] px-2.5 py-1.5 rounded-sm transition-colors duration-150 disabled:opacity-30"
            style={{ border: "0.5px solid var(--border-subtle)" }}
          >
            ←
          </button>
          <button
            onClick={() => scrollTo(Math.min(activeIndex + 1, projects.length - 1))}
            disabled={activeIndex === projects.length - 1}
            className="font-mono text-[11px] px-2.5 py-1.5 rounded-sm transition-colors duration-150 disabled:opacity-30"
            style={{ border: "0.5px solid var(--border-card)" }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
