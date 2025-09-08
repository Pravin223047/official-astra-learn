"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ContentEditableProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    editable?: boolean;
}

export function ContentEditable({
    value,
    onChange,
    placeholder = "Click to edit",
    className = "",
    editable = true,
}: ContentEditableProps) {
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleBlur = () => {
        setIsEditing(false);
        if (ref.current) {
            onChange(ref.current.innerText || "");
        }
    };

    const handleInput = () => {
        if (ref.current) {
            onChange(ref.current.innerText || "");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            ref.current?.blur();
        }
    };

    return (
        <div
            ref={ref}
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={handleBlur}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onClick={() => editable && setIsEditing(true)}
            className={cn(
                "outline-none focus:outline-none",
                editable && "cursor-text focus:ring-1 focus:ring-blue-400 rounded px-0.5",
                isEditing && "bg-blue-50",
                !value && "text-gray-400",
                className
            )}
            dangerouslySetInnerHTML={{ __html: value || placeholder }}
        />
    );
}