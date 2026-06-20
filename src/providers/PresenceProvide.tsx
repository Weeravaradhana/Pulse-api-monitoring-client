"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

type PresenceContextValue = {
    onlineIds: Set<string>;
    isConnected: boolean;
};

const PresenceContext = createContext<PresenceContextValue>({
    onlineIds: new Set(),
    isConnected: false,
});

export function usePresence() {
    return useContext(PresenceContext);
}

type Props = {
    workspaceId: string;
    currentUserId: string;
    children: ReactNode;
};

export function PresenceProvider({ workspaceId, currentUserId, children }: Props) {
    const [onlineIds, setOnlineIds] = useState<Set<string>>(new Set());
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!workspaceId || !currentUserId) return;

        const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/presence`, {
            query: { userId: currentUserId, tenantId: workspaceId },
            transports: ["websocket"],
        });
        socketRef.current = socket;

        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));
        socket.on("init_online_users", (ids: string[]) => {
            setOnlineIds(new Set(ids));
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("init_online_users");
            socket.disconnect();
            socketRef.current = null;
        };

    }, [workspaceId, currentUserId]);

    return (
        <PresenceContext.Provider value={{ onlineIds, isConnected }}>
            {children}
        </PresenceContext.Provider>
    );
}