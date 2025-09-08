function ProfileHeaderSkeleton() {
    return (
        <div
            className="relative mb-8 bg-gray-100 dark:bg-gradient-to-br dark:from-[#12121a] dark:to-[#1a1a2e] 
            rounded-2xl p-8 border border-gray-200 dark:border-gray-800/50 overflow-hidden transition-colors"
        >
            {/* Grid Background Overlay */}
            <div className="absolute inset-0 bg-[size:32px] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

            <div className="relative flex items-center gap-8">
                {/* Avatar Skeleton */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-xl" />
                    <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-800/80 animate-pulse relative z-10 border-4 border-gray-200 dark:border-gray-800/50" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-400/30 to-purple-600/30 rounded-full z-20 animate-pulse" />
                </div>

                {/* User Info Skeleton */}
                <div className="space-y-3">
                    <div className="h-8 w-48 bg-gray-300 dark:bg-gray-800/80 rounded animate-pulse" />
                    <div className="h-5 w-32 bg-gray-300 dark:bg-gray-800/80 rounded animate-pulse" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="group relative p-4 rounded-xl bg-gray-200 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-800/50 overflow-hidden transition-colors"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent opacity-5" />
                        <div className="relative space-y-4">
                            {/* Stat Header */}
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-800/80 rounded animate-pulse" />
                                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-800/80 rounded animate-pulse" />
                                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-800/80 rounded animate-pulse" />
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gray-300 dark:bg-gray-800/80 animate-pulse" />
                            </div>

                            {/* Stat Footer */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-800/50 flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-800/80 rounded animate-pulse" />
                                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-800/80 rounded animate-pulse" />
                                <div className="h-4 w-16 bg-gray-300 dark:bg-gray-800/80 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileHeaderSkeleton;
