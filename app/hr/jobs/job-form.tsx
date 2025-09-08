"use client";

import { useState } from "react";
import { Job } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface JobFormProps {
    onAddJob: (job: Job) => void;
}

export function JobForm({ onAddJob }: JobFormProps) {
    const [formData, setFormData] = useState<Partial<Job>>({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        techStack: [],
        description: "",
        responsibilities: [""],
        requirements: [""],
        status: "Draft",
    });

    const [newTech, setNewTech] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddTech = () => {
        if (newTech.trim() && !formData.techStack?.includes(newTech.trim())) {
            setFormData({
                ...formData,
                techStack: [...(formData.techStack || []), newTech.trim()],
            });
            setNewTech("");
        }
    };

    const handleRemoveTech = (tech: string) => {
        setFormData({
            ...formData,
            techStack: formData.techStack?.filter((t) => t !== tech),
        });
    };

    const handleListItemChange = (
        type: 'responsibilities' | 'requirements',
        index: number,
        value: string
    ) => {
        const items = [...(formData[type] || [])];
        items[index] = value;
        setFormData({
            ...formData,
            [type]: items,
        });
    };

    const handleAddListItem = (type: 'responsibilities' | 'requirements') => {
        setFormData({
            ...formData,
            [type]: [...(formData[type] || []), ""],
        });
    };

    const handleRemoveListItem = (
        type: 'responsibilities' | 'requirements',
        index: number
    ) => {
        const items = [...(formData[type] || [])];
        items.splice(index, 1);
        setFormData({
            ...formData,
            [type]: items,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.department || !formData.location || !formData.description) {
            toast.error("Please fill in all required fields");
            return;
        }

        const newJob: Job = {
            id: `temp-${Date.now()}`,
            title: formData.title || "",
            department: formData.department || "",
            location: formData.location || "",
            type: formData.type as 'Full-time' | 'Part-time' | 'Contract' | 'Remote',
            techStack: formData.techStack || [],
            description: formData.description || "",
            responsibilities: formData.responsibilities?.filter(r => r.trim()) || [],
            requirements: formData.requirements?.filter(r => r.trim()) || [],
            postedDate: new Date().toISOString().split('T')[0],
            status: formData.status as 'Open' | 'Closed' | 'Draft',
        };

        onAddJob(newJob);
        toast.success(`Job "${newJob.title}" created successfully`);

        // Reset form
        setFormData({
            title: "",
            department: "",
            location: "",
            type: "Full-time",
            techStack: [],
            description: "",
            responsibilities: [""],
            requirements: [""],
            status: "Draft",
        });
    };

    return (
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-auto sm:max-w-3xl">
            <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>
                    Fill in the details below to create a new job posting. All fields marked with * are required.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Job Title <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Senior Frontend Developer"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="department">
                            Department <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            placeholder="e.g. Engineering"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">
                            Location <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g. San Francisco, CA or Remote"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Job Type</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => handleSelectChange("type", value)}
                        >
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Remote">Remote</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">
                        Job Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter a detailed job description..."
                        rows={4}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label>Tech Stack</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            placeholder="Enter a technology..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTech();
                                }
                            }}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleAddTech}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <AnimatePresence>
                            {formData.techStack?.map((tech) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Badge variant="secondary" className="gap-1 pl-2">
                                        {tech}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                                            onClick={() => handleRemoveTech(tech)}
                                        >
                                            <X className="h-3 w-3" />
                                            <span className="sr-only">Remove {tech}</span>
                                        </Button>
                                    </Badge>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Responsibilities</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1"
                            onClick={() => handleAddListItem("responsibilities")}
                        >
                            <Plus className="h-3 w-3" />
                            <span className="text-xs">Add</span>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <AnimatePresence>
                            {formData.responsibilities?.map((responsibility, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        value={responsibility}
                                        onChange={(e) =>
                                            handleListItemChange(
                                                "responsibilities",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter a responsibility..."
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleRemoveListItem("responsibilities", index)}
                                        disabled={formData.responsibilities?.length === 1}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Requirements</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1"
                            onClick={() => handleAddListItem("requirements")}
                        >
                            <Plus className="h-3 w-3" />
                            <span className="text-xs">Add</span>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <AnimatePresence>
                            {formData.requirements?.map((requirement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        value={requirement}
                                        onChange={(e) =>
                                            handleListItemChange(
                                                "requirements",
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter a requirement..."
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleRemoveListItem("requirements", index)}
                                        disabled={formData.requirements?.length === 1}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Post Status</Label>
                    <Select
                        value={formData.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                    >
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <DialogFooter>
                    <Button type="submit">Create Job Posting</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}