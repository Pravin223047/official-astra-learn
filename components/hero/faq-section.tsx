"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How does the AI voice assistant work?",
        answer:
            "Our AI voice assistant leverages cutting-edge natural language processing to understand and respond to your questions in real time. It adapts its teaching approach based on your learning preferences to provide personalized support.",
    },
    {
        question: "Can I practice mock interviews anytime?",
        answer:
            "Absolutely! Our mock interview feature is accessible 24/7, offering real-time AI feedback, personalized tips, and performance tracking to help you improve your interview skills at your own pace.",
    },
    {
        question: "Which languages can I learn on the platform?",
        answer:
            "You can choose from English, Spanish, French, German, Chinese, and Japanese. Each course includes AI-guided pronunciation correction, vocabulary practice, and real-world conversation scenarios.",
    },
    {
        question: "How does the meditation feature help with studying?",
        answer:
            "Focus Mode blends mindfulness techniques with adaptive AI-generated ambient soundscapes. It helps you maintain focus during long study sessions and recommends optimal break times based on your attention span.",
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

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function FAQSection() {
    return (
        <section id="faq" className="py-24 bg-muted/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions? We're here to help you make the most of our AI-powered learning experience.
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-3xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <AccordionItem value={`item-${index}`} className="mb-4 border border-border rounded-xl overflow-hidden transition-all">
                                    <AccordionTrigger className="text-left text-base md:text-lg font-medium px-4 py-3 hover:bg-muted transition-colors duration-300">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 py-2 text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
