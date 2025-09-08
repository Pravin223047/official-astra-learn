"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    BrainCircuit,
    Menu,
    X,
} from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";

const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Why It Matters", href: "#why-it-matters" },
    { name: "Bonus Features", href: "#bonus-features" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
                ? "bg-background/80 backdrop-blur-md shadow-sm"
                : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <BrainCircuit className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">TalentSleuth AI</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            {isSignedIn ? (
                                <>
                                    <Button variant={"default"} className="text-black bg-white hover:bg-white/80 cursor-pointer" onClick={() => router.push("/dashboard")}>Dashboard</Button>
                                    <UserButton />
                                </>
                            ) : (
                                <>
                                    <span className="text-black dark:text-white bg-white dark:bg-purple-950 px-6 dark:hover:text-gray-100 hover:text-gray-900 p-2 rounded-md cursor-pointer">
                                        <SignInButton />
                                    </span>
                                    <span className="bg-violet-600 text-white p-2 rounded-md hover:bg-violet-700 font-semibold cursor-pointer">
                                        <SignUpButton />
                                    </span>
                                </>
                            )}
                        </div>
                        <div suppressHydrationWarning>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="ml-2"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <motion.div
                    className="md:hidden bg-background/95 backdrop-blur-md"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-2 text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col space-y-3">
                            <Button variant="outline" size="sm" className="w-full justify-center">
                                Book Demo
                            </Button>
                            <Button size="sm" className="w-full justify-center">
                                Try Now
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}