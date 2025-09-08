import { getCurrentUser } from "@/lib/actions/auth.action";
import Agent from "../components/Agent";

const Page = async () => {
    const user = await getCurrentUser();

    return (
        <main className="flex flex-col items-center justify-start px-6 py-10 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                Interview Generation
            </h1>

            <Agent
                userName={user?.name ?? "Guest"}
                userId={user?.id}
                // profileImage={user?.profileImage ?? "/astralearnlogo.png"}
                type="generate"
            />
        </main>
    );
};

export default Page;
