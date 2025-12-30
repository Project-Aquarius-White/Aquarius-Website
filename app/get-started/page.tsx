import Link from "next/link";
import { ArrowRight, Github, FileText, Database, GitCommit } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GlassPanel } from "../components/ui/GlassPanel";
import { SectionHeader } from "../components/ui/SectionHeader";

export default function GetStartedPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-black text-white selection:bg-aquarius-cyan selection:text-black">
      <Header />

      <main className="flex-grow pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              START A <br />
              <span className="text-aquarius-cyan">REPRODUCTION</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Begin the journey from paper to production. Follow the protocol to prove your understanding.
            </p>
          </div>

          <div className="grid gap-12">
            <SectionHeader 
              title="SETUP GUIDE" 
              subtitle="INITIALIZATION PROTOCOL"
              className="border-white/10"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <GlassPanel className="p-8 space-y-4 h-full flex flex-col" hover>
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <Github className="w-6 h-6 text-aquarius-cyan" />
                  </div>
                  <span className="font-mono text-zinc-500 text-sm">STEP_01</span>
                </div>
                <h3 className="text-xl font-bold">Use the Template</h3>
                <p className="text-zinc-400 leading-relaxed text-sm flex-grow">
                  Initialize your repository using the official Aquarius template. It comes pre-configured with the required directory structure and CI/CD workflows.
                </p>
              </GlassPanel>

              <GlassPanel className="p-8 space-y-4 h-full flex flex-col" hover>
                 <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <FileText className="w-6 h-6 text-aquarius-cyan" />
                  </div>
                  <span className="font-mono text-zinc-500 text-sm">STEP_02</span>
                </div>
                <h3 className="text-xl font-bold">Configure Manifest</h3>
                <p className="text-zinc-400 leading-relaxed text-sm flex-grow">
                  Update <span className="font-mono text-white bg-white/10 px-1 rounded">aquarius.project.json</span> with your project details. This metadata powers the dashboard and validation pipelines.
                </p>
              </GlassPanel>

              <GlassPanel className="p-8 space-y-4 h-full flex flex-col" hover>
                 <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <Database className="w-6 h-6 text-aquarius-cyan" />
                  </div>
                   <span className="font-mono text-zinc-500 text-sm">STEP_03</span>
                </div>
                <h3 className="text-xl font-bold">Add Topic</h3>
                <p className="text-zinc-400 leading-relaxed text-sm flex-grow">
                  Add the <span className="font-mono text-white bg-white/10 px-1 rounded">project-aquarius</span> topic to your GitHub repository. This ensures your reproduction is indexed by the directory.
                </p>
              </GlassPanel>

              <GlassPanel className="p-8 space-y-4 h-full flex flex-col" hover>
                 <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <GitCommit className="w-6 h-6 text-aquarius-cyan" />
                  </div>
                   <span className="font-mono text-zinc-500 text-sm">STEP_04</span>
                </div>
                <h3 className="text-xl font-bold">Start Coding</h3>
                <p className="text-zinc-400 leading-relaxed text-sm flex-grow">
                  Follow the 14-day protocol phases. Commit regularly. Your progress will be automatically tracked and visualized on the dashboard.
                </p>
              </GlassPanel>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-8">
            <Link 
              href="https://github.com/Project-Aquarius-White/aquarius-reproduction-template" 
              target="_blank"
              className="group relative inline-flex items-center justify-center px-12 py-5 bg-white text-black font-bold tracking-widest text-sm uppercase hover:bg-aquarius-cyan transition-colors duration-300 min-h-[44px]"
            >
              <span>Use Template</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/docs/protocol" 
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-mono"
            >
              <span>READ_PROTOCOL_DOCS</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
