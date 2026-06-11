import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kazi Abrarul Haque — full-stack engineer from Dhaka. Final-year CSE, North South University. Specialising in AI integration and production business systems.",
};

const stack = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", note: "strict mode, generics, Zod schemas, utility types" },
      { name: "JavaScript (ES2024)", note: "async/await, modules, runtime behaviour" },
      { name: "SQL", note: "joins, indexes, migrations, query optimisation" },
      { name: "HTML / CSS", note: "semantic markup, accessibility, Tailwind v4" },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Express.js", note: "REST APIs, middleware chains, rate limiting" },
      { name: "Prisma ORM", note: "schema-first, typed queries, PostgreSQL migrations" },
      { name: "PostgreSQL", note: "relational modelling, foreign keys, indexes" },
      { name: "MongoDB Atlas", note: "document store, Atlas Vector Search, aggregation" },
      { name: "Node.js", note: "event loop, streaming, child processes" },
    ],
  },
  {
    category: "Frontend & UI",
    items: [
      { name: "React 19", note: "RSC, hooks, context, component architecture" },
      { name: "Next.js 16", note: "App Router, SSG, SSR, server actions, Turbopack" },
      { name: "Tailwind CSS", note: "utility-first, design systems, v4 CSS tokens" },
      { name: "Three.js", note: "WebGL, particle systems, 3D canvas scenes" },
      { name: "GSAP", note: "scroll-triggered animations, timelines" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "Claude API", note: "structured output, tool use, cite-or-refuse contracts" },
      { name: "Gemini API", note: "structured generation, routing summaries" },
      { name: "Voyage Finance-2", note: "domain-tuned financial embeddings" },
      { name: "RAG pipelines", note: "chunking strategy, retrieval, reranking, eval" },
    ],
  },
  {
    category: "Systems & Tools",
    items: [
      { name: "Vercel", note: "deployment, edge functions, speed insights, ISR" },
      { name: "Webflow", note: "CMS-driven sites, symbols, template architecture" },
      { name: "JWT / RBAC", note: "auth flows, role-based middleware, refresh tokens" },
      { name: "Git / GitHub", note: "branching, CI/CD, pull request workflows" },
    ],
  },
];

