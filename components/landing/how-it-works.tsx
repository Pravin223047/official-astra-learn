"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    FileUp,
    Search,
    CheckCircle2,
    BarChart3,
    Users,
    ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
    {
        title: "Upload Resumes",
        description: "Batch upload resumes in any format, or integrate with your existing ATS.",
        icon: <FileUp className="h-6 w-6" />,
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "AI Analysis",
        description: "Our AI analyzes each resume, extracting and categorizing all relevant information.",
        icon: <Search className="h-6 w-6" />,
        color: "bg-violet-500/10 text-violet-500",
    },
    {
        title: "Verification",
        description: "Claims are automatically verified against online sources and databases.",
        icon: <CheckCircle2 className="h-6 w-6" />,
        color: "bg-green-500/10 text-green-500",
    },
    {
        title: "Skill Scoring",
        description: "Each candidate receives quantified scores across technical and soft skills.",
        icon: <BarChart3 className="h-6 w-6" />,
        color: "bg-amber-500/10 text-amber-500",
    },
    {
        title: "Match & Recommend",
        description: "AI matches candidates to roles and provides detailed recommendations.",
        icon: <Users className="h-6 w-6" />,
        color: "bg-cyan-500/10 text-cyan-500",
    },
];

export function HowItWorks() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const router = useRouter();

    return (
        <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-lg text-muted-foreground">
                        Our intelligent platform transforms resumes into actionable insights through a streamlined process.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-4xl mx-auto"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-12"
                        >
                            <div className={`rounded-full ${step.color} p-4 flex items-center justify-center shrink-0`}>
                                {step.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex h-24 items-center justify-center">
                                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-8 md:mt-12"
                >
                    <Button size="lg" className="text-md px-8" onClick={() => router.push("/dashboard")}>
                        See It In Action
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}