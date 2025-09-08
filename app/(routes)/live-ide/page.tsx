"use client";


import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import ActionCard from "@/liveidecomponents/ActionCard";
import WebsiteLoader from "@/components/Loader";
import { QUICK_ACTIONS } from "../../../liveideconstants";
import { api } from "@/convex/_generated/api";
import MeetingModal from "@/liveidecomponents/MeetingModal";
import MeetingCard from "@/liveidecomponents/MeetingCard";

export default function Home() {
    const router = useRouter();

    const { isInterviewer, isCandidate, isLoading } = useUserRole();
    const interviews = useQuery(api.interviews.getMyInterviews);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"start" | "join">();

    const handleQuickAction = (title: string) => {
        switch (title) {
            case "Start Instant Call":
                setModalType("start");
                setShowModal(true);
                break;
            case "Join an Interview":
                setModalType("join");
                setShowModal(true);
                break;
            default:
                router.push(`/live-ide/${title.toLowerCase()}`);
        }
    };

    if (isLoading) return <WebsiteLoader />;

    return (
        <div className="w-full min-h-screen mx-auto p-6">
            {/* WELCOME SECTION */}
            <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                    Let’s discover your next great hire!
                </h1>
                <p className="text-muted-foreground mt-2">
                    {isInterviewer
                        ? "Manage your interviews and review candidates effectively"
                        : "Access your upcoming interviews and preparations"}
                </p>
            </div>

            {isInterviewer ? (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {QUICK_ACTIONS.map((action) => (
                            <ActionCard
                                key={action.title}
                                action={action}
                                onClick={() => handleQuickAction(action.title)}
                            />
                        ))}
                    </div>

                    <MeetingModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
                        isJoinMeeting={modalType === "join"}
                    />
                </>
            ) : (
                <>
                    <div>
                        <h1 className="text-3xl font-bold">Your Interviews</h1>
                        <p className="text-muted-foreground mt-1">View and join your scheduled interviews</p>
                    </div>

                    <div className="mt-8">
                        {interviews === undefined ? (
                            <div className="flex justify-center py-12">
                                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : interviews.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {interviews.map((interview) => (
                                    <MeetingCard key={interview._id} interview={interview} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                You have no scheduled interviews at the moment
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}