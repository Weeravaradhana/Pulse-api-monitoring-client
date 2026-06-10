"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell, TooltipProps,
} from "recharts";
import { useTheme } from "@/components/dashboard/theme-context";
import { MonitorDetail } from "@/lib/monitor-mock-data";
import React from "react";

interface UptimeChartProps {
    monitor: MonitorDetail;
}

interface ChartDataPayload {
    status: string;
    ms: number;
    time: string;
}

interface RechartsPayloadItem {
    value: number;
    name: string;
    dataKey: string;
    payload: ChartDataPayload;
}


interface CustomTooltipProps {
    active?: boolean;
    payload?: RechartsPayloadItem[];
    label?: string | number;
    style?: React.CSSProperties;
}

interface CustomTooltipProps extends TooltipProps{
    style?: React.CSSProperties;
}


function UptimeTooltip({ active, payload, label, style }: CustomTooltipProps) {
    if (!active || !payload || !payload.length) return null;
    const val = payload[0].value;
    return (
        <div style={style} className="px-3 py-2 shadow-xl">
            <p className="text-[10px] font-semibold opacity-60 mb-1">{label}</p>
            <p className="text-xs font-bold">
                {val.toFixed(2)}
                <span className="font-normal opacity-60 ml-0.5">% uptime</span>
            </p>
        </div>
    );
}

export function UptimeChart({ monitor }: UptimeChartProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const tooltipStyle: React.CSSProperties = {
        backgroundColor: isDark ? "#1e293b" : "#fff",
        border:          `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
        borderRadius:    8,
        fontSize:        11,
        color:           isDark ? "#cbd5e1" : "#475569",
    };

    const gridColor  = isDark ? "#1e293b" : "#f1f5f9";
    const axisColor  = isDark ? "#475569" : "#94a3b8";
    
    const tickFormatter = (_: string, index: number) =>
        index % 5 === 0 ? monitor.uptimeHistory[index]?.date ?? "" : "";

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 transition-colors duration-200">
            <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        Daily Uptime
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        Last 30 days
                    </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            ≥ 99.9%
          </span>
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
            Incident
          </span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
                <BarChart
                    data={monitor.uptimeHistory}
                    barSize={10}
                    margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickFormatter={tickFormatter}
                        tick={{ fontSize: 10, fill: axisColor }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        domain={[88, 100]}
                        tickFormatter={(v) => `${v}%`}
                        tick={{ fontSize: 10, fill: axisColor }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        content={(props) => (
                            <UptimeTooltip
                                {...props as unknown as CustomTooltipProps}
                                style={tooltipStyle}
                            />
                        )}
                    />
                    <Bar dataKey="uptime" radius={[3, 3, 0, 0]}>
                        {monitor.uptimeHistory.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.uptime < 99 ? "#f43f5e" : "#10b981"}
                                opacity={entry.uptime < 99 ? 1 : 0.8}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}