/** Destinations for the interactive map (abstract, custom-drawn map — not a real map tile service). */
export interface Destination {
  id: string;
  name: string;
  country: string;
  year: string;
  preview: string;
  articleSlug: string;
  articleBase: "travel-stories" | "gaming-journeys";
  thumbnail: { src: string; alt: string };
  /** Position on the abstract map, percentage coordinates */
  x: number;
  y: number;
}

export const destinations: Destination[] = [
  {
    id: "davao",
    name: "Davao City",
    country: "Philippines",
    year: "2016 & 2024",
    preview:
      "First durian, first island hopping — and eight years later, a Grand Chase Classic championship.",
    articleSlug: "davao-samal-island-trip-2016",
    articleBase: "travel-stories",
    thumbnail: {
      src: "/images/blog/davao-2016/davao-city-arrival-placeholder.webp",
      alt: "Davao City street scene",
    },
    x: 72,
    y: 62,
  },
  {
    id: "samal",
    name: "Samal Island",
    country: "Philippines",
    year: "2016",
    preview: "A day of island hopping where the plan was simply the next beach.",
    articleSlug: "davao-samal-island-trip-2016",
    articleBase: "travel-stories",
    thumbnail: {
      src: "/images/blog/davao-2016/samal-island-beach-placeholder.webp",
      alt: "Samal Island beach",
    },
    x: 75,
    y: 65,
  },
  {
    id: "boracay",
    name: "Boracay",
    country: "Philippines",
    year: "November 2024",
    preview: "Four days celebrating Mom's birthday with the whole family on White Beach.",
    articleSlug: "boracay-family-birthday-trip-2024",
    articleBase: "travel-stories",
    thumbnail: {
      src: "/images/blog/boracay-2024/boracay-sunset-placeholder.webp",
      alt: "Boracay sunset",
    },
    x: 66,
    y: 52,
  },
  {
    id: "macau",
    name: "Macau",
    country: "Macau",
    year: "September 2025",
    preview: "The birthday journey we continued for Dad — beautiful and bittersweet.",
    articleSlug: "macau-hong-kong-journey-for-dad",
    articleBase: "travel-stories",
    thumbnail: {
      src: "/images/blog/macau-hongkong-2025/macau-skyline-placeholder.webp",
      alt: "Macau skyline",
    },
    x: 58,
    y: 34,
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    country: "Hong Kong",
    year: "September 2025",
    preview: "Hotpot, lotus tea, and unexpected shopping joy — carrying Dad with us.",
    articleSlug: "macau-hong-kong-journey-for-dad",
    articleBase: "travel-stories",
    thumbnail: {
      src: "/images/blog/macau-hongkong-2025/hongkong-city-placeholder.webp",
      alt: "Hong Kong cityscape",
    },
    x: 62,
    y: 32,
  },
  {
    id: "hochiminh",
    name: "Ho Chi Minh City",
    country: "Vietnam",
    year: "January 2026",
    preview: "Ten affordable days with my little brother — coffee, cats, and constant energy.",
    articleSlug: "ho-chi-minh-city-vietnam-10-day-trip",
    articleBase: "travel-stories",
    thumbnail: {
      src: "/images/blog/ho-chi-minh-2026/district-1-street-placeholder.webp",
      alt: "District 1 street, Ho Chi Minh City",
    },
    x: 45,
    y: 48,
  },
];

export interface TimelineStop {
  year: string;
  title: string;
  description: string;
  href: string;
}

export const timeline: TimelineStop[] = [
  {
    year: "2016",
    title: "First Davao & Samal Island adventure",
    description: "Island hopping, pastil, tablea — and facing my first durian.",
    href: "/travel-stories/davao-samal-island-trip-2016",
  },
  {
    year: "Nov 2024",
    title: "Family trip to Boracay",
    description: "Four days celebrating Mom's birthday with the whole family.",
    href: "/travel-stories/boracay-family-birthday-trip-2024",
  },
  {
    year: "2024",
    title: "Return to Davao — Grand Chase Classic Champion",
    description: "Winning the Davao Regional Championship by PlayPark.",
    href: "/gaming-journeys/davao-grand-chase-classic-champion-2024",
  },
  {
    year: "Sep 2025",
    title: "Macau & Hong Kong journey",
    description: "The birthday trip we continued in Dad's memory.",
    href: "/travel-stories/macau-hong-kong-journey-for-dad",
  },
  {
    year: "Jan 2026",
    title: "Ten days in Ho Chi Minh City",
    description: "An affordable adventure with my little brother.",
    href: "/travel-stories/ho-chi-minh-city-vietnam-10-day-trip",
  },
];

export interface FoodItem {
  name: string;
  origin: string;
  note: string;
  href: string;
}

