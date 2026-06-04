interface StackChipProps {
  label: string;
}

export function StackChip({ label }: StackChipProps) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-sm font-mono text-[10px] tracking-[0.04em] text-body"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {label}
    </span>
  );
}
