import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

const CourseListChapters = ({ course }: { course: Course | null }) => {
    const chapters = course?.courseLayout?.chapters || [];

    if (!course) {
        return (
            <div className="text-center text-muted-foreground py-10 animate-pulse">
                No course data available.
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {chapters.map((chapter: any, index: number) => (
                    <motion.div
                        key={chapter.id || index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={cn(
                            'group relative p-6 rounded-2xl border backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300',
                            'bg-white/70 dark:bg-white/5 border-gray-100 dark:border-gray-900'
                        )}
                    >
                        <div className="absolute bottom-2 right-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full shadow-sm opacity-80 group-hover:opacity-100 transition">
                            Chapter {chapter.chapter_number}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-white group-hover:underline transition">
                            {chapter.chapter_title}
                        </h3>
                        {chapter.summary && (
                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                {chapter.summary}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CourseListChapters;
