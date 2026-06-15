import { cn } from "@/lib/utils";
import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={cn(
                "bg-white border border-slate-200 rounded-xl",
                "shadow-sm hover:shadow-md transition",
                "p-5"
            )}
        >
            {children}
        </div>
    );
}