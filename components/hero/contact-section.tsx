"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialIcons = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Linkedin, label: "LinkedIn" },
];

export function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-muted/50 border-t">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Reach out to us and our
                        team will get back to you as soon as possible.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto bg-background border border-border dark:border-gray-700 p-10 rounded-3xl shadow-xl"
                >
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center justify-center text-center"
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                            Contact Us
                        </h3>
                        <p className="text-lg text-muted-foreground">
                            contact@dummyemail.com
                        </p>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center justify-center"
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                            Connect With Us
                        </h3>
                        <div className="flex gap-6">
                            {socialIcons.map(({ icon: Icon, label }, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Button
                                        aria-label={label}
                                        variant="ghost"
                                        size="icon"
                                        className="group transition-all duration-300"
                                    >
                                        <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
