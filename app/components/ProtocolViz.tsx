"use client";

import { useEffect, useRef } from "react";

type ProtocolStep = "INTAKE" | "SIM" | "BUILD" | "HUNT" | "SHIP" | null;

export default function ProtocolViz({ step }: { step: ProtocolStep }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const frameRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize handler
        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        resize();
        window.addEventListener("resize", resize);

        // Animation Loop
        const animate = (time: number) => {
            frameRef.current++;
            ctx.fillStyle = "rgba(0,0,0,0.2)"; // Fade trail
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const w = canvas.width;
            const h = canvas.height;
            const t = frameRef.current;

            // Common styles
            ctx.strokeStyle = "#00f0ff";
            ctx.fillStyle = "#00f0ff";
            ctx.lineWidth = 1;

            if (step === "INTAKE") {
                // Input nodes visualization: Data particles flowing into a grid
                const cols = 20;
                const rows = 10;
                const cellW = w / cols;
                const cellH = h / rows;

                // Draw Grid Nodes
                for (let i = 0; i < cols; i++) {
                    for (let j = 0; j < rows; j++) {
                        if (Math.random() < 0.01) {
                            ctx.globalAlpha = Math.random();
                            ctx.fillRect(i * cellW, j * cellH, 2, 2);
                        }
                    }
                }
                ctx.globalAlpha = 1;

                // Flowing Data Streams (Vertical)
                for (let i = 0; i < 5; i++) {
                    const x = (w / 5) * i + (w / 10) + Math.sin(t * 0.05 + i) * 50;
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, h);
                    ctx.strokeStyle = `rgba(0, 240, 255, 0.1)`;
                    ctx.stroke();

                    // Particles
                    const py = (t * (5 + i)) % h;
                    ctx.fillRect(x - 2, py, 4, 4);
                }

            } else if (step === "SIM") {
                // Neural Network Training: Nodes connecting and pulsing
                const nodes = [];
                const layers = 5;
                const nodesPerLayer = 6;

                // Calculate static node positions
                for (let l = 0; l < layers; l++) {
                    const lx = (w / (layers + 1)) * (l + 1);
                    for (let n = 0; n < nodesPerLayer; n++) {
                        const ly = (h / (nodesPerLayer + 1)) * (n + 1);
                        nodes.push({ x: lx, y: ly });
                        // Pulse node
                        const pulse = Math.sin(t * 0.1 + l + n);
                        if (pulse > 0.8) {
                            ctx.beginPath();
                            ctx.arc(lx, ly, 3, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }

                // Random active connections
                ctx.beginPath();
                for (let i = 0; i < 20; i++) {
                    // Simple random connection visualization
                    const n1 = nodes[Math.floor(Math.sin(t * 0.01 * i + i) * nodes.length + nodes.length) % nodes.length];
                    const n2 = nodes[Math.floor(Math.cos(t * 0.01 * i + i) * nodes.length + nodes.length) % nodes.length];
                    if (Math.abs(n1.x - n2.x) < w / 3) { // Only connect nearby layers roughly
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                    }
                }
                ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
                ctx.stroke();

            } else if (step === "BUILD") {
                // Logic/Code: Falling characters or blocks
                const fontSize = 14;
                const columns = Math.ceil(w / fontSize);

                for (let i = 0; i < columns; i++) {
                    if (i % 3 !== 0) continue; // Sparse
                    const speed = (Math.sin(i) + 2) * 2;
                    const y = (t * speed) % h;

                    // Binary or Hex
                    const char = Math.random() > 0.5 ? "1" : "0";
                    ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
                    ctx.font = "12px monospace";
                    ctx.fillText(char, i * fontSize, y);

                    if (Math.random() > 0.95) {
                        ctx.fillStyle = "#fff";
                        ctx.fillText(char, i * fontSize, y);
                    }
                }
            } else if (step === "HUNT") {
                // Validation/Search: Crosshairs scanning
                const scanY = (Math.sin(t * 0.05) * 0.5 + 0.5) * h;

                // Horizontal Scan Line
                ctx.beginPath();
                ctx.moveTo(0, scanY);
                ctx.lineTo(w, scanY);
                ctx.strokeStyle = "rgba(255, 50, 50, 0.5)"; // Red for HUNT
                ctx.stroke();

                // Targets
                for (let i = 0; i < 3; i++) {
                    const tx = (w * 0.2) * (i + 1);
                    const ty = (h * 0.3) * (i + 1);

                    // Draw target brackets
                    const sz = 20;
                    ctx.strokeStyle = "rgba(0, 240, 255, 0.5)";
                    ctx.strokeRect(tx - sz / 2, ty - sz / 2, sz, sz);

                    // Hit marker?
                    if (Math.abs(ty - scanY) < 5) {
                        ctx.fillStyle = "#fff";
                        ctx.fillRect(tx - 2, ty - 2, 4, 4);
                        ctx.fillText("MATCH_FOUND", tx + 15, ty);
                    }
                }

            } else if (step === "SHIP") {
                // Emitter: Center to edges (Twitter, Github)
                const cx = w / 2;
                const cy = h / 2;

                // Emitter Pulse
                ctx.beginPath();
                ctx.arc(cx, cy, 10 + Math.sin(t * 0.2) * 5, 0, Math.PI * 2);
                ctx.strokeStyle = "#fff";
                ctx.stroke();

                // Particles flying out
                const particles = 10;
                for (let i = 0; i < particles; i++) {
                    const angle = (Math.PI * 2 / particles) * i + t * 0.01;
                    const dist = (t * 5 + i * 20) % (Math.min(w, h) / 2);

                    const px = cx + Math.cos(angle) * dist;
                    const py = cy + Math.sin(angle) * dist;

                    ctx.fillStyle = "#00f0ff";
                    ctx.fillRect(px, py, 3, 3);

                    // Tail
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(px, py);
                    ctx.strokeStyle = "rgba(0, 240, 255, 0.1)";
                    ctx.stroke();
                }

                // Draw Icons (Text for now)
                ctx.fillStyle = "#fff";
                ctx.font = "20px monospace";
                ctx.fillText("X", cx + Math.min(w, h) / 2.5 * Math.cos(0), cy + Math.min(w, h) / 2.5 * Math.sin(0));
                ctx.fillText("git", cx + Math.min(w, h) / 2.5 * Math.cos(2), cy + Math.min(w, h) / 2.5 * Math.sin(2));
                ctx.fillText("PyTorch", cx + Math.min(w, h) / 2.5 * Math.cos(4), cy + Math.min(w, h) / 2.5 * Math.sin(4));

            } else {
                // IDLE STATE: Low energy noise
                if (Math.random() > 0.9) {
                    const x = Math.random() * w;
                    const y = Math.random() * h;
                    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
                    ctx.fillRect(x, y, 1, 1);
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [step]);

    return (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen" />
    );
}
