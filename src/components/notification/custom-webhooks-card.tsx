"use client";

import { useState } from "react";
import Toggle from "./toggle";

const EyeIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
    </svg>
);

const WebhookIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
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
    const [url, setUrl] = useState<string>(defaultUrl);
    const [token, setToken] = useState<string>(defaultToken);
    const [showToken, setShowToken] = useState<boolean>(false);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-orange-50 rounded-lg text-orange-500">
                        <WebhookIcon />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">Custom Webhooks</p>
                        <p className="text-xs text-gray-400">Advanced REST integration for internal systems and automations.</p>
                    </div>
                </div>
                <Toggle enabled={enabled} onChange={onChange} />
            </div>
            <div className="mt-3 space-y-3">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Webhook URL</p>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
                    />
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Secret Token</p>
                    <div className="relative">
                        <input
                            type={showToken ? "text" : "password"}
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 pr-9 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
                        />
                        <button
                            onClick={() => setShowToken(!showToken)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label={showToken ? "Hide token" : "Show token"}
                        >
                            {showToken ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 pt-1">
                    {eventTags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
              {tag}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
}