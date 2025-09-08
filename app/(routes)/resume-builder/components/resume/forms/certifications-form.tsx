"use client";

import { useResumeContext } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";

export const CertificationsForm = () => {
    const {
        resumeData,
        addCertification,
        updateCertification,
        removeCertification,
    } = useResumeContext();

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Certifications</h2>
                <p className="text-muted-foreground">
                    Add your professional certifications and credentials.
                </p>
            </div>

            {resumeData.certifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-lg">
                    <p className="mb-4 text-muted-foreground">No certifications added yet</p>
                    <Button onClick={addCertification}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Certification
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {resumeData.certifications.map((cert) => (
                        <div key={cert.id} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">
                                    {cert.name || "New Certification"}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCertification(cert.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`name-${cert.id}`}>Certification Name</Label>
                                    <Input
                                        id={`name-${cert.id}`}
                                        value={cert.name}
                                        onChange={(e) =>
                                            updateCertification(cert.id, { name: e.target.value })
                                        }
                                        placeholder="e.g., AWS Solutions Architect"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`issuer-${cert.id}`}>Issuing Organization</Label>
                                    <Input
                                        id={`issuer-${cert.id}`}
                                        value={cert.issuer}
                                        onChange={(e) =>
                                            updateCertification(cert.id, { issuer: e.target.value })
                                        }
                                        placeholder="e.g., Amazon Web Services"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`date-${cert.id}`}>Issue Date</Label>
                                    <Input
                                        id={`date-${cert.id}`}
                                        value={cert.date}
                                        onChange={(e) =>
                                            updateCertification(cert.id, { date: e.target.value })
                                        }
                                        placeholder="MM/YYYY"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`expires-${cert.id}`}>Expiry Date (Optional)</Label>
                                    <Input
                                        id={`expires-${cert.id}`}
                                        value={cert.expires}
                                        onChange={(e) =>
                                            updateCertification(cert.id, { expires: e.target.value })
                                        }
                                        placeholder="MM/YYYY"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`credentialId-${cert.id}`}>Credential ID</Label>
                                    <Input
                                        id={`credentialId-${cert.id}`}
                                        value={cert.credentialID}
                                        onChange={(e) =>
                                            updateCertification(cert.id, { credentialID: e.target.value })
                                        }
                                        placeholder="Certificate ID or Number"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`url-${cert.id}`}>Credential URL</Label>
                                    <Input
                                        id={`url-${cert.id}`}
                                        value={cert.url}
                                        onChange={(e) =>
                                            updateCertification(cert.id, { url: e.target.value })
                                        }
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button onClick={addCertification} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Certification
                    </Button>
                </div>
            )}
        </div>
    );
};