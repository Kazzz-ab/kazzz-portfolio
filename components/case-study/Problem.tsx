interface ProblemProps {
  children: React.ReactNode;
}

export function Problem({ children }: ProblemProps) {
  return (
    <section aria-labelledby="problem-heading">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[11px] text-faint">01</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted">problem</span>
      </div>
      <div className="text-[14px] text-body leading-[1.65] max-w-[560px] [&>p]:mb-4 last:[&>p]:mb-0">
        {children}
      </div>
    </section>
  );
}
