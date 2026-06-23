"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    Activity,
    AlertTriangle,
    Bell,
    Check,
    ChevronRight,
    Clock,
    Globe,
    Lock,
    Moon,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

const NAV_LINKS = ["Features", "Pricing", "Docs", "Status"];

const MONITORS = [
    {
        name: "api.production.com/health",
        latency: "142 ms",
        uptime: "99.98%",
        status: "up" as const,
        bars: [14, 18, 10, 20, 16, 18, 22],
    },
    {
        name: "auth.service.io/token",
        latency: "890 ms",
        uptime: "98.40%",
        status: "warn" as const,
        bars: [16, 12, 20, 8, 14, 10, 12],
    },
    {
        name: "payments.api.net/charge",
        latency: "— ms",
        uptime: "96.10%",
        status: "down" as const,
        bars: [18, 20, 16, 4, 4, 5, 4],
    },
    {
        name: "cdn.assets.com/ping",
        latency: "38 ms",
        uptime: "100%",
        status: "up" as const,
        bars: [20, 22, 18, 20, 22, 20, 20],
    },
];

const FEATURES = [
    {
        icon: Activity,
        color: "bg-indigo-50 text-indigo-700",
        title: "Real-time monitoring",
        desc: "Check every endpoint every 30 seconds from multiple regions.",
    },
    {
        icon: Bell,
        color: "bg-teal-50 text-teal-700",
        title: "Instant alerts",
        desc: "Slack, webhook, and email notifications the moment things break.",
    },
    {
        icon: TrendingUp,
        color: "bg-amber-50 text-amber-700",
        title: "Uptime reports",
        desc: "Share public status pages and SLA reports with your team.",
    },
    {
        icon: Moon,
        color: "bg-pink-50 text-pink-700",
        title: "Maintenance mode",
        desc: "Pause alerts during planned downtime with one click.",
    },
    {
        icon: Globe,
        color: "bg-blue-50 text-blue-700",
        title: "Multi-region checks",
        desc: "Verify availability from Asia, Europe, and the Americas.",
    },
    {
        icon: Lock,
        color: "bg-green-50 text-green-700",
        title: "SSL monitoring",
        desc: "Get warned before certificates expire and cause outages.",
    },
];

const INCIDENTS = [
    {
        type: "error" as const,
        icon: AlertTriangle,
        title: "payments.api.net/charge — connection refused",
        sub: "Detected from 3 regions · Slack alert sent",
        time: "2 min ago",
    },
    {
        type: "warn" as const,
        icon: Clock,
        title: "auth.service.io/token — response > 800 ms",
        sub: "Latency threshold exceeded · Under investigation",
        time: "14 min ago",
    },
    {
        type: "ok" as const,
        icon: Check,
        title: "api.production.com/health — recovered",
        sub: "Downtime: 4 min 32 sec · Root cause: deploy restart",
        time: "1 hr ago",
    },
    {
        type: "ok" as const,
        icon: ShieldCheck,
        title: "cdn.assets.com — SSL renewed automatically",
        sub: "Certificate valid for another 90 days",
        time: "3 hr ago",
    },
];

const STATS = [
    { target: 24800, label: "Monitors checked/min", format: (n: number) => n.toLocaleString() },
    { target: 3200, label: "Active users", format: (n: number) => n.toLocaleString() },
    { target: 18400, label: "Incidents resolved", format: (n: number) => n.toLocaleString() },
    { target: 8, label: "Avg alert time (sec)", format: (n: number) => n.toString() },
];

function StatusDot({ status }: { status: "up" | "warn" | "down" }) {
    const base = "w-2 h-2 rounded-full flex-shrink-0";
    if (status === "up") return <span className={`${base} bg-green-500 animate-pulse`} />;
    if (status === "warn") return <span className={`${base} bg-amber-400 animate-pulse`} style={{ animationDuration: "1.2s" }} />;
    return <span className={`${base} bg-red-500`} />;
}

function StatusBadge({ status }: { status: "up" | "warn" | "down" }) {
    if (status === "up") return <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Up</span>;
    if (status === "warn") return <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Slow</span>;
    return <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">Down</span>;
}

function SparkBars({ bars, status }: { bars: number[]; status: "up" | "warn" | "down" }) {
    return (
        <div className="flex items-end gap-0.5 w-14">
            {bars.map((h, i) => (
                <div
                    key={i}
                    style={{ height: h }}
                    className={`w-1 rounded-sm ${
                        status === "down" && i >= 3
                            ? "bg-red-400"
                            : status === "warn"
                                ? i % 2 === 0 ? "bg-indigo-400 opacity-80" : "bg-indigo-300 opacity-50"
                                : "bg-indigo-500 opacity-75"
                    }`}
                />
            ))}
        </div>
    );
}

