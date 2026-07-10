import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pace: {
          primary: "#6BA1FF",
          secondary: "#FFF23D",
          success: "#32E15E",
          warning: "#FFA200",
          danger: "#FF4D4F",
          background: "#F7F9FC",
          surface: "#FFFFFF",
          border: "#E5E7EB",
          text: {
            primary: "#1F2937",
            secondary: "#6B7280",
          },
          pig: {
            DEFAULT: "#FBB0C0",
            highlight: "#FDC9D3",
            dark: "#F58098",
            blush: "#F4707E",
          },
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Inter",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        title: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        subtitle: ["18px", { lineHeight: "26px", fontWeight: "500" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "18px", fontWeight: "500" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
      },
      borderRadius: {
        button: "16px",
        input: "16px",
        card: "24px",
        dialog: "24px",
        sheet: "28px",
        bubble: "28px",
      },
      boxShadow: {
        card: "0 4px 16px rgb(31 41 55 / 0.1)",
        dialog: "0 8px 24px rgb(31 41 55 / 0.15)",
        floating: "0 6px 20px rgb(31 41 55 / 0.15)",
      },
      transitionDuration: {
        micro: "150ms",
        card: "250ms",
        sheet: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
