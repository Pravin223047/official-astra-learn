"use client";

import { motion } from "framer-motion";
import { MapPinIcon, Clock, BriefcaseIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Job } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { JobModal } from "./job-modal";


interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    const statusColors = {
        Open: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
        Closed: "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400",
        Draft: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <CardTitle>{job.title}</CardTitle>
                        <Badge
                            variant="outline"
                            className={`${statusColors[job.status]}`}
                        >
                            {job.status}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <BriefcaseIcon className="mr-1 h-3.5 w-3.5" />
                            {job.department}
                        </div>
                        <div className="flex items-center">
                            <MapPinIcon className="mr-1 h-3.5 w-3.5" />
                            {job.location}
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            {job.type}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                        {job.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="px-1.5 py-0 text-xs">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t bg-muted/10 px-6 py-3">
                    <div className="text-sm text-muted-foreground">
                        Posted {format(parseISO(job.postedDate), "MMM d, yyyy")}
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm">View Details</Button>
                        </DialogTrigger>
                        <JobModal job={job} />
                    </Dialog>
                </CardFooter>
            </Card>
        </motion.div>
    );
}