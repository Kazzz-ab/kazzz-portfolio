"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import type { CaseStudy } from "@/.velite";

interface ProjectSliderProps {
  projects: CaseStudy[];
  track: "ai-ml" | "business";
}

const trackColor: Record<"ai-ml" | "business", string> = {
  "ai-ml":  "#6B8EAE",
  business: "#B89968",
};

export function ProjectSlider({ projects, track }: ProjectSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const color = trackColor[track];

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-card]");
    const card = cards[index];
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - 28, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  // Detect active card on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const cards = container.querySelectorAll<HTMLElement>("[data-card]");
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - container.scrollLeft - 28);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") scrollTo(Math.min(activeIndex + 1, projects.length - 1));
    if (e.key === "ArrowLeft")  scrollTo(Math.max(activeIndex - 1, 0));
  }

  return (
    <div>
      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 overflow-x-auto pb-3 outline-none"
        style={{
          margin: "0 -28px",
          padding: "0 0 12px 28px",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
        tabIndex={0}
        role="region"
        aria-label="Project slider"
        onKeyDown={handleKeyDown}
      >
        {projects.map((project, i) => (
          <div key={project.slug} data-card style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
            <ProjectCard project={project} track={track} trackOrder={i + 1} />
          </div>
        ))}
        <div className="flex-none w-7 shrink-0" aria-hidden />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center pt-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-faint">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="rounded-full transition-all duration-250"
                style={{
                  width: i === activeIndex ? "24px" : "6px",
                  height: "6px",
                  background: i === activeIndex ? color : "rgba(255,255,255,0.12)",
                }}
                aria-label={`Project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scrollTo(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            className="font-mono text-[13px] w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-150 disabled:opacity-25"
            style={{ border: "0.5px solid var(--border-subtle)" }}
          >
            ←
          </button>
          <button
            onClick={() => scrollTo(Math.min(activeIndex + 1, projects.length - 1))}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
            className="font-mono text-[13px] w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-150 disabled:opacity-25"
            style={{ border: `0.5px solid ${color}55`, color }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
