import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: "#0f172a", // Deep Slate (was #0B0C10)
                silver: "#e2e8f0",   // Slate-200 (was #C5C6C7)
                "cyber-cyan": "#22d3ee", // Cyan-400 (was #66FCF1)
                "glass-border": "rgba(255, 255, 255, 0.1)",
                "glass-bg": "rgba(255, 255, 255, 0.05)",
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                heading: ["var(--font-space-grotesk)"],
            },
        },
    },
    plugins: [],
};
export default config;
