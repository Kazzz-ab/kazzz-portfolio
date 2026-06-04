interface DecisionProps {
  number: string;
  title: string;
  chose: string;
  rejected: string;
  why: string;
  accent?: "ai" | "biz";
}

const accentColor: Record<string, string> = {
  ai: "#6B8EAE",
  biz: "#B89968",
};

export function Decision({ number, title, chose, rejected, why, accent = "ai" }: DecisionProps) {
  const color = accentColor[accent] ?? accentColor.ai;
  return (
    <div
      className="pb-5 mb-5"
      style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
    >
      <div className="flex items-baseline gap-3 mb-3.5">
        <span className="font-mono text-[11px]" style={{ color }}>{number}</span>
        <h4 className="text-[18px] font-medium text-primary">{title}</h4>
      </div>
      <div className="grid gap-y-2.5 gap-x-4 text-[13px] leading-[1.6]" style={{ gridTemplateColumns: "80px 1fr" }}>
        <span className="font-mono text-[10px] tracking-[0.08em] text-faint pt-0.5">chose</span>
        <span className="text-default">{chose}</span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-faint pt-0.5">rejected</span>
        <span className="text-muted">{rejected}</span>
        <span className="font-mono text-[10px] tracking-[0.08em] text-faint pt-0.5">why</span>
        <span className="text-body">{why}</span>
      </div>
    </div>
  );
}
