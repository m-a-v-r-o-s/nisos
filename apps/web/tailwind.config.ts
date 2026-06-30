import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1A22",        // deep Aegean near-black
        sea: "#0F3D4C",        // brand primary
        surf: "#15B4C0",       // turquoise accent
        "surf-dark": "#0E8A94",
        coral: "#F2785C",      // warm secondary accent
        sand: "#F6F2EA",       // warm limestone surface
        "sand-2": "#EDE7DA",
        line: "#E2DCCF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        panel: "0 24px 60px -24px rgba(10,26,34,0.35)",
        card: "0 12px 32px -16px rgba(10,26,34,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
