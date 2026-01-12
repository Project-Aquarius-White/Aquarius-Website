'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LSTMBackpropViz() {
    return (
        <div className="w-full h-full flex flex-col bg-zinc-950 p-6">
            <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">The Gradient Superhighway</h3>
                    <p className="text-xs text-zinc-400 font-mono">
                        Error flows backward through time without decaying
                    </p>
                </div>
                <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono text-red-400 uppercase tracking-wider">Gradient Flow</span>
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center border border-zinc-800 bg-zinc-900/30 rounded-lg p-4">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] rounded-lg" />

                <svg viewBox="0 0 900 450" className="w-full h-auto relative z-10 overflow-visible">
                    <defs>
                        <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6" fill="#ef4444" />
                        </marker>
                        <marker id="arrowGray" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6" fill="#52525b" />
                        </marker>
                    </defs>

                    <text x="450" y="60" textAnchor="middle" className="text-3xl font-bold fill-red-500 tracking-tight" style={{ textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>
                        UNINTERRUPTED GRADIENT FLOW!
                    </text>
                    <motion.path 
                        d="M 850 90 L 50 90" 
                        stroke="#ef4444" 
                        strokeWidth="6" 
                        markerEnd="url(#arrowRed)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {[0, 1, 2].map((i) => {
                        const xOffset = 600 - (i * 280); 
                        const yBase = 220; 
                        
                        return (
                            <g key={i} transform={`translate(${xOffset}, ${yBase})`}>
                                <rect x="0" y="0" width="220" height="140" rx="12" fill="#18181b" stroke="#27272a" strokeWidth="2" />
                                
                                <text x="110" y="130" textAnchor="middle" className="text-xs fill-zinc-500 font-mono uppercase tracking-widest">
                                    Step t-{i}
                                </text>

                                <line x1="0" y1="40" x2="220" y2="40" stroke="#3f3f46" strokeWidth="2" />
                                
                                <motion.line 
                                    x1="220" y1="40" x2="0" y2="40" 
                                    stroke="#ef4444" 
                                    strokeWidth="4" 
                                    strokeOpacity="0.8"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                <circle cx="50" cy="90" r="12" fill="#09090b" stroke="#52525b" strokeWidth="2" />
                                <text x="50" y="94" textAnchor="middle" className="text-[10px] fill-zinc-400 font-bold">i</text>
                                <path d="M 50 78 L 50 40" stroke="#52525b" strokeWidth="1" />

                                <circle cx="110" cy="40" r="14" fill="#09090b" stroke="#ef4444" strokeWidth="2" />
                                <text x="110" y="45" textAnchor="middle" className="text-sm fill-red-500 font-bold">+</text>

                                <path d="M 110 90 L 110 54" stroke="#52525b" strokeWidth="1" markerEnd="url(#arrowGray)" />
                                <circle cx="110" cy="90" r="12" fill="#09090b" stroke="#52525b" strokeWidth="2" /> 
                                <text x="110" y="94" textAnchor="middle" className="text-[10px] fill-zinc-400 font-bold">g</text>

                                <circle cx="170" cy="90" r="12" fill="#09090b" stroke="#52525b" strokeWidth="2" />
                                <text x="170" y="94" textAnchor="middle" className="text-[10px] fill-zinc-400 font-bold">o</text>
                                <path d="M 170 78 L 170 40" stroke="#52525b" strokeWidth="1" />

                                <path d="M 50 140 L 50 102" stroke="#52525b" strokeWidth="1" strokeDasharray="3 3" />
                                <path d="M 110 140 L 110 102" stroke="#52525b" strokeWidth="1" strokeDasharray="3 3" />
                                <path d="M 170 140 L 170 102" stroke="#52525b" strokeWidth="1" strokeDasharray="3 3" />

                                <text x="-10" y="25" textAnchor="end" className="text-xl fill-zinc-300 font-mono font-bold">C_{3-i}</text>
                            </g>
                        );
                    })}

                    <g>
                        <motion.path d="M 600 260 L 540 260" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowRed)" />
                        
                        <motion.path d="M 320 260 L 260 260" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowRed)" />

                        <motion.path d="M 40 260 L -20 260" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowRed)" />
                    </g>
                    
                     <motion.circle r="8" fill="#ef4444" filter="drop-shadow(0 0 8px #ef4444)"
                        animate={{
                            cx: [820, 20],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        cy="260" 
                    />
                </svg>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500">
                <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 font-bold">+</div>
                    <p>The additive update means gradients just pass through unchanged (derivative is 1.0)</p>
                </div>
                <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">×</div>
                    <p>Multiplicative gates (input/output) are side branches, not main road blocks</p>
                </div>
            </div>
        </div>
    );
}
