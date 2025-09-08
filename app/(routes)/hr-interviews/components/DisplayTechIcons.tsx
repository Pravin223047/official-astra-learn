import Image from "next/image";
import { cn, getTechLogos } from "@/lib/utils";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
    const techIcons = await getTechLogos(techStack);

    return (
        <div className="flex items-center space-x-[-12px]">
            {techIcons.slice(0, 3).map(({ tech, url }, index) => (
                <div
                    key={tech}
                    className={cn(
                        "relative group bg-white dark:bg-dark-300 border border-gray-300 dark:border-gray-700 rounded-full p-2 shadow-md hover:shadow-xl transition-all duration-300",
                        index !== 0 && "z-10"
                    )}
                >
                    {/* Tooltip */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium bg-gray-800 text-white dark:bg-gray-100 dark:text-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow">
                        {tech}
                    </span>

                    <Image
                        src={url}
                        alt={tech}
                        width={100}
                        height={100}
                        className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out"
                    />
                </div>
            ))}
        </div>
    );
};

export default DisplayTechIcons;
