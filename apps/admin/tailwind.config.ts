import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1A22",
        sea: "#0F3D4C",
        surf: "#15B4C0",
        "surf-dark": "#0E8A94",
        coral: "#F2785C",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: { card: "0 1px 2px rgba(10,26,34,0.04), 0 8px 24px -16px rgba(10,26,34,0.25)" },
    },
  },
  plugins: [],
};
export default config;
