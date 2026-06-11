import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StackChip } from "@/components/ui/StackChip";
import { Reveal } from "@/components/ui/Reveal";
import { ReadingProgress } from "@/components/ReadingProgress";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/content";
import { MDXContent } from "@/components/MDXContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const all = getAllCaseStudies();
  return all.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    openGraph: {
      title: cs.title,
      description: cs.summary,
      type: "article",
      url: `https://kazzz.dev/work/${slug}`,
      ...(cs.hero_image ? { images: [{ url: cs.hero_image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description: cs.summary,
    },
  };
}

const trackLabel: Record<string, string> = {
  "ai-ml": "ai implementations",
  business: "business systems",
};

const trackHref: Record<string, string> = {
  "ai-ml": "/ai-ml",
  business: "/business",
};

const trackAccent: Record<string, string> = {
  "ai-ml": "text-accent-ai",
  business: "text-accent-biz",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const accent = trackAccent[cs.track] ?? "text-accent-ai";
  const allProjects = getAllCaseStudies();
  const trackProjects = allProjects.filter((p) => p.track === cs.track);
  const currentIndex = trackProjects.findIndex((p) => p.slug === cs.slug);
  const nextProject =
    trackProjects[currentIndex + 1] ??
    allProjects.filter((p) => p.track !== cs.track)[0];

  type Artifact = { label: string; href: string };
  const artifacts: Artifact[] = (
    [
      cs.repo_url ? { label: "github", href: cs.repo_url } : null,
      cs.demo_url ? { label: "live", href: cs.demo_url } : null,
      cs.loom_url ? { label: "loom", href: cs.loom_url } : null,
    ] as (Artifact | null)[]
  ).filter((x): x is Artifact => x !== null);

  return (
    <PageContainer>
      <ReadingProgress color={cs.track === "ai-ml" ? "#6B8EAE" : "#B89968"} />
      <Nav />

      {/* Hero */}
      <div className="relative pb-5 mb-5">
        <Reveal>
          <Link
            href={trackHref[cs.track]}
            className="font-mono text-[11px] text-muted hover:text-default transition-colors duration-150 block mb-5"
          >
            ← back to {trackLabel[cs.track]}
          </Link>

          <div className="flex items-baseline gap-3 mb-2">
            <span className={`font-mono text-[11px] tracking-[0.1em] ${accent}`}>
              case study · {String(cs.order).padStart(2, "0")}
            </span>
            <span className="font-mono text-[11px] text-faint">{cs.domain.toLowerCase()}</span>
          </div>
        </Reveal>

        <Reveal as="h1" delay={60} className="text-[34px] md:text-[42px] font-medium tracking-[-0.02em] text-primary leading-[1.05] mb-3.5">
          {cs.title}
        </Reveal>
        <Reveal as="p" delay={120} className="text-[15px] text-body max-w-[480px] leading-[1.55]">
          {cs.summary}
        </Reveal>
        <Reveal
          variant="rule"
          delay={150}
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: "var(--border-subtle)" }}
        />
      </div>

      {/* Meta strip */}
      <Reveal
        delay={180}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-7 mb-8"
        style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
      >
        {[
          { label: "status", value: cs.status, isStatus: true },
          { label: "role", value: cs.role },
          { label: "timeline", value: cs.timeline },
        ].map(({ label, value, isStatus }) => (
          <div key={label}>
            <p className="font-mono text-[10px] tracking-[0.08em] text-faint mb-1">{label}</p>
            <p
              className={`text-[13px] ${
                isStatus
                  ? value === "shipped"
                    ? "text-shipped"
                    : value === "in-flight"
                    ? "text-inflight"
                    : "text-muted"
                  : "text-default"
              }`}
            >
              {value}
            </p>
          </div>
        ))}
        <div>
          <p className="font-mono text-[10px] tracking-[0.08em] text-faint mb-1">artifacts</p>
          <div className="flex gap-3 flex-wrap">
            {artifacts.map(({ label, href }) => (
              <a
                key={`${label}-${href}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-default hover:text-primary transition-colors duration-150"
              >
                {label}
              </a>
            ))}
            <a
              href={`mailto:kaziabrarulh@gmail.com?subject=${encodeURIComponent(`Demo request — ${cs.title}`)}`}
              className="text-[13px] text-default hover:text-primary transition-colors duration-150"
            >
              ask for demo
            </a>
          </div>
        </div>
      </Reveal>

      {/* Stack */}
      <Reveal delay={240} className="flex flex-wrap gap-1.5 mb-10">
        {cs.primary_stack.map((tech) => (
          <StackChip key={tech} label={tech} />
        ))}
        {cs.ai_layer?.map((tech) => (
          <StackChip key={tech} label={tech} />
        ))}
      </Reveal>

      {/* Case study body */}
      <div className="space-y-10 mb-10" style={{ borderTop: "0.5px solid var(--border-subtle)", paddingTop: "32px" }}>
        <MDXContent code={cs.body} track={cs.track} />
      </div>

      {/* Next case study */}
      {nextProject && (
        <div className="pt-7" style={{ borderTop: "0.5px solid var(--border-subtle)" }}>
          <div
            className="grid gap-5 items-center pb-6 mb-5"
            style={{
              gridTemplateColumns: "1fr auto",
              borderBottom: "0.5px solid var(--border-subtle)",
            }}
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] text-faint mb-2.5">next case study →</p>
              <p className="text-[22px] font-medium tracking-[-0.01em] text-primary">{nextProject.title}</p>
              <p className="font-mono text-[11px] text-muted tracking-[0.04em] mt-1.5">
                {nextProject.status} · {trackLabel[nextProject.track]} · {String(nextProject.order).padStart(2, "0")}
              </p>
            </div>
            <Link
              href={`/work/${nextProject.slug}`}
              className={`group font-mono text-[11px] text-default px-3.5 py-2.5 rounded-sm hover:text-primary transition-all duration-200 border-[0.5px] border-[color:var(--border-card)] ${
                nextProject.track === "ai-ml"
                  ? "hover:border-[#6B8EAE66] hover:bg-[#6B8EAE0A]"
                  : "hover:border-[#B8996866] hover:bg-[#B899680A]"
              }`}
            >
              read{" "}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <div className="flex justify-between items-center">
            <Link
              href={trackHref[cs.track]}
              className="font-mono text-[11px] text-muted hover:text-default transition-colors duration-150"
            >
              ← back to {trackLabel[cs.track]}
            </Link>
            <div className="flex gap-4.5">
              {artifacts.map(({ label, href }) => (
                <a
                  key={`${label}-${href}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-muted hover:text-default transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
              <a
                href={`mailto:kaziabrarulh@gmail.com?subject=${encodeURIComponent(`Demo request — ${cs.title}`)}`}
                className="font-mono text-[11px] text-muted hover:text-default transition-colors duration-150"
              >
                ask for demo
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </PageContainer>
  );
}
