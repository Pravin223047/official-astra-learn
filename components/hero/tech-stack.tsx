"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const technologies = [
    {
        name: "Next.js",
        icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png",
        description: "React framework for server-side rendering, routing, and scalability.",
    },
    {
        name: "TypeScript",
        icon: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png",
        description: "Strongly typed JavaScript for safer and more predictable code.",
    },
    {
        name: "Tailwind CSS",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDKn3vA2YUbXzN0ZC3gALWJ08gJN-Drl15w&s",
        description: "Utility-first CSS framework for fast, responsive UI design.",
    },
    {
        name: "shadcn/ui",
        icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4",
        description: "Accessible and customizable UI components built with Radix and Tailwind.",
    },
    {
        name: "Framer Motion",
        icon: "https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png",
        description: "Motion library for seamless animations and micro-interactions.",
    },
    {
        name: "Node.js",
        icon: "https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png",
        description: "JavaScript runtime environment for scalable server-side logic.",
    },
    {
        name: "Convex",
        icon: "https://avatars.githubusercontent.com/u/81530787?v=4",
        description: "Real-time backend-as-a-service with reactive data and APIs.",
    },
    {
        name: "Firebase",
        icon: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
        description: "Cloud platform for hosting, authentication, and real-time databases.",
    },
    {
        name: "Vapi",
        icon: "https://vapi.ai/favicon.ico",
        description: "Conversational AI APIs for voice and chat integration.",
    },
    {
        name: "Lemon Squeezy",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIWm8Ii4M4dO3OkunUpQf1M1G_6_z6jlVzyQ&",
        description: "Developer-first platform for payments and digital product licensing.",
    },
    {
        name: "GetStream.io",
        icon: "https://assets.eaglestatus.io/services/getstream-io.png",
        description: "Feeds and chat infrastructure for scalable social features.",
    },
    {
        name: "Google Gemini AI",
        icon: "https://logowik.com/content/uploads/images/google-ai-gemini91216.logowik.com.webp",
        description: "Google’s advanced multimodal AI for reasoning and content generation.",
    },
    {
        name: "Clerk",
        icon: "https://pipedream.com/s.v0/app_dBhw8k/logo/orig",
        description: "Authentication and user management with complete session control.",
    },
    {
        name: "Inngest",
        icon: "https://awsmp-logos.s3.amazonaws.com/seller-umsabrkhu7oja/29dbd723d149c0da6cc594f6d17053f3.png",
        description: "Event-driven workflows for serverless functions and background jobs.",
    },
    {
        name: "MongoDB",
        icon: "https://www.svgrepo.com/show/331488/mongodb.svg",
        description: "Flexible NoSQL database designed for scalability and developer agility.",
    },
    {
        name: "Prisma",
        icon: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4",
        description: "Next-gen ORM for building robust and type-safe database queries.",
    },
];

export function TechStack() {
    return (
        <section id="tech-stack" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Powered by Modern Technology
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Built with the latest and most reliable technologies to ensure the best
                        learning experience.
                    </p>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/40 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                        >
                            <div className="relative w-16 h-16 mb-4">
                                <Image
                                    src={tech.icon}
                                    alt={tech.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">{tech.name}</h3>
                            <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}