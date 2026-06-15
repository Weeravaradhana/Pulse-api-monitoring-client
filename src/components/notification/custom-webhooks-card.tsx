"use client";

import { useState } from "react";
import Toggle from "./toggle";

const EyeIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
            stroke="currentColor"
            strokeWidth="2"
        />
        <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="2"
        />
    </svg>
);

const EyeOffIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
            d="M3 3l18 18"
            stroke="currentColor"
            strokeWidth="2"
        />
        <path
            d="M10.6 10.6A2 2 0 0012 14a2 2 0 001.4-.6"
            stroke="currentColor"
            strokeWidth="2"
        />
    </svg>
);

const WebhookIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a3 3 0 013 3v3h-2V5a1 1 0 10-2 0v3H9V5a3 3 0 013-3z" />
        <path d="M7 10h10v2H7v-2zm0 4h10v2H7v-2z" />
    </svg>
);

type CustomWebhooksCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
    defaultUrl?: string;
    defaultToken?: string;
    eventTags?: string[];
};

export default function CustomWebhooksCard({
                                               enabled,
                                               onChange,
                                               defaultUrl = "",
                                               defaultToken = "",
                                               eventTags = ["[monitor.down]", "[monitor.up]"],
                                           }: CustomWebhooksCardProps) {
    const [url, setUrl] = useState(defaultUrl);
    const [token, setToken] = useState(defaultToken);
    const [showToken, setShowToken] = useState(false);
    console.log("Custom webhook", enabled)

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4">

            <div className="flex items-start gap-2">

                <div className="p-2 bg-orange-50 text-orange-500 rounded-lg shrink-0">
                    <WebhookIcon />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-800">
                        Custom Webhooks
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Advanced REST integration for internal systems and automations.
                    </p>
                </div>

            </div>

            <div className="space-y-1">
                <p className="text-xs text-gray-500">Webhook URL</p>

                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>

            <div className="space-y-1">
                <p className="text-xs text-gray-500">Secret Token</p>

                <div className="relative">
                    <input
                        type={showToken ? "text" : "password"}
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 pr-10 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />

                    <button
                        onClick={() => setShowToken(!showToken)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        type="button"
                    >
                        {showToken ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {eventTags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono"
                    >
            {tag}
          </span>
                ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                    Enable Webhooks
                </p>

                <Toggle enabled={enabled} onChange={onChange} />
            </div>

        </div>
    );
}