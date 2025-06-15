"use client";

import axios from "axios";
import * as z from "zod";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VideoIcon, Sparkles } from "lucide-react";

import { formSchema } from "./constants";
import { useProModel } from "@/hooks/use-pro-model";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";

const VideoPage = () => {
  const proModel = useProModel();
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [video]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModel.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="h-full bg-[#F5F3E3] dark:bg-transparent">
      <div className="relative z-10 flex flex-col flex-1 h-[calc(100vh-75px)] overflow-hidden">
        {/* Header */}
        <div className="bg-[#F5F3E3] dark:bg-transparent backdrop-blur-sm border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm">
          <div className="px-4 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-700/10 rounded-xl">
                <VideoIcon className="w-8 h-8 text-orange-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                  Video Generation
                </h1>
                <p className="text-gray-600 dark:text-slate-300 text-sm">
                  Turn your prompt into video
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Chat Area */}
        <div className="h-[70vh] overflow-y-auto px-4 lg:px-8 py-6 scroll-smooth custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {!video && !isLoading && (
                <div className="text-center py-12">
                  <div className="bg-[#F5F3E3] dark:bg-transparent backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto border border-gray-200/50 dark:border-transparent">
                    <div className="flex items-center justify-center mb-4">
                      <Sparkles className="w-12 h-12 text-orange-500 animate-pulse" />
                    </div>
                    <Empty label="Describe something to generate a video" />
                  </div>
                </div>
              )}

              {video && (
                <div className="group flex items-start gap-4 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <VideoIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="max-w-[80%] rounded-2xl p-4 shadow-sm border transition-all duration-300 group-hover:shadow-md bg-[#fff8f2] dark:bg-slate-800/80 border-gray-200/50 dark:border-slate-700/50">
                    <video
                      className="w-full aspect-video rounded-lg bg-black border"
                      controls
                    >
                      <source src={video} />
                    </video>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex items-start gap-4">
                  <VideoIcon className="w-8 h-8 text-orange-500 animate-pulse" />
                  <div className="bg-[#F5F3E3] dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-slate-700/50">
                    <Loader />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>

        {/* Bottom Input */}
        <div className="bg-[#F5F3E3] dark:bg-transparent backdrop-blur-sm absolute bottom-6 right-0 left-0 z-50">
          <div className="px-4 lg:px-8 py-4">
            <div className="max-w-4xl mx-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex gap-3 items-end"
                >
                  <FormField
                    name="prompt"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            className="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0 min-h-[44px]"
                            disabled={isLoading}
                            placeholder="A futuristic city drone shot"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white border-0 rounded-xl px-6 py-3 h-11 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    disabled={isLoading || !form.watch("prompt")?.trim()}
                  >
                    Generate
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.4);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default VideoPage;
