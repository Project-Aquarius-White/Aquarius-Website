import React from 'react';

interface PipelineProgressProps {
  currentStage: number;
  className?: string;
}

export default function PipelineProgress({ currentStage, className = "" }: PipelineProgressProps) {
  const stages = [1, 2, 3, 4, 5, 6];

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      <div className="flex items-center justify-between w-full relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800 -z-10 transform -translate-y-1/2" />
        
        {stages.map((stage) => {
          const isCompleted = stage < currentStage;
          const isCurrent = stage === currentStage;

          return (
            <div key={stage} className="flex flex-col items-center gap-2 bg-black/50 px-1">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-aquarius-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)] scale-125"
                    : isCompleted
                    ? "bg-zinc-600"
                    : "border border-zinc-700 bg-black"
                }`}
              />
              <span 
                className={`text-xs font-mono tracking-wider ${
                  isCurrent ? "text-aquarius-cyan font-bold" : "text-zinc-600"
                }`}
              >
                S{stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
