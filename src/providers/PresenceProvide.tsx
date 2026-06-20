import {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";

export type PresenceContextValue = {
    onlineIds: Set<string>;
    isConnected: boolean;
};

export const PresenceContext = createContext<PresenceContextValue>({
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

function PresenceProvider({ workspaceId, currentUserId, children }: Props) {
    const [onlineIds, setOnlineIds] = useState<Set<string>>(new Set());
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!workspaceId || !currentUserId) return;

        const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/presence`, {
            query: { userId: currentUserId, tenantId: workspaceId },
            transports: ["websocket"],
            forceNew: true,
        });

        socketRef.current = socket;

        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => {
            setIsConnected(false);
            setOnlineIds(new Set());
        });

        socket.on("init_online_users", (ids: string[]) => {
            setOnlineIds(new Set(ids));
        });

        socket.on("user_status_changed", (data: { userId: string; isOnline: boolean }) => {
            setOnlineIds((prev) => {
                const next = new Set(prev);
                if (data.isOnline) next.add(data.userId);
                else next.delete(data.userId);
                return next;
            });
        });

        return () => {
            socket.disconnect();
            socket.offAny();
            socketRef.current = null;
        };

    }, [workspaceId, currentUserId]);

    return (
        <PresenceContext.Provider value={{ onlineIds, isConnected }}>
            {children}
        </PresenceContext.Provider>
    );
}

export default PresenceProvider