
import { SignedOut } from "@clerk/nextjs";
import { Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import HeaderProfileBtn from "../app/(routes)/code-editor/components/HeaderProfileButton";
import Image from "next/image";

function NavigationHeader() {
    return (
        <div className="sticky top-0 z-50 w-full border-b border-gray-100 bg-gray-50 dark:border-gray-800/50 dark:bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
            <div className="mx-auto px-4">
                <div className="relative h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group relative">
                            {/* logo hover effect */}
                            <div
                                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
                            />

                            {/* Logo */}
                            <div className="relative bg-gradient-to-br from-[#fdfdff] to-[#fbfbff] ring-white/80 group-hover:ring-white/90 dark:from-[#1a1a2e] dark:to-[#0a0a0f] p-2 rounded-xl ring-1 dark:ring-white/10 dark:group-hover:ring-white/20 transition-all">
                                <Image src="/logo.png" alt="Logo" width={32} height={32} className="h-8 w-8 bg-white rounded-md" />
                            </div>

                            <div className="relative">
                                <span
                                    className="block text-lg font-semibold bg-gradient-to-r from-blue-800 via-blue-800 to-purple-800
                 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 text-transparent bg-clip-text"
                                >
                                    Astra Learn
                                </span>
                                <span className="block text-xs text-blue-900/60 dark:text-blue-400/60 font-medium">
                                    Interactive Code Editor
                                </span>
                            </div>
                        </Link>

                        {/* snippets Link */}
                        <Link
                            href="/snippets"
                            className="relative group flex items-center gap-2 px-8 py-2.5 rounded-lg text-gray-800 dark:text-gray-300 bg-gray-100/90 dark:bg-gray-800/50  hover:bg-blue-500/10 
              border border-gray-200 dark:border-gray-800 hover:border-blue-900/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-blue-100/90 
              to-purple-200/90 dark:from-blue-500/10 
              dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                            <span className="text-sm font-medium relative z-10 group-hover:text-black dark:group-hover:text-white transition-colors">
                                Snippets
                            </span>
                        </Link>
                    </div>

                    {/* right rection */}
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <Link
                                href="/pricing"
                                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20
                 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                duration-300"
                            >
                                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                                    Pro
                                </span>
                            </Link>
                        </SignedOut>

                        {/* profile button */}
                        <HeaderProfileBtn />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavigationHeader;