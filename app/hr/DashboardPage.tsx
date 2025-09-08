import { candidates } from "@/lib/data";
import { CandidateList } from "./dashboard/candidate-list";


export default function Home() {
    return (
        <div className="w-full h-full p-4">
            <CandidateList initialCandidates={candidates} />
        </div>
    );
}