"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Upload, Cast as Paste } from "lucide-react";

export default function CreateResumePage() {
    const router = useRouter();
    const [jobDescription, setJobDescription] = useState("");
    const [fileName, setFileName] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const handleUploadJobDescription = () => {
        // Simulate file upload
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setJobDescription("This is a sample job description for a frontend developer position...");
        }, 1000);
    };

    const handleCreateResume = (e: React.FormEvent) => {
        e.preventDefault();

        if (!jobDescription.trim()) {
            setError("Please enter or upload a job description");
            return;
        }

        if (!fileName.trim()) {
            setError("Please enter a filename for your resume");
            return;
        }

        // Store the job description and filename in localStorage or context
        localStorage.setItem("jobDescription", jobDescription);
        localStorage.setItem("resumeFileName", fileName);

        // Navigate to the resume builder page
        router.push("/resume/builder");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
            <div className="container max-w-4xl mx-auto px-4 py-12 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: .1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Let&apos;s Create Your ATS-Optimized Resume
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        To get started, we&apos;ll need the job description you&apos;re applying for. This helps our AI optimize your resume for that specific position.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Resume Details</CardTitle>
                            <CardDescription>
                                Enter the job description and name your resume file
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreateResume} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="jobDescription">Job Description</Label>
                                    <Textarea
                                        id="jobDescription"
                                        placeholder="Paste the job description here..."
                                        className="min-h-[150px]"
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={handleUploadJobDescription}
                                            disabled={isUploading}
                                            className="gap-1"
                                        >
                                            <Upload size={16} /> Upload
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                navigator.clipboard.readText().then((text) => {
                                                    setJobDescription(text);
                                                });
                                            }}
                                            className="gap-1"
                                        >
                                            <Paste size={16} /> Paste from Clipboard
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fileName">Resume Filename</Label>
                                    <Input
                                        id="fileName"
                                        placeholder="e.g., john-smith-frontend-developer"
                                        value={fileName}
                                        onChange={(e) => setFileName(e.target.value)}
                                    />
                                </div>

                                {error && (
                                    <p className="text-destructive text-sm">{error}</p>
                                )}

                                <div className="flex justify-end">
                                    <Button type="submit" className="gap-2">
                                        Continue <ArrowRight size={16} />
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}