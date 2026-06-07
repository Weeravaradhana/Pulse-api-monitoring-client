"use client";

import { useMemo } from "react";
import { PasswordStrength } from "@/types/auth.types";

interface PasswordStrengthProps {
    password: string;
}

function getStrength(password: string): {
    score: number;
    label: PasswordStrength;
    color: string;
    labelColor: string;
} {
    if (!password) return { score: 0, label: null, color: "bg-slate-200", labelColor: "text-slate-400" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const map: Record<number, { label: PasswordStrength; color: string; labelColor: string }> = {
        1: { label: "weak",   color: "bg-rose-500",   labelColor: "text-rose-500" },
        2: { label: "fair",   color: "bg-amber-400",  labelColor: "text-amber-500" },
        3: { label: "good",   color: "bg-amber-400",  labelColor: "text-amber-500" },
        4: { label: "strong", color: "bg-emerald-500", labelColor: "text-emerald-600" },
    };

    return { score, ...(map[score] ?? map[1]) };
}

export function PasswordStrengthMeter({ password }: PasswordStrengthProps) {
    const { score, label, color, labelColor } = useMemo(
        () => getStrength(password),
        [password]
    );

    if (!password) return null;

    return (
        <div className="mt-2 space-y-1">
            <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < score ? color : "bg-slate-200"
                        }`}
                    />
                ))}
            </div>
            <p className={`text-xs text-right font-medium capitalize ${labelColor}`}>
                {label}
            </p>
        </div>
    );
}