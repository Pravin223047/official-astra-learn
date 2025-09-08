"use client";

import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

interface FlashCard {
    courseId: string;
    id: number;
    status: string;
    type: string;
    content: {
        difficultyLevel: string;
        topic: string;
        flashcards: {
            question: string;
            answer: string;
        }[];
    };
}

interface FlattenedFlashCard {
    question: string;
    answer: string;
    topic: string;
    difficultyLevel: string;
}

const FlashCardContent = () => {
    const [loading, setLoading] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);
    const [flashCards, setFlashCards] = useState<FlattenedFlashCard[]>([]);
    const [stepCount, setStepCount] = useState(0);
    const params = useParams();
    const courseId = params?.courseId as string;
    const router = useRouter();

    const GetFlashCardContent = async () => {
        try {
            const result = await fetch('/api/study-type', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId, studyType: 'flashcards' }),
            });

            const data = await result.json();
            const allFlashcards: FlattenedFlashCard[] = [];

            if (result.ok && Array.isArray(data.flashcards)) {
                data.flashcards.forEach((item: FlashCard) => {
                    item.content.flashcards.forEach((fc) => {
                        allFlashcards.push({
                            question: fc.question,
                            answer: fc.answer,
                            topic: item.content.topic,
                            difficultyLevel: item.content.difficultyLevel,
                        });
                    });
                });

                setFlashCards(allFlashcards);
            } else {
                console.error('Error fetching flashcards:', data.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (courseId) GetFlashCardContent();
    }, [courseId]);

    const handleNext = () => {
        if (stepCount < flashCards.length - 1) {
            setStepCount((prev) => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevious = () => {
        if (stepCount > 0) {
            setStepCount((prev) => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleClick = () => setIsFlipped(!isFlipped);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-primary mb-4">Flashcards</h1>
                <Button
                    onClick={() => router.back()}
                    className="dark:bg-white dark:text-black dark:hover:bg-gray-100 bg-black text-white hover:bg-gray-700"
                >
                    ← Back
                </Button>
            </div>

            {loading ? (
                <div className="w-full flex flex-col items-center justify-center py-20">
                    <Loader className="w-8 h-8 animate-spin text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Loading flashcards Content...</p>
                </div>
            ) : flashCards.length > 0 ? (
                <>
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 w-full">
                            <Button
                                onClick={handlePrevious}
                                disabled={stepCount === 0}
                                className="bg-gradient-to-r from-pink-500 to-purple-500 disabled:opacity-50 text-white py-2 px-6 rounded-lg shadow-md transition-all"
                            >
                                Previous
                            </Button>

                            <div className="flex gap-3 flex-1 justify-center">
                                {flashCards.map((_, index) => {
                                    const isActive = stepCount === index;
                                    const gradientClasses = [
                                        'from-pink-500 to-purple-500',
                                        'from-yellow-500 to-red-500',
                                        'from-green-500 to-teal-500',
                                        'from-indigo-500 to-pink-500',
                                        'from-fuchsia-500 to-violet-500',
                                        'from-orange-500 to-rose-500',
                                        'from-cyan-500 to-sky-500',
                                    ];
                                    const gradient = gradientClasses[index % gradientClasses.length];

                                    return (
                                        <div
                                            key={index}
                                            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${isActive
                                                ? `bg-gradient-to-r ${gradient} scale-125 shadow-lg animate-pulse`
                                                : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                            onClick={() => {
                                                setStepCount(index);
                                                window.scrollTo(0, 0);
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>

                            <Button
                                onClick={handleNext}
                                disabled={stepCount === flashCards.length - 1}
                                className="bg-gradient-to-r from-pink-500 to-purple-500 disabled:opacity-50 text-white py-2 px-6 rounded-lg shadow-md transition-all"
                            >
                                Next
                            </Button>
                        </div>

                        {/* Get current gradient class */}
                        {(() => {
                            const gradientClasses = [
                                'dark:from-pink-900 dark:to-purple-900 from-pink-600 to-purple-600',
                                'dark:from-yellow-900 dark:to-red-900 from-yellow-600 to-red-600',
                                'dark:from-green-900 dark:to-teal-900 from-green-600 to-teal-600',
                                'dark:from-indigo-900 dark:to-pink-900 from-indigo-600 to-pink-600',
                                'dark:from-fuchsia-900 dark:to-violet-900 from-fuchsia-600 to-violet-600',
                                'dark:from-orange-900 dark:to-rose-900 from-orange-600 to-rose-600',
                                'dark:from-cyan-900 dark:to-sky-900 from-cyan-600 to-sky-600',
                            ];
                            const currentGradient = gradientClasses[stepCount % gradientClasses.length];

                            return (
                                <div className="flex justify-center items-center">
                                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                                        {/* Front */}
                                        <div
                                            onClick={handleClick}
                                            className={`max-w-4xl min-h-[350px] bg-gradient-to-r ${currentGradient} 
  rounded-xl shadow-xl p-8 flex justify-center items-center transform transition-all scale-100 cursor-pointer`}
                                        >
                                            <div className="text-center">
                                                <h2 className="text-3xl font-extrabold text-white drop-shadow-sm">
                                                    {flashCards[stepCount].topic}
                                                </h2>
                                                <p className="text-xl text-white mt-6 drop-shadow-sm">
                                                    {flashCards[stepCount].question}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Back */}
                                        <div
                                            onClick={handleClick}
                                            className={`max-w-4xl min-h-[350px] bg-gradient-to-r ${currentGradient} 
  rounded-xl shadow-xl p-8 flex justify-center items-center transform transition-all scale-100 cursor-pointer`}
                                        >
                                            <div className="text-center text-white">
                                                <h2 className="text-2xl font-bold drop-shadow-sm">Answer:</h2>
                                                <p className="text-xl mt-6 drop-shadow-sm">
                                                    {flashCards[stepCount].answer}
                                                </p>
                                            </div>
                                        </div>
                                    </ReactCardFlip>
                                </div>
                            );
                        })()}
                    </div>

                </>
            ) : (
                <p>No flashcards found for this course.</p>
            )}
        </div>
    );
};

export default FlashCardContent;
