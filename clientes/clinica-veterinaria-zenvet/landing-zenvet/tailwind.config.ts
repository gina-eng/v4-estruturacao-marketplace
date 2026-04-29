import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          deep: "#4B1C7D",
          shadow: "#2E0F55",
          medium: "#7B3FA0",
        },
        turquoise: {
          DEFAULT: "#00B8BD",
          dark: "#008185",
          light: "#8FD9DF",
          mist: "#DFF3F5",
        },
        beige: "#F6EAD8",
        cream: "#F4E8D0",
        graphite: "#2E2E33",
        magenta: "#A8358C",
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
