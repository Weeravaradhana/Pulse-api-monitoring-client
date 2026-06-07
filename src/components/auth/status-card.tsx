"use client";

const METRICS = [
    { value: "99.99%", label: "Uptime" },
    { value: "142ms",  label: "Latency" },
    { value: "38",     label: "Monitors" },
];

export function StatusCard() {
    return (
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
          Service Status
        </span>
                <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-2.5 py-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
                    <span className="text-xs font-semibold text-emerald-400">Operational</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
                {METRICS.map(({ value, label }) => (
                    <div key={label} className="text-center">
                        <p className="text-lg font-bold text-white">{value}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            <svg viewBox="0 0 280 44" className="w-full h-11" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,30 C20,28 40,20 60,22 C80,24 100,32 120,28 C140,24 160,18 180,20 C200,22 220,30 240,24 C260,18 270,14 280,12"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M0,30 C20,28 40,20 60,22 C80,24 100,32 120,28 C140,24 160,18 180,20 C200,22 220,30 240,24 C260,18 270,14 280,12 L280,44 L0,44Z"
                    fill="url(#sparkGrad)"
                />
            </svg>
        </div>
    );
}