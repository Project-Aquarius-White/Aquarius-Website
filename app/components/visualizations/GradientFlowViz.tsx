'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCcw, TrendingDown, TrendingUp, Minus } from 'lucide-react';

export default function GradientFlowViz() {
    const [timesteps, setTimesteps] = useState(10);
    const [weight, setWeight] = useState(0.8);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Calculate gradient strength: w^t
    const gradientStrength = Math.pow(weight, timesteps);
    
    // Determine status
    let status = 'Stable';
    if (Math.abs(gradientStrength) < 0.01) status = 'Vanished';
    if (Math.abs(gradientStrength) > 10) status = 'Exploded';

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setTimesteps(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="w-full h-full flex flex-col bg-zinc-950 p-6">
            {/* Header / Controls */}
            <div className="flex flex-col sm:flex-row gap-8 mb-8 z-10">
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-zinc-500">
                        <span>Weight (W)</span>
                        <span className="text-white">{weight.toFixed(2)}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0.5" 
                        max="1.5" 
                        step="0.1" 
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                        className="w-full accent-aquarius-cyan h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                        <span>Vanishing (&lt;1.0)</span>
                        <span>Stable (1.0)</span>
                        <span>Exploding (&gt;1.0)</span>
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-zinc-500">
                        <span>Timesteps (t)</span>
                        <span className="text-white">{timesteps}</span>
                    </div>
                    <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={timesteps}
                        onChange={(e) => setTimesteps(parseInt(e.target.value))}
                        className="w-full accent-aquarius-cyan h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                    />
                     <button 
                        onClick={() => { setTimesteps(1); setIsPlaying(true); }}
                        className="text-[10px] font-mono flex items-center gap-1 text-aquarius-cyan hover:underline"
                    >
                        <RefreshCcw className="w-3 h-3" /> Replay Flow
                    </button>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="flex-1 relative flex items-center justify-center border border-zinc-800 bg-zinc-900/30 rounded-lg overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative z-10 flex items-center gap-4 w-full px-12">
                    {/* Input Signal */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                         <div className="w-20 h-16 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
                            <span className="font-mono text-xs text-zinc-400">Step 1</span>
                         </div>
                         <div className="h-20 w-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                         <span className="font-mono text-xs text-emerald-500">1.0</span>
                    </div>

                    {/* Arrow Flow */}
                    <div className="flex-1 h-px bg-zinc-800 relative min-w-[100px]">
                        <motion.div 
                            className="absolute top-1/2 left-0 h-0.5 bg-aquarius-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)] -translate-y-1/2"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5 }}
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-2 py-1 text-[10px] sm:text-xs font-mono text-zinc-500 border border-zinc-800 rounded whitespace-nowrap z-20">
                            x {weight.toFixed(1)} ^ {timesteps}
                        </div>
                    </div>

                    {/* Output Signal */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                         <div className="w-20 h-16 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
                            <span className="font-mono text-xs text-zinc-400">Step {timesteps}</span>
                         </div>
                         
                         {/* Dynamic Bar */}
                         <motion.div 
                            className={`w-2 rounded-full transition-all duration-300 ${
                                status === 'Vanished' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                                status === 'Exploded' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 
                                'bg-aquarius-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                            }`}
                            initial={false}
                            animate={{ 
                                height: Math.min(Math.max(80 * gradientStrength, 2), 160) // Clamp visually
                            }}
                         />
                         
                         <span className={`font-mono text-xs ${
                            status === 'Vanished' ? 'text-red-500' : 
                            status === 'Exploded' ? 'text-amber-500' : 
                            'text-aquarius-cyan'
                         }`}>
                            {gradientStrength > 1000 ? '> 1000' : gradientStrength.toFixed(5)}
                         </span>
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-4 flex justify-center">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest
                    ${status === 'Vanished' ? 'border-red-500/30 bg-red-500/10 text-red-400' :
                      status === 'Exploded' ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' :
                      'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'}
                `}>
                    {status === 'Vanished' ? <TrendingDown className="w-4 h-4" /> :
                     status === 'Exploded' ? <TrendingUp className="w-4 h-4" /> :
                     <Minus className="w-4 h-4" />}
                    Result: {status} Gradient
                </div>
            </div>
        </div>
    );
}
