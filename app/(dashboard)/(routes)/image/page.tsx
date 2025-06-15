"use client";

import axios from "axios";
import * as z from "zod";
import toast from "react-hot-toast";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon, Sparkles } from "lucide-react";

import { formSchema } from "./constants";
import { useProModel } from "@/hooks/use-pro-model";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
const ImagePage = () => {
  const proModel = useProModel();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
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
  }, [images]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]); // clear existing images
      console.log("Hello" + values.prompt);

      const response = await axios.post("/api/image", values);

      // Get base64 string and convert to data URL
      const base64 = response.data.content;
      const imageUrl = `data:image/png;base64,${base64}`;

      setImages([imageUrl]); // set as array of one image

      form.reset(); // reset the form
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
              <div className="p-3 bg-pink-700/10 rounded-xl">
                <ImageIcon className="w-8 h-8 text-pink-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                  Image Generation
                </h1>
                <p className="text-gray-600 dark:text-slate-300 text-sm">
                  Turn your prompt into an image
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Chat Area */}
        <div className="h-[70vh] overflow-y-auto px-4 lg:px-8 py-6 scroll-smooth custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {!images.length && !isLoading && (
                <div className="text-center py-12">
                  <div className="bg-[#F5F3E3] dark:bg-transparent backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto border border-gray-200/50 dark:border-transparent">
                    <div className="flex items-center justify-center mb-4">
                      <Sparkles className="w-12 h-12 text-pink-500 animate-pulse" />
                    </div>
                    <Empty label="Describe something to generate an image" />
                  </div>
                </div>
              )}

              {images.map((src, index) => (
                <div key={index} className="flex flex-col gap-y-6">
                  {/* User prompt bubble (right) */}
                  <div className="group flex items-start gap-4 transition-all duration-300 flex-row-reverse">
                    <div className="flex-shrink-0">
                      {/* <ImageIcon className="w-8 h-8 text-pink-600 dark:text-pink-400" /> */}
                      <UserAvatar/>
                    </div>
                    <div className="max-w-[80%] rounded-2xl p-4 shadow-sm border transition-all duration-300 group-hover:shadow-md bg-[#FCFBF7] dark:bg-pink-500 dark:text-white text-black border-pink-500/20">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {form.getValues("prompt")}
                      </p>
                    </div>
                  </div>

                  {/* Bot reply bubble (left) with image */}
                  <div className="group flex items-start gap-4 transition-all duration-300 flex-row">
                    <div className="flex-shrink-0">
                      {/* <Image src="/bot.png" alt="Bot" width={32} height={32} className="rounded-full" /> */}
                      <BotAvatar />
                      {/* Or use <BotAvatar /> if you have that component */}
                    </div>
                    <div className="max-w-[80%] rounded-2xl p-4 shadow-sm border transition-all duration-300 group-hover:shadow-md bg-[#fff8f2] dark:bg-slate-800/80 border-gray-200/50 dark:border-slate-700/50">
                      <img src={src} alt="Generated" className="rounded-lg w-full h-auto" />
                      <Button
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = src;
                          link.download = "generated_image.png";
                          link.click();
                        }}
                        variant="secondary"
                        className="w-full mt-3"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-4">
                  <ImageIcon className="w-8 h-8 text-pink-500 animate-pulse" />
                  <div className="bg-[#F5F3E3] dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-slate-700/50">
                    <Loader />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>

        {/* Fixed Bottom Input */}
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
                            className="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-0 min-h-[44px]"
                            disabled={isLoading}
                            placeholder="A picture of a horse in the Swiss Alps"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600 text-white border-0 rounded-xl px-6 py-3 h-11 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
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

export default ImagePage;
