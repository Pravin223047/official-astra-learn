'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, HelpCircle, PenTool, Brain, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Material {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
    type: string;
    path?: string;
}

interface Course {
    id: string;
    courseId: string;
    topic: string;
    courseType: string;
    courseLayout: {
        course_title: string;
        course_summary: string;
        chapters: any[];
    };
    status: string;
    difficultyLevel: string;
    createdBy: string;
}

const materials: Material[] = [
    {
        id: 1,
        name: 'Notes / Chapters',
        description: 'Detailed theory notes and chapters to study.',
        icon: <BookOpen className="w-6 h-6" />,
        type: 'notes',
        path: '/notes',
    },
    {
        id: 2,
        name: 'Flashcards',
        description: 'Quick revision flashcards with key points.',
        icon: <Zap className="w-6 h-6" />,
        type: 'flashcards',
        path: '/flashcards',
    },
    {
        id: 3,
        name: 'Quiz',
        description: 'Interactive quizzes to test your knowledge.',
        icon: <HelpCircle className="w-6 h-6" />,
        type: 'quiz',
        path: '/quiz',
    },
    {
        id: 4,
        name: 'Q&A',
        description: 'Questions and answers from previous papers.',
        icon: <PenTool className="w-6 h-6" />,
        type: 'qa',
        path: '/qa',
    },
    {
        id: 5,
        name: 'Interview',
        description: 'Interview prep questions and answers.',
        icon: <Brain className="w-6 h-6" />,
        type: 'interview',
        path: '/interview',
    },
];

const StudyMaterial = ({ course }: { course: Course | null }) => {
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [studyTypeContent, setStudyTypeContent] = useState<any>(null);
    const router = useRouter();


    useEffect(() => {
        if (course) {
            GetStudyMaterial();
        }
    }, [course]);

    const GetStudyMaterial = async () => {
        try {
            const { data } = await axios.post('/api/study-type', {
                courseId: course?.courseId,
                studyType: 'ALL',
            });
            console.log(data);
            setStudyTypeContent(data);
        } catch (error) {
            console.error('Failed to fetch study material:', error);
        }
    };
    const GenerateContentMethod = async (type: string, id: number) => {
        setLoadingId(id); // Only this card shows loading
        toast.loading(`Generating ${type} content...`, {
            id: `loading-${id}`,
        });
        let chapters = "";
        if (course?.courseLayout.chapters) {
            chapters = course?.courseLayout.chapters.map((chapter: any) => chapter.chapter_title).join(", ");
        }
        try {
            const result = await axios.post('/api/generate-study-type-content', {
                chapters: chapters,
                courseId: course?.courseId,
                difficultyLevel: course?.difficultyLevel,
                type: type,
            });
            console.log(result.data);
            await GetStudyMaterial(); // Refresh availability status
            toast.dismiss(`loading-${id}`);
            toast.success(`${type} content generated successfully!`, {
                id: `loading-${id}`,
            });
        } catch (error) {
            console.error("Generation failed", error);
        } finally {
            setLoadingId(null); // Reset loader
        }
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-4">
            {materials.map((item) => {
                const isSelected = selectedId === item.id;
                const isReady = studyTypeContent?.[item.type]?.length > 0;
                const isCourseComplete = course?.status === 'Completed';

                return (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                            if (isReady && isCourseComplete) {
                                setSelectedId(item.id);
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        className={`rounded-2xl p-5 border text-left shadow-sm transition-all duration-300 cursor-pointer outline-none
        ${isSelected
                                ? 'bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900 text-white'
                                : 'bg-white dark:bg-neutral-950 hover:bg-slate-100 dark:hover:bg-slate-950'
                            } ${!isReady || !isCourseComplete ? 'opacity-70 grayscale cursor-not-allowed' : ''}`}
                    >

                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3 text-base font-semibold text-black dark:text-white">
                                    <div className={`p-2 rounded-md ${isSelected ? 'bg-white text-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                        {item.icon}
                                    </div>
                                    {item.name}
                                </div>
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-md ${isReady
                                        ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300'
                                        }`}
                                >
                                    {isReady ? 'Available' : 'Generate'}
                                </span>
                            </div>

                            <p className="text-xs opacity-80 mb-4 text-black dark:text-white">{item.description}</p>

                            <Button
                                variant={isReady ? (isSelected ? 'default' : 'secondary') : 'outline'}
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    if (!isReady) {
                                        await GenerateContentMethod(item.type, item.id);
                                    } else if (isCourseComplete) {
                                        setSelectedId(item.id);
                                        router.push(`/learning/${course?.courseId}/${item.path}`);
                                    }
                                }}
                                disabled={loadingId === item.id}
                                className={`w-full text-xs font-semibold transition-all duration-300 ${isSelected && isReady ? 'bg-white text-indigo-600 hover:bg-gray-100' : 'bg-white text-indigo-600 hover:bg-gray-100'
                                    }`}
                            >
                                {isReady
                                    ? isCourseComplete
                                        ? (isSelected ? 'Continue' : 'Start')
                                        : 'Complete Course'
                                    : loadingId === item.id
                                        ? <div className="flex items-center justify-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </div>
                                        : 'Generate'}
                            </Button>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default StudyMaterial;
