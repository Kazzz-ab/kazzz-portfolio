interface CodeProps {
  language?: string;
  title?: string;
  children: React.ReactNode;
}

export function Code({ language = "typescript", title, children }: CodeProps) {
  return (
    <section aria-labelledby="code-heading">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-[11px] text-faint">04</span>
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted">code</span>
      </div>
      {title && (
        <h3 className="text-[22px] font-medium tracking-[-0.01em] text-primary mb-4">{title}</h3>
      )}
      <div
        className="rounded overflow-hidden"
        style={{
          background: "#0F0F14",
          border: "0.5px solid var(--border-subtle)",
        }}
      >
        {title && (
          <div
            className="flex items-center justify-between px-5 py-2.5"
            style={{ borderBottom: "0.5px solid var(--border-subtle)" }}
          >
            <span className="font-mono text-[11px] text-faint">{title}</span>
            <span className="font-mono text-[10px] text-faint">{language}</span>
          </div>
        )}
        <pre className="px-5 py-4.5 overflow-x-auto font-mono text-[12px] leading-[1.75] text-body">
          <code>{children}</code>
        </pre>
      </div>
    </section>
  );
}