function IncidentIcon({ type, icon: Icon }: { type: "ok" | "warn" | "error"; icon: React.ElementType }) {
    const styles = {
        ok: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        warn: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
        error: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    };
    return (
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${styles[type]}`}>
            <Icon className="w-3.5 h-3.5" />
        </div>
    );
}

function useCountUp(target: number, duration = 1400) {
    const [value, setValue] = useState(0);
    const frame = useRef<number>(0);
    useEffect(() => {
        let start: number | null = null;
        const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * ease));
            if (p < 1) frame.current = requestAnimationFrame(step);
        };
        frame.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame.current);
    }, [target, duration]);
    return value;
}

function StatItem({ target, label, format }: { target: number; label: string; format: (n: number) => string }) {
    const val = useCountUp(target);
    return (
        <div className="flex-1 text-center py-4 border-r border-slate-100 dark:border-slate-800 last:border-r-0">
            <div className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{format(val)}</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{label}</div>
        </div>
    );
}

export default function HomePage() {
    const [liveLatency, setLiveLatency] = useState(890);

    useEffect(() => {
        const id = setInterval(() => {
            setLiveLatency(750 + Math.round(Math.random() * 280));
        }, 2000);
        return () => clearInterval(id);
    }, []);

    const monitors = MONITORS.map((m) =>
        m.status === "warn" ? { ...m, latency: `${liveLatency} ms` } : m
    );

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">

            <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Activity className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold">UptimeIQ</span>
                    </div>
                    <div className="hidden md:flex items-center gap-7">
                        {NAV_LINKS.map((l) => (
                            <a key={l} href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
                                {l}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/login" className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Sign in
                        </Link>
                        <Link href="/register" className="text-sm px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
                            Get started free
                        </Link>
                    </div>
                </div>
            </nav>
            <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950 rounded-full text-xs text-indigo-600 dark:text-indigo-400 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Live monitoring — 99.97% uptime tracked
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white mb-5">
                    Know when your APIs{" "}
                    <span className="text-indigo-600">go down</span>{" "}
                    before users do
                </h1>
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto mb-8">
                    UptimeIQ watches your endpoints around the clock. Get instant alerts via Slack, webhooks, or email — and see the full incident history in one place.
                </p>
                <div className="flex justify-center gap-3 flex-wrap mb-14">
                    <Link href="/dashboard" className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors">
                        Start monitoring free
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button className="px-5 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        View live demo
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden text-left shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Active monitors</span>
                        <span className="text-xs text-slate-400">Updated just now</span>
                    </div>
                    {monitors.map((m) => (
                        <div key={m.name} className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-50 dark:border-slate-800/60 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <StatusDot status={m.status} />
                            <span className="text-xs text-slate-600 dark:text-slate-300 flex-1 font-mono truncate">{m.name}</span>
                            <SparkBars bars={m.bars} status={m.status} />
                            <span className="text-xs text-slate-400 w-14 text-right tabular-nums">{m.latency}</span>
                            <span className="text-xs text-slate-400 w-12 text-right tabular-nums">{m.uptime}</span>
                            <StatusBadge status={m.status} />
                        </div>
                    ))}
                </div>
            </section>

            <div className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-3xl mx-auto flex divide-x divide-slate-100 dark:divide-slate-800">
                    {STATS.map((s) => (
                        <StatItem key={s.label} target={s.target} label={s.label} format={s.format} />
                    ))}
                </div>
            </div>

            <section className="max-w-3xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-semibold text-center text-slate-800 dark:text-slate-100 mb-2">
                    Everything you need to stay online
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-10">
                    Built for engineering teams who can&#39;t afford downtime.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FEATURES.map(({ icon: Icon, color, title, desc }) => (
                        <div key={title} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-5 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-1">{title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-6 pb-16">
                <p className="text-[11px] text-slate-400 uppercase tracking-widest mb-3">Recent incidents</p>
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                    {INCIDENTS.map((inc, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-800/60 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                            style={{ animationDelay: `${i * 70}ms` }}
                        >
                            <IncidentIcon type={inc.type} icon={inc.icon} />
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-slate-700 dark:text-slate-200 truncate">{inc.title}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{inc.sub}</div>
                            </div>
                            <div className="text-[11px] text-slate-400 shrink-0">{inc.time}</div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-14 text-center px-6">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    Start monitoring in 2 minutes
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-7">
                    No credit card required. Free plan includes 5 monitors and Slack alerts.
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                    <Link href="/dashboard" className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors">
                        Create free account
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                    <a href="#" className="px-5 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors">
                        Read the docs
                    </a>
                </div>
            </section>

            <footer className="border-t border-slate-100 dark:border-slate-800 py-6">
                <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
                            <Activity className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-slate-400">UptimeIQ</span>
                    </div>
                    <span className="text-xs text-slate-400">© 2026 UptimeIQ. All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
}