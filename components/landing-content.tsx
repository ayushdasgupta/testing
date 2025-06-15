"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ayush Dasgupta",
    avatar: "A",
    title: "Team Leader",
    description: "Full Stack Developer",
  },
  {
    name: "Riya Paul",
    avatar: "R",
    title: "Team Member",
    description: "MERN Stack Developer",
  },
  {
    name: "Achirshman Deb",
    avatar: "A",
    title: "Team Member",
    description: "Front-end Developer & UI/UX Designer",
  },
  {
    name: "Praveen Kumar",
    avatar: "P",
    title: "Team Member",
    description: "Back-end Developer",
  },
  {
    name: "Debashri Mandal",
    avatar: "D",
    title: "Team Member",
    description: "Front-end Developer",
  },
   {
    name: "Suman Saha",
    avatar: "S",
    title: "Team Member",
    description: "UI/UX Designer",
  },
]

export const LandingContent = () => {
  return (
    <div className="relative px-10 pb-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
      </div>

      {/* Enhanced section header */}
      <div className="relative text-center mb-16">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl text-white font-extrabold mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-2 rounded-full" />
        </div>
        <p className="text-zinc-400 mt-6 text-lg max-w-2xl mx-auto">
          Meet the talented individuals behind NexZenith&apos;s innovation
        </p>
      </div>

      {/* Enhanced team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <Card 
            key={item.description} 
            className="group relative bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 text-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-900/80 to-gray-800/80" />
            </div>

            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="flex items-center gap-x-4">
                {/* Enhanced avatar */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-300">
                    {item.avatar}
                  </div>
                  {/* Avatar glow ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                  
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
                    {item.name}
                  </p>
                  <p className="text-zinc-400 text-sm font-medium flex items-center gap-1">
                    {item.title === "Team Leader" && (
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    )}
                    {item.title}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-4 px-6 pb-6">
              <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors duration-300">
                {/* Role icon */}
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:scale-125 transition-transform duration-300" />
                <span className="text-sm font-medium">{item.description}</span>
              </div>
              
              {/* Skills indicator */}
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                      i < 4 ? 'opacity-100' : 'opacity-30'
                    } group-hover:opacity-100`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </CardContent>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-out] pointer-events-none" />
          </Card>
        ))}
      </div>

      {/* Team stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          { number: "6", label: "Team Members" },
          { number: "5+", label: "Technologies" },
          { number: "100%", label: "Dedication" },
          { number: "24/7", label: "Support" }
        ].map((stat, index) => (
          <div key={stat.label} className="text-center group">
            <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              {stat.number}
            </div>
            <div className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors duration-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
      `}</style>
    </div>
  )
}