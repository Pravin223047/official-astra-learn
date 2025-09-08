"use client";

import { useState } from "react";
import { useResumeContext } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2, X } from "lucide-react";

export const ProjectsForm = () => {
    const { resumeData, addProject, updateProject, removeProject } = useResumeContext();

    const handleAddTechnology = (projectId: string) => {
        const project = resumeData.projects.find(p => p.id === projectId);
        if (project) {
            updateProject(projectId, {
                technologies: [...project.technologies, ""]
            });
        }
    };

    const handleUpdateTechnology = (projectId: string, index: number, value: string) => {
        const project = resumeData.projects.find(p => p.id === projectId);
        if (project) {
            const technologies = [...project.technologies];
            technologies[index] = value;
            updateProject(projectId, { technologies });
        }
    };

    const handleRemoveTechnology = (projectId: string, index: number) => {
        const project = resumeData.projects.find(p => p.id === projectId);
        if (project) {
            const technologies = project.technologies.filter((_, i) => i !== index);
            updateProject(projectId, { technologies });
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
                <p className="text-muted-foreground">
                    Add notable projects that demonstrate your skills and experience.
                </p>
            </div>

            {resumeData.projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-lg">
                    <p className="mb-4 text-muted-foreground">No projects added yet</p>
                    <Button onClick={addProject}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Project
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {resumeData.projects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">
                                    {project.name || "New Project"}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeProject(project.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                                    <Input
                                        id={`name-${project.id}`}
                                        value={project.name}
                                        onChange={(e) =>
                                            updateProject(project.id, { name: e.target.value })
                                        }
                                        placeholder="Project Name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`link-${project.id}`}>Project Link</Label>
                                    <Input
                                        id={`link-${project.id}`}
                                        value={project.link}
                                        onChange={(e) =>
                                            updateProject(project.id, { link: e.target.value })
                                        }
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                                    <Input
                                        id={`startDate-${project.id}`}
                                        value={project.startDate}
                                        onChange={(e) =>
                                            updateProject(project.id, { startDate: e.target.value })
                                        }
                                        placeholder="MM/YYYY"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id={`endDate-${project.id}`}
                                            value={project.endDate}
                                            onChange={(e) =>
                                                updateProject(project.id, { endDate: e.target.value })
                                            }
                                            placeholder="MM/YYYY"
                                            disabled={project.current}
                                        />
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id={`current-${project.id}`}
                                                checked={project.current}
                                                onCheckedChange={(checked) =>
                                                    updateProject(project.id, { current: checked })
                                                }
                                            />
                                            <Label htmlFor={`current-${project.id}`} className="text-sm">
                                                Current
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`description-${project.id}`}>Description</Label>
                                <Textarea
                                    id={`description-${project.id}`}
                                    value={project.description}
                                    onChange={(e) =>
                                        updateProject(project.id, { description: e.target.value })
                                    }
                                    placeholder="Describe your project, its goals, and your role"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>Technologies Used</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddTechnology(project.id)}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Technology
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {project.technologies.map((tech, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={tech}
                                                onChange={(e) =>
                                                    handleUpdateTechnology(project.id, index, e.target.value)
                                                }
                                                placeholder="Technology name"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveTechnology(project.id, index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button onClick={addProject} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Project
                    </Button>
                </div>
            )}
        </div>
    );
};