"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

// Custom hook to prevent hydration mismatch
function useMounted() {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return mounted;
}

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const mounted = useMounted();

    // Prevent hydration error by rendering nothing until mounted
    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <>
            {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative overflow-hidden rounded-full p-2"
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Moon className="h-5 w-5 text-gray-300" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Sun className="h-5 w-5 text-gray-900" />
                    </motion.div>
                )}
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Button> */}
            <motion.button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Theme"
            >
                <motion.div
                    animate={{ rotate: isDark ? 360 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {isDark ? (
                        <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    )}
                </motion.div>
            </motion.button></>
    );
}
