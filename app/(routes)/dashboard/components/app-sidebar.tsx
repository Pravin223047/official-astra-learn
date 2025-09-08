"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { title } from "process"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "AI-Based HR Interviews",
                    url: "/hr-interviews/sign-in",
                },
                {
                    title: "Live IDE for HR Interviews",
                    url: "/live-ide",
                },
                {
                    title: "Smart Code Editor",
                    url: "/code-editor",
                },
                {
                    title: "Real Time Technology Book",
                    url: "/tech-stack",
                },
                {
                    title: "AI-Powered Learning",
                    url: "/learning",
                },
                {
                    title: "AI Resume Builder",
                    url: "/resume-builder",
                },
                {
                    title: "AI Resume Parser",
                    url: "/resume-parsing",
                }
            ],
        },
        {
            title: "Smart Code Editor",
            url: "/code-editor",
            icon: Bot,
            items: [
                {
                    title: "Code Editor",
                    url: "/code-editor",
                },
                {
                    title: "Snippets",
                    url: "/snippets",
                },
                {
                    title: "Pricing",
                    url: "/pricing",
                },
                {
                    title: "Profile",
                    url: "/profile",
                },
            ],
        },
        // {
        //     title: "Documentation",
        //     url: "#",
        //     icon: BookOpen,
        //     items: [
        //         {
        //             title: "Introduction",
        //             url: "#",
        //         },
        //         {
        //             title: "Get Started",
        //             url: "#",
        //         },
        //         {
        //             title: "Tutorials",
        //             url: "#",
        //         },
        //         {
        //             title: "Changelog",
        //             url: "#",
        //         },
        //     ],
        // },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "/settings",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "/billing",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "/feedback",
            icon: Send,
        },
    ],
    // projects: [
    //     {
    //         name: "Design Engineering",
    //         url: "#",
    //         icon: Frame,
    //     },
    //     {
    //         name: "Sales & Marketing",
    //         url: "#",
    //         icon: PieChart,
    //     },
    //     {
    //         name: "Travel",
    //         url: "#",
    //         icon: Map,
    //     },
    // ],
}

interface Langauge {
    id: string;
    languagepromptId: string;
    languageTitle: string;
    languagePrompt: string;
    languageType: string;
    ageGroup: string;
    writingStyle: string;
    complexity: number[];
    bookCoverImage: string;
    chapterTexts: string[];
    chapterImages: string[];
    createdAt: string;
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useUser();
    const [languageData, setLanguageData] = useState<Langauge[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchLangauges = async () => {
            try {
                const response = await fetch("/api/get-promptlangauge-by-userId");
                if (!response.ok) {
                    throw new Error("Failed to fetch languages");
                }
                const data = await response.json();
                console.log("Fetched languages:", data);
                setLanguageData(data.languages);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchLangauges();
    }, []);
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white overflow-hidden text-sidebar-primary-foreground">
                                    <Image src="/logo.png" alt="Logo" width={32} height={32} className="h-8 w-8" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Astra Learn</span>
                                    <span className="truncate text-xs">An AI Powered Learning & Interview Preparation Platform</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {languageData && <NavProjects projects={languageData} />}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name: user.user?.fullName || "",
                    email: user.user?.emailAddresses[0].emailAddress || "",
                    avatar: user.user?.imageUrl || "/logo.png",
                }} />
            </SidebarFooter>
        </Sidebar>
    )
}
