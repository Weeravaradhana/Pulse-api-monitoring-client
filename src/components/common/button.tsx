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
                "h-9 px-3 rounded-lg text-sm font-medium transition",
                variant === "primary"
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "border border-slate-300 bg-white hover:bg-slate-50",
                className
            )}
        />
    );
}