"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MaintenanceModeCard from "../../../components/notification/maintenance-mode-card";
import SlackIntegrationCard from "../../../components/notification/slackIntegration-card";
import CustomWebhooksCard from "../../../components/notification/custom-webhooks-card";
import { Button } from "@/components/common/button";
import {Moon} from "lucide-react";

export default function AlertingPage() {
    const [loading, setLoading] = useState(true);
    const [slackEnabled, setSlackEnabled] = useState(false);
    const [webhookEnabled, setWebhookEnabled] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState("1 Hour");
    const [slackUrl, setSlackUrl] = useState("");
    const [slackChannel, setSlackChannel] = useState("");
    const [initialStates, setInitialStates] = useState({ slack: false, webhook: false, muted: false });

    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const [slackRes, webhookRes] = await Promise.all([
                    axios.get('http://localhost:3000/notifications/config/slack', { withCredentials: true }),
                    axios.get('http://localhost:3000/notifications/config/webhooks', { withCredentials: true })
                ]);
                setSlackEnabled(slackRes.data?.enabled || false);
                setSlackUrl(slackRes.data?.webhookUrl || "");
                setSlackChannel(slackRes.data?.channelName || "");
                setWebhookEnabled(webhookRes.data?.enabled || false);
                setInitialStates({
                    slack: slackRes.data?.enabled || false,
                    webhook: webhookRes.data?.enabled || false,
                    muted: false
                });
            } catch (error) {
                console.error("Data fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfigs();
    }, []);

    const handleSave = async () => {
        try {
            const durationMap: { [key: string]: number } = { "1 Hour": 1, "24 Hour": 24, "30 Days": 720 };
            if (isMuted !== initialStates.muted) {
                await axios.patch('http://localhost:3000/notifications/config/mute', {
                    durationInHours: durationMap[duration]
                }, { withCredentials: true });
            }
            alert("Changes saved successfully!");
        } catch (error) {
            alert("Failed to save settings.");
        }
    };

    if (loading) return <div className="p-10 text-center text-sm text-slate-500">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">
            <div>
                <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Notifications
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Manage how and where you receive alerts for your monitors.
                </p>
            </div>
            {isMuted && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                    <span><Moon/></span>
                    Maintenance mode is active — all alerts are paused.
                </div>
            )}

            <MaintenanceModeCard
                enabled={isMuted}
                onChange={setIsMuted}
                onDurationChange={setDuration}
            />

            <div className={isMuted ? "opacity-50 pointer-events-none" : ""}>
                <SlackIntegrationCard
                    enabled={slackEnabled}
                    onChange={setSlackEnabled}
                    defaultUrl={slackUrl}
                    defaultChannel={slackChannel}
                    onSave={async (url, channel) => {
                        await axios.post('http://localhost:3000/notifications/config/slack', {
                            webhookUrl: url,
                            channelName: channel
                        }, { withCredentials: true });
                    }}
                />

                <div className="mt-4">
                    <CustomWebhooksCard
                        enabled={webhookEnabled}
                        onChange={setWebhookEnabled}
                    />
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <Button onClick={handleSave}>Save changes</Button>
            </div>
        </div>
    );
}