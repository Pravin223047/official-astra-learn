"use client"

import {
    Facebook,
    Twitter,
    Linkedin,
    Github,
    Mail,
    Blocks,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-background border-t border-border w-full z-50 pt-16 overflow-hidden"
        >
            {/* Glowing Background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/10 via-blue-500/10 to-pink-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                {/* CTA Newsletter
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-muted/30 border border-border backdrop-blur-sm rounded-2xl p-8 mb-16 text-center shadow-md"
                >
                    <h2 className="text-2xl font-bold mb-2 text-foreground">
                        Stay in the Loop ✨
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Subscribe to our newsletter for updates, releases, and tips.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg mx-auto">
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full"
                        />
                        <Button size="lg" className="w-full sm:w-auto">
                            <Mail className="h-4 w-4 mr-2" /> Subscribe
                        </Button>
                    </div>
                </motion.div> */}

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 justify-around gap-10 pb-12 text-sm">
                    {/* Logo & Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-foreground font-bold text-xl">
                            <Image
                                src="/logo.png"
                                alt="Astra Learn Logo"
                                width={36}
                                height={36}
                                className="rounded-full"
                            />
                            Astra Learn
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Learn programming, master frameworks, and ace your interviews
                            with our AI-powered LMS.
                        </p>
                        <div className="flex gap-4 mt-4">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Link href="#" aria-label="social" className="hover:text-foreground transition-colors">
                                        <Icon className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="flex flex-col gap-2 justify-center">
                        <h4 className="font-semibold text-foreground mb-1">Product</h4>
                        <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                            Pricing
                        </Link>
                        <Link href="/credits" className="text-muted-foreground hover:text-foreground transition-colors">
                            Buy Credits
                        </Link>
                        <Link href="/integrations" className="text-muted-foreground hover:text-foreground transition-colors">
                            Integrations
                        </Link>
                    </div>

                    {/* Company Info */}
                    <div className="flex flex-col gap-2 justify-center">
                        <h4 className="font-semibold text-foreground mb-1">Company</h4>
                        <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                            About Us
                        </Link>
                        <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                            Blog
                        </Link>
                        <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                            Careers
                        </Link>
                        <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Legal & Support */}
                    <div className="flex flex-col gap-2 justify-center">
                        <h4 className="font-semibold text-foreground mb-1">Legal & Support</h4>
                        <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                            Help Center
                        </Link>
                        <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground pb-6">
                    <span>&copy; {currentYear} Team BrainWave. All rights reserved.</span>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">
                            Terms
                        </Link>
                        <Link href="/support" className="hover:text-foreground transition-colors">
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}
