"use client";

type ButtonProps = {
    label: string;
    onClick?: () => void;
};

export default function Button({ label, onClick}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`text-xs bg-indigo-500 text-white rounded-lg px-3 py-1.5 hover:bg-indigo-600 transition-colors`}
        >
            {label}
        </button>
    );
}