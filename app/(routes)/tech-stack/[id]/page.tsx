"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { BookPreview } from "../components/bookepreview";

interface Language {
    id: string;
    languagepromptId: string;
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

const CreatPromptIdPage = () => {
    const [languageData, setLanguageData] = useState<Language[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user, isLoaded } = useUser();
    const { id: languagepromptId } = useParams();

    const [open, setOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

    const fetchLanguages = useCallback(async () => {
        if (!isLoaded || !user || !languagepromptId) return;

        const controller = new AbortController();
        const signal = controller.signal;

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `/api/get-promptlanguage-by-id?languagepromptId=${languagepromptId}&userId=${user.id}`,
                { signal }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setLanguageData(Array.isArray(data.languages) ? data.languages : []);
        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }

        return () => controller.abort();
    }, [isLoaded, user?.id, languagepromptId]);

    useEffect(() => {
        fetchLanguages();
    }, [fetchLanguages]);

    const memoizedLanguages = useMemo(() => languageData, [languageData]);

    return (
        <div className="p-6 w-full flex flex-col items-center mx-auto max-w-7xl">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
                📖 Your Tech Languages Books
            </h1>

            {loading && (
                <p className="text-center text-gray-500 text-lg animate-pulse">Fetching your tech languages book...</p>
            )}
            {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

            {!loading && memoizedLanguages.length === 0 && !error && (
                <p className="text-center text-gray-500 text-lg">No tech language books found.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {memoizedLanguages.map((language) => (
                    <div
                        key={language.id}
                        className="bg-white dark:bg-slate-900 dark:text-white shadow-xl rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            {language.languagePrompt}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Type:</strong> {language.languageType}</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Age Group:</strong> {language.ageGroup}</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Writing Style:</strong> {language.writingStyle}</p>
                        <p className="text-gray-700 dark:text-gray-300"><strong>Complexity:</strong> {language.complexity.join(", ")}</p>

                        {language.bookCoverImage && (
                            <img
                                src={language.bookCoverImage}
                                alt={`Cover of the book "${language.languagePrompt}"`}
                                className="w-full h-64 object-cover mt-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                        )}

                        <button
                            onClick={() => {
                                setSelectedLanguage(language);
                                setOpen(true);
                            }}
                            className="mt-6 w-full bg-gradient-to-r from-purple-800 to-purple-900 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-purple-400"
                        >
                            📖 Read Language
                        </button>
                    </div>
                ))}
            </div>

            {selectedLanguage && (
                <BookPreview
                    bookCoverImage={selectedLanguage.bookCoverImage}
                    chapterImages={selectedLanguage.chapterImages}
                    content={selectedLanguage.chapterTexts}
                    isOpen={open}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
};

export default CreatPromptIdPage;
