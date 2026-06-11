import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProjectSlider } from "@/components/slider/ProjectSlider";
import { Reveal } from "@/components/ui/Reveal";
import { getCaseStudiesByTrack } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI / ML",
  description:
    "Production AI features — retrieval, embeddings, streaming agents, vector search.",
};

const principles = [
  {
    number: "01",
    title: "Retrieval is the work. The model is the multiplier.",
    body: "The interesting engineering in production AI sits below the model: chunking strategy, embedding choice, retrieval shape, source ranking. Better retrieval makes any model better. Worse retrieval can't be saved by upgrading the model. I spend most of my time on the layer most teams skip past.",
  },
  {
    number: "02",
    title: "Cite or refuse. There is no third option.",
    body: "Every claim from an LLM in production gets anchored to a source the user can verify, or the system refuses to answer. Hallucination isn't a model problem to solve later — it's an architecture problem to design out from v0. The schema enforces what the prompt only requests.",
  },
  {
    number: "03",
    title: "Eval before optimize.",
    body: "You can't optimize what you can't measure. Most \"AI integration\" failures are eval failures — teams ship something that demos well and degrades silently in production because the measurement layer was never built. The recall@k test set is a v0 deliverable, not a v2 patch.",
  },
];

export default function AiMlPage() {
  const projects = getCaseStudiesByTrack("ai-ml");

  return (
    <PageContainer>
      <Nav />

      {/* Track header */}
      <div className="relative pb-7 mb-6">
        <Reveal className="flex items-baseline gap-3 mb-3.5">
          <span className="font-mono text-[11px] tracking-[0.04em] text-faint">01</span>
          <span className="font-mono text-[11px] tracking-[0.1em] text-accent-ai">ai implementations</span>
        </Reveal>
        <Reveal as="h1" delay={60} className="text-[30px] font-medium tracking-[-0.02em] text-primary leading-[1.15] max-w-[480px] mb-3">
          Production AI, beyond the wrapper
        </Reveal>
        <Reveal as="p" delay={120} className="text-[13px] text-muted max-w-[480px] leading-[1.6]">
          Two systems where AI does the actual work — vector retrieval over real documents, agentic loops with cited output. Both grounded in primary sources, both built to show their work.
        </Reveal>
        <Reveal
          variant="rule"
          delay={150}
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: "var(--border-subtle)" }}
        />
      </div>

      {/* Slider */}
      {projects.length > 0 ? (
        <div className="mb-8">
          <ProjectSlider projects={projects} track="ai-ml" />
        </div>
      ) : (
        <div className="mb-8 h-48 flex items-center justify-center font-mono text-[11px] text-faint"
          style={{ border: "0.5px solid var(--border-subtle)", borderRadius: "4px" }}>
          building...
        </div>
      )}

      {/* Principles */}
      <div className="pt-8" style={{ borderTop: "0.5px solid var(--border-subtle)" }}>
        <Reveal className="mb-7">
          <span className="font-mono text-[11px] tracking-[0.1em] text-accent-ai block mb-3">approach</span>
          <h2 className="text-[28px] font-medium tracking-[-0.02em] text-primary leading-[1.2] max-w-[480px]">
            How I think about AI implementation
          </h2>
        </Reveal>

        <div>
          {principles.map((p, i) => (
            <Reveal
              key={p.number}
              delay={i * 90}
              className="grid gap-6 pb-7 mb-7"
              style={{
                gridTemplateColumns: "60px 1fr",
                borderBottom: i < principles.length - 1 ? "0.5px solid var(--border-subtle)" : undefined,
              }}
            >
              <span className="font-mono text-[26px] tracking-[-0.02em] text-accent-ai">
                {p.number}
              </span>
              <div>
                <h3 className="text-[18px] font-medium text-primary mb-3">{p.title}</h3>
                <p className="text-[14px] text-body leading-[1.65] max-w-[520px]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Footer />
    </PageContainer>
  );
}
