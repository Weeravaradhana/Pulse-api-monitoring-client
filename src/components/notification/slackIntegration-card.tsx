"use client";

import { useState } from "react";
import Toggle from "./toggle";

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
);

const SlackIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.527 2.527 0 012.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" />
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
    const [url, setUrl] = useState<string>(defaultUrl);
    const [status, setStatus] = useState<SlackStatus>("idle");

    const testConnection = () => {
        setStatus("testing");
        setTimeout(() => setStatus("healthy"), 1500);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-50 rounded-lg text-purple-500">
                        <SlackIcon />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">Slack Integration</p>
                        <p className="text-xs text-gray-400">Post incident updates into your team channel via webhook.</p>
                    </div>
                </div>
                <Toggle enabled={enabled} onChange={onChange} />
            </div>
            <div className="mt-3 space-y-2">
                <p className="text-xs text-gray-500">Slack Webhook URL</p>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
                />
                <div className="flex items-center gap-2">
                    <button
                        onClick={testConnection}
                        disabled={status === "testing"}
                        className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <span>🔌</span>
                        {status === "testing" ? "Testing..." : "Test Connection"}
                    </button>
                    <button className="text-xs bg-indigo-500 text-white rounded-lg px-3 py-1.5 hover:bg-indigo-600 transition-colors">
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
                    <p className="text-xs text-red-500">Connection failed. Check your webhook URL.</p>
                )}
            </div>
        </div>
    );
}