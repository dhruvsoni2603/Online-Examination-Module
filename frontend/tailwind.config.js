/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			xs: 'calc(var(--radius) - 6px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': 'var(--card-foreground)',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'popover-foreground': 'var(--popover-foreground)',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-hover': 'var(--primary-hover)',
  			'primary-foreground': 'var(--primary-foreground)',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'secondary-foreground': 'var(--secondary-foreground)',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': 'var(--muted-foreground)',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'accent-foreground': 'var(--accent-foreground)',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'destructive-foreground': 'var(--destructive-foreground)',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'primary-dark': 'var(--primary-dark)',
  			'primary-foreground-dark': 'var(--primary-foreground-dark)',
  			'primary-hover-dark': 'var(--primary-hover-dark)',
  			'secondary-dark': 'var(--secondary-dark)',
  			'secondary-foreground-dark': 'var(--secondary-foreground-dark)',
  			'secondary-hover-dark': 'var(--secondary-hover-dark)',
  			'muted-dark': 'var(--muted-dark)',
  			'muted-foreground-dark': 'var(--muted-foreground-dark)',
  			'muted-hover-dark': 'var(--muted-hover-dark)',
  			'accent-dark': 'var(--accent-dark)',
  			'accent-foreground-dark': 'var(--accent-foreground-dark)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			brand: {
  				DEFAULT: 'hsl(var(--brand))',
  				foreground: 'hsl(var(--brand-foreground))'
  			},
  			highlight: {
  				DEFAULT: 'hsl(var(--highlight))',
  				foreground: 'hsl(var(--highlight-foreground))'
  			}
  		},
  		fontFamily: {
  			heading: [
  				'Inter',
  				'ui-sans-serif',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI Variable Display',
  				'Segoe UI',
  				'Helvetica',
  				'Apple Color Emoji',
  				'Arial',
  				'sans-serif',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI Variable Display',
  				'Segoe UI',
  				'Helvetica',
  				'Apple Color Emoji',
  				'Arial',
  				'sans-serif',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			]
  		},
  		screens: {
  			'main-hover': {
  				raw: '(hover: hover)'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
