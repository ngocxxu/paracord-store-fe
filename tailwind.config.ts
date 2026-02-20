import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          "bg-primary": "#191715",
          "bg-surface": "#2C2724",
          "bg-card": "#111111",
          accent: "#FF5E00",
          "accent-hover": "#E65500",
          olive: "#4B5320",
          "text-high": "#FFFFFF",
          "text-medium": "#AFA9A4",
          border: "#332F2C",
        },
      },
      fontFamily: {
        heading: ["Oswald", "Montserrat", "sans-serif"],
        body: ["Inter", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      letterSpacing: {
        tightest: "-.02em",
        "widest-custom": "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
