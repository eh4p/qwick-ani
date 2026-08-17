export const images = Array.from(
  { length: 12 },
  (_, index) => `/beauty/velaire-${String(index + 1).padStart(2, "0")}.jpg`,
);

export type Product = {
  name: string;
  category: string;
  price: string;
  compareAt?: string;
  badge?: string;
  rating: string;
  image: string;
  shade?: string;
};

export const products: Product[] = [
  {
    name: "Lucent Barrier Serum",
    category: "Barrier repair · 30 ml",
    price: "$78",
    badge: "Bestseller",
    rating: "4.9",
    image: images[0],
    shade: "#d8c8ae",
  },
  {
    name: "Cloudveil Ceramide Crème",
    category: "Deep moisture · 50 ml",
    price: "$64",
    compareAt: "$82",
    badge: "Limited set",
    rating: "4.8",
    image: images[1],
    shade: "#ece4d5",
  },
  {
    name: "Rouge Moss Satin",
    category: "Sculpting lip color",
    price: "$42",
    badge: "New shade",
    rating: "4.7",
    image: images[2],
    shade: "#762e34",
  },
  {
    name: "Sunlit Skin Tint",
    category: "Sheer mineral veil · 35 ml",
    price: "$52",
    rating: "4.9",
    image: images[3],
    shade: "#a96e4e",
  },
  {
    name: "Nocturne Face Oil",
    category: "Regenerative blend · 30 ml",
    price: "$86",
    badge: "Night ritual",
    rating: "4.9",
    image: images[10],
    shade: "#aa6f28",
  },
  {
    name: "Moonmetal Highlighter",
    category: "Pressed luminizer",
    price: "$48",
    badge: "Only 8 left",
    rating: "4.6",
    image: images[11],
    shade: "#d8d0c3",
  },
];

export const faqItems = [
  {
    question: "Where does Velaire sit between clean beauty and clinical care?",
    answer:
      "We formulate to performance targets first, then edit every formula for skin comfort. Each ingredient earns its place through stability, compatibility, and measured results.",
  },
  {
    question: "Can I layer the Lucent Serum with retinoids?",
    answer:
      "Yes. Apply Lucent after cleansing and before your retinoid to cushion the skin. If you are new to retinoids, alternate evenings for the first two weeks.",
  },
  {
    question: "How do I choose my Skin Tint shade online?",
    answer:
      "Match the depth of your jawline in daylight, then choose your undertone. Our sheer mineral pigments flex across nearby tones, and our shade team can review a photo before you order.",
  },
  {
    question: "Are the formulas fragrance-free?",
    answer:
      "All complexion and treatment formulas are free from synthetic fragrance. A few ritual oils contain clearly disclosed, skin-safe botanical aromatics.",
  },
  {
    question: "What is the refill ritual?",
    answer:
      "Keep your glass vessel. Twist out the finished inner pod, rinse the cap, and click in a sealed refill. Refills use 72% less packaging by weight.",
  },
  {
    question: "When will my order arrive?",
    answer:
      "Complimentary standard delivery takes 3–5 business days. Express and same-day options appear at checkout where available.",
  },
];

export const reviews = [
  {
    quote:
      "The first serum I have finished, repurchased, and then bought for my sister. My skin looks rested even when I am not.",
    name: "Maya R.",
    city: "Brooklyn",
    product: "Lucent Barrier Serum",
    rating: "5.0",
    image: images[4],
  },
  {
    quote:
      "Rouge Moss has that impossible balance: a real color payoff, but it still looks like part of my face.",
    name: "Noor A.",
    city: "Cairo",
    product: "Rouge Moss Satin",
    rating: "4.9",
    image: images[9],
  },
  {
    quote:
      "Cloudveil calmed the tight, shiny feeling I used to get every winter. The finish is expensive, not greasy.",
    name: "Elena V.",
    city: "Madrid",
    product: "Cloudveil Ceramide Crème",
    rating: "5.0",
    image: images[1],
  },
  {
    quote:
      "The tint disappears in seconds and somehow makes everything look more considered. I stopped wearing foundation to work.",
    name: "Imani C.",
    city: "London",
    product: "Sunlit Skin Tint",
    rating: "4.8",
    image: images[3],
  },
];

export const gallerySections = [
  ["navbars", "Navbars"],
  ["heroes", "Banners / Heroes"],
  ["faqs", "FAQ"],
  ["cards", "Product / Collection Cards"],
  ["footers", "Footers"],
  ["collages", "Media Collage"],
  ["tabs", "Tabs"],
  ["newsletters", "Newsletter"],
  ["reviews", "Reviews / Testimonials"],
  ["carousels", "Swiper / Carousel"],
  ["stories", "Side Info / Image + Text"],
] as const;
