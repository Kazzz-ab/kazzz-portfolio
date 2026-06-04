import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProjectSlider } from "@/components/slider/ProjectSlider";
import { getCaseStudiesByTrack } from "@/lib/content";

export const metadata: Metadata = {
  title: "Business",
  description:
    "Multi-tenant SaaS, headless commerce, and AI-integrated marketing systems. Architecture-first builds.",
};

const principles = [
  {
    number: "01",
    title: "Multi-tenant from day one.",
    body: "Most business apps need to support multiple customers eventually. Designing for it later costs more than designing it in — tenant isolation, billing boundaries, and data separation are easier to architect once than to retrofit.",
  },
  {
    number: "02",
    title: "Domain over framework.",
    body: "The interesting work is in the business logic, not the tech stack. Frameworks are commodity. Understanding clinic operations, legal workflows, or a small operator's actual constraints is not.",
  },
  {
    number: "03",
    title: "Boring tech, hard problems.",
    body: "Express, Prisma, React. I reach for boring tech because it frees attention for the actual problem — tenant isolation, domain modeling, clean APIs, real failure modes.",
  },
];

export default function BusinessPage() {
  const projects = getCaseStudiesByTrack("business");
  // Show ClinicFlow + CounselFlow as a paired first entry, then the rest
  const paired = projects.filter((p) => ["clinicflow", "counselflow"].includes(p.slug));
  const single = projects.filter((p) => !["clinicflow", "counselflow"].includes(p.slug));
  const displayProjects = paired.length > 0
    ? [paired[0], ...single]
    : projects;

  return (
    <PageContainer>
      <Nav />

      {/* Track header */}
      <div className="pb-7 mb-6" style={{ borderBottom: "0.5px solid var(--border-subtle)" }}>
        <div className="flex items-baseline gap-3 mb-3.5">
          <span className="font-mono text-[11px] tracking-[0.04em] text-faint">02</span>
          <span className="font-mono text-[11px] tracking-[0.1em] text-accent-biz">business systems</span>
        </div>
        <h1 className="text-[30px] font-medium tracking-[-0.02em] text-primary leading-[1.15] max-w-[480px] mb-3">
          Production systems for real operators
        </h1>
        <p className="text-[13px] text-muted max-w-[480px] leading-[1.6]">
          Multi-tenant SaaS for healthcare and legal practices, headless commerce, and AI-integrated marketing systems. Architecture-first builds for operators, not portfolios.
        </p>
      </div>

      {/* Slider */}
      {displayProjects.length > 0 ? (
        <div className="mb-8">
          <ProjectSlider projects={displayProjects} track="business" />
        </div>
      ) : (
        <div className="mb-8 h-48 flex items-center justify-center font-mono text-[11px] text-faint"
          style={{ border: "0.5px solid var(--border-subtle)", borderRadius: "4px" }}>
          building...
        </div>
      )}

      {/* Principles */}
      <div className="pt-8" style={{ borderTop: "0.5px solid var(--border-subtle)" }}>
        <div className="mb-7">
          <span className="font-mono text-[11px] tracking-[0.1em] text-accent-biz block mb-3">approach</span>
          <h2 className="text-[28px] font-medium tracking-[-0.02em] text-primary leading-[1.2] max-w-[480px]">
            How I think about business systems
          </h2>
        </div>

        <div>
          {principles.map((p, i) => (
            <div
              key={p.number}
              className="grid gap-6 pb-7 mb-7"
              style={{
                gridTemplateColumns: "60px 1fr",
                borderBottom: i < principles.length - 1 ? "0.5px solid var(--border-subtle)" : undefined,
              }}
            >
              <span className="font-mono text-[26px] tracking-[-0.02em] text-accent-biz">
                {p.number}
              </span>
              <div>
                <h3 className="text-[18px] font-medium text-primary mb-3">{p.title}</h3>
                <p className="text-[14px] text-body leading-[1.65] max-w-[520px]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </PageContainer>
  );
}
