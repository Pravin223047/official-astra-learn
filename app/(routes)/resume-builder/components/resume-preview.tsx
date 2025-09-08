'use client';

import { useState } from 'react';
import { useResumeContext } from '@/contexts/resume-context';
import { Button } from '@/components/ui/button';
// import { AtsScoreCard } from '@/components/resume/ats-score-card';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    ZoomIn,
    ZoomOut,
    Download,
    Eye,
    Edit,
    Palette,
    Type,
    Loader2,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FONT_FAMILIES, COLOR_SCHEMES } from '@/lib/constants';
import toast from 'react-hot-toast';
import { ProfessionalTemplate } from './resume/templates/professional-resume';
import { ModernTemplate } from './resume/templates/modern-resume';
import { MinimalistTemplate } from './resume/templates/minimalist-resume';

export function ResumePreview() {
    const { resumeData, customization, updateCustomization, fileName } = useResumeContext();
    const [zoom, setZoom] = useState(100);
    const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');
    const [showCustomization, setShowCustomization] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleZoomIn = () => {
        if (zoom < 150) setZoom(zoom + 10);
    };

    const handleZoomOut = () => {
        if (zoom > 50) setZoom(zoom - 10);
    };

    const handleReset = () => {
        setZoom(100);
    };

    const downloadPDF = async () => {
        try {
            setIsDownloading(true);
            const resumeElement = document.getElementById('resume-content');
            if (!resumeElement) return;

            // Reset zoom for capture
            const currentZoom = zoom;
            setZoom(100);

            // Wait for zoom transition
            await new Promise(resolve => setTimeout(resolve, 300));

            // A4 dimensions in points (72 DPI)
            const a4Width = 595.28;
            const a4Height = 841.89;

            // Create PDF with A4 dimensions
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });

            const canvas = await html2canvas(resumeElement, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                windowWidth: resumeElement.scrollWidth,
                windowHeight: resumeElement.scrollHeight,
            });

            // Calculate scaling to fit A4 while maintaining aspect ratio
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(a4Width / imgWidth, a4Height / imgHeight);

            const scaledWidth = imgWidth * ratio;
            const scaledHeight = imgHeight * ratio;

            // Center on page
            const x = (a4Width - scaledWidth) / 2;
            const y = (a4Height - scaledHeight) / 2;

            // Add image to PDF
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);

            // Save PDF
            pdf.save(`${fileName || 'resume'}.pdf`);

            // Restore zoom
            setZoom(currentZoom);

            toast.success("Your resume has been downloaded successfully!");
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.success("Failed to download resume. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    const renderTemplate = () => {
        switch (customization.template) {
            case 'professional':
                return <ProfessionalTemplate editable={previewMode === 'edit'} />;
            case 'modern':
                return <ModernTemplate editable={previewMode === 'edit'} />;
            case 'minimalist':
                return <MinimalistTemplate editable={previewMode === 'edit'} />;
            default:
                return <ProfessionalTemplate editable={previewMode === 'edit'} />;
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="bg-card border-b p-3 flex justify-between items-center">
                <div className="flex gap-1">
                    <Button
                        variant={previewMode === 'edit' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('edit')}
                        className="gap-1"
                    >
                        <Edit size={14} /> Edit
                    </Button>
                    <Button
                        variant={previewMode === 'preview' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('preview')}
                        className="gap-1"
                    >
                        <Eye size={14} /> Preview
                    </Button>
                    <Button
                        variant={showCustomization ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setShowCustomization(!showCustomization)}
                        className="gap-1"
                    >
                        <Palette size={14} /> Customize
                    </Button>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleZoomOut}
                        disabled={zoom <= 50}
                    >
                        <ZoomOut size={14} />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={handleReset}
                    >
                        {zoom}%
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleZoomIn}
                        disabled={zoom >= 150}
                    >
                        <ZoomIn size={14} />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 ml-2 gap-2"
                        onClick={downloadPDF}
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : (
                            <Download size={14} />
                        )}
                        {isDownloading ? 'Downloading...' : 'Download PDF'}
                    </Button>
                </div>
            </div>

            {/* Customization Panel */}
            {showCustomization && (
                <div className="bg-card border-b p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Type size={14} /> Font Family
                        </label>
                        <Select
                            value={customization.fontFamily}
                            onValueChange={(value) => updateCustomization({ fontFamily: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                                {FONT_FAMILIES.map((font) => (
                                    <SelectItem key={font.value} value={font.value}>
                                        {font.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Type size={14} /> Font Size
                        </label>
                        <Select
                            value={customization.fontSize}
                            onValueChange={(value: any) => updateCustomization({ fontSize: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Palette size={14} /> Color Scheme
                        </label>
                        <Select
                            value={customization.colorScheme}
                            onValueChange={(value) => updateCustomization({ colorScheme: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                                {COLOR_SCHEMES.map((scheme) => (
                                    <SelectItem key={scheme.value} value={scheme.value}>
                                        {scheme.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}

            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-muted/50 p-6">
                <div className="max-w-[850px] mx-auto space-y-6">
                    {/* ATS Score Card */}
                    {/* <AtsScoreCard score={resumeData.atsScore} /> */}

                    {/* Resume Document */}
                    <div
                        id="resume-content"
                        className="bg-white text-black shadow-lg min-h-[1100px] w-[595px] mx-auto flex flex-col overflow-hidden transition-transform"
                        style={{
                            transformOrigin: 'top center',
                            transform: `scale(${zoom / 100})`,
                            aspectRatio: '1 / 1.4142', // A4 aspect ratio
                        }}
                    >
                        {renderTemplate()}
                    </div>
                </div>
            </div>
        </div>
    );
}