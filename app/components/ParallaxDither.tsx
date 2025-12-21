"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ParallaxDither() {
    const { scrollYProgress } = useScroll();

    // Parallax layers
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Layer 1: Slow / Big Clusters */}
            <motion.div style={{ y: y1, opacity }} className="absolute top-[20%] left-[10%] w-64 h-64 opacity-20">
                <DitherPattern density={2} />
            </motion.div>

            <motion.div style={{ y: y1, opacity }} className="absolute top-[60%] right-[15%] w-96 h-96 opacity-10">
                <DitherPattern density={1} />
            </motion.div>

            {/* Layer 2: Fast / Small Glitches */}
            <motion.div style={{ y: y2, opacity }} className="absolute top-[40%] left-[50%] w-32 h-32 opacity-30">
                <DitherPattern density={4} />
            </motion.div>

        </div>
    );
}

function DitherPattern({ density = 1 }: { density?: number }) {
    // Generate a static dither SVG or canvas pattern
    return (
        <div
            className="w-full h-full"
            style={{
                backgroundImage: `radial-gradient(#00f0ff 1px, transparent 0)`,
                backgroundSize: `${4 / density}px ${4 / density}px`,
                maskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
            }}
        />
    );
}
