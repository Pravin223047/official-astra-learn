"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BookOpen, Sparkles, Moon, Sun, Save, Share2, Download, RefreshCw, Book } from "lucide-react";
import { useTheme } from "next-themes";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";
import { saveAs } from 'file-saver';

import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { BookPreview } from "./components/bookepreview";

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is required");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const languageTypes = [
  { value: "c", label: "C" },
  { value: "cpp", label: "Cpp" },
  { value: "java", label: "Java" },
  { value: "sql", label: "Sql" },
  { value: "python", label: "Python" },
  { value: "react", label: "React" }
];

const audienceGroups = [
  { value: "begineer", label: "Begineer" },
  { value: "freshers", label: "Freshers" },
  { value: "adults", label: "Adults" },
  { value: "experience", label: "Experience" }
];

const writingStyles = [
  { value: "poetic", label: "Poetic" },
  { value: "descriptive", label: "Descriptive" },
  { value: "concise", label: "Concise" },
  { value: "dialogue", label: "Dialogue-Driven" }
];

const tabs = ["language", "audience", "style"];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("language");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [progress, setProgress] = useState(0);
  const [languageType, setLanguageType] = useState("");
  const [languagePrompt, setLanguagePrompt] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [writingStyle, setWritingStyle] = useState("");
  const [complexity, setComplexity] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLanguage, setGeneratedLanguage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [bookCoverImage, setBookCoverImage] = useState<string>(""); // Stores the book cover image URL
  const [chapterImages, setChapterImages] = useState<string[]>([]); // Stores all chapter image URLs
  const [chapterTexts, setChapterTexts] = useState<string[]>([]);

  const { user } = useUser();

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleSave = (currentTab: string) => {
    const currentTabIndex = tabs.indexOf(currentTab);
    const nextTab = tabs[currentTabIndex + 1];

    if (nextTab) {
      setActiveTab(nextTab);
    }

    const newProgress = Math.min(100, progress + 25);
    setProgress(newProgress);
  };

  const generatePrompt = () => {
    return `
**Generate a High-Quality, Immersive ${languageType} Language**

## Language Specifications:  
- **Target Audience:** ${ageGroup}  
- **Writing Style:** ${writingStyle}  
- **Complexity Level:** ${complexity[0]}%  
- **Language Premise:**  
  "${languagePrompt}"  

## Writing Guidelines:  
- Craft a **rich, engaging technical narrative** that immerses the reader in the world of the ${languageType} programming language.  
- Structure the language overview with a **compelling beginning (origin & purpose), well-paced middle (features, syntax, paradigms), and impactful ending (real-world applications, future scope)**.  
- Introduce **key concepts, modules, and syntax structures** as if they were **character-like elements**—with distinct roles, purposes, and interactions.  
- Maintain a **consistent tone and pacing**, aligned with the technical nature of the language and the audience’s knowledge level.  
- Incorporate **vivid, descriptive explanations** of how the language behaves, solves problems, and integrates into real-world systems.  
- Utilize **realistic developer dialogues** or inner monologues to explain challenges, solutions, and language advantages in a relatable manner.  
- Ensure **smooth transitions between concepts**, such as from syntax to applications, or from core features to ecosystem tools.  

## Formatting & Readability:  
- Structure the content into **well-defined sections and paragraphs** to enhance clarity and flow.  
- Include **one line break between paragraphs** to improve readability.  
- Use proper **code block formatting** to demonstrate syntax and functionality.  

## Language Enhancements:  
- Infuse the explanation with **original analogies, use-case storytelling, and thoughtful comparisons** to other languages.  
- Introduce **surprising capabilities, edge cases, and design philosophy insights** to deepen engagement.  
- Ensure the content is **refined, technically accurate, and educationally immersive**.  

**Deliver a masterfully crafted programming language overview that educates, captivates, and inspires developers from start to finish.**

## Expected JSON Output Format (DO NOT include markdown backticks):  
Return the response as pure JSON only — do not wrap it in \`\`\`json or \`\`\`.

{
  "language_cover": {
    "image_prompt": "",
    "title": ""
  },
  "chapters": [
    {
      "chapter_title": "",
      "chapter_text": "",
      "image_prompt": ""
    }
  ]
}
`;
  };

  async function generateCoverImage(title: string, prompt: string) {
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      return data.sceneUrl; // Returns Cloudinary image URL
    } catch (error) {
      console.error("Image generation error:", error);
      return null;
    }
  }

  async function saveLanguageData(userId: string, languageTitle: string, languagePrompt: string, languageType: string, ageGroup: string, writingStyle: string, complexity: number[], bookCoverImage: string, chapterTexts: string[], chapterImages: string[]) {
    try {
      const response = await fetch("/api/save-promptlanguage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, languageTitle, languagePrompt, languageType, ageGroup, writingStyle, complexity, bookCoverImage, chapterTexts, chapterImages }),
      });

      if (!response.ok) {
        throw new Error("Failed to save language data");
      }
    } catch (error) {
      console.error("Error saving language data:", error);
    }
  }


  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      setProgress(75);

      // Step 1: Generate the Language using AI Model
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = generatePrompt();
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const rawText = await response.text();

      // Step 2: Parse and Validate AI Response
      let languageData;
      try {
        const cleanedJson = rawText
          .replace(/^```json\s*/, '') // Remove opening code block
          .replace(/```$/, '')        // Remove closing backticks
          .trim();

        languageData = JSON.parse(cleanedJson);

        if (!languageData?.chapters?.length || !languageData?.language_cover) {
          throw new Error("AI response is missing required language elements.");
        }
      } catch (jsonError) {
        console.error("❌ Failed to parse AI response:", jsonError);
        setError("Failed to parse AI response. Please try again.");
        return;
      }


      // Step 3: Generate Book Cover Image
      const bookCoverImage = await generateCoverImage(
        languageData.language_cover.title,
        languageData.language_cover.image_prompt
      );
      setBookCoverImage(bookCoverImage);

      // Step 4: Generate Chapter Images
      const imageResponses = await Promise.allSettled(
        languageData.chapters.map((chapter: { chapter_title: string; image_prompt: string }) =>
          generateCoverImage(chapter.chapter_title, chapter.image_prompt)
        )
      );

      const successfulImages = imageResponses
        .filter((res) => res.status === "fulfilled")
        .map((res: any) => res.value);

      setChapterImages(successfulImages);

      // Step 5: Extract Chapter Texts
      const chapterTexts = languageData.chapters.map((chapter: { chapter_text: string }) => chapter.chapter_text);
      setChapterTexts(chapterTexts);

      // Step 6: Convert to Markdown
      setGeneratedLanguage(marked(chapterTexts.join("\n\n")) as string);

      const languageTitle = languageData.language_cover.title;

      // Step 7: Save Language Data
      if (user?.id) {
        await saveLanguageData(
          user.id,
          languageTitle,
          languagePrompt,
          languageType,
          ageGroup,
          writingStyle,
          complexity,
          bookCoverImage,
          chapterTexts,
          successfulImages
        );
      } else {
        console.error("❌ User ID is not defined");
      }

      // Success Handling
      setProgress(100);
      setShowConfetti(true);
      toast.success("🎉 Language and images generated successfully!");

      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error("❌ Error generating language:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };


  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My Generated Language',
        text: generatedLanguage.replace(/<[^>]*>/g, ''),
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLanguage.replace(/<[^>]*>/g, '')], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `language_${new Date().toISOString().slice(0, 10)}.txt`);
  };

  return (
    <div className="p-6">
      {showConfetti && <Confetti width={dimensions.width} height={dimensions.height} recycle={false} />}
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Tech Language Studio Creator
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="relative p-8 rounded-2xl border border-border bg-background/40 backdrop-blur-xl shadow-xl shadow-primary/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* Tabs List */}
              <TabsList className="rounded-lg gap-3 bg-muted/50">
                <TabsTrigger value="language" className="text-md font-medium transition-all hover:bg-primary/10">Language Type</TabsTrigger>
                <TabsTrigger value="audience" className="text-md font-medium transition-all hover:bg-primary/10">Audience</TabsTrigger>
                <TabsTrigger value="style" className="text-md font-medium transition-all hover:bg-primary/10">Style</TabsTrigger>
              </TabsList>

              {/* Language Tab */}
              <TabsContent value="language" className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Select Language Type</Label>
                  <Select value={languageType} onValueChange={setLanguageType}>
                    <SelectTrigger className="bg-background/50 border border-border shadow-sm hover:shadow-md transition-all">
                      <SelectValue placeholder="Choose a language type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border shadow-lg rounded-lg">
                      {languageTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="hover:bg-primary/10 transition-all">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Language Prompt</Label>
                    <Textarea
                      placeholder="Describe the language you want to create..."
                      value={languagePrompt}
                      onChange={(e) => setLanguagePrompt(e.target.value)}
                      className="h-32 bg-background/50 border border-border shadow-sm hover:shadow-md transition-all"
                    />
                  </div>
                  <Button
                    onClick={() => handleSave("langauge")}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-xl shadow-primary/10 rounded-lg px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    disabled={!languageType || !languagePrompt}
                  >
                    {/* Subtle Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>

                    {/* Button Content */}
                    <Save className="mr-2 h-5 w-5 text-white/80 group-hover:text-white transition-all duration-300" />
                    Save & Continue
                  </Button>

                </div>
              </TabsContent>

              {/* Audience Tab */}
              <TabsContent value="audience" className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Target Age Group</Label>
                  <Select value={ageGroup} onValueChange={setAgeGroup}>
                    <SelectTrigger className="bg-background/50 border border-border shadow-sm hover:shadow-md transition-all">
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border shadow-lg rounded-lg">
                      {audienceGroups.map((group) => (
                        <SelectItem key={group.value} value={group.value} className="hover:bg-primary/10 transition-all">
                          {group.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => handleSave("audience")}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-xl shadow-primary/10 rounded-lg px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    disabled={!ageGroup}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save & Continue
                  </Button>
                </div>
              </TabsContent>

              {/* Style Tab */}
              <TabsContent value="style" className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Writing Style</Label>
                  <Select value={writingStyle} onValueChange={setWritingStyle}>
                    <SelectTrigger className="bg-background/50 border border-border shadow-sm hover:shadow-md transition-all">
                      <SelectValue placeholder="Choose writing style" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border shadow-lg rounded-lg">
                      {writingStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value} className="hover:bg-primary/10 transition-all">
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Language Complexity</Label>
                    <Slider
                      value={complexity}
                      onValueChange={setComplexity}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                  </div>
                  <Button
                    onClick={() => handleSave("style")}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-xl shadow-primary/10 rounded-lg px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    disabled={!writingStyle}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Selection
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Progress & Generate Button */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Progress</Label>
                <span className="text-lg font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-muted rounded-full transition-all" />
              <Button
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium shadow-xl hover:shadow-2xl transition-all"
                onClick={handleGenerate}
                disabled={isGenerating || progress < 75}
              >
                <Sparkles className="mr-2 h-5 w-5 animate-glow" />
                {isGenerating ? "Generating Language..." : "Generate Tech Language"}
              </Button>
            </div>

            {/* Premium Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 opacity-50 blur-md pointer-events-none"></div>
          </Card>




          <Card className="relative p-8 rounded-2xl border border-border bg-background/40 backdrop-blur-lg shadow-xl shadow-primary/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                  Tech Language Preview
                </h2>
                {generatedLanguage && (
                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" onClick={() => setIsBookOpen(true)} className="text-sm hover:bg-primary/20 transition">
                      <Book className="h-4 w-4 mr-1" /> Read
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={isGenerating} className="text-sm hover:bg-primary/20 transition">
                      <RefreshCw className="h-4 w-4 mr-1" /> Regenerate
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleShare} className="text-sm hover:bg-primary/20 transition">
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDownload} className="text-sm hover:bg-primary/20 transition">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <ScrollArea className="h-[500px] rounded-xl border border-border bg-white/30 dark:bg-black/20 backdrop-blur-md p-6 shadow-inner shadow-black/10 hover:shadow-lg hover:shadow-black/20 transition-all duration-300">
                {error ? (
                  <div className="text-red-500 p-4 rounded-lg bg-red-100 dark:bg-red-900/50">
                    {error}
                  </div>
                ) : generatedLanguage ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: generatedLanguage
                        .split("\n")
                        .map((paragraph) =>
                          paragraph.trim() !== "" ? `<p class="text-justify mb-4">${paragraph}</p>` : ""
                        )
                        .join(""),
                    }}
                  />

                ) : (
                  // Modern Placeholder
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-lg italic space-y-4 animate-fadeIn">
                    <div className="relative">
                      <Sparkles className="h-10 w-10 text-primary animate-pulse drop-shadow-md" />
                      <div className="absolute inset-0 blur-md opacity-40 bg-primary/30 rounded-full"></div>
                    </div>
                    <p className="text-center text-xl font-medium text-gray-800 dark:text-white/80">
                      ✨ Something amazing is about to happen...
                      <br />
                      <span className="text-primary font-bold">Your tech langauge will unfold here soon.</span>
                    </p>
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Premium Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-pink-500/20 opacity-50 blur-md pointer-events-none"></div>
          </Card >


        </div >
      </div >

      <BookPreview
        content={chapterTexts}
        chapterImages={chapterImages}
        bookCoverImage={bookCoverImage}
        isOpen={isBookOpen}
        onClose={() => setIsBookOpen(false)}
      />
    </div >
  );
}