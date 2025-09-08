import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();

    if (isUserAuthenticated) {
        redirect("/hr-interviews");
    }

    return (
        <div className="flex items-center justify-center h-full px-4 py-8 sm:px-6 lg:px-8 bg-background text-foreground transition-colors duration-300">
            <div className="w-full max-w-2xl rounded-xl shadow-lg bg-card p-1 xl:p-8 border border-border">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
