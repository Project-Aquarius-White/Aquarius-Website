'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function LSTMForwardViz() {
    const [step, setStep] = useState(0); // 0: input, 1: gates, 2: update, 3: output
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(prev => (prev + 1) % 4);
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="w-full h-full flex flex-col bg-zinc-950 p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-aquarius-cyan hover:bg-zinc-800 transition-colors"
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button 
                        onClick={() => { setIsPlaying(false); setStep(0); }}
                        className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition-colors"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                    Phase: <span className="text-white ml-2">
                        {step === 0 ? 'Input Integration' : 
                         step === 1 ? 'Gate Computation' : 
                         step === 2 ? 'Cell Update (CEC)' : 'Output'}
                    </span>
                </div>
            </div>

            <div className="flex-1 relative border border-zinc-800 bg-zinc-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* Diagram */}
                <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto relative z-10">
                    <defs>
                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6" fill="#52525b" />
                        </marker>
                    </defs>

                    {/* Main Cell Box */}
                    <rect x="100" y="40" width="400" height="220" rx="10" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="520" y="30" className="text-xs fill-zinc-600 font-mono">LSTM Cell</text>

                    {/* Inputs */}
                    <path d="M 20 150 L 100 150" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="40" y="140" className="text-xs fill-zinc-400 font-mono">Input (x)</text>

                    {/* Paths */}
                    {/* To Input Gate */}
                    <path d="M 140 150 L 140 220 L 180 220" fill="none" stroke="#52525b" strokeWidth="2" />
                    {/* To Cell Input */}
                    <path d="M 140 150 L 180 150" fill="none" stroke="#52525b" strokeWidth="2" />
                    {/* To Output Gate */}
                    <path d="M 140 150 L 140 80 L 380 80 L 380 120" fill="none" stroke="#52525b" strokeWidth="2" />

                    {/* Components */}
                    
                    {/* Input Gate */}
                    <g className={`transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                        <circle cx="200" cy="220" r="20" fill="#18181b" stroke="#00f0ff" strokeWidth="2" />
                        <text x="200" y="224" textAnchor="middle" className="text-xs fill-aquarius-cyan font-bold font-mono">σ</text>
                        <text x="200" y="255" textAnchor="middle" className="text-[10px] fill-zinc-500 font-mono uppercase">In Gate</text>
                    </g>

                    {/* Activation g */}
                    <g className={`transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                        <circle cx="200" cy="150" r="20" fill="#18181b" stroke="#a1a1aa" strokeWidth="2" />
                        <text x="200" y="154" textAnchor="middle" className="text-xs fill-zinc-300 font-bold font-mono">tanh</text>
                    </g>

                    {/* Multiplication Node (Gated Input) */}
                    <g className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                        <circle cx="280" cy="150" r="15" fill="#18181b" stroke="#e4e4e7" strokeWidth="2" />
                        <text x="280" y="154" textAnchor="middle" className="text-xs fill-white font-bold">×</text>
                    </g>

                    {/* Connection from In Gate to Mul */}
                    <path d="M 220 220 L 280 220 L 280 165" fill="none" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Cell State Line (CEC) */}
                    <path d="M 20 60 L 580 60" stroke="#52525b" strokeWidth="4" className="opacity-30" />
                    <text x="50" y="50" className="text-xs fill-zinc-500 font-mono">CEC Highway</text>

                    {/* Addition Node (Update) */}
                    <g className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                        <circle cx="280" cy="60" r="20" fill="#18181b" stroke="#10b981" strokeWidth="2" />
                        <text x="280" y="65" textAnchor="middle" className="text-lg fill-emerald-500 font-bold">+</text>
                    </g>

                    {/* Connection from Mul to Add */}
                    <path d="M 280 135 L 280 80" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" className={step === 2 ? 'animate-pulse' : ''} markerEnd="url(#arrow)" />

                    {/* Output Gate */}
                    <g className={`transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                        <circle cx="380" cy="140" r="20" fill="#18181b" stroke="#f59e0b" strokeWidth="2" />
                        <text x="380" y="144" textAnchor="middle" className="text-xs fill-amber-500 font-bold font-mono">σ</text>
                        <text x="430" y="144" textAnchor="middle" className="text-[10px] fill-zinc-500 font-mono uppercase">Out Gate</text>
                    </g>

                    {/* Output Activation h */}
                    <g className={`transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                        <circle cx="480" cy="140" r="20" fill="#18181b" stroke="#a1a1aa" strokeWidth="2" />
                        <text x="480" y="144" textAnchor="middle" className="text-xs fill-zinc-300 font-bold font-mono">tanh</text>
                    </g>

                    {/* Connection from Cell to Output Activation */}
                    <path d="M 320 60 L 480 60 L 480 120" fill="none" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Multiplication Node (Gated Output) */}
                    <g className={`transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                        <circle cx="480" cy="200" r="15" fill="#18181b" stroke="#e4e4e7" strokeWidth="2" />
                        <text x="480" y="204" textAnchor="middle" className="text-xs fill-white font-bold">×</text>
                    </g>

                    {/* Connections for Output */}
                    <path d="M 380 160 L 380 200 L 465 200" fill="none" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrow)" />
                    <path d="M 480 160 L 480 185" fill="none" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrow)" />
                    
                    {/* Final Output */}
                    <path d="M 495 200 L 580 200" stroke={step === 3 ? '#00f0ff' : '#52525b'} strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="540" y="190" className={`text-xs font-mono transition-colors ${step === 3 ? 'fill-aquarius-cyan' : 'fill-zinc-500'}`}>Output (h)</text>

                    {/* Data Flow Particles */}
                    {isPlaying && (
                        <>
                             {/* Input Flow */}
                            <motion.circle r="4" fill="#fff" 
                                animate={{ 
                                    pathLength: [0, 1], 
                                    opacity: [1, 0]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 150 L 100 150 L 140 150" />
                            </motion.circle>

                            {/* Gate Flow */}
                            <motion.circle r="3" fill="#00f0ff" className={step >= 1 ? 'opacity-100' : 'opacity-0'}>
                                <animateMotion dur="1s" repeatCount="indefinite" path="M 140 150 L 140 220 L 200 220 L 280 220 L 280 165" />
                            </motion.circle>

                            {/* CEC Flow */}
                            <motion.circle r="4" fill="#10b981" className={step >= 2 ? 'opacity-100' : 'opacity-0'}>
                                <animateMotion dur="2s" repeatCount="indefinite" path="M 20 60 L 580 60" />
                            </motion.circle>

                             {/* Output Flow */}
                             <motion.circle r="4" fill="#f59e0b" className={step >= 3 ? 'opacity-100' : 'opacity-0'}>
                                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 320 60 L 480 60 L 480 120" />
                            </motion.circle>
                        </>
                    )}
                </svg>
            </div>
        </div>
    );
}
