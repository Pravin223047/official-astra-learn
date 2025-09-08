"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, UploadCloud } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

const UploadDialog = ({ children }: { children: React.ReactNode }) => {
    const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
    const InsertFileEntry = useMutation(api.pdfStorage.AddFileEntryToDb);
    const getFileUrl = useMutation(api.pdfStorage.getFileUrl);
    const embeddocuments = useAction(api.myActions.ingest);
    const { user } = useUser();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [filename, setFilename] = useState("");
    const [open, setOpen] = useState(false);

    const OnFileSelect = (event: any) => {
        setFile(event.target.files[0]);
    }

    const OnUpload = async () => {
        setLoading(true);
        const postUrl = await generateUploadUrl();

        const result = await fetch(postUrl, {
            method: "POST",
            headers: file?.type ? { "Content-Type": file.type } : {},
            body: file,
        });

        const { storageId } = await result.json();
        console.log("File uploaded successfully. Storage ID:", storageId);

        const fileId = uuid4();
        const fileUrl = await getFileUrl({ storageId: storageId });

        const response = await InsertFileEntry({
            fileId: fileId,
            storageId: storageId,
            fileName: filename,
            fileUrl: fileUrl ?? "",
            createdBy: user?.primaryEmailAddress?.emailAddress ?? "",
        })

        console.log("File entry inserted successfully:", response);

        //API call to fetch PDF Process Data
        const pdfProcessData = await fetch("/api/pdf-loader?pdfUrl=" + fileUrl);
        const pdfProcessResponse = await pdfProcessData.json();
        console.log("PDF Process Data:", pdfProcessResponse);
        const embeddeddocuments = await embeddocuments({
            splitText: pdfProcessResponse.data,
            fileId: fileId,
        }).then((res) => {
            console.log("Data inserted successfully:", res);
        }).catch((err) => {
            console.error("Error inserting data:", err);
        });
        console.log("Data inserted successfully:", embeddeddocuments);
        setLoading(false);
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={() => setOpen(true)} className="bg-blue-500 text-white dark:bg-blue-600 dark:text-white hover:bg-blue-600 dark:hover:bg-blue-500 p-2 rounded-md">+ Upload Pdf File</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Upload PDF File</DialogTitle>
                    <DialogDescription>
                        Please select a PDF file and give it a suitable name.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-4">
                    <label className="text-sm font-medium text-gray-700">Select PDF File *</label>
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition">
                        <label htmlFor="file-upload" className="flex flex-col items-center space-y-2">
                            <UploadCloud className="w-6 h-6 text-primary" />
                            <span className="text-sm text-muted-foreground">Click to browse or drag & drop</span>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".pdf"
                                className="hidden"

                                onChange={(event) => OnFileSelect(event)}
                            />
                        </label>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-1">
                            File Name *
                        </label>
                        <Input id="filename" placeholder="Enter file name" onChange={(event) => setFilename(event.target.value)} />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" onClick={OnUpload} disabled={!file || !filename || loading} className="flex items-center space-x-2">{
                            loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UploadDialog;
