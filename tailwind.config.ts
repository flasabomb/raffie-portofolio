import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        border: "var(--border)",
        success: "var(--success)",
        danger: "var(--danger)"
      },
      fontFamily: {
        heading: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-dm)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
