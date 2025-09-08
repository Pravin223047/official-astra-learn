'use client';

import { Button } from '@/components/ui/button';
import { Brain, ChevronRight, LineChart, MessageSquare, Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const HeroSection = () => {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme.theme === 'dark';
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
            {/* Background Patterns */}
            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_85%)]" />

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 animate-float">
                    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl p-3 shadow-lg">
                        <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
                <div className="absolute top-40 right-32 animate-float-delayed">
                    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl p-3 shadow-lg">
                        <LineChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </div>
                <div className="absolute bottom-32 left-24 animate-float">
                    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-xl p-3 shadow-lg">
                        <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-0">
                    {/* Left Column - Text Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 text-sm text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-white/10">
                                <Brain className="w-4 h-4" />
                                <span>AI-Powered Learning Platform</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                                Master Skills.
                                <br />
                                Ace Interviews.
                                <br />
                                <span className="text-blue-700 dark:text-blue-400">Land Your Dream Job.</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-300">
                                Personalized learning paths and interview preparation, powered by advanced AI to match your unique career goals.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                                Get Started
                                <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                                Explore Features
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                            <div className="flex -space-x-2">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face"
                                    alt="User 1"
                                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face"
                                    alt="User 2"
                                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
                                    alt="User 3"
                                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
                                    alt="User 4"
                                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900"
                                />
                            </div>
                            <p className="text-sm">
                                Join <span className="font-semibold">10,000+</span> professionals accelerating their careers
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Visual */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-3xl blur-3xl"></div>
                        <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-2xl">
                            {mounted && (
                                <img
                                    src={isDark ? "/HeroDarkMode.png" : "/LightModeHero.png"}
                                    alt="Astra Learn Platform"
                                    className="rounded-xl shadow-2xl"
                                />
                            )}
                            <div className="absolute -right-4 -bottom-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">AI Analysis</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Personalizing your path...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;