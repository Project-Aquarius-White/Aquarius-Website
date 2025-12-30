"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEvent } from "react";

export default function ParallaxLogo() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    function onMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPos = (clientX - left) / width - 0.5;
        const yPos = (clientY - top) / height - 0.5;

        x.set(xPos);
        y.set(yPos);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    return (
        <motion.div
            className="relative w-64 h-64 md:w-96 md:h-96 perspective-1000"
            onMouseMove={onMouseMove}
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="w-full h-full relative"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
                {/* Main Logo Layer */}
                <div className="absolute inset-0 flex items-center justify-center transform translate-z-10">
                    <div className="relative w-full h-full filter drop-shadow-[0_0_4px_rgba(0,240,255,0.2)]">
                        <Image
                            src="/logo.png"
                            alt="Project Aquarius Logo"
                            fill
                            className="object-contain"
                            style={{
                                imageRendering: 'pixelated',
                                filter: 'contrast(1.2) brightness(1.1)'
                            }}
                        />
                    </div>
                </div>

                {/* Ghost Layer for Depth */}
                <div className="absolute inset-0 opacity-30 transform translate-z-[-20px] blur-sm grayscale opacity-50">
                    <Image
                        src="/logo.png"
                        alt="Project Aquarius Logo Ghost"
                        fill
                        className="object-contain"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
