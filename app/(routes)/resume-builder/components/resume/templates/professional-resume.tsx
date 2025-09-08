"use client";

import { useResumeContext } from "@/contexts/resume-context";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { ContentEditable } from "../../content-editable";

interface ProfessionalTemplateProps {
    editable?: boolean;
}

export function ProfessionalTemplate({ editable = true }: ProfessionalTemplateProps) {
    const { resumeData, updateResumeData, customization } = useResumeContext();
    const { personal, experience, education, projects, skillCategories, certifications, languages } = resumeData;

    const getColorClass = () => {
        switch (customization.colorScheme) {
            case "blue":
                return "bg-blue-700 text-white";
            case "teal":
                return "bg-teal-700 text-white";
            case "purple":
                return "bg-purple-700 text-white";
            case "red":
                return "bg-red-700 text-white";
            case "green":
                return "bg-green-700 text-white";
            case "orange":
                return "bg-orange-600 text-white";
            case "gray":
                return "bg-gray-700 text-white";
            case "pink":
                return "bg-pink-600 text-white";
            case "indigo":
                return "bg-indigo-700 text-white";
            case "amber":
                return "bg-amber-600 text-white";
            case "lime":
                return "bg-lime-600 text-white";
            case "cyan":
                return "bg-cyan-600 text-white";
            case "brown":
                return "bg-yellow-900 text-white";
            case "gold":
                return "bg-yellow-500 text-white";
            case "navy":
                return "bg-blue-900 text-white";
            case "mint":
                return "bg-emerald-300 text-black";
            default:
                return "bg-blue-700 text-white";
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
        <div className={`h-full w-full p-8 ${fontSizeClass} ${fontFamilyClass}`}>
            {/* Header */}
            <header className="mb-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-1">
                        <ContentEditable
                            value={personal.fullName}
                            onChange={(value) => updatePersonal("fullName", value)}
                            editable={editable}
                        />
                    </h1>
                    <h2 className="text-lg font-medium text-gray-700 mb-3">
                        <ContentEditable
                            value={personal.title}
                            onChange={(value) => updatePersonal("title", value)}
                            editable={editable}
                        />
                    </h2>

                    <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                        {personal.email && (
                            <div className="flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5" />
                                <ContentEditable
                                    value={personal.email}
                                    onChange={(value) => updatePersonal("email", value)}
                                    editable={editable}
                                />
                            </div>
                        )}

                        {personal.phone && (
                            <div className="flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5" />
                                <ContentEditable
                                    value={personal.phone}
                                    onChange={(value) => updatePersonal("phone", value)}
                                    editable={editable}
                                />
                            </div>
                        )}

                        {personal.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                <ContentEditable
                                    value={personal.location}
                                    onChange={(value) => updatePersonal("location", value)}
                                    editable={editable}
                                />
                            </div>
                        )}

                        {personal.website && (
                            <div className="flex items-center gap-1">
                                <Globe className="h-3.5 w-3.5" />
                                <ContentEditable
                                    value={personal.website}
                                    onChange={(value) => updatePersonal("website", value)}
                                    editable={editable}
                                />
                            </div>
                        )}

                        {personal.linkedin && (
                            <div className="flex items-center gap-1">
                                <Linkedin className="h-3.5 w-3.5" />
                                <ContentEditable
                                    value={personal.linkedin}
                                    onChange={(value) => updatePersonal("linkedin", value)}
                                    editable={editable}
                                />
                            </div>
                        )}

                        {personal.github && (
                            <div className="flex items-center gap-1">
                                <Github className="h-3.5 w-3.5" />
                                <ContentEditable
                                    value={personal.github}
                                    onChange={(value) => updatePersonal("github", value)}
                                    editable={editable}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Summary Section */}
            {personal.summary && (
                <section className="mb-6">
                    <h3 className={`text-base font-bold mb-2 pb-1 border-b ${getColorClass()} pl-2`}>Professional Summary</h3>
                    <div>
                        <ContentEditable
                            value={personal.summary}
                            onChange={(value) => updatePersonal("summary", value)}
                            editable={editable}
                        />
                    </div>
                </section>
            )}

            {/* Experience Section */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h3 className={`text-base font-bold mb-2 pb-1 border-b ${getColorClass()} pl-2`}>Work Experience</h3>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-bold">{exp.position}</h4>
                                    <div className="text-sm text-gray-600">
                                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="text-gray-700 font-medium">{exp.company}</h5>
                                    <div className="text-sm text-gray-600">{exp.location}</div>
                                </div>
                                <p className="mt-1">{exp.description}</p>
                                {exp.achievements.length > 0 && (
                                    <ul className="list-disc pl-5 mt-1 space-y-1">
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

            {/* Education Section */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h3 className={`text-base font-bold mb-2 pb-1 border-b ${getColorClass()} pl-2`}>Education</h3>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                                    <div className="text-sm text-gray-600">
                                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <h5 className="text-gray-700 font-medium">{edu.institution}</h5>
                                    <div className="text-sm text-gray-600">{edu.location}</div>
                                </div>
                                {edu.gpa && <p className="mt-1">GPA: {edu.gpa}</p>}
                                {edu.description && <p className="mt-1">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills Section */}
            {skillCategories.length > 0 && skillCategories.some(cat => cat.skills.length > 0) && (
                <section className="mb-6">
                    <h3 className={`text-base font-bold mb-2 pb-1 border-b ${getColorClass()} pl-2`}>Skills</h3>
                    <div className="space-y-3">
                        {skillCategories.map((category) => (
                            category.skills.length > 0 && (
                                <div key={category.id}>
                                    <h4 className="font-medium">{category.name}</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {category.skills.map((skill, i) => (
                                            <div key={i} className="bg-gray-100 px-2 py-0.5 rounded-md text-sm">
                                                {skill.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
                <section className="mb-6">
                    <h3 className={`text-base font-bold mb-2 pb-1 border-b ${getColorClass()} pl-2`}>Projects</h3>
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.id}>
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-bold">{project.name}</h4>
                                    {project.startDate && (
                                        <div className="text-sm text-gray-600">
                                            {project.startDate}
                                            {project.endDate && ` - ${project.endDate}`}
                                            {project.current && ` - Present`}
                                        </div>
                                    )}
                                </div>
                                <p className="mt-1">{project.description}</p>
                                {project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {project.technologies.filter(tech => tech.trim() !== "").map((tech, i) => (
                                            <span key={i} className="bg-gray-100 px-2 py-0.5 rounded-md text-xs">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {project.link && (
                                    <a
                                        href={project.link}
                                        className="text-blue-600 hover:underline text-sm block mt-1"
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

            {/* Certifications Section */}
            {certifications.length > 0 && (
                <section className="mb-6">
                    <h3 className={`text-base font-bold mb-2 pb-1 border-b ${getColorClass()} pl-2`}>Certifications</h3>
                    <div className="space-y-4">
                        {certifications.map((cert) => (
                            <div key={cert.id}>
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-bold">{cert.name}</h4>
                                    <div className="text-sm text-gray-600">
                                        {cert.date}{cert.expires && ` - Expires: ${cert.expires}`}
                                    </div>
                                </div>
                                <h5 className="text-gray-700">{cert.issuer}</h5>
                                {cert.credentialID && (
                                    <p className="text-sm text-gray-600">Credential ID: {cert.credentialID}</p>
                                )}
                                {cert.url && (
                                    <a
                                        href={cert.url}
                                        className="text-blue-600 hover:underline text-sm block mt-1"
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

            {/* Languages Section */}
            {languages.length > 0 && (
                <section className="mb-6">
                    <h3 className={`text-base font-bold mb-2 pb-1 border-b ${getColorClass()} pl-2`}>Languages</h3>
                    <div className="flex flex-wrap gap-4">
                        {languages.map((language, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="font-medium">{language.name}</span>
                                <span className="text-sm text-gray-600">({language.proficiency})</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}