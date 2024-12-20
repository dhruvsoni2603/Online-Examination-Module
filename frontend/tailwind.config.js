/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        "primary-dark": "var(--primary-dark)",
        "primary-foreground-dark": "var(--primary-foreground-dark)",
        "primary-hover-dark": "var(--primary-hover-dark)",
        "secondary-dark": "var(--secondary-dark)",
        "secondary-foreground-dark": "var(--secondary-foreground-dark)",
        "secondary-hover-dark": "var(--secondary-hover-dark)",
        "muted-dark": "var(--muted-dark)",
        "muted-foreground-dark": "var(--muted-foreground-dark)",
        "muted-hover-dark": "var(--muted-hover-dark)",
        "accent-dark": "var(--accent-dark)",
        "accent-foreground-dark": "var(--accent-foreground-dark)",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
};

/*
    :root {
    --background: hsl(0, 0%, 100%);
    --foreground: hsl(240, 10%, 3.9%);
    --card: hsl(0, 0%, 100%);
    --card-foreground: hsl(240, 10%, 3.9%);
    --popover: hsl(0, 0%, 100%);
    --popover-foreground: hsl(240, 10%, 3.9%);
    --primary: hsl(142.1, 76.2%, 36.3%);
    --primary-foreground: hsl(355.7, 100%, 97.3%);
    --secondary: hsl(240, 4.8%, 95.9%);
    --secondary-foreground: hsl(240, 5.9%, 10%);
    --muted: hsl(240, 4.8%, 95.9%);
    --muted-foreground: hsl(240, 3.8%, 46.1%);
    --accent: hsl(240, 4.8%, 95.9%);
    --accent-foreground: hsl(240, 5.9%, 10%);
    --destructive: hsl(0, 84.2%, 60.2%);
    --destructive-foreground: hsl(0, 0%, 98%);
    --border: hsl(240, 5.9%, 90%);
    --input: hsl(240, 5.9%, 90%);
    --ring: hsl(142.1, 76.2%, 36.3%);
    --radius: 0.5rem;
    --chart-1: hsl(12, 76%, 61%);
    --chart-2: hsl(173, 58%, 39%);
    --chart-3: hsl(197, 37%, 24%);
    --chart-4: hsl(43, 74%, 66%);
    --chart-5: hsl(27, 87%, 67%);
  }

  .dark {
    --background-dark: hsl(20, 14.3%, 4.1%);
    --foreground-dark: hsl(0, 0%, 95%);
    --card-dark: hsl(24, 9.8%, 10%);
    --card-foreground-dark: hsl(0, 0%, 95%);
    --popover-dark: hsl(0, 0%, 9%);
    --popover-foreground-dark: hsl(0, 0%, 95%);
    --primary-dark: hsl(142.1, 70.6%, 45.3%);
    --primary-foreground-dark: hsl(144.9, 80.4%, 10%);
    --primary-hover-dark: hsl(142.1, 70.6%, 50%);
    --secondary-dark: hsl(240, 3.7%, 15.9%);
    --secondary-foreground-dark: hsl(0, 0%, 98%);
    --secondary-hover-dark: hsl(240, 3.7%, 20%);
    --muted-dark: hsl(0, 0%, 15%);
    --muted-foreground-dark: hsl(240, 5%, 64.9%);
    --muted-hover-dark: hsl(0, 0%, 20%);
    --accent-dark: hsl(12, 6.5%, 15.1%);
    --accent-foreground-dark: hsl(0, 0%, 98%);
    --accent-hover-dark: hsl(12, 6.5%, 20%);
    --destructive-dark: hsl(0, 62.8%, 30.6%);
    --destructive-foreground-dark: hsl(0, 85.7%, 97.3%);
    --destructive-hover-dark: hsl(0, 62.8%, 35%);
    --border-dark: hsl(240, 3.7%, 15.9%);
    --input-dark: hsl(240, 3.7%, 15.9%);
    --ring-dark: hsl(142.4, 71.8%, 29.2%);
    --chart-1-dark: hsl(220, 70%, 50%);
    --chart-2-dark: hsl(160, 60%, 45%);
    --chart-3-dark: hsl(30, 80%, 55%);
    --chart-4-dark: hsl(280, 65%, 60%);
    --chart-5-dark: hsl(340, 75%, 55%);
  }
*/