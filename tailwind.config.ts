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
  			// Color scales - these are referenced by the CSS variables in globals.css
  			slate: {
                50: "hsl(var(--slate-50))",
                100: "hsl(var(--slate-100))",
                200: "hsl(var(--slate-200))",
                300: "hsl(var(--slate-300))",
                400: "hsl(var(--slate-400))",
                500: "hsl(var(--slate-500))",
                600: "hsl(var(--slate-600))",
                700: "hsl(var(--slate-700))",
                800: "hsl(var(--slate-800))",
                900: "hsl(var(--slate-900))",
                950: "hsl(var(--slate-950))",
            },
            gray: {
                50: "hsl(var(--gray-50))",
                100: "hsl(var(--gray-100))",
                200: "hsl(var(--gray-200))",
                300: "hsl(var(--gray-300))",
                400: "hsl(var(--gray-400))",
                500: "hsl(var(--gray-500))",
                600: "hsl(var(--gray-600))",
                700: "hsl(var(--gray-700))",
                800: "hsl(var(--gray-800))",
                900: "hsl(var(--gray-900))",
                950: "hsl(var(--gray-950))",
            },
            blue: {
                50: "hsl(var(--blue-50))",
                100: "hsl(var(--blue-100))",
                200: "hsl(var(--blue-200))",
                300: "hsl(var(--blue-300))",
                400: "hsl(var(--blue-400))",
                500: "hsl(var(--blue-500))",
                600: "hsl(var(--blue-600))",
                700: "hsl(var(--blue-700))",
                800: "hsl(var(--blue-800))",
                900: "hsl(var(--blue-900))",
                950: "hsl(var(--blue-950))",
            },
            red: {
                50: "hsl(var(--red-50))",
                100: "hsl(var(--red-100))",
                200: "hsl(var(--red-200))",
                300: "hsl(var(--red-300))",
                400: "hsl(var(--red-400))",
                500: "hsl(var(--red-500))",
                600: "hsl(var(--red-600))",
                700: "hsl(var(--red-700))",
                800: "hsl(var(--red-800))",
                900: "hsl(var(--red-900))",
                950: "hsl(var(--red-950))",
            },
            green: {
                50: "hsl(var(--green-50))",
                100: "hsl(var(--green-100))",
                200: "hsl(var(--green-200))",
                300: "hsl(var(--green-300))",
                400: "hsl(var(--green-400))",
                500: "hsl(var(--green-500))",
                600: "hsl(var(--green-600))",
                700: "hsl(var(--green-700))",
                800: "hsl(var(--green-800))",
                900: "hsl(var(--green-900))",
                950: "hsl(var(--green-950))",
            },
            yellow: {
                50: "hsl(var(--yellow-50))",
                100: "hsl(var(--yellow-100))",
                200: "hsl(var(--yellow-200))",
                300: "hsl(var(--yellow-300))",
                400: "hsl(var(--yellow-400))",
                500: "hsl(var(--yellow-500))",
                600: "hsl(var(--yellow-600))",
                700: "hsl(var(--yellow-700))",
                800: "hsl(var(--yellow-800))",
                900: "hsl(var(--yellow-900))",
                950: "hsl(var(--yellow-950))",
            },

            // Semantic colors - these map to CSS variables in globals.css
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
            success: {
                DEFAULT: "hsl(var(--success))",
                foreground: "hsl(var(--success-foreground))",
            },
            warning: {
                DEFAULT: "hsl(var(--warning))",
                foreground: "hsl(var(--warning-foreground))",
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
