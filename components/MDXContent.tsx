"use client";

import * as runtime from "react/jsx-runtime";
import { Problem } from "./case-study/Problem";
import { Architecture } from "./case-study/Architecture";
import { Decisions } from "./case-study/Decisions";
import { Decision } from "./case-study/Decision";
import { Code } from "./case-study/Code";
import { Outcomes, Works, DoesntYet } from "./case-study/Outcomes";
import { Lessons } from "./case-study/Lessons";

const mdxComponents = {
  Problem,
  Architecture,
  Decisions,
  Decision,
  Code,
  Outcomes,
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
      <Lessons {...props} accent={track === "ai-ml" ? "ai" : "biz"} />
    ),
  };

  // Compile the velite-generated MDX code string into a React component
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function("runtime", code);
  const { default: Component } = fn(runtime) as {
    default: React.ComponentType<{ components: typeof components }>;
  };

  return <Component components={components} />;
}
