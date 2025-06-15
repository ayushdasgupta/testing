"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, 
  Code, 
  ImageIcon, 
  MessageSquare, 
  Music, 
  VideoIcon,
  Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    hoverBg: "hover:bg-purple-100 dark:hover:bg-purple-800/30",
    href: "/conversation",
    description: "Chat with advanced AI assistant"
  },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   color: "text-emerald-600 dark:text-emerald-400",
  //   bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
  //   hoverBg: "hover:bg-emerald-100 dark:hover:bg-emerald-800/30",
  //   href: "/music",
  //   description: "Create music with AI"
  // },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    hoverBg: "hover:bg-pink-100 dark:hover:bg-pink-800/30",
    href: "/image",
    description: "Generate stunning images from text"
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    hoverBg: "hover:bg-orange-100 dark:hover:bg-orange-800/30",
    href: "/video",
    description: "Create videos with AI technology"
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    hoverBg: "hover:bg-green-100 dark:hover:bg-green-800/30",
    href: "/code",
    description: "Generate code snippets and solutions"
  }
];

const DashboardPage = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-[#F5F3E3] dark:bg-transparent ">
      {/* Enhanced background pattern */}
      
      
      <div className="relative z-10 py-8 px-4">
        {/* Enhanced header section */}
        <div className="mb-12 space-y-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Welcome to NexZenith
            </h2>
            <Sparkles className="w-8 h-8 text-pink-500 dark:text-pink-400 animate-pulse" />
          </div>
          
          <p className="text-gray-600 dark:text-slate-300 font-medium text-lg md:text-xl max-w-2xl mx-auto">
            Unleash the power of AI with our comprehensive suite of tools
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Enhanced tools grid */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid gap-4 md:gap-6">
            {tools.map((tool, index) => (
              <Card
                onClick={() => router.push(tool.href)}
                key={tool.href}
                className={cn(
                  "group relative p-6 border-0 bg-[#FCFBF7] dark:bg-slate-800/80 backdrop-blur-sm",
                  "hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10",
                  "transition-all duration-300 ease-out cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1",
                  "border border-gray-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50",
                  tool.hoverBg
                )}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-6">
                    {/* Enhanced icon container */}
                    <div className={cn(
                      "relative p-4 w-fit rounded-xl transition-all duration-300 group-hover:scale-110",
                      tool.bgColor,
                      "shadow-lg group-hover:shadow-xl"
                    )}>
                      <tool.icon className={cn("w-8 h-8 transition-all duration-300", tool.color)} />
                      
                      {/* Icon glow effect */}
                      <div className={cn(
                        "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm",
                        tool.bgColor
                      )} />
                    </div>
                    
                    {/* Enhanced text content */}
                    <div className="space-y-1">
                      <div className="font-bold text-lg text-gray-800 dark:text-slate-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                        {tool.label}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-slate-400 group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors duration-200">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Enhanced arrow with animation */}
                  <div className="relative">
                    <ArrowRight className="w-6 h-6 text-gray-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1" />
                    
                    {/* Arrow glow effect */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced footer section */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-slate-400 text-sm">
            Choose a tool above to get started with AI-powered creativity
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;