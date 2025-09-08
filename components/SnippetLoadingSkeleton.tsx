import NavigationHeader from "@/components/NavigationHeader";

function SnippetLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
            <NavigationHeader />
            <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
                    {/* Skeleton Header */}
                    <div className="bg-gray-100 h-full dark:bg-[#121218] border border-gray-200 dark:border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center size-12 rounded-xl bg-gray-200 dark:bg-[#ffffff08] animate-pulse" />
                                <div>
                                    <div className="h-8 w-48 bg-gray-200 dark:bg-[#ffffff08] rounded-lg animate-pulse mb-2" />
                                    <div className="flex gap-4">
                                        <div className="h-5 w-24 bg-gray-200 dark:bg-[#ffffff08] rounded animate-pulse" />
                                        <div className="h-5 w-24 bg-gray-200 dark:bg-[#ffffff08] rounded animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[400px] bg-gray-200 dark:bg-[#ffffff08] rounded-xl animate-pulse" />
                    </div>

                    {/* Skeleton Comments Section */}
                    <div className="bg-gray-100 dark:bg-[#121218] border border-gray-200 dark:border-[#ffffff0a] rounded-2xl p-6 sm:p-8 backdrop-blur-xl transition-colors duration-300">
                        <div className="h-6 w-32 bg-gray-200 dark:bg-[#ffffff08] rounded animate-pulse mb-6" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-[#ffffff08] animate-pulse" />
                                    <div className="flex-1">
                                        <div className="h-4 w-32 bg-gray-200 dark:bg-[#ffffff08] rounded animate-pulse mb-2" />
                                        <div className="h-16 bg-gray-200 dark:bg-[#ffffff08] rounded animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SnippetLoadingSkeleton;
