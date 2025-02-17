import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Commit Mono', 'monospace'],
  		},
  		colors: {
  			border: 'var(--border)',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)',
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)',
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)',
  			}
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					'--tw-prose-body': 'var(--foreground)',
  					'--tw-prose-headings': 'var(--foreground)',
  					'--tw-prose-links': 'var(--accent)',
  					'--tw-prose-bold': 'var(--foreground)',
  					'--tw-prose-counters': 'var(--muted-foreground)',
  					'--tw-prose-bullets': 'var(--muted-foreground)',
  					'--tw-prose-hr': 'var(--border)',
  					'--tw-prose-quotes': 'var(--foreground)',
  					'--tw-prose-quote-borders': 'var(--border)',
  					'--tw-prose-captions': 'var(--muted-foreground)',
  					'--tw-prose-code': 'var(--foreground)',
  					'--tw-prose-pre-code': 'var(--foreground)',
  					'--tw-prose-pre-bg': 'var(--secondary)',
  					'--tw-prose-th-borders': 'var(--border)',
  					'--tw-prose-td-borders': 'var(--border)',
  				},
  			},
  		}
  	}
  },
  plugins: [typography],
};
export default config;
