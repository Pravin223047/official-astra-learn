"use client";

import { useState } from "react";
import { MessageSquareIcon, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { motion, AnimatePresence } from "framer-motion";
import { ChatMessages } from "../chat/chat-messages";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            <Button
                variant="secondary"
                size="icon"
                className={cn(
                    "fixed bottom-4 right-4 z-40 rounded-full shadow-lg md:hidden",
                    isMobileOpen ? "hidden" : "flex"
                )}
                onClick={() => setIsMobileOpen(true)}
            >
                <MessageSquareIcon className="h-5 w-5" />
            </Button>

            <AnimatePresence>
                <motion.div
                    className={cn(
                        "fixed inset-y-0 right-0 z-30 flex bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out",
                        isOpen ? "md:w-80" : "md:w-16",
                        "max-w-xs sm:max-w-sm md:max-w-none"
                    )}
                    initial={{ x: "100%" }}
                    animate={{
                        x: isMobileOpen || isOpen ? 0 : "calc(100% - 4rem)",
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 150 }}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -left-10 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-background/95 backdrop-blur-sm shadow-md hover:bg-accent md:flex"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <ChevronRightIcon className="h-4 w-4" />
                        ) : (
                            <ChevronLeftIcon className="h-4 w-4" />
                        )}
                    </Button>

                    <div className="flex h-full w-full flex-col border-l">
                        <div className="flex h-16 items-center justify-between border-b px-4 bg-background/50">
                            <h2 className={cn(
                                "text-lg font-semibold transition-opacity",
                                isOpen ? "opacity-100" : "opacity-0 md:hidden"
                            )}>
                                Messages
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <ChevronRightIcon className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className={cn(
                            "h-[calc(100vh-4rem)] overflow-auto transition-opacity",
                            isOpen ? "opacity-100" : "opacity-0 md:hidden"
                        )}>
                            <ChatMessages isCollapsed={!isOpen} />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}