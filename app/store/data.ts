export type Product = {
  id: string;
  name: string;
  ritual: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: "Bestseller" | "New" | "Limited" | "Sale";
  image: string;
  imageClass?: string;
  sizes: string[];
  benefits: string[];
};

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};

export const products: Product[] = [
  {
    id: "phase-one",
    name: "Phase One",
    ritual: "Renewal serum · 01",
    category: "Treat",
    description:
      "A silk-weight bio-retinol serum that softens texture and restores a clear, rested luminosity without the usual irritation.",
    price: 96,
    rating: 4.9,
    reviews: 184,
    badge: "Bestseller",
    image: "/velora/phase-serum.png",
    sizes: ["30 ML", "50 ML"],
    benefits: ["Bio-retinol 1%", "Copper peptides", "Barrier-safe"],
  },
  {
    id: "moon-melt",
    name: "Moon Melt",
    ritual: "Barrier cream · 02",
    category: "Moisturize",
    description:
      "A cushion cream with ceramides, ectoin, and snow mushroom that seals in water while keeping skin calm and breathable.",
    price: 78,
    rating: 4.8,
    reviews: 129,
    badge: "New",
    image: "/velora/moon-melt.png",
    sizes: ["50 ML", "75 ML"],
    benefits: ["5 ceramides", "48h hydration", "Microbiome kind"],
  },
  {
    id: "veil-essence",
    name: "Veil Essence",
    ritual: "Hydration mist · 03",
    category: "Hydrate",
    description:
      "A mineral essence mist that floods skin with tremella, beta-glucan, and electrolytes in an ultra-fine weightless veil.",
    price: 64,
    rating: 4.7,
    reviews: 96,
    badge: "Limited",
    image: "/velora/veil-mist.png",
    sizes: ["80 ML", "120 ML"],
    benefits: ["Tremella extract", "Mineral complex", "Alcohol-free"],
  },
  {
    id: "cloud-cleanse",
    name: "Cloud Cleanse",
    ritual: "Amino cleanser · 00",
    category: "Cleanse",
    description:
      "A low-foam amino wash that lifts sunscreen and the day while leaving the acid mantle entirely undisturbed.",
    price: 42,
    rating: 4.9,
    reviews: 212,
    image: "/velora/cloud-cleanse.png",
    sizes: ["100 ML", "150 ML"],
    benefits: ["pH 5.2", "Amino surfactants", "Fragrance-free"],
  },
  {
    id: "afterlight",
    name: "Afterlight",
    ritual: "Night concentrate · 04",
    category: "Treat",
    description:
      "A nocturnal concentrate of bakuchiol and algae lipids that supports visible recovery while you sleep.",
    price: 88,
    originalPrice: 104,
    rating: 4.8,
    reviews: 74,
    badge: "Sale",
    image: "/velora/phase-serum.png",
    imageClass: "product-image-warm",
    sizes: ["30 ML"],
    benefits: ["Bakuchiol", "Algae lipids", "Overnight recovery"],
  },
  {
    id: "quiet-orbit",
    name: "Quiet Orbit",
    ritual: "Eye balm · 05",
    category: "Moisturize",
    description:
      "A cooling peptide balm that cushions the eye contour and softens the look of fatigue without heaviness.",
    price: 58,
    rating: 4.7,
    reviews: 88,
    image: "/velora/moon-melt.png",
    imageClass: "product-image-small",
    sizes: ["15 ML"],
    benefits: ["Tetrapeptides", "Caffeine", "Ophthalmologist tested"],
  },
];

export const faqs = [
  {
    question: "Where should I begin?",
    answer:
      "Start with Cloud Cleanse, Phase One, and Moon Melt. It is a complete three-step ritual for cleansing, treatment, and barrier support.",
  },
  {
    question: "Is VELORA suitable for sensitive skin?",
    answer:
      "Every formula is fragrance-free and barrier-conscious. Patch testing is still recommended when introducing a new active.",
  },
  {
    question: "Can I use Phase One every night?",
    answer:
      "Begin two or three nights a week, then increase as your skin adapts. Follow with Moon Melt and use SPF in the morning.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "Unopened products can be returned within 30 days. If a formula is not right for your skin, our ritual team will help within 14 days of delivery.",
  },
];
