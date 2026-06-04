import Image from "next/image";

interface ArchitectureProps {
  diagram?: string;
  children: React.ReactNode;
}

export function Architecture({ diagram, children }: ArchitectureProps) {
  return (
    <section aria-labelledby="architecture-heading">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[11px] text-faint">02</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted">architecture</span>
      </div>

      <div className="text-[14px] text-body leading-[1.65] max-w-[560px] mb-5 [&>p]:mb-4">
        {children}
      </div>

      {diagram && (
        <div
          className="rounded relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "0.5px solid var(--border-subtle)",
            padding: "22px",
          }}
        >
          <span className="absolute top-3 right-3 font-mono text-[10px] text-faint">
            architecture diagram
          </span>
          <Image
            src={diagram}
            alt="Architecture diagram"
            width={640}
            height={360}
            className="w-full h-auto"
          />
        </div>
      )}
    </section>
  );
}
