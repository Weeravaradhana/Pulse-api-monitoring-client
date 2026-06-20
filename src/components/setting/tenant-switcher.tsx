"use client";

import { useState } from "react";
import axios from "axios";

interface Tenant {
    id: string;
    name: string;
    role: string;
}

type Props = {
    currentTenantId: string;
    userTenants: Tenant[];
};

export function TenantSwitcher({ currentTenantId, userTenants }: Props) {
    const [loadingTenantId, setLoadingTenantId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSwitchTenant = async (tenantId: string) => {
        if (tenantId === currentTenantId) return;

        setLoadingTenantId(tenantId);
        setError(null);

        try {
          await axios.post("http://localhost:3000/auth/switch-tenant", { tenantId },{withCredentials: true});
          window.location.reload();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to switch workspace. Try again.");
        } finally {
            setLoadingTenantId(null);
        }
    };

    const activeTenant = userTenants.find((t) => t.id === currentTenantId);
    const otherTenants = userTenants.filter((t) => t.id !== currentTenantId);

    return (
        <div className="w-full h-95 rounded-xl bg-white p-4 sm:p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex flex-col h-full min-h-0">
                <div className="mb-4 shrink-0">
                    <h3 className="text-sm font-semibold text-slate-900">Workspaces & Tenants</h3>
                    <p className="text-2xs text-slate-500 mt-0.5 leading-relaxed">
                        Switch between your registered organizations.
                    </p>
                </div>

                {error && (
                    <div className="mb-3 rounded-lg bg-red-50 p-2 text-2xs font-medium text-red-600 border border-red-100 shrink-0">
                        {error}
                    </div>
                )}

                {activeTenant && (
                    <div className="mb-4 shrink-0">
                        <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Active Workspace</span>
                        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 sm:p-3 border border-slate-150 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white uppercase">
                                    {activeTenant.name.substring(0, 2)}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-semibold text-slate-900 truncate">{activeTenant.name}</span>
                                    <span className="text-3xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md mt-0.5 w-max truncate">
                                        {activeTenant.role}
                                    </span>
                                </div>
                            </div>
                            <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse ml-2" />
                        </div>
                    </div>
                )}

                <div className="flex-1 flex flex-col min-h-0">
                    <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5 shrink-0">Available Workspaces</span>

                    {otherTenants.length === 0 ? (
                        <p className="text-2xs text-slate-400 italic py-2">No other workspaces found.</p>
                    ) : (
                        <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                            {otherTenants.map((tenant) => (
                                <div
                                    key={tenant.id}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50/70 transition-colors border border-transparent hover:border-slate-100 min-w-0 gap-2"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 uppercase">
                                            {tenant.name.substring(0, 2)}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs font-medium text-slate-800 truncate">{tenant.name}</span>
                                            <span className="text-3xs text-slate-400 truncate">{tenant.role}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleSwitchTenant(tenant.id)}
                                        disabled={loadingTenantId !== null}
                                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-2xs font-semibold text-slate-700 shadow-3xs transition-all hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 cursor-pointer shrink-0"
                                    >
                                        {loadingTenantId === tenant.id ? "..." : "Switch"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}