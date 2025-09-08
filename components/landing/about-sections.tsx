"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Clock, Target, Search } from "lucide-react";

export function AboutSection() {
    const problemItems = [
        {
            title: "Manual Resume Screening",
            description: "HR teams spend hours manually reviewing resumes, resulting in bottlenecks and missed talent.",
            icon: <Search className="h-6 w-6" />,
        },
        {
            title: "Poor Candidate Matching",
            description: "Traditional methods fail to identify the best candidates for specific roles and company culture.",
            icon: <Target className="h-6 w-6" />,
        },
        {
            title: "Verification Challenges",
            description: "Validating candidate claims is time-consuming and often overlooked due to resource constraints.",
            icon: <Lightbulb className="h-6 w-6" />,
        },
        {
            title: "Time-to-Hire Delays",
            description: "Extended recruitment cycles lead to increased costs and missed opportunities.",
            icon: <Clock className="h-6 w-6" />,
        },
    ];

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

    return (
        <section id="about" className="py-16 md:py-24 section-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Solving the Modern Recruitment Challenge</h2>
                    <p className="text-lg text-muted-foreground">
                        TalentSleuth AI addresses the fundamental problems plaguing today's recruitment processes, empowering your team to make data-driven decisions.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {problemItems.map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full card-gradient border-none shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 text-primary">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center max-w-3xl mx-auto mt-12 md:mt-16"
                >
                    <p className="text-lg font-medium text-primary">
                        TalentSleuth AI analyzes resumes with unmatched precision, validates candidate claims, scores technical and soft skills, and matches candidates to roles with unprecedented accuracy.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}