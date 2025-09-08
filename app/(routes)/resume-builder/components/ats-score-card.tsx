'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AtsScoreResult } from '@/lib/types';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface AtsScoreCardProps {
    score: AtsScoreResult;
}

export function AtsScoreCard({ score }: AtsScoreCardProps) {
    // Determine score color
    const getScoreColor = () => {
        if (score && score.score >= 80) return 'text-green-600';
        if (score && score.score >= 60) return 'text-amber-600';
        return 'text-red-600';
    };

    // Determine progress color
    const getProgressColor = () => {
        if (score && score.score >= 80) return 'bg-green-600';
        if (score && score.score >= 60) return 'bg-amber-600';
        return 'bg-red-600';
    };

    return (
        <Card className="shadow-md border-t-4 border-t-blue-600">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-lg">ATS Compatibility Score</CardTitle>
                        <CardDescription>
                            Based on the job description you provided
                        </CardDescription>
                    </div>
                    <div className={`text-3xl font-bold ${getScoreColor()}`}>
                        {score && score.score}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1 text-sm">
                            <span>Poor</span>
                            <span>Good</span>
                            <span>Excellent</span>
                        </div>
                        <Progress
                            value={score && score.score}
                            className={`h-2 ${getProgressColor()}`}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* Keywords Section */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Keywords</h4>

                            <div>
                                <div className="flex items-center gap-1 text-sm text-green-600 mb-1">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Matched Keywords</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {score &&
                                        score.feedback.keywords.matched.map((keyword, i) => (
                                            <Badge
                                                key={i}
                                                variant="outline"
                                                className="bg-green-50 text-green-700 border-green-200"
                                            >
                                                {keyword}
                                            </Badge>
                                        ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-1 text-sm text-red-600 mb-1">
                                    <X className="h-4 w-4" />
                                    <span>Missing Keywords</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {score &&
                                        score.feedback.keywords.missing.map((keyword, i) => (
                                            <Badge
                                                key={i}
                                                variant="outline"
                                                className="bg-red-50 text-red-700 border-red-200"
                                            >
                                                {keyword}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Suggestions Section */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Recommendations</h4>
                            <ul className="space-y-1">
                                {score &&
                                    score.generalSuggestions.map((suggestion, i) => (
                                        <li key={i} className="text-sm flex gap-2">
                                            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                            <span>{suggestion}</span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
