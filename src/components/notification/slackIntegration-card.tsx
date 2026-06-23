"use client";

import { useState } from "react";
import Toggle from "./toggle";

type SlackIntegrationCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
    defaultUrl?: string;
    defaultChannel?: string;
    onSave: (url: string, channel: string, enabled: boolean) => Promise<void>;
};

export default function SlackIntegrationCard({
                                                 enabled,
                                                 onChange,
                                                 defaultUrl = "",
                                                 defaultChannel = "",
                                                 onSave
                                             }: SlackIntegrationCardProps) {
    const [url, setUrl] = useState(defaultUrl);
    const [channel, setChannel] = useState(defaultChannel);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await onSave(url, channel, enabled);
            alert("Slack configuration saved!");
        } catch (error) {
            alert("Failed to save configuration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4">
            <div className="space-y-2">
                <p className="text-xs text-gray-500">Slack Webhook URL</p>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://hooks.slack.com/..."
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-300 outline-none"
                />
            </div>

            <div className="space-y-2">
                <p className="text-xs text-gray-500">Channel Name (Optional)</p>
                <input
                    type="text"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    placeholder="#alerts"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-300 outline-none"
                />
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="text-xs bg-indigo-500 text-white rounded-lg px-3 py-2 hover:bg-indigo-600 transition-colors disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Slack Config"}
                </button>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">Enable Slack Notifications</p>
                <Toggle enabled={enabled} onChange={onChange} />
            </div>
        </div>
    );
}