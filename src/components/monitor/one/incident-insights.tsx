"use client";

import { AlertTriangle, Clock, Activity, Wifi } from "lucide-react";
import { INCIDENTS } from "@/lib/monitor-mock-data";

export function IncidentInsights() {
    return (
        <div className="space-y-3">
            <div>
                <p className="text-sm font-bold text-slate-200">Incident Insights</p>
                <p className="text-xs text-slate-500">Recent incidents and their root causes</p>
            </div>

            <div className="space-y-3">
                {INCIDENTS.map((inc) => (
                    <div
                        key={inc.id}
                        className="bg-[#0d1526] border border-slate-800 rounded-xl p-4 flex items-start gap-3 hover:border-slate-700 transition-colors"
                    >
                        {/* Icon */}
                        <div
                            className={`w-7 h-7 rounded-lg ${inc.iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                        >
                            <AlertTriangle className={`w-3.5 h-3.5 ${inc.iconColor}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-xs font-semibold text-slate-200">{inc.title}</span>
                                <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${inc.severityColor}`}
                                >
                  {inc.severity}
                </span>
                            </div>
                            <p className="text-xs text-slate-500 mb-2">{inc.desc}</p>
                            <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock    className="w-3 h-3" /> {inc.time}
                </span>
                                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Activity className="w-3 h-3" /> {inc.duration}
                </span>
                                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Wifi     className="w-3 h-3" /> {inc.cause}
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}