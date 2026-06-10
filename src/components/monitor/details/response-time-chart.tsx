"use client";

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, TooltipProps,
} from "recharts";
import { useTheme } from "@/components/dashboard/theme-context";
import React from "react";

interface CustomDotProps {
    cx?: number;
    cy?: number;
    payload?: { status: string };
}

function CustomDot({ cx, cy, payload }: CustomDotProps) {
    if (!cx || !cy || !payload) return null;
    if (payload.status !== "down") return null;
    return (
        <circle
            cx={cx} cy={cy} r={5}
            fill="#f43f5e" stroke="#fff" strokeWidth={2}
        />
    );
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

function CustomTooltip({ active, payload, label, style }:CustomTooltipProps) {
    if (!active || !payload || !payload.length) return null;
    const isDown = payload[0]?.payload?.status === "down";
    return (
        <div style={style} className="px-3 py-2 shadow-xl">
            <p className="text-[10px] font-semibold mb-1 opacity-60">{label}</p>
            {isDown ? (
                <p className="text-xs font-bold text-rose-500">⚠ Endpoint Down</p>
            ) : (
                <p className="text-xs font-bold">
                    {payload[0].value}
                    <span className="font-normal opacity-60 ml-0.5">ms</span>
                </p>
            )}
        </div>
    );
}

interface ResponseTimeChartProps {
    monitor: any;
}

export function ResponseTimeChart({ monitor }: ResponseTimeChartProps) {
    const { theme } = useTheme();

    const isDark = theme === "dark";

    const tooltipStyle: React.CSSProperties = {
        backgroundColor: isDark ? "#1e293b" : "#fff",
        border:          `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
        borderRadius:    8,
        fontSize:        11,
        color:           isDark ? "#cbd5e1" : "#475569",
    };

    const gridColor   = isDark ? "#1e293b" : "#f1f5f9";
    const axisColor   = isDark ? "#475569" : "#94a3b8";
    const avgRt       = monitor.avgResponseTime;

    const tickFormatter = (_: string, index: number) =>
        index % 4 === 0 ? monitor.responseTimeHistory[index]?.time ?? "" : "";
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 transition-colors duration-200">
            <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        Response Time
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        Last 24 hours · 30-minute intervals
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            Response time
          </span>
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="w-4 h-0.5 bg-amber-400 block" style={{ borderTop: "2px dashed" }} />
            Avg {avgRt}ms
          </span>
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Outage
          </span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                    data={monitor.responseTimeHistory}
                    margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0}    />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={gridColor}
                        vertical={false}
                    />

                    <XAxis
                        dataKey="time"
                        tickFormatter={tickFormatter}
                        tick={{ fontSize: 10, fill: axisColor }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tickFormatter={(v) => `${v}ms`}
                        tick={{ fontSize: 10, fill: axisColor }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, "auto"]}
                    />

                    <Tooltip
                        content={(props) => (
                            <CustomTooltip
                                {...(props as unknown as CustomTooltipProps)}
                                style={tooltipStyle}
                            />
                        )}
                    />

                    <ReferenceLine
                        y={avgRt}
                        stroke="#f59e0b"
                        strokeDasharray="5 3"
                        strokeWidth={1.5}
                    />

                    <Area
                        type="monotone"
                        dataKey="ms"
                        stroke="#6366f1"
                        strokeWidth={2}
                        fill="url(#rtGrad)"
                        dot={<CustomDot />}
                        activeDot={{ r: 4, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}