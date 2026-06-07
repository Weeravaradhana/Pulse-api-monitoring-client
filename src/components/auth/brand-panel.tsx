import { Activity } from "lucide-react";
import { StatusCard } from "./status-card";
import { TrustList } from "./trust-list";

export function BrandPanel() {
    return (
        <div className="hidden lg:flex flex-col w-[340px] min-w-[340px] bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 p-8 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-indigo-500/10 pointer-events-none" />
            <div className="absolute bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/7 pointer-events-none" />

            <div className="flex items-center gap-2.5 mb-8 z-10">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-bold text-white">UptimeIQ</span>
            </div>

            <div className="z-10">
                <StatusCard />
            </div>

            <div className="z-10 mt-1">
                <h2 className="text-2xl font-bold text-white leading-snug mb-3">
                    Monitor Every API.{" "}
                    <span className="text-indigo-400">Stay Always Up.</span>
                </h2>
                <p className="text-sm text-white/45 leading-relaxed mb-6">
                    Get real-time insight into your services with enterprise-grade
                    uptime monitoring and instant alerting.
                </p>
                <TrustList />
            </div>
        </div>
    );
}