import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Engineer working from Dhaka. Final-year CSE student at North South University. Available for AI integration and architecture-led builds.",
};

export default function AboutPage() {
  return (
    <PageContainer>
      <Nav />

      {/* Header */}
      <div className="pb-7 mb-8" style={{ borderBottom: "0.5px solid var(--border-subtle)" }}>
        <div className="flex items-baseline gap-3 mb-3.5">
          <span className="font-mono text-[11px] tracking-[0.04em] text-faint">03</span>
          <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">about</span>
        </div>
        <h1 className="text-[30px] font-medium tracking-[-0.02em] text-primary leading-[1.15] max-w-[480px] mb-3">
          Engineer, writer, working from Dhaka
        </h1>
        <p className="text-[15px] text-body max-w-[480px] leading-[1.55]">
          Building full-stack systems at the crossroads of software and AI.
        </p>
      </div>

      {/* Body */}
      <div className="max-w-[560px] space-y-10">

        {/* Intro */}
        <section>
          <p className="text-[15px] text-body leading-[1.75] mb-4">
            I&apos;m a software engineer in my final year of Computer Science and Engineering at North South University in Dhaka. I started building production systems before the coursework caught up with what I was shipping — and kept going from there.
          </p>
          <p className="text-[15px] text-body leading-[1.75]">
            My work sits at the intersection of AI integration and full-stack product engineering. I build things that have to work for real operators in real conditions — not demos, not prototypes dressed as products.
          </p>
        </section>

        {/* How I work */}
        <section>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">approach</span>
          </div>

          {[
            {
              title: "Mastery before frameworks",
              body: "I spend more time understanding why a tool is built the way it is than learning its API surface. Frameworks are commodity; understanding the constraints they encode is not. When I pick a tool I can explain the three it was competing against and why those lost.",
            },
            {
              title: "Architecture first, then code",
              body: "The most expensive bugs are the ones built into the data model. I start every system by drawing the boundaries: what's a service, what's a record, what's a side-effect. The first commit is usually the schema, not the endpoint.",
            },
            {
              title: "Honest about what doesn't work yet",
              body: "Every project in this portfolio has a \"doesn't yet\" list. I keep it because the alternative — presenting only what works — produces a misleading picture. Knowing what's missing and why is more useful than pretending everything is finished.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="pb-5 mb-5"
              style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
            >
              <h3 className="text-[16px] font-medium text-primary mb-2">{title}</h3>
              <p className="text-[14px] text-body leading-[1.65]">{body}</p>
            </div>
          ))}
        </section>

        {/* Currently */}
        <section>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">currently</span>
          </div>
          <p className="text-[14px] text-body leading-[1.65] mb-4">
            Final year of CSE at North South University, Dhaka. Finishing the degree while shipping the projects you see in this portfolio. Available for remote work — AI integration, full-stack product builds, architecture-led engagements — from mid-2026.
          </p>
          <p className="text-[14px] text-body leading-[1.65]">
            I&apos;m particularly interested in projects where the interesting problem is below the model: retrieval design, structured output contracts, multi-tenant systems with real isolation requirements.
          </p>
        </section>

        {/* Stack -->*/}
        <section>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">stack</span>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-8">
            {[
              ["Backend", "Express · Prisma · PostgreSQL · Node.js"],
              ["Frontend", "React · Next.js · Tailwind CSS · Vite"],
              ["AI / ML", "Claude API · Gemini · Voyage embeddings · Atlas Vector"],
              ["Infrastructure", "Vercel · Webflow · GitHub"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-mono text-[10px] tracking-[0.08em] text-faint mb-1">{label}</p>
                <p className="text-[13px] text-body leading-[1.55]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          className="pt-7"
          style={{ borderTop: "0.5px solid var(--border-subtle)" }}
        >
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.1em] text-accent-about">contact</span>
          </div>
          <p className="text-[14px] text-body leading-[1.65] mb-5">
            The best way to start is to send an email with a brief on the project — what it is, what the constraint is, what you need. I respond to every serious inquiry within 24 hours.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:abrarulh2004@gmail.com"
              className="font-mono text-[12px] text-accent-about hover:text-primary transition-colors duration-150"
            >
              abrarulh2004@gmail.com →
            </a>
          </div>
        </section>

      </div>

      {/* Back links */}
      <div
        className="flex justify-between items-center pt-7 mt-10"
        style={{ borderTop: "0.5px solid var(--border-subtle)" }}
      >
        <Link
          href="/"
          className="font-mono text-[11px] text-muted hover:text-default transition-colors duration-150"
        >
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
