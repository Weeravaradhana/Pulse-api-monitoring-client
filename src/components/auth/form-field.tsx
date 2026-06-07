"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
    leftIcon?: ReactNode;
    isValid?: boolean;
    isPassword?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, error, hint, leftIcon, isValid, isPassword, className, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const inputType = isPassword
            ? showPassword ? "text" : "password"
            : props.type ?? "text";

        return (
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                    {label}
                </label>
                <div className="relative">
                    {leftIcon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </span>
                    )}
                    <input
                        ref={ref}
                        {...props}
                        type={inputType}
                        className={cn(
                            "w-full h-10 rounded-lg border text-sm font-medium placeholder:text-slate-400 text-slate-900",
                            "bg-slate-50 transition-all duration-200 outline-none",
                            "focus:bg-white focus:ring-3 focus:ring-indigo-500/10",
                            leftIcon ? "pl-9" : "pl-3",
                            isPassword ? "pr-10" : "pr-3",
                            error
                                ? "border-rose-400 focus:border-rose-400"
                                : isValid
                                    ? "border-emerald-400 focus:border-emerald-400"
                                    : "border-slate-200 focus:border-indigo-400",
                            className
                        )}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            tabIndex={-1}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    )}
                </div>
                {error && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 animate-fade-in">
                        <span className="w-3 h-3 rounded-full bg-rose-100 inline-flex items-center justify-center text-rose-500 font-bold text-[9px]">✕</span>
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-emerald-100 inline-flex items-center justify-center text-emerald-600 font-bold text-[9px]">✓</span>
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

FormField.displayName = "FormField";