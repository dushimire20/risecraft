/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#221933",
        plum: {
          DEFAULT: "#241539",
          light: "#3A2359",
          dark: "#170D26",
        },
        gold: {
          DEFAULT: "#C9972E",
          light: "#E3B95B",
          dark: "#A87A1E",
        },
        cream: "#FAF7F1",
        paper: "#F3EEE4",
        thread: "#A63D2F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "pattern-dots":
          "radial-gradient(circle, rgba(36,21,57,0.13) 1px, transparent 1px)",
      },
      backgroundSize: {
        dots: "16px 16px",
      },
    },
  },
  plugins: [],
};
