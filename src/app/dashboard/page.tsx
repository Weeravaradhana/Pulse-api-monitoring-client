"use client";

import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { Sidebar, MobileBottomNav } from "@/components/dashboard/sidebar";
import { TopHeader } from "@/components/dashboard/top-header";
import dynamic from "next/dynamic";
import { MonitorTable } from "@/components/tooltip/monitor-table";
import { ThemeProvider } from "@/components/dashboard/theme-context";

const KpiCards = dynamic(
    () => import("@/components/dashboard/kip-cards").then((mod) => mod.KpiCards),
    {
        ssr: false,
        loading: () => <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-32 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl animate-pulse" />
    }
);

export default function DashboardPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                            <button className="flex items-center gap-2 h-9 px-3 sm:px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 shrink-0">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">New Monitor</span>
                                <span className="sm:hidden">New</span>
                            </button>
                        </div>
                    </main>
                    <div className="ml-3">
                        <KpiCards/>
                        <MonitorTable/>
                    </div>

                </div>
                <MobileBottomNav/>
            </div>
        </ThemeProvider>
    );
}


