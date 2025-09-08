"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Check,
    BarChart3,
    Users,
    AlertTriangle,
    ShieldCheck,
    BrainCircuit,
    ArrowRight,
} from "lucide-react";

const featureItems = [
    {
        title: "Resume Parsing",
        description: "Extract and analyze candidate information with 99.8% accuracy using advanced NLP.",
        icon: <FileText className="h-6 w-6" />,
        badge: "Core",
        learnMore: "#",
    },
    {
        title: "Online Verification",
        description: "Automatically verify candidate claims through digital footprint analysis.",
        icon: <Check className="h-6 w-6" />,
        badge: "Core",
        learnMore: "#",
    },
    {
        title: "Fitment Scoring",
        description: "Quantifiable assessment of technical and soft skills for each role requirement.",
        icon: <BarChart3 className="h-6 w-6" />,
        badge: "Core",
        learnMore: "#",
    },
    {
        title: "Role Matching",
        description: "AI-powered matching between candidate profiles and job descriptions.",
        icon: <Users className="h-6 w-6" />,
        badge: "Core",
        learnMore: "#",
    },
    {
        title: "Red Flag Detection",
        description: "Identify inconsistencies and potential issues in candidate applications.",
        icon: <AlertTriangle className="h-6 w-6" />,
        badge: "Advanced",
        learnMore: "#",
    },
    {
        title: "Bias Reduction",
        description: "Algorithms designed to minimize unconscious bias in the selection process.",
        icon: <ShieldCheck className="h-6 w-6" />,
        badge: "Advanced",
        learnMore: "#",
    },
];

export function FeaturesGrid() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        <section id="features" className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <div className="flex items-center justify-center mb-4">
                        <BrainCircuit className="text-primary h-8 w-8 mr-2" />
                        <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
                    </div>
                    <p className="text-lg text-muted-foreground">
                        TalentSleuth AI combines powerful technologies to transform your recruitment process from start to finish.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {featureItems.map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full border shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center text-primary">
                                            {item.icon}
                                        </div>
                                        <Badge variant={item.badge === "Core" ? "default" : "outline"}>
                                            {item.badge}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl mt-4">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="ghost" size="sm" className="gap-1 hover:gap-2 transition-all p-0" asChild>
                                        <a href={item.learnMore}>
                                            Learn more <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}