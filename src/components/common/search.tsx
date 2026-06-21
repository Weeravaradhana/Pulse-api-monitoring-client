"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export function SearchInput({
                                placeholder = "Search...",
                                value,
                                onChange
                            }: SearchInputProps) {
    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="w-full h-9 bg-white border border-slate-200 rounded-lg pl-9 pr-3 text-xs text-slate-700 placeholder:text-slate-400 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
        </div>
    );
}