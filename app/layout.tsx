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
  title: "QRFDS — Software, engineered for what’s next",
  description:
    "QRFDS is a software company designing and engineering ambitious web, mobile, SaaS, cloud, and AI products.",
  metadataBase: new URL("https://qrfds.com"),
  openGraph: {
    title: "QRFDS — Software, engineered for what’s next",
    description:
      "Strategy, design, and engineering for ambitious digital products.",
    url: "https://qrfds.com",
    siteName: "QRFDS",
    type: "website",
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
