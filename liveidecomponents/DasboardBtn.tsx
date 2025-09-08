"use client";

import Link from "next/link";

import { SparklesIcon } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";

function DasboardBtn() {
    const { isCandidate, isLoading } = useUserRole();

    if (isCandidate || isLoading) return null;

    return (
        <Link href={"/live-ide/admin-dashboard"}>
            <Button className="gap-2 font-medium" size={"sm"}>
                <SparklesIcon className="size-4" />
                Dashboard
            </Button>
        </Link>
    );
}
export default DasboardBtn;