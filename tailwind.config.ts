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
  			sans: ['Commit Mono', 'monospace'],
  		},
  		colors: {
  			border: 'rgb(var(--border) / <alpha-value>)',
  			background: 'rgb(var(--background) / <alpha-value>)',
  			foreground: 'rgb(var(--foreground) / <alpha-value>)',
  			secondary: {
  				DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
  				foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
  			},
  			muted: {
  				DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
  				foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
  			}
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
