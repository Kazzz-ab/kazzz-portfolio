type Status = "shipped" | "in-flight" | "archived";

interface StatusBadgeProps {
  status: Status;
}

const config: Record<Status, { label: string; dot: string; text: string; border: string }> = {
  shipped: {
    label: "shipped",
    dot: "bg-shipped",
    text: "text-shipped",
    border: "border-shipped/30",
  },
  "in-flight": {
    label: "in flight",
    dot: "bg-inflight",
    text: "text-inflight",
    border: "border-inflight/30",
  },
  archived: {
    label: "archived",
    dot: "bg-ghost",
    text: "text-muted",
    border: "border-ghost/30",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border font-mono text-[10px] tracking-[0.06em] ${c.text} ${c.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
