"use client";

import { ReactNode } from "react";
import AuthProvider, { useAuth } from "@/contex/auth-context";
import { WorkspaceProvider, useWorkspace } from "@/contex/workspace-context";
import { PresenceProvider } from "@/providers/PresenceProvide";

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

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <WorkspaceProvider>
                <PresenceBridge>{children}</PresenceBridge>
            </WorkspaceProvider>
        </AuthProvider>
    );
}
