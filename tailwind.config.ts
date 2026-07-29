import type { Config } from "tailwindcss";

/**
 * Adam Belda brand tokens — dark cinematic tropical theme.
 * Dark red + black dominate; tropical hues are subtle accents only.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#050505", // pure black base
        charcoal: "#111111",
        ash: "#1C1C1C",
        wine: "#6E0D18", // deep dark red
        crimson: "#A4161A",
        ember: "#D72638", // vibrant accent red
        cream: "#F7F3EE", // warm off-white
        sand: "#E5C59E",
        gold: "#C99A3D",
        ocean: "#2E7E95", // subtle tropical accents
        jungle: "#2F6B4F",
        sunset: "#E8703A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      spacing: {
        // spacious rhythm (density dial: low)
        section: "clamp(5rem, 10vw, 8rem)",
      },
      animation: {
        "float-slow": "float 9s ease-in-out infinite",
        "drift": "drift 60s linear infinite",
        "pulse-pin": "pulsePin 2.4s ease-out infinite",
        "wave": "wave 8s ease-in-out infinite",
        "sway": "sway 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%": { transform: "translateX(-10%)" },
          "100%": { transform: "translateX(110%)" },
        },
        pulsePin: {
          "0%": { boxShadow: "0 0 0 0 rgba(215,38,56,0.55)" },
          "70%": { boxShadow: "0 0 0 14px rgba(215,38,56,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(215,38,56,0)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-2.5%) translateY(4px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-1.6deg)" },
          "50%": { transform: "rotate(1.6deg)" },
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)", // Expo.out — skill motion preset
      },
    },
  },
  plugins: [],
};
export default config;
