"use client";

import { useResumeContext } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { PROFICIENCY_LEVELS } from "@/lib/constants";

export const LanguagesForm = () => {
    const { resumeData, addLanguage, updateLanguage, removeLanguage } = useResumeContext();

    const handleAddLanguage = () => {
        addLanguage({
            name: "",
            proficiency: "Beginner"
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Languages</h2>
                <p className="text-muted-foreground">
                    Add languages you can communicate in and your proficiency level.
                </p>
            </div>

            {resumeData.languages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-lg">
                    <p className="mb-4 text-muted-foreground">No languages added yet</p>
                    <Button onClick={handleAddLanguage}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Language
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {resumeData.languages.map((language, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">
                                    {language.name || "New Language"}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeLanguage(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`language-${index}`}>Language</Label>
                                    <Input
                                        id={`language-${index}`}
                                        value={language.name}
                                        onChange={(e) =>
                                            updateLanguage(index, {
                                                ...language,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="e.g., English, Spanish"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`proficiency-${index}`}>Proficiency Level</Label>
                                    <Select
                                        value={language.proficiency}
                                        onValueChange={(value) =>
                                            updateLanguage(index, {
                                                ...language,
                                                proficiency: value as typeof language.proficiency,
                                            })
                                        }
                                    >
                                        <SelectTrigger id={`proficiency-${index}`}>
                                            <SelectValue placeholder="Select proficiency level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PROFICIENCY_LEVELS.map((level) => (
                                                <SelectItem key={level.value} value={level.value}>
                                                    {level.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button onClick={handleAddLanguage} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Language
                    </Button>
                </div>
            )}
        </div>
    );
};