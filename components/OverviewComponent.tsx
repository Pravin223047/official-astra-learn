"use client";

import {
    Activity,
    Code2,
    Star,
    FileText,
    Brain,
    UserIcon,
    Book,
    FileBadge,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import BookPreviewComponenet from "./BookPreview";

function OverviewComponent() {
    const FEATURES = [
        {
            label: "AI-Based HR Interviews",
            icon: Activity,
            color: "from-blue-500 to-cyan-500",
            gradient: "group-hover:via-blue-400",
            description: "Real-time, scenario-based hr sessions",
            href: "/hr-interviews/sign-in",
        },
        {
            label: "Live IDE for HR Interviews",
            icon: Star,
            color: "from-yellow-500 to-orange-500",
            gradient: "group-hover:via-yellow-400",
            description: "Collaborative coding & live problem solving",
            href: "/live-ide",
        },
        {
            label: "Smart Code Editor",
            icon: Code2,
            color: "from-purple-500 to-pink-500",
            gradient: "group-hover:via-purple-400",
            description: "Multi-language support with AI suggestions",
            href: "/code-editor",
        },
        {
            label: "Real Time Technology Book",
            icon: FileText,
            color: "from-rose-500 to-red-500",
            gradient: "group-hover:via-rose-400",
            description: "Interactive book with real-time coding examples",
            href: "/tech-stack",
        },
        {
            label: "AI-Powered Learning",
            icon: Book,
            color: "from-green-500 to-emerald-500",
            gradient: "group-hover:via-green-400",
            description: "Personalized learning paths & resources",
            href: "/learning",
        },
        {
            label: "AI Resume Builder",
            icon: Brain,
            color: "from-indigo-500 to-fuchsia-500",
            gradient: "group-hover:via-indigo-400",
            description: "Auto-generate industry-ready resumes",
            href: "/resume-builder",
        },
        {
            label: "AI Resume Parser",
            icon: FileBadge,
            color: "from-teal-500 to-cyan-500",
            gradient: "group-hover:via-teal-400",
            description: "Extract insights from resumes with AI",
            href: "/resume-parsing",
        },
    ];

    return (
        <div className="relative mb-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#12121a] dark:to-[#1a1a2e] rounded-2xl p-8 border border-gray-200 dark:border-gray-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />

            {/* Header */}
            <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <img
                        src="/logo.png"
                        alt="Astra Learn Logo"
                        className="w-24 h-24 rounded-full border-4 bg-white border-gray-800/50 relative z-10 group-hover:scale-105 transition-transform"
                    />
                </div>
                <div className="text-center sm:text-left">
                    <div className="flex items-center gap-3 mb-2 justify-center sm:justify-start">
                        <h1 className="text-3xl font-bold text-black dark:text-white">Astra Learn</h1>
                    </div>
                    <p className="text-gray-900 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                        <UserIcon className="w-4 h-4" />
                        AI-Powered Learning & Interview Prep Suite
                    </p>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {FEATURES.map((feature, index) => (
                    <Link href={feature.href} key={index} passHref>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-gradient-to-br from-white dark:from-black/40 dark:to-black/20 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
                        >
                            {/* Hover Glow */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-all duration-500 ${feature.gradient}`}
                            />

                            <div className="relative p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-black dark:text-white">
                                            {feature.label}
                                        </h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div
                                        className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10`}
                                    >
                                        <feature.icon className="w-5 h-5 text-black dark:text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Swipe Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                        </motion.div>
                    </Link>
                ))}
            </div>

            <BookPreviewComponenet />
        </div>
    );
}

export default OverviewComponent;
