"use client";

import {
    Activity, BellIcon,
    LayoutDashboard,
    Radio,
    Settings,
    X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const NAV_ITEMS = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/monitor/analytics", label: "Monitors", icon: Radio },
    { href: "/dashboard/notification", label: "Notification", icon: BellIcon },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];


function NavContent({
                        pathname,
                        onClose,
                    }: {
    pathname: string;
    onClose?: () => void;
}) {
    return (
        <>
            <div className="flex items-center justify-between gap-2 pt-5 pb-5 border-b border-slate-200 dark:border-slate-800 px-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Activity className="w-5 h-5 text-white" />
                    </div>

                    <span className="text-sm font-bold text-slate-800 dark:text-white">
                        UptimeIQ
                    </span>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            <nav className="flex flex-col gap-1 px-2 pt-4 flex-1">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                    const active =
                        pathname === href || pathname.startsWith(href + "/");

                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 rounded-xl py-2.5 px-3 transition-all",
                                active
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            )}
                        >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="text-xs font-semibold">
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                        AK
                    </div>

                    <div>
                        <p className="text-xs font-semibold">Alex Kim</p>
                        <p className="text-[10px] text-slate-400">Admin</p>
                    </div>
                </div>
            </div>
        </>
    );
}


export function Sidebar({
                            mobileOpen = false,
                            onClose,
                        }: {
    mobileOpen?: boolean;
    onClose?: () => void;
}) {
    const pathname = usePathname();

    return (
        <>
            <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r flex-col z-40">
                <NavContent pathname={pathname} onClose={onClose} />
            </aside>

            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 lg:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={cn(
                    "fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r flex flex-col z-50 transition-transform lg:hidden",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <NavContent pathname={pathname} onClose={onClose} />
                <h1>hello</h1>
            </aside>
        </>
    );
}
export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t flex justify-around">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active =
                    pathname === href || pathname.startsWith(href + "/");

                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex flex-col items-center gap-1 flex-1 py-2",
                            active
                                ? "text-indigo-500"
                                : "text-slate-400 dark:text-slate-500"
                        )}
                    >
                        <Icon
                            className={cn(
                                "w-5 h-5",
                                active &&
                                "drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]"
                            )}
                        />
                        <span className="text-[10px]">{label}</span>

                    </Link>
                );
            })}
        </div>
    );
}