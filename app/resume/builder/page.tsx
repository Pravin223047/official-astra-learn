"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeProvider } from "@/contexts/resume-context";
import { useResumeContext } from "@/contexts/resume-context";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FormStep } from "@/lib/types";
import { FORM_STEPS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { PersonalInfoForm } from "@/app/(routes)/resume-builder/components/resume/forms/personal-info-form";
import { BuilderSidebar } from "@/app/(routes)/resume-builder/components/builder-sidebar";
import { MobileStepControls } from "@/app/(routes)/resume-builder/components/mobile-step-controls";
import { ResumePreview } from "@/app/(routes)/resume-builder/components/resume-preview";
import { CertificationsForm } from "@/app/(routes)/resume-builder/components/resume/forms/certifications-form";
import { EducationForm } from "@/app/(routes)/resume-builder/components/resume/forms/education-form";
import { ExperienceForm } from "@/app/(routes)/resume-builder/components/resume/forms/experience-form";
import { LanguagesForm } from "@/app/(routes)/resume-builder/components/resume/forms/languages-form";
import { PreviewOptions } from "@/app/(routes)/resume-builder/components/resume/forms/preview-options";
import { ProjectsForm } from "@/app/(routes)/resume-builder/components/resume/forms/projects-form";
import { SkillsForm } from "@/app/(routes)/resume-builder/components/resume/forms/skills-form";

const ResumeBuilderContent = () => {
    const { currentStep, setCurrentStep } = useResumeContext();
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            setSidebarOpen(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const currentStepIndex = FORM_STEPS.findIndex(step => step.id === currentStep);
    const progress = ((currentStepIndex + 1) / FORM_STEPS.length) * 100;

    const renderForm = () => {
        switch (currentStep) {
            case "personal":
                return <PersonalInfoForm />;
            case "experience":
                return <ExperienceForm />;
            case "education":
                return <EducationForm />;
            case "projects":
                return <ProjectsForm />;
            case "skills":
                return <SkillsForm />;
            case "certifications":
                return <CertificationsForm />;
            case "languages":
                return <LanguagesForm />;
            case "preview":
                return <PreviewOptions />;
            default:
                return <PersonalInfoForm />;
        }
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/")}
                            title="Back to home"
                        >
                            <ArrowLeft size={20} />
                        </Button>
                        <h1 className="text-xl font-semibold">Resume Builder</h1>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Step {currentStepIndex + 1} of {FORM_STEPS.length}
                    </div>
                </div>
                <Progress value={progress} className="h-1 w-full bg-muted/50" />
            </header>

            {/* Mobile Step Controls (visible only on mobile) */}
            {isMobile && (
                <MobileStepControls
                    currentStep={currentStep as FormStep}
                    setCurrentStep={setCurrentStep}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Desktop Sidebar (visible only on desktop) */}
                {!isMobile && (
                    <BuilderSidebar
                        currentStep={currentStep as FormStep}
                        setCurrentStep={setCurrentStep}
                        isOpen={sidebarOpen}
                        setIsOpen={setSidebarOpen}
                    />
                )}

                {/* Form and Preview Container */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Form Section */}
                    <div className={`${isMobile ? 'h-1/2' : sidebarOpen ? 'lg:w-1/2' : 'lg:w-2/5'} overflow-y-auto border-r`}>
                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {renderForm()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className={`${isMobile ? 'h-1/2' : sidebarOpen ? 'lg:w-1/2' : 'lg:w-3/5'} overflow-y-auto bg-muted/30`}>
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ResumeBuilderPage() {
    return (
        <ResumeProvider>
            <ResumeBuilderContent />
        </ResumeProvider>
    );
}