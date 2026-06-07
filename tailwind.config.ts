import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            animation: {
                "slide-in": "slideIn 0.4s ease",
                "fade-in":  "fadeIn 0.3s ease",
                "shake":    "shake 0.4s ease",
            },
            keyframes: {
                slideIn: {
                    "0%":   { transform: "translateY(-8px)", opacity: "0" },
                    "100%": { transform: "translateY(0)",    opacity: "1" },
                },
                fadeIn: {
                    "0%":   { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "20%, 60%": { transform: "translateX(-4px)" },
                    "40%, 80%": { transform: "translateX(4px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;