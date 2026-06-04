import { defineConfig, defineCollection, s } from "velite";

const work = defineCollection({
  name: "CaseStudy",
  pattern: "work/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.string(),
      summary: s.string(),
      problem_oneliner: s.string(),
      order: s.number(),
      featured: s.boolean().default(false),
      status: s.enum(["shipped", "in-flight", "archived"]),
      track: s.enum(["ai-ml", "business"]),
      role: s.string(),
      timeline: s.string(),
      domain: s.string(),
      client_type: s.enum(["Portfolio", "Client", "Open source"]),
      primary_stack: s.array(s.string()),
      ai_layer: s.array(s.string()).nullable().default(null),
      deployment: s.string(),
      repo_url: s.string().optional(),
      demo_url: s.string().optional(),
      loom_url: s.string().optional(),
      architecture_diagram: s.string().optional(),
      tags: s.array(s.string()),
      related_work: s.array(s.string()).default([]),
      related_writing: s.array(s.string()).default([]),
      embedding_ready: s.boolean().default(false),
      embedding_priority: s.enum(["high", "normal", "excluded"]).default("normal"),
      accent_color: s.string().optional(),
      hero_image: s.string().optional(),
      body: s.mdx(),
    })
    .transform((data) => ({ ...data, url: `/work/${data.slug}` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6][ext]",
    clean: true,
  },
  collections: { work },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
