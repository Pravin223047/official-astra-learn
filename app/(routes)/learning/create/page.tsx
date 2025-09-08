"use client";

import { motion } from "framer-motion";
import { Heart, Loader, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import SelectOptions from "../_components/SelectOptions";
import Pricing from "../_components/Pricing";
import { Button } from "@/components/ui/button";
import TopicInput from "../_components/TopicInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const motivationalQuotes = [
    "Every step forward is a victory worth celebrating! 🌟",
    "Your dedication to learning inspires us! Keep shining! ✨",
    "Small progress each day adds up to big results! 🎯",
    "You're not just learning, you're transforming! 🦋",
];

export default function CreateLearningComponent() {
    const [mounted, setMounted] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const { user } = useUser();

    const handleUserInput = (fieldName: string, fieldValue: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: fieldValue,
        }));
    };

    const GenerateCourseOutline = async () => {
        try {
            setLoading(true);

            const courseId = uuidv4();
            const payload = {
                courseId,
                ...formData,
                createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
            };

            const response = await axios.post("/api/generate-course-outline", payload);

            console.log("Course Outline Result:", response.data);
            router.replace("/learning");
            toast.success("Course outline generated successfully!");
        } catch (error) {
            toast.error("Failed to generate course outline.");
            console.error("Error generating course outline:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="h-8 w-8 text-purple-500 animate-bounce" />
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            Welcome back, {user?.fullName}!
                        </h1>
                        <Sparkles className="h-8 w-8 text-purple-500 animate-bounce" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground"
                    >
                        {motivationalQuotes[quoteIndex]}
                    </motion.p>
                </motion.div>

                <Pricing />

                <div className="mt-10">
                    {step === 0 ? (
                        <SelectOptions setSelectedType={(value) => handleUserInput("courseType", value)} />
                    ) : (
                        <TopicInput
                            setTopic={(value) => handleUserInput("topic", value)}
                            setDifficulty={(value) => handleUserInput("difficultyLevel", value)}
                        />
                    )}
                </div>

                <div className="flex justify-between w-full mt-10">
                    {step > 0 && (
                        <Button variant="outline" className="px-6 py-2" onClick={() => setStep(step - 1)}>
                            Previous
                        </Button>
                    )}
                    {step === 0 ? (
                        <Button onClick={() => setStep(step + 1)} className="px-6 py-2 ml-auto">
                            Next
                        </Button>
                    ) : (
                        <Button
                            onClick={GenerateCourseOutline}
                            className="px-6 py-2 ml-auto"
                            disabled={loading}
                        >
                            {loading ? <Loader className="animate-spin" /> : "Generate"}
                        </Button>
                    )}
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ delay: 0.7 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                        <span className="text-sm">Made with ❤️ for your learning journey</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
