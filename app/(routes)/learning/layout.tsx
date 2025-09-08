import LearningProviderLayout from "@/components/learningProvider";

export default function LearningLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LearningProviderLayout>
            {children}
        </LearningProviderLayout>
    );
}