export type Product = {
  id: string;
  name: string;
  category: "Fuel" | "Hydration" | "Mobility" | "Recovery";
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge: "New" | "Bestseller" | "Limited" | "Sale";
  description: string;
  detail: string;
  benefits: string[];
  variants: string[];
  imagePosition: string;
  accent: "acid" | "silver" | "bone" | "charcoal";
};

export const products: Product[] = [
  {
    id: "charge-01",
    name: "Charge / 01",
    category: "Fuel",
    price: 54,
    rating: 4.9,
    reviews: 184,
    badge: "Bestseller",
    description: "Clean pre-training energy without the crash.",
    detail:
      "A precise blend of creatine, beta-alanine, electrolytes, and tea-derived caffeine designed for clear, sustained output.",
    benefits: ["30 servings", "Third-party tested", "Zero added sugar"],
    variants: ["Citrus Static", "Dark Cherry"],
    imagePosition: "4% center",
    accent: "acid",
  },
  {
    id: "flow-vessel",
    name: "Flow Vessel",
    category: "Hydration",
    price: 38,
    rating: 4.8,
    reviews: 96,
    badge: "New",
    description: "One-hand hydration engineered for motion.",
    detail:
      "A 750 ml impact-resistant vessel with a soft-touch grip, silent carry loop, and removable infusion core.",
    benefits: ["750 ml", "BPA-free", "Dishwasher safe"],
    variants: ["Smoke", "Clear", "Volt"],
    imagePosition: "35% center",
    accent: "silver",
  },
  {
    id: "ground-system",
    name: "Ground System",
    category: "Mobility",
    price: 89,
    compareAt: 108,
    rating: 4.9,
    reviews: 71,
    badge: "Sale",
    description: "A grippy, dense training surface that travels.",
    detail:
      "A 5 mm closed-cell mat with laser-cut alignment marks and a quick-release compression harness.",
    benefits: ["Natural rubber", "5 mm support", "Quick-carry harness"],
    variants: ["Carbon / Volt", "Bone / Black"],
    imagePosition: "66% center",
    accent: "bone",
  },
  {
    id: "reset-spheres",
    name: "Reset Spheres",
    category: "Recovery",
    price: 32,
    rating: 4.7,
    reviews: 123,
    badge: "Limited",
    description: "Targeted pressure for faster resets between sessions.",
    detail:
      "Two complementary densities unlock feet, hips, shoulders, and back without bulky recovery hardware.",
    benefits: ["Dual density", "Travel pouch", "Coach-designed guide"],
    variants: ["Firm / Deep", "Soft / Firm"],
    imagePosition: "96% center",
    accent: "charcoal",
  },
  {
    id: "charge-endurance",
    name: "Charge Endurance",
    category: "Fuel",
    price: 58,
    rating: 4.8,
    reviews: 64,
    badge: "New",
    description: "Long-session electrolytes with an easy finish.",
    detail:
      "Carbohydrate-electrolyte fuel tuned for training blocks longer than 75 minutes, with a deliberately light flavor profile.",
    benefits: ["20 servings", "700 mg sodium", "Easy-mix formula"],
    variants: ["Bare Lemon", "Salted Melon"],
    imagePosition: "4% center",
    accent: "silver",
  },
  {
    id: "flow-mini",
    name: "Flow / 500",
    category: "Hydration",
    price: 30,
    rating: 4.6,
    reviews: 42,
    badge: "Limited",
    description: "Compact carry for short, fast efforts.",
    detail:
      "The compact Flow format keeps the same leakproof valve and tactile grip in a streamlined 500 ml profile.",
    benefits: ["500 ml", "Leakproof valve", "Cup-holder fit"],
    variants: ["Smoke", "Volt"],
    imagePosition: "35% center",
    accent: "acid",
  },
];

export const categories = [
  { number: "01", name: "Fuel", note: "Prime the engine" },
  { number: "02", name: "Hydration", note: "Hold the line" },
  { number: "03", name: "Mobility", note: "Create range" },
  { number: "04", name: "Recovery", note: "Return stronger" },
];

export const testimonials = [
  {
    quote: "The first kit that feels as considered as the training itself.",
    name: "Mara V.",
    role: "Hybrid athlete / Berlin",
    stat: "312 sessions",
  },
  {
    quote: "Charge gives me the lift, not the noise. That difference is everything.",
    name: "Jon Bell",
    role: "Run coach / London",
    stat: "4.9 / 5",
  },
  {
    quote: "Built beautifully, used brutally. The Ground System still looks new.",
    name: "Amir A.",
    role: "Movement coach / Cairo",
    stat: "18 months",
  },
];

export const faqs = [
  {
    question: "Where do I begin?",
    answer:
      "Start with your current constraint: Fuel for low energy, Hydration for long efforts, Mobility for better range, or Recovery for faster return. Every product includes a concise use protocol.",
  },
  {
    question: "Are PULSE/01 supplements tested?",
    answer:
      "Yes. Every production batch is independently screened for label accuracy, contaminants, and banned substances before release.",
  },
  {
    question: "How quickly do orders move?",
    answer:
      "Orders leave our studio within one business day. Express and standard estimates are shown at checkout, with free standard delivery over $75.",
  },
  {
    question: "Can I return used gear?",
    answer:
      "Try it in a real session. If it is not right, contact us within 30 days and we will arrange a return—even if the gear has been lightly used.",
  },
];
