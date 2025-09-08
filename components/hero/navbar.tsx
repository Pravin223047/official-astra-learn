"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle"; // Keep as Client Component
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const { isSignedIn } = useUser();
    const router = useRouter();
    return (
        <nav className="fixed w-full z-50 top-0 px-4 lg:px-8 py-4 backdrop-blur-lg border-b shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold">Astra Learn</span>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Hydration Warning Suppression for Theme Toggle */}
                    <div suppressHydrationWarning>
                        <ThemeToggle />
                    </div>

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
                </div>
            </div>
        </nav>
    );
}
