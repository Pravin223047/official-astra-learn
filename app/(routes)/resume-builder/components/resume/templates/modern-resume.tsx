"use client";

import { useResumeContext } from "@/contexts/resume-context";
import { ContentEditable } from "../../content-editable";

interface ModernTemplateProps {
    editable?: boolean;
}

export function ModernTemplate({ editable = true }: ModernTemplateProps) {
    const { resumeData, updateResumeData, customization } = useResumeContext();
    const { personal, experience, education, projects, skillCategories, certifications, languages } = resumeData;

    const getAccentColorClass = () => {
        switch (customization.colorScheme) {
            case "blue":
                return "bg-blue-600";
            case "teal":
                return "bg-teal-600";
            case "purple":
                return "bg-purple-600";
            case "red":
                return "bg-red-600";
            case "green":
                return "bg-green-600";
            case "orange":
                return "bg-orange-500";
            case "gray":
                return "bg-gray-600";
            case "pink":
                return "bg-pink-500";
            case "indigo":
                return "bg-indigo-600";
            case "amber":
                return "bg-amber-500";
            case "lime":
                return "bg-lime-500";
            case "cyan":
                return "bg-cyan-500";
            case "brown":
                return "bg-yellow-800";
            case "gold":
                return "bg-yellow-500";
            case "navy":
                return "bg-blue-900";
            case "mint":
                return "bg-emerald-300";
            default:
                return "bg-blue-600";
        }
    };

    const getTextColorClass = () => {
        switch (customization.colorScheme) {
            case "blue":
                return "text-blue-600";
            case "teal":
                return "text-teal-600";
            case "purple":
                return "text-purple-600";
            case "red":
                return "text-red-600";
            case "green":
                return "text-green-600";
            case "orange":
                return "text-orange-500";
            case "gray":
                return "text-gray-600";
            case "pink":
                return "text-pink-500";
            case "indigo":
                return "text-indigo-600";
            case "amber":
                return "text-amber-500";
            case "lime":
                return "text-lime-500";
            case "cyan":
                return "text-cyan-500";
            case "brown":
                return "text-yellow-800";
            case "gold":
                return "text-yellow-500";
            case "navy":
                return "text-blue-900";
            case "mint":
                return "text-emerald-400";
            default:
                return "text-blue-600";
        }
    };


    const fontSizeClass = {
        small: "text-[9pt] leading-snug",
        medium: "text-[10pt] leading-normal",
        large: "text-[11pt] leading-relaxed",
    }[customization.fontSize || "medium"];

    const fontFamilyClass = {
        inter: "font-sans",
        roboto: "font-[Roboto]",
        "open-sans": "font-[Open\\ Sans]",
        montserrat: "font-[Montserrat]",
        poppins: "font-[Poppins]",
        lato: "font-[Lato]",
        "playfair-display": "font-[Playfair\\ Display]",
        merriweather: "font-[Merriweather]",
    }[customization.fontFamily || "inter"];

    const updatePersonal = (field: string, value: string) => {
        updateResumeData({
            personal: {
                ...personal,
                [field]: value,
            },
        });
    };

    return (
        <div className={`h-full w-full ${fontSizeClass} ${fontFamilyClass} flex`}>
            {/* Left Sidebar */}
            <div className={`w-1/3 text-white ${getAccentColorClass()} p-6 flex flex-col`}>
                <div className="mb-8 text-center">
                    <div className="text-xl font-bold uppercase tracking-wider mb-1">
                        <ContentEditable
                            value={personal.fullName}
                            onChange={(value) => updatePersonal("fullName", value)}
                            editable={editable}
                            className="justify-center"
                        />
                    </div>
                    <div className="font-medium">
                        <ContentEditable
                            value={personal.title}
                            onChange={(value) => updatePersonal("title", value)}
                            editable={editable}
                            className="justify-center"
                        />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                    <h3 className="text-sm uppercase font-bold tracking-wider border-b border-white/30 pb-1 mb-3">
                        Contact
                    </h3>
                    <div className="space-y-2 text-sm">
                        {personal.email && (
                            <div>
                                <div className="font-medium">Email</div>
                                <ContentEditable
                                    value={personal.email}
                                    onChange={(value) => updatePersonal("email", value)}
                                    editable={editable}
                                />
                            </div>
                        )}
                        {personal.phone && (
                            <div>
                                <div className="font-medium">Phone</div>
                                <ContentEditable
                                    value={personal.phone}
                                    onChange={(value) => updatePersonal("phone", value)}
                                    editable={editable}
                                />
                            </div>
                        )}
                        {personal.location && (
                            <div>
                                <div className="font-medium">Location</div>
                                <ContentEditable
                                    value={personal.location}
                                    onChange={(value) => updatePersonal("location", value)}
                                    editable={editable}
                                />
                            </div>
                        )}
                        {personal.website && (
                            <div>
                                <div className="font-medium">Website</div>
                                <ContentEditable
                                    value={personal.website}
                                    onChange={(value) => updatePersonal("website", value)}
                                    editable={editable}
                                />
                            </div>
                        )}
                        {personal.linkedin && (
                            <div>
                                <div className="font-medium">LinkedIn</div>
                                <ContentEditable
                                    value={personal.linkedin}
                                    onChange={(value) => updatePersonal("linkedin", value)}
                                    editable={editable}
                                />
                            </div>
                        )}
                        {personal.github && (
                            <div>
                                <div className="font-medium">GitHub</div>
                                <ContentEditable
                                    value={personal.github}
                                    onChange={(value) => updatePersonal("github", value)}
                                    editable={editable}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills Section */}
                {skillCategories.length > 0 && skillCategories.some(cat => cat.skills.length > 0) && (
                    <div className="mb-8">
                        <h3 className="text-sm uppercase font-bold tracking-wider border-b border-white/30 pb-1 mb-3">
                            Skills
                        </h3>
                        <div className="space-y-4">
                            {skillCategories.map((category) => (
                                category.skills.length > 0 && (
                                    <div key={category.id}>
                                        <h4 className="font-medium text-sm">{category.name}</h4>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {category.skills.map((skill, i) => (
                                                <div key={i} className="bg-white/20 px-2 py-0.5 rounded text-xs mt-1">
                                                    {skill.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages Section */}
                {languages.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm uppercase font-bold tracking-wider border-b border-white/30 pb-1 mb-3">
                            Languages
                        </h3>
                        <div className="space-y-2">
                            {languages.map((language, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{language.name}</span>
                                    <span className="text-white/80">{language.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-6 bg-white overflow-y-auto">
                {/* Summary */}
                {personal.summary && (
                    <section className="mb-6">
                        <h3 className={`text-sm uppercase font-bold tracking-wider ${getTextColorClass()} border-b border-gray-200 pb-1 mb-2`}>
                            Professional Summary
                        </h3>
                        <div>
                            <ContentEditable
                                value={personal.summary}
                                onChange={(value) => updatePersonal("summary", value)}
                                editable={editable}
                            />
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-6">
                        <h3 className={`text-sm uppercase font-bold tracking-wider ${getTextColorClass()} border-b border-gray-200 pb-1 mb-3`}>
                            Work Experience
                        </h3>
                        <div className="space-y-4">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold">{exp.position}</h4>
                                        <div className="text-xs text-gray-600">
                                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                        </div>
                                    </div>
                                    <h5 className={`${getTextColorClass()} font-medium`}>{exp.company} | {exp.location}</h5>
                                    <p className="mt-1 text-sm">{exp.description}</p>
                                    {exp.achievements.length > 0 && exp.achievements.some(ach => ach.trim() !== "") && (
                                        <ul className="list-disc pl-4 mt-2 space-y-1 text-sm">
                                            {exp.achievements.filter(ach => ach.trim() !== "").map((achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-6">
                        <h3 className={`text-sm uppercase font-bold tracking-wider ${getTextColorClass()} border-b border-gray-200 pb-1 mb-3`}>
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                                        <div className="text-xs text-gray-600">
                                            {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                                        </div>
                                    </div>
                                    <h5 className={`${getTextColorClass()} font-medium`}>{edu.institution} | {edu.location}</h5>
                                    {edu.gpa && <p className="mt-1 text-sm">GPA: {edu.gpa}</p>}
                                    {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section className="mb-6">
                        <h3 className={`text-sm uppercase font-bold tracking-wider ${getTextColorClass()} border-b border-gray-200 pb-1 mb-3`}>
                            Projects
                        </h3>
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold">{project.name}</h4>
                                        {project.startDate && (
                                            <div className="text-xs text-gray-600">
                                                {project.startDate}
                                                {project.endDate && ` - ${project.endDate}`}
                                                {project.current && ` - Present`}
                                            </div>
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm">{project.description}</p>
                                    {project.technologies.length > 0 && project.technologies.some(tech => tech.trim() !== "") && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {project.technologies.filter(tech => tech.trim() !== "").map((tech, i) => (
                                                <span key={i} className={`${getAccentColorClass()} bg-opacity-10 px-2 py-0.5 rounded text-xs ${getTextColorClass()}`}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            className={`${getTextColorClass()} hover:underline text-xs block mt-1`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Project
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <section className="mb-6">
                        <h3 className={`text-sm uppercase font-bold tracking-wider ${getTextColorClass()} border-b border-gray-200 pb-1 mb-3`}>
                            Certifications
                        </h3>
                        <div className="space-y-4">
                            {certifications.map((cert) => (
                                <div key={cert.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold">{cert.name}</h4>
                                        <div className="text-xs text-gray-600">
                                            {cert.date}{cert.expires && ` - Expires: ${cert.expires}`}
                                        </div>
                                    </div>
                                    <h5 className={`${getTextColorClass()} font-medium`}>{cert.issuer}</h5>
                                    {cert.credentialID && (
                                        <p className="text-sm text-gray-600">Credential ID: {cert.credentialID}</p>
                                    )}
                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            className={`${getTextColorClass()} hover:underline text-xs block mt-1`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Certificate
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}