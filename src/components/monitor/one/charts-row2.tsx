"use client";

import {
    PieChart, Pie, Cell,
    Tooltip,
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
    color?:string;
    status?: string;
    checkedAt?: string;
    errorMessage?: string | null;
}

type SuccessVsFailureProps = {
    data: {
        name: string;
        value: number;
    }[];
};

type Props = {
    data: ChartDataPoint[];
};

function ChartLabel({ title, sub }: { title: string; sub: string }) {
    return (
        <div className="mb-3">
            <p className="text-xs font-bold text-black">{title}</p>
            <p className="text-[10px] text-slate-500">{sub}</p>
        </div>
    );
}

export function SuccessVsFailureChart({ data }: SuccessVsFailureProps) {

    const COLORS: { [key: string]: string } = {
        Success: "#10b981",
        Failure: "#f43f5e",
    };

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            <ChartLabel
                title="Success vs Failure"
                sub="Distribution of check outcomes"
            />
            <div className="flex items-center gap-4">
                <div className="shrink-0">
                    <ResponsiveContainer width={130} height={130}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%" cy="50%"
                                innerRadius={42} outerRadius={60}
                                startAngle={90} endAngle={-270}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={COLORS[entry.name] || "#64748b"} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={TT_STYLE} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-3 flex-1">
                    {data.map(({ name, value }) => {
                        const itemColor = COLORS[name] || "#64748b";
                        const percentage = total > 0 ? (value / total) * 100 : 0;

                        return (
                            <div key={name}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ background: itemColor }}
                                        />
                                        {name}
                                    </span>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                        {value.toLocaleString()}
                                    </span>
                                </div>

                                <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%`, background: itemColor }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export function DowntimeTimelineChart({ data }: Props) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 h-full">
            <ChartLabel
                title="Recent Downtime Events"
                sub="Latest failure logs captured by the engine"
            />

            {data.length === 0 ? (
                <div className="h-35 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                    <p className="text-xs text-emerald-500 font-medium">✨ No downtime detected in this period</p>
                </div>
            ) : (
                <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-850">
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/10 text-rose-500 rounded border border-rose-500/20 shrink-0">
                                {item.status || "DOWN"}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300 truncate">
                                    {item.errorMessage || "No error message provided"}
                                </p>
                                <p className="text-[9px] text-slate-400 mt-0.5">
                                    {item.checkedAt ? new Date(item.checkedAt).toLocaleString() : ""}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}