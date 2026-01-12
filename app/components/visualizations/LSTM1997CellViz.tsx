'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';

export default function LSTM1997CellViz() {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showLabels, setShowLabels] = useState(true);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep(prev => (prev + 1) % 5);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const stepLabels = [
        { title: 'Input Arrives', desc: 'net_c enters the cell' },
        { title: 'g() Squash', desc: 'Input squashed to [-2, 2]' },
        { title: 'Input Gate', desc: 'y_in controls what enters' },
        { title: 'CEC Update', desc: 's_c = s_c + (g × y_in)' },
        { title: 'Output Gate', desc: 'y_out controls what exits' },
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

            <div className="flex-1 relative border border-zinc-800 bg-zinc-900/30 rounded-lg flex items-center justify-center overflow-hidden p-4">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <svg viewBox="0 0 700 320" className="w-full max-w-3xl h-auto relative z-10">
                    <defs>
                        <marker id="arrowBlack" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6" fill="#a1a1aa" />
                        </marker>
                        <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6" fill="#00f0ff" />
                        </marker>
                    </defs>

                    {/* Main Cell Bounding Box */}
                    <rect x="120" y="30" width="460" height="200" rx="8" fill="none" stroke="#3f3f46" strokeWidth="2" />
                    
                    {/* CEC Equation at top */}
                    <text x="350" y="55" textAnchor="middle" className="text-sm fill-white font-mono font-bold">
                        s_c = s_c + g·y^in
                    </text>

                    {/* Input Arrow (net_c) */}
                    <motion.path 
                        d="M 40 130 L 120 130" 
                        stroke={step === 0 ? '#00f0ff' : '#52525b'} 
                        strokeWidth="2" 
                        markerEnd={step === 0 ? 'url(#arrowCyan)' : 'url(#arrowBlack)'} 
                        animate={{ opacity: step === 0 ? 1 : 0.5 }}
                    />
                    {showLabels && <text x="20" y="110" className="text-[10px] fill-zinc-400 font-mono">net_c</text>}
                    {showLabels && <text x="20" y="160" className="text-[10px] fill-zinc-500 font-mono">W_c @ x</text>}

                    {/* g() Squash Circle */}
                    <motion.circle 
                        cx="160" cy="130" r="25" 
                        fill="#09090b" 
                        stroke={step === 1 ? '#00f0ff' : '#52525b'} 
                        strokeWidth="2"
                        animate={{ scale: step === 1 ? 1.1 : 1 }}
                    />
                    <text x="160" y="135" textAnchor="middle" className="text-xs fill-zinc-300 font-bold font-mono">g</text>
                    {showLabels && <text x="160" y="175" textAnchor="middle" className="text-[9px] fill-zinc-500 font-mono">[-2, 2]</text>}

                    {/* Multiplication node (g * y_in) */}
                    <motion.circle 
                        cx="250" cy="130" r="15" 
                        fill="#09090b" 
                        stroke={step === 2 ? '#00f0ff' : '#52525b'} 
                        strokeWidth="2"
                        animate={{ scale: step === 2 ? 1.15 : 1 }}
                    />
                    <text x="250" y="135" textAnchor="middle" className="text-sm fill-white font-bold">×</text>
                    {showLabels && <text x="250" y="110" textAnchor="middle" className="text-[9px] fill-zinc-500 font-mono">g·y^in</text>}

                    {/* Line from g to mult */}
                    <path d="M 185 130 L 235 130" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* Input Gate (y_in) - coming from below */}
                    <motion.circle 
                        cx="250" cy="220" r="20" 
                        fill="#09090b" 
                        stroke={step === 2 ? '#10b981' : '#52525b'} 
                        strokeWidth="2"
                        animate={{ scale: step === 2 ? 1.1 : 1 }}
                    />
                    <text x="250" y="224" textAnchor="middle" className="text-xs fill-emerald-500 font-bold font-mono">σ</text>
                    {showLabels && <text x="250" y="260" textAnchor="middle" className="text-[9px] fill-zinc-500 font-mono">y^in</text>}
                    <path d="M 250 200 L 250 145" stroke={step === 2 ? '#10b981' : '#52525b'} strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* Input Gate inputs */}
                    <path d="M 200 280 L 240 235" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrowBlack)" />
                    <path d="M 250 280 L 250 240" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrowBlack)" />
                    <path d="M 300 280 L 260 235" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrowBlack)" />
                    {showLabels && <text x="250" y="295" textAnchor="middle" className="text-[8px] fill-zinc-600 font-mono">W_in</text>}

                    {/* CEC Addition Node */}
                    <motion.circle 
                        cx="350" cy="130" r="20" 
                        fill="#09090b" 
                        stroke={step === 3 ? '#10b981' : '#52525b'} 
                        strokeWidth="3"
                        animate={{ scale: step === 3 ? 1.15 : 1 }}
                    />
                    <text x="350" y="138" textAnchor="middle" className="text-lg fill-emerald-500 font-bold">+</text>
                    
                    {/* CEC Self-loop (1.0) */}
                    <path d="M 350 110 C 350 80, 380 80, 380 105" fill="none" stroke={step === 3 ? '#10b981' : '#52525b'} strokeWidth="2" />
                    <text x="375" y="90" className="text-[10px] fill-emerald-400 font-bold font-mono">1.0</text>
                    
                    {/* Line from mult to add */}
                    <path d="M 265 130 L 330 130" stroke={step === 3 ? '#10b981' : '#52525b'} strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* h() Squash Circle */}
                    <motion.circle 
                        cx="440" cy="130" r="25" 
                        fill="#09090b" 
                        stroke={step === 4 ? '#f59e0b' : '#52525b'} 
                        strokeWidth="2"
                        animate={{ scale: step === 4 ? 1.1 : 1 }}
                    />
                    <text x="440" y="135" textAnchor="middle" className="text-xs fill-zinc-300 font-bold font-mono">h</text>
                    {showLabels && <text x="440" y="175" textAnchor="middle" className="text-[9px] fill-zinc-500 font-mono">[-1, 1]</text>}
                    
                    {/* Line from add to h */}
                    <path d="M 370 130 L 415 130" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* Multiplication node (h * y_out) */}
                    <motion.circle 
                        cx="530" cy="130" r="15" 
                        fill="#09090b" 
                        stroke={step === 4 ? '#f59e0b' : '#52525b'} 
                        strokeWidth="2"
                        animate={{ scale: step === 4 ? 1.15 : 1 }}
                    />
                    <text x="530" y="135" textAnchor="middle" className="text-sm fill-white font-bold">×</text>
                    {showLabels && <text x="530" y="110" textAnchor="middle" className="text-[9px] fill-zinc-500 font-mono">h·y^out</text>}
                    
                    {/* Line from h to mult */}
                    <path d="M 465 130 L 515 130" stroke="#52525b" strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* Output Gate (y_out) - coming from below */}
                    <motion.circle 
                        cx="530" cy="220" r="20" 
                        fill="#09090b" 
                        stroke={step === 4 ? '#f59e0b' : '#52525b'} 
                        strokeWidth="2"
                        animate={{ scale: step === 4 ? 1.1 : 1 }}
                    />
                    <text x="530" y="224" textAnchor="middle" className="text-xs fill-amber-500 font-bold font-mono">σ</text>
                    {showLabels && <text x="530" y="260" textAnchor="middle" className="text-[9px] fill-zinc-500 font-mono">y^out</text>}
                    <path d="M 530 200 L 530 145" stroke={step === 4 ? '#f59e0b' : '#52525b'} strokeWidth="2" markerEnd="url(#arrowBlack)" />

                    {/* Output Gate inputs */}
                    <path d="M 480 280 L 520 235" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrowBlack)" />
                    <path d="M 530 280 L 530 240" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrowBlack)" />
                    <path d="M 580 280 L 540 235" stroke="#52525b" strokeWidth="1.5" markerEnd="url(#arrowBlack)" />
                    {showLabels && <text x="530" y="295" textAnchor="middle" className="text-[8px] fill-zinc-600 font-mono">W_out</text>}

                    {/* Output Arrow (y_c) */}
                    <motion.path 
                        d="M 545 130 L 660 130" 
                        stroke={step === 4 ? '#00f0ff' : '#52525b'} 
                        strokeWidth="2" 
                        markerEnd={step === 4 ? 'url(#arrowCyan)' : 'url(#arrowBlack)'}
                        animate={{ opacity: step === 4 ? 1 : 0.5 }}
                    />
                    {showLabels && <text x="680" y="135" className="text-[10px] fill-aquarius-cyan font-mono font-bold">y^c</text>}
                </svg>
            </div>
            
            <div className="mt-4 p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <div className="text-xs font-mono text-zinc-400">
                    <span className="text-aquarius-cyan">{stepLabels[step].title}:</span> {stepLabels[step].desc}
                </div>
            </div>
        </div>
    );
}
