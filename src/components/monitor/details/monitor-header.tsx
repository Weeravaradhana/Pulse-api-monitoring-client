"use client";

import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { Incident, IncidentSeverity } from "@/lib/monitor-mock-data";
import React from "react";

const SEVERITY_CONFIG: Record<IncidentSeverity, {
    icon: React.ElementType;
    badge: string;
    dot: string;
    border: string;
}> = {
    critical: {
        icon: AlertCircle,
        badge: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
        dot: "bg-rose-500",
        border: "border-l-rose-500",
    },
    warning: {
        icon: AlertTriangle,
        badge: "bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-400/20",
        dot: "bg-amber-400",
        border: "border-l-amber-400",
    },
    info: {
        icon: Info,
        badge: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
        dot: "bg-indigo-400",
        border: "border-l-indigo-400",
    },
};

function formatDate(iso: string) {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

interface IncidentCardProps {
    incident: Incident;
}

function IncidentCard({ incident }: IncidentCardProps) {
    // Null pointer exception එකක් නොවෙන්න fallback එකක් සහිතව ආරක්ෂා කර ඇත
    const cfg = SEVERITY_CONFIG[incident.severity] || SEVERITY_CONFIG.info;
    const SevIcon = cfg.icon;
    const resolved = incident.resolvedAt !== null;

    return (
        <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 ${cfg.border} rounded-xl p-4 transition-all hover:shadow-md`}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.badge} border`}>
                        <SevIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                                {incident.severity}
                            </span>
                            {resolved ? (
                                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Resolved
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                    Ongoing
                                </span>
                            )}
                        </div>
                        {/* CSS Typo Fix: wrap-break-word වෙනුවට break-words භාවිතා කර ඇත */}
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 break-words line-clamp-2">
                            {incident.cause}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                    { label: "Started", value: formatDate(incident.startedAt) },
                    { label: "Duration", value: incident.duration || "Active" },
                    { label: "Failed Checks", value: `${incident.affectedChecks || 0} checks` },
                ].map((item) => (
                    <div key={item.label}>
                        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">
                            {item.label}
                        </p>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface IncidentsSectionProps {
    incidents: Incident[];
}

export function IncidentsSection({ incidents }: IncidentsSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                    Incident History
                </h3>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    Last 30 days matrix
                </span>
            </div>

            {incidents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No incidents</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            This monitor has been running without issues
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {incidents.map((incident) => (
                        <IncidentCard key={incident.id} incident={incident} />
                    ))}
                </div>
            )}
        </div>
    );
}