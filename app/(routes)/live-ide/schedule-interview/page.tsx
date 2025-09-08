"use client";


import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";

import WebsiteLoader from "@/components/Loader";
import InterviewScheduleUI from "./InterviewScheduleUI";

function SchedulePage() {
    const router = useRouter();

    const { isInterviewer, isLoading } = useUserRole();

    if (isLoading) return <WebsiteLoader />;
    if (!isInterviewer) return router.push("/");

    return <InterviewScheduleUI />;
}
export default SchedulePage;