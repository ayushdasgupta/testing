"use client";

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/ui/free-counter";

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-800/30",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        hoverBg: "hover:bg-purple-100 dark:hover:bg-purple-800/30",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-600 dark:text-pink-400",
        bgColor: "bg-pink-50 dark:bg-pink-900/20",
        hoverBg: "hover:bg-pink-100 dark:hover:bg-pink-800/30",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        hoverBg: "hover:bg-orange-100 dark:hover:bg-orange-800/30",
    },
    // {
    //     label: "Music Generation",
    //     icon: Music,
    //     href: "/music",
    //     color: "text-emerald-600 dark:text-emerald-400",
    //     bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    //     hoverBg: "hover:bg-emerald-100 dark:hover:bg-emerald-800/30",
    // },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        hoverBg: "hover:bg-green-100 dark:hover:bg-green-800/30",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-slate-600 dark:text-slate-300",
        bgColor: "bg-slate-50 dark:bg-slate-800/30",
        hoverBg: "hover:bg-slate-100 dark:hover:bg-slate-700/40",
    },
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
}: SidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full  bg-[#F5F3E3] dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 relative">
            {/* Enhanced gradient overlay */}


            <div className="px-3 py-2 flex-1 relative z-10">
                {/* Logo Section */}
                <Link href='/dashboard' className="flex items-center pl-3 mb-8 group">
                    <div className="relative w-8 h-8 mr-4 transition-transform group-hover:scale-110">
                        <Image
                            fill
                            alt="Logo"
                            src='/logo.png'
                            className="object-contain"
                        />
                    </div>
                    <h1 className={cn(
                        "text-2xl font-bold text-gray-800 dark:text-gray-100 transition-all group-hover:text-blue-600 dark:group-hover:text-blue-400",
                        montserrat.className
                    )}>
                        NexZenith
                    </h1>
                </Link>

                {/* Navigation Links */}
                <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-4">
                        Navigation
                    </div>
                    {routes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link
                                href={route.href}
                                key={route.href}
                                className={cn(
                                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-xl transition-all duration-200 ease-in-out transform",
                                    isActive
                                        ? `${route.bgColor} ${route.color} shadow-lg dark:shadow-slate-900/30 border-l-4 border-current`
                                        : `${route.hoverBg} text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-slate-100 hover:translate-x-1`,
                                    "hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-slate-900/20"
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn(
                                        "h-5 w-5 mr-3 transition-all duration-200",
                                        isActive ? "animate-pulse" : "group-hover:scale-110",
                                        route.color
                                    )} />
                                    <span className={cn(
                                        "transition-all duration-200",
                                        isActive ? "font-semibold" : "group-hover:font-medium"
                                    )}>
                                        {route.label}
                                    </span>
                                </div>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                )}
                            </Link>
                        );
                    })}

                </div>

            </div>

            {/* Free Counter with enhanced styling */}
            {!isPro && (
                <div className="px-3 relative z-10">
                    <div className="border-t border-gray-200 dark:border-slate-600 pt-4 bg-gray-50/50 dark:bg-slate-800/50 rounded-t-lg mx-2 px-2">
                        <FreeCounter
                            isPro={isPro}
                            apiLimitCount={apiLimitCount}
                        />
                    </div>
                </div>
            )}

        </div>
    )
}

export default Sidebar