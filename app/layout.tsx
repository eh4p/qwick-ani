import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STILL/FORM — Domestic studies, made useful",
  description:
    "Tactile furniture, lighting, ceramics, and textiles for rooms in motion.",
  metadataBase: new URL("https://stillform.example"),
  openGraph: {
    title: "STILL/FORM — Domestic studies, made useful",
    description:
      "Tactile furniture, lighting, ceramics, and textiles for rooms in motion.",
    url: "https://stillform.example",
    siteName: "STILL/FORM",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1745,
        height: 909,
        alt: "STILL/FORM Fold Lounge exhibition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STILL/FORM — Domestic studies, made useful",
    description:
      "Tactile furniture, lighting, ceramics, and textiles for rooms in motion.",
    images: ["/og.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
