"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const MobileSidebar = ({
    apiLimitCount = 0,
    isPro = false
}: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden relative group hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    {/* Enhanced background with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {/* Menu icon with enhanced styling */}
                    <Menu className="h-5 w-5 text-gray-600 dark:text-slate-300 group-hover:text-gray-800 dark:group-hover:text-slate-100 transition-colors duration-200 relative z-10" />
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-md shadow-sm group-hover:shadow-md transition-shadow duration-200" />
                </Button>
            </SheetTrigger>
            
            <SheetContent 
                side='left' 
                className="p-0 w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 shadow-2xl"
            >
                {/* Enhanced backdrop with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 via-transparent to-gray-100/20 dark:from-slate-800/30 dark:via-transparent dark:to-slate-900/40 pointer-events-none" />
                
                {/* Sidebar with enhanced styling */}
                <div className="relative z-10 h-full">
                    <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
                </div>
                
                {/* Enhanced border effect */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-60" />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;