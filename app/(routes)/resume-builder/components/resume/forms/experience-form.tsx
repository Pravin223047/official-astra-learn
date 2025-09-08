"use client";

import { useState } from "react";
import { useResumeContext } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { analyzeResumeWithAI } from "@/lib/gemini-service";
import { ArrowLeft, ArrowRight, Plus, Save, Trash, ListPlus, FileText } from "lucide-react";
import toast from "react-hot-toast";

export function ExperienceForm() {
    const {
        resumeData,
        addExperience,
        updateExperience,
        removeExperience,
        setCurrentStep,
        jobDescription,
        setAtsScore
    } = useResumeContext();
    const [isSaving, setIsSaving] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            toast.success("Your experience information has been updated.");
        } catch (error) {
            toast.success("Could not save your changes. Please try again.");
        }
        setIsSaving(false);
    };

    const handleAnalyzeATS = async () => {
        if (!jobDescription) {
            toast.success("Please provide a job description to analyze your resume.");
            return;
        }

        setIsAnalyzing(true);
        try {
            const scoreResult = await analyzeResumeWithAI({
                resumeData,
                jobDescription,
                section: "experience",
            });

            setAtsScore(scoreResult);

            toast.success(`Your resume scored ${scoreResult.score} out of 100.`);
        } catch (error) {
            console.error("Error analyzing resume:", error);
            toast.error("Could not analyze your resume. Please try again later.");
        }
        setIsAnalyzing(false);
    };

    const handleAddAchievement = (experienceId: string) => {
        const experience = resumeData.experience.find(exp => exp.id === experienceId);
        if (experience) {
            updateExperience(experienceId, {
                achievements: [...experience.achievements, ""]
            });
        }
    };

    const handleUpdateAchievement = (experienceId: string, index: number, value: string) => {
        const experience = resumeData.experience.find(exp => exp.id === experienceId);
        if (experience) {
            const achievements = [...experience.achievements];
            achievements[index] = value;
            updateExperience(experienceId, { achievements });
        }
    };

    const handleRemoveAchievement = (experienceId: string, index: number) => {
        const experience = resumeData.experience.find(exp => exp.id === experienceId);
        if (experience) {
            const achievements = experience.achievements.filter((_, i) => i !== index);
            updateExperience(experienceId, { achievements });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Work Experience</h2>
                <p className="text-muted-foreground">
                    Add your relevant work experience in reverse chronological order.
                </p>
            </div>

            {resumeData.experience.length > 0 ? (
                <div className="space-y-6">
                    {resumeData.experience.map((experience, index) => (
                        <Card key={experience.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl">Position {index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`company-${experience.id}`}>Company</Label>
                                        <Input
                                            id={`company-${experience.id}`}
                                            value={experience.company}
                                            onChange={(e) =>
                                                updateExperience(experience.id, { company: e.target.value })
                                            }
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`position-${experience.id}`}>Position</Label>
                                        <Input
                                            id={`position-${experience.id}`}
                                            value={experience.position}
                                            onChange={(e) =>
                                                updateExperience(experience.id, { position: e.target.value })
                                            }
                                            placeholder="Job Title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`location-${experience.id}`}>Location</Label>
                                        <Input
                                            id={`location-${experience.id}`}
                                            value={experience.location}
                                            onChange={(e) =>
                                                updateExperience(experience.id, { location: e.target.value })
                                            }
                                            placeholder="City, Country"
                                        />
                                    </div>

                                    <div className="flex items-end gap-4">
                                        <div className="space-y-2 flex-1">
                                            <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                                            <Input
                                                id={`startDate-${experience.id}`}
                                                type="text"
                                                value={experience.startDate}
                                                onChange={(e) =>
                                                    updateExperience(experience.id, { startDate: e.target.value })
                                                }
                                                placeholder="MM/YYYY"
                                            />
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                                            <Input
                                                id={`endDate-${experience.id}`}
                                                type="text"
                                                value={experience.endDate}
                                                onChange={(e) =>
                                                    updateExperience(experience.id, { endDate: e.target.value })
                                                }
                                                placeholder="MM/YYYY"
                                                disabled={experience.current}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id={`current-${experience.id}`}
                                        checked={experience.current}
                                        onCheckedChange={(checked) =>
                                            updateExperience(experience.id, { current: checked })
                                        }
                                    />
                                    <Label htmlFor={`current-${experience.id}`}>
                                        I currently work here
                                    </Label>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`description-${experience.id}`}>Description</Label>
                                    <Textarea
                                        id={`description-${experience.id}`}
                                        value={experience.description}
                                        onChange={(e) =>
                                            updateExperience(experience.id, { description: e.target.value })
                                        }
                                        placeholder="Describe your role and responsibilities..."
                                        className="min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label>Key Achievements</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAddAchievement(experience.id)}
                                            className="gap-1"
                                        >
                                            <ListPlus size={14} /> Add Achievement
                                        </Button>
                                    </div>

                                    {experience.achievements.map((achievement, i) => (
                                        <div key={i} className="flex gap-2">
                                            <Input
                                                value={achievement}
                                                onChange={(e) =>
                                                    handleUpdateAchievement(experience.id, i, e.target.value)
                                                }
                                                placeholder={`Achievement ${i + 1}`}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleRemoveAchievement(experience.id, i)}
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="justify-between pt-4">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => removeExperience(experience.id)}
                                    className="gap-1"
                                >
                                    <Trash size={16} /> Remove
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-dashed">
                    <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground mb-4">No work experience added yet.</p>
                        <Button
                            type="button"
                            onClick={addExperience}
                            className="gap-1"
                        >
                            <Plus size={16} /> Add Experience
                        </Button>
                    </CardContent>
                </Card>
            )}

            {resumeData.experience.length > 0 && (
                <div className="text-center">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addExperience}
                        className="gap-1"
                    >
                        <Plus size={16} /> Add Another Experience
                    </Button>
                </div>
            )}

            <Separator className="my-4" />

            <div className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep("personal")}
                    className="gap-1"
                >
                    <ArrowLeft size={16} /> Previous
                </Button>

                <div className="space-x-2">
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="gap-1"
                    >
                        <Save size={16} />
                        {isSaving ? "Saving..." : "Save"}
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleAnalyzeATS}
                        disabled={isAnalyzing || !jobDescription}
                        className="gap-1"
                    >
                        <FileText size={16} />
                        {isAnalyzing ? "Analyzing..." : "Check ATS Score"}
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setCurrentStep("education")}
                        className="gap-1"
                    >
                        Continue <ArrowRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}