"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Zap, ChartBar, Clock, Shield, Star, User, Rocket } from "lucide-react";

const benefits = [
    {
        icon: Brain,
        title: "AI-Powered Insights",
        description: "Receive personalized learning recommendations based on your progress, powered by advanced AI algorithms.",
    },
    {
        icon: Zap,
        title: "Instant Feedback",
        description: "Get real-time feedback on your performance, with actionable tips to enhance your skills immediately.",
    },
    {
        icon: ChartBar,
        title: "Smart Analytics",
        description: "Track your learning journey with detailed analytics and performance metrics to visualize your growth.",
    },
    {
        icon: Clock,
        title: "Self-Paced Learning",
        description: "Access resources 24/7, allowing you to learn at your own pace, anytime, anywhere.",
    },
    {
        icon: Shield,
        title: "Secure & Reliable",
        description: "Your data is safe with us, offering encrypted storage and 99.9% uptime reliability.",
    },
    {
        icon: Star,
        title: "Expert-Led Content",
        description: "Learn from top-tier instructors with years of industry experience and proven success in their fields.",
    },
    {
        icon: User,
        title: "Tailored Learning Paths",
        description: "Create a learning journey that matches your career goals with customized paths and curated courses.",
    },
    {
        icon: Rocket,
        title: "Accelerated Growth",
        description: "Achieve rapid learning outcomes with a combination of smart tools, expert guidance, and personalized challenges.",
    },
];

export function WhyChooseUs() {
    return (
        <section id="why-choose-us" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why Choose Astra Learn?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Experience the power of AI-driven education with our cutting-edge features
                        and personalized learning approach.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="p-6  group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="relative">
                                        <benefit.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                                        <div className="absolute -inset-2 bg-primary/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                        <p className="text-muted-foreground">{benefit.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h4 className="text-4xl font-bold text-primary mb-2">1M+</h4>
                            <p className="text-muted-foreground">Active Users</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-primary mb-2">95%</h4>
                            <p className="text-muted-foreground">Success Rate</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-primary mb-2">24/7</h4>
                            <p className="text-muted-foreground">Support</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-primary mb-2">50+</h4>
                            <p className="text-muted-foreground">AI Models</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}