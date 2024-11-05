import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        homemadeapple: ["var(--font-homemade-apple)"],
      },
      colors: {
        background: "#f4f4f4",
        foreground: "#d4d4d4",
        primary: {
          DEFAULT: "#01788D",
          hover: "#1E91A5",
          darker: "#013842",
        },
        secondary: {
          DEFAULT: "#f4f4f4",
          darker: "#d4d4d4",
        },
      },
    },
  },
  plugins: [],
};
export default config;
