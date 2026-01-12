'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, RotateCw, ArrowRight } from 'lucide-react';

export default function CECDemoViz() {
    const [mode, setMode] = useState<'RNN' | 'LSTM'>('RNN');
    const [signal, setSignal] = useState(1.0);
    const [isLooping, setIsLooping] = useState(false);
    const [step, setStep] = useState(0);

    // Simulation constants
    const rnnDecay = 0.6; // Multiplicative decay
    
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLooping) {
            interval = setInterval(() => {
                setStep(prev => prev + 1);
                setSignal(prev => {
                    if (mode === 'RNN') return prev * rnnDecay;
                    if (mode === 'LSTM') return prev; // Constant error!
                    return prev;
                });
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isLooping, mode]);

    const reset = () => {
        setIsLooping(false);
        setSignal(1.0);
        setStep(0);
    };

    return (
        <div className="w-full h-full flex flex-col bg-zinc-950 p-6">
            {/* Controls */}
            <div className="flex justify-center gap-4 mb-8">
                <button 
                    onClick={() => { setMode('RNN'); reset(); }}
                    className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${mode === 'RNN' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'}`}
                >
                    Standard RNN (× 0.6)
                </button>
                <button 
                    onClick={() => { setMode('LSTM'); reset(); }}
                    className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${mode === 'LSTM' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'}`}
                >
                    LSTM (CEC) (+ 0.0)
                </button>
            </div>

            {/* Diagram Area */}
            <div className="flex-1 relative border border-zinc-800 bg-zinc-900/30 rounded-lg overflow-visible flex items-center justify-center p-16">
                 {/* Background Grid */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative z-10 flex items-center gap-12">
                    
                    {/* The Cell/Node */}
                    <div className="relative p-4">
                        <motion.div 
                            className={`w-40 h-40 rounded-full border-4 flex items-center justify-center relative z-10 bg-zinc-950
                                ${mode === 'RNN' ? 'border-red-500/50' : 'border-emerald-500/50'}
                            `}
                            animate={{ scale: isLooping ? [1, 1.05, 1] : 1 }}
                            transition={{ duration: 0.8, repeat: isLooping ? Infinity : 0 }}
                        >
                            <div className="text-center px-2">
                                <div className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 mb-2">Signal Strength</div>
                                <div className={`text-xl font-bold font-mono overflow-hidden text-ellipsis px-2 ${mode === 'RNN' ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {signal.toFixed(4)}
                                </div>
                            </div>
                        </motion.div>

                        {/* Recurrent Loop Animation */}
                        <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" style={{ overflow: 'visible' }}>
                            <motion.circle 
                                cx="50%" cy="50%" r="80" 
                                fill="none" 
                                stroke={mode === 'RNN' ? '#ef4444' : '#10b981'} 
                                strokeWidth="2"
                                strokeDasharray="10 10"
                                className="opacity-30"
                            />
                             {/* Orbiting Dot representing the signal */}
                             {isLooping && (
                                <motion.circle 
                                    r="6" 
                                    fill={mode === 'RNN' ? '#ef4444' : '#10b981'}
                                    initial={{ pathLength: 0 }}
                                    animate={{ 
                                        rotate: 360 
                                    }}
                                    transition={{ 
                                        duration: 0.8, 
                                        repeat: Infinity, 
                                        ease: "linear" 
                                    }}
                                    style={{
                                        pathLength: 1,
                                        offsetPath: `path("M 64 64 m -80 0 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0")` // Approximate circle path
                                    }}
                                >
                                     {/* This actually needs a different SVG approach for orbital animation in React easily without paths. 
                                         Using CSS rotate on a wrapper is easier. */}
                                </motion.circle>
                             )}
                        </svg>

                         {/* Simple CSS Rotation Wrapper for the "Loop" visual */}
                         {isLooping && (
                             <div className="absolute inset-[-50px] animate-spin-slow rounded-full border-2 border-dashed border-zinc-700/50 pointer-events-none" style={{ animationDuration: '3s' }}>
                                 <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${mode === 'RNN' ? 'bg-red-500' : 'bg-emerald-500'} shadow-[0_0_15px_currentColor]`} />
                             </div>
                         )}
                    </div>

                    {/* Operation Visual */}
                    <div className="flex flex-col gap-4">
                        <div className={`p-4 rounded-lg border flex items-center gap-3 ${
                            mode === 'RNN' ? 'border-red-500/30 bg-red-500/10' : 'border-zinc-800 bg-zinc-900/50 opacity-50'
                        }`}>
                            <X className="w-5 h-5 text-red-400" />
                            <div>
                                <div className="text-xs font-mono text-zinc-400 uppercase">RNN Update</div>
                                <div className="text-sm font-bold text-zinc-200">h = h × W</div>
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg border flex items-center gap-3 ${
                            mode === 'LSTM' ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-900/50 opacity-50'
                        }`}>
                            <Plus className="w-5 h-5 text-emerald-400" />
                            <div>
                                <div className="text-xs font-mono text-zinc-400 uppercase">LSTM Update</div>
                                <div className="text-sm font-bold text-zinc-200">s = s + 0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Play/Reset */}
            <div className="mt-8 flex justify-center">
                {!isLooping ? (
                    <button 
                        onClick={() => { setSignal(1.0); setIsLooping(true); }}
                        className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-bold font-mono text-sm rounded hover:bg-aquarius-cyan transition-colors"
                    >
                        <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        START RECURRENCE
                    </button>
                ) : (
                     <button 
                        onClick={reset}
                        className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-zinc-300 font-bold font-mono text-sm rounded hover:bg-zinc-700 transition-colors"
                    >
                        STOP & RESET
                    </button>
                )}
            </div>
            
            <div className="text-center mt-4 text-xs font-mono text-zinc-600">
                Step: {step}
            </div>
        </div>
    );
}
