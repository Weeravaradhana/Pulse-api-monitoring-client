"use client";

import { useState } from "react";
import MaintenanceModeCard from "../../../components/notification/maintenance-mode-card";
import EmailNotificationsCard from "../../../components/notification/email-notifications-card";
import SlackIntegrationCard from "../../../components/notification/slackIntegration-card";
import CustomWebhooksCard from "../../../components/notification/custom-webhooks-card";
import FailureThresholdCard from "../../../components/notification/failure-threshold-card";
import RecoveryNotificationCard from "../../../components/notification/recovery-notification-card";
import DeliveryHealthCard from "../../../components/notification/delivery-health-card";

export default function AlertingPage() {
    const [maintenance, setMaintenance] = useState<boolean>(false);
    const [emailEnabled, setEmailEnabled] = useState<boolean>(false);
    const [slackEnabled, setSlackEnabled] = useState<boolean>(true);
    const [webhookEnabled, setWebhookEnabled] = useState<boolean>(true);
    const [recoveryEnabled, setRecoveryEnabled] = useState<boolean>(true);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
                
                <div>
                    <p className="text-xs text-gray-400 mb-1">Alerting &amp; Notification Channels</p>
                    <h1 className="text-xl font-semibold text-gray-900">Alerting &amp; Notification Channels</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Configure how your team gets notified when an endpoint goes DOWN or recovers.
                    </p>
                </div>

                {/* Maintenance Mode */}
                <MaintenanceModeCard enabled={maintenance} onChange={setMaintenance} />

                {/* Native Channels */}
                <div>
                    <h2 className="text-sm font-semibold text-gray-700 mb-1">Native Notification Channels</h2>
                    <p className="text-xs text-gray-400 mb-3">Connect the channels your team already uses every day.</p>
                    <div className="space-y-3">
                        <EmailNotificationsCard
                            enabled={emailEnabled}
                            onChange={setEmailEnabled}
                            emails={["ops@uptimeiq.com", "oncall@uptimeiq.com", "sre@uptimeiq.com"]}
                        />
                        <SlackIntegrationCard
                            enabled={slackEnabled}
                            onChange={setSlackEnabled}
                            defaultUrl="https://hooks.slack.com/services/T000/B000/XXXX"
                        />
                        <CustomWebhooksCard
                            enabled={webhookEnabled}
                            onChange={setWebhookEnabled}
                            defaultUrl="https://api.company.com/webhooks/alerts"
                            defaultToken="sk_live_a8f3k2m9x1p4q7r0n5t6"
                            eventTags={["[monitor.down]", "[monitor.up]"]}
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-gray-700 mb-1">Alert Deduplication &amp; Threshold Rules</h2>
                    <p className="text-xs text-gray-400 mb-3">Reduce noise and keep notifications actionable.</p>
                    <div className="space-y-3">
                        <FailureThresholdCard defaultValue={3} min={1} max={10} />
                        <RecoveryNotificationCard enabled={recoveryEnabled} onChange={setRecoveryEnabled} />
                        <DeliveryHealthCard sentToday={128} deduplicated={42} failed={1} />
                    </div>
                </div>

            </div>
        </div>
    );
}