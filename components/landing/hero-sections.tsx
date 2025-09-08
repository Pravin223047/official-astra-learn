"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function HeroSection() {
    const router = useRouter();
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme.theme === 'dark';
    return (
        <section className="relative pt-20 overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.1),transparent)]"></div>
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 py-16 md:py-20 lg:py-32">
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            The{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                Autonomous
                            </span>{" "}
                            Candidate Intelligence Engine
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Transform your recruitment process with AI that finds the perfect candidates by analyzing, verifying, and scoring with unprecedented accuracy.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <Button size="lg" className="text-md px-8" onClick={() => router.push("/dashboard")}>
                                Try Now
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-md px-8"
                            >
                                Book Demo
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex-1 relative"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-3xl blur-3xl"></div>
                        <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-2xl">
                            {mounted && (
                                <img
                                    src={isDark ? "/talentsleuth.png" : "/talentsleuth.png"}
                                    alt="Astra Learn Platform"
                                    className="rounded-xl shadow-2xl h-[400px] w-auto"
                                />
                            )}
                            <div className="absolute -right-4 -bottom-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Astra Learn</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Real-time, scenario-based hr sessions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}