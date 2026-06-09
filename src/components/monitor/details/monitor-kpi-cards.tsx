"use client";

import { TrendingUp, Zap, AlertCircle, Hash } from "lucide-react";
import { MonitorDetail } from "@/lib/monitor-mock-data";
import React from "react";

interface KpiCardProps {
    label:     string;
    value:     string;
    sub?:      string;
    icon:      React.ElementType;
    iconBg:    string;
    iconColor: string;
    accent:    string;
}

function KpiCard({ label, value, sub, icon: Icon, iconBg, iconColor, accent }: KpiCardProps) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">
                    {label}
                </p>
                <p className={`text-2xl font-bold leading-none ${accent}`}>
                    {value}
                </p>
                {sub && (
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{sub}</p>
                )}
            </div>
        </div>
    );
}

interface MonitorKpiCardsProps {
    monitor: MonitorDetail;
}

export function MonitorKpiCards({ monitor }: MonitorKpiCardsProps) {
    const uptimeColor =
        monitor.uptimeLast30d >= 99.9
            ? "text-emerald-500 dark:text-emerald-400"
            : monitor.uptimeLast30d >= 99
                ? "text-amber-500 dark:text-amber-400"
                : "text-rose-500 dark:text-rose-400";

    const rtColor =
        monitor.avgResponseTime < 300
            ? "text-emerald-500 dark:text-emerald-400"
            : monitor.avgResponseTime < 600
                ? "text-amber-500 dark:text-amber-400"
                : "text-rose-500 dark:text-rose-400";

    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            <KpiCard
                label="Uptime — 30 days"
                value={`${monitor.uptimeLast30d}%`}
                sub="SLA target: 99.9%"
                icon={TrendingUp}
                iconBg="bg-emerald-50 dark:bg-emerald-500/10"
                iconColor="text-emerald-500 dark:text-emerald-400"
                accent={uptimeColor}
            />
            <KpiCard
                label="Avg Response Time"
                value={`${monitor.avgResponseTime}ms`}
                sub="Last 24 hours"
                icon={Zap}
                iconBg="bg-indigo-50 dark:bg-indigo-500/10"
                iconColor="text-indigo-500 dark:text-indigo-400"
                accent={rtColor}
            />
            <KpiCard
                label="Last Incident"
                value={monitor.lastIncident ?? "None"}
                sub={monitor.lastIncident ? "2 incidents this month" : "Clean record"}
                icon={AlertCircle}
                iconBg={monitor.lastIncident ? "bg-rose-50 dark:bg-rose-500/10" : "bg-slate-100 dark:bg-slate-800"}
                iconColor={monitor.lastIncident ? "text-rose-500 dark:text-rose-400" : "text-slate-400 dark:text-slate-500"}
                accent={monitor.lastIncident ? "text-rose-500 dark:text-rose-400" : "text-slate-600 dark:text-slate-300"}
            />
            <KpiCard
                label="Total Checks"
                value={monitor.totalChecks.toLocaleString()}
                sub={`Every ${monitor.interval}s`}
                icon={Hash}
                iconBg="bg-cyan-50 dark:bg-cyan-500/10"
                iconColor="text-cyan-500 dark:text-cyan-400"
                accent="text-slate-800 dark:text-slate-100"
            />
        </div>
    );
}