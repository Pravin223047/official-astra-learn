import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Star, Zap, Award, CheckSquare } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
                <div className="container relative z-10 pt-20 pb-16 md:pt-32 md:pb-24 max-w-6xl mx-auto px-4">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                            AI-Powered Resume Builder
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-3xl">
                            Create an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">ATS-optimized</span> resume in minutes
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                            Build a professional resume that gets past ATS systems and impresses recruiters with our AI-powered editor.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center pt-4">
                            <Link href="/resume/create">
                                <Button size="lg" className="rounded-full h-12 px-8 font-medium gap-2">
                                    Create Resume <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="rounded-full h-12 px-8 font-medium">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/30">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to create professional, ATS-friendly resumes</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FileText className="h-8 w-8 text-blue-600" />}
                            title="Beautiful Templates"
                            description="Choose from a variety of professional templates designed to impress recruiters."
                        />
                        <FeatureCard
                            icon={<Star className="h-8 w-8 text-purple-600" />}
                            title="ATS Optimization"
                            description="Get real-time feedback on how well your resume meets ATS requirements."
                        />
                        <FeatureCard
                            icon={<Zap className="h-8 w-8 text-amber-600" />}
                            title="AI Suggestions"
                            description="Receive AI-powered suggestions to improve your resume content and structure."
                        />
                        <FeatureCard
                            icon={<CheckSquare className="h-8 w-8 text-green-600" />}
                            title="Job Matching"
                            description="Upload job descriptions and see how well your resume matches the requirements."
                        />
                        <FeatureCard
                            icon={<Award className="h-8 w-8 text-red-600" />}
                            title="One-Click Export"
                            description="Export your resume as a PDF with a single click, ready to send to recruiters."
                        />
                        <FeatureCard
                            icon={<FileText className="h-8 w-8 text-teal-600" />}
                            title="Smart Formatting"
                            description="Automatic formatting ensures your resume always looks professional."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 md:p-16 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to stand out from the crowd?</h2>
                        <p className="text-white/90 max-w-2xl mx-auto mb-8">Create your ATS-optimized resume today and increase your chances of landing your dream job.</p>
                        <Link href="/resume/create">
                            <Button variant="secondary" size="lg" className="rounded-full h-12 px-8 font-medium gap-2">
                                Get Started <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FeatureCard({ icon, title, description }: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}