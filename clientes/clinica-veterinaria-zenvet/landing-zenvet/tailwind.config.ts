import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta da marca — ee-s3-manual-marca
        purple: {
          deep: "#4B1C7D",        // primary
          shadow: "#2E0F55",      // secondary
        },
        turquoise: "#00B8BD",     // secondary
        beige: "#F6EAD8",         // background
        graphite: "#2E2E33",      // neutral text
        magenta: "#A8358C",       // accent (CTAs)
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1140px",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
