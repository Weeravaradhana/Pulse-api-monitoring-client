"use client";

import { Sidebar }             from "@/components/dashboard/sidebar";
import { TopHeader }           from "@/components/dashboard/top-header";
import BreadcrumbRow       from "@/components/dashboard/breadcrumb-row";
import {
    ResponseTimeTrendChart,
    UptimeOverTimeChart,
} from "@/components/monitor/one/charts-row1";
import {
    SuccessVsFailureChart,
    DowntimeTimelineChart,
} from "@/components/monitor/one/charts-row2";
import { IncidentInsights }    from "@/components/monitor/one/incident-insights";
import { useEffect, useState } from "react";
import { useParams }           from "next/navigation";
import axios                   from "axios";


interface ChartDataPoint {
    day?: string;
    ms?: number;
    percentage?: number;
    name: string;
    value: number;
    color:string;
    status?: string;
    checkedAt?: string;
    errorMessage?: string | null;
}

interface MonitorMetrics {
    responseTimeData: {
        charts: {
            responseTimeTrend: ChartDataPoint[];
            uptimeOverTime: ChartDataPoint[];
            successVsFailure: ChartDataPoint[];
            downtimeTimeline: ChartDataPoint[];
        };
    }
}

export default function MonitorsPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [value, setValue] = useState("24h");
    const params = useParams();
    const monitorId = params.id;

    const [monitorMetrics, setMonitorMetrics] = useState<MonitorMetrics>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!monitorId) return;

        const fetchTargetMetrics = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/monitor/${monitorId}/metrics`, {
                    withCredentials: true,
                    params: {
                        range: value
                    }
                });
                console.log("RESPONSE", value)
                setMonitorMetrics(response.data);
            } catch (error) {
                console.error("දත්ත ලබා ගැනීමට අපොහොසත් විය:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTargetMetrics();
    }, [monitorId , value]);

    const handleReceive = (data: string) => {
        const finalValue = data || "24h";
        console.log("DATA", finalValue);
        setValue(finalValue);
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
                <Sidebar
                    mobileOpen={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                />

                <div className="lg:pl-64 flex flex-col w-full pr-4">
                    <TopHeader />

                    <main className="flex-1 p-5 space-y-5 pb-10">
                        <div>
                            <h1 className="text-base font-bold text-white">Monitors</h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Create, configure and analyse endpoint monitoring
                            </p>
                        </div>

                        <BreadcrumbRow
                            onSend={handleReceive}
                        />

                        {loading ? (
                            <div className="text-sm text-slate-500">Loading metrics...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <ResponseTimeTrendChart
                                        data={monitorMetrics?.responseTimeData?.charts.responseTimeTrend || []}
                                    />
                                    <UptimeOverTimeChart
                                        data={monitorMetrics?.responseTimeData?.charts?.uptimeOverTime || []}
                                    />
                                </div>

                               
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <SuccessVsFailureChart
                                        data={monitorMetrics?.responseTimeData?.charts?.successVsFailure || []}
                                    />
                                    <DowntimeTimelineChart
                                        data={monitorMetrics?.responseTimeData.charts?.downtimeTimeline || []}
                                    />
                                </div>
                            </>
                        )}

                        <IncidentInsights />
                    </main>
                </div>
            </div>
        </>
    );
}