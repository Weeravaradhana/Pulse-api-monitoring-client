"use client";

import { Monitor, CheckCircle2, AlertCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "@/components/dashboard/theme-context";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ChartDataPoint {
    v: number;
}

interface KpiDetail {
    currentValue: string | number;
    delta: string;
    deltaPositive: boolean;
    chartData: ChartDataPoint[];
}

interface ApiResponse {
    totalMonitors: KpiDetail;
    activeMonitors: KpiDetail;
    downMonitors: KpiDetail;
    averageUptime: KpiDetail;
}

interface KpiCardProps {
    title: string;
    value: string | number;
    delta: string;
    deltaPositive: boolean;
    icon: React.ReactNode;
    iconBg: string;
    chart: React.ReactNode;
}

function KpiCard({ title, value, delta, deltaPositive, icon, iconBg, chart }: KpiCardProps) {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col gap-3 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm dark:hover:shadow-none transition-all duration-200 min-w-0">
            <div className="flex items-start justify-between">
                <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mb-1 truncate">{title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none truncate">{value}</p>
                </div>
                <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0 ml-2`}>
                    {icon}
                </div>
            </div>
            <div className="h-10 w-full">{chart}</div>
            <div className="flex items-center gap-1 flex-wrap min-w-0">
                {deltaPositive
                    ? <ArrowUpRight className="w-3 h-3 text-emerald-500 shrink-0" />
                    : <ArrowDownRight className="w-3 h-3 text-rose-500 shrink-0" />}
                <span className={`text-[11px] sm:text-xs font-semibold ${deltaPositive ? "text-emerald-500" : "text-rose-500"}`}>
                    {delta}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 truncate">vs last week</span>
            </div>
        </div>
    );
}

export function KpiCards() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [analyticsData, setAnalyticsData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        const fetchKpiData = async () => {
            try {
                const response = await axios.get<ApiResponse>(
                    "http://localhost:3000/monitors/analytics/kpi",
                    { withCredentials: true }
                );

                console.log("RESPONSE FOR ANAYLIS", response)
                setAnalyticsData(response.data);
            } catch (error) {
                console.error("Failed to load KPI analytics", error);
            } finally {
                setLoading(false);
            }
        };

        fetchKpiData();

    }, []);

    const tooltipStyle = {
        backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
        border: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
        borderRadius: 8,
        fontSize: 11,
        color: theme === "dark" ? "#cbd5e1" : "#475569",
    };

    if (!mounted || loading || !analyticsData) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800/50 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard
                title="Total Monitors" value={analyticsData.totalMonitors.currentValue} delta={analyticsData.totalMonitors.delta} deltaPositive={analyticsData.totalMonitors.deltaPositive}
                iconBg="bg-indigo-500/10 dark:bg-indigo-500/15"
                icon={<Monitor className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />}
                chart={
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.totalMonitors.chartData} barSize={5}>
                            <Bar dataKey="v" fill="#6366f1" radius={[2,2,0,0]} />
                            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "transparent" }} />
                        </BarChart>
                    </ResponsiveContainer>
                }
            />
            <KpiCard
                title="Active Monitors" value={analyticsData.activeMonitors.currentValue} delta={analyticsData.activeMonitors.delta} deltaPositive={analyticsData.activeMonitors.deltaPositive}
                iconBg="bg-emerald-500/10 dark:bg-emerald-500/15"
                icon={<CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />}
                chart={
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.activeMonitors.chartData}>
                            <defs>
                                <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={1.5} fill="url(#activeGrad)" dot={false} />
                            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#10b981", strokeWidth: 1, strokeDasharray: "3 3" }} />
                        </AreaChart>
                    </ResponsiveContainer>
                }
            />
            <KpiCard
                title="Down Monitors" value={analyticsData.downMonitors.currentValue} delta={analyticsData.downMonitors.delta} deltaPositive={analyticsData.downMonitors.deltaPositive}
                iconBg="bg-rose-500/10 dark:bg-rose-500/15"
                icon={<AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />}
                chart={
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.downMonitors.chartData} barSize={5}>
                            <Bar dataKey="v" fill="#f43f5e" radius={[2,2,0,0]} />
                            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "transparent" }} />
                        </BarChart>
                    </ResponsiveContainer>
                }
            />
            <KpiCard
                title="Average Uptime" value={analyticsData.averageUptime.currentValue} delta={analyticsData.averageUptime.delta} deltaPositive={analyticsData.averageUptime.deltaPositive}
                iconBg="bg-cyan-500/10 dark:bg-cyan-500/15"
                icon={<TrendingUp className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
                chart={
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.averageUptime.chartData}>
                            <defs>
                                <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="v" stroke="#06b6d4" strokeWidth={1.5} fill="url(#uptimeGrad)" dot={false} />
                            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#06b6d4", strokeWidth: 1, strokeDasharray: "3 3" }} />
                        </AreaChart>
                    </ResponsiveContainer>
                }
            />
        </div>
    );
}