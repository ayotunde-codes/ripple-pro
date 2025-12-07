/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lexend: ["var(--font-lexend)", "sans-serif"],
      },
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          dark: "hsl(var(--border-dark))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          dark: "hsl(var(--input-dark))",
        },
        ring: {
          DEFAULT: "hsl(var(--ring))",
          dark: "hsl(var(--ring-dark))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          dark: "#000000",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          dark: "hsl(var(--foreground-dark))",
        },
        primary: {
          DEFAULT: "#B125F9", // Updated to #B125F9
          foreground: "#FFFFFF",
          light: "#F9F0FC", // Updated to #F9F0FC
          muted: "#D8B4FE",
          dark: "#9333EA",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          dark: "hsl(var(--secondary-dark))",
          "dark-foreground": "hsl(var(--secondary-dark-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          dark: "hsl(var(--destructive-dark))",
          "dark-foreground": "hsl(var(--destructive-dark-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          dark: "#0E0E0E", // Updated from any previous color
          "dark-foreground": "#A9A9A9", // Updated from #363C46
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          dark: "hsl(var(--accent-dark))",
          "dark-foreground": "hsl(var(--accent-dark-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
          dark: "hsl(var(--popover-dark))",
          "dark-foreground": "hsl(var(--popover-dark-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          dark: "#0E0E0E", // Updated from any previous color
          "dark-foreground": "#FFFFFF",
        },
        ripple: {
          purple: "#B125F9", // Updated to #B125F9
          light: "#F9F0FC", // Updated to #F9F0FC
          muted: "#D8B4FE",
          dark: "#6B21A8",
        },
        dashboard: {
          purple: "#B125F9", // Updated to match the end of the gradient
          pink: "#E43EFC", // Added to match the start of the gradient
          blue: "#3B82F6",
          yellow: "#F59E0B",
        },
        status: {
          success: "#10B981", // Green for successful status
          pending: "#F59E0B", // Orange/amber for pending status
          failed: "#EF4444", // Red for failed status
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(90deg, #E43EFC 0%, #B125F9 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
