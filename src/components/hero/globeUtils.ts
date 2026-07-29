import * as THREE from "three";

/**
 * Converts geographic coordinates to a position on a sphere of the given radius.
 * Convention: longitude 0 sits at +Z*sin(90) after the +180 offset below, matching
 * the classic equirectangular-to-sphere mapping used across the globe + markers + arcs
 * so every consumer stays in agreement.
 */
export function latLngToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/** Rough continent bounding regions (lat/lon boxes) used to fake a "dotted world map". */
const LAND_REGIONS: Array<{ latMin: number; latMax: number; lonMin: number; lonMax: number }> = [
  // Asia — broken into overlapping pieces so the Asia-Pacific silhouette (our focus) reads clearly.
  { latMin: 5, latMax: 30, lonMin: 60, lonMax: 92 }, // South Asia / India
  { latMin: 12, latMax: 42, lonMin: 34, lonMax: 63 }, // Middle East
  { latMin: 20, latMax: 53, lonMin: 73, lonMax: 100 }, // Central Asia / Tibetan plateau
  { latMin: 18, latMax: 46, lonMin: 100, lonMax: 128 }, // East Asia (China / Korea)
  { latMin: 30, latMax: 46, lonMin: 128, lonMax: 146 }, // Japan
  { latMin: 45, latMax: 77, lonMin: 60, lonMax: 180 }, // Siberia
  { latMin: 5, latMax: 23, lonMin: 92, lonMax: 110 }, // Mainland Southeast Asia
  { latMin: -10, latMax: 20, lonMin: 95, lonMax: 141 }, // Maritime SE Asia (incl. Philippines, Taiwan)

  // Europe
  { latMin: 36, latMax: 71, lonMin: -10, lonMax: 40 },

  // Africa
  { latMin: 4, latMax: 37, lonMin: -18, lonMax: 52 },
  { latMin: -35, latMax: 4, lonMin: 8, lonMax: 42 },

  // North America
  { latMin: 25, latMax: 72, lonMin: -168, lonMax: -52 },
  { latMin: 7, latMax: 25, lonMin: -105, lonMax: -77 },

  // South America
  { latMin: -5, latMax: 12, lonMin: -82, lonMax: -50 },
  { latMin: -56, latMax: -5, lonMin: -75, lonMax: -53 },

  // Australia
  { latMin: -44, latMax: -10, lonMin: 112, lonMax: 154 },
];

/** Deterministic 0..1 pseudo-random value from a lat/lon pair, so dot placement is stable across renders. */
function hash2(lat: number, lon: number): number {
  const s = Math.sin(lat * 12.9898 + lon * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function isLikelyLand(lat: number, lon: number): boolean {
  for (const r of LAND_REGIONS) {
    if (lat >= r.latMin && lat <= r.latMax && lon >= r.lonMin && lon <= r.lonMax) {
      const edgeMargin = 3;
      const nearEdge =
        lat - r.latMin < edgeMargin ||
        r.latMax - lat < edgeMargin ||
        lon - r.lonMin < edgeMargin ||
        r.lonMax - lon < edgeMargin;
      // Soften hard rectangle edges so the silhouette doesn't look like flat boxes.
      if (nearEdge && hash2(lat, lon) < 0.45) continue;
      return true;
    }
  }
  return false;
}

/** Builds an equirectangular lat/lon dot grid, keeping only points that fall on "land". */
export function buildLandDotPositions(radius: number, stepDeg = 4): Float32Array {
  const points: number[] = [];
  for (let lat = -80; lat <= 80; lat += stepDeg) {
    for (let lon = -180; lon < 180; lon += stepDeg) {
      if (!isLikelyLand(lat, lon)) continue;
      const v = latLngToVector3(lat, lon, radius);
      points.push(v.x, v.y, v.z);
    }
  }
  return new Float32Array(points);
}

/** Builds the lifted quadratic-bezier arc curve between two points, following the sphere's curvature. */
export function buildArcCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number
): THREE.QuadraticBezierCurve3 {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const liftScale = radius + start.distanceTo(end) * 0.4;
  mid.normalize().multiplyScalar(liftScale);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** One-time feature check — used to decide whether it's worth loading the three.js chunk at all. */
export function hasWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}
