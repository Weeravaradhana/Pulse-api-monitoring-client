"use client";

import {
    LineChart, Line, AreaChart, Area,
    XAxis, YAxis, Tooltip,
    ResponsiveContainer,
} from "recharts";
import React from "react";

const TT_STYLE: React.CSSProperties = {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 8,
    fontSize: 11,
    color: "#94a3b8",
    padding: "6px 10px",
};

interface ChartDataPoint {
    day?: string;
    ms?: number;
    percentage?: number;
    name?: string;
    value?: number;
    status?: string;
    checkedAt?: string;
    errorMessage?: string | null;
}

type Props = {
    data: ChartDataPoint[];
};

const AXIS_TICK = { fontSize: 10, fill: "#475569" };

function ChartLabel({ title, sub }: { title: string; sub: string }) {
    return (
        <div className="mb-3">
            <p className="text-xs font-bold text-black dark:text-slate-200">{title}</p>
            <p className="text-[10px] text-slate-500">{sub}</p>
        </div>
    );
}


export function ResponseTimeTrendChart({ data }: Props) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors">
            <ChartLabel
                title="Response Time Trend"
                sub="Latency in ms over the selected period"
            />
            <ResponsiveContainer width="100%" height={160}>
                <LineChart
                    data={data}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="rtLine" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%"   stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="day" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                    <YAxis domain={["auto", "auto"]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={TT_STYLE}
                        formatter={(v: number) => [`${v}ms`, "Response"]}
                    />
                    <Line
                        type="monotone"
                        dataKey="ms"
                        stroke="url(#rtLine)"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 4, fill: "#6366f1", stroke: "#0f172a", strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function UptimeOverTimeChart({ data }: Props) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors">
            <ChartLabel
                title="Uptime Over Time"
                sub="Percentage availability per day"
            />
            <ResponsiveContainer width="100%" height={160}>
                <AreaChart
                    data={data}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="uptGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#10b981" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0}    />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="day" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                    <YAxis
                        domain={[0, 100]}
                        tick={AXIS_TICK}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={TT_STYLE}
                        formatter={(v: number) => [`${v.toFixed(1)}%`, "Uptime"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="percentage"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#uptGrad)"
                        dot={false}
                        activeDot={{ r: 4, fill: "#10b981", stroke: "#0f172a", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}