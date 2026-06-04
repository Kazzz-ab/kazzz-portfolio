interface OutcomesProps {
  children: React.ReactNode;
}

interface ColumnProps {
  children: React.ReactNode;
}

export function Works({ children }: ColumnProps) {
  return (
    <div
      className="rounded p-4.5"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "0.5px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-2 mb-3.5">
        <span className="w-1.5 h-1.5 rounded-full bg-shipped" />
        <span className="font-mono text-[11px] tracking-[0.08em] text-shipped">works</span>
      </div>
      <ul className="text-[13px] text-body leading-[1.75] space-y-1.5 list-none">
        {children}
      </ul>
    </div>
  );
}

export function DoesntYet({ children }: ColumnProps) {
  return (
    <div
      className="rounded p-4.5"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "0.5px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-center gap-2 mb-3.5">
        <span className="w-1.5 h-1.5 rounded-full bg-inflight" />
        <span className="font-mono text-[11px] tracking-[0.08em] text-inflight">doesn&apos;t yet</span>
      </div>
      <ul className="text-[13px] text-body leading-[1.75] space-y-1.5 list-none">
        {children}
      </ul>
    </div>
  );
}

export function Outcomes({ children }: OutcomesProps) {
  return (
    <section aria-labelledby="outcomes-heading">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[11px] text-faint">05</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted">outcomes</span>
      </div>
      <h3 className="text-[22px] font-medium tracking-[-0.01em] text-primary mb-1.5">
        What works, what doesn&apos;t yet
      </h3>
      <p className="text-[14px] text-body mb-5 max-w-[500px] leading-[1.6]">
        Live and queryable. The honest gaps are where the product would invest next, not what I&apos;m hiding.
      </p>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </section>
  );
}
