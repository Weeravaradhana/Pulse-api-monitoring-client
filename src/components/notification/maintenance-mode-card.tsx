"use client";

import Toggle from "./toggle";
import Dropdown from "@/components/common/drop-down";
import { useState } from "react";

type MaintenanceModeCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
    onDurationChange?: (duration: string) => void;
};

export default function MaintenanceModeCard({ enabled, onChange, onDurationChange }: MaintenanceModeCardProps) {
    const [selectedDuration, setSelectedDuration] = useState("1 Hour");

    const handleDurationSelect = (value: string) => {
        setSelectedDuration(value);
        if (onDurationChange) {
            onDurationChange(value);
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-800">Mute all alerts temporarily</p>
                    <p className="text-xs text-gray-400 mt-0.5">Maintenance mode toggle</p>
                </div>
                <Toggle enabled={enabled} onChange={onChange} />
            </div>
            {enabled && (
                <div className="mt-2">
                    <Dropdown
                        labels={["1 Hour", "24 Hour", "30 Days"]}
                        onChange={(value) => handleDurationSelect(value)}
                        value={selectedDuration}
                    />
                </div>
            )}
        </>
    );
}