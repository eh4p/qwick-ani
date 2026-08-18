import type { Metadata } from "next";
import BeautyGallery from "@/components/beauty-gallery/Gallery";

export const metadata: Metadata = {
  title: "Velaire — Premium Beauty Component Library",
  description: "A showroom of 55 premium e-commerce components for a prestige botanical beauty house.",
};

export default function BeautyPage() {
  return <BeautyGallery />;
}
