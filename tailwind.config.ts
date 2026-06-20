import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        script: ["Parisienne", "cursive"],
        title: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Lora", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        paper: "var(--shadow-soft)",
        lifted: "0 24px 70px rgba(63, 43, 24, 0.2)",
      },
      colors: {
        paper: "var(--color-paper)",
        ink: "var(--color-ink)",
        brown: "var(--color-brown)",
        sage: "var(--color-sage)",
        gold: "var(--color-gold)",
        jungle: "var(--color-jungle)",
      },
    },
  },
  plugins: [],
} satisfies Config;
