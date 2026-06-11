

export type MonitorStatus = "operational" | "down" | "degraded" | "paused";
export type IncidentSeverity = "critical" | "warning" | "info";

export interface CheckResult {
    id: string;
    timestamp: string;
    responseTime: number;
    statusCode: number;
    status: "up" | "down" | "timeout";
}

export interface Incident {
    id: string;
    startedAt: string;
    resolvedAt: string | null;
    duration: string;
    cause: string;
    severity: IncidentSeverity;
    affectedChecks: number;
}

export interface MonitorDetail {
    id: string;
    name: string;
    url: string;
    method: string;
    interval: number;
    timeout: number;
    status: MonitorStatus;
    lastCheckedAt: string;
    uptimeLast30d: number;
    avgResponseTime: number;
    totalChecks: number;
    lastIncident: string | null;
    responseTimeHistory: { time: string; ms: number; status: "up" | "down" }[];
    uptimeHistory: { date: string; uptime: number }[];
    recentChecks: CheckResult[];
    incidents: Incident[];
}



export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


export const downtimeTimeline = DAYS.map((day, i) => ({
    day,
    min: [1.2, 2.8, 0.5, 0, 1.8, 0.3, 0.9][i],
}));


export const INCIDENTS = [
    {
        id: 1,
        title: "Database connection pool exhausted",
        severity: "Critical",
        severityColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
        iconBg: "bg-rose-500/10",
        iconColor: "text-rose-400",
        desc: "Requests timed out causing 503 responses across the API gateway.",
        time: "Wed, 03:14 UTC",
        duration: "4m 12s",
        cause: "Resource limit",
    },
    {
        id: 2,
        title: "Elevated latency on edge nodes",
        severity: "Warning",
        severityColor: "bg-amber-400/20 text-amber-400 border-amber-400/30",
        iconBg: "bg-amber-400/10",
        iconColor: "text-amber-400",
        desc: "Response times briefly spiked above 400ms during peak traffic.",
        time: "Mon, 19:02 UTC",
        duration: "1m 03s",
        cause: "Network congestion",
    },
];
