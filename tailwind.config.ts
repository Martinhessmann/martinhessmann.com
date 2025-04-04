import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
    darkMode: ["class"],
    content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
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
  			marker: ['"Permanent Marker"', 'cursive'],
  		},
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
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))",
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))",
  			},
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: "hsl(var(--accent-foreground))",
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))",
  			},
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))",
  			},
            // New semantic colors based on GitLab
            neutral: {
                50: "hsl(var(--color-neutral-50))",
                100: "hsl(var(--color-neutral-100))",
                200: "hsl(var(--color-neutral-200))",
                300: "hsl(var(--color-neutral-300))",
                400: "hsl(var(--color-neutral-400))",
                500: "hsl(var(--color-neutral-500))",
                600: "hsl(var(--color-neutral-600))",
                700: "hsl(var(--color-neutral-700))",
                800: "hsl(var(--color-neutral-800))",
                900: "hsl(var(--color-neutral-900))",
                950: "hsl(var(--color-neutral-950))",
            },
            // Background colors
            bg: {
                DEFAULT: "hsl(var(--background-color-default))",
                subtle: "hsl(var(--background-color-subtle))",
                strong: "hsl(var(--background-color-strong))",
                disabled: "hsl(var(--background-color-disabled))",
                overlap: "hsl(var(--background-color-overlap))",
                section: "hsl(var(--background-color-section))",
                overlay: "hsl(var(--background-color-overlay))",
            },
            // Border colors
            bd: {
                DEFAULT: "hsl(var(--border-color-default))",
                subtle: "hsl(var(--border-color-subtle))",
                strong: "hsl(var(--border-color-strong))",
                transparent: "hsl(var(--border-color-transparent))",
            },
            // Text colors
            txt: {
                DEFAULT: "hsl(var(--text-color-default))",
                subtle: "hsl(var(--text-color-subtle))",
                disabled: "hsl(var(--text-color-disabled))",
                inverted: "hsl(var(--text-color-inverted))",
            },
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)",
  		},
  		keyframes: {
  			"accordion-down": {
  				from: { height: '0' },
  				to: { height: "var(--radix-accordion-content-height)" },
  			},
  			"accordion-up": {
  				from: { height: "var(--radix-accordion-content-height)" },
  				to: { height: '0' },
  			},
  			"fadeIn": {
  				from: { opacity: '0' },
  				to: { opacity: '1' },
  			},
  		},
  		animation: {
  			"accordion-down": "accordion-down 0.2s ease-out",
  			"accordion-up": "accordion-up 0.2s ease-out",
  			"fadeIn": "fadeIn 0.3s ease-in-out",
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					maxWidth: '100%',
  					color: 'var(--foreground)',
  					a: {
  						color: 'var(--primary)',
  						'&:hover': {
  							color: 'var(--primary-foreground)',
  						},
  					},
  					h1: {
  						color: 'var(--foreground)',
  					},
  					h2: {
  						color: 'var(--foreground)',
  					},
  					h3: {
  						color: 'var(--foreground)',
  					},
  					h4: {
  						color: 'var(--foreground)',
  					},
  					code: {
  						color: 'var(--foreground)',
  					},
  					strong: {
  						color: 'var(--foreground)',
  					},
  				},
  			},
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
};
export default config;
