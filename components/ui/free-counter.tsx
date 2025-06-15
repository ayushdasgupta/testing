"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/prisma/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModel } from "@/hooks/use-pro-model";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const proModel = useProModel();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isPro) return null;

  return (
    <div className="px-3">
      <Card className="border bg-[#F5F3E3] dark:bg-transparent">
        <CardContent className="py-6">
          <div className="text-center text-sm mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generation
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button onClick={proModel.onOpen} className="w-full bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-500 dark:to-pink-500 dark:text-white text-neutral-700 " >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-black dark:fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
