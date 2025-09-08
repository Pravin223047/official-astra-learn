"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, PlusCircle, Search, Filter, Sparkles, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { CourseCard } from './_components/CourseCardItem';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

const LearningDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All Courses');
    const router = useRouter();

    const { user } = useUser();
    const [courseList, setCourseList] = useState<Course[]>([]); // Use the Course type here
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) GetCourseList();
    }, [user]);

    const GetCourseList = async () => {
        try {
            setLoading(true);
            const result = await axios.post("/api/courses", {
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });

            if (result.data.success && Array.isArray(result.data.data)) {
                setCourseList(result.data.data);
                toast.success("Course list fetched successfully!");
            } else {
                console.error("Error fetching course list or invalid data format:", result.data.error);
                toast.error("Failed to fetch course list.");
                setCourseList([]);
            }

        } catch (error) {
            console.error("Request failed:", error);
            toast.error("Failed to fetch course list.");
        } finally {
            setLoading(false);
        }
    };

    const languageTypes = [
        "All Courses",
        ...Array.from(
            new Set(
                courseList
                    .map(course => course?.courseLayout?.programming_keyword)
                    .filter(type => typeof type === "string" && type.trim() !== "")
            )
        ),
    ];

    const filteredCourses = courseList.filter(course => {
        const matchesSearch = course.topic.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All Courses' || course.courseLayout.programming_keyword.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-background dark:bg-gray-950">
            <div className="relative">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col gap-8">
                        {/* Header Section */}
                        <div className="flex flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 dark:from-primary dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                            Your Learning Journey
                                        </h1>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Continue your path to mastery with our curated courses
                                    </p>
                                </div>
                                <div className='flex gap-4 justify-between items-center'>
                                    <Button size="lg" className="group cursor-pointer bg-primary/90 hover:bg-primary transition-colors duration-300" onClick={() => router.push('/learning/create')}>
                                        <PlusCircle className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                        Create Course
                                    </Button>
                                    <Button size="lg" className="group cursor-pointer bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300" onClick={GetCourseList}>
                                        <RefreshCcw className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                                        Refresh
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Search and Filter Section */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex gap-4 flex-col sm:flex-row"
                            >
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Search courses..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-background/50 dark:bg-gray-900/50 backdrop-blur-lg border-2 transition-all duration-300 focus:border-primary/50"
                                    />
                                </div>
                                <Select value={filter} onValueChange={setFilter}>
                                    <SelectTrigger className="w-full sm:w-[200px] bg-background/50 dark:bg-gray-900/50 backdrop-blur-lg border-2">
                                        <Filter className="w-4 h-4 mr-2" />
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languageTypes.map((type, i) => (
                                            <SelectItem key={type ?? i} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </motion.div>
                        </div>

                        {/* Courses Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {filteredCourses.map((course) => (
                                        <CourseCard key={course.id} {...course} />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Empty State */}
                        {filteredCourses.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                                <p className="text-muted-foreground">
                                    Try adjusting your search or filter to find what you're looking for
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearningDashboard;