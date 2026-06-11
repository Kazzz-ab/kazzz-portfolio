"use client";

import * as runtime from "react/jsx-runtime";
import { Problem } from "./case-study/Problem";
import { Architecture } from "./case-study/Architecture";
import { Decisions } from "./case-study/Decisions";
import { Decision } from "./case-study/Decision";
import { Code } from "./case-study/Code";
import { Outcomes, Works, DoesntYet } from "./case-study/Outcomes";
import { Lessons } from "./case-study/Lessons";
import { Reveal } from "./ui/Reveal";

/* Top-level sections fade up as they scroll into view; nested pieces
   (Decision, Works, DoesntYet) render inside their parent's reveal. */
function withReveal<P extends object>(Component: React.ComponentType<P>) {
  function Revealed(props: P) {
    return (
      <Reveal>
        <Component {...props} />
      </Reveal>
    );
  }
  return Revealed;
}

const mdxComponents = {
  Problem: withReveal(Problem),
  Architecture: withReveal(Architecture),
  Decisions: withReveal(Decisions),
  Decision,
  Code: withReveal(Code),
  Outcomes: withReveal(Outcomes),
  Works,
  DoesntYet,
  Lessons,
};

interface MDXContentProps {
  code: string;
  track?: "ai-ml" | "business";
}

export function MDXContent({ code, track = "ai-ml" }: MDXContentProps) {
  const components = {
    ...mdxComponents,
    Decision: (props: React.ComponentProps<typeof Decision>) => (
      <Decision {...props} accent={track === "ai-ml" ? "ai" : "biz"} />
    ),
    Lessons: (props: React.ComponentProps<typeof Lessons>) => (
      <Reveal>
        <Lessons {...props} accent={track === "ai-ml" ? "ai" : "biz"} />
      </Reveal>
    ),
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const fn = new Function("runtime", code);
    const { default: Component } = fn(runtime) as {
      default: React.ComponentType<{ components: typeof components }>;
    };
    return <Component components={components} />;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return (
      <div
        className="p-4 rounded-sm font-mono text-[12px] text-inflight"
        style={{ border: "0.5px solid var(--border-subtle)" }}
      >
        Case study content could not be rendered: {message}
      </div>
    );
  }
}
