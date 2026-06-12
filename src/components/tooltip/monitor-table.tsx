"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search, SlidersHorizontal, Layers,
    ExternalLink, Edit2, Trash2,
    ChevronLeft, ChevronRight, Clock, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType = "UP" | "DOWN" | "Warning";

export interface Monitor {
    id: string;
    name: string;
    url: string;
    interval: string;
    lastState: StatusType;
    updatedAt: string;
    timeout: number | null;
}

interface MonitorTableProps {
    monitors: Monitor[];
    totalCount: number;
    page: number;
    onPageChange: (page: number) => void;
    onSearchChange: (query: string) => void;
}

const STATUS_CONFIG: Record<StatusType, { dot: string; badge: string; label: string }> = {
    UP:      { dot: "bg-emerald-500", badge: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20", label: "UP" },
    DOWN:    { dot: "bg-rose-500",    badge: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",          label: "DOWN" },
    Warning: { dot: "bg-amber-400",   badge: "bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-400/20",       label: "Warning" },
};

function StatusBadge({ status }: { status: StatusType }) {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.UP;
    return (
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === "UP" ? "animate-pulse" : ""}`} />
            {cfg.label}
        </span>
    );
}

function ResponseTime({ value }: { value: number | null }) {
    if (value === null) return <span className="text-slate-300 dark:text-slate-600">—</span>;
    const color = value < 200 ? "text-emerald-500 dark:text-emerald-400" : value < 400 ? "text-amber-500 dark:text-amber-400" : "text-rose-500 dark:text-rose-400";
    return <span className={`font-semibold text-xs ${color}`}>{value}ms</span>;
}

function MonitorCard({ monitor, selected, onSelect, onClick }: { monitor: Monitor; selected: boolean; onSelect: () => void; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "border rounded-xl p-4 transition-all duration-200 cursor-pointer",
                selected
                    ? "border-indigo-400/40 bg-indigo-50 dark:bg-indigo-500/5"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
            )}
        >
            <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-start gap-2.5 min-w-0" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox" checked={selected} onChange={onSelect}
                        className="mt-0.5 w-3.5 h-3.5 accent-indigo-600 cursor-pointer shrink-0"
                    />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{monitor.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">{monitor.url}</p>
                    </div>
                </div>
                <StatusBadge status={monitor.lastState} />
            </div>
            <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                    <Clock className="w-3 h-3" /><span>{monitor.updatedAt}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                    <Zap className="w-3 h-3" /><ResponseTime value={monitor.timeout} />
                </div>
                <span className="text-slate-300 dark:text-slate-600 ml-auto">every {monitor.interval}</span>
            </div>
        </div>
    );
}

const toolbarBtn = "flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs font-medium transition-all " +
    "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 " +
    "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 " +
    "hover:border-slate-300 dark:hover:border-slate-600";

export function MonitorTable({ monitors, totalCount, page, onPageChange, onSearchChange }: MonitorTableProps) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [hovered, setHovered] = useState<string | null>(null);

    const allSelected = (monitors?.length ?? 0) > 0 && selected.length === monitors?.length;
    const toggleAll = () => setSelected(allSelected ? [] : monitors.map((m) => m.id));
    const toggleOne = (id: string) =>
        setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

    const handleSearch = (val: string) => {
        setSearch(val);
        onSearchChange(val);
    };

    const handleRowClick = (monitorId: string) => {
        router.push(`dashboard/monitor/analytics/${monitorId}`);
    };

    const totalPages = Math.ceil(totalCount / 10) || 1;

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors duration-200">
            <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Monitors</h2>
                    <div className="flex items-center gap-2">
                        <button className={toolbarBtn}><SlidersHorizontal className="w-3 h-3" />Filter</button>
                        <button className={toolbarBtn}><Layers className="w-3 h-3" />Bulk Actions</button>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 dark:text-slate-500" />
                    <input
                        value={search} onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by name or URL..."
                        className="w-full h-7 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-7 pr-3 text-xs text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                        <th className="w-8 px-4 py-2.5 text-left">
                            <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-3.5 h-3.5 accent-indigo-600 cursor-pointer" />
                        </th>
                        {["Monitor Name", "URL", "Interval", "Status", "Last Checked", "Response Time", "Actions"].map((col) => (
                            <th key={col} className={cn("px-3 py-2.5 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide", col === "Actions" ? "text-right pr-6" : "")}>
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {monitors.map((monitor) => (
                        <tr
                            key={monitor.id}
                            onMouseEnter={() => setHovered(monitor.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => handleRowClick(monitor.id)} // 📌 4. මුළු Row එකම Clickable කිරීම
                            className={cn(
                                "border-b border-slate-100 dark:border-slate-800/60 transition-colors h-11 cursor-pointer", // cursor-pointer ඇතුළත් කරා
                                hovered === monitor.id ? "bg-slate-50 dark:bg-slate-800/40" : "",
                                selected.includes(monitor.id) ? "bg-indigo-50/50 dark:bg-indigo-500/5" : ""
                            )}
                        >
                            <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                                <input type="checkbox" checked={selected.includes(monitor.id)} onChange={() => toggleOne(monitor.id)} className="w-3.5 h-3.5 accent-indigo-600 cursor-pointer" />
                            </td>
                            <td className="px-3 py-2 font-semibold text-slate-800 dark:text-slate-200">{monitor.name}</td>
                            <td className="px-3 py-2 text-slate-400 dark:text-slate-500 font-mono">{monitor.url}</td>
                            <td className="px-3 py-2 text-slate-500 dark:text-slate-400">{monitor.interval}</td>
                            <td className="px-3 py-2"><StatusBadge status={monitor.lastState} /></td>
                            <td className="px-3 py-2 text-slate-400 dark:text-slate-500">{monitor.updatedAt}</td>
                            <td className="px-3 py-2"><ResponseTime value={monitor.timeout} /></td>

                            <td className="px-3 py-2 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className={cn("flex items-center justify-end gap-1.5 transition-opacity duration-150", hovered === monitor.id ? "opacity-100" : "opacity-0")}>
                                    {/* 📌 External Link බටන් එක ක්ලික් කරත් පේජ් එකට යාම */}
                                    <button onClick={() => handleRowClick(monitor.id)} className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"><ExternalLink className="w-3 h-3" /></button>
                                    <button className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"><Edit2 className="w-3 h-3" /></button>
                                    <button className="p-1 rounded bg-rose-50 dark:bg-rose-950 text-rose-400 hover:text-rose-600"><Trash2 className="w-3 h-3" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden">
                <div className="p-3 space-y-2">
                    {monitors.map((monitor) => (
                        <MonitorCard
                            key={monitor.id}
                            monitor={monitor}
                            selected={selected.includes(monitor.id)}
                            onSelect={() => toggleOne(monitor.id)}
                            onClick={() => handleRowClick(monitor.id)} // 📌 මොබයිල් ව්‍යුහයටද ඇතුළත් කිරීම
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 gap-4">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    Total {totalCount} monitors
                </p>
                <div className="flex items-center gap-1">
                    <button onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1} className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 border disabled:opacity-40 transition-all">
                        <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-semibold px-3 text-slate-600 dark:text-slate-400">Page {page} of {totalPages}</span>
                    <button onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 border disabled:opacity-40 transition-all">
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}