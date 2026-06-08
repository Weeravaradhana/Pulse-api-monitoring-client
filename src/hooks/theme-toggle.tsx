"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/dashboard/theme-context";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative w-8 h-8 flex items-center justify-center rounded-lg
        bg-slate-800 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
        text-slate-500 dark:text-slate-400
        hover:text-slate-700 dark:hover:text-slate-200
        hover:border-slate-300 dark:hover:border-slate-600
        transition-all duration-200"
        >
            {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
            )}
        </button>
    );
}