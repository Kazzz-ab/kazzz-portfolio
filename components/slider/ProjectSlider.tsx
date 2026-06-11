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

  // The left gutter matches PageContainer padding (20px mobile / 28px md+),
  // so read it from the container instead of hardcoding.
  const gutterOf = (container: HTMLElement) =>
    parseFloat(getComputedStyle(container).paddingLeft) || 28;

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-card]");
    const card = cards[index];
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - gutterOf(container), behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  // Detect active card on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const gutter = gutterOf(container);
      const cards = container.querySelectorAll<HTMLElement>("[data-card]");
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - container.scrollLeft - gutter);
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
      {/* Slider — bleeds to the container edge (20px mobile / 28px md+) */}
      <div
        ref={scrollRef}
        className="slider-mask flex gap-3.5 overflow-x-auto outline-none -mx-5 md:-mx-7 pl-5 md:pl-7 pb-3 cursor-grab active:cursor-grabbing"
        style={{
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
        <div className="flex-none w-5 md:w-7 shrink-0" aria-hidden />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center pt-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-faint">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div className="flex items-center">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="flex items-center px-[3px] py-2.5"
                aria-label={`Project ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <span
                  className="rounded-full transition-all duration-250"
                  style={{
                    width: i === activeIndex ? "24px" : "6px",
                    height: "6px",
                    background: i === activeIndex ? color : "var(--color-ghost)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scrollTo(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            className="group font-mono text-[13px] w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-150 disabled:opacity-25"
            style={{ border: "0.5px solid var(--border-subtle)" }}
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          </button>
          <button
            onClick={() => scrollTo(Math.min(activeIndex + 1, projects.length - 1))}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
            className="group font-mono text-[13px] w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-150 disabled:opacity-25"
            style={{ border: `0.5px solid ${color}55`, color }}
          >
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
