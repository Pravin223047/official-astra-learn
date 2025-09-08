"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./dashboard/components/app-sidebar"
import { ReactNode } from "react";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface OverviewLayoutProps {
    children: ReactNode;
}

export default function Page({ children }: OverviewLayoutProps) {
    const router = useRouter();
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar className="w-64 shrink-0 hidden lg:block" />
                <SidebarInset className="flex flex-1 flex-col overflow-hidden">
                    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Astra Learn</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        An AI Powered Learning & Interview Preparation platform
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="ml-auto flex gap-4 items-center justify-center">
                            <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white" onClick={() => router.push("/hr")}>HR Professional</Button>
                            <ThemeToggle />
                        </div>
                    </header>
                    <main className="overflow-scroll">
                        {children}
                        <Footer />
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
