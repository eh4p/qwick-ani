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
  title: "SEAM/03 — A Line Becomes a Life",
  description:
    "Pattern-led clothing and objects, drawn in Cairo and made in small rooms. Explore Collection III from SEAM/03.",
  openGraph: {
    title: "SEAM/03 — A Line Becomes a Life",
    description:
      "Six forms cut for material, motion, and a life beyond the season.",
    siteName: "SEAM/03",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "SEAM/03 — A Line Becomes a Life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAM/03 — A Line Becomes a Life",
    description: "Six forms cut for material, motion, and a life beyond the season.",
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
