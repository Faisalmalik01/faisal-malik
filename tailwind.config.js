/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Fix: was "Inter" (never loaded). Match what index.css actually loads.
        display: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        body:    ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        canvas:       "var(--canvas)",
        "canvas-alt": "var(--canvas-alt)",
        panel:        "var(--panel)",
        border:       "var(--border)",
        ink:          "var(--ink)",
        "ink-soft":   "var(--ink-soft)",
        muted:        "var(--muted)",
        purple:       "var(--purple)",
        "purple-lt":  "var(--purple-lt)",
        mustard:      "var(--mustard)",
        green:        "var(--green)",
        sky:          "var(--sky)",
        coral:        "var(--coral)",
      },
    },
  },
  plugins: [],
};
