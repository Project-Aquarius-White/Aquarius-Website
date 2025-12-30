import React from 'react';
import { GlassPanel } from './ui/GlassPanel';
import PipelineProgress from './PipelineProgress';
import Link from 'next/link';
import { Activity, Clock, Database, ChevronRight } from 'lucide-react';
import type { NormalizedProject } from '../../lib/schemas';

interface LiveOpsPreviewProps {
  operations: NormalizedProject[];
}

export default function LiveOpsPreview({ operations }: LiveOpsPreviewProps) {
  if (operations.length === 0) {
    return (
      <Link href="/dashboard" className="block w-full group">
        <GlassPanel hover className="p-6 w-full max-w-md mx-auto h-full flex flex-col justify-center items-center">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">No Active Operations</div>
        </GlassPanel>
      </Link>
    );
  }

  const displayOps = operations.map((op) => ({
    project: op.name,
    stage: op.stage,
    status: op.status,
    lastSync: "synced",
  }));

  return (
    <Link href="/dashboard" className="block w-full group">
      <GlassPanel hover className="p-6 w-full max-w-md mx-auto h-full flex flex-col justify-between">
        
        <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Live Operations</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-aquarius-cyan transition-colors" />
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-zinc-500 font-mono mb-1">TARGET_ID</div>
              <div className="text-lg font-bold text-white font-mono">{displayOps[0].project}</div>
            </div>
            <div className="text-right">
               <div className="inline-flex items-center px-2 py-1 rounded bg-aquarius-cyan/10 border border-aquarius-cyan/20 text-aquarius-cyan text-xs font-mono uppercase tracking-wide">
                 {displayOps[0].status}
               </div>
            </div>
          </div>
          
          <PipelineProgress currentStage={displayOps[0].stage} />
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-3 text-zinc-600 border-b border-zinc-900 pb-2 mb-2 px-1">
            <span>PROJECT</span>
            <span className="text-center">STAGE</span>
            <span className="text-right">SYNC</span>
          </div>
          
          {displayOps.map((op, i) => (
            <div key={i} className="grid grid-cols-3 items-center px-1 text-zinc-400 group-hover/row hover:bg-white/5 py-1 rounded transition-colors">
              <span className={i === 0 ? "text-white" : ""}>{op.project}</span>
              <span className="text-center">S{op.stage}</span>
              <span className="text-right text-zinc-600">{op.lastSync}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between text-xs text-zinc-600 font-mono">
          <div className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            <span>3 NODES</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            <span>98.2% UPTIME</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>0.04s LATENCY</span>
          </div>
        </div>

      </GlassPanel>
    </Link>
  );
}
