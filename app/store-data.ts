export type Product = {
  id: string;
  name: string;
  category: "Tailoring" | "Dresses" | "Objects" | "Knitwear";
  collection: "Cut / 01" | "Drape / 02" | "Fold / 03";
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge: "New cut" | "Most worn" | "Edition of 80" | "Atelier price";
  status: string;
  description: string;
  detail: string;
  benefits: string[];
  variants: string[];
  imageIndex: number;
  accent: "cobalt" | "ivory" | "oxblood" | "graphite";
};

export const products: Product[] = [
  {
    id: "blue-hour-jacket",
    name: "Blue Hour Jacket",
    category: "Tailoring",
    collection: "Cut / 01",
    price: 420,
    rating: 4.9,
    reviews: 47,
    badge: "Most worn",
    status: "Cut to order / ships in 5 days",
    description: "A cropped wool jacket drawn with one continuous shoulder line.",
    detail: "Cut in compact Italian wool with a soft canvas interior, the Blue Hour Jacket holds its geometry without feeling formal. The off-center closure can be worn buttoned high or released into a wide lapel.",
    benefits: ["Italian compact wool", "Half-canvas construction", "Cupro lining"],
    variants: ["Cobalt / XS", "Cobalt / S", "Cobalt / M", "Cobalt / L"],
    imageIndex: 0,
    accent: "cobalt",
  },
  {
    id: "bias-03-dress",
    name: "Bias No. 3 Dress",
    category: "Dresses",
    collection: "Drape / 02",
    price: 310,
    rating: 4.8,
    reviews: 31,
    badge: "New cut",
    status: "In stock / dispatches tomorrow",
    description: "Liquid silk cut diagonally so the shape follows, never grips.",
    detail: "A calf-length silk dress drafted on the bias with a folded neckline and nearly invisible French seams. Its pattern uses the cloth edge as both structure and decoration.",
    benefits: ["Sandwashed silk", "French seams", "Adjustable back ties"],
    variants: ["Ivory / XS", "Ivory / S", "Ivory / M", "Ivory / L"],
    imageIndex: 1,
    accent: "ivory",
  },
  {
    id: "arc-bag",
    name: "Arc Shoulder Bag",
    category: "Objects",
    collection: "Fold / 03",
    price: 285,
    rating: 4.9,
    reviews: 62,
    badge: "Edition of 80",
    status: "12 remaining / numbered edition",
    description: "One leather panel folded into a soft architectural crescent.",
    detail: "The Arc is formed from a single folded panel of vegetable-tanned calf leather. A concealed magnetic bridge keeps the curved opening quiet and secure.",
    benefits: ["Vegetable-tanned leather", "Cotton drill interior", "Numbered by hand"],
    variants: ["Oxblood", "Black ink", "Natural hide"],
    imageIndex: 2,
    accent: "oxblood",
  },
  {
    id: "studio-pleat-trouser",
    name: "Studio Pleat Trouser",
    category: "Tailoring",
    collection: "Cut / 01",
    price: 240,
    rating: 4.7,
    reviews: 39,
    badge: "Most worn",
    status: "In stock / limited lengths",
    description: "A generous double pleat balanced by a precise high waist.",
    detail: "Made for motion around the worktable, this trouser has two deep forward pleats, an extended waistband, and an internal hem allowance for personal tailoring.",
    benefits: ["Deadstock wool twill", "Adjustable waist tabs", "5 cm hem allowance"],
    variants: ["Graphite / 28", "Graphite / 30", "Graphite / 32", "Graphite / 34"],
    imageIndex: 3,
    accent: "graphite",
  },
  {
    id: "selvedge-knit-shell",
    name: "Selvedge Knit Shell",
    category: "Knitwear",
    collection: "Fold / 03",
    price: 175,
    rating: 4.8,
    reviews: 24,
    badge: "New cut",
    status: "In stock / dispatches tomorrow",
    description: "A ribbed cotton shell that finishes in an unexpected diagonal.",
    detail: "Knitted as one continuous shaped panel, the Selvedge Shell wraps slightly across the body and resolves in an asymmetric engineered edge with no cut waste.",
    benefits: ["Mercerised cotton", "Fully fashioned", "Zero cutting waste"],
    variants: ["Chalk / XS–S", "Chalk / M–L", "Cobalt / XS–S", "Cobalt / M–L"],
    imageIndex: 4,
    accent: "ivory",
  },
  {
    id: "double-fold-scarf",
    name: "Double Fold Scarf",
    category: "Objects",
    collection: "Drape / 02",
    price: 95,
    compareAt: 120,
    rating: 4.9,
    reviews: 53,
    badge: "Atelier price",
    status: "In stock / final cloth length",
    description: "Two saturated silks joined on the bias, never printed.",
    detail: "Cobalt and oxblood silk are joined with a rolled diagonal seam, creating a graphic that changes with every knot. Each scarf is finished by one maker.",
    benefits: ["Double silk crepe", "Hand-rolled edge", "Made in Cairo"],
    variants: ["Cobalt / Oxblood", "Ivory / Graphite"],
    imageIndex: 5,
    accent: "cobalt",
  },
];

export const categories = [
  { number: "01", name: "Tailoring", note: "Structure without stiffness", count: "02 pieces" },
  { number: "02", name: "Dresses", note: "Movement drawn on the bias", count: "01 piece" },
  { number: "03", name: "Objects", note: "Carried forms and soft hardware", count: "02 pieces" },
  { number: "04", name: "Knitwear", note: "Shaped from a single thread", count: "01 piece" },
];

export const testimonials = [
  { quote: "You can feel the intelligence of the pattern before you notice the detail.", name: "Mina S.", role: "Architect / Copenhagen", piece: "Studio Pleat Trouser" },
  { quote: "The Arc is the rare bag that gets better when it stops looking new.", name: "Noor A.", role: "Editor / Beirut", piece: "Arc Shoulder Bag" },
  { quote: "My Blue Hour jacket is quiet, strange, and somehow works with everything.", name: "Eli R.", role: "Set designer / London", piece: "Blue Hour Jacket" },
];

export const faqs = [
  {
    question: "How do I read your sizing?",
    answer: "Every quick view includes the available size inside the variant selector. Our cuts are intentionally relaxed; choose your usual size for the intended silhouette, or email the atelier with your measurements for a personal recommendation.",
  },
  {
    question: "What does cut to order mean?",
    answer: "We keep cloth rather than finished stock for selected pieces. Your garment enters the cutting room after checkout and ships within five working days. It is still fully returnable.",
  },
  {
    question: "Where are the pieces made?",
    answer: "Patterns are developed in Cairo. Garments are made in small partner rooms in Cairo and Porto; leather objects are assembled by a two-person workshop in Ubrique.",
  },
  {
    question: "Can I return a worn piece?",
    answer: "Try it at home with care. Unaltered pieces may be returned within 21 days with their basting thread and garment note attached. Return collection is complimentary.",
  },
];
