"use client";

import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { MonitorTable } from "@/components/tooltip/monitor-table";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const KpiCards = dynamic(
    () => import("@/components/dashboard/kip-cards").then((mod) => mod.KpiCards),
    {
        ssr: false,
        loading: () => (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-32 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl animate-pulse" />
        ),
    }
);

export default function DashboardPage() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data, isLoading } = useQuery({
        queryKey: ["monitors", page, search],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/monitors`, {
                params: { page, limit: 10, search },
                withCredentials: true,
            });
            return response.data;
        },
        placeholderData: (keepPreviousData) => keepPreviousData,
    });

    if (isLoading) return <div className="p-6 text-sm">Loading monitors...</div>;

    return (
        <div className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                        Dashboard Overview
                    </h1>
                    <div className="flex items-center gap-1.5 mt-1">
                        <CalendarDays className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                        <span className="text-xs text-slate-400 dark:text-slate-500">Last 7 days</span>
                    </div>
                </div>
                <button
                    onClick={() => router.push("/dashboard/monitor/create")}
                    className="flex items-center gap-2 h-9 px-3 sm:px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/20 shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Monitor</span>
                    <span className="sm:hidden">New</span>
                </button>
            </div>
            <KpiCards />
            <MonitorTable
                monitors={data?.data ?? []}
                totalCount={data?.meta?.totalItems ?? 10}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                onSearchChange={(query) => {
                    setSearch(query);
                    setPage(1);
                }}
            />
        </div>
    );
}