/**
 * Master list of every image placeholder on the site.
 * See IMAGE-REPLACEMENT-GUIDE.md for how to replace each one.
 */
export interface ImageGuideEntry {
  path: string;
  page: string;
  dimensions: string;
  alt: string;
}

export const imageGuide: ImageGuideEntry[] = [
  // Branding
  { path: "/images/branding/adambelda-logo-placeholder.svg", page: "Header/Footer (all pages)", dimensions: "SVG (any)", alt: "Adam Belda logo" },
  { path: "/images/branding/adambelda-logo-dark.png", page: "Header on light surfaces", dimensions: "600x160", alt: "Adam Belda logo (dark version)" },
  { path: "/images/branding/adambelda-logo-light.png", page: "Header on dark surfaces", dimensions: "600x160", alt: "Adam Belda logo (light version)" },
  { path: "/images/branding/adambelda-favicon.png", page: "Browser tab (all pages)", dimensions: "512x512", alt: "Favicon" },
  { path: "/images/branding/adambelda-social-preview.jpg", page: "Social sharing preview (all pages)", dimensions: "1200x630", alt: "Adam Belda — travel and lifestyle blog" },
  // Home
  { path: "/images/home/adambelda-tropical-hero-placeholder.webp", page: "Home hero", dimensions: "1920x1080", alt: "Dark tropical island at sunset — Adam Belda hero" },
  // About
  { path: "/images/about/adam-belda-profile-placeholder.webp", page: "About Adam", dimensions: "1200x1500", alt: "Portrait of Adam Belda" },
  // Davao 2016
  { path: "/images/blog/davao-2016/davao-city-arrival-placeholder.webp", page: "Article: Davao 2016", dimensions: "1600x1000", alt: "Street scene on arrival in Davao City in 2016" },
  { path: "/images/blog/davao-2016/samal-island-hopping-placeholder.webp", page: "Article: Davao 2016 / Photo Journal", dimensions: "1600x1000", alt: "Island hopping boat moving between stops around Samal Island" },
  { path: "/images/blog/davao-2016/samal-island-beach-placeholder.webp", page: "Article: Davao 2016 (featured)", dimensions: "1600x1000", alt: "A quiet stretch of beach on Samal Island" },
  { path: "/images/blog/davao-2016/pastil-food-placeholder.webp", page: "Article: Davao 2016 / Photo Journal", dimensions: "1600x1200", alt: "Pastil — banana leaf-wrapped rice with shredded chicken" },
  { path: "/images/blog/davao-2016/tablea-chocolate-placeholder.webp", page: "Article: Davao 2016", dimensions: "1600x1000", alt: "Thick tablea hot chocolate made from Davao cacao" },
  { path: "/images/blog/davao-2016/durian-fruit-placeholder.webp", page: "Article: Davao 2016 / Photo Journal", dimensions: "1200x1500", alt: "Durian fruit in a Davao market" },
  { path: "/images/blog/davao-2016/durian-halo-halo-placeholder.webp", page: "Article: Davao 2016", dimensions: "1600x1000", alt: "Durian halo-halo ice cream in Davao" },
  { path: "/images/blog/davao-2016/adam-davao-2016-placeholder.webp", page: "Article: Davao 2016", dimensions: "1200x1500", alt: "Adam Belda in Davao, 2016" },
  // Davao Champion 2024
  { path: "/images/blog/davao-champion-2024/davao-return-placeholder.webp", page: "Article: Grand Chase 2024", dimensions: "1600x1000", alt: "Returning to the streets of Davao City in 2024" },
  { path: "/images/blog/davao-champion-2024/grand-chase-event-venue-placeholder.webp", page: "Article: Grand Chase 2024 / Photo Journal", dimensions: "1600x1067", alt: "Tournament venue in Davao" },
  { path: "/images/blog/davao-champion-2024/grand-chase-gameplay-placeholder.webp", page: "Article: Grand Chase 2024", dimensions: "1600x1000", alt: "Grand Chase Classic gameplay in competition" },
  { path: "/images/blog/davao-champion-2024/adam-competition-placeholder.webp", page: "Article: Grand Chase 2024", dimensions: "1600x1000", alt: "Adam Belda focused mid-match during the tournament" },
  { path: "/images/blog/davao-champion-2024/champion-awarding-placeholder.webp", page: "Article: Grand Chase 2024", dimensions: "1600x1000", alt: "The awarding moment at the championship" },
  { path: "/images/blog/davao-champion-2024/champion-title-placeholder.webp", page: "Article: Grand Chase 2024 (featured) / Photo Journal", dimensions: "1600x1000", alt: "Adam Belda's champion moment" },
  { path: "/images/blog/davao-champion-2024/davao-night-placeholder.webp", page: "Article: Grand Chase 2024", dimensions: "1600x1000", alt: "Davao City at night after the championship" },
  // Macau & Hong Kong 2025
  { path: "/images/blog/macau-hongkong-2025/macau-skyline-placeholder.webp", page: "Article: Macau & HK (featured) / Photo Journal", dimensions: "1600x1000", alt: "Macau skyline at dusk" },
  { path: "/images/blog/macau-hongkong-2025/macau-hotel-placeholder.webp", page: "Article: Macau & HK", dimensions: "1600x1000", alt: "Our five-star hotel stay in Macau" },
  { path: "/images/blog/macau-hongkong-2025/macau-street-placeholder.webp", page: "Article: Macau & HK", dimensions: "1600x1000", alt: "Walking the streets of Macau as a family" },
  { path: "/images/blog/macau-hongkong-2025/macau-hongkong-bus-placeholder.webp", page: "Article: Macau & HK", dimensions: "1600x1000", alt: "The bus crossing from Macau to Hong Kong" },
  { path: "/images/blog/macau-hongkong-2025/hongkong-city-placeholder.webp", page: "Article: Macau & HK / Photo Journal", dimensions: "1200x1500", alt: "Hong Kong cityscape" },
  { path: "/images/blog/macau-hongkong-2025/authentic-hotpot-placeholder.webp", page: "Article: Macau & HK / Photo Journal", dimensions: "1600x1200", alt: "Sharing authentic hotpot in Hong Kong" },
  { path: "/images/blog/macau-hongkong-2025/chinese-lotus-tea-placeholder.webp", page: "Article: Macau & HK", dimensions: "1600x1000", alt: "Authentic Chinese lotus tea" },
  { path: "/images/blog/macau-hongkong-2025/adidas-shopping-placeholder.webp", page: "Article: Macau & HK", dimensions: "1600x1000", alt: "Shopping for Adidas shoes in Hong Kong" },
  { path: "/images/blog/macau-hongkong-2025/luxury-perfume-shopping-placeholder.webp", page: "Article: Macau & HK", dimensions: "1600x1000", alt: "Luxury perfume shopping in Hong Kong" },
  { path: "/images/blog/macau-hongkong-2025/family-travel-placeholder.webp", page: "Article: Macau & HK", dimensions: "1600x1000", alt: "The family travelling together" },
  { path: "/images/blog/macau-hongkong-2025/remembering-dad-placeholder.webp", page: "Article: Macau & HK", dimensions: "1600x1000", alt: "A quiet moment remembering Dad" },
  // Ho Chi Minh 2026
  { path: "/images/blog/ho-chi-minh-2026/ho-chi-minh-arrival-placeholder.webp", page: "Article: Ho Chi Minh", dimensions: "1600x1000", alt: "Arriving in Ho Chi Minh City" },
  { path: "/images/blog/ho-chi-minh-2026/district-1-street-placeholder.webp", page: "Article: Ho Chi Minh (featured) / Photo Journal", dimensions: "1600x1000", alt: "A busy District 1 street" },
  { path: "/images/blog/ho-chi-minh-2026/vietnam-city-traffic-placeholder.webp", page: "Article: Ho Chi Minh", dimensions: "1600x1000", alt: "The famous motorbike traffic" },
  { path: "/images/blog/ho-chi-minh-2026/grabcar-trip-placeholder.webp", page: "Article: Ho Chi Minh", dimensions: "1600x1000", alt: "Riding a GrabCar through the city" },
  { path: "/images/blog/ho-chi-minh-2026/vietnamese-food-placeholder.webp", page: "Article: Ho Chi Minh", dimensions: "1600x1200", alt: "Vietnamese street food spread" },
  { path: "/images/blog/ho-chi-minh-2026/vietnamese-coffee-placeholder.webp", page: "Article: Ho Chi Minh / Photo Journal", dimensions: "1200x1500", alt: "Vietnamese coffee" },
  { path: "/images/blog/ho-chi-minh-2026/creative-coffee-placeholder.webp", page: "Article: Ho Chi Minh", dimensions: "1600x1000", alt: "A creative Vietnamese coffee creation" },
  { path: "/images/blog/ho-chi-minh-2026/cat-cafe-district-1-placeholder.webp", page: "Article: Ho Chi Minh / Photo Journal", dimensions: "1600x1200", alt: "Cats lounging at a District 1 cat café" },
  { path: "/images/blog/ho-chi-minh-2026/budget-fashion-shopping-placeholder.webp", page: "Article: Ho Chi Minh", dimensions: "1600x1000", alt: "Budget fashion shopping" },
  { path: "/images/blog/ho-chi-minh-2026/adam-and-brother-vietnam-placeholder.webp", page: "Article: Ho Chi Minh", dimensions: "1600x1000", alt: "Adam and his brother in Vietnam" },
  { path: "/images/blog/ho-chi-minh-2026/ho-chi-minh-night-placeholder.webp", page: "Article: Ho Chi Minh / Photo Journal", dimensions: "1600x1000", alt: "Ho Chi Minh City at night" },
  // Boracay 2024
  { path: "/images/blog/boracay-2024/boracay-arrival-placeholder.webp", page: "Article: Boracay", dimensions: "1600x1000", alt: "Arriving in Boracay" },
  { path: "/images/blog/boracay-2024/piccolo-hotel-placeholder.webp", page: "Article: Boracay", dimensions: "1600x1000", alt: "The Piccolo Hotel in Station 2" },
  { path: "/images/blog/boracay-2024/station-2-placeholder.webp", page: "Article: Boracay", dimensions: "1600x1000", alt: "The energy of Station 2" },
  { path: "/images/blog/boracay-2024/boracay-white-beach-placeholder.webp", page: "Article: Boracay / Photo Journal", dimensions: "1600x1000", alt: "White Beach, Boracay" },
  { path: "/images/blog/boracay-2024/boracay-sunset-placeholder.webp", page: "Article: Boracay (featured) / Photo Journal", dimensions: "1600x1067", alt: "Boracay sunset over White Beach" },
  { path: "/images/blog/boracay-2024/moms-birthday-placeholder.webp", page: "Article: Boracay", dimensions: "1600x1000", alt: "Celebrating Mom's birthday" },
  { path: "/images/blog/boracay-2024/family-beach-placeholder.webp", page: "Article: Boracay", dimensions: "1600x1000", alt: "The family enjoying White Beach" },
  { path: "/images/blog/boracay-2024/marites-family-trip-placeholder.webp", page: "Article: Boracay", dimensions: "1600x1000", alt: "With cousin Marites on the family trip" },
  { path: "/images/blog/boracay-2024/boracay-food-placeholder.webp", page: "Article: Boracay", dimensions: "1600x1200", alt: "Food during the Boracay trip" },
  { path: "/images/blog/boracay-2024/family-group-photo-placeholder.webp", page: "Article: Boracay / Photo Journal", dimensions: "1600x1200", alt: "Family group photo in Boracay" },
];
