import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NTH/FORM — Health & Fitness Component Library",
  description:
    "A curated showroom of 55 premium e-commerce components for technical health and fitness retail.",
  openGraph: {
    title: "NTH/FORM — Health & Fitness Component Library",
    description:
      "55 kinetic, responsive commerce components for training, equipment, fuel, and recovery.",
    siteName: "NTH/FORM Component Library",
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
