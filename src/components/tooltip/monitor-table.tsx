"use client";

import { useState } from "react";
import {
    Search, SlidersHorizontal, Columns3, Layers,
    MoreHorizontal, ExternalLink, Edit2, Trash2,
    ChevronLeft, ChevronRight, Clock, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StatusType = "UP" | "DOWN" | "Warning";

interface Monitor {
    id: number; name: string; url: string;
    interval: string; status: StatusType;
    lastChecked: string; responseTime: string | null;
}

const MONITORS: Monitor[] = [
    { id:1, name:"API Gateway",    url:"api.uptimeiq.io",  interval:"30s", status:"UP",      lastChecked:"12s ago",  responseTime:"142ms" },
    { id:2, name:"Auth Service",   url:"auth.uptimeiq.io", interval:"1m",  status:"DOWN",    lastChecked:"8s ago",   responseTime:null },
    { id:3, name:"Marketing Site", url:"www.uptimeiq.io",  interval:"5m",  status:"UP",      lastChecked:"42s ago",  responseTime:"89ms" },
    { id:4, name:"Payments API",   url:"pay.uptimeiq.io",  interval:"30s", status:"Warning", lastChecked:"18s ago",  responseTime:"512ms" },
    { id:5, name:"CDN Edge",       url:"cdn.uptimeiq.io",  interval:"1m",  status:"UP",      lastChecked:"5s ago",   responseTime:"34ms" },
];

const STATUS_CONFIG: Record<StatusType, { dot: string; badge: string; label: string }> = {
    UP:      { dot:"bg-emerald-500", badge:"bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20", label:"UP" },
    DOWN:    { dot:"bg-rose-500",    badge:"bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",                   label:"DOWN" },
    Warning: { dot:"bg-amber-400",   badge:"bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-400/20",              label:"Warning" },
};

function StatusBadge({ status }: { status: StatusType }) {
    const cfg = STATUS_CONFIG[status];
    return (
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === "UP" ? "animate-pulse" : ""}`} />
            {cfg.label}
    </span>
    );
}

function ResponseTime({ value }: { value: string | null }) {
    if (!value) return <span className="text-slate-300 dark:text-slate-600">—</span>;
    const ms = parseInt(value);
    const color = ms < 200 ? "text-emerald-500 dark:text-emerald-400" : ms < 400 ? "text-amber-500 dark:text-amber-400" : "text-rose-500 dark:text-rose-400";
    return <span className={`font-semibold text-xs ${color}`}>{value}</span>;
}
function MonitorCard({ monitor, selected, onSelect }: {
    monitor: Monitor; selected: boolean; onSelect: () => void
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className={cn(
            "border rounded-xl p-4 transition-all duration-200",
            selected
                ? "border-indigo-400/40 bg-indigo-50 dark:bg-indigo-500/5"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
        )}>
            <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-start gap-2.5 min-w-0">
                    <input
                        type="checkbox" checked={selected} onChange={onSelect}
                        className="mt-0.5 w-3.5 h-3.5 accent-indigo-600 cursor-pointer shrink-0"
                    />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{monitor.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">{monitor.url}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={monitor.status} />
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
                        >
                            <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-8 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                                {[
                                    { icon: ExternalLink, label: "Open",   cls: "text-slate-600 dark:text-slate-300" },
                                    { icon: Edit2,        label: "Edit",   cls: "text-slate-600 dark:text-slate-300" },
                                    { icon: Trash2,       label: "Delete", cls: "text-rose-500 dark:text-rose-400"   },
                                ].map(({ icon: Icon, label, cls }) => (
                                    <button
                                        key={label}
                                        onClick={() => setMenuOpen(false)}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${cls}`}
                                    >
                                        <Icon className="w-3.5 h-3.5" /> {label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                    <Clock className="w-3 h-3" /><span>{monitor.lastChecked}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                    <Zap className="w-3 h-3" /><ResponseTime value={monitor.responseTime} />
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

const toolbarIconBtn = "w-7 h-7 flex items-center justify-center rounded-lg transition-all " +
    "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 " +
    "text-slate-500 dark:text-slate-400";

export function MonitorTable() {
    const [search, setSearch]     = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [hovered, setHovered]   = useState<number | null>(null);
    const [page, setPage]         = useState(1);
    const totalPages = 3;

    const filtered = MONITORS.filter(
        (m) => m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.url.toLowerCase().includes(search.toLowerCase())
    );
    const allSelected = filtered.length > 0 && selected.length === filtered.length;
    const toggleAll   = () => setSelected(allSelected ? [] : filtered.map((m) => m.id));
    const toggleOne   = (id: number) =>
        setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors duration-200">
            <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Monitors</h2>
                    <div className="hidden sm:flex items-center gap-2">
                        <button className={toolbarBtn}>
                            <SlidersHorizontal className="w-3 h-3" />All
                            <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><path d="M2 4l3 3 3-3H2z"/></svg>
                        </button>
                        <button className={toolbarBtn}><Columns3 className="w-3 h-3" />Columns</button>
                        <button className={toolbarBtn}><Layers className="w-3 h-3" />Bulk Actions</button>
                    </div>
                    <div className="flex sm:hidden items-center gap-1.5">
                        <button className={toolbarIconBtn}><SlidersHorizontal className="w-3.5 h-3.5" /></button>
                        <button className={toolbarIconBtn}><Columns3 className="w-3.5 h-3.5" /></button>
                        <button className={toolbarIconBtn}><Layers className="w-3.5 h-3.5" /></button>
                    </div>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 dark:text-slate-500" />
                    <input
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or URL..."
                        className="w-full h-7 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-7 pr-3 text-xs text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="w-8 px-4 py-2.5 text-left">
                            <input type="checkbox" checked={allSelected} onChange={toggleAll}
                                   className="w-3.5 h-3.5 accent-indigo-600 cursor-pointer" />
                        </th>
                        {["Monitor Name","URL","Interval","Status","Last Checked","Response Time","Actions"].map((col) => (
                            <th key={col} className="px-3 py-2.5 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide whitespace-nowrap">
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((monitor) => (
                        <tr
                            key={monitor.id}
                            onMouseEnter={() => setHovered(monitor.id)}
                            onMouseLeave={() => setHovered(null)}
                            className={cn(
                                "border-b border-slate-100 dark:border-slate-800/60 transition-colors",
                                hovered === monitor.id ? "bg-slate-50 dark:bg-slate-800/40" : "",
                                selected.includes(monitor.id) ? "bg-indigo-50/50 dark:bg-indigo-500/5" : ""
                            )}
                        >
                            <td className="px-4 py-3">
                                <input type="checkbox" checked={selected.includes(monitor.id)}
                                       onChange={() => toggleOne(monitor.id)}
                                       className="w-3.5 h-3.5 accent-indigo-600 cursor-pointer" />
                            </td>
                            <td className="px-3 py-3">
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{monitor.name}</span>
                            </td>
                            <td className="px-3 py-3">
                                <span className="text-slate-400 dark:text-slate-500">{monitor.url}</span>
                            </td>
                            <td className="px-3 py-3">
                                <span className="text-slate-500 dark:text-slate-400">{monitor.interval}</span>
                            </td>
                            <td className="px-3 py-3"><StatusBadge status={monitor.status} /></td>
                            <td className="px-3 py-3">
                                <span className="text-slate-400 dark:text-slate-500">{monitor.lastChecked}</span>
                            </td>
                            <td className="px-3 py-3"><ResponseTime value={monitor.responseTime} /></td>
                            <td className="px-3 py-3">
                                <div className={cn("flex items-center gap-1 transition-opacity", hovered === monitor.id ? "opacity-100" : "opacity-0")}>
                                    {[
                                        { icon: ExternalLink, title:"Open",   danger:false },
                                        { icon: Edit2,        title:"Edit",   danger:false },
                                        { icon: Trash2,       title:"Delete", danger:true  },
                                        { icon: MoreHorizontal,title:"More",  danger:false },
                                    ].map(({ icon: Icon, title, danger }) => (
                                        <button key={title} title={title}
                                                className={cn(
                                                    "w-6 h-6 flex items-center justify-center rounded-md transition-all",
                                                    "bg-slate-100 dark:bg-slate-700",
                                                    danger
                                                        ? "hover:bg-rose-50 dark:hover:bg-rose-900/60 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400"
                                                        : "hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                                )}>
                                            <Icon className="w-3 h-3" />
                                        </button>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="md:hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll}
                           className="w-3.5 h-3.5 accent-indigo-600 cursor-pointer" />
                    <span className="text-xs text-slate-400 dark:text-slate-500">
            {selected.length > 0 ? `${selected.length} selected` : `${filtered.length} monitors`}
          </span>
                </div>
                <div className="p-3 space-y-2">
                    {filtered.map((monitor) => (
                        <MonitorCard
                            key={monitor.id} monitor={monitor}
                            selected={selected.includes(monitor.id)}
                            onSelect={() => toggleOne(monitor.id)}
                        />
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 gap-4">
                <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
                    Showing 1–{filtered.length} of 24 monitors
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 sm:hidden">
                    {filtered.length} of 24
                </p>
                <div className="flex items-center gap-1 ml-auto sm:ml-0">
                    <button onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page===1}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                        <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    {[1,2,3].map((p) => (
                        <button key={p} onClick={() => setPage(p)}
                                className={cn(
                                    "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-all",
                                    page===p
                                        ? "bg-indigo-600 text-white border border-indigo-500 shadow-sm shadow-indigo-500/30"
                                        : "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
                                )}>
                            {p}
                        </button>
                    ))}
                    <button onClick={() => setPage((p) => Math.min(totalPages, p+1))} disabled={page===totalPages}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}