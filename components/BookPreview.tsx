"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    PenLine,
    Mic,
    Video,
    Sparkles,
    Heart,
    Share2,
    MoreVertical,
    BookOpen,
    Clock,
    Star,
    Eye,
    MessageCircle,
    Bookmark,
    User,
    Users
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const languageCategories = ["All Languages", "Cpp", "Java", "Python", "C", "Sql", "React"];


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};

interface Langauge {
    id: string;
    languagepromptId: string;
    languageTitle: string;
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

export default function BookPreviewComponenet() {
    const [selectedCategory, setSelectedCategory] = useState("All Languages");
    const [likedLanguages, setLikedLanguages] = useState<number[]>([]);
    const [savedLanguages, setSavedLanguages] = useState<number[]>([]);

    const [languageData, setLanguageData] = useState<Langauge[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const user = useUser();

    const filteredLanguages = selectedCategory === "All Languages"
        ? languageData
        : languageData.filter(language => language.languageType.toLowerCase() === selectedCategory.toLowerCase());

    const toggleLike = (id: number) => {
        setLikedLanguages(prev =>
            prev.includes(id) ? prev.filter(languageId => languageId !== id) : [...prev, id]
        );
    };

    const toggleSave = (id: number) => {
        setSavedLanguages(prev =>
            prev.includes(id) ? prev.filter(languageId => languageId !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch("/api/save-promptlanguage");
                if (!response.ok) {
                    throw new Error("Failed to fetch languages");
                }
                const data = await response.json();
                setLanguageData(data.languages);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    return (
        <div className="min-h-screen p-6 space-y-8">
            <div className="w-full mx-auto">

                <Tabs defaultValue="All Languages" className="space-y-4">
                    <TabsList className="flex space-x-2 overflow-x-auto bg-background/50 backdrop-blur-lg p-1 rounded-full">
                        {languageCategories.map((category) => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                onClick={() => setSelectedCategory(category)}
                                className="px-4 py-2 rounded-full"
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <TabsContent value={selectedCategory} className="mt-6">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                {filteredLanguages.map((language) => (
                                    <motion.div
                                        key={language.id}
                                        variants={itemVariants}
                                        whileHover={{
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        className="premium-card rounded-xl overflow-hidden group"
                                    >
                                        <div className="relative aspect-[3/4]">
                                            <img
                                                src={language.bookCoverImage}
                                                alt={language.languageType}
                                                className="object-cover w-full h-full rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            {language.languageType && (
                                                <div className="premium-badge">
                                                    {language.languageType}
                                                </div>
                                            )}
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{language.languageTitle}</h3>
                                                <p className="text-sm text-gray-200">
                                                    {language.languagePrompt.split(" ").slice(0, 10).join(" ")}...
                                                </p>
                                            </motion.div>
                                        </div>

                                        <CardContent className="p-4 space-y-4 relative bg-gradient-to-b from-background/80 to-background backdrop-blur-md">
                                            <div className="flex items-start flex-col justify-start space-x-2">
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <User className="w-4 h-4" />
                                                    <span className="font-medium text-sm">{user.user?.fullName}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {language.createdAt}
                                                </div>
                                            </div>

                                            {/* <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center">
                                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                                        <span className="font-medium">{language.rating}</span>
                                                    </div>
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        {language.views.toLocaleString()}
                                                    </div>
                                                    <div className="flex items-center text-muted-foreground">
                                                        <MessageCircle className="w-4 h-4 mr-1" />
                                                        {language.comments}
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* <div className="flex flex-wrap gap-2">
                                                {language.tags.map((tag, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div> */}

                                            <div className="flex items-center justify-between pt-2 border-t border-border">
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={`hover:text-rose-500 ${likedLanguages.includes(Number(language.id)) ? 'text-rose-500' : ''}`}
                                                        onClick={() => toggleLike(Number(language.id))}
                                                    >
                                                        <Heart className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={`hover:text-blue-500 ${savedLanguages.includes(Number(language.id)) ? 'text-blue-500' : ''}`}
                                                        onClick={() => toggleSave(Number(language.id))}
                                                    >
                                                        <Bookmark className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="hover:text-blue-500">
                                                        <Share2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <BookOpen className="w-4 h-4 mr-2" /> Read Now
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Download</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </div>
        </div>
    );
}