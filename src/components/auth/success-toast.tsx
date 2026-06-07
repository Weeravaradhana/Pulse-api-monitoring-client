"use client";

import { CheckCircle2, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SuccessToastProps {
    message: string;
    subMessage?: string;
    onClose?: () => void;
    autoClose?: number;
}

export function SuccessToast({
                                 message,
                                 subMessage,
                                 onClose,
                                 autoClose = 4000,
                             }: SuccessToastProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, autoClose);
        return () => clearTimeout(timer);
    }, [autoClose, onClose]);

    if (!visible) return null;

    return (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-5 animate-slide-in">
            <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-900">{message}</p>
                {subMessage && (
                    <p className="text-xs text-emerald-700 mt-0.5">{subMessage}</p>
                )}
            </div>
            <button
                onClick={() => { setVisible(false); onClose?.(); }}
                className="flex-shrink-0 text-emerald-400 hover:text-emerald-600 transition-colors"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}