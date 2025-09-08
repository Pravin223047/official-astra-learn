import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
    getFeedbackByInterviewId,
    getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
    const { id } = await params;
    const user = await getCurrentUser();

    const interview = await getInterviewById(id);
    if (!interview) redirect("/hr-interviews");

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    });

    return (
        <section className="flex flex-col gap-12 max-w-6xl mx-auto px-6 py-14 text-base leading-relaxed text-muted-foreground animate-fade-in">
            {/* Title */}
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                    Interview Feedback –{" "}
                    <span className="capitalize text-primary">{interview.role}</span>
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">Detailed analysis of your performance</p>
            </div>

            {/* Summary Info */}
            <div className="flex flex-wrap justify-center gap-6 bg-card shadow-sm border rounded-xl p-6">
                <div className="flex items-center gap-3">
                    <Image src="/star.svg" width={24} height={24} alt="star" />
                    <p className="font-medium text-foreground">
                        Overall Score:{" "}
                        <span className="text-primary font-bold">
                            {feedback?.totalScore}
                        </span>
                        /100
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Image src="/calendar.svg" width={24} height={24} alt="calendar" />
                    <p>{feedback?.createdAt ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A") : "N/A"}</p>
                </div>
            </div>

            {/* Final Assessment */}
            <div className="bg-background border rounded-xl p-6 shadow-sm">
                <p className="text-lg text-foreground">{feedback?.finalAssessment}</p>
            </div>

            {/* Category Breakdown */}
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-foreground">Interview Breakdown</h2>
                {feedback?.categoryScores?.map((category, index) => (
                    <div
                        key={index}
                        className="bg-muted/50 border border-muted rounded-lg p-5 shadow-sm transition hover:scale-[1.01]"
                    >
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-primary">
                                {index + 1}. {category.name}
                            </p>
                            <p className="text-sm font-medium text-foreground">{category.score}/100</p>
                        </div>
                        <p className="mt-2">{category.comment}</p>
                    </div>
                ))}
            </div>

            {/* Strengths */}
            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-green-600">✅ Strengths</h3>
                <ul className="list-disc list-inside space-y-1">
                    {feedback?.strengths?.map((strength, index) => (
                        <li key={index}>{strength}</li>
                    ))}
                </ul>
            </div>

            {/* Improvements */}
            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-red-600">⚠️ Areas for Improvement</h3>
                <ul className="list-disc list-inside space-y-1">
                    {feedback?.areasForImprovement?.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button className="rounded-full border border-input bg-background text-foreground hover:bg-accent transition-all px-6 py-3 shadow-sm">
                    <Link href="/hr-interviews" className="w-full text-center">
                        Back to Dashboard
                    </Link>
                </Button>

                <Button className="rounded-full bg-primary text-white hover:bg-primary/90 transition-all px-6 py-3 shadow-sm">
                    <Link href={`/hr-interviews/interview/${id}`} className="w-full text-center">
                        Retake Interview
                    </Link>
                </Button>
            </div>
        </section>

    );
};

export default Feedback;