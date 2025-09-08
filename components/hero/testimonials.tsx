"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sushrut Mhetras",
        role: "Engineering Student",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80",
        content: "The AI-powered mock interviews helped me prepare for my residency interviews. Incredible tool!",
    },
    {
        name: "Ritesh Kshirsagar",
        role: "Language Learner",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80",
        content: "Learning a new language has never been easier. The AI voice assistant is like having a native speaker available 24/7.",
    },
    {
        name: "Shrutika Bansode",
        role: "Software Engineer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&q=80",
        content: "The focus mode and meditation features have significantly improved my productivity and learning retention.",
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What we aim for our customers to say
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our users have shared their experiences with Astra Learn, highlighting the transformative impact of our AI-powered learning and interview prep suite.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="p-6 h-full group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="flex items-center gap-4 mb-4">
                                    <Avatar>
                                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{testimonial.name}</h3>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-primary text-primary"
                                        />
                                    ))}
                                </div>

                                <p className="text-muted-foreground">{testimonial.content}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}