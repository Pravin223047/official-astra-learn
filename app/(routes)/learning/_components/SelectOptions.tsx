import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { BookOpen, Brain, Lightbulb, Star } from 'lucide-react'
import React from 'react'

// interface StatDataProps {
//     title: string
//     icon: any // Replace 'any' with the actual type of your icon component
//     color: string
//     description: string
// }

interface SelectOptionsProps {
    setSelectedType: (stat: string) => void
}

const statsData = [
    {
        title: "Exams",
        icon: BookOpen,
        color: "from-blue-500 to-cyan-400",
        description: "Want to ace your exams? We've got you covered!"
    },
    {
        title: "Job Interviews",
        icon: Star,
        color: "from-purple-500 to-pink-500",
        description: "Get ready to shine in your interviews!"
    },
    {
        title: "Practice",
        icon: Brain,
        color: "from-emerald-500 to-teal-400",
        description: "Practice makes perfect! Keep up the great work!"
    },
    {
        title: "Coding Preparation",
        icon: Lightbulb,
        color: "from-orange-500 to-amber-400",
        description: "Prepare for coding challenges with confidence!"
    }
];

const SelectOptions = ({ setSelectedType }: SelectOptionsProps) => {
    const [selectedStat, setSelectedStat] = React.useState<string | null>(null);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
                <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="group cursor-pointer"
                    onClick={() => { setSelectedStat(stat.title); setSelectedType(stat.title) }}
                >
                    <div className="relative overflow-hidden rounded-2xl bg-card p-6 md:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-border group">
                        {/* Gradient glow background */}
                        <div
                            className={`absolute -inset-1 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl pointer-events-none`}
                        />

                        {/* Conditional Selected State Glow */}
                        {selectedStat === stat.title && (
                            <div
                                className={`absolute -inset-1 bg-gradient-to-br ${stat.color} opacity-50 transition-opacity duration-500 blur-2xl pointer-events-none`}
                            />
                        )}

                        {/* Subtle overlay for depth */}
                        <div className="absolute inset-0 bg-muted/10 group-hover:bg-muted/20 transition duration-300 pointer-events-none rounded-2xl" />

                        {/* Card Content */}
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex items-center justify-between mb-6">
                                {/* Icon with background */}
                                <div
                                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}
                                >
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-foreground mb-1">{stat.title}</h3>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground leading-snug">{stat.description}</p>

                            {/* Optional: Action Button */}
                            <div className="mt-4 flex justify-start">
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default SelectOptions