import { cn } from "@/lib/utils";
import React from "react";

export function Button(
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: "primary" | "secondary";
    }
) {
    const { variant = "primary", className, ...rest } = props;

    return (
        <button
            {...rest}
            className={cn(
                "inline-flex items-center justify-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0",
                variant === "primary"
                    ? "bg-indigo-600 text-white hover:bg-indigo-500 active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:scale-[0.98] dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700",
                className
            )}
        />
    );
}