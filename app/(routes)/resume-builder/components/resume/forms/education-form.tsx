"use client";

import { useState } from "react";
import { useResumeContext } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from "lucide-react";


export const EducationForm = () => {
    const {
        resumeData,
        addEducation,
        updateEducation,
        removeEducation
    } = useResumeContext();

    type FormSection = "content"; // Add more section names as needed

    const [activeSection, setActiveSection] = useState<FormSection | null>(
        resumeData.education.length > 0 ? "content" : null
    );

    const handleAddEducation = () => {
        addEducation();
        setActiveSection("content");
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
                <p className="text-muted-foreground">
                    Add your educational background to showcase your academic qualifications.
                </p>
            </div>

            {resumeData.education.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-lg">
                    <p className="mb-4 text-muted-foreground">No education entries yet</p>
                    <Button onClick={handleAddEducation}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Education
                    </Button>
                </div>
            )}

            {resumeData.education.length > 0 && (
                <div className="space-y-6">
                    {resumeData.education.map((edu) => (
                        <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">
                                    {edu.institution || "New Education Entry"}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeEducation(edu.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                                    <Input
                                        id={`institution-${edu.id}`}
                                        value={edu.institution}
                                        onChange={(e) =>
                                            updateEducation(edu.id, { institution: e.target.value })
                                        }
                                        placeholder="University/College Name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                                    <Input
                                        id={`degree-${edu.id}`}
                                        value={edu.degree}
                                        onChange={(e) =>
                                            updateEducation(edu.id, { degree: e.target.value })
                                        }
                                        placeholder="Bachelor's, Master's, etc."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                                    <Input
                                        id={`field-${edu.id}`}
                                        value={edu.field}
                                        onChange={(e) =>
                                            updateEducation(edu.id, { field: e.target.value })
                                        }
                                        placeholder="Computer Science, Business, etc."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`location-${edu.id}`}>Location</Label>
                                    <Input
                                        id={`location-${edu.id}`}
                                        value={edu.location}
                                        onChange={(e) =>
                                            updateEducation(edu.id, { location: e.target.value })
                                        }
                                        placeholder="City, State, Country"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                                    <Input
                                        id={`start-date-${edu.id}`}
                                        value={edu.startDate}
                                        onChange={(e) =>
                                            updateEducation(edu.id, { startDate: e.target.value })
                                        }
                                        placeholder="MM/YYYY"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id={`end-date-${edu.id}`}
                                            value={edu.endDate}
                                            onChange={(e) =>
                                                updateEducation(edu.id, { endDate: e.target.value })
                                            }
                                            placeholder="MM/YYYY"
                                            disabled={edu.current}
                                        />
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`current-${edu.id}`}
                                                checked={edu.current}
                                                onCheckedChange={(checked) =>
                                                    updateEducation(edu.id, { current: checked as boolean })
                                                }
                                            />
                                            <Label
                                                htmlFor={`current-${edu.id}`}
                                                className="text-sm font-normal"
                                            >
                                                Current
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                                    <Input
                                        id={`gpa-${edu.id}`}
                                        value={edu.gpa}
                                        onChange={(e) =>
                                            updateEducation(edu.id, { gpa: e.target.value })
                                        }
                                        placeholder="3.8/4.0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`description-${edu.id}`}>
                                    Description (Optional)
                                </Label>
                                <Textarea
                                    id={`description-${edu.id}`}
                                    value={edu.description}
                                    onChange={(e) =>
                                        updateEducation(edu.id, { description: e.target.value })
                                    }
                                    placeholder="Describe your achievements, activities, or relevant coursework"
                                    rows={3}
                                />
                            </div>
                        </div>
                    ))}

                    <Button onClick={handleAddEducation} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Education Entry
                    </Button>
                </div>
            )}
        </div>
    );
};