"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const stats = [
    {
        value: "87%",
        label: "Reduction in time-to-hire",
        description: "Companies using TalentSleuth AI report significantly faster hiring cycles.",
    },
    {
        value: "92%",
        label: "Improvement in candidate quality",
        description: "More precise matching leads to better hires and longer retention.",
    },
    {
        value: "5.4x",
        label: "Return on investment",
        description: "The average ROI for organizations using TalentSleuth AI.",
    },
    {
        value: "99.8%",
        label: "Data extraction accuracy",
        description: "Industry-leading precision in parsing and analyzing resumes.",
    },
];

const testimonials = [
    {
        quote: "I never knew recruitment could feel this intuitive and powerful—these bonus tools are game-changers!",
        author: "Urjeeta Kasabe",
        role: "Head of Talent Acquisition",
        company: "TechGlobal Inc.",
        image: "https://images.pexels.com/photos/3760610/pexels-photo-3760610.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    {
        quote: "It felt like unwrapping smart features I didn’t even know I needed—this makes hiring feel futuristic!",
        author: "Sumit Bhasagi",
        role: "Chief People Officer",
        company: "Innovate Solutions",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
];

export function StatsSection() {
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
        <section id="why-it-matters" className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why It Matters</h2>
                    <p className="text-lg text-muted-foreground">
                        TalentSleuth AI delivers measurable results that transform your recruitment process and your business.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full border shadow-md hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                                    <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <Separator className="my-8 md:my-16" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">What we aim for our customers to say</h3>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full border shadow-md bg-card/80 backdrop-blur-sm overflow-hidden">
                                <CardContent className="p-6">
                                    <p className="italic text-lg mb-6">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{testimonial.author}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}, {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}