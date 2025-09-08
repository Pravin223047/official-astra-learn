"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import { useResumeContext } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { analyzeResumeWithAI } from "@/lib/gemini-service";
import { ArrowRight, Save, Upload, Image as ImageIcon } from "lucide-react";
import { PHOTO_BORDER_RADIUS } from "@/lib/constants";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const personalInfoSchema = z.object({
    fullName: z.string().min(1, { message: "Name is required" }),
    title: z.string().min(1, { message: "Professional title is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
    linkedin: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
    github: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
    summary: z.string().min(1, { message: "Professional summary is required" }),
    photo: z.string().optional(),
});

export function PersonalInfoForm() {
    const { resumeData, updateResumeData, setCurrentStep, jobDescription, setAtsScore, customization, updateCustomization } = useResumeContext();
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof personalInfoSchema>>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            fullName: resumeData.personal.fullName || "",
            title: resumeData.personal.title || "",
            email: resumeData.personal.email || "",
            phone: resumeData.personal.phone || "",
            location: resumeData.personal.location || "",
            website: resumeData.personal.website || "",
            linkedin: resumeData.personal.linkedin || "",
            github: resumeData.personal.github || "",
            summary: resumeData.personal.summary || "",
            photo: resumeData.personal.photo || "",
        },
    });

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            toast.error("Please upload a JPEG, PNG, or WebP image.");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.error("Please upload an image smaller than 5MB.");
            return;
        }

        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                form.setValue("photo", base64String);
                updateResumeData({
                    personal: {
                        ...resumeData.personal,
                        photo: base64String,
                    },
                });
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error("Failed to process the image. Please try again.");
        }
    };

    const onSubmit = async (data: z.infer<typeof personalInfoSchema>) => {
        updateResumeData({
            personal: {
                ...data,
                phone: data.phone ?? "",
                location: data.location ?? "",
                website: data.website ?? "",
                linkedin: data.linkedin ?? "",
                github: data.github ?? "",
                photo: data.photo ?? "",
            },
        });

        setIsSaving(true);

        try {
            // Only analyze if job description is available
            if (jobDescription) {
                const scoreResult = await analyzeResumeWithAI({
                    resumeData: {
                        ...resumeData,
                        personal: {
                            ...data,
                            phone: data.phone ?? "",
                            location: data.location ?? "",
                            website: data.website ?? "",
                            linkedin: data.linkedin ?? "",
                            github: data.github ?? "",
                            photo: data.photo ?? "",
                        },
                    },
                    jobDescription,
                    section: "personal",
                });

                setAtsScore(scoreResult);

                toast.success(`Your resume scored ${scoreResult.score} out of 100.`);
            }
        } catch (error) {
            console.error("Error analyzing resume:", error);
            toast.error("Could not analyze your resume. Please try again later.");
        }

        setIsSaving(false);
    };

    const onContinue = () => {
        setCurrentStep("experience");
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Personal Information</h2>
                <p className="text-muted-foreground">
                    Let's start with your personal and contact information.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Professional Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Software Engineer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1 (555) 123-4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="San Francisco, CA" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Personal Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://johndoe.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LinkedIn</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GitHub</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://github.com/johndoe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <FormLabel>Profile Photo</FormLabel>
                                <p className="text-sm text-muted-foreground">
                                    Add a professional photo to your resume
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={customization.showPhoto}
                                    onCheckedChange={(checked) =>
                                        updateCustomization({ showPhoto: checked })
                                    }
                                    id="show-photo"
                                />
                                <FormLabel htmlFor="show-photo" className="cursor-pointer">
                                    Include Photo
                                </FormLabel>
                            </div>
                        </div>

                        {customization.showPhoto && (
                            <div className="space-y-4">
                                <div className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <FormLabel>Photo Style</FormLabel>
                                        <Select
                                            value={customization.photoBorderRadius}
                                            onValueChange={(value: 'square' | 'rounded' | 'circle') =>
                                                updateCustomization({ photoBorderRadius: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {PHOTO_BORDER_RADIUS.map((style) => (
                                                    <SelectItem key={style.value} value={style.value}>
                                                        {style.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="gap-2"
                                    >
                                        <Upload size={16} />
                                        Upload Photo
                                    </Button>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />

                                {resumeData.personal.photo && (
                                    <div className="relative w-32 h-32 mx-auto">
                                        <img
                                            src={resumeData.personal.photo}
                                            alt="Profile"
                                            className={`w-full h-full object-cover ${customization.photoBorderRadius === 'circle'
                                                ? 'rounded-full'
                                                : customization.photoBorderRadius === 'rounded'
                                                    ? 'rounded-lg'
                                                    : ''
                                                }`}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Professional Summary</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="A brief summary of your professional background and career goals..."
                                        className="min-h-[120px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between pt-4">
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="gap-2"
                        >
                            <Save size={16} />
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                        <Button
                            type="button"
                            onClick={onContinue}
                            className="gap-2"
                        >
                            Continue <ArrowRight size={16} />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}