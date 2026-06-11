"use client";

import {
    PieChart, Pie, Cell,
    BarChart, Bar,
    XAxis, YAxis,Tooltip,
    ResponsiveContainer,
} from "recharts";
import React from "react";
import {downtimeTimeline} from "@/lib/monitor-mock-data";

const TT_STYLE: React.CSSProperties = {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 8,
    fontSize: 11,
    color: "#94a3b8",
    padding: "6px 10px",
};

type SuccessVsFailure = {
    data: {
        name?: string;
        value?: number;
        color?: string;
    }[];
};

/*
const DowntimeTimeline ={
    data: {day:string, min: number[]}
}
*/


const AXIS_TICK  = { fontSize: 10, fill: "#475569" };


function ChartLabel({ title, sub }: { title: string; sub: string }) {
    return (
        <div className="mb-3">
            <p className="text-xs font-bold text-black">{title}</p>
            <p className="text-[10px] text-slate-500">{sub}</p>
        </div>
    );
}

export function SuccessVsFailureChart({data}: SuccessVsFailure) {
    const total = data.reduce((a, b) => a + b.value, 0);

    return (
        <div className="bg-white border border-gray-400 rounded-xl p-4">
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
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={TT_STYLE} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend + bars */}
                <div className="space-y-3 flex-1">
                    {data.map(({ name, value, color }) => (
                        <div key={name}>
                            <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: color }}
                  />
                    {name}
                </span>
                                <span className="text-xs font-bold text-slate-200">
                  {value?.toLocaleString()}
                </span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    /*style={value ? { width: `${(value / total) * 100}%`, background: color } : ""}*/
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function DowntimeTimelineChart() {
    return (
        <div className="bg-white border border-gray-400 rounded-xl p-4">
            <ChartLabel
                title="Downtime Timeline"
                sub="Minutes of downtime per day"
            />
            <ResponsiveContainer width="100%" height={160}>
                <BarChart
                    data={downtimeTimeline}
                    barSize={18}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                    <XAxis dataKey="day" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 4]} tick={AXIS_TICK} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={TT_STYLE}
                        formatter={(v: number) => [`${v}m`, "Downtime"]}
                    />
                    <Bar dataKey="min" radius={[3, 3, 0, 0]}>
                        {downtimeTimeline.map((entry, i) => (
                            <Cell
                                key={i}
                                fill={entry.min > 0 ? "#f43f5e" : "#1e293b"}
                                opacity={entry.min > 0 ? 0.9 : 1}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}