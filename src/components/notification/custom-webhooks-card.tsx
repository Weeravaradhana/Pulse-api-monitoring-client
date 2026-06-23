"use client";

import { useState } from "react";
import axios from "axios";
import Toggle from "@/components/notification/toggle";

type CustomWebhooksCardProps = {
    enabled: boolean;
    onChange: (value: boolean) => void;
};

export default function CustomWebhooksCard({ enabled, onChange }: CustomWebhooksCardProps) {
    const [url, setUrl] = useState("");
    const [secretToken, setSecretToken] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddWebhook = async () => {
        if (!url) return alert("Insert your webhook URL.");

        setLoading(true);
        try {
            await axios.post('http://localhost:3000/notifications/config/webhooks', {
                url: url,
                secretToken: secretToken || undefined
            },{
                withCredentials: true
            });

            alert("Webhook added successfully!");
            setUrl("");
            setSecretToken("");
        } catch (error) {
            console.error(error);
            alert("Failed to add webhook. Check your URL.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 p-4 border border-gray-100 rounded-xl bg-white">
            <div>
                <h3 className="text-sm font-medium text-gray-900">Custom Webhooks</h3>
                <p className="text-xs text-gray-500">Send events to your own server.</p>
            </div>

            <div className="space-y-2">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-server.com/webhook"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <input
                    type="password"
                    value={secretToken}
                    onChange={(e) => setSecretToken(e.target.value)}
                    placeholder="Secret Token (Optional)"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button
                    onClick={handleAddWebhook}
                    disabled={loading}
                    className="w-full text-xs bg-indigo-500 text-white rounded-lg py-2 hover:bg-indigo-600 disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Webhook"}
                </button>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">Enable Slack Notifications</p>
                <Toggle enabled={enabled} onChange={onChange} />
            </div>
        </div>
    );
}