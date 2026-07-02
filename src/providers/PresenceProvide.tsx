import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export type PresenceContextValue = {
    onlineIds: Set<string>;
    isConnected: boolean;
    notifications: string[];
    socket: Socket | null;
};

export const PresenceContext = createContext<PresenceContextValue>({
    onlineIds: new Set(),
    isConnected: false,
    notifications: [],
    socket: null
});

export function usePresence() {
    return useContext(PresenceContext);
}


type Props = {
    workspaceId: string;
    currentUserId: string;
    children: ReactNode;
};

function PresenceProvider({ workspaceId, currentUserId, children }: Props) {
    const [onlineIds, setOnlineIds] = useState<Set<string>>(new Set());
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null)
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!workspaceId || !currentUserId) return;
        const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/presence`, {
            query: { userId: currentUserId, tenantId: workspaceId },
            transports: ["websocket"],
            forceNew: true,
        });

        socketRef.current = socket;

        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => {
            setIsConnected(false);
            setOnlineIds(new Set());
        };
        const handleInitUsers = (ids: string[]) => setOnlineIds(new Set(ids));
        const handleStatusChange = (data: { userId: string; isOnline: boolean }) => {
            setOnlineIds((prev) => {
                const next = new Set(prev);
                if (data.isOnline) next.add(data.userId);
                else next.delete(data.userId);
                return next;
            });
        };



        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("init_online_users", handleInitUsers);
        socket.on("user_status_changed", handleStatusChange);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSocket(socket)

        return () => {

            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("init_online_users", handleInitUsers);
            socket.off("user_status_changed", handleStatusChange);

            socket.disconnect();
            socketRef.current = null;
        };
    }, [workspaceId, currentUserId]);

    return (
        <PresenceContext.Provider value={{ onlineIds, isConnected, notifications, socket }}>
            {children}
        </PresenceContext.Provider>
    );
}

export default PresenceProvider;