interface DecisionsProps {
  children: React.ReactNode;
  subtitle?: string;
}

export function Decisions({ children, subtitle }: DecisionsProps) {
  return (
    <section aria-labelledby="decisions-heading">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[11px] text-faint">03</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted">decisions</span>
      </div>
      <h3 className="text-[22px] font-medium tracking-[-0.01em] text-primary mb-2">
        What I chose, what I rejected, why
      </h3>
      {subtitle && (
        <p className="text-[14px] text-body leading-[1.6] max-w-[500px] mb-5">{subtitle}</p>
      )}
      <div>{children}</div>
    </section>
  );
}
