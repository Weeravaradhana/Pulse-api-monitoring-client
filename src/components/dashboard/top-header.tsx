"use client";

import {Search, Bell, ChevronDown, Menu,LogOut} from "lucide-react";
import { ThemeToggle } from "@/hooks/theme-toggle";
import {useEffect, useRef, useState} from "react";

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
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => setIsOpen(!isOpen);


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

                if (!result?.data?.email){
                    console.error('Invalid API response structure:', result);
                    return;
                }

                const email: string = result.data.email;
                const initial = email.slice(0, 2).toUpperCase();

                setUserData(initial);
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
    },[userData]);

        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [isOpen]);



    return (
        <header className="h-19.25 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 px-4 sticky top-0 z-30 transition-colors duration-200"
        ref={dropdownRef}>
            <button
                onClick={onMenuClick}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg
          bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
          text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200
          transition-all shrink-0"
                aria-label="Open menu"
            >
                <Menu className="w-4 h-4" />
            </button>

            <div className="relative flex-1 max-w-sm ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <input
                    type="text"
                    placeholder="Search monitors, endpoints..."
                    className="w-full h-8
            bg-slate-100 dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            rounded-lg pl-9 pr-3 text-xs
            text-slate-700 dark:text-slate-300
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            outline-none focus:border-indigo-400 dark:focus:border-indigo-500
            focus:ring-1 focus:ring-indigo-400/20 dark:focus:ring-indigo-500/20
            transition-all"
                />
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <ThemeToggle />

                <button className="relative w-8 h-8 flex items-center justify-center rounded-lg
          bg-slate-100 dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          text-slate-500 dark:text-slate-400
          hover:text-slate-700 dark:hover:text-slate-200
          hover:border-slate-300 dark:hover:border-slate-600
          transition-all">
                    <Bell className="w-3.5 h-3.5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
            2
          </span>
                </button>
                <button onClick={toggleDropdown} className="flex items-center gap-2 h-8 px-2 rounded-lg
          bg-slate-100 dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          hover:border-slate-300 dark:hover:border-slate-600
          transition-all">

                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-indigo-400 to-violet-500 flex justify-center items-center text-[13px] font-bold text-white">
                        {userData}
                    </div>
                    <ChevronDown className={`w-3 h-3 text-slate-400 dark:text-slate-500 hidden sm:block ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    } `}/>
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 top-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">

                        <button
                            onClick={() => alert('Logging out...')}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" /> Log out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}