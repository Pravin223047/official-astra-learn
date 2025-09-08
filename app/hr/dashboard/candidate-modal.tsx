"use client";

import { CalendarIcon, CheckCircleIcon, GithubIcon, LinkedinIcon, GlobeIcon } from "lucide-react";
import { format } from "date-fns";
import { Candidate } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface CandidateModalProps {
    candidate: Candidate;
}

export function CandidateModal({ candidate }: CandidateModalProps) {
    return (
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-auto sm:max-w-3xl">
            <DialogHeader>
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image
                            src={candidate.avatar}
                            alt={candidate.name}
                            width={64}
                            height={64}
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div>
                        <DialogTitle className="text-2xl">{candidate.name}</DialogTitle>
                        <DialogDescription className="flex flex-wrap gap-2 pt-1">
                            {candidate.skills.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </DialogDescription>
                    </div>
                </div>
            </DialogHeader>

            <div className="mt-2 flex flex-wrap gap-3">
                {candidate.github && (
                    <a
                        href={candidate.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <GithubIcon className="h-4 w-4" /> GitHub
                    </a>
                )}
                {candidate.linkedin && (
                    <a
                        href={candidate.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <LinkedinIcon className="h-4 w-4" /> LinkedIn
                    </a>
                )}
                {candidate.portfolio && (
                    <a
                        href={candidate.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <GlobeIcon className="h-4 w-4" /> Portfolio
                    </a>
                )}
            </div>

            <Tabs defaultValue="profile" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">ATS Score</CardTitle>
                                <CardDescription>
                                    Application Tracking System evaluation
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end justify-between">
                                    <div className="text-3xl font-bold">
                                        {candidate.atsScore}
                                        <span className="text-base font-normal text-muted-foreground">
                                            /100
                                        </span>
                                    </div>
                                    <div className="text-right text-sm text-muted-foreground">
                                        {candidate.atsScore >= 90
                                            ? "Excellent"
                                            : candidate.atsScore >= 80
                                                ? "Very Good"
                                                : candidate.atsScore >= 70
                                                    ? "Good"
                                                    : "Average"}
                                    </div>
                                </div>
                                <Progress value={candidate.atsScore} className="mt-2 h-2" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Mock Interviews</CardTitle>
                                <CardDescription>
                                    Performance in technical assessments
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end justify-between">
                                    <div className="text-3xl font-bold">
                                        {candidate.mockInterviews}
                                        <span className="text-base font-normal text-muted-foreground">
                                            {" "}interviews
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground">
                                    {candidate.mockInterviews > 2
                                        ? "Multiple assessments completed"
                                        : candidate.mockInterviews === 0
                                            ? "No interviews yet"
                                            : "Initial assessment completed"}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Technical Skills</CardTitle>
                            <CardDescription>
                                Primary technical competencies
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {candidate.skills.map((skill) => (
                                    <Badge key={skill} className="px-3 py-1 text-xs">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {candidate.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{candidate.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                    {candidate.experience.length > 0 ? (
                        candidate.experience.map((exp, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-base">{exp.position}</CardTitle>
                                    <CardDescription>{exp.company}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <span>
                                            {format(new Date(exp.startDate), "MMM yyyy")} —
                                            {exp.endDate
                                                ? format(new Date(exp.endDate), " MMM yyyy")
                                                : " Present"}
                                        </span>
                                    </div>
                                    <p className="text-sm">{exp.description}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                            <p className="text-center text-muted-foreground">
                                No experience information available
                            </p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                    {candidate.education.length > 0 ? (
                        candidate.education.map((edu, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-base">{edu.degree} in {edu.field}</CardTitle>
                                    <CardDescription>{edu.institution}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <span>
                                            {edu.startYear} — {edu.endYear}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                            <p className="text-center text-muted-foreground">
                                No education information available
                            </p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-between">
                {candidate.resumeUrl ? (
                    <Button variant="outline">View Resume</Button>
                ) : (
                    <div />
                )}
                <Button>Contact Candidate</Button>
            </div>
        </DialogContent>
    );
}