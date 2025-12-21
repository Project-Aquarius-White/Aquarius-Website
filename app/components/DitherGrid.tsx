"use client";

import { useEffect, useRef } from "react";

export default function DitherGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        const draw = () => {
            time += 0.05;
            // Clear with slight fade for trail effect? No, clean wipe for dither.
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const spacing = 20;
            const cols = Math.ceil(canvas.width / spacing);
            const rows = Math.ceil(canvas.height / spacing);

            ctx.fillStyle = "#00f0ff";

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;

                    // Distance to mouse
                    const dx = x - mouse.current.x;
                    const dy = y - mouse.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Dither pattern calculation
                    // Use sin waves + noise to determine if a pixel should be drawn
                    const noise = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time);

                    // Interaction radius
                    const interactRaw = Math.max(0, 1 - dist / 300); // 0 to 1
                    const interact = interactRaw * interactRaw; // curve it

                    // Size of the dot
                    let size = 1;

                    // If close to mouse, chaotic size
                    if (dist < 200) {
                        size = 1 + Math.random() * 2 + interact * 5;
                    } else if (noise > 0.8) {
                        size = 1.5; // Occasional sparkle
                    } else {
                        continue; // Don't draw most dots for sparse look
                    }

                    if (Math.random() > 0.95) {
                        // Random glitch offset
                        ctx.fillRect(x + (Math.random() - 0.5) * 10, y, size, size);
                    } else {
                        ctx.fillRect(x, y, size, size);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none"
        />
    );
}
