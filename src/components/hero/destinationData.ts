/**
 * Destination + globe configuration for the hero's interactive 3D globe.
 * Keep data and tuning knobs here — rendering logic never hardcodes a place name or color.
 */

export interface HeroDestination {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  /** Only set when a real article/route exists — never a placeholder link. */
  href?: string;
  /** The Philippines acts as the visual origin for every travel arc. */
  isOrigin?: boolean;
}

export const heroDestinations: HeroDestination[] = [
  {
    id: "philippines",
    name: "Philippines",
    latitude: 12.8797,
    longitude: 121.774,
    href: "/destinations",
    isOrigin: true,
  },
  {
    id: "macau",
    name: "Macau",
    latitude: 22.1987,
    longitude: 113.5439,
    href: "/travel-stories/macau-hong-kong-journey-for-dad",
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    latitude: 22.3193,
    longitude: 114.1694,
    href: "/travel-stories/macau-hong-kong-journey-for-dad",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    latitude: 14.0583,
    longitude: 108.2772,
    href: "/travel-stories/ho-chi-minh-city-vietnam-10-day-trip",
  },
  {
    id: "southkorea",
    name: "South Korea",
    latitude: 35.9078,
    longitude: 127.7669,
  },
  {
    id: "japan",
    name: "Japan",
    latitude: 36.2048,
    longitude: 138.2529,
  },
  {
    id: "taiwan",
    name: "Taiwan",
    latitude: 23.6978,
    longitude: 120.9605,
  },
  {
    id: "abudhabi",
    name: "Abu Dhabi",
    latitude: 24.4539,
    longitude: 54.3773,
  },
];

export const GLOBE_ORIGIN_ID = "philippines";

/** The point the camera frames on first load — centered on Asia-Pacific. */
export const INITIAL_VIEW = { latitude: 15, longitude: 118 };

export const globeConfig = {
  radius: 1.55,
  cameraDistance: 4.4,
  /** Radians/second while idle and not reduced-motion. */
  autoRotateSpeed: 0.045,
  /** Seconds of no interaction before auto-rotation resumes. */
  idleResumeSeconds: 2.5,
  /** Drag sensitivity, radians of rotation per pixel dragged. */
  dragSensitivity: 0.0055,
  /** Minimum px movement before a touch gesture is treated as globe rotation (vs. page scroll). */
  touchDragThreshold: 12,
  /** Max subtle cursor-parallax tilt, in radians. */
  maxParallaxTilt: 0.12,
  markerRadiusOffset: 0.02,
  colors: {
    oceanBase: "#0b0d10",
    oceanDeep: "#1a0508",
    land: "#C99A3D",
    landDim: "#8a6a2c",
    atmosphere: "#8a1420",
    marker: "#D72638",
    markerOrigin: "#E5C59E",
    arc: "#C99A3D",
  },
} as const;
