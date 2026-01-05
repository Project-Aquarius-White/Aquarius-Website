import React from "react";
import Link from "next/link";
import { GlassPanel } from "../components/ui/GlassPanel";
import { StatusBadge } from "../components/ui/StatusBadge";
import { DataTable } from "../components/ui/DataTable";
import { ArrowRight, Activity, GitCommit, Database, FileText, CheckCircle, Github } from "lucide-react";
import Header from "../components/Header";
import { aquariusData } from "../data/aquarius.generated";

const STAGES = [
  { id: "S1", name: "SPEC", icon: FileText, desc: "Paper Analysis" },
  { id: "S2", name: "PROTO", icon: Database, desc: "Architecture Map" },
  { id: "S3", name: "LIB", icon: GitCommit, desc: "Implementation" },
  { id: "S4", name: "BENCH", icon: Activity, desc: "Verification" },
  { id: "S5", name: "MATCH", icon: FileText, desc: "Documentation" },
  { id: "S6", name: "SHIP", icon: CheckCircle, desc: "Release" },
];

function formatDate(isoString: string): string {
  return isoString.split('T')[0];
}

export default function DashboardPage() {
  const { projects, generatedAt } = aquariusData;
  
  const tableHeaders = ["PROJECT", "PAPER", "STAGE", "STATUS", "LAST UPDATE"];
  
  const tableRows = projects.map((project) => [
    <div key="proj" className="flex items-center gap-2">
      <Link 
        href={`/results?project=${project.projectId}`}
        className="font-bold text-white tracking-wide hover:text-aquarius-cyan transition-colors"
      >
        {project.name}
      </Link>
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-600 hover:text-zinc-400 transition-colors"
        title="View on GitHub"
      >
        <Github size={14} />
      </a>
    </div>,
    <span key="paper" className="text-zinc-400">
      {project.paper.title} ({project.paper.year})
    </span>,
    <span key="stage" className="font-mono text-xs text-aquarius-cyan">
      {project.stageCode}
    </span>,
    <StatusBadge key="status" status={project.status} label={project.status} />,
    <span key="date" className="font-mono text-zinc-500">
      {formatDate(project.effectiveUpdatedAt)}
    </span>
  ]);

  const syncTime = new Date(generatedAt).toLocaleString();

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-aquarius-cyan selection:text-black">
      <Header activePage="/dashboard" />

      <main className="relative z-10 px-6 pt-32 pb-20 max-w-7xl mx-auto space-y-20">
        
        <section className="space-y-6">
          <div className="inline-block px-3 py-1 border border-zinc-800 bg-zinc-900/50 text-zinc-400 font-mono text-xs tracking-widest uppercase">
            :: OPERATIONAL DASHBOARD
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STAGES.map((stage, i) => (
              <GlassPanel key={stage.id} className="p-4 group flex flex-col gap-3 items-start relative overflow-hidden" hover>
                <div className="absolute top-2 right-2 text-xs font-mono text-zinc-700 group-hover:text-aquarius-cyan transition-colors">
                  0{i + 1}
                </div>
                <div className="p-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-500 group-hover:border-aquarius-cyan/30 group-hover:text-aquarius-cyan transition-colors">
                  <stage.icon size={16} />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                    {stage.name}
                  </div>
                  <div className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors mt-1">
                    {stage.desc}
                  </div>
                </div>
                {i < STAGES.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-zinc-800 z-20"></div>
                )}
              </GlassPanel>
            ))}
          </div>
        </section>

        <section className="space-y-8">
           <div className="flex justify-between items-end">
             <h3 className="text-sm font-mono text-zinc-500 tracking-widest uppercase">:: ACTIVE OPERATIONS</h3>
             <div className="text-xs font-mono text-zinc-600">
               LAST SYNC: {syncTime}
             </div>
           </div>

           {projects.length > 0 ? (
             <div className="overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
               <div className="min-w-[800px] md:min-w-0">
                 <DataTable 
                   headers={tableHeaders} 
                   rows={tableRows} 
                   className="bg-[#0B1221]/80 backdrop-blur-md"
                 />
               </div>
             </div>
           ) : (
             <GlassPanel className="p-12 text-center">
               <div className="text-zinc-500 font-mono text-sm">
                 No active operations found.
               </div>
               <div className="text-zinc-600 text-xs mt-2">
                 Repositories must have topic &apos;project-aquarius&apos; and valid aquarius.project.json
               </div>
             </GlassPanel>
           )}

           <div className="flex justify-center pt-8">
             <Link href="/docs/protocol" className="group inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-aquarius-cyan transition-colors uppercase tracking-widest min-h-[44px]">
                <span>Initiate New Operation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        </section>

      </main>
    </div>
  );
}
