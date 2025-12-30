"use client";

import { useEffect, useRef } from "react";

export default function AquariusDither() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        };

        window.addEventListener("resize", resize);
        resize();

        // Aquarius Symbol Logic (2 Waves)
        // y = A * sin(kx + wt)
        const drawWave = (offsetY: number, phaseOffset: number, t: number, width: number, height: number) => {
            const amplitude = 60;
            const frequency = 0.015;
            const thickness = 40; // The 'spread' of the dither

            // We iterate across the width of the canvas (or a constrained box)
            for (let x = 0; x < width; x += 4) { // stride 4 for performance/aesthetics
                const angle = (x - width / 2) * frequency + t;

                // Triangle-ish wave approximation for sharp Aquarius look (ZigZag)
                // sin is wavy, we want zigzag. 
                // Triangle wave: (2/PI) * asin(sin(x))
                const rawY = Math.asin(Math.sin(angle));
                const y = offsetY + rawY * amplitude;

                // Dither Logic
                // We draw random dots around the centerline 'y'
                // The further from 'y', the less likely we draw a dot.

                const density = 20; // dots per column slice

                for (let i = 0; i < density; i++) {
                    // Random spread around the line
                    const spread = (Math.random() - 0.5) * thickness;
                    // Gaussian-ish probability knockout
                    // If spread is high, probability is low
                    const d = Math.abs(spread) / (thickness / 2);
                    if (Math.random() > d) {
                        const size = Math.random() < 0.3 ? 2 : 1.5;

                        // Color logic: darker at edges, brighter at center
                        const brightness = 1 - d;
                        const blue = Math.floor(100 + brightness * 155);

                        ctx.fillStyle = `rgba(0, ${blue}, ${blue}, ${brightness})`;
                        ctx.fillRect(x, y + spread, size, size);
                    }
                }
            }
        };

        const draw = () => {
            time += 0.02;
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);

            ctx.clearRect(0, 0, width, height);

            // Draw two waves
            const centerY = height / 2;

            // Wave 1
            drawWave(centerY - 50, 0, time, width, height);

            // Wave 2
            drawWave(centerY + 50, 0, time, width, height);

            // Subtle background noise for texture
            for (let i = 0; i < 100; i++) {
                const rx = Math.random() * width;
                const ry = Math.random() * height;
                if (Math.random() > 0.99) {
                    ctx.fillStyle = "rgba(0, 240, 255, 0.2)";
                    ctx.fillRect(rx, ry, 2, 2);
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="w-full h-96 relative flex items-center justify-center overflow-hidden my-12">
            <canvas
                ref={canvasRef}
                className="w-full h-full max-w-4xl"
            />
            {/* Vignette overlay to fade edges */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        </div>
    );
}
