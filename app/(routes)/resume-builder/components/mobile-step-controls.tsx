"use client";

import { Button } from "@/components/ui/button";
import { FORM_STEPS } from "@/lib/constants";
import { FormStep } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileStepControlsProps {
    currentStep: FormStep;
    setCurrentStep: (step: FormStep) => void;
}

export function MobileStepControls({
    currentStep,
    setCurrentStep,
}: MobileStepControlsProps) {
    const currentIndex = FORM_STEPS.findIndex(step => step.id === currentStep);
    const prevStep = currentIndex > 0 ? FORM_STEPS[currentIndex - 1].id as FormStep : null;
    const nextStep = currentIndex < FORM_STEPS.length - 1 ? FORM_STEPS[currentIndex + 1].id as FormStep : null;

    return (
        <div className="flex items-center justify-between bg-card border-b p-2 lg:hidden">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => prevStep && setCurrentStep(prevStep)}
                disabled={!prevStep}
                className="flex items-center gap-1"
            >
                <ChevronLeft size={16} />
                {prevStep && FORM_STEPS.find(step => step.id === prevStep)?.title}
            </Button>

            <div className="flex gap-1 overflow-x-auto py-1 no-scrollbar">
                {FORM_STEPS.map((step, index) => (
                    <Button
                        key={step.id}
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-2 w-2 p-0 rounded-full",
                            currentStep === step.id
                                ? "bg-primary"
                                : index < currentIndex
                                    ? "bg-primary/30"
                                    : "bg-muted"
                        )}
                        onClick={() => setCurrentStep(step.id as FormStep)}
                        aria-label={`Go to ${step.title}`}
                    />
                ))}
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={() => nextStep && setCurrentStep(nextStep)}
                disabled={!nextStep}
                className="flex items-center gap-1"
            >
                {nextStep && FORM_STEPS.find(step => step.id === nextStep)?.title}
                <ChevronRight size={16} />
            </Button>
        </div>
    );
}