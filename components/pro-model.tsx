"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { useProModel } from "@/hooks/use-pro-model";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import logo from "@/public/logo.png";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  // {
  //     label: "Music Generation",
  //     icon: Music,
  //     color: "text-emerald-500",
  //     bgColor: "bg-emerald-500/10",
  // },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];

export const ProModel = () => {
  const proModel = useProModel();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const respon = axios.get("/api/stripe");

      window.location.href = (await respon).data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onSubscribe1 = async () => {
    try {
      setLoading(true);
      const {
        data: { key },
      } = await axios.get("/api/razorpayapikey");
      setKey(key);
      const {
        data: { subscriptionId },
      } = await axios.get("/api/razorpay", {
        withCredentials: true,
      });
      setSubscriptionId(subscriptionId);
      console.log(key, subscriptionId);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: "NexZenith PRO",
          description: "Get Unlimited Access",
          image: logo,
          subscription_id: subscriptionId,
          callback_url: "http://localhost:3000/api/paymentverification",
          theme: {
            color: "#de45a5",
          },
        };

        const razor = new (window as any).Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [key, subscriptionId]);

  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to NexZenith
              <Badge className="uppercase text-sm py-1 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-500 dark:to-pink-500 dark:text-white text-neutral-700">pro</Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}

            <h1 className="text-xl flex justify-center text-center dark:text-white text-black">
              Upgrade <Zap className="w-4 h-7 ml-2  fill-black dark:fill-white" />
            </h1>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full flex">
            <Button
              disabled={loading}
              onClick={onSubscribe1}
              size="lg"
              variant="premium"
              className="w-full mx-2 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-500 dark:to-pink-500 dark:text-white text-neutral-700"
            >
              Indian Users
            </Button>

            <Button
              disabled={loading}
              onClick={onSubscribe}
              size="lg"
              variant="premium"
              className="w-full mx-2 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-500 dark:to-pink-500 dark:text-white text-neutral-700"
            >
              Others
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
