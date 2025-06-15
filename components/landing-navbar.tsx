"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="relative p-6 bg-gradient-to-r from-black/20 via-transparent to-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 pointer-events-none" />
      
      <Link href="/" className="relative flex items-center group transition-all duration-300 hover:scale-105">
        {/* Logo container with glow */}
        <div className="relative h-10 w-10 mr-4 p-1">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          <div className="relative h-8 w-8 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20">
            <Image 
              fill
              alt="Logo"
              src="/logo.png"
              className="object-contain p-1"
            />
          </div>
        </div>
        
        {/* Brand name with gradient text */}
        <h1 className={cn(
          "text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-white group-hover:to-cyan-300 transition-all duration-300",
          font.className
        )}>
          NexZenith
        </h1>
        
        {/* Subtle underline effect */}
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
      </Link>
      
      <div className="relative flex items-center gap-x-4">
        {/* Optional: Add a subtle navigation indicator */}
        <div className="hidden sm:flex items-center gap-x-1 mr-4">
          <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" />
          <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="group">
          <Button 
            variant="premium" 
            className={cn(
              "relative rounded-full px-8 py-3 font-semibold transition-all duration-300",
              "bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700",
              "hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600",
              "border border-purple-500/50 hover:border-purple-400/70",
              "shadow-lg hover:shadow-purple-500/25 hover:shadow-xl",
              "transform hover:scale-105 hover:-translate-y-0.5",
              "text-white hover:text-purple-100",
              "overflow-hidden"
            )}
          >
            {/* Button background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button text */}
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_0.6s_ease-out] pointer-events-none" />
          </Button>
        </Link>
      </div>
    </nav>
  )
}