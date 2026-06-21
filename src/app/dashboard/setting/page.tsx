"use client";

import { Section } from "@/components/common/section";
import { PersonalDetailsCard } from "@/components/setting/personal-details-card";
import { WorkspaceSetupCard } from "@/components/setting/workspace-setup-card";
import { TeamManagement } from "@/components/setting/group-management-top-card";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopHeader } from "@/components/dashboard/top-header";
import { TenantSwitcher } from "@/components/setting/tenant-switcher";
import { useWorkspace } from "@/contex/workspace-context";

export default function SettingsPage() {
    const { currentTenantId, setCurrentTenantId, userTenants } = useWorkspace();

    const handleDataFromWorkspace = (newTenantId: string) => {
        setCurrentTenantId(newTenantId);
    };

    if (!currentTenantId) {
        return <div className="p-6 text-xs text-slate-500">Loading workspace...</div>;
    }

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
            <div className="hidden md:block w-64 shrink-0 h-full border-r border-slate-200">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
                <TopHeader />

                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
                    <div className="space-y-6 sm:space-y-8">

                        <Section title="Profile & Workspace">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <PersonalDetailsCard />
                                <WorkspaceSetupCard onTenantCreate={handleDataFromWorkspace} />
                            </div>
                        </Section>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                            <Section title="Team Management">
                                <div className="w-full h-full">
                                    <TeamManagement workspaceId={currentTenantId} />
                                </div>
                            </Section>

                            <Section title="Switch Team">
                                <div className="w-full h-full">
                                    <TenantSwitcher
                                        currentTenantId={currentTenantId}
                                        userTenants={userTenants}
                                    />
                                </div>
                            </Section>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}