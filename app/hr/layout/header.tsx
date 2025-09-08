"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseIcon, UserIcon, MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const mainNavItems = [
    {
        title: "Candidates",
        href: "/",
        icon: UserIcon,
    },
    {
        title: "Jobs",
        href: "/jobs",
        icon: BriefcaseIcon,
    },
];

export function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-200",
                isScrolled
                    ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                    : "bg-transparent"
            )}
        >
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="hidden items-center space-x-2 md:flex">
                        <UserIcon className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block">
                            HR Dashboard
                        </span>
                    </Link>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-2 md:hidden"
                                aria-label="Toggle Menu"
                            >
                                <MenuIcon className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <SheetHeader className="mb-4">
                                <SheetTitle>Menu</SheetTitle>
                                <SheetDescription>
                                    Navigation options for HR Dashboard
                                </SheetDescription>
                            </SheetHeader>
                            <nav className="grid gap-2 py-4">
                                {mainNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 text-sm font-medium",
                                            pathname === item.href
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-primary/5"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" aria-hidden="true" />
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <nav className="hidden md:flex md:gap-4">
                        {mainNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                                )}
                            >
                                <item.icon className="mr-1 h-4 w-4" aria-hidden="true" />
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}