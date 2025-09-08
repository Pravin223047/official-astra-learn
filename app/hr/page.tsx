import Home from "./DashboardPage";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <main className="w-full h-full">
                <Home />
            </main>
        </div>
    );
}