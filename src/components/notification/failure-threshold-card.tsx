"use client";

import { useState } from "react";

type FailureThresholdCardProps = {
    defaultValue?: number;
    min?: number;
    max?: number;
};

export default function FailureThresholdCard({
                                                 defaultValue = 3,
                                                 min = 1,
                                                 max = 10,
                                             }: FailureThresholdCardProps) {
    const [threshold, setThreshold] = useState<number>(defaultValue);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-sm font-medium text-gray-800">Failure Threshold</p>
                    <p className="text-xs text-gray-400">Trigger alert only if an endpoint fails consecutive checks.</p>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-0.5 rounded-full">
          {threshold} consecutive
        </span>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setThreshold(Math.max(min, threshold - 1))}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg leading-none"
                    aria-label="Decrease threshold"
                >
                    −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-gray-800">{threshold}</span>
                <button
                    onClick={() => setThreshold(Math.min(max, threshold + 1))}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg leading-none"
                    aria-label="Increase threshold"
                >
                    +
                </button>
                <span className="text-xs text-gray-400">consecutive failures before alert</span>
            </div>
        </div>
    );
}