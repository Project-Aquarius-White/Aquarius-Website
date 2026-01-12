'use client';

import React, { useState } from 'react';
import { 
    ChevronDown,
    ChevronUp,
    HelpCircle,
    Lightbulb
} from 'lucide-react';

interface QuestionBoxProps {
    question: string;
    children: React.ReactNode;
    difficulty?: 'easy' | 'medium' | 'hard';
}

export function QuestionBox({ question, children, difficulty = 'easy' }: QuestionBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const difficultyColors = {
        easy: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',
        medium: 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40',
        hard: 'border-red-500/20 bg-red-500/5 hover:border-red-500/40'
    };
    
    const iconColors = {
        easy: 'text-emerald-400',
        medium: 'text-amber-400',
        hard: 'text-red-400'
    };

    return (
        <div className={`my-12 rounded-xl border ${difficultyColors[difficulty]} overflow-hidden transition-all duration-500 shadow-sm hover:shadow-md`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-start gap-4 text-left transition-colors group"
            >
                <div className={`mt-0.5 p-2 rounded-lg bg-zinc-950/50 border border-zinc-800 group-hover:border-opacity-50 transition-all ${iconColors[difficulty]}`}>
                    <HelpCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`font-mono text-xs uppercase tracking-widest font-bold ${iconColors[difficulty]} opacity-70`}>
                            Check Your Understanding
                        </span>
                    </div>
                    <p className="text-zinc-200 font-medium leading-relaxed text-lg group-hover:text-white transition-colors">
                        {question}
                    </p>
                </div>
                <div className={`text-zinc-500 mt-2 p-1 rounded-full border border-zinc-800 transition-all duration-300 ${isOpen ? 'rotate-180 bg-zinc-800 text-zinc-300' : 'group-hover:text-zinc-300 group-hover:border-zinc-600'}`}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>
            
            <div 
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0">
                        <div className="p-6 rounded-lg bg-zinc-950/50 border border-zinc-800/50 flex items-start gap-4">
                            <div className="text-aquarius-cyan mt-1 flex-shrink-0">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <div className="text-zinc-300 text-base leading-relaxed prose prose-invert prose-sm max-w-none">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
