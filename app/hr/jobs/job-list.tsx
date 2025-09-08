"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Job, JobFilterOptions } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { JobForm } from "./job-form";
import { JobCard } from "./job-card";
import { JobFilter } from "./job-filter";

interface JobListProps {
    initialJobs: Job[];
}

export function JobList({ initialJobs }: JobListProps) {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [filterOptions, setFilterOptions] = useState<JobFilterOptions>({});
    const [sortBy, setSortBy] = useState<string>("newest");

    const handleAddJob = useCallback((newJob: Job) => {
        setJobs((prev) => [newJob, ...prev]);
    }, []);

    const filteredJobs = jobs.filter((job) => {
        // Filter by tech stack
        if (
            filterOptions.techStack &&
            filterOptions.techStack.length > 0 &&
            !filterOptions.techStack.some((skill) => job.techStack.includes(skill))
        ) {
            return false;
        }

        // Filter by department
        if (filterOptions.department && job.department !== filterOptions.department) {
            return false;
        }

        // Filter by location
        if (filterOptions.location && job.location !== filterOptions.location) {
            return false;
        }

        // Filter by status
        if (filterOptions.status && job.status !== filterOptions.status) {
            return false;
        }

        // Filter by role (search term)
        if (
            filterOptions.role &&
            !job.title.toLowerCase().includes(filterOptions.role.toLowerCase()) &&
            !job.department.toLowerCase().includes(filterOptions.role.toLowerCase())
        ) {
            return false;
        }

        return true;
    });

    // Sort jobs
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
            case "oldest":
                return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
            case "title":
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    return (
        <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
                <h1 className="text-2xl font-bold">Job Postings</h1>
                <div className="flex items-center gap-2">
                    <Label htmlFor="sort-by" className="text-sm">
                        Sort by:
                    </Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort-by" className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="mb-6 flex items-end justify-between">
                <JobFilter
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                />

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-1">
                            <Plus className="h-4 w-4" /> New Job
                        </Button>
                    </DialogTrigger>
                    <JobForm onAddJob={handleAddJob} />
                </Dialog>
            </div>

            <AnimatePresence>
                {sortedJobs.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {sortedJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed text-center"
                    >
                        <p className="mb-2 text-lg font-medium">No jobs found</p>
                        <p className="text-sm text-muted-foreground">
                            Try adjusting your filters or add a new job posting
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}