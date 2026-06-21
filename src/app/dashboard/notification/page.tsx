"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MaintenanceModeCard from "../../../components/notification/maintenance-mode-card";
import EmailNotificationsCard from "../../../components/notification/email-notifications-card";
import SlackIntegrationCard from "../../../components/notification/slackIntegration-card";
import CustomWebhooksCard from "../../../components/notification/custom-webhooks-card";
import FailureThresholdCard from "../../../components/notification/failure-threshold-card";
import RecoveryNotificationCard from "../../../components/notification/recovery-notification-card";
import DeliveryHealthCard from "../../../components/notification/delivery-health-card";
import { Button } from "@/components/common/button";

export default function AlertingPage() {
    const [loading, setLoading] = useState(true);
    const [slackEnabled, setSlackEnabled] = useState(false);
    const [webhookEnabled, setWebhookEnabled] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState("1 Hour");
    const [recoveryEnabled, setRecoveryEnabled] = useState(false);
    const [slackUrl, setSlackUrl] = useState("");
    const [initialStates, setInitialStates] = useState({ slack: false, webhook: false, muted: false });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const [slackRes, webhookRes] = await Promise.all([
                    axios.get('http://localhost:3000/notifications/config/slack', { withCredentials: true }),
                    axios.get('http://localhost:3000/notifications/config/webhooks', { withCredentials: true })
                ]);

                setSlackEnabled(slackRes.data?.enabled || false);
                setSlackUrl(slackRes.data?.webhookUrl || "");
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

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6">
                <div className="border border-gray-200 rounded-xl bg-white p-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">Alerting & Notification</h1>
                        <p className="text-sm text-gray-500">Configure your alert channels.</p>
                    </div>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>

                <MaintenanceModeCard
                    enabled={isMuted}
                    onChange={setIsMuted}
                    onDurationChange={setDuration}
                />

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                    <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left px-4 py-3 flex justify-between">
                        <span className="text-sm font-medium">Advanced Options</span>
                        <span>{isOpen ? "Hide" : "Show"}</span>
                    </button>

                    {isOpen && (
                        <div className="px-4 pb-4 space-y-6 border-t border-gray-100">
                            <EmailNotificationsCard enabled={false} onChange={() => {}} emails={[]} />

                            <SlackIntegrationCard
                                enabled={slackEnabled}
                                onChange={setSlackEnabled}
                                defaultUrl={slackUrl}
                                onSave={async (url, channel) => {
                                    await axios.post('http://localhost:3000/notifications/config/slack', {
                                        webhookUrl: url,
                                        channelName: channel
                                    }, { withCredentials: true });
                                }}
                            />

                            <CustomWebhooksCard enabled={webhookEnabled} onChange={setWebhookEnabled} />
                            <FailureThresholdCard defaultValue={3} min={1} max={10} />
                            <RecoveryNotificationCard enabled={recoveryEnabled} onChange={setRecoveryEnabled} />
                            <DeliveryHealthCard sentToday={128} deduplicated={42} failed={1} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}