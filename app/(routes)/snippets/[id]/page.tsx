"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { Clock, Code, MessageSquare, User } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import SnippetLoadingSkeleton from "@/components/SnippetLoadingSkeleton";
import NavigationHeader from "../../../../components/NavigationHeader";
import CopyButton from "./components/CopyButton";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../../../../codeeditorconstants";
import Comments from "./components/Comments";
import { useTheme } from "next-themes";


function SnippetDetailPage() {
    const snippetId = useParams().id;
    const theme = useTheme();

    const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
    const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });

    if (snippet === undefined) return <SnippetLoadingSkeleton />;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0f]">
            <NavigationHeader />

            <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                <div className="w-full mx-auto">
                    {/* Header */}
                    <div className="bg-gray-100 dark:bg-[#121218] border border-gray-100 dark:border-[#ffffff0a] rounded-2xl p-4 mb-6 backdrop-blur-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center size-12 rounded-xl bg-[#faefef] dark:bg-[#ffffff08] p-2.5">
                                    <img
                                        src={`/${snippet.language}.png`}
                                        alt={`${snippet.language} logo`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2">
                                        {snippet.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-[#8b8b8d]">
                                            <User className="w-4 h-4" />
                                            <span>{snippet.userName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-[#8b8b8d]">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-[#8b8b8d]">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{comments?.length} comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-[#ffffff08] text-gray-900 dark:text-[#808086] rounded-lg text-sm font-medium">
                                {snippet.language}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Code Editor */}
                        <div className="mb-8 rounded-2xl h-full overflow-hidden border border-gray-100 dark:border-[#ffffff0a] bg-gray-100 dark:bg-[#121218]">
                            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-[#ffffff0a]">
                                <div className="flex items-center gap-2 text-gray-800 dark:text-[#808086]">
                                    <Code className="w-4 h-4" />
                                    <span className="text-sm font-medium">Source Code</span>
                                </div>
                                <CopyButton code={snippet.code} />
                            </div>
                            <Editor
                                height="600px"
                                language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
                                value={snippet.code}
                                theme={theme.theme === "dark" ? "vs-dark" : "vs-light"}
                                beforeMount={defineMonacoThemes}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 16,
                                    readOnly: true,
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    padding: { top: 16 },
                                    renderWhitespace: "selection",
                                    fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                                    fontLigatures: true,
                                }}
                            />
                        </div>

                        <Comments snippetId={snippet._id} />
                    </div>
                </div>
            </main>
        </div>
    );
}
export default SnippetDetailPage;