import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velaire — Premium Beauty Component Library",
  description:
    "A curated showroom of 55 premium e-commerce components for a prestige botanical beauty house.",
  openGraph: {
    title: "Velaire — Premium Beauty Component Library",
    description:
      "55 art-directed, responsive commerce components for beauty.",
    siteName: "Velaire Component Library",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
