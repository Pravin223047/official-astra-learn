'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import React from 'react'

interface TopicInputProps {
    setTopic: (topic: string) => void;
    setDifficulty: (difficulty: string) => void;
}

const TopicInput = ({ setTopic, setDifficulty }: TopicInputProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-2xl p-6 md:p-8 bg-card border border-border rounded-2xl shadow-md transition-all"
        >
            <div className="flex flex-col gap-6">
                {/* Topic Label and Input */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="topic" className="text-lg font-semibold text-foreground">
                        What topic are you interested in?
                    </Label>
                    <Textarea
                        id="topic"
                        placeholder="e.g. Artificial Intelligence, Web Development, etc."
                        className="min-h-[100px] rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition duration-300"
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>

                {/* Difficulty Select */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="difficulty" className="text-lg font-semibold text-foreground">
                        Select the difficulty level
                    </Label>
                    <Select name="difficulty" defaultValue="easy" onValueChange={(value) => setDifficulty(value)}>
                        <SelectTrigger className="w-full rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition duration-300">
                            <SelectValue placeholder="Select difficulty level" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover text-popover-foreground border-border rounded-md shadow-lg">
                            <SelectItem value="easy">🌱 Easy</SelectItem>
                            <SelectItem value="medium">🚀 Medium</SelectItem>
                            <SelectItem value="hard">🔥 Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </motion.div>
    )
}

export default TopicInput
