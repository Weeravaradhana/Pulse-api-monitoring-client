"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

type AuthContextValue = {
    currentUserId: string | null;
    currentUserTenantId: string | null;
    currentUserRole: string | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue>({
    currentUserId: null,
    currentUserTenantId: null,
    currentUserRole: null,
    isLoading: true,
});

export function useAuth() {
    return useContext(AuthContext);
}

type MeResponse = {
    userId: string;
    tenantId: string;
    role: string;
};

function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [currentUserTenantId, setCurrentUserTenantId] = useState<string | null>(null);
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        axios
            .get<MeResponse>("http://localhost:3000/auth/me", {withCredentials: true})
            .then((res) => {
                if (!isMounted) return;
                setCurrentUserId(res.data.userId);
                setCurrentUserTenantId(res.data.tenantId);
                setCurrentUserRole(res.data.role);
                setTimeout(() => router.push(`/dashboard`), 2200);
            })
            .catch((err) => {
                console.error("Failed to load current user:", err);
                if (isMounted) setCurrentUserId(null);
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [router]);

    return (
        <AuthContext.Provider
            value={{ currentUserId, currentUserTenantId, currentUserRole, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider