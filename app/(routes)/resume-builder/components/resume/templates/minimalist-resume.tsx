'use client';

import { useResumeContext } from '@/contexts/resume-context';
import { ContentEditable } from '../../content-editable';


interface MinimalistTemplateProps {
    editable?: boolean;
}

export function MinimalistTemplate({
    editable = true,
}: MinimalistTemplateProps) {
    const { resumeData, updateResumeData, customization } = useResumeContext();
    const {
        personal,
        experience,
        education,
        projects,
        skillCategories,
        certifications,
        languages,
    } = resumeData;

    const getAccentTextClass = () => {
        switch (customization.colorScheme) {
            case 'blue':
                return 'text-blue-600';
            case 'teal':
                return 'text-teal-600';
            case 'purple':
                return 'text-purple-600';
            case 'red':
                return 'text-red-600';
            case 'green':
                return 'text-green-600';
            case 'orange':
                return 'text-orange-500';
            case 'gray':
                return 'text-gray-600';
            case 'pink':
                return 'text-pink-500';
            case 'indigo':
                return 'text-indigo-600';
            case 'amber':
                return 'text-amber-500';
            case 'lime':
                return 'text-lime-500';
            case 'cyan':
                return 'text-cyan-500';
            case 'brown':
                return 'text-yellow-800';
            case 'gold':
                return 'text-yellow-500';
            case 'navy':
                return 'text-blue-900';
            case 'mint':
                return 'text-emerald-400';
            default:
                return 'text-blue-600';
        }
    };

    const fontSizeClass = {
        small: 'text-[9pt] leading-snug',
        medium: 'text-[10pt] leading-normal',
        large: 'text-[11pt] leading-relaxed',
    }[customization.fontSize || 'medium'];

    const fontFamilyClass = {
        inter: 'font-sans',
        roboto: 'font-[Roboto]',
        'open-sans': 'font-[Open\\ Sans]',
        montserrat: 'font-[Montserrat]',
        poppins: 'font-[Poppins]',
        lato: 'font-[Lato]',
        'playfair-display': 'font-[Playfair\\ Display]',
        merriweather: 'font-[Merriweather]',
    }[customization.fontFamily || 'inter'];

    const updatePersonal = (field: string, value: string) => {
        updateResumeData({
            personal: {
                ...personal,
                [field]: value,
            },
        });
    };

    return (
        <div
            className={`h-full w-full p-8 ${fontSizeClass} ${fontFamilyClass} overflow-y-auto`}
        >
            {/* Header */}
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-1">
                    <ContentEditable
                        value={personal.fullName}
                        onChange={(value) => updatePersonal('fullName', value)}
                        editable={editable}
                        className="justify-center"
                    />
                </h1>
                <h2 className={`text-lg ${getAccentTextClass()} mb-3`}>
                    <ContentEditable
                        value={personal.title}
                        onChange={(value) => updatePersonal('title', value)}
                        editable={editable}
                        className="justify-center"
                    />
                </h2>

                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    {personal.email && (
                        <div>
                            <ContentEditable
                                value={personal.email}
                                onChange={(value) => updatePersonal('email', value)}
                                editable={editable}
                            />
                        </div>
                    )}

                    {personal.phone && (
                        <div>
                            <ContentEditable
                                value={personal.phone}
                                onChange={(value) => updatePersonal('phone', value)}
                                editable={editable}
                            />
                        </div>
                    )}

                    {personal.location && (
                        <div>
                            <ContentEditable
                                value={personal.location}
                                onChange={(value) => updatePersonal('location', value)}
                                editable={editable}
                            />
                        </div>
                    )}

                    {personal.website && (
                        <div>
                            <ContentEditable
                                value={personal.website}
                                onChange={(value) => updatePersonal('website', value)}
                                editable={editable}
                            />
                        </div>
                    )}

                    {personal.linkedin && (
                        <div>
                            <ContentEditable
                                value={personal.linkedin}
                                onChange={(value) => updatePersonal('linkedin', value)}
                                editable={editable}
                            />
                        </div>
                    )}

                    {personal.github && (
                        <div>
                            <ContentEditable
                                value={personal.github}
                                onChange={(value) => updatePersonal('github', value)}
                                editable={editable}
                            />
                        </div>
                    )}
                </div>
            </header>

            {/* Two column layout */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main column */}
                <div className="w-full md:w-2/3 space-y-6">
                    {/* Summary Section */}
                    {personal.summary && (
                        <section>
                            <h3
                                className={`text-lg font-semibold mb-2 ${getAccentTextClass()}`}
                            >
                                Summary
                            </h3>
                            <div>
                                <ContentEditable
                                    value={personal.summary}
                                    onChange={(value) => updatePersonal('summary', value)}
                                    editable={editable}
                                />
                            </div>
                        </section>
                    )}

                    {/* Experience Section */}
                    {experience.length > 0 && (
                        <section>
                            <h3
                                className={`text-lg font-semibold mb-3 ${getAccentTextClass()}`}
                            >
                                Experience
                            </h3>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <h4 className="font-semibold">{exp.position}</h4>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h5 className="text-gray-700">
                                                {exp.company}, {exp.location}
                                            </h5>
                                            <div className="text-sm text-gray-500">
                                                {exp.startDate} -{' '}
                                                {exp.current ? 'Present' : exp.endDate}
                                            </div>
                                        </div>
                                        <p className="text-sm">{exp.description}</p>
                                        {exp.achievements.length > 0 &&
                                            exp.achievements.some((ach) => ach.trim() !== '') && (
                                                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                                                    {exp.achievements
                                                        .filter((ach) => ach.trim() !== '')
                                                        .map((achievement, i) => (
                                                            <li key={i}>{achievement}</li>
                                                        ))}
                                                </ul>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects Section */}
                    {projects.length > 0 && (
                        <section>
                            <h3
                                className={`text-lg font-semibold mb-3 ${getAccentTextClass()}`}
                            >
                                Projects
                            </h3>
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-semibold">{project.name}</h4>
                                            {project.startDate && (
                                                <div className="text-sm text-gray-500">
                                                    {project.startDate}
                                                    {project.endDate && ` - ${project.endDate}`}
                                                    {project.current && ` - Present`}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm mt-1">{project.description}</p>
                                        {project.technologies.length > 0 &&
                                            project.technologies.some(
                                                (tech) => tech.trim() !== ''
                                            ) && (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {project.technologies
                                                        .filter((tech) => tech.trim() !== '')
                                                        .map((tech, i) => (
                                                            <span
                                                                key={i}
                                                                className="bg-gray-100 px-2 py-0.5 rounded text-xs"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                </div>
                                            )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                className={`${getAccentTextClass()} hover:underline text-sm block mt-1`}
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
                        <section>
                            <h3
                                className={`text-lg font-semibold mb-3 ${getAccentTextClass()}`}
                            >
                                Certifications
                            </h3>
                            <div className="space-y-4">
                                {certifications.map((cert) => (
                                    <div key={cert.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-semibold">{cert.name}</h4>
                                            <div className="text-sm text-gray-500">
                                                {cert.date}
                                                {cert.expires && ` - Expires: ${cert.expires}`}
                                            </div>
                                        </div>
                                        <h5 className="text-gray-700">{cert.issuer}</h5>
                                        {cert.credentialID && (
                                            <p className="text-sm text-gray-600">
                                                Credential ID: {cert.credentialID}
                                            </p>
                                        )}
                                        {cert.url && (
                                            <a
                                                href={cert.url}
                                                className={`${getAccentTextClass()} hover:underline text-sm block mt-1`}
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

                {/* Sidebar column */}
                <div className="w-full md:w-1/3 space-y-6">
                    {/* Education Section */}
                    {education.length > 0 && (
                        <section>
                            <h3
                                className={`text-lg font-semibold mb-3 ${getAccentTextClass()}`}
                            >
                                Education
                            </h3>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h4 className="font-semibold">
                                            {edu.degree} in {edu.field}
                                        </h4>
                                        <h5 className="text-gray-700">{edu.institution}</h5>
                                        <div className="text-sm text-gray-500">
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </div>
                                        <div className="text-sm text-gray-500">{edu.location}</div>
                                        {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
                                        {edu.description && (
                                            <p className="text-sm mt-1">{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills Section */}
                    {skillCategories.length > 0 &&
                        skillCategories.some((cat) => cat.skills.length > 0) && (
                            <section>
                                <h3
                                    className={`text-lg font-semibold mb-3 ${getAccentTextClass()}`}
                                >
                                    Skills
                                </h3>
                                <div className="space-y-3">
                                    {skillCategories.map(
                                        (category) =>
                                            category.skills.length > 0 && (
                                                <div key={category.id}>
                                                    <h4 className="font-medium text-gray-700">
                                                        {category.name}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {category.skills.map((skill, i) => (
                                                            <div key={i} className="text-sm">
                                                                {skill.name}
                                                                {i < category.skills.length - 1 ? ',' : ''}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                    )}
                                </div>
                            </section>
                        )}

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <section>
                            <h3
                                className={`text-lg font-semibold mb-3 ${getAccentTextClass()}`}
                            >
                                Languages
                            </h3>
                            <div className="space-y-2">
                                {languages.map((language, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="font-medium">{language.name}</span>
                                        <span className="text-gray-600">
                                            {language.proficiency}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
