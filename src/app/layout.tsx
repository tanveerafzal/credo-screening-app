import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.website),
  title: {
    default: `${BRAND.name} — AML & Sanctions Screening Platform`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "Credo Screening",
    "AML screening",
    "sanctions screening",
    "OFAC screening",
    "PEP screening",
    "background check",
    "watchlist screening",
    "KYC",
    "Trust Credo",
  ],
  openGraph: {
    siteName: BRAND.name,
    type: "website",
    url: BRAND.website,
  },
  alternates: {
    canonical: BRAND.website,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
