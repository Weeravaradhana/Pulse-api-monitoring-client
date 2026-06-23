"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    labels: string[];
    value?: string;
    onChange: (value: string) => void;
};

export default function Dropdown({ labels, value, onChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectOption = (selectedData: string) => {
        onChange(selectedData);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative w-full mt-3">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
                <span>{value || "Select duration"}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <ul className="py-1 max-h-60 overflow-auto">
                        {labels.map((label, index) => (
                            <li
                                key={index}
                                onClick={() => selectOption(label)}
                                className={`px-3 py-2 text-sm cursor-pointer transition ${
                                    value === label ? "bg-gray-100 font-medium" : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}