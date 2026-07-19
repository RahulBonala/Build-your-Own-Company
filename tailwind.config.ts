import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#19140f', // Warm ink (signature system)
        silver: '#efe7da', // Warm off-white (signature system)
        'cyber-cyan': '#ff6b1a', // Signature orange (Rahul Orange)
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-fraunces)'],
      },
    },
  },
  plugins: [],
};
export default config;
