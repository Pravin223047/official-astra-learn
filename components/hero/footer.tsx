"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const footerLinks = {
    Product: [
        { name: "Features", href: "#features" },
        { name: "AI Voice Assistant", href: "#ai-voice" },
        { name: "Mock Interview", href: "#mock-interview" },
        { name: "Language Learning", href: "#language" },
        { name: "Meditation", href: "#meditation" },
    ],
    Company: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Blog", href: "#blog" },
        { name: "Press", href: "#press" },
    ],
    Legal: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
    ],
    Support: [
        { name: "Help Center", href: "#help" },
        { name: "Contact", href: "#contact" },
        { name: "FAQ", href: "#faq" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-muted/50 border-t pt-16 pb-8">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10"
                >
                    {/* Brand Info */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">Astra Learn</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Transforming education through AI-powered learning experiences.
                        </p>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([category, links], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                        >
                            <h4 className="font-semibold text-base mb-4 text-foreground">
                                {category}
                            </h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4"
                >
                    <p>© 2025 Astra Learn AI. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link
                            href="#privacy"
                            className="hover:text-primary transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#terms"
                            className="hover:text-primary transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="#cookies"
                            className="hover:text-primary transition-colors"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
