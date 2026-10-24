"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeData, AtsScoreResult } from "./types";

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is required");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

interface AnalyzeResumeParams {
  resumeData: ResumeData;
  jobDescription: string;
  section?: string;
}

function cleanJsonResponse(raw: string): string {
  return raw.replace(/```json|```/g, "").trim();
}

export async function analyzeResumeWithAI({
  resumeData,
  jobDescription,
  section,
}: AnalyzeResumeParams): Promise<AtsScoreResult> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

    const resumeText = `
      Name: ${resumeData.personal.fullName}
      Title: ${resumeData.personal.title}
      Summary: ${resumeData.personal.summary}

      Experience:
      ${resumeData.experience
        .map(
          (exp) => `
        - ${exp.position} at ${exp.company}
        - ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}
        - ${exp.description}
        - Achievements: ${exp.achievements.join(", ")}
      `
        )
        .join("\n")}

      Education:
      ${resumeData.education
        .map(
          (edu) => `
        - ${edu.degree} in ${edu.field}
        - ${edu.institution}
        - ${edu.startDate} - ${edu.current ? "Present" : edu.endDate}
      `
        )
        .join("\n")}

      Skills:
      ${resumeData.skillCategories
        .map(
          (cat) =>
            `${cat.name}: ${cat.skills.map((skill) => skill.name).join(", ")}`
        )
        .join("\n")}

      Projects:
      ${resumeData.projects
        .map(
          (proj) => `
        - ${proj.name}
        - ${proj.description}
        - Technologies: ${proj.technologies.join(", ")}
      `
        )
        .join("\n")}

      Certifications:
      ${resumeData.certifications
        .map((cert) => `- ${cert.name} by ${cert.issuer}`)
        .join("\n")}

      Languages:
      ${resumeData.languages
        .map((lang) => `- ${lang.name}: ${lang.proficiency}`)
        .join("\n")}
    `;

    const prompt = `
      You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume against the provided job description.

      Job Description:
      ${jobDescription}

      Resume:
      ${resumeText}

      Provide a detailed analysis including:
      1. An overall ATS compatibility score (0-100)
      2. Matched keywords from the job description
      3. Missing important keywords from the job description
      4. Format and structure suggestions
      5. Content improvement suggestions

      Format your response as a raw JSON string only, without any code blocks or Markdown formatting. The structure should be:
      {
        "score": number,
        "feedback": {
          "keywords": {
            "matched": string[],
            "missing": string[]
          },
          "format": {
            "score": number,
            "suggestions": string[]
          },
          "content": {
            "score": number,
            "suggestions": string[]
          }
        },
        "generalSuggestions": string[]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = cleanJsonResponse(text);

    const analysis = JSON.parse(cleanedText);

    return analysis;
  } catch (error) {
    console.error("Error analyzing resume with Gemini:", error);
    throw new Error("Failed to analyze resume. Please try again later.");
  }
}
