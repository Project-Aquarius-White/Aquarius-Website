"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: React.ElementType; // 'h1', 'h2', 'p' etc.
}

export default function GlitchText({ text, className, as: Component = "h1" }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    // Random glitch effect trigger
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 200);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative inline-block group">
            <Component className={clsx("relative z-10", className)}>
                {text}
            </Component>

            {/* Glitch Layer 1 (Red/Cyan offset) */}
            <Component
                className={clsx(
                    "absolute top-0 left-0 -z-10 text-aquarius-cyan opacity-0 select-none pointer-events-none",
                    className,
                    (isGlitching) && "opacity-70 animate-glitch"
                )}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)", transform: "translate(-2px, -2px)" }}
                aria-hidden="true"
            >
                {text}
            </Component>

            {/* Glitch Layer 2 */}
            <Component
                className={clsx(
                    "absolute top-0 left-0 -z-10 text-teal-500 opacity-0 select-none pointer-events-none",
                    className,
                    (isGlitching) && "opacity-70 animate-pulse-fast"
                )}
                style={{ clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)", transform: "translate(2px, 2px)" }}
                aria-hidden="true"
            >
                {text}
            </Component>
        </div>
    );
}
