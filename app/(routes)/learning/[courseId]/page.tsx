'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterial from './_components/StudyMaterial';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import CourseListChapters from './_components/CourseListChapters';

interface Course {
    id: string;
    courseId: string;
    topic: string;
    courseType: string;
    courseLayout: any;
    status: string;
    difficultyLevel: string;
    createdBy: string;
}

const CourseContent = () => {
    const params = useParams();
    const courseId = params?.courseId;
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (courseId) {
            GetCourse();
        }
    }, [courseId]);

    const GetCourse = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`/api/courses?courseId=${courseId}`);
            setCourse(result.data.result);
        } catch (error) {
            console.error("Error fetching course:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full p-4 sm:p-6 md:p-10"
        >
            {loading ? (
                <div className="w-full flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Loading course content...</p>
                </div>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <CourseIntroCard course={course} />
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-bold mt-10 mb-4 text-slate-800 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Your Study Materials
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <StudyMaterial course={course} />
                    </motion.div>
                    <motion.h2
                        className="text-2xl font-bold mt-10 mb-4 text-slate-800 dark:text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Course Chapters
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <CourseListChapters course={course} />
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default CourseContent;
