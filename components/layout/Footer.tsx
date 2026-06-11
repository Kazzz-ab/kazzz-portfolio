export function Footer() {
  return (
    <footer
      className="flex flex-wrap justify-between items-center gap-3 pt-7 mt-12 font-mono text-[11px] text-faint"
      style={{ borderTop: "0.5px solid var(--border-subtle)" }}
    >
      <span>© 2026 Kazi Abrarul Haque</span>
      <div className="flex items-center gap-[18px]">
        <a href="https://github.com/Kazzz-ab" target="_blank" rel="noopener noreferrer"
          className="group hover:text-muted transition-colors duration-150 inline-block py-2 -my-2"><span className="link-underline">github</span></a>
        <a href="https://www.linkedin.com/in/kazi-abrarul-haque05/" target="_blank" rel="noopener noreferrer"
          className="group hover:text-muted transition-colors duration-150 inline-block py-2 -my-2"><span className="link-underline">linkedin</span></a>
        <a href="mailto:kaziabrarulh@gmail.com"
          className="group hover:text-muted transition-colors duration-150 inline-block py-2 -my-2"><span className="link-underline">email</span></a>
      </div>
    </footer>
  );
}
