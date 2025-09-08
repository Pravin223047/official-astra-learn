"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // This is where you would typically add your analytics tracking code
        // For example, Google Analytics or other analytics providers
        const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

        // Analytics tracking code would go here
        // Example: window.gtag("config", "GA-TRACKING-ID", { page_path: url });

        console.log(`Page view: ${url}`);
    }, [pathname, searchParams]);

    return null;
}