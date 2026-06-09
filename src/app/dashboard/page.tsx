"use client";

import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { Sidebar, MobileBottomNav } from "@/components/dashboard/sidebar";
import { TopHeader } from "@/components/dashboard/top-header";
import dynamic from "next/dynamic";
import { MonitorTable } from "@/components/tooltip/monitor-table";
import { ThemeProvider } from "@/components/dashboard/theme-context";
import {useRouter} from "next/navigation";
import {IncidentsSection} from "@/components/monitor/details/monitor-header";
import axios from "axios";
import { useQuery} from "@tanstack/react-query";


const KpiCards = dynamic(
    () => import("@/components/dashboard/kip-cards").then((mod) => mod.KpiCards),
    {
        ssr: false,
        loading: () => <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-32 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl animate-pulse" />
    }
);

export default function DashboardPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            console.log("MONITOR RESPONSE ", response.data)
            return response.data;
        },
        placeholderData: (keepPreviousData) => keepPreviousData,
    });
    if (isLoading) return <div className="p-6 text-sm">Loading monitors from NestJS...</div>;

    const handleNewMonitor = () => {
        router.push("/dashboard/monitor/create")
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                    <Sidebar
                        mobileOpen={mobileMenuOpen}
                        onClose={() => setMobileMenuOpen(false)}
                    />

                <div className="lg:pl-64 flex flex-col w-full pr-4 ">
                    <TopHeader onMenuClick={() => setMobileMenuOpen(true)} />

                    <main className="flex-1 p-4 sm:p-5 space-y-4 pb-20 lg:pb-5">
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
                            <button onClick={handleNewMonitor} className="flex items-center gap-2 h-9 px-3 sm:px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 shrink-0">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">New Monitor</span>
                                <span className="sm:hidden">New</span>
                            </button>
                        </div>
                    </main>
                    <div className="ml-3">
                        <KpiCards/>
                        <MonitorTable
                            monitors={data?.data ?? []}
                            totalCount={data?.total ?? 0}
                            page={page}
                            onPageChange={(newPage) => setPage(newPage)}
                            onSearchChange={(query) => {
                                setSearch(query);
                                setPage(1);
                            }}
                        />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-400">Monitor table placeholder</p>
                        </div>

                       {/* <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm">
                            <IncidentsSection incidents={mockIncidents} />
                        </div>*/}
                    </div>
                </div>
                <MobileBottomNav/>
            </div>
        </ThemeProvider>
    );
}


