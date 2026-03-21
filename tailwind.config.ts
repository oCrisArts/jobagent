import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0ebff",
          100: "#d9ccff",
          200: "#b89dfc",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          900: "#2e1065",
        },
        surface: {
          base:    "#0A0A0F",
          default: "#13141A",
          card:    "#1A1D27",
          border:  "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        sans: ["Google Sans", "Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow:      "0 0 40px rgba(124,58,237,0.35)",
        "glow-sm": "0 0 20px rgba(124,58,237,0.2)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C3AED, #4F46E5)",
        "hero-glow":      "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
