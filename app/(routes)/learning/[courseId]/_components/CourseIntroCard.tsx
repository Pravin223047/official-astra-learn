'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

interface Course {
    id: string;
    courseId: string;
    topic: string;
    courseType: string;
    courseLayout: {
        course_title: string;
        course_summary: string;
        chapters: any;
    };
    status: string;
    difficultyLevel: string;
    createdBy: string;
}

const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const CourseIntroCard = ({ course }: { course: Course | null }) => {
    if (!course) return null;

    const imageUrl = `https://gowithcode.com/wp-content/uploads/2021/04/top-programming-languages.jpg`;
    const topicTitle = capitalize(course.topic);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group relative w-full rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-white dark:from-[#111827] dark:to-[#1f2937] border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500 opacity-10 blur-2xl pointer-events-none" />

            {/* Topic Heading */}

            <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                {/* Course image */}
                <div className="w-full sm:w-1/3 aspect-video rounded-xl overflow-hidden shadow-md">
                    <Image
                        src={imageUrl}
                        alt={course.topic}
                        width={400}
                        height={200}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Course Content */}
                <div className="flex flex-col gap-2 sm:w-2/3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                        {course.courseLayout.course_title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-4">
                        {course.courseLayout.course_summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        {/* Difficulty level */}
                        {course.difficultyLevel && (
                            <span className="text-xs px-3 py-1 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-md backdrop-blur-sm">
                                {course.difficultyLevel}
                            </span>
                        )}
                        {/* Course Type */}
                        <span className="text-xs px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">
                            {course.courseType}
                        </span>

                        <span className="text-xs px-3 py-1 rounded-md bg-blue-200 dark:bg-purple-300 text-black font-medium">
                            {topicTitle}
                        </span>
                    </div>

                    <Progress value={50} className="mt-4" />
                    <h2 className='mt-3 text-lg text-blue-500'>Total Chapters: {course.courseLayout.chapters.length}</h2>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseIntroCard;
