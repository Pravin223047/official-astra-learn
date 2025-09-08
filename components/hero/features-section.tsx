'use client';

import { motion } from "framer-motion";
import { Video, Bot, Mic, BookOpen, Languages, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
    {
        icon: Video,
        title: "AI-Powered Interview Simulation",
        description: "Engage in lifelike interview simulations with immediate AI-driven feedback and analysis.",
    },
    {
        icon: Bot,
        title: "Intelligent Voice Assistant",
        description: "Experience interactive lessons and instant Q&A, powered by cutting-edge AI voice technology.",
    },
    {
        icon: Mic,
        title: "Real-Time Mock Interviews",
        description: "Enhance your interview performance with live feedback and detailed skill assessments.",
    },
    {
        icon: BookOpen,
        title: "Comprehensive Exam Prep Tools",
        description: "Get personalized, AI-curated questions and in-depth explanations to excel in exams.",
    },
    {
        icon: Languages,
        title: "AI-Enhanced Language Coaching",
        description: "Improve fluency with real-time conversational practice and feedback from an AI language coach.",
    },
    {
        icon: Brain,
        title: "Focus-Boosting Study Mode",
        description: "Achieve deep concentration with built-in productivity tools and calming meditation practices.",
    },
];


const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-muted/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Elevate Your Learning with AI
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore a feature-rich ecosystem designed to accelerate your growth and performance.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <Card className="p-6 h-full group border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white dark:bg-slate-900">
                                <div className="relative mb-4">
                                    <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-primary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        layoutId={`glow-${index}`}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
