"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormStep } from "@/lib/types";
import { FORM_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BuilderSidebarProps {
    currentStep: FormStep;
    setCurrentStep: (step: FormStep) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export function BuilderSidebar({
    currentStep,
    setCurrentStep,
    isOpen,
    setIsOpen,
}: BuilderSidebarProps) {
    return (
        <div
            className={cn(
                "h-full border-r bg-card transition-all duration-300 flex flex-col",
                isOpen ? "w-64" : "w-14"
            )}
        >
            <div className="p-4 flex items-center justify-between border-b">
                {isOpen && (
                    <span className="font-medium truncate">Resume Sections</span>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn("shrink-0", !isOpen && "mx-auto")}
                >
                    {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                <nav className="space-y-1 px-2">
                    {FORM_STEPS.map((step) => (
                        <Button
                            key={step.id}
                            variant={currentStep === step.id ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start",
                                !isOpen && "justify-center px-0"
                            )}
                            onClick={() => setCurrentStep(step.id as FormStep)}
                        >
                            {isOpen ? (
                                <span>{step.title}</span>
                            ) : (
                                <span className="truncate w-full text-center">
                                    {step.title.charAt(0)}
                                </span>
                            )}
                            {currentStep === step.id && isOpen && (
                                <motion.div
                                    layoutId="activeStep"
                                    className="absolute left-0 h-full w-1 bg-primary rounded-r-md"
                                    style={{ top: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </Button>
                    ))}
                </nav>
            </div>
        </div>
    );
}