"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    labels: string[];
};

export default function Dropdown({ labels }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState("");

    const ref = useRef<HTMLDivElement>(null);

    const selectOption = (selectedData: string) => {
        setData(selectedData);
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
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
            >
        <span>
          {data === "" ? "Select duration" : data}
        </span>

                <svg
                    className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">

                    <ul className="py-1 max-h-60 overflow-auto">

                        {labels.map((label, index) => (
                            <li
                                key={index}
                                onClick={() => selectOption(label)}
                                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
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