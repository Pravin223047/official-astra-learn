"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    ResumeData,
    ResumeCustomization,
    FormStep,
    AtsScoreResult
} from "@/lib/types";
import { DEFAULT_RESUME_DATA, DEFAULT_CUSTOMIZATION } from "@/lib/constants";

interface ResumeContextProps {
    resumeData: ResumeData;
    updateResumeData: (newData: Partial<ResumeData>) => void;
    customization: ResumeCustomization;
    updateCustomization: (newCustomization: Partial<ResumeCustomization>) => void;
    currentStep: FormStep;
    setCurrentStep: (step: FormStep) => void;
    atsScore: AtsScoreResult | null;
    setAtsScore: (score: AtsScoreResult | null) => void;
    jobDescription: string;
    setJobDescription: (description: string) => void;
    fileName: string;
    setFileName: (name: string) => void;
    addExperience: () => void;
    updateExperience: (id: string, data: Partial<ResumeData["experience"][0]>) => void;
    removeExperience: (id: string) => void;
    addEducation: () => void;
    updateEducation: (id: string, data: Partial<ResumeData["education"][0]>) => void;
    removeEducation: (id: string) => void;
    addProject: () => void;
    updateProject: (id: string, data: Partial<ResumeData["projects"][0]>) => void;
    removeProject: (id: string) => void;
    addSkillCategory: () => void;
    updateSkillCategory: (id: string, data: Partial<{ name: string }>) => void;
    removeSkillCategory: (id: string) => void;
    addSkill: (categoryId: string, skill: { name: string; level?: number }) => void;
    updateSkill: (categoryId: string, index: number, skill: { name: string; level?: number }) => void;
    removeSkill: (categoryId: string, index: number) => void;
    addCertification: () => void;
    updateCertification: (id: string, data: Partial<ResumeData["certifications"][0]>) => void;
    removeCertification: (id: string) => void;
    addLanguage: (language: ResumeData["languages"][0]) => void;
    updateLanguage: (index: number, language: ResumeData["languages"][0]) => void;
    removeLanguage: (index: number) => void;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
    const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
    const [customization, setCustomization] = useState<ResumeCustomization>(DEFAULT_CUSTOMIZATION);
    const [currentStep, setCurrentStep] = useState<FormStep>("personal");
    const [atsScore, setAtsScore] = useState<AtsScoreResult | null>(null);
    const [jobDescription, setJobDescription] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    // Load data from localStorage if available
    useEffect(() => {
        const savedJobDescription = localStorage.getItem("jobDescription");
        if (savedJobDescription) {
            setJobDescription(savedJobDescription);
        }

        const savedFileName = localStorage.getItem("resumeFileName");
        if (savedFileName) {
            setFileName(savedFileName);
        }

        const savedResumeData = localStorage.getItem("resumeData");
        if (savedResumeData) {
            setResumeData(JSON.parse(savedResumeData));
        }

        const savedCustomization = localStorage.getItem("resumeCustomization");
        if (savedCustomization) {
            setCustomization(JSON.parse(savedCustomization));
        }
    }, []);

    // Save data to localStorage when it changes
    useEffect(() => {
        if (Object.keys(resumeData.personal).some(key => {
            const value = resumeData.personal[key as keyof typeof resumeData.personal];
            return value !== null && value !== undefined && value !== "";
        })) {
            localStorage.setItem("resumeData", JSON.stringify(resumeData));
        }
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem("resumeCustomization", JSON.stringify(customization));
    }, [customization]);

    const updateResumeData = (newData: Partial<ResumeData>) => {
        setResumeData(prev => ({ ...prev, ...newData }));
    };

    const updateCustomization = (newCustomization: Partial<ResumeCustomization>) => {
        setCustomization(prev => ({ ...prev, ...newCustomization }));
    };

