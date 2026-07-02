"use client";

import { formatDistanceToNow } from "date-fns";
import { Search, Bell, ChevronDown, Menu, LogOut, User, Settings } from "lucide-react";
import { ThemeToggle } from "@/hooks/theme-toggle";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "@/contex/notification-context";

interface TopHeaderProps {
    onMenuClick?: () => void;
}
interface ApiResponse {
    success: boolean;
    data: {
        email: string;
    };
}

export function TopHeader({ onMenuClick }: TopHeaderProps) {
    const [userData, setUserData] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const { notifications, unreadCount, markAsRead } = useNotifications();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        async function fetchUserData() {
            try {
                const response = await fetch('/api/user', {
                    method: 'GET',
                    credentials: 'same-origin',
                    signal
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        console.warn('User is unauthorized. Redirecting or handling login...');
                    } else {
                        console.error(`Server error: ${response.status}`);
                    }
                    return;
                }
                const result = (await response.json()) as ApiResponse;

                if (!result?.data?.email) {
                    console.error('Invalid API response structure:', result);
                    return;
                }

                const email: string = result.data.email;
                const initial = email.slice(0, 2).toUpperCase();

                setUserData(initial);
                setUserEmail(email);
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }
                console.error('Fetch operation failed securely:', err);
            }
        }
        fetchUserData();

        return () => {
            controller.abort();
        }
    }, []);

    const handleNotificationClick = async (id: string) => {
        await markAsRead(id);
        setIsNotificationOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 px-4 sm:px-6 sticky top-0 z-30 transition-colors duration-200">
            <button
                onClick={onMenuClick}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg
                    bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                    text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    transition-all shrink-0"
                aria-label="Open menu"
            >
                <Menu className="w-4 h-4" />
            </button>

            <div className="relative flex-1 max-w-sm hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <input
                    type="text"
                    placeholder="Search monitors, endpoints..."
                    className="w-full h-9
                        bg-slate-100 dark:bg-slate-800
                        border border-slate-200 dark:border-slate-700
                        rounded-lg pl-9 pr-3 text-sm
                        text-slate-700 dark:text-slate-300
                        placeholder:text-slate-400 dark:placeholder:text-slate-500
                        outline-none focus:bg-white dark:focus:bg-slate-900
                        focus:border-indigo-400 dark:focus:border-indigo-500
                        focus:ring-4 focus:ring-indigo-400/10 dark:focus:ring-indigo-500/10
                        transition-all"
                />
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <ThemeToggle />

                <div className="relative" ref={notificationRef}>
                    <button
                        className="relative w-9 h-9 flex items-center justify-center rounded-lg
                            bg-slate-100 dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700
                            text-slate-500 dark:text-slate-400
                            hover:text-slate-700 dark:hover:text-slate-200
                            hover:bg-slate-200 dark:hover:bg-slate-700
                            transition-all"
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        aria-label="Notifications"
                    >
                        <Bell className="w-4 h-4" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-rose-500 rounded-full text-[10px] font-semibold text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl dark:shadow-black/40 z-50 max-h-112.5 flex flex-col overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">Notifications</span>
                                {unreadCount > 0 && (
                                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">
                                        Mark all as read
                                    </span>
                                )}
                            </div>
                            <div className="overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                                        No activity yet.
                                    </div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification._id}
                                            onClick={() => handleNotificationClick(notification._id)}
                                            className={`px-4 py-3 border-b border-slate-50 dark:border-slate-800/60 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition flex flex-col gap-1 ${
                                                !notification.isRead ? 'bg-indigo-50/60 dark:bg-indigo-500/10 border-l-2 border-l-indigo-500' : ''
                                            }`}
                                        >
                                            <p className={`text-sm ${!notification.isRead ? 'font-medium text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
                                                {notification.message}
                                            </p>
                                            <span className="text-[10px] uppercase font-medium tracking-wide text-slate-400 dark:text-slate-500">
                                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-lg
                            bg-slate-100 dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700
                            hover:bg-slate-200 dark:hover:bg-slate-700
                            transition-all"
                    >
                        <div className="w-7 h-7 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex justify-center items-center text-[11px] font-semibold text-white shrink-0">
                            {userData || <User className="w-3.5 h-3.5" />}
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hidden sm:block transition-transform ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                        }`} />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl dark:shadow-black/40 z-50 overflow-hidden">
                            {userEmail && (
                                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Signed in as</p>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{userEmail}</p>
                                </div>
                            )}
                            <div className="py-1">
                                <button
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <Settings className="w-4 h-4" /> Settings
                                </button>
                                <button
                                    onClick={() => alert('Logging out...')}
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}