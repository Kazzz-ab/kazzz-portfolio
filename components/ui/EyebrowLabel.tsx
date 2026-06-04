type Track = "ai" | "biz" | "about";

interface EyebrowLabelProps {
  number?: string;
  accent?: Track;
  children: React.ReactNode;
  className?: string;
}

const accentClass: Record<Track, string> = {
  ai: "text-accent-ai",
  biz: "text-accent-biz",
  about: "text-accent-about",
};

export function EyebrowLabel({
  number,
  accent,
  children,
  className = "",
}: EyebrowLabelProps) {
  return (
    <div
      className={`flex items-baseline gap-3 font-mono text-[11px] tracking-[0.04em] ${className}`}
    >
      {number && <span className="text-faint">{number}</span>}
      <span className={accent ? accentClass[accent] : "text-faint"}>
        {children}
      </span>
    </div>
  );
}
