"use client";

import Toggle from "./toggle";

const CheckIcon = () => (
    <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
        />
    </svg>
);

type RecoveryNotificationCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
};

export default function RecoveryNotificationCard({
                                                     enabled,
                                                     onChange,
                                                 }: RecoveryNotificationCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4">

            {/* HEADER */}
            <div>
                <p className="text-sm font-medium text-gray-800">
                    Recovery Notification
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                    Notify when system recovers and returns to UP state.
                </p>
            </div>

            {/* STATUS */}
            {enabled && (
                <div className="flex items-center gap-1.5 text-xs text-green-600">
                    <CheckIcon />
                    <span>Recovery alerts are enabled for all channels</span>
                </div>
            )}

            {/* 🔥 TOGGLE (moved bottom like other cards) */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                    Enable Recovery Notifications
                </p>

                <Toggle enabled={enabled} onChange={onChange} />
            </div>

        </div>
    );
}