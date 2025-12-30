import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./content/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                'void': 'var(--bg-void)',
                'surface': 'var(--bg-surface)',
                'elevated': 'var(--bg-elevated)',
                'border-subtle': 'var(--border-subtle)',
                'border-default': 'var(--border-default)',
                'border-active': 'var(--border-active)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-dim': 'var(--text-dim)',
                aquarius: {
                    cyan: "#00f0ff",
                    teal: "#008f9c",
                    dark: "#0a0a0a",
                    dim: "#111111",
                }
            },
            fontSize: {
                'xs': ['12px', { lineHeight: '16px' }],
                'sm': ['14px', { lineHeight: '20px' }],
                'base': ['16px', { lineHeight: '24px' }],
                'lg': ['18px', { lineHeight: '28px' }],
                'xl': ['24px', { lineHeight: '32px' }],
                '2xl': ['32px', { lineHeight: '40px' }],
                '3xl': ['48px', { lineHeight: '56px' }],
                'hero': ['clamp(48px, 8vw, 80px)', { lineHeight: '0.9' }],
            },
            fontFamily: {
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            animation: {
                'glitch': 'glitch 1s linear infinite',
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
            },
        },
    },
    plugins: [
        typography,
    ],
} satisfies Config;
