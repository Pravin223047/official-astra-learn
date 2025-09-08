'use client';

import { useState } from 'react';
import { useResumeContext } from '@/contexts/resume-context';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Download, FileText, RefreshCw } from 'lucide-react';

export const PreviewOptions = () => {
    const {
        customization,
        updateCustomization,
        fileName,
        setFileName,
        jobDescription,
        setJobDescription,
        atsScore,
        setAtsScore,
    } = useResumeContext();

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyzeResume = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setAtsScore({
                score: 85,
                feedback: {
                    keywords: {
                        matched: [
                            'Project Management',
                            'Team Leadership',
                            'Agile Methodology',
                        ],
                        missing: [
                            'Kubernetes',
                            'CI/CD',
                        ],
                    },
                    format: {
                        score: 90,
                        suggestions: [
                            'Use standard section headings',
                            'Avoid using tables or graphics',
                        ],
                    },
                    content: {
                        score: 80,
                        suggestions: [
                            'Add more industry-specific technical skills',
                            'Tailor achievements to job requirements',
                            'Include more action verbs at the beginning of bullet points',
                        ],
                    },
                },
                generalSuggestions: []
            });
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Resume Preview Options
                </h2>
                <p className="text-muted-foreground">
                    Fine-tune your resume's appearance and analyze its ATS compatibility.
                </p>
            </div>

            <Tabs defaultValue="appearance">
                <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="export">Export</TabsTrigger>
                    <TabsTrigger value="ats">ATS Analysis</TabsTrigger>
                </TabsList>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Template</CardTitle>
                            <CardDescription>
                                Choose a template for your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="template">Template Style</Label>
                                <div className="flex space-x-2">
                                    {['professional', 'modern', 'minimalist'].map((style) => (
                                        <Button
                                            key={style}
                                            variant={
                                                customization.template === style ? 'default' : 'outline'
                                            }
                                            onClick={() => updateCustomization({ template: style })}
                                            size="sm"
                                        >
                                            {style.charAt(0).toUpperCase() + style.slice(1)}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fontSize">Font Size</Label>
                                <div className="flex items-center space-x-2">
                                    {(['small', 'medium', 'large'] as const).map((size) => (
                                        <Button
                                            key={size}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateCustomization({ fontSize: size })}
                                            className={
                                                customization.fontSize === size ? 'border-primary' : ''
                                            }
                                        >
                                            {size.charAt(0).toUpperCase() + size.slice(1)}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="showPhoto"
                                    checked={customization.showPhoto}
                                    onCheckedChange={(checked) =>
                                        updateCustomization({ showPhoto: checked })
                                    }
                                />
                                <Label htmlFor="showPhoto">Include Photo</Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Export Tab */}
                <TabsContent value="export" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Export Options</CardTitle>
                            <CardDescription>
                                Configure your resume file settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fileName">File Name</Label>
                                <Input
                                    id="fileName"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="my-resume"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="includeLinks"
                                    checked={customization.includeLinks}
                                    onCheckedChange={(checked) =>
                                        updateCustomization({ includeLinks: checked })
                                    }
                                />
                                <Label htmlFor="includeLinks">Include Hyperlinks</Label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">
                                <Save className="mr-2 h-4 w-4" />
                                Save
                            </Button>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* ATS Tab */}
                <TabsContent value="ats" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>ATS Optimization</CardTitle>
                            <CardDescription>
                                Check how well your resume performs with Applicant Tracking
                                Systems
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="jobDescription">Job Description</Label>
                                <Textarea
                                    id="jobDescription"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job description here to analyze your resume's compatibility"
                                    rows={5}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={handleAnalyzeResume}
                                disabled={isAnalyzing || !jobDescription.trim()}
                                className="w-full"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Analyze Resume
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* ATS Score Display */}
                    {atsScore && (
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    ATS Compatibility Score: {atsScore.score}%
                                </CardTitle>
                                <CardDescription>
                                    Analysis results for your resume
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-2">Matched Keywords</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {atsScore.feedback.keywords.matched.map((item, index) => (
                                            <li key={index} className="text-sm">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Missing Keywords</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-red-500">
                                        {atsScore.feedback.keywords.missing.map((item, index) => (
                                            <li key={index} className="text-sm">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Format Suggestions</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {atsScore.feedback.format.suggestions.map((tip, index) => (
                                            <li key={index} className="text-sm">
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Content Suggestions</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {atsScore.feedback.content.suggestions.map((tip, index) => (
                                            <li key={index} className="text-sm">
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};
