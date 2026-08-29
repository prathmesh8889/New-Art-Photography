export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/bb212cff-124b-425c-8c17-f82af0f9ebc1/_result.png",
  wedding1: "https://image.qwenlm.ai/generated-images/8af62ad8-f2ab-4acb-a5a6-5647f6ef780d/_result.png",
  wedding2: "https://image.qwenlm.ai/generated-images/736e5925-419a-4704-998a-02d28b879e45/_result.png",
  prewed1: "https://image.qwenlm.ai/generated-images/e2f2fa82-b0fb-410f-bbcd-445be15ea6a6/_result.png",
  prewed2: "https://image.qwenlm.ai/generated-images/cc112fb8-de58-4d66-ba77-8d6619003cce/_result.png",
  event1: "https://image.qwenlm.ai/generated-images/99468291-13e1-458f-bf82-de43c2b8dee9/_result.png",
  baby1: "https://image.qwenlm.ai/generated-images/8d74067c-b2ed-4e05-8ef9-07b0aba5ad76/_result.png",
  bride1: "https://image.qwenlm.ai/generated-images/033beb68-58ef-4ac1-812a-ecb7297d5b88/_result.png",
  bts: "https://image.qwenlm.ai/generated-images/69e7a527-2757-4257-b3b0-743a175a041e/_result.png",
};

export const MAPS_URL = "https://maps.app.goo.gl/o4Hwcip2QNUbEpR47";
export const PHONE_DISPLAY = "+91 88560 05550";
export const PHONE_TEL = "tel:+918856005550";
export const WA_URL = "https://wa.me/918856005550";
export const GALLERY_CODE = "NEWART2025";

/* ---------------- portfolio ---------------- */
export type Category =
  | "Weddings"
  | "Pre-Wedding"
  | "Candid & Events"
  | "Portraits"
  | "Kids & Family";

export const CATEGORIES: Category[] = [
  "Weddings",
  "Pre-Wedding",
  "Candid & Events",
  "Portraits",
  "Kids & Family",
];

export interface PortfolioItem {
  id: number;
  src: string;
  title: string;
  place: string;
  category: Category;
  ratio: "tall" | "wide" | "square";
}

export const PORTFOLIO: PortfolioItem[] = [
  { id: 1, src: IMG.hero, title: "The First Look", place: "Wedding · Yavatmal", category: "Weddings", ratio: "tall" },
  { id: 2, src: IMG.wedding1, title: "Saptapadi at the Mandap", place: "Wedding · Darwha", category: "Weddings", ratio: "wide" },
  { id: 3, src: IMG.wedding2, title: "Haldi Laughter", place: "Haldi · Pusad", category: "Weddings", ratio: "tall" },
  { id: 4, src: IMG.bride1, title: "Kundan in Low Light", place: "Bridal portrait", category: "Portraits", ratio: "tall" },
  { id: 5, src: IMG.prewed1, title: "Dusk by the Lake", place: "Pre-wedding · Isapur", category: "Pre-Wedding", ratio: "wide" },
  { id: 6, src: IMG.prewed2, title: "Marigold Fields", place: "Pre-wedding · Wani", category: "Pre-Wedding", ratio: "tall" },
  { id: 7, src: IMG.event1, title: "Sangeet, Unscripted", place: "Sangeet night · Ner", category: "Candid & Events", ratio: "wide" },
  { id: 8, src: IMG.bts, title: "Behind the Frame", place: "On location", category: "Candid & Events", ratio: "wide" },
  { id: 9, src: IMG.baby1, title: "Little Aarav, One", place: "Cake smash · studio", category: "Kids & Family", ratio: "square" },
];

/* ---------------- packages ---------------- */
export interface Pkg {
  name: string;
  price: string;
  per: string;
  duration: string;
  features: string[];
  featured?: boolean;
}

export const PACKAGES: Pkg[] = [
  {
    name: "Candid Classic",
    price: "₹21,000",
    per: "per event · 1 day",
    duration: "1 day · 1 photographer",
    features: [
      "1 candid photographer",
      "300+ colour-graded photos",
      "Same-day sneak peek on WhatsApp",
      "1 premium album (20 pages)",
      "All original files on drive",
    ],
  },
  {
    name: "Signature Wedding",
    price: "₹51,000",
    per: "per wedding · 2 days",
    duration: "2 days · full squad",
    featured: true,
    features: [
      "2 candid + 1 traditional photographer",
      "4K cinematic wedding teaser",
      "600+ colour-graded photos",
      "Drone coverage of venue & baraat",
      "2 premium albums (30 pages each)",
      "2-hour pre-wedding mini shoot",
      "Priority delivery in 15 days",
    ],
  },
  {
    name: "Royal Film",
    price: "₹1,01,000",
    per: "per wedding · 3 days",
    duration: "3 days · cinema unit",
    features: [
      "3 candid + 2 traditional + 1 filmmaker",
      "Full-length cinematic wedding film",
      "Drone + gimbal + LED lighting rig",
      "Same-day edit reel for sangeet night",
      "Luxury leather album + 2 parents' albums",
      "45-day highlight documentary cut",
    ],
  },
];

