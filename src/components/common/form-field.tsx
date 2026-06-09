"use client";

import React, { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hint?: string;
    error?: string;
    leftIcon?: ReactNode;
    isPassword?: boolean;
    isValid?: boolean;
    required?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    (
        { label, hint, error, leftIcon, isPassword, isValid, required, className, ...props },
        ref
    ) => {
        const [show, setShow] = useState(false);
        const type = isPassword ? (show ? "text" : "password") : (props.type ?? "text");

        return (
            <div className="space-y-1.5">
                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {label}
                    {required && <span className="text-rose-500">*</span>}
                </label>
                <div className="relative">
                    {leftIcon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </span>
                    )}
                    <input
                        ref={ref}
                        {...props}
                        type={type}
                        className={cn(
                            "w-full h-10 rounded-lg border text-sm transition-all duration-150 outline-none",
                            "bg-slate-50 dark:bg-slate-800/60",
                            "text-slate-800 dark:text-slate-200",
                            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                            leftIcon   ? "pl-9"  : "pl-3",
                            isPassword ? "pr-10" : "pr-3",
                            error
                                ? "border-rose-400 dark:border-rose-500 focus:border-rose-400 dark:focus:border-rose-500 focus:ring-2 focus:ring-rose-400/10"
                                : isValid
                                    ? "border-emerald-400 dark:border-emerald-500 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/10"
                                    : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/10",
                            className
                        )}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShow((v) => !v)}
                            tabIndex={-1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    )}
                </div>
                {error && (
                    <p className="flex items-center gap-1 text-xs text-rose-500 animate-fade-in">
                        <span className="w-3.5 h-3.5 rounded-full bg-rose-100 dark:bg-rose-500/10 inline-flex items-center justify-center font-bold text-[9px] shrink-0">✕</span>
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="text-xs text-slate-400 dark:text-slate-500">{hint}</p>
                )}
            </div>
        );
    }
);
FormField.displayName = "FormField";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    hint?: string;
    error?: string;
    required?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, hint, error, required, className, ...props }, ref) => (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {label}
                {required && <span className="text-rose-500">*</span>}
            </label>
            <textarea
                ref={ref}
                {...props}
                className={cn(
                    "w-full rounded-lg border text-sm p-3 transition-all duration-150 outline-none resize-none",
                    "bg-slate-50 dark:bg-slate-800/60",
                    "text-slate-800 dark:text-slate-200",
                    "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    error
                        ? "border-rose-400 dark:border-rose-500 focus:ring-2 focus:ring-rose-400/10"
                        : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/10",
                    className
                )}
            />
            {error && (
                <p className="flex items-center gap-1 text-xs text-rose-500">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-100 dark:bg-rose-500/10 inline-flex items-center justify-center font-bold text-[9px] shrink-0">✕</span>
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-xs text-slate-400 dark:text-slate-500">{hint}</p>
            )}
        </div>
    )
);
FormTextarea.displayName = "FormTextarea";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    hint?: string;
    error?: string;
    required?: boolean;
    leftIcon?: ReactNode;
    children: ReactNode;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    ({ label, hint, error, required, leftIcon, children, className, ...props }, ref) => (
        <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {label}
                {required && <span className="text-rose-500">*</span>}
            </label>
            <div className="relative">
                {leftIcon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {leftIcon}
          </span>
                )}
                <select
                    ref={ref}
                    {...props}
                    className={cn(
                        "w-full h-10 rounded-lg border text-sm appearance-none transition-all duration-150 outline-none cursor-pointer",
                        "bg-slate-50 dark:bg-slate-800/60",
                        "text-slate-800 dark:text-slate-200",
                        leftIcon ? "pl-9" : "pl-3",
                        "pr-8",
                        error
                            ? "border-rose-400 dark:border-rose-500 focus:ring-2 focus:ring-rose-400/10"
                            : "border-slate-200 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/10",
                        className
                    )}
                >
                    {children}
                </select>
                {/* Chevron */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
            </div>
            {error && (
                <p className="flex items-center gap-1 text-xs text-rose-500">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-100 dark:bg-rose-500/10 inline-flex items-center justify-center font-bold text-[9px] shrink-0">✕</span>
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-xs text-slate-400 dark:text-slate-500">{hint}</p>
            )}
        </div>
    )
);
FormSelect.displayName = "FormSelect";