import React from "react"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-black dark:from-gray-900 dark:to-gray-950 dark:text-gray-100 flex flex-col">
            {children}
        </main>
    )
}