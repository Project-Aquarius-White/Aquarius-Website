'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';

export default function LSTM1997CellViz() {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showLabels, setShowLabels] = useState(true);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(prev => (prev + 1) % 5);
            }, 2500); 
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const stepLabels = [
        { title: 'Input Arrives', desc: 'net_c (Raw Input) enters the cell' },
        { title: 'Squashing', desc: 'Input g(x) squashes data to [-2, 2]' },
        { title: 'Input Gating', desc: 'Input Gate decides what to keep' },
        { title: 'CEC Update', desc: 'Error Carousel updates state' },
        { title: 'Output Gating', desc: 'Output Gate controls read-out' },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-zinc-950 p-4 sm:p-6">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
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
                    <button
                        onClick={() => setShowLabels(!showLabels)}
                        className={`p-2 rounded-md border transition-colors ${showLabels ? 'bg-aquarius-cyan/10 border-aquarius-cyan/30 text-aquarius-cyan' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                    >
                        <Info size={16} />
                    </button>
                </div>
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                    Step {step + 1}/5: <span className="text-white ml-1">{stepLabels[step].title}</span>
                </div>
            </div>

            {/* Render Equation OUTSIDE SVG for crisp text */}
            <div className="flex justify-center mb-8">
                 <div className="px-6 py-3 bg-zinc-900/80 border border-zinc-800 rounded-lg shadow-xl backdrop-blur-sm">
                    <div className="text-lg md:text-xl text-white font-mono font-bold tracking-wider flex items-center gap-3">
                        <span>s_c(t)</span>
                        <span className="text-zinc-500">=</span>
                        <span>s_c(t-1)</span>
                        <span className="text-aquarius-cyan">+</span>
                        <span className="text-zinc-300">g(net_c)</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-emerald-400">y_in</span>
                    </div>
                 </div>
            </div>

            <div className="flex-1 relative border border-zinc-800 bg-zinc-900/30 rounded-lg flex items-center justify-center p-2 sm:p-4">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] rounded-lg" />

                <svg viewBox="0 0 1100 480" className="w-full h-auto max-h-[80vh] relative z-10">
                    <defs>
                        <marker id="arrowBlack" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6" fill="#71717a" />
                        </marker>
                        <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6" fill="#00f0ff" />
                        </marker>
                    </defs>

                    {/* Main Cell Bounding Box */}
                    <rect x="180" y="20" width="740" height="280" rx="20" fill="none" stroke="#3f3f46" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.5" />
                    <text x="210" y="60" className="text-xl fill-zinc-700 font-mono uppercase tracking-widest font-bold">Memory Cell Block</text>
                    
                    {/* --- LEFT SIDE: INPUT & SQUASH --- */}
                    
                    {/* Input Arrow (net_c) */}
                    <motion.path 
                        d="M 20 160 L 180 160" 
                        stroke={step === 0 ? '#00f0ff' : '#52525b'} 
                        strokeWidth="3" 
                        markerEnd={step === 0 ? 'url(#arrowCyan)' : 'url(#arrowBlack)'} 
                        animate={{ opacity: step === 0 ? 1 : 0.5 }}
                    />
                    {showLabels && (
                        <g>
                            <text x="50" y="140" className="text-base fill-zinc-300 font-mono font-bold">Raw Input</text>
                            <text x="50" y="155" className="text-xs fill-zinc-500 font-mono">net_c</text>
                        </g>
                    )}

                    {/* g() Squash Circle */}
                    <motion.circle 
                        cx="250" cy="160" r="40" 
                        fill="#09090b" 
                        stroke={step === 1 ? '#00f0ff' : '#52525b'} 
                        strokeWidth="3"
                        animate={{ scale: step === 1 ? 1.1 : 1 }}
                    />
                    <text x="250" y="165" textAnchor="middle" className="text-2xl fill-zinc-300 font-bold font-mono">g</text>
                    
                    {/* g() Explanation */}
                    {showLabels && (
                        <g transform="translate(250, 230)">
                            <text x="0" y="0" textAnchor="middle" className="text-xs fill-aquarius-cyan font-mono font-bold">Input Squash</text>
                            <text x="0" y="15" textAnchor="middle" className="text-[10px] fill-zinc-500 font-mono">Sigmoid/Tanh</text>
                            <text x="0" y="28" textAnchor="middle" className="text-[10px] fill-zinc-500 font-mono">Range: [-2, 2]</text>
                        </g>
                    )}

                    {/* Line from g to mult */}
                    <path d="M 290 160 L 360 160" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* --- CENTER: INPUT GATE & CEC --- */}

                    {/* Input Gate (y_in) - Bottom Left */}
                    <motion.circle 
                        cx="390" cy="350" r="30" 
                        fill="#09090b" 
                        stroke={step === 2 ? '#10b981' : '#52525b'} 
                        strokeWidth="3"
                        animate={{ scale: step === 2 ? 1.1 : 1 }}
                    />
                    <text x="390" y="355" textAnchor="middle" className="text-xl fill-emerald-500 font-bold font-mono">σ</text>
                    <path d="M 390 320 L 390 195" stroke={step === 2 ? '#10b981' : '#52525b'} strokeWidth="3" markerEnd="url(#arrowBlack)" />
                    
                    {/* Input Gate Explanation */}
                    {showLabels && (
                        <g transform="translate(390, 410)">
                            <text x="0" y="0" textAnchor="middle" className="text-sm fill-emerald-400 font-mono font-bold">Input Gate</text>
                            <text x="0" y="15" textAnchor="middle" className="text-xs fill-zinc-500 font-mono">"Write" Permission</text>
                        </g>
                    )}

                    {/* Input Gate inputs */}
                    <path d="M 340 430 L 380 375" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />
                    <path d="M 390 430 L 390 380" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />
                    <path d="M 440 430 L 400 375" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* Multiplication node (g * y_in) */}
                    <motion.circle 
                        cx="390" cy="160" r="25" 
                        fill="#09090b" 
                        stroke={step === 2 ? '#00f0ff' : '#52525b'} 
                        strokeWidth="3"
                        animate={{ scale: step === 2 ? 1.15 : 1 }}
                    />
                    <text x="390" y="168" textAnchor="middle" className="text-xl fill-white font-bold">×</text>
                    
                    {/* Line from mult to add */}
                    <path d="M 415 160 L 515 160" stroke={step === 3 ? '#10b981' : '#52525b'} strokeWidth="3" markerEnd="url(#arrowBlack)" />

                    {/* CEC Addition Node (CENTERPIECE) */}
                    <motion.circle 
                        cx="550" cy="160" r="45" 
                        fill="#09090b" 
                        stroke={step === 3 ? '#10b981' : '#52525b'} 
                        strokeWidth="5"
                        animate={{ scale: step === 3 ? 1.15 : 1 }}
                        className="drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    />
                    <text x="550" y="172" textAnchor="middle" className="text-5xl fill-emerald-500 font-bold">+</text>
                    
                    {/* CEC Self-loop (1.0) */}
                    <path d="M 550 115 C 550 50, 620 50, 620 100" fill="none" stroke={step === 3 ? '#10b981' : '#52525b'} strokeWidth="4" markerEnd="url(#arrowCyan)" />
                    <rect x="580" y="60" width="50" height="25" rx="6" fill="#09090b" stroke="#10b981" />
                    <text x="605" y="77" textAnchor="middle" className="text-sm fill-emerald-400 font-bold font-mono">1.0</text>
                    
                    {/* CEC Label */}
                    {showLabels && (
                         <g transform="translate(550, 240)">
                            <text x="0" y="0" textAnchor="middle" className="text-base fill-white font-mono font-bold tracking-widest">CEC</text>
                            <text x="0" y="18" textAnchor="middle" className="text-xs fill-zinc-500 font-mono">Constant Error Carousel</text>
                            <text x="0" y="32" textAnchor="middle" className="text-xs fill-zinc-600 font-mono">The Heart of LSTM</text>
                        </g>
                    )}

                    {/* Line from add to h */}
                    <path d="M 595 160 L 670 160" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* --- RIGHT SIDE: OUTPUT SQUASH & GATE --- */}

                    {/* h() Squash Circle */}
                    <motion.circle 
                        cx="710" cy="160" r="40" 
                        fill="#09090b" 
                        stroke={step === 4 ? '#f59e0b' : '#52525b'} 
                        strokeWidth="3"
                        animate={{ scale: step === 4 ? 1.1 : 1 }}
                    />
                    <text x="710" y="165" textAnchor="middle" className="text-2xl fill-zinc-300 font-bold font-mono">h</text>
                    
                    {/* h() Explanation */}
                    {showLabels && (
                        <g transform="translate(710, 230)">
                            <text x="0" y="0" textAnchor="middle" className="text-xs fill-amber-500 font-mono font-bold">Output Squash</text>
                            <text x="0" y="15" textAnchor="middle" className="text-[10px] fill-zinc-500 font-mono">Range: [-1, 1]</text>
                        </g>
                    )}

                    {/* Line from h to mult */}
                    <path d="M 750 160 L 825 160" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* Output Gate (y_out) - Bottom Right */}
                    <motion.circle 
                        cx="850" cy="350" r="30" 
                        fill="#09090b" 
                        stroke={step === 4 ? '#f59e0b' : '#52525b'} 
                        strokeWidth="3"
                        animate={{ scale: step === 4 ? 1.1 : 1 }}
                    />
                    <text x="850" y="355" textAnchor="middle" className="text-xl fill-amber-500 font-bold font-mono">σ</text>
                    <path d="M 850 320 L 850 195" stroke={step === 4 ? '#f59e0b' : '#52525b'} strokeWidth="3" markerEnd="url(#arrowBlack)" />

                    {/* Output Gate Explanation */}
                    {showLabels && (
                        <g transform="translate(850, 410)">
                            <text x="0" y="0" textAnchor="middle" className="text-sm fill-amber-400 font-mono font-bold">Output Gate</text>
                            <text x="0" y="15" textAnchor="middle" className="text-xs fill-zinc-500 font-mono">"Read" Permission</text>
                        </g>
                    )}

                    {/* Output Gate inputs */}
                    <path d="M 800 430 L 840 375" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />
                    <path d="M 850 430 L 850 380" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />
                    <path d="M 900 430 L 860 375" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* Multiplication node (h * y_out) */}
                    <motion.circle 
                        cx="850" cy="160" r="25" 
                        fill="#09090b" 
                        stroke={step === 4 ? '#f59e0b' : '#52525b'} 
                        strokeWidth="3"
                        animate={{ scale: step === 4 ? 1.15 : 1 }}
                    />
                    <text x="850" y="168" textAnchor="middle" className="text-xl fill-white font-bold">×</text>

                    {/* Output Arrow (y_c) */}
                    <motion.path 
                        d="M 875 160 L 1050 160" 
                        stroke={step === 4 ? '#00f0ff' : '#52525b'} 
                        strokeWidth="3" 
                        markerEnd={step === 4 ? 'url(#arrowCyan)' : 'url(#arrowBlack)'}
                        animate={{ opacity: step === 4 ? 1 : 0.5 }}
                    />
                    {showLabels && (
                        <g>
                            <text x="960" y="140" className="text-base fill-aquarius-cyan font-mono font-bold">Final Output</text>
                            <text x="960" y="155" className="text-xs fill-zinc-500 font-mono">y^c</text>
                        </g>
                    )}

                </svg>
            </div>
            
            <div className="mt-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-aquarius-cyan animate-pulse" />
                    <div className="text-xs font-mono text-zinc-400">
                        <span className="text-aquarius-cyan font-bold">{stepLabels[step].title}:</span> {stepLabels[step].desc}
                    </div>
                </div>
            </div>
        </div>
    );
}
