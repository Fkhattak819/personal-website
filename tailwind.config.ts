import type { Config } from "tailwindcss";

const withAlpha = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Two quiet colors (paper + ink) and one loud one (red).
        bg: withAlpha("--bg"),
        surface: withAlpha("--surface"),
        ink: withAlpha("--ink"),
        accent: withAlpha("--accent"),
        "accent-ink": withAlpha("--accent-ink"),
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
      },
      transitionTimingFunction: {
        swiss: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
