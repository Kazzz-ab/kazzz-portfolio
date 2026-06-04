interface LessonsProps {
  children: React.ReactNode;
  accent?: "ai" | "biz";
}

const accentColor: Record<string, string> = { ai: "#6B8EAE", biz: "#B89968" };

export function Lessons({ children, accent = "ai" }: LessonsProps) {
  const color = accentColor[accent] ?? accentColor.ai;
  return (
    <section aria-labelledby="lessons-heading">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[11px] text-faint">06</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted">lessons</span>
      </div>
      <h3 className="text-[22px] font-medium tracking-[-0.01em] text-primary mb-5">
        What I&apos;d do differently
      </h3>
      <div
        className="text-[14px] text-body leading-[1.75] max-w-[560px] space-y-4 [&>p]:before:content-['—'] [&>p]:before:mr-2"
        style={{ "--lesson-accent": color } as React.CSSProperties}
      >
        {children}
      </div>
    </section>
  );
}
