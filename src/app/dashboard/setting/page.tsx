"use client";

import { Section } from "@/components/common/section";
import { PersonalDetailsCard } from "@/components/setting/personal-details-card";
import { WorkspaceSetupCard } from "@/components/setting/workspace-setup-card";
import { GroupManagement } from "@/components/setting/group-management-top-card";
import { GroupTable } from "@/components/setting/group-management-table-card";


export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b bg-white">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-lg font-semibold">Settings</h1>
                    <p className="text-sm text-slate-500">
                        Manage your SaaS workspace
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">

                <Section title="Profile & Workspace">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <PersonalDetailsCard />
                        <WorkspaceSetupCard />
                    </div>
                </Section>

                <Section title="Team Management">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <GroupManagement />
                        <GroupTable />
                    </div>
                </Section>

            </div>

        </div>
    );
}