import React from "react";
import Link from "next/link";
import { GlassPanel } from "../components/ui/GlassPanel";
import { StatusBadge } from "../components/ui/StatusBadge";
import { DataTable } from "../components/ui/DataTable";
import { ArrowRight, Activity, GitCommit, Play, FileText, CheckCircle, Database } from "lucide-react";

type Stage = "S1-READ" | "S2-PLAN" | "S3-CODE" | "S4-BENCH" | "S5-DOCS" | "S6-SHIP";

interface Operation {
  id: string;
  project: string;
  paper: string;
  stage: Stage;
  status: "active" | "completed" | "pending" | "blocked";
  lastUpdate: string;
}

const operations: Operation[] = [
  { 
    id: "op-001", 
    project: "simple-lstm", 
    paper: "Long Short-Term Memory (1997)", 
    stage: "S4-BENCH", 
    status: "active", 
    lastUpdate: "2025-12-30" 
  },
  { 
    id: "op-002", 
    project: "attention-is-all-you-need", 
    paper: "Attention Is All You Need (2017)", 
    stage: "S2-PLAN", 
    status: "pending", 
    lastUpdate: "2025-12-28" 
  },
];

const STAGES = [
  { id: "S1", name: "READ", icon: FileText, desc: "Paper Analysis" },
  { id: "S2", name: "PLAN", icon: Database, desc: "Architecture Map" },
  { id: "S3", name: "CODE", icon: GitCommit, desc: "Implementation" },
  { id: "S4", name: "BENCH", icon: Activity, desc: "Verification" },
  { id: "S5", name: "DOCS", icon: FileText, desc: "Documentation" },
  { id: "S6", name: "SHIP", icon: CheckCircle, desc: "Release" },
];

export default function DashboardPage() {
  const tableHeaders = ["PROJECT", "PAPER", "STAGE", "STATUS", "LAST UPDATE"];
  
  const tableRows = operations.map((op) => [
    <span key="proj" className="font-bold text-white tracking-wide">{op.project}</span>,
    <span key="paper" className="text-zinc-400">{op.paper}</span>,
    <span key="stage" className="font-mono text-xs text-aquarius-cyan">{op.stage}</span>,
    <StatusBadge key="status" status={op.status} label={op.status} />,
    <span key="date" className="font-mono text-zinc-500">{op.lastUpdate}</span>
  ]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-aquarius-cyan selection:text-black">
      
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay"></div>

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase pointer-events-auto hover:text-aquarius-cyan transition-colors">
          Project Aquarius // Protocol v1.0
        </Link>
        <nav className="flex gap-6 pointer-events-auto">
          <Link href="/docs/protocol" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors hidden md:block">[PROTOCOL]</Link>
          <Link href="/dashboard" className="text-[10px] md:text-xs font-mono text-aquarius-cyan transition-colors">[MISSION STATUS]</Link>
          <a href="https://github.com/Project-Aquarius-White/Aquarius-Website" className="text-[10px] md:text-xs font-mono hover:text-aquarius-cyan transition-colors">[REPOSITORY]</a>
        </nav>
      </header>

      <main className="relative z-10 px-6 pt-32 pb-20 max-w-7xl mx-auto space-y-20">
        
        <section className="space-y-6">
          <div className="inline-block px-3 py-1 border border-zinc-800 bg-zinc-900/50 text-zinc-400 font-mono text-[10px] tracking-widest uppercase">
            :: OPERATIONAL DASHBOARD
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mix-blend-difference">
            MISSION STATUS
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl">
            Real-time tracking of active reproduction operations. <br/>
            <span className="text-aquarius-cyan/80">Transparency is the first step to mastery.</span>
          </p>
        </section>

        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
             <h3 className="text-sm font-mono text-zinc-500 tracking-widest uppercase">:: PROTOCOL PIPELINE</h3>
             <div className="h-[1px] flex-1 bg-zinc-900 mx-8 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {STAGES.map((stage, i) => (
              <GlassPanel key={stage.id} className="p-4 group flex flex-col gap-3 items-start relative overflow-hidden" hover>
                <div className="absolute top-2 right-2 text-[10px] font-mono text-zinc-700 group-hover:text-aquarius-cyan transition-colors">
                  0{i + 1}
                </div>
                <div className="p-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-500 group-hover:border-aquarius-cyan/30 group-hover:text-aquarius-cyan transition-colors">
                  <stage.icon size={16} />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                    {stage.name}
                  </div>
                  <div className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors mt-1">
                    {stage.desc}
                  </div>
                </div>
                {i < STAGES.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-zinc-800 z-20"></div>
                )}
              </GlassPanel>
            ))}
          </div>
        </section>

        <section className="space-y-8">
           <div className="flex justify-between items-end">
             <h3 className="text-sm font-mono text-zinc-500 tracking-widest uppercase">:: ACTIVE OPERATIONS</h3>
             <div className="text-[10px] font-mono text-zinc-600">
               LAST SYNC: {new Date().toLocaleTimeString()}
             </div>
           </div>

           <DataTable 
             headers={tableHeaders} 
             rows={tableRows} 
             className="bg-[#0B1221]/80 backdrop-blur-md"
           />

           <div className="flex justify-center pt-8">
             <Link href="/docs/protocol" className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-aquarius-cyan transition-colors uppercase tracking-widest">
                <span>Initiate New Operation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </section>

      </main>
    </div>
  );
}
