"use client";

import { useState } from "react";
import { SearchIcon, FilterIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FilterOptions } from "@/lib/types";

interface CandidateFilterProps {
    skills: string[];
    filterOptions: FilterOptions;
    setFilterOptions: (options: FilterOptions) => void;
}

export function CandidateFilter({
    skills,
    filterOptions,
    setFilterOptions,
}: CandidateFilterProps) {
    const [search, setSearch] = useState(filterOptions.search || "");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFilterOptions({ ...filterOptions, search });
    };

    const toggleSkill = (skill: string) => {
        setFilterOptions({
            ...filterOptions,
            techStack: filterOptions.techStack.includes(skill)
                ? filterOptions.techStack.filter((s) => s !== skill)
                : [...filterOptions.techStack, skill],
        });
    };

    const toggleSelectedFilter = () => {
        setFilterOptions({
            ...filterOptions,
            selected: filterOptions.selected === true ? undefined : true,
        });
    };

    const clearFilters = () => {
        setFilterOptions({ techStack: [], search: undefined, selected: undefined });
        setSearch("");
    };

    const hasActiveFilters = filterOptions.techStack.length > 0 || filterOptions.selected !== undefined;

    return (
        <div className="mb-6 space-y-4">
            <form
                onSubmit={handleSearchSubmit}
                className="relative flex w-full max-w-sm items-center"
            >
                <SearchIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search candidates..."
                    className="pl-9"
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button type="submit" variant="ghost" className="absolute right-0">
                    Search
                </Button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <FilterIcon className="h-3.5 w-3.5" />
                            <span>Filter</span>
                            {hasActiveFilters && (
                                <Badge variant="secondary" className="ml-1 rounded-full px-1">
                                    {filterOptions.techStack.length +
                                        (filterOptions.selected !== undefined ? 1 : 0)}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="space-y-4">
                            <div>
                                <h4 className="mb-2 font-medium">Tech Stack</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {skills.map((skill) => (
                                        <div key={skill} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`skill-${skill}`}
                                                checked={filterOptions.techStack.includes(skill)}
                                                onCheckedChange={() => toggleSkill(skill)}
                                            />
                                            <Label
                                                htmlFor={`skill-${skill}`}
                                                className="text-sm font-normal"
                                            >
                                                {skill}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-2 font-medium">Status</h4>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="selected-only"
                                        checked={filterOptions.selected === true}
                                        onCheckedChange={toggleSelectedFilter}
                                    />
                                    <Label htmlFor="selected-only" className="text-sm font-normal">
                                        Selected candidates only
                                    </Label>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    disabled={!hasActiveFilters}
                                >
                                    Clear filters
                                </Button>
                                <Button size="sm">Apply Filters</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {filterOptions.techStack.map((skill) => (
                    <Badge key={skill} variant="outline" className="gap-1 pl-2">
                        {skill}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => toggleSkill(skill)}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {skill} filter</span>
                        </Button>
                    </Badge>
                ))}

                {filterOptions.selected && (
                    <Badge variant="outline" className="gap-1 pl-2">
                        Selected only
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={toggleSelectedFilter}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove selected filter</span>
                        </Button>
                    </Badge>
                )}

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground"
                        onClick={clearFilters}
                    >
                        Clear all
                    </Button>
                )}
            </div>
        </div>
    );
}