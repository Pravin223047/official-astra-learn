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
import { JobFilterOptions } from "@/lib/types";
import { getAllDepartments, getAllJobSkills, getAllLocations } from "@/lib/data";

interface JobFilterProps {
    filterOptions: JobFilterOptions;
    setFilterOptions: (options: JobFilterOptions) => void;
}

export function JobFilter({
    filterOptions,
    setFilterOptions,
}: JobFilterProps) {
    const [search, setSearch] = useState("");

    const departments = getAllDepartments();
    const locations = getAllLocations();
    const skills = getAllJobSkills();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFilterOptions({ ...filterOptions, role: search });
    };

    const toggleSkill = (skill: string) => {
        setFilterOptions({
            ...filterOptions,
            techStack: filterOptions.techStack
                ? filterOptions.techStack.includes(skill)
                    ? filterOptions.techStack.filter((s) => s !== skill)
                    : [...filterOptions.techStack, skill]
                : [skill],
        });
    };

    const setDepartment = (department: string | undefined) => {
        setFilterOptions({
            ...filterOptions,
            department,
        });
    };

    const setLocation = (location: string | undefined) => {
        setFilterOptions({
            ...filterOptions,
            location,
        });
    };

    const setStatus = (status: 'Open' | 'Closed' | 'Draft' | undefined) => {
        setFilterOptions({
            ...filterOptions,
            status,
        });
    };

    const clearFilters = () => {
        setFilterOptions({});
        setSearch("");
    };

    const hasActiveFilters = Boolean(
        filterOptions.department ||
        filterOptions.location ||
        filterOptions.status ||
        (filterOptions.techStack && filterOptions.techStack.length > 0)
    );

    return (
        <div className="mb-6 space-y-4">
            <form
                onSubmit={handleSearchSubmit}
                className="relative flex w-full max-w-sm items-center"
            >
                <SearchIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search job roles..."
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
                                    {(filterOptions.techStack?.length || 0) +
                                        (filterOptions.department ? 1 : 0) +
                                        (filterOptions.location ? 1 : 0) +
                                        (filterOptions.status ? 1 : 0)}
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
                                                checked={filterOptions.techStack?.includes(skill)}
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
                                <h4 className="mb-2 font-medium">Department</h4>
                                <div className="space-y-2">
                                    {departments.map((department) => (
                                        <div key={department} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`department-${department}`}
                                                checked={filterOptions.department === department}
                                                onCheckedChange={(checked) =>
                                                    setDepartment(checked ? department : undefined)
                                                }
                                            />
                                            <Label
                                                htmlFor={`department-${department}`}
                                                className="text-sm font-normal"
                                            >
                                                {department}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-2 font-medium">Location</h4>
                                <div className="space-y-2">
                                    {locations.map((location) => (
                                        <div key={location} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`location-${location}`}
                                                checked={filterOptions.location === location}
                                                onCheckedChange={(checked) =>
                                                    setLocation(checked ? location : undefined)
                                                }
                                            />
                                            <Label
                                                htmlFor={`location-${location}`}
                                                className="text-sm font-normal"
                                            >
                                                {location}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-2 font-medium">Status</h4>
                                <div className="space-y-2">
                                    {(['Open', 'Closed', 'Draft'] as const).map((status) => (
                                        <div key={status} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`status-${status}`}
                                                checked={filterOptions.status === status}
                                                onCheckedChange={(checked) =>
                                                    setStatus(checked ? status : undefined)
                                                }
                                            />
                                            <Label
                                                htmlFor={`status-${status}`}
                                                className="text-sm font-normal"
                                            >
                                                {status}
                                            </Label>
                                        </div>
                                    ))}
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

                {filterOptions.techStack?.map((skill) => (
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

                {filterOptions.department && (
                    <Badge variant="outline" className="gap-1 pl-2">
                        {filterOptions.department}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setDepartment(undefined)}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove department filter</span>
                        </Button>
                    </Badge>
                )}

                {filterOptions.location && (
                    <Badge variant="outline" className="gap-1 pl-2">
                        {filterOptions.location}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setLocation(undefined)}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove location filter</span>
                        </Button>
                    </Badge>
                )}

                {filterOptions.status && (
                    <Badge variant="outline" className="gap-1 pl-2">
                        {filterOptions.status}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setStatus(undefined)}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove status filter</span>
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