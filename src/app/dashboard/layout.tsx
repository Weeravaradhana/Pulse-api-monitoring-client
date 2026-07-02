"use client";
import { ReactNode, useState } from "react";
import AuthProvider, { useAuth } from "@/contex/auth-context";
import { WorkspaceProvider, useWorkspace } from "@/contex/workspace-context";
import PresenceProvider from "@/providers/PresenceProvide";
import { Sidebar, MobileBottomNav } from "@/components/dashboard/sidebar";
import { TopHeader } from "@/components/dashboard/top-header";
import {NotificationProvider} from "@/contex/notification-context";

function PresenceBridge({ children }: { children: ReactNode }) {
    const { currentUserId, isLoading } = useAuth();
    const { currentTenantId } = useWorkspace();

    if (isLoading || !currentUserId || !currentTenantId) {
        return <div className="p-6 text-xs text-slate-500">Loading user session...</div>;
    }

    return (
        <PresenceProvider workspaceId={currentTenantId} currentUserId={currentUserId}>
            {children}
        </PresenceProvider>
    );
}

function DashboardShell({ children }: { children: ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
            <div className="lg:ml-64 flex flex-col min-h-screen">
                <TopHeader onMenuClick={() => setMobileOpen(true)} />
                <main className="flex-1 pb-16 lg:pb-0">
                    {children}
                </main>
            </div>

            <MobileBottomNav />
        </div>
    );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <WorkspaceProvider>
                <PresenceBridge>
                    <NotificationProvider>
                    <DashboardShell>{children}</DashboardShell>
                    </NotificationProvider>
                </PresenceBridge>
            </WorkspaceProvider>
        </AuthProvider>
    );
}