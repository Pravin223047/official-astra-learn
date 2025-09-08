"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, GlobeIcon, ExternalLinkIcon } from "lucide-react";
import { Candidate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CandidateModal } from "./candidate-modal";

interface CandidateCardProps {
    candidate: Candidate;
    onToggleSelect: (id: string, selected: boolean) => void;
}

export function CandidateCard({ candidate, onToggleSelect }: CandidateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-full"
        >
            <Card className="flex h-full flex-col overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardContent className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                <Image
                                    src={candidate.avatar}
                                    alt={candidate.name}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div>
                                <h3 className="font-medium">{candidate.name}</h3>
                                <div className="flex space-x-1">
                                    {candidate.skills.slice(0, 2).map((skill) => (
                                        <Badge key={skill} variant="secondary" className="mr-1">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {candidate.skills.length > 2 && (
                                        <Badge variant="outline">+{candidate.skills.length - 2}</Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Checkbox
                            checked={candidate.selected}
                            onCheckedChange={(checked) =>
                                onToggleSelect(candidate.id, checked as boolean)
                            }
                            aria-label={`Select ${candidate.name}`}
                        />
                    </div>

                    <div className="mb-4 flex items-center justify-between text-sm">
                        <div className="flex space-x-2">
                            {candidate.github && (
                                <a
                                    href={candidate.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <GithubIcon className="h-5 w-5" />
                                </a>
                            )}
                            {candidate.linkedin && (
                                <a
                                    href={candidate.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <LinkedinIcon className="h-5 w-5" />
                                </a>
                            )}
                            {candidate.portfolio && (
                                <a
                                    href={candidate.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <GlobeIcon className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto space-y-3">
                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Resume Score</span>
                                <span className="text-sm font-medium">{candidate.resumeScore}%</span>
                            </div>
                            <Progress value={candidate.resumeScore} className="h-2" />
                        </div>

                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">ATS Score</span>
                                <span className="text-sm font-medium">{candidate.atsScore}%</span>
                            </div>
                            <Progress value={candidate.atsScore} className="h-2" />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t bg-muted/10 px-6 py-3">
                    {candidate.resumeUrl ? (
                        <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLinkIcon className="h-4 w-4" /> Resume
                        </Button>
                    ) : (
                        <span className="text-sm text-muted-foreground">No resume</span>
                    )}

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm">View Profile</Button>
                        </DialogTrigger>
                        <CandidateModal candidate={candidate} />
                    </Dialog>
                </CardFooter>
            </Card>
        </motion.div>
    );
}