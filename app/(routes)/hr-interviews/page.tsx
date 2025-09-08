import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "./components/InterviewCard";

import {
    getInterviewsByUserId,
    getLatestInterviews,
} from "@/lib/actions/general.action";

import { getCurrentUser } from "@/lib/actions/auth.action";
import { dummyInterviews } from "../../../hrinterviewconstants";

async function Home() {
    const user = await getCurrentUser();

    const [userInterviews, allInterview] = await Promise.all([
        getInterviewsByUserId(user?.id!),
        getLatestInterviews({ userId: user?.id! }),
    ]);

    const hasPastInterviews = userInterviews?.length! > 0;
    const hasUpcomingInterviews = allInterview?.length! > 0;

    return (
        <>
            {/* Hero Section */}
            <section className="flex flex-col-reverse w-full lg:flex-row bg-gradient-to-b from-muted to-background rounded-3xl px-8 py-6 items-center justify-between gap-6 max-sm:px-4 transition-colors">
                <div className="flex flex-col gap-6 max-w-xl">
                    <h2 className="text-3xl font-bold text-foreground">
                        Get Interview-Ready with AI-Powered Practice & Feedback
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Practice real interview questions and get instant, actionable feedback.
                    </p>

                    <Button
                        asChild
                        className="w-fit rounded-full font-bold px-5 cursor-pointer min-h-10 bg-primary text-primary-foreground hover:bg-primary/80 max-sm:w-full"
                    >
                        <Link href="/hr-interviews/interview">Start an Interview</Link>
                    </Button>
                </div>

                <Image
                    src="/robot.png"
                    alt="Interview Bot"
                    width={400}
                    height={400}
                    className="hidden lg:block"
                />
            </section>

            {/* User's Interviews */}
            <section className="flex flex-col gap-6 mt-12 w-full">
                <h2 className="text-2xl font-semibold text-foreground">Your Interviews</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                    {hasPastInterviews ? (
                        userInterviews?.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                userId={user?.id}
                                interviewId={interview.id}
                                role={interview.role}
                                type={interview.type}
                                techstack={interview.techstack}
                                createdAt={interview.createdAt}
                            />
                        ))
                    ) : (
                        <p className="text-muted-foreground">You haven&apos;t taken any interviews yet.</p>
                    )}
                </div>
            </section>

            {/* Available Interviews */}
            <section className="flex flex-col gap-6 mt-12 w-full">
                <h2 className="text-2xl font-semibold text-foreground">Take Interviews</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                    {hasUpcomingInterviews ? (
                        allInterview?.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                userId={user?.id}
                                interviewId={interview.id}
                                role={interview.role}
                                type={interview.type}
                                techstack={interview.techstack}
                                createdAt={interview.createdAt}
                            />
                        ))
                    ) : (
                        <p className="text-muted-foreground">There are no interviews available at the moment.</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Home;
