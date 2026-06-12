"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

function cn(...c: (string | undefined | false)[]) {
    return c.filter(Boolean).join(" ");
}

function BreadcrumbRow({onSend}: {onSend: (val: string)=> void}) {
    const [range, setRange] = useState("24H");

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="hover:text-slate-300 cursor-pointer transition-colors">Monitors</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-300 font-semibold">Production API</span>
                <span className="flex items-center gap-1 ml-1 text-[11px] font-bold px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Operational
        </span>
            </div>
            <div className="flex items-center gap-0.5 bg-slate-800 border border-slate-700 rounded-lg p-0.5">
                {["24h", "7d", "30d"].map((r) => (

                    <button
                        key={r}
                        onClick={() => onSend((r))}
                        className={cn(
                            "h-6 px-2.5 rounded-md text-[11px] font-semibold transition-all",
                            range === r
                                ? "bg-slate-700 text-slate-100 shadow-sm"
                                : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        {r}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BreadcrumbRow