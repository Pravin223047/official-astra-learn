"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { SendIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { candidates, chatMessages } from "@/lib/data";

interface ChatMessagesProps {
    isCollapsed?: boolean;
}

export function ChatMessages({ isCollapsed = false }: ChatMessagesProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
    const [newMessage, setNewMessage] = useState("");
    const [activeChat, setActiveChat] = useState<string>("2");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChat]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        const message: ChatMessage = {
            id: `temp-${Date.now()}`,
            senderId: "hr",
            receiverId: activeChat,
            message: newMessage,
            timestamp: new Date().toISOString(),
            read: false,
        };

        setMessages([...messages, message]);
        setNewMessage("");
    };

    const getCandidateName = (id: string) => {
        const candidate = candidates.find((c) => c.id === id);
        return candidate ? candidate.name : "Unknown Candidate";
    };

    const filteredMessages = messages.filter(
        (msg) => msg.senderId === activeChat || msg.receiverId === activeChat
    );

    const groupedMessages: { [key: string]: ChatMessage[] } = {};

    filteredMessages.forEach((message) => {
        const date = new Date(message.timestamp).toDateString();
        if (!groupedMessages[date]) {
            groupedMessages[date] = [];
        }
        groupedMessages[date].push(message);
    });

    const selectedCandidates = candidates.filter((c) => c.selected);

    if (isCollapsed) {
        return (
            <div className="flex h-full flex-col items-center py-4">
                {selectedCandidates.map((candidate) => (
                    <TooltipProvider>
                        <Tooltip key={candidate.id}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={activeChat === candidate.id ? "secondary" : "ghost"}
                                    size="icon"
                                    className="mb-2 h-10 w-10 rounded-full"
                                    onClick={() => setActiveChat(candidate.id)}
                                >
                                    <MessageSquareIcon className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {candidate.name}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            {selectedCandidates.length > 0 ? (
                <>
                    <div className="p-4">
                        <div className="space-y-2">
                            {selectedCandidates.map((candidate) => (
                                <button
                                    key={candidate.id}
                                    className={cn(
                                        "w-full rounded-md p-2 text-left text-sm transition-colors",
                                        activeChat === candidate.id
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-muted"
                                    )}
                                    onClick={() => setActiveChat(candidate.id)}
                                >
                                    {candidate.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-1 flex-col">
                        <div className="border-b p-3">
                            <h3 className="font-medium">{getCandidateName(activeChat)}</h3>
                        </div>

                        <ScrollArea className="flex-1 p-4">
                            {Object.keys(groupedMessages).length > 0 ? (
                                Object.entries(groupedMessages).map(([date, dateMessages]) => (
                                    <div key={date} className="mb-4">
                                        <div className="relative mb-3 flex items-center">
                                            <div className="flex-grow border-t border-border"></div>
                                            <span className="mx-4 flex-shrink text-xs text-muted-foreground">
                                                {format(new Date(date), "MMMM d, yyyy")}
                                            </span>
                                            <div className="flex-grow border-t border-border"></div>
                                        </div>

                                        {dateMessages.map((msg, index) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={cn(
                                                    "mb-3 flex",
                                                    msg.senderId === "hr" ? "justify-end" : "justify-start"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "max-w-[80%] rounded-lg px-4 py-2",
                                                        msg.senderId === "hr"
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-muted"
                                                    )}
                                                >
                                                    <p className="text-sm">{msg.message}</p>
                                                    <p className="mt-1 text-right text-xs opacity-80">
                                                        {format(new Date(msg.timestamp), "h:mm a")}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                                    <p>No messages yet</p>
                                    <p className="text-sm">Start a conversation with {getCandidateName(activeChat)}</p>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </ScrollArea>

                        <form onSubmit={handleSendMessage} className="border-t p-3">
                            <div className="flex items-end gap-2">
                                <Textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="min-h-[80px] flex-1 resize-none"
                                />
                                <Button type="submit" size="icon" className="h-9 w-9">
                                    <SendIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <div className="flex h-full flex-col items-center justify-center p-4 text-center text-muted-foreground">
                    <p className="mb-2">No selected candidates</p>
                    <p className="text-sm">
                        Select candidates from the dashboard to start messaging
                    </p>
                </div>
            )}
        </div>
    );
}