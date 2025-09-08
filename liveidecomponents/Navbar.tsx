import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";

function Navbar() {
    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4 mx-auto">
                {/* LEFT SIDE -LOGO */}
                <Link
                    href="/live-ide"
                    className="flex items-center gap-2 font-semibold text-2xl font-mono hover:opacity-80 transition-opacity"
                >
                    <CodeIcon className="size-8 text-blue-500" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                        Astra Learn - Live IDE for HR Interview
                    </span>
                </Link>

                {/* RIGHT SIDE - ACTIONS */}
                <SignedIn>
                    <div className="flex items-center space-x-4 ml-auto">
                        <DasboardBtn />
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}
export default Navbar;