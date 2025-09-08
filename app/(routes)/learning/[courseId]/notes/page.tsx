'use client';

import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

const ViewNotes = () => {
    const params = useParams();
    const courseId = params?.courseId as string;
    const router = useRouter();

    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stepCount, setStepCount] = useState(0);
    const [showDialog, setShowDialog] = useState(false);

    const bottomRef = useRef<HTMLDivElement | null>(null);

    const GetNotes = async () => {
        try {
            const result = await fetch('/api/study-type', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId, studyType: 'notes' }),
            });

            const data = await result.json();
            if (result.ok) setNotes(data.notes || []);
            else console.error('Error fetching notes:', data.error);
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (courseId) GetNotes();
    }, [courseId]);

    // ✅ Detect when bottom of last note is in view
    useEffect(() => {
        if (!bottomRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && stepCount === notes.length - 1) {
                    setShowDialog(true);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(bottomRef.current);

        return () => {
            observer.disconnect();
        };
    }, [stepCount, notes]);

    const handleNext = () => {
        if (stepCount < notes.length - 1) {
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

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Notes</h1>
                <Button onClick={() => router.back()} className='dark:bg-white dark:text-black dark:hover:bg-gray-100 bg-black text-white hover:bg-gray-700'>← Back</Button>
            </div>

            {loading ? (
                <div className="w-full flex flex-col items-center justify-center py-20">
                    <Loader className="w-8 h-8 animate-spin text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Loading notes...</p>
                </div>
            ) : notes.length > 0 ? (
                <>
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handlePrevious}
                                disabled={stepCount === 0}
                                className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white py-2 px-6"
                            >
                                Previous
                            </Button>

                            <div className="flex gap-2 flex-1 justify-center">
                                {notes.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-4 h-4 rounded-full transition-all cursor-pointer ${stepCount === index ? 'bg-primary scale-110' : 'bg-gray-300'
                                            }`}
                                        onClick={() => {
                                            setStepCount(index);
                                            window.scrollTo(0, 0);
                                        }}
                                    ></div>
                                ))}
                            </div>

                            <Button
                                onClick={handleNext}
                                disabled={stepCount === notes.length - 1}
                                className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white py-2 px-6"
                            >
                                Next
                            </Button>
                        </div>

                        <div className="border rounded-md bg-white text-black p-4 dark:bg-gray-800 dark:text-white">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: JSON.parse(notes[stepCount].notes).html_content,
                                }}
                            />
                            <div ref={bottomRef} className="h-1" />
                        </div>
                    </div>
                </>
            ) : (
                <p>No notes found for this course.</p>
            )}

            {/* ✅ AlertDialog for End of Notes */}
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>🎉 You’ve reached the end of the notes!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Would you like to return to the course page?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>
                            Close
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => router.back()}>
                            Go to Course Page
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ViewNotes;
