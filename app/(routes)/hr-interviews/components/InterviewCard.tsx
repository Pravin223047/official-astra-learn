import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
    interviewId,
    userId,
    role,
    type,
    techstack,
    createdAt,
}: InterviewCardProps) => {
    const feedback =
        userId && interviewId
            ? await getFeedbackByInterviewId({ interviewId, userId })
            : null;

    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

    const badgeColor = {
        Behavioral: "bg-emerald-500 text-white",
        Mixed: "bg-indigo-500 text-white",
        Technical: "bg-orange-500 text-white",
    }[normalizedType] || "bg-gray-500 text-white";

    const formattedDate = dayjs(
        feedback?.createdAt || createdAt || Date.now()
    ).format("MMM D, YYYY");

    return (
        <div className="relative rounded-2xl w-full min-w-[320px] max-w-full min-h-96 bg-gradient-to-br from-muted/30 to-background/40 dark:from-muted/20 dark:to-background/10 p-1 shadow-lg hover:scale-[1.01] transition-transform duration-300">
            <div className="rounded-2xl bg-white/70 dark:bg-[#121212]/80 backdrop-blur-xl p-6 flex flex-col justify-between h-full gap-8">
                {/* Badge */}
                <div
                    className={cn(
                        "absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-sm font-medium capitalize shadow-md",
                        badgeColor
                    )}
                >
                    {normalizedType}
                </div>

                {/* Top Section */}
                <div>
                    {/* Cover Image */}
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover"
                        width={90}
                        height={90}
                        className="rounded-full object-cover size-[90px] shadow-md"
                    />

                    {/* Title */}
                    <h3 className="mt-5 text-lg font-semibold capitalize text-foreground">
                        {role} Role Interview
                    </h3>

                    {/* Date & Score */}
                    <div className="flex gap-5 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Image src="/calendar.svg" width={20} height={20} alt="calendar" />
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src="/star.svg" width={20} height={20} alt="star" />
                            <p>{feedback?.totalScore ?? "---"}/100</p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="line-clamp-2 mt-4 text-sm text-foreground">
                        {feedback?.finalAssessment ||
                            "Ready to level up? Take this interview and see how you shine!"}
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-auto">
                    <DisplayTechIcons techStack={techstack} />

                    <Link
                        href={
                            feedback
                                ? `/hr-interviews/interview/${interviewId}/feedback`
                                : `/hr-interviews/interview/${interviewId}`
                        }
                    >
                        <Button className="btn-primary transition duration-300 hover:scale-105">
                            {feedback ? "View Performance" : "Start Interview"}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;
