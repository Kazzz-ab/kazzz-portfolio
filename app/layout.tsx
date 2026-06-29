import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import { Providers } from "./providers";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kazi Abrarul Haque",
    template: "%s · Kazi Abrarul Haque",
  },
  description:
    "Building full-stack business solutions at the crossroads of software and AI.",
  metadataBase: new URL("https://kazzz.dev"),
  openGraph: {
    siteName: "Kazi Abrarul Haque",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
        {/* Static film grain — texture only, zero per-frame cost */}
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
