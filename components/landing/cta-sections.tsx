"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";

export function CtaSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>

                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_400px_at_50%_50%,white,transparent)]"></div>
                    </div>

                    <div className="relative z-10 py-12 md:py-20 px-6 md:px-12 lg:px-20 text-white text-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center mb-6">
                                <BrainCircuit className="h-10 w-10 mr-2" />
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Ready to Transform Your Recruitment?</h2>
                            </div>

                            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
                                Join hundreds of forward-thinking companies using TalentSleuth AI to find the perfect candidates faster and with greater accuracy.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90 text-md px-8">
                                    Try It Free
                                </Button>
                                <Button variant="outline" size="lg" className="border-white text-black dark:text-white hover:bg-white/20 text-md px-8">
                                    Book a Demo
                                </Button>
                            </div>

                            <p className="mt-6 text-white/80 text-sm">
                                No credit card required. Free trial for 14 days.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}