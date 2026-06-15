"use client";

import { useState } from "react";
import MaintenanceModeCard from "../../../components/notification/maintenance-mode-card";
import EmailNotificationsCard from "../../../components/notification/email-notifications-card";
import SlackIntegrationCard from "../../../components/notification/slackIntegration-card";
import CustomWebhooksCard from "../../../components/notification/custom-webhooks-card";
import FailureThresholdCard from "../../../components/notification/failure-threshold-card";
import RecoveryNotificationCard from "../../../components/notification/recovery-notification-card";
import DeliveryHealthCard from "../../../components/notification/delivery-health-card";
import Button from "@/components/common/button";

export default function AlertingPage() {
    const [maintenance, setMaintenance] = useState(false);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [slackEnabled, setSlackEnabled] = useState(false);
    const [webhookEnabled, setWebhookEnabled] = useState(false);
    const [recoveryEnabled, setRecoveryEnabled] = useState(false);
    const [isMute, setMute] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const selectOption = (selectedIsMute: boolean) => {
        setMute(selectedIsMute);
    };

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6">

                <div className="border border-gray-200 rounded-xl bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                        <p className="text-xs text-gray-400 mb-1">
                            Alerting & Notification Channels
                        </p>

                        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Alerting & Notification Channels
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Configure how your team gets notified when an endpoint goes DOWN or recovers.
                        </p>
                    </div>

                    <div className="w-full sm:w-auto flex justify-end">
                        <Button label={"save"}/>


                    </div>
                </div>

                <MaintenanceModeCard
                    enabled={maintenance}
                    onChange={setMaintenance}
                    onSelect={selectOption}
                />

                {isMute && (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full text-left px-4 py-3 flex items-center justify-between"
                        >
              <span className="text-sm font-medium text-gray-800">
                Advanced Options
              </span>

                            <span className="text-xs text-gray-400">
                {isOpen ? "Hide" : "Show"}
              </span>
                        </button>

                        {isOpen && (
                            <div className="px-4 pb-4 space-y-6 border-t border-gray-100">


                                <div>
                                    <h2 className="text-sm font-semibold text-gray-700 mb-1">
                                        Native Notification Channels
                                    </h2>

                                    <p className="text-xs text-gray-400 mb-3">
                                        Connect the channels your team already uses every day.
                                    </p>

                                    <div className="space-y-3">
                                        <EmailNotificationsCard
                                            enabled={emailEnabled}
                                            onChange={setEmailEnabled}
                                            emails={[
                                                "ops@uptimeiq.com",
                                                "oncall@uptimeiq.com",
                                                "sre@uptimeiq.com",
                                            ]}
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
                                            defaultToken="sk_live_xxxx"
                                            eventTags={["[monitor.down]", "[monitor.up]"]}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold text-gray-700 mb-1">
                                        Alert Rules
                                    </h2>

                                    <p className="text-xs text-gray-400 mb-3">
                                        Reduce noise and keep notifications actionable.
                                    </p>

                                    <div className="space-y-3">
                                        <FailureThresholdCard defaultValue={3} min={1} max={10} />

                                        <RecoveryNotificationCard
                                            enabled={recoveryEnabled}
                                            onChange={setRecoveryEnabled}
                                        />

                                        <DeliveryHealthCard
                                            sentToday={128}
                                            deduplicated={42}
                                            failed={1}
                                        />
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}