"use client";

import { format, parseISO } from "date-fns";
import { MapPinIcon, Clock, BriefcaseIcon, CalendarIcon } from "lucide-react";
import { Job } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface JobModalProps {
    job: Job;
}

export function JobModal({ job }: JobModalProps) {
    const statusColors = {
        Open: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
        Closed: "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400",
        Draft: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    };

    return (
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-auto sm:max-w-3xl">
            <DialogHeader>
                <div className="flex items-center justify-between">
                    <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                    <Badge
                        variant="outline"
                        className={`${statusColors[job.status]}`}
                    >
                        {job.status}
                    </Badge>
                </div>
                <DialogDescription className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                    <div className="flex items-center text-foreground">
                        <BriefcaseIcon className="mr-1.5 h-4 w-4" />
                        {job.department}
                    </div>
                    <div className="flex items-center text-foreground">
                        <MapPinIcon className="mr-1.5 h-4 w-4" />
                        {job.location}
                    </div>
                    <div className="flex items-center text-foreground">
                        <Clock className="mr-1.5 h-4 w-4" />
                        {job.type}
                    </div>
                    <div className="flex items-center text-foreground">
                        <CalendarIcon className="mr-1.5 h-4 w-4" />
                        Posted {format(parseISO(job.postedDate), "MMMM d, yyyy")}
                    </div>
                </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="mb-2 text-lg font-medium">Description</h3>
                    <p className="text-muted-foreground">{job.description}</p>
                </div>

                <div>
                    <h3 className="mb-2 text-lg font-medium">Responsibilities</h3>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                        {job.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-2 text-lg font-medium">Requirements</h3>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                        {job.requirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-2 text-lg font-medium">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.techStack.map((tech) => (
                            <Badge key={tech}>{tech}</Badge>
                        ))}
                    </div>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between">
                <Button variant="outline">Edit Job</Button>
                <Button>Apply Now</Button>
            </div>
        </DialogContent>
    );
}