export default function AboutPage() {
  return (
    <PageContainer>
      <Nav />

      {/* Header */}
      <div className="relative pb-7 mb-8">
        <Reveal className="flex items-baseline gap-3 mb-3.5">
          <span className="font-mono text-[11px] tracking-[0.04em] text-faint">03</span>
          <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">about</span>
        </Reveal>
        <Reveal as="h1" delay={60} className="text-[30px] md:text-[36px] font-medium tracking-[-0.02em] text-primary leading-[1.1] mb-3">
          Kazi Abrarul Haque
        </Reveal>
        <Reveal as="p" delay={120} className="text-[15px] text-body max-w-[480px] leading-[1.55]">
          Full-stack engineer from Dhaka. Building production systems at the crossroads of software and AI.
        </Reveal>
        <Reveal
          variant="rule"
          delay={150}
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: "var(--border-subtle)" }}
        />
      </div>

      <div className="max-w-[620px] space-y-12">

        {/* Bio */}
        <Reveal as="section">
          <p className="text-[15px] text-body leading-[1.8] mb-4">
            I&apos;m in my final year of Computer Science and Engineering at North South University in Dhaka.
            I started building production systems before the coursework caught up — and kept going from there.
          </p>
          <p className="text-[15px] text-body leading-[1.8]">
            My work sits at the intersection of AI integration and full-stack product engineering.
            I build things that have to work for real operators in real conditions — not demos, not prototypes
            dressed as products. The six projects in this portfolio are all live or in active development.
          </p>
        </Reveal>

        {/* Expertise / Stack */}
        <section>
          <Reveal className="flex items-baseline gap-3 mb-6">
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">expertise</span>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stack.map(({ category, items }, i) => (
              <Reveal
                key={category}
                delay={(i % 2) * 80}
                className="p-4 rounded-sm transition-all duration-300 hover:-translate-y-0.5 border-[0.5px] border-[color:var(--border-subtle)] hover:border-[#8FA88F55]"
                style={{ background: "var(--surface-inset)" }}
              >
                <p className="font-mono text-[10px] tracking-[0.1em] text-accent-about mb-3 uppercase">
                  {category}
                </p>
                <div className="space-y-2.5">
                  {items.map(({ name, note }) => (
                    <div key={name}>
                      <p className="text-[13px] font-medium text-default">{name}</p>
                      <p className="text-[11px] text-faint leading-[1.4] mt-0.5">{note}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">approach</span>
          </div>
          {[
            {
              title: "Mastery before frameworks",
              body: "I spend more time understanding why a tool is built the way it is than learning its API surface. When I pick a tool I can explain the three it was competing against and why those lost.",
            },
            {
              title: "Architecture first, then code",
              body: "The most expensive bugs are built into the data model. I start every system by drawing the boundaries: what's a service, what's a record, what's a side-effect. The first commit is usually the schema.",
            },
            {
              title: "Honest about the gaps",
              body: "Every project here has a \"doesn't yet\" list. Knowing what's missing and why is more useful than pretending everything is finished.",
            },
          ].map(({ title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 80}
              className="pb-5 mb-5"
              style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
            >
              <h3 className="text-[15px] font-medium text-primary mb-1.5">{title}</h3>
              <p className="text-[14px] text-body leading-[1.65]">{body}</p>
            </Reveal>
          ))}
        </section>

        {/* Currently */}
        <Reveal as="section">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">currently</span>
          </div>
          <div
            className="p-5 rounded-sm"
            style={{ background: "var(--surface-inset)", border: "0.5px solid var(--border-subtle)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-shipped" style={{ animation: "pulse-dot 2s ease infinite" }} />
              <span className="font-mono text-[10px] tracking-[0.08em] text-shipped">available for work</span>
            </div>
            <p className="text-[14px] text-body leading-[1.65] mb-3">
              Final year CSE at North South University, Dhaka. Available for remote work from mid-2026 —
              AI integration, full-stack product builds, architecture-led engagements.
            </p>
            <p className="text-[14px] text-body leading-[1.65]">
              Particularly interested in projects where the interesting problem is below the model:
              retrieval design, structured output contracts, multi-tenant systems with real isolation requirements.
            </p>
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal as="section" style={{ borderTop: "0.5px solid var(--border-subtle)", paddingTop: "28px" }}>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">contact</span>
          </div>
          <p className="text-[14px] text-body leading-[1.65] mb-5">
            The best way to start is to send an email with a brief on the project — what it is, what the constraint
            is, what you need. I respond to every serious inquiry within 24 hours.
          </p>
          <a
            href="mailto:kaziabrarulh@gmail.com"
            className="group inline-flex items-center gap-2 font-mono text-[12px] text-accent-about px-4 py-2.5 rounded-sm transition-all duration-200 hover:bg-accent-about/10 border-[0.5px] border-[#8FA88F55] hover:border-[#8FA88F88]"
          >
            kaziabrarulh@gmail.com{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </Reveal>

      </div>

      <div
        className="flex flex-wrap justify-between items-center gap-3 pt-7 mt-10"
        style={{ borderTop: "0.5px solid var(--border-subtle)" }}
      >
        <Link href="/" className="font-mono text-[11px] text-muted hover:text-default transition-colors duration-150">
          ← back to home
        </Link>
        <div className="flex items-center gap-5 font-mono text-[11px] text-muted">
          <Link href="/ai-ml" className="hover:text-default transition-colors duration-150">ai / ml</Link>
          <Link href="/business" className="hover:text-default transition-colors duration-150">business</Link>
        </div>
      </div>

      <Footer />
    </PageContainer>
  );
}