export const foods: FoodItem[] = [
  { name: "Pastil", origin: "Davao, Philippines", note: "Banana leaf-wrapped rice with shredded chicken — humble and perfect.", href: "/travel-stories/davao-samal-island-trip-2016" },
  { name: "Tablea", origin: "Davao, Philippines", note: "Pure local cacao melted into thick, roasted hot chocolate.", href: "/travel-stories/davao-samal-island-trip-2016" },
  { name: "Durian", origin: "Davao, Philippines", note: "The smell nearly won. The taste made me a believer.", href: "/travel-stories/davao-samal-island-trip-2016" },
  { name: "Durian Halo-Halo", origin: "Davao, Philippines", note: "The friendly gateway to durian — cold, blended, delicious.", href: "/travel-stories/davao-samal-island-trip-2016" },
  { name: "Authentic Hotpot", origin: "Hong Kong", note: "A slow, communal meal that filled our family's table when we needed it most.", href: "/travel-stories/macau-hong-kong-journey-for-dad" },
  { name: "Chinese Lotus Tea", origin: "Hong Kong", note: "Delicate and calming — my quiet ritual of the trip.", href: "/travel-stories/macau-hong-kong-journey-for-dad" },
  { name: "Vietnamese Coffee", origin: "Ho Chi Minh City", note: "Structurally strong coffee that ruined ordinary coffee for me.", href: "/travel-stories/ho-chi-minh-city-vietnam-10-day-trip" },
  { name: "Vietnamese Street Food", origin: "Ho Chi Minh City", note: "Eating brilliantly for almost nothing, meal after meal.", href: "/travel-stories/ho-chi-minh-city-vietnam-10-day-trip" },
];

export interface JournalPhoto {
  src: string;
  alt: string;
  caption: string;
  location: string;
  date: string;
  destination: string;
  width: number;
  height: number;
}

export const journalPhotos: JournalPhoto[] = [
  { src: "/images/blog/davao-2016/samal-island-hopping-placeholder.webp", alt: "Island hopping boat around Samal", caption: "The plan was simply the next beach.", location: "Samal Island", date: "2016", destination: "Davao & Samal", width: 1600, height: 1000 },
  { src: "/images/blog/davao-2016/durian-fruit-placeholder.webp", alt: "Durian fruit in a Davao market", caption: "Facing the king of fruits.", location: "Davao City", date: "2016", destination: "Davao & Samal", width: 1200, height: 1500 },
  { src: "/images/blog/davao-2016/pastil-food-placeholder.webp", alt: "Pastil wrapped in banana leaf", caption: "The best simple meal of the trip.", location: "Davao City", date: "2016", destination: "Davao & Samal", width: 1600, height: 1200 },
  { src: "/images/blog/boracay-2024/boracay-white-beach-placeholder.webp", alt: "White Beach, Boracay", caption: "Sand that earns its reputation.", location: "Boracay", date: "November 2024", destination: "Boracay", width: 1600, height: 1000 },
  { src: "/images/blog/boracay-2024/boracay-sunset-placeholder.webp", alt: "Boracay sunset", caption: "The island's daily main event.", location: "White Beach, Boracay", date: "November 2024", destination: "Boracay", width: 1600, height: 1067 },
  { src: "/images/blog/boracay-2024/family-group-photo-placeholder.webp", alt: "Family group photo in Boracay", caption: "The whole family, one frame.", location: "Boracay", date: "November 2024", destination: "Boracay", width: 1600, height: 1200 },
  { src: "/images/blog/davao-champion-2024/champion-title-placeholder.webp", alt: "Champion moment, Grand Chase Classic Davao", caption: "Davao Regional Champion.", location: "Davao City", date: "2024", destination: "Davao & Samal", width: 1600, height: 1000 },
  { src: "/images/blog/davao-champion-2024/grand-chase-event-venue-placeholder.webp", alt: "Tournament venue in Davao", caption: "Event energy everywhere.", location: "Davao City", date: "2024", destination: "Davao & Samal", width: 1600, height: 1067 },
  { src: "/images/blog/macau-hongkong-2025/macau-skyline-placeholder.webp", alt: "Macau skyline at dusk", caption: "Beautiful and bittersweet.", location: "Macau", date: "September 2025", destination: "Macau & Hong Kong", width: 1600, height: 1000 },
  { src: "/images/blog/macau-hongkong-2025/authentic-hotpot-placeholder.webp", alt: "Hotpot dinner in Hong Kong", caption: "A full table when we needed one.", location: "Hong Kong", date: "September 2025", destination: "Macau & Hong Kong", width: 1600, height: 1200 },
  { src: "/images/blog/macau-hongkong-2025/hongkong-city-placeholder.webp", alt: "Hong Kong streets", caption: "Two cities, one bus ride apart.", location: "Hong Kong", date: "September 2025", destination: "Macau & Hong Kong", width: 1200, height: 1500 },
  { src: "/images/blog/ho-chi-minh-2026/vietnamese-coffee-placeholder.webp", alt: "Vietnamese coffee", caption: "Structurally strong.", location: "Ho Chi Minh City", date: "January 2026", destination: "Ho Chi Minh City", width: 1200, height: 1500 },
  { src: "/images/blog/ho-chi-minh-2026/cat-cafe-district-1-placeholder.webp", alt: "District 1 cat café", caption: "Feline diplomacy in District 1.", location: "Ho Chi Minh City", date: "January 2026", destination: "Ho Chi Minh City", width: 1600, height: 1200 },
  { src: "/images/blog/ho-chi-minh-2026/ho-chi-minh-night-placeholder.webp", alt: "Ho Chi Minh City at night", caption: "The energy never really stops.", location: "Ho Chi Minh City", date: "January 2026", destination: "Ho Chi Minh City", width: 1600, height: 1000 },
];
