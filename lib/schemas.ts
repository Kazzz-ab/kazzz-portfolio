import { z } from "zod";

export const CaseStudySchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  problem_oneliner: z.string(),
  order: z.number().int().positive(),
  featured: z.boolean().default(false),
  status: z.enum(["shipped", "in-flight", "archived"]),
  track: z.enum(["ai-ml", "business"]),
  role: z.string(),
  timeline: z.string(),
  domain: z.string(),
  client_type: z.enum(["Portfolio", "Client", "Open source"]),
  primary_stack: z.array(z.string()),
  ai_layer: z.array(z.string()).nullable().default(null),
  deployment: z.string(),
  repo_url: z.string().url().optional(),
  demo_url: z.string().url().optional(),
  loom_url: z.string().url().optional(),
  architecture_diagram: z.string().optional(),
  tags: z.array(z.string()),
  related_work: z.array(z.string()).default([]),
  related_writing: z.array(z.string()).default([]),
  embedding_ready: z.boolean().default(false),
  embedding_priority: z
    .enum(["high", "normal", "excluded"])
    .default("normal"),
  accent_color: z.string().optional(),
  hero_image: z.string().optional(),
});

export const WritingPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  category: z.enum(["opinion", "tutorial", "decision-log", "postmortem"]),
  published: z.coerce.date(),
  updated: z.coerce.date(),
  reading_time: z.number().int().positive(),
  tags: z.array(z.string()),
  related_work: z.array(z.string()).default([]),
  embedding_ready: z.boolean().default(false),
  embedding_priority: z
    .enum(["high", "normal", "excluded"])
    .default("normal"),
  accent_color: z.string().optional(),
});

// The Zod schemas above are available for runtime validation.
// CaseStudy type is the velite-generated type (re-exported from content.ts).
export type WritingPost = z.infer<typeof WritingPostSchema>;
