export const fitnessImages = Array.from(
  { length: 12 },
  (_, index) => `/fitness/nth-form-${String(index + 1).padStart(2, "0")}.jpg`,
);

export type Gear = {
  code: string;
  name: string;
  category: string;
  price: string;
  compareAt?: string;
  rating: string;
  badge?: string;
  image: string;
  color: string;
};

export const gear: Gear[] = [
  { code: "RUN/01", name: "Vector Carbon Trainer", category: "Road · Tempo", price: "$168", rating: "4.9", badge: "NEW DROP", image: fitnessImages[5], color: "#c7ff00" },
  { code: "LOAD/32", name: "Stack 32 Adjustable Pair", category: "Strength · 4–32 kg", price: "$389", compareAt: "$430", rating: "4.8", badge: "SHIP FREE", image: fitnessImages[4], color: "#1c1d1c" },
  { code: "FUEL/45", name: "Ion 45 Hydration System", category: "Citrus salt · 20 serves", price: "$34", rating: "4.7", badge: "SUBSCRIBE −15%", image: fitnessImages[6], color: "#f2f2ed" },
  { code: "RESET/02", name: "Grid Recovery Set", category: "Roller + pressure ball", price: "$54", rating: "4.9", badge: "COACH PICK", image: fitnessImages[7], color: "#1749d1" },
  { code: "KIT/08", name: "Airframe Training Top", category: "Men / Women · XS–XXL", price: "$78", rating: "4.6", badge: "8 COLORS", image: fitnessImages[10], color: "#474a4b" },
  { code: "LOAD/20", name: "Field Weight Vest", category: "Modular · 5–20 kg", price: "$148", rating: "4.8", badge: "RESTOCKED", image: fitnessImages[8], color: "#e76622" },
];

export const fitnessFaqs = [
  { question: "How do I choose the right training shoe?", answer: "Start with the session, not the silhouette. Vector is built for tempo road work, Ground/02 for lifting, and Ridge/04 for loose trail. Our 90-second fit tool checks surface, weekly volume, and feel preference." },
  { question: "Is the Stack 32 pair suitable for apartment floors?", answer: "Yes. The plates lock internally and the cradle uses a non-marking rubber base. We still recommend a 6 mm training mat for impact work and sound control." },
  { question: "What is inside Ion 45?", answer: "Each serving supplies 900 mg sodium, 200 mg potassium, 60 mg magnesium, and 15 g carbohydrate. It is designed for sessions longer than 60 minutes or heavy heat exposure." },
  { question: "Can I exchange technical apparel after training in it?", answer: "Unworn apparel can be exchanged within 30 days. For hygiene reasons, trained-in garments cannot be returned unless there is a material or construction fault." },
  { question: "How quickly will heavy equipment arrive?", answer: "Compact gear ships in 2–4 business days. Freight items show a live delivery window at checkout and include room-of-choice placement where available." },
  { question: "Do your programs require a gym membership?", answer: "No. Every plan has a bodyweight path and an equipment path. Your account keeps the same training intent while adapting load, movement, and space." },
];

export const fitnessReviews = [
  { quote: "The Vector feels fast without feeling unstable. I took twenty-three seconds off my 10K PB after one block in them.", name: "Samira K.", discipline: "Road runner · Berlin", product: "Vector Carbon Trainer", metric: "−0:23", image: fitnessImages[2] },
  { quote: "Stack 32 replaced an entire wall of iron. The selector is solid, fast, and quiet enough for 6am sessions.", name: "Jon Bell", discipline: "Strength coach · London", product: "Stack 32", metric: "640 sessions", image: fitnessImages[1] },
  { quote: "Ion is the first mix I can use for a three-hour ride without flavor fatigue or stomach noise.", name: "Luis A.", discipline: "Cyclist · Girona", product: "Ion 45", metric: "182 km", image: fitnessImages[9] },
  { quote: "The Reset set now lives beside my desk. Ten deliberate minutes keeps me moving well between climbing days.", name: "Maya N.", discipline: "Climber · Portland", product: "Grid Recovery Set", metric: "10 min", image: fitnessImages[7] },
];

export const fitnessSections = [
  ["navbars", "Navbars"], ["heroes", "Banners / Heroes"], ["faqs", "FAQ"],
  ["cards", "Product / Collection Cards"], ["footers", "Footers"], ["collages", "Media Collage"],
  ["tabs", "Tabs"], ["newsletters", "Newsletter"], ["reviews", "Reviews / Testimonials"],
  ["carousels", "Swiper / Carousel"], ["stories", "Side Info / Image + Text"],
] as const;
