import { jobs } from "@/lib/data";
import { JobList } from "./job-list";


export default function JobsPage() {
    return (
        <div className="relative flex items-center justify-center w-full h-full p-4">
            <main className="w-full h-full">
                <JobList initialJobs={jobs} />
            </main>
        </div>
    );
}