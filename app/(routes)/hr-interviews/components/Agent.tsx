"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { vapi } from "@/lib/vapi.sdk";

import { createFeedback } from "@/lib/actions/general.action";
import { interviewer } from "@/hrinterviewconstants";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

const Agent = ({
    userName,
    userId,
    interviewId,
    feedbackId,
    type,
    questions,
}: AgentProps) => {
    const router = useRouter();
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [lastMessage, setLastMessage] = useState<string>("");

    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
        };

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
        };

        const onMessage = (message: Message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        const onSpeechStart = () => {
            setIsSpeaking(true);
        };

        const onSpeechEnd = () => {
            setIsSpeaking(false);
        };

        const onError = (error: Error) => {
            console.log("Error:", error);
        };

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);
        vapi.on("error", onError);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("error", onError);
        };
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            setLastMessage(messages[messages.length - 1].content);
        }

        const handleGenerateFeedback = async (messages: SavedMessage[]) => {
            console.log("handleGenerateFeedback");

            const { success, feedbackId: id } = await createFeedback({
                interviewId: interviewId!,
                userId: userId!,
                transcript: messages,
                feedbackId,
            });

            if (success && id) {
                router.push(`/hr-interviews/interview/${interviewId}/feedback`);
            } else {
                console.log("Error saving feedback");
                router.push("/hr-interviews");
            }
        };

        if (callStatus === CallStatus.FINISHED) {
            if (type === "generate") {
                router.push("/hr-interviews");
            } else {
                handleGenerateFeedback(messages);
            }
        }
    }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);

        if (type === "generate") {
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                variableValues: {
                    username: userName,
                    userid: userId,
                },
            });
        } else {
            let formattedQuestions = "";
            if (questions) {
                formattedQuestions = questions
                    .map((question) => `- ${question}`)
                    .join("\n");
            }

            await vapi.start(interviewer, {
                variableValues: {
                    questions: formattedQuestions,
                },
            });
        }
    };

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full gap-10 px-4 py-10 animate-fadeIn">
            {/* Cards */}
            <div className="flex flex-wrap justify-center gap-10 w-full max-w-6xl">
                {/* AI Interviewer Card */}
                <div className="w-full sm:w-[350px] h-[420px] bg-gradient-to-br from-white to-gray-100 dark:from-[#1f1d3a] dark:to-[#0c0d13] rounded-3xl p-6 border dark:border-gray-700 border-gray-200 text-black dark:text-white flex flex-col items-center justify-center relative shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
                    <div className="relative">
                        <Image
                            src="/logo.png"
                            alt="AI Interviewer"
                            width={100}
                            height={100}
                            className="rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                        />
                        {isSpeaking && (
                            <span className="absolute top-0 left-0 size-full rounded-full animate-ping bg-blue-500 opacity-30" />
                        )}
                    </div>
                    <h3 className="mt-6 text-xl font-bold tracking-wide">AI Interviewer</h3>
                    <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                        Your intelligent virtual interviewer ready to assess your skills.
                    </p>
                </div>

                {/* User Card */}
                <div className="w-full sm:w-[350px] h-[420px] bg-gradient-to-br from-white to-gray-100 dark:from-[#1f1d3a] dark:to-[#0c0d13] rounded-3xl p-6 border dark:border-gray-700 border-gray-200 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
                    <Image
                        src="/user-avatar.png"
                        alt="User Avatar"
                        width={100}
                        height={100}
                        className="rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                    />
                    <h3 className="mt-6 text-xl font-bold tracking-wide">{userName}</h3>
                    <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                        That’s you! Get ready to shine in your interview.
                    </p>
                </div>
            </div>

            {/* Transcript Bubble */}
            {lastMessage && (
                <div className="w-full sm:max-w-[600px] bg-gradient-to-br from-gray-100 to-white dark:from-[#1f1d3a] dark:to-[#0c0d13] p-5 rounded-2xl shadow-inner dark:text-white text-black text-center text-base font-medium animate-fadeIn border border-gray-200 dark:border-gray-700">
                    <p>{lastMessage}</p>
                </div>
            )}

            {/* Call Buttons */}
            <div className="w-full flex justify-center mt-6">
                {callStatus !== "ACTIVE" ? (
                    <button
                        onClick={handleCall}
                        className="relative px-8 py-3 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md cursor-pointer transition-all duration-300 shadow-md min-w-[140px] text-lg"
                    >
                        {callStatus === "CONNECTING" && (
                            <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-ping"></span>
                        )}
                        <span className="relative z-10">
                            {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Start Call" : "..."}
                        </span>
                    </button>
                ) : (
                    <button
                        onClick={handleDisconnect}
                        className="px-8 py-3 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-all cursor-pointer duration-300 shadow-md min-w-[140px] text-lg"
                    >
                        End Call
                    </button>
                )}
            </div>
        </div>

    );
};

export default Agent;
