

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

function generateResponseHistory() {
    const now = new Date();
    return Array.from({ length: 48 }, (_, i) => {
        const d = new Date(now.getTime() - (47 - i) * 30 * 60 * 1000);
        const hour   = d.getHours().toString().padStart(2, "0");
        const minute = d.getMinutes().toString().padStart(2, "0");
        const isDown = i === 18 || i === 19;
        return {
            time:   `${hour}:${minute}`,
            ms:     isDown ? 0 : Math.floor(180 + Math.sin(i * 0.4) * 60 + Math.random() * 80),
            status: isDown ? ("down" as const) : ("up" as const),
        };
    });
}

function generateUptimeHistory() {
    return Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return { date: label, uptime: i === 10 ? 91.2 : 99.5 + Math.random() * 0.5 };
    });
}

function generateRecentChecks(): CheckResult[] {
    const now = new Date();
    return Array.from({ length: 20 }, (_, i) => {
        const d = new Date(now.getTime() - i * 60 * 1000);
        const isDown = i === 3 || i === 4;
        return {
            id:           `chk-${i}`,
            timestamp:    d.toISOString(),
            responseTime: isDown ? 0   : Math.floor(160 + Math.random() * 160),
            statusCode:   isDown ? 503 : 200,
            status:       isDown ? "down" : "up",
        };
    });
}

export const MOCK_MONITOR: MonitorDetail = {
    id:               "mon-001",
    name:             "Core Authentication API",
    url:              "https://api.example.com/v2/auth/health",
    method:           "GET",
    interval:         60,
    timeout:          30,
    status:           "operational",
    lastCheckedAt:    new Date(Date.now() - 18 * 1000).toISOString(),
    uptimeLast30d:    99.98,
    avgResponseTime:  245,
    totalChecks:      43200,
    lastIncident:     "2 days ago",
    responseTimeHistory: generateResponseHistory(),
    uptimeHistory:       generateUptimeHistory(),
    recentChecks:        generateRecentChecks(),
    incidents: [
        {
            id: "inc-001",
            startedAt:    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            resolvedAt:   new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 9 * 60 * 1000).toISOString(),
            duration:     "9 minutes",
            cause:        "HTTP 503 — Service Unavailable (upstream timeout)",
            severity:     "critical",
            affectedChecks: 9,
        },
        {
            id: "inc-002",
            startedAt:    new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            resolvedAt:   new Date(Date.now() - 8 * 24 * 60 * 60 * 1000 + 3 * 60 * 1000).toISOString(),
            duration:     "3 minutes",
            cause:        "Response time exceeded timeout threshold (>30s)",
            severity:     "warning",
            affectedChecks: 3,
        },
    ],
};