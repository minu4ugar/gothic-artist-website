/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        gothic: {
          900: "#0f0f0f",
          800: "#1a1a1a", 
          700: "#2a2a2a",
          600: "#3d3d3d",
          500: "#525252",
          accent: "#800020", // Deep burgundy as accent
          gold: "#b8860b",   // Dark gold for highlights
          silver: "#c0c0c0"  // Silver for subtle elements
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "slide-in": {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        "glow": {
          "0%, 100%": { textShadow: "0 0 5px rgba(184, 134, 11, 0.5)" },
          "50%": { textShadow: "0 0 20px rgba(184, 134, 11, 0.8)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-in": "slide-in 0.7s ease-out",
        "glow": "glow 2s ease-in-out infinite",
      },
      fontFamily: {
        gothic: ['var(--font-gothic)', 'serif'],
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'gothic-gradient': 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)',
        'accent-gradient': 'linear-gradient(45deg, #800020, #3d0000)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
