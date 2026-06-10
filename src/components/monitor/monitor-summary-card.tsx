"use client";

import { Globe, Clock, Timer, Hash, Zap } from "lucide-react";
import { HttpMethod } from "@/types/monitor.types";
import React from "react";

const METHOD_COLORS: Record<HttpMethod, string> = {
    GET:    "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    POST:   "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
    PUT:    "bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-400/20",
    PATCH:  "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20",
    DELETE: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
    HEAD:   "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/20",
};

interface MonitorSummaryCardProps {
    name:         string;
    url:          string;
    method:       HttpMethod;
    interval:     number;
    timeout:      number;
    headerCount:  number;
    hasBody:      boolean;
}

function SummaryRow({
                        icon, label, value,
                    }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <span className="mt-0.5 text-slate-400 dark:text-slate-500 shrink-0">{icon}</span>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">
                    {label}
                </p>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200 break-all">{value}</p>
            </div>
        </div>
    );
}

export function MonitorSummaryCard({
                                       name, url, method, interval, timeout, headerCount, hasBody,
                                   }: MonitorSummaryCardProps) {
    const displayUrl = url || "https://your-endpoint.com";
    const displayName = name || "Untitled monitor";

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden sticky top-20">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">
                    Summary
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                    {displayName}
                </p>
            </div>

            {/* Method badge */}
            <div className="px-4 pt-3 pb-1">
        <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-lg border ${METHOD_COLORS[method]}`}>
          {method}
        </span>
            </div>

            {/* Rows */}
            <div className="px-4 pb-2">
                <SummaryRow
                    icon={<Globe className="w-3.5 h-3.5" />}
                    label="Endpoint"
                    value={displayUrl}
                />
                <SummaryRow
                    icon={<Clock className="w-3.5 h-3.5" />}
                    label="Check Interval"
                    value={`Every ${interval}s`}
                />
                <SummaryRow
                    icon={<Timer className="w-3.5 h-3.5" />}
                    label="Timeout"
                    value={`${timeout}s`}
                />
                <SummaryRow
                    icon={<Hash className="w-3.5 h-3.5" />}
                    label="Headers"
                    value={headerCount > 0 ? `${headerCount} header${headerCount > 1 ? "s" : ""}` : "None"}
                />
                <SummaryRow
                    icon={<Zap className="w-3.5 h-3.5" />}
                    label="Request Body"
                    value={hasBody ? "Included" : "None"}
                />
            </div>

            {/* What happens after save */}
            <div className="mx-4 mb-4 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1.5">
                    After saving
                </p>
                <ul className="space-y-1">
                    {[
                        `First check runs within ${interval}s`,
                        "Alerts fire if 3 consecutive checks fail",
                        "Response time tracked continuously",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-indigo-600 dark:text-indigo-400">
              <span className="mt-0.5 w-3 h-3 rounded-full bg-indigo-200 dark:bg-indigo-500/30 flex items-center justify-center shrink-0">
                <svg className="w-1.5 h-1.5" viewBox="0 0 6 6" fill="currentColor">
                  <path d="M1 3l1.5 1.5L5 1.5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}