import { CheckCircle2 } from "lucide-react";

const TRUST_ITEMS = [
    "99.99% Uptime Tracking",
    "Real-time Alerts",
    "Enterprise Security",
];

export function TrustList() {
    return (
        <ul className="space-y-2.5">
            {TRUST_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-sm text-white/55">{item}</span>
                </li>
            ))}
        </ul>
    );
}