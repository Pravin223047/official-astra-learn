"use client";

import { ArrowRight, Command, Star } from "lucide-react";
import Link from "next/link";
import NavigationHeader from "../../../../components/NavigationHeader";
import { motion } from "framer-motion";

function ProPlanView() {
    return (
        <div className="bg-white dark:bg-[#0a0a0f]">
            <NavigationHeader />

            <div className="relative px-4 h-[80vh] flex items-center justify-center">
                {/* Glow Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl rounded-full -translate-x-1/2 -z-10" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative max-w-xl mx-auto text-center"
                >
                    {/* Gradient Lines */}
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-900 dark:via-blue-500/50 to-transparent" />
                    <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-900 dark:via-purple-500/50 to-transparent" />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-500/30 dark:to-purple-500/30 blur-2xl opacity-10" />

                    {/* Card */}
                    <div className="relative bg-gray-50 dark:bg-[#12121a]/90 border border-gray-200 dark:border-gray-800/50 backdrop-blur-2xl rounded-2xl p-12 shadow-xl transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05] rounded-2xl" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="relative"
                        >
                            {/* Icon */}
                            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-500/10 dark:to-blue-500/10 mb-6 ring-1 ring-gray-200 dark:ring-gray-800/60 animate-pulse">
                                <Star className="w-8 h-8 text-purple-400 dark:text-purple-300" />
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-4">
                                You're Powered by Pro
                            </h1>
                            <p className="text-gray-900 dark:text-gray-400 mb-8 text-lg">
                                Unlock limitless creation with premium features, faster performance, and enhanced productivity.
                            </p>

                            {/* CTA Button */}
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
                            >
                                <Command className="w-5 h-5 text-white opacity-80" />
                                <span className="font-medium">Launch Editor</span>
                                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default ProPlanView;