    // Experience CRUD operations
    const addExperience = () => {
        const newExperience = {
            id: uuidv4(),
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
            achievements: [""]
        };
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, newExperience]
        }));
    };

    const updateExperience = (id: string, data: Partial<ResumeData["experience"][0]>) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, ...data } : exp
            )
        }));
    };

    const removeExperience = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    // Education CRUD operations
    const addEducation = () => {
        const newEducation = {
            id: uuidv4(),
            institution: "",
            degree: "",
            field: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            gpa: "",
            description: ""
        };
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, newEducation]
        }));
    };

    const updateEducation = (id: string, data: Partial<ResumeData["education"][0]>) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, ...data } : edu
            )
        }));
    };

    const removeEducation = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    // Project CRUD operations
    const addProject = () => {
        const newProject = {
            id: uuidv4(),
            name: "",
            description: "",
            technologies: [""],
            link: "",
            startDate: "",
            endDate: "",
            current: false
        };
        setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, newProject]
        }));
    };

    const updateProject = (id: string, data: Partial<ResumeData["projects"][0]>) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.map(proj =>
                proj.id === id ? { ...proj, ...data } : proj
            )
        }));
    };

    const removeProject = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.filter(proj => proj.id !== id)
        }));
    };

    // Skill Category CRUD operations
    const addSkillCategory = () => {
        const newCategory = {
            id: uuidv4(),
            name: "New Category",
            skills: []
        };
        setResumeData(prev => ({
            ...prev,
            skillCategories: [...prev.skillCategories, newCategory]
        }));
    };

    const updateSkillCategory = (id: string, data: Partial<{ name: string }>) => {
        setResumeData(prev => ({
            ...prev,
            skillCategories: prev.skillCategories.map(cat =>
                cat.id === id ? { ...cat, ...data } : cat
            )
        }));
    };

    const removeSkillCategory = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            skillCategories: prev.skillCategories.filter(cat => cat.id !== id)
        }));
    };

    // Skill CRUD operations
    const addSkill = (categoryId: string, skill: { name: string; level?: number }) => {
        setResumeData(prev => ({
            ...prev,
            skillCategories: prev.skillCategories.map(cat =>
                cat.id === categoryId
                    ? { ...cat, skills: [...cat.skills, skill] }
                    : cat
            )
        }));
    };

    const updateSkill = (
        categoryId: string,
        index: number,
        skill: { name: string; level?: number }
    ) => {
        setResumeData(prev => ({
            ...prev,
            skillCategories: prev.skillCategories.map(cat =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        skills: cat.skills.map((s, i) => (i === index ? skill : s))
                    }
                    : cat
            )
        }));
    };

    const removeSkill = (categoryId: string, index: number) => {
        setResumeData(prev => ({
            ...prev,
            skillCategories: prev.skillCategories.map(cat =>
                cat.id === categoryId
                    ? {
                        ...cat,
                        skills: cat.skills.filter((_, i) => i !== index)
                    }
                    : cat
            )
        }));
    };

    // Certification CRUD operations
    const addCertification = () => {
        const newCertification = {
            id: uuidv4(),
            name: "",
            issuer: "",
            date: "",
            expires: "",
            credentialID: "",
            url: ""
        };
        setResumeData(prev => ({
            ...prev,
            certifications: [...prev.certifications, newCertification]
        }));
    };

    const updateCertification = (id: string, data: Partial<ResumeData["certifications"][0]>) => {
        setResumeData(prev => ({
            ...prev,
            certifications: prev.certifications.map(cert =>
                cert.id === id ? { ...cert, ...data } : cert
            )
        }));
    };

    const removeCertification = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            certifications: prev.certifications.filter(cert => cert.id !== id)
        }));
    };

    // Language CRUD operations
    const addLanguage = (language: ResumeData["languages"][0]) => {
        setResumeData(prev => ({
            ...prev,
            languages: [...prev.languages, language]
        }));
    };

    const updateLanguage = (index: number, language: ResumeData["languages"][0]) => {
        setResumeData(prev => ({
            ...prev,
            languages: prev.languages.map((lang, i) =>
                i === index ? language : lang
            )
        }));
    };

    const removeLanguage = (index: number) => {
        setResumeData(prev => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index)
        }));
    };

    return (
        <ResumeContext.Provider
            value={{
                resumeData,
                updateResumeData,
                customization,
                updateCustomization,
                currentStep,
                setCurrentStep,
                atsScore,
                setAtsScore,
                jobDescription,
                setJobDescription,
                fileName,
                setFileName,
                addExperience,
                updateExperience,
                removeExperience,
                addEducation,
                updateEducation,
                removeEducation,
                addProject,
                updateProject,
                removeProject,
                addSkillCategory,
                updateSkillCategory,
                removeSkillCategory,
                addSkill,
                updateSkill,
                removeSkill,
                addCertification,
                updateCertification,
                removeCertification,
                addLanguage,
                updateLanguage,
                removeLanguage
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error("useResumeContext must be used within a ResumeProvider");
    }
    return context;
};