"use client";

import { useState } from "react";
import Toggle from "./toggle";

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const SlackIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 15a2 2 0 11-4 0 2 2 0 014 0zm2 0a2 2 0 104 0 2 2 0 00-4 0zm2-6a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 104 0 2 2 0 00-4 0zm-2 6a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" />
    </svg>
);

type SlackStatus = "idle" | "testing" | "healthy" | "error";

type SlackIntegrationCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
    defaultUrl?: string;
};

export default function SlackIntegrationCard({
                                                 enabled,
                                                 onChange,
                                                 defaultUrl = "",
                                             }: SlackIntegrationCardProps) {
    const [url, setUrl] = useState(defaultUrl);
    const [status, setStatus] = useState<SlackStatus>("idle");

    const testConnection = () => {
        setStatus("testing");

        setTimeout(() => {
            if (url.includes("http")) {
                setStatus("healthy");
            } else {
                setStatus("error");
            }
        }, 1200);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4">

            <div className="flex items-start gap-2">

                <div className="p-2 bg-purple-50 text-purple-500 rounded-lg shrink-0">
                    <SlackIcon />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-800">
                        Slack Integration
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Post incident updates into your team channel via webhook.
                    </p>
                </div>

            </div>

            <div className="space-y-2">
                <p className="text-xs text-gray-500">Slack Webhook URL</p>

                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://hooks.slack.com/..."
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">

                <button
                    onClick={testConnection}
                    disabled={status === "testing"}
                    className="w-full sm:w-auto text-xs border border-gray-200 text-gray-600 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    🔌 {status === "testing" ? "Testing..." : "Test Connection"}
                </button>

                <button className="w-full sm:w-auto text-xs bg-indigo-500 text-white rounded-lg px-3 py-2 hover:bg-indigo-600 transition-colors">
                    Save
                </button>

            </div>

            {status === "healthy" && (
                <div className="flex items-center gap-1.5 text-xs text-green-600">
                    <CheckIcon />
                    <span>Connection healthy and ready</span>
                </div>
            )}

            {status === "error" && (
                <p className="text-xs text-red-500">
                    Connection failed. Check your webhook URL.
                </p>
            )}

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                    Enable Slack Notifications
                </p>

                <Toggle enabled={enabled} onChange={onChange} />
            </div>

        </div>
    );
}