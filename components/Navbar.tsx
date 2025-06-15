import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "@/components/mobile-sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription, checkSubscription1 } from "@/lib/subscription";
import UpdateTheme from "@/components/update-theme";

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription() || await checkSubscription1()
  
  return (
    <div className="flex items-center p-4 bg-[#F5F3E3] dark:bg-transparent backdrop-blur-lg border-gray-200 dark:border-slate-700 sticky top-0 z-50">
      {/* Enhanced gradient backdrop */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Mobile Sidebar with enhanced styling */}
      <div className="relative">
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      
      {/* Right side controls */}
      <div className="flex items-center gap-4 w-full justify-end">
        {/* Pro Badge (if applicable) */}
        {isPro && (
          <div className="hidden sm:flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-500 dark:to-pink-500 dark:text-white text-neutral-700  text-xs font-semibold rounded-full shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            PRO
          </div>
        )}
        
        {/* API Usage Indicator */}
        {!isPro && (
          <div className="hidden sm:flex items-center px-3 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-xs font-medium rounded-full border border-gray-200 dark:border-slate-600">
            <div className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
            {apiLimitCount}/10 Free
          </div>
        )}
        
        {/* Theme Toggle with enhanced styling */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300" />
          <div className="relative bg-white dark:bg-slate-800 rounded-full p-1 border border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200">
            <UpdateTheme />
          </div>
        </div>
        
        {/* User Button with enhanced styling */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-300" />
          <div className="relative ring-2 ring-gray-200 dark:ring-slate-600 rounded-full hover:ring-blue-400 dark:hover:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-white dark:border-slate-700 shadow-md hover:scale-105 transition-transform duration-200",
                  userButtonPopoverCard: "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-xl",
                  userButtonPopoverActions: "bg-gray-50 dark:bg-slate-700",
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar