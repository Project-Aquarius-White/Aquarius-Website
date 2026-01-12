'use client';

import React from 'react';
import GradientFlowViz from '../visualizations/GradientFlowViz';
import CECDemoViz from '../visualizations/CECDemoViz';

interface InteractiveDiagramProps {
    id: string;
    title?: string;
    height?: string;
    children?: React.ReactNode;
}

export default function InteractiveDiagram({ id, title, height = "400px", children }: InteractiveDiagramProps) {
    // Map IDs to actual components
    const renderVisualization = () => {
        switch (id) {
            case 'gradient-flow-viz':
                return <GradientFlowViz />;
            case 'cec-demo':
                return <CECDemoViz />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center text-zinc-500">
                        <span className="font-mono text-xs uppercase mb-2">Visualization ID: {id}</span>
                        {children || "Visualization not found"}
                    </div>
                );
        }
    };

    return (
        <div className="my-16 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl bg-black">
            <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex justify-between items-center">
                <span className="font-mono text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    {title || "Interactive Visualization"}
                </span>
                <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-aquarius-cyan/10 border border-aquarius-cyan/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-aquarius-cyan animate-pulse" />
                    <span className="text-[10px] font-mono text-aquarius-cyan uppercase tracking-wide">Live</span>
                </div>
            </div>
            <div 
                id={id} 
                style={{ height }} 
                className="w-full relative bg-zinc-950 flex flex-col items-center justify-center overflow-hidden"
            >
                {renderVisualization()}
            </div>
        </div>
    );
}
