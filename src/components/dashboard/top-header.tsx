"use client";

import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { ThemeToggle } from "@/hooks/theme-toggle";

interface TopHeaderProps {
    onMenuClick?: () => void;
}

export function TopHeader({ onMenuClick }: TopHeaderProps) {
    return (
        <header className="h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 px-4 sticky top-0 z-30 transition-colors duration-200">
            <button
                onClick={onMenuClick}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg
          bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
          text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200
          transition-all shrink-0"
                aria-label="Open menu"
            >
                <Menu className="w-4 h-4" />
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <input
                    type="text"
                    placeholder="Search monitors, endpoints..."
                    className="w-full h-8
            bg-slate-100 dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            rounded-lg pl-9 pr-3 text-xs
            text-slate-700 dark:text-slate-300
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            outline-none focus:border-indigo-400 dark:focus:border-indigo-500
            focus:ring-1 focus:ring-indigo-400/20 dark:focus:ring-indigo-500/20
            transition-all"
                />
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <ThemeToggle />

                {/* Bell */}
                <button className="relative w-8 h-8 flex items-center justify-center rounded-lg
          bg-slate-100 dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          text-slate-500 dark:text-slate-400
          hover:text-slate-700 dark:hover:text-slate-200
          hover:border-slate-300 dark:hover:border-slate-600
          transition-all">
                    <Bell className="w-3.5 h-3.5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
            3
          </span>
                </button>
                <button className="flex items-center gap-2 h-8 px-2 rounded-lg
          bg-slate-100 dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          hover:border-slate-300 dark:hover:border-slate-600
          transition-all">
                    <div className="w-5 h-5 rounded-full bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-[9px] font-bold text-white">
                        AK
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500 hidden sm:block" />
                </button>
            </div>
        </header>
    );
}