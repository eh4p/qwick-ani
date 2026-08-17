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
  title: "VELORA — Skin in another state",
  description:
    "Bio-intelligent, barrier-conscious skincare designed to move with your skin.",
  metadataBase: new URL("https://velora.example"),
  icons: {
    icon: "/velora/mark.svg",
    shortcut: "/velora/mark.svg",
  },
  openGraph: {
    title: "VELORA — Skin in another state",
    description:
      "Bio-intelligent skincare for skin in motion.",
    url: "https://velora.example",
    siteName: "VELORA",
    type: "website",
    images: ["/velora/skin-phase.png"],
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
