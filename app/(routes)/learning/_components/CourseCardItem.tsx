import { motion } from 'framer-motion';
import { BookOpen, Clock, BarChart, Users, Trophy, TimerIcon, RefreshCcw } from 'lucide-react';
import {
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

interface Course {
    id: string;
    courseId: string;
    topic: string;
    courseType: string;
    courseLayout: any;
    difficultyLevel: string;
    status: string;
    createdBy: string;
}

export function CourseCard(course: Course) {
    const router = useRouter();
    const getDifficultyColor = (level: string) => {
        const colors = {
            easy: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400',
            medium: 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400',
            hard: 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400',
        };
        return colors[level as keyof typeof colors] || 'bg-gray-500/10 text-gray-500';
    };

    const getCourseTypeColor = (type: string) => {
        const colors = {
            Frontend: 'border-orange-500/20 text-orange-700 dark:text-orange-400',
            Backend: 'border-blue-500/20 text-blue-700 dark:text-blue-400',
            AI: 'border-purple-500/20 text-purple-700 dark:text-purple-400',
            Design: 'border-pink-500/20 text-pink-700 dark:text-pink-400',
        };
        return colors[type as keyof typeof colors] || 'border-gray-500/20 text-gray-700 dark:text-gray-400';
    };

    const getProgressColor = (type: string) => {
        const colors = {
            Frontend: 'bg-orange-500',
            Backend: 'bg-blue-500',
            AI: 'bg-purple-500',
            Design: 'bg-pink-500',
        };
        return colors[type as keyof typeof colors] || 'bg-primary';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <div className="group overflow-hidden rounded-md p-4 border-2 dark:bg-gray-900/50 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 backdrop-blur-sm">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={"https://static.vecteezy.com/system/resources/thumbnails/010/916/490/small_2x/3d-a-pile-of-books-pencils-learning-indicates-an-educational-story-and-a-light-bulb-represents-an-idea-learning-png.png"}
                        alt={course.courseLayout.programming_keyword}
                        className="w-full bg-gradient-to-t from-slate-50 to-white dark:from-slate-900 dark:to-black h-full object-contain rounded-md transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-white z-0" /> */}
                    <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className={`${getDifficultyColor(course.difficultyLevel)} shadow-lg`}>
                            {course.difficultyLevel}
                        </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className={`${getCourseTypeColor(course.courseType)} border-2 backdrop-blur-md bg-white/10 dark:bg-black/10`}>
                            {course.courseType}
                        </Badge>
                    </div>
                </div>
                <div className='p-2'>
                    <div className="space-y-2">
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            {course.courseLayout.course_title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-muted-foreground">
                            {course.courseLayout.course_summary || 'No summary available.'}
                        </CardDescription>
                    </div>
                </div>
                <div className="space-y-6 p-2">
                    {/* Course Progress Stats */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <TimerIcon className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <span className="text-black dark:text-white">Duration</span>
                            </div>
                            <Progress value={33} className={`h-2 ${getProgressColor(course.courseType)}`} />
                        </div>
                    </div>

                    {course.status === 'Generating' ? (<h2 className='flex items-center text-center justify-center bg-purple-500 text-white rounded-md px-6 py-2'>
                        <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...</h2>) : (
                        <Button className="w-full bg-primary/90 hover:bg-primary transition-colors duration-300 group" onClick={() => router.push(`/learning/${course.courseId}`)}>
                            <Trophy className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                            Start Learning
                        </Button>)}
                </div>
            </div>
        </motion.div>
    );
}