export const ADDONS = [
  { name: "Full pre-wedding shoot", price: "+₹8,000" },
  { name: "Drone (per event)", price: "+₹6,000" },
  { name: "Same-day edit reel", price: "+₹5,000" },
  { name: "Extra album (30 pages)", price: "+₹4,500" },
  { name: "Baby / maternity session", price: "+₹3,500" },
  { name: "Photo booth with prints", price: "+₹7,000" },
];

/* ---------------- reviews ---------------- */
export interface Review {
  quote: string;
  names: string;
  event: string;
}

export const REVIEWS: Review[] = [
  {
    quote:
      "We forgot the cameras were there — and that is exactly why every photo feels like a memory, not a pose. The teaser film made our whole family cry.",
    names: "Rohan & Priya",
    event: "Wedding · Yavatmal",
  },
  {
    quote:
      "Booked the Signature package for my daughter's wedding. Two days, three photographers, zero chaos. The album quality is better than studios we saw in Nagpur.",
    names: "Deshmukh Family",
    event: "Wedding · Darwha",
  },
  {
    quote:
      "Our pre-wedding shoot at the lake turned out like a movie poster. They scouted the location a day before and planned every frame with the light.",
    names: "Sagar & Mrunmayee",
    event: "Pre-wedding · Isapur",
  },
  {
    quote:
      "The haldi photos are pure joy — my grandmother laughing with marigolds in her hair. New Art caught moments our own relatives missed.",
    names: "Ankita Kulkarni",
    event: "Haldi & Mehendi · Pusad",
  },
  {
    quote:
      "Professional, punctual, and honest with pricing. The private online gallery link made sharing with 400 relatives effortless.",
    names: "Vikram & Sneha",
    event: "Wedding · Wani",
  },
  {
    quote:
      "Our son's first-birthday smash shoot was so patiently handled. He cried, they waited, they played — and the final frames are treasures.",
    names: "The Bhoyar Family",
    event: "Baby shoot · Studio",
  },
];

export const RATING_BARS = [
  { stars: 5, count: 94 },
  { stars: 4, count: 4 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

/* ---------------- client albums ---------------- */
export interface Album {
  id: number;
  couple: string;
  event: string;
  date: string;
  cover: string;
  images: string[];
}

export const ALBUMS: Album[] = [
  {
    id: 1,
    couple: "A & P",
    event: "Wedding Week",
    date: "Delivered · Feb 2026",
    cover: IMG.wedding1,
    images: [IMG.wedding1, IMG.hero, IMG.wedding2, IMG.bride1, IMG.event1, IMG.prewed1],
  },
  {
    id: 2,
    couple: "S & M",
    event: "Haldi & Mehendi",
    date: "Delivered · Jan 2026",
    cover: IMG.wedding2,
    images: [IMG.wedding2, IMG.event1, IMG.prewed2, IMG.bride1, IMG.hero],
  },
  {
    id: 3,
    couple: "R & N",
    event: "Pre-Wedding · Isapur Lake",
    date: "Delivered · Dec 2025",
    cover: IMG.prewed1,
    images: [IMG.prewed1, IMG.prewed2, IMG.hero, IMG.bride1],
  },
  {
    id: 4,
    couple: "Baby Aarav",
    event: "First Birthday",
    date: "Delivered · Nov 2025",
    cover: IMG.baby1,
    images: [IMG.baby1, IMG.prewed2, IMG.event1],
  },
];

/* ---------------- misc ---------------- */
export const MARQUEE_ITEMS = [
  "Candid Weddings",
  "Pre-Wedding Shoots",
  "Haldi & Mehendi",
  "Drone Films",
  "Sangeet Nights",
  "Album Design",
  "Same-Day Edits",
  "Baby & Maternity",
];

export const ENQUIRY_STYLES = [
  "Candid-first",
  "Traditional",
  "Cinematic film",
  "Drone shots",
  "Same-day edit",
  "Vintage film look",
  "Golden-hour portraits",
  "Family formal groups",
];

export const BUDGETS = [
  "Under ₹25,000",
  "₹25,000 – ₹60,000",
  "₹60,000 – ₹1,20,000",
  "₹1,20,000+",
];

export const EVENT_TYPES = [
  "Wedding",
  "Pre-Wedding",
  "Haldi / Mehendi",
  "Sangeet / Reception",
  "Birthday",
  "Baby / Maternity",
  "Other event",
];
