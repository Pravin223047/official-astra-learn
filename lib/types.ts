import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;

// Resume Data Types
export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
}

export interface Skill {
  name: string;
  level?: number; // 1-5
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  credentialID?: string;
  url?: string;
}

export interface Language {
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Fluent" | "Native";
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    subtitle?: string;
    date?: string;
    description?: string;
  }[];
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
  customSections: CustomSection[];
}

// Resume Customization Types
export interface ResumeCustomization {
  template: string;
  fontFamily: string;
  fontSize: "small" | "medium" | "large";
  colorScheme: string;
  spacing: "compact" | "balanced" | "spacious";
  showBulletPoints: boolean;
  includeLinks: boolean;
  headerStyle: "centered" | "left-aligned" | "right-aligned";
  showPhoto: boolean;
  photoBorderRadius: "square" | "rounded" | "circle";
}

// Resume Template Types
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

// ATS Score Types
export interface AtsScoreResult {
  score: number; // 0-100
  feedback: {
    keywords: {
      matched: string[];
      missing: string[];
    };
    format: {
      score: number;
      suggestions: string[];
    };
    content: {
      score: number;
      suggestions: string[];
    };
  };
  generalSuggestions: string[];
}

// Form Step Types
export type FormStep =
  | "personal"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "certifications"
  | "languages"
  | "awards"
  | "customSections"
  | "preview";

// Define types for the HR dashboard
export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  selected: boolean;
  resumeScore: number;
  resumeUrl?: string;
  atsScore: number;
  mockInterviews: number;
  skills: string[];
  education: Education[];
  experience: Experience[];
  notes?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  techStack: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  status: "Open" | "Closed" | "Draft";
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface FilterOptions {
  techStack: string[];
  selected?: boolean;
  search?: string;
}

export interface JobFilterOptions {
  role?: string;
  department?: string;
  location?: string;
  techStack?: string[];
  status?: "Open" | "Closed" | "Draft";
}
