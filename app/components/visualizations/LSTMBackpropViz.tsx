'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LSTMBackpropViz() {
    return (
        <div className="w-full h-full flex flex-col bg-zinc-950 p-6">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                     <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">LSTM Path (1.0)</span>
                     </div>
                     <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-xs font-mono text-red-400 uppercase tracking-wider">RNN Path (&lt;1.0)</span>
                     </div>
                </div>
                <div className="text-zinc-500 text-xs font-mono">
                    Time Flow: <span className="text-white">← Backward</span>
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-hidden border border-zinc-800 bg-zinc-900/30 rounded-lg">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <svg viewBox="0 0 800 200" className="w-full max-w-4xl relative z-10">
                    <defs>
                         <linearGradient id="fadeGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>

                    {/* Timesteps */}
                    {[0, 1, 2, 3].map((i) => (
                        <g key={i} transform={`translate(${600 - i * 180}, 40)`}>
                            {/* Cell Box */}
                            <rect x="0" y="0" width="120" height="120" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="2" />
                            <text x="60" y="-10" textAnchor="middle" className="text-xs fill-zinc-500 font-mono uppercase">t = {3 - i}</text>
                            
                            {/* LSTM CEC Path (Top) */}
                            <line x1="0" y1="30" x2="120" y2="30" stroke="#10b981" strokeWidth="4" strokeOpacity="0.3" />
                            
                            {/* RNN Path (Bottom - through tanh) */}
                            <line x1="0" y1="90" x2="120" y2="90" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.3" />
                            
                            {/* Internal Logic */}
                            <circle cx="60" cy="30" r="15" fill="#09090b" stroke="#10b981" strokeWidth="2" />
                            <text x="60" y="34" textAnchor="middle" className="text-[10px] fill-emerald-500 font-bold font-mono">1.0</text>

                            <circle cx="60" cy="90" r="15" fill="#09090b" stroke="#ef4444" strokeWidth="2" />
                            <text x="60" y="94" textAnchor="middle" className="text-[10px] fill-red-500 font-bold font-mono">tanh'</text>
                        </g>
                    ))}

                    {/* Connecting Arrows (Backward) */}
                    {[0, 1, 2].map((i) => (
                        <g key={i} transform={`translate(${600 - i * 180}, 40)`}>
                             {/* CEC Arrow */}
                             <path d="M 0 30 L -60 30" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                             
                             {/* RNN Arrow */}
                             <path d="M 0 90 L -60 90" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
                        </g>
                    ))}

                    {/* Animated Gradient Packet - LSTM (Constant) */}
                    <motion.circle r="6" fill="#10b981" filter="drop-shadow(0 0 4px #10b981)"
                        animate={{
                            cx: [720, 80],
                            opacity: [1, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        cy="70" // Adjusted to top path relative to transform
                    />

                    {/* Animated Gradient Packet - RNN (Decaying) */}
                    <motion.circle fill="#ef4444" filter="drop-shadow(0 0 2px #ef4444)"
                        animate={{
                            cx: [720, 80],
                            r: [6, 0.5], // Shrinking!
                            opacity: [1, 0.2]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        cy="130" // Adjusted to bottom path
                    />

                </svg>
            </div>
        </div>
    );
}
