import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    BrainCircuit,
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export function Footer() {
    return (
        <footer className="bg-muted/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <BrainCircuit className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">TalentSleuth AI</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            The Autonomous Candidate Intelligence Engine. Revolutionizing recruitment through AI-powered analysis and matching.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#" aria-label="Facebook">
                                    <Facebook className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#" aria-label="Twitter">
                                    <Twitter className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#" aria-label="LinkedIn">
                                    <Linkedin className="h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#features" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#how-it-works" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="#why-it-matters" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    Why It Matters
                                </Link>
                            </li>
                            <li>
                                <Link href="#bonus-features" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    Bonus Features
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-lg mb-4">Contact Us</h3>
                        <div className="flex items-start space-x-3">
                            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <span className="text-sm">contact@talentsleuth.ai</span>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <span className="text-sm">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <span className="text-sm">123 AI Boulevard, San Francisco, CA 94107</span>
                        </div>
                        <div className="pt-2">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} TalentSleuth AI. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Privacy
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Terms
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}