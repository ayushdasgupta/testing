"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative text-white font-bold py-36 text-center space-y-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-pink-400/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-1/8 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 space-y-8">
        {/* Main heading with enhanced styling */}
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-6 font-extrabold">
          <h1 className="leading-tight">
            <span className="inline-block animate-fade-in-up">The</span>{' '}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Best</span>{' '}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>AI</span>{' '}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Platform</span>{' '}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>for</span>
          </h1>
          
          {/* Enhanced typewriter section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 blur-2xl opacity-20 animate-pulse" />
            <div className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient-x">
              <TypewriterComponent
                options={{
                  strings: [
                    "Chatbot",
                    "Image Generation",
                    "Video Generation",
                    "Code Generation",
                    "NexZen Assist PRO"
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            {/* Decorative elements around typewriter */}
            <div className="absolute -left-8 top-1/2 w-4 h-4 border-l-2 border-t-2 border-purple-400/50 transform -translate-y-1/2 animate-pulse" />
            <div className="absolute -right-8 top-1/2 w-4 h-4 border-r-2 border-b-2 border-pink-400/50 transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Enhanced subtitle */}
        <div className="relative">
          <div className="text-sm md:text-xl font-light text-zinc-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            Create content using AI{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                10x faster
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" />
            </span>
            .
          </div>
        </div>

        {/* Enhanced CTA button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"} className="group inline-block">
            <Button 
              variant="premium" 
              className="relative md:text-lg p-6 md:p-8 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-500 hover:via-pink-500 hover:to-purple-600 border-2 border-purple-500/50 hover:border-purple-400/70 shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Generating For Free
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
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_0.8s_ease-out] pointer-events-none" />
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
            </Button>
          </Link>
        </div>

        {/* Enhanced disclaimer */}
        <div className="text-zinc-400 text-xs md:text-sm font-normal animate-fade-in-up flex items-center justify-center gap-2" style={{ animationDelay: '1.2s' }}>
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          No credit card required.
        </div>
      </div>

      {/* Additional CSS for custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(300%) skewX(-12deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}