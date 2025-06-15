"use client";

import axios from "axios";
import * as z from "zod";

import toast from "react-hot-toast";

import { Heading } from "@/components/heading";
import { Badge, MessageSquare, Send, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { useProModel } from "@/hooks/use-pro-model";

import Image from "next/image";

const ConversationPage = () => {
    const proModel = useProModel();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const [pro, setPro] = useState<boolean>();
    const bottomRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onAssistent = async () => {
        const response = await axios.get("/api/janina");

        if (response.data.isPro) {
            router.push("/conversation/nexzenassist");
        } else {
            toast.error("Upgrade to PRO");
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
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

    return (
        <div className="h-full bg-[#F5F3E3] dark:bg-transparent">
            <div className="relative z-10 flex flex-col flex-1 h-[calc(100vh-75px)] overflow-hidden">
                {/* Header */}
                <div className="bg-[#F5F3E3] dark:bg-transparent backdrop-blur-sm border-b border-gray-200/50 dark:border-slate-700/50 shadow-sm">
                    <div className="px-4 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-violet-500/10 rounded-xl">
                                    <MessageSquare className="w-8 h-8 animate-pulse text-violet-500" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                                        Conversation
                                    </h1>
                                    <p className="text-gray-600 dark:text-slate-300 text-sm">
                                        Our most advanced conversation model
                                    </p>
                                </div>
                            </div>

                            <Button
                                type="button"
                                className="bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-500 dark:to-pink-500 dark:text-white text-neutral-700 border-0 rounded-xl px-4 py-2 shadow-lg 
                                hover:shadow-xl transition-all duration-300"
                                disabled={isLoading}
                                onClick={onAssistent}
                            >
                                <Image
                                    width={24}
                                    height={24}
                                    src="/assistent.png"
                                    alt="NexZen Assistant"
                                    className="mr-2"
                                />
                                NexZen Assistant
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Messages */}
                <div className="h-[70vh] overflow-y-auto px-4 lg:px-8 py-6 scroll-smooth custom-scrollbar">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {messages.length === 0 && !isLoading && (
                                <div className="text-center py-12">
                                    <div className="bg-[#F5F3E3]  dark:bg-transparent backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto border border-gray-200/50 dark:border-transparent">
                                        <div className="flex items-center justify-center mb-4">
                                            <Sparkles className="w-12 h-12 text-violet-500 animate-pulse" />
                                        </div>
                                        <Empty label="Start a conversation to see the magic happen" />
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
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                {message.content as string}
                                            </p>
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
                                                        className="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-0 min-h-[44px]"
                                                        disabled={isLoading}
                                                        placeholder="How can I help you today?"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-violet-500 hover:bg-violet-600 text-white border-0 rounded-xl px-6 py-3 h-11 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                                        disabled={isLoading || !form.watch("prompt")?.trim()}
                                    >
                                        {isLoading ? (
                                            <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send
                                            </>
                                        )}
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

export default ConversationPage;
