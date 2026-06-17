"use client";

import { useState } from "react";
import { Section } from "@/components/common/section";
import { PersonalDetailsCard } from "@/components/setting/personal-details-card";
import { WorkspaceSetupCard } from "@/components/setting/workspace-setup-card";
import { TeamManagement } from "@/components/setting/group-management-top-card";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopHeader } from "@/components/dashboard/top-header";

export default function SettingsPage() {
    const [id, setId] = useState("");

    const handleDataFromWorkspace = (id: string) => {
        setId(id);
    };

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
            <div className="hidden md:block shrink-0">
                <Sidebar />
            </div>

            <div className="lg:pl-64 flex flex-col w-full pr-4 overflow-hidden">

                <TopHeader />

                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">

                    <div className="space-y-6 sm:space-y-8">

                        <Section title="Profile & Workspace">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                <PersonalDetailsCard />
                                <WorkspaceSetupCard onTenantCreate={handleDataFromWorkspace} />
                            </div>
                        </Section>

                        <Section title="Team Management">
                            <div className="w-full">
                                <TeamManagement id={id} />
                            </div>
                        </Section>

                    </div>

                </div>
            </div>
        </div>
    );
}