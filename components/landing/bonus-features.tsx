"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Database,
    MessageSquare,
    LineChart,
    BookOpen,
    Languages,
    Download,
} from "lucide-react";

const bonusFeatures = [
    {
        title: "Sentiment Analysis",
        description: "Analyze communication style and tone in writing samples for culture fit assessment.",
        icon: <LineChart className="h-6 w-6" />,
        badge: "Analysis",
        gradient: "from-rose-400/30 via-pink-500/20 to-red-500/20",
    },
    {
        title: "Multilingual Support",
        description: "Process and analyze resumes in over 30 languages with equal precision.",
        icon: <Languages className="h-6 w-6" />,
        badge: "Global",
        gradient: "from-indigo-400/30 via-purple-500/20 to-blue-500/20",
    },
    {
        title: "AI Interview Questions",
        description: "Generate tailored interview questions based on candidate profiles and job requirements.",
        icon: <MessageSquare className="h-6 w-6" />,
        badge: "AI Tools",
        gradient: "from-teal-400/30 via-green-400/20 to-cyan-500/20",
    },
    {
        title: "ATS Integration",
        description: "Seamlessly integrate with major ATS platforms including Workday, Greenhouse, and Lever.",
        icon: <Database className="h-6 w-6" />,
        badge: "Integration",
        gradient: "from-orange-400/30 via-yellow-300/20 to-amber-400/20",
    },
    {
        title: "Learning Pathways",
        description: "Create personalized learning journeys for candidates who need skill enhancement.",
        icon: <BookOpen className="h-6 w-6" />,
        badge: "Development",
        gradient: "from-violet-400/30 via-fuchsia-500/20 to-purple-500/20",
    },
    {
        title: "Bulk Export",
        description: "Export comprehensive analysis reports for teams and stakeholders.",
        icon: <Download className="h-6 w-6" />,
        badge: "Reporting",
        gradient: "from-sky-400/30 via-blue-300/20 to-indigo-400/20",
    },
];

export function BonusFeatures() {
    const [revealed, setRevealed] = useState<number[]>([]);

    const handleReveal = (index: number) => {
        if (!revealed.includes(index)) {
            setRevealed((prev) => [...prev, index]);
        }
    };

    return (
        <section id="bonus-features" className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Bonus Features</h2>
                    <p className="text-lg text-muted-foreground">
                        Scratch to reveal powerful AI capabilities that enhance your recruitment workflow.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {bonusFeatures.map((feature, index) => {
                        const isRevealed = revealed.includes(index);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onMouseEnter={() => handleReveal(index)}
                            >
                                <Card
                                    className={`relative h-full overflow-hidden border shadow-md transition-all duration-300 backdrop-blur-md ${isRevealed ? `bg-gradient-to-br ${feature.gradient}` : "bg-muted/30"
                                        }`}
                                >
                                    {!isRevealed && (
                                        <div className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-400/60 to-zinc-600/60 backdrop-blur-sm flex items-center justify-center text-white font-medium tracking-wide text-lg cursor-pointer transition-all duration-300 hover:backdrop-blur-md">
                                            Scratch to Reveal
                                        </div>
                                    )}
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-center">
                                            <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center text-primary">
                                                {feature.icon}
                                            </div>
                                            <Badge variant="outline" className="ml-2">
                                                {feature.badge}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
