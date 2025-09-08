"use client";

import { useState } from "react";
import { useResumeContext } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, X } from "lucide-react";

export const SkillsForm = () => {
    const {
        resumeData,
        addSkillCategory,
        updateSkillCategory,
        removeSkillCategory,
        addSkill,
        updateSkill,
        removeSkill,
    } = useResumeContext();

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
                <p className="text-muted-foreground">
                    Add your technical and professional skills, grouped by category.
                </p>
            </div>

            {resumeData.skillCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-lg">
                    <p className="mb-4 text-muted-foreground">No skill categories added yet</p>
                    <Button onClick={addSkillCategory}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Skill Category
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {resumeData.skillCategories.map((category) => (
                        <div key={category.id} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="space-y-2 flex-1 mr-4">
                                    <Label htmlFor={`category-${category.id}`}>Category Name</Label>
                                    <Input
                                        id={`category-${category.id}`}
                                        value={category.name}
                                        onChange={(e) =>
                                            updateSkillCategory(category.id, { name: e.target.value })
                                        }
                                        placeholder="e.g., Programming Languages, Soft Skills"
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSkillCategory(category.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>Skills</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addSkill(category.id, { name: "" })}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Skill
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {category.skills.map((skill, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={skill.name}
                                                onChange={(e) =>
                                                    updateSkill(category.id, index, {
                                                        ...skill,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="Skill name"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeSkill(category.id, index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button onClick={addSkillCategory} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Category
                    </Button>
                </div>
            )}
        </div>
    );
};