'use client'

import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {usePresence} from "@/providers/PresenceProvide";
import {useAuth} from "@/contex/auth-context";


interface Notification {
    _id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({children} : {children: React.ReactNode}) => {
    const [notifications, setNotification] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const {socket} = usePresence();
    const {currentUserId} = useAuth();


       useEffect(() => {
         const getNotificationData = async () => {
             try {
                const notifications =  await axios.get('http://localhost:3000/workspaces', {
                     withCredentials: true
                 })
                setNotification(notifications.data.notifications);
                setUnreadCount(notifications.data.unreadCount);
             }catch (e) {
                 console.error(e)
             }
           }

           getNotificationData()
       },[]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        const handleNewNotification = (notification: Notification) => {
            setNotification(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
        };

        socket.on('new_notification', handleNewNotification);

        return () => {
            socket.off('new_notification', handleNewNotification);
        };
    }, [socket, currentUserId]);



    const markAsRead = (id: string) => {
        setNotification(prev =>
            prev.map(n => n._id === id ? {...n, isRead: true} : n)
        );
    }

    return (
        <NotificationContext.Provider value={{notifications, unreadCount, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotifications must be used within NotificationProvider");
    return context;

}





























