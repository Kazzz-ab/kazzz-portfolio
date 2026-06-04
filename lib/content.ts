import { work } from "@/.velite";
import type { CaseStudy } from "@/.velite";

export function getAllCaseStudies(): CaseStudy[] {
  return [...work].sort((a, b) => a.order - b.order);
}

export function getCaseStudiesByTrack(track: "ai-ml" | "business"): CaseStudy[] {
  return getAllCaseStudies().filter((cs) => cs.track === track);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((cs) => cs.featured);
}
