"use client";

import axios from "axios";
import * as z from "zod";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Code, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { formSchema } from "./constants";
import { useProModel } from "@/hooks/use-pro-model";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { cn } from "@/lib/utils";

const CodePage = () => {
  const proModel = useProModel();
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", {
        messages: values.prompt,
      });
      setMessages((current) => [...current, userMessage, response.data]);
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
  function formatToMarkdown(content: string): string {
  // Unified regex for Python, JavaScript, and C++ functions
  const codeRegex = /(?:def\s+\w+\s*\([^)]*\)\s*:[\s\S]*?(?=\n{2,}|$))|(?:function\s*\w*\s*\([^)]*\)\s*\{[\s\S]*?\}(?=\s*\n|$))|(?:\w[\w\s*&<>:]*\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\}(?=\s*\n|$))/;
  
  const matches = content.match(codeRegex);
  if (!matches) return "```\nNo code found.\n```";

  const cleanedCode = matches
    .map(code => code.trim())
    .join('\n\n');

  return `\`\`\`\n${cleanedCode}\n\`\`\``;
}
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full bg-[#F5F3E3] dark:bg-transparent">
      <div className="relative z-10 flex flex-col flex-1 h-[calc(100vh-75px)] overflow-hidden">
        {/* Header */}
        <div className="bg-[#F5F3E3] dark:bg-transparent backdrop-blur-sm border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm">
          <div className="px-4 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-700/10 rounded-xl">
                <Code className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent">
                  Code Generation
                </h1>
                <p className="text-gray-600 dark:text-slate-300 text-sm">
                  Generate code using descriptive text
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Messages */}
        <div className="h-[70vh] overflow-y-auto px-4 lg:px-8 py-6 scroll-smooth custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {messages.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="bg-[#F5F3E3] dark:bg-transparent backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto border border-gray-200/50 dark:border-transparent">
                    <div className="flex items-center justify-center mb-4">
                      <Sparkles className="w-12 h-12 text-green-600 animate-pulse" />
                    </div>
                    <Empty label="Start describing what code you want" />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "group flex items-start gap-4 transition-all duration-300",
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className="flex-shrink-0">
                      {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                    </div>

                    <div className={cn(
                      "max-w-[80%] rounded-2xl p-4 shadow-sm border transition-all duration-300 group-hover:shadow-md",
                      message.role === "user"
                        ? "bg-[#FCFBF7] dark:bg-violet-500 dark:text-white text-black border-violet-500/20"
                        : "bg-[#fff8d8] dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-slate-700/50 text-gray-800 dark:text-slate-200"
                    )}>
                      {message.role === "user" ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content as string}
                        </p>
                      ) : (
                        <ReactMarkdown
                          components={{
                            pre: ({ node, ...props }) => (
                              <div className="overflow-auto w-full my-2 bg-black/10 dark:bg-white/10 p-2 rounded-lg">
                                <pre {...props} />
                              </div>
                            ),
                            code: ({ node, ...props }) => (
                              <code
                                className="bg-black/10 dark:bg-white/10 rounded-lg p-1 text-sm"
                                {...props}
                              />
                            ),
                          }}
                          className="text-sm overflow-hidden leading-7 whitespace-pre-wrap"
                        >

                          {formatToMarkdown(message.content as string)}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))}

                {/* Scroll anchor div */}
                <div ref={bottomRef} />
              </div>

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-4">
                    <BotAvatar />
                    <div className="bg-[#F5F3E3] dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50 dark:border-slate-700/50">
                      <Loader />
                    </div>
                  </div>
                </div>
              )}
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
                            className="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-0 min-h-[44px]"
                            disabled={isLoading}
                            placeholder="Simple toggle button using React hooks"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white border-0 rounded-xl px-6 py-3 h-11 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
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

      {/* Optional: Global CSS for scrollbars */}
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

export default CodePage;