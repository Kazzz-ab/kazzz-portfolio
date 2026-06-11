import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer className="min-h-screen flex flex-col">
      <Nav />

      <div className="flex-1 flex flex-col justify-center py-20">
        <p className="font-mono text-[11px] tracking-[0.1em] text-faint mb-5">
          404 — track not found
        </p>
        <h1 className="text-[30px] md:text-[36px] font-medium tracking-[-0.02em] text-primary leading-[1.15] mb-4 max-w-[480px]">
          This page isn&apos;t in the catalogue.
        </h1>
        <p className="text-[14px] text-muted leading-[1.65] max-w-[400px] mb-8">
          The address may have changed, or it never existed. Everything that does
          exist is reachable from the start.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/"
            className="group font-mono text-[11px] px-4 py-2.5 rounded-sm text-default transition-all duration-200 border-[0.5px] border-[color:var(--border-card)] hover:text-primary hover:border-[color:var(--border-subtle)]"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span>{" "}
            back to home
          </Link>
          <Link
            href="/ai-ml"
            className="font-mono text-[11px] px-4 py-2.5 rounded-sm text-accent-ai transition-all duration-200 hover:bg-accent-ai/10 border-[0.5px] border-[#6B8EAE55]"
          >
            ai / ml →
          </Link>
          <Link
            href="/business"
            className="font-mono text-[11px] px-4 py-2.5 rounded-sm text-accent-biz transition-all duration-200 hover:bg-accent-biz/10 border-[0.5px] border-[#B8996855]"
          >
            business →
          </Link>
        </div>
      </div>

      <Footer />
    </PageContainer>
  );
}
