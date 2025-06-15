import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription, checkSubscription1 } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {
  const isPro = await checkSubscription() || await checkSubscription1();
  const isStripe = await checkSubscription();

  return (
    <div className="h-full bg-[#F5F3E3] dark:bg-transparent">
      <div className="relative z-10 flex flex-col flex-1 h-[calc(100vh-75px)] overflow-hidden">
        {/* Header */}
        <div className="bg-[#F5F3E3] dark:bg-transparent backdrop-blur-sm border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm">
          <div className="px-4 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-700/10 rounded-xl">
                <Settings className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-gray-600 dark:text-slate-300 text-sm">
                  Manage your account preferences and subscription
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 lg:px-8 py-10 max-w-3xl mx-auto space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700/50 p-6 rounded-xl shadow-sm">
            <div className="text-sm text-muted-foreground mb-4">
              {isPro ? (
                <span className="text-green-600 font-medium">✅ You are currently on a Pro Plan.</span>
              ) : (
                <span className="text-yellow-600 font-medium">⚠️ You are currently on a Free Plan.</span>
              )}
            </div>

            {isStripe && (
              <div className="mt-4">
                <SubscriptionButton isPro={isPro} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
