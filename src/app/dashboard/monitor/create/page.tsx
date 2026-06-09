
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CreateMonitorForm } from "@/components/monitor/create-monitor-form";

export default function CreateMonitorPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 sticky top-0 z-20 transition-colors duration-200">
                <div className="max-w-5xl mx-auto flex items-center gap-3">
                    <Link
                        href="/dashboard"
                        className="w-8 h-8 flex items-center justify-center rounded-lg
              bg-slate-100 dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              text-slate-500 dark:text-slate-400
              hover:text-slate-700 dark:hover:text-slate-200
              hover:border-slate-300 dark:hover:border-slate-600
              transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-none">
                            Create Monitor
                        </h1>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            Configure a new endpoint to monitor
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-5 pt-5">
                <CreateMonitorForm />
            </div>
        </div>
    );
}