"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import { useAuth } from "./auth-context";

export type UserTenant = {
    id: string;
    name: string;
    role: string;
};

type WorkspaceContextValue = {
    currentTenantId: string | null;
    setCurrentTenantId: (id: string | null) => void;
    userTenants: UserTenant[];
};

const DEFAULT_TENANTS: UserTenant[] = [
    {
        id: "tenant-uuid-1234",
        name: "Travel-Ease Global",
        role: "Owner/Admin",
    },
    {
        id: "tenant-uuid-5678",
        name: "Activity-Hub Corp",
        role: "Viewer",
    },
    {
        id: "tenant-uuid-9999",
        name: "DriveOn School",
        role: "Member",
    },
];

const WorkspaceContext = createContext<WorkspaceContextValue>({
    currentTenantId: null,
    setCurrentTenantId: () => {},
    userTenants: [],
});

export function useWorkspace() {
    return useContext(WorkspaceContext);
}

export function WorkspaceProvider({
                                      children,
                                  }: {
    children: ReactNode;
}) {
    const { currentUserTenantId } = useAuth();
    const [selectedTenantId, setSelectedTenantId] = useState<
        string | null
    >(null);
    const currentTenantId =
        selectedTenantId ?? currentUserTenantId ?? null;

    return (
        <WorkspaceContext.Provider
            value={{
                currentTenantId,
                setCurrentTenantId: setSelectedTenantId,
                userTenants: DEFAULT_TENANTS,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
}