import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFDF8",
          100: "#FBF6EC",
          200: "#F6EDDD",
          300: "#EFE1C8",
        },
        gold: {
          300: "#E8C878",
          400: "#DDB25A",
          500: "#C8933B",
          600: "#A9772A",
        },
        cocoa: {
          400: "#8A5A36",
          500: "#6B4226",
          600: "#54331D",
          700: "#3E2415",
          800: "#2B1810",
          900: "#1A0F09",
        },
        caramel: "#B06B2F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(84, 51, 29, 0.18)",
        lift: "0 24px 60px -16px rgba(84, 51, 29, 0.3)",
        glow: "0 0 40px rgba(221, 178, 90, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        drift: {
          "0%": { transform: "translateX(-10vw) translateY(0) rotate(0deg)" },
          "100%": {
            transform: "translateX(110vw) translateY(-40px) rotate(360deg)",
          },
        },
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "15%": { opacity: "0.7" },
          "100%": {
            transform: "translateY(-70px) scaleX(1.6)",
            opacity: "0",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.06)", opacity: "0.85" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 26s linear infinite",
        steam: "steam 3.2s ease-out infinite",
        marquee: "marquee 32s linear infinite",
        "spin-slow": "spinSlow 14s linear infinite",
        shimmer: "shimmer 2.8s linear infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
