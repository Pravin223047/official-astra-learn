"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Candidate, FilterOptions } from "@/lib/types";
import { getAllSkills } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CandidateFilter } from "./candidate-filter";
import { CandidateCard } from "./candidate-card";

interface CandidateListProps {
    initialCandidates: Candidate[];
}

export function CandidateList({ initialCandidates }: CandidateListProps) {
    const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        techStack: [],
    });
    const [sortBy, setSortBy] = useState<string>("name");

    const skills = getAllSkills();

    const handleToggleSelect = useCallback(
        (id: string, selected: boolean) => {
            setCandidates((prev) =>
                prev.map((candidate) =>
                    candidate.id === id ? { ...candidate, selected } : candidate
                )
            );
        },
        []
    );

    const filteredCandidates = candidates.filter((candidate) => {
        // Filter by tech stack
        if (
            filterOptions.techStack.length > 0 &&
            !filterOptions.techStack.some((skill) =>
                candidate.skills.includes(skill)
            )
        ) {
            return false;
        }

        // Filter by selected status
        if (filterOptions.selected !== undefined && candidate.selected !== filterOptions.selected) {
            return false;
        }

        // Filter by search term
        if (
            filterOptions.search &&
            !candidate.name.toLowerCase().includes(filterOptions.search.toLowerCase()) &&
            !candidate.skills.some((skill) =>
                skill.toLowerCase().includes(filterOptions.search!.toLowerCase())
            )
        ) {
            return false;
        }

        return true;
    });

    // Sort candidates
    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
        switch (sortBy) {
            case "name":
                return a.name.localeCompare(b.name);
            case "resumeScore":
                return b.resumeScore - a.resumeScore;
            case "atsScore":
                return b.atsScore - a.atsScore;
            default:
                return 0;
        }
    });

    return (
        <div>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
                <h1 className="text-2xl font-bold">Candidates</h1>
                <div className="flex items-center gap-2">
                    <Label htmlFor="sort-by" className="text-sm">
                        Sort by:
                    </Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort-by" className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="resumeScore">Resume Score</SelectItem>
                            <SelectItem value="atsScore">ATS Score</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <CandidateFilter
                skills={skills}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
            />

            <AnimatePresence>
                {sortedCandidates.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {sortedCandidates.map((candidate) => (
                            <CandidateCard
                                key={candidate.id}
                                candidate={candidate}
                                onToggleSelect={handleToggleSelect}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed text-center"
                    >
                        <p className="mb-2 text-lg font-medium">No candidates found</p>
                        <p className="text-sm text-muted-foreground">
                            Try adjusting your filters or search criteria
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}