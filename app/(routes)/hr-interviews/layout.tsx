import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col w-full px-4 mx-auto my-6 gap-10">
            <nav className="flex items-center gap-4 py-4 border-b border-border/30 dark:border-border/20">
                <Link href="/hr-interviews" className="flex items-center gap-3 hover:opacity-90 transition">
                    <Image
                        src="/logo.png"
                        alt="Astra Learn Logo"
                        width={38}
                        height={32}
                        className="rounded-sm"
                    />
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        Astra Learn AI <span className="text-muted-foreground">/ HR Interviews</span>
                    </h2>
                </Link>
            </nav>

            <main className="flex-1">{children}</main>
        </div>
    );
};

export default Layout;
