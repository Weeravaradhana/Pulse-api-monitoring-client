"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode, useEffect,
} from "react";
import { useAuth } from "./auth-context";
import axios from "axios";

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
    const [userTenants, setUserTenants] = useState<UserTenant[]>([]);
    const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:3000/tenant/list", {withCredentials: true});
                setUserTenants(response.data)
            }catch (error){
                console.error("Failed to fetch tenants:", error);
            }finally {
                setLoading(false)
            }
        }

        fetchTenants()
    }, []);

    const currentTenantId =
        selectedTenantId ?? currentUserTenantId ?? null;

    return (
        <WorkspaceContext.Provider
            value={{
                currentTenantId,
                setCurrentTenantId: setSelectedTenantId,
                userTenants,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